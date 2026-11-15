import fs from "node:fs";
import path from "node:path";
import {
  ROOT_DIR,
  SITE_URL,
  EXCLUDED_PUBLIC_PAGES,
  countVisibleWords,
  extractImages,
  extractTagTexts,
  getAllHtmlFiles,
  getLinkHref,
  getMetaContent,
  parseJsonLdBlocks,
  readSitemapMap,
  resolveLocalTarget,
  toPublicUrl
} from "./seo-lib.mjs";

const MAX_IMAGE_BYTES = 250 * 1024;

function checkTechnicalHead(html, relPath, issues, warnings) {
  let score = 0;
  const titles = extractTagTexts(html, "title");
  const title = titles[0] || "";
  if (title) {
    score += 6;
    if (title.length >= 30 && title.length <= 70) score += 4;
    else warnings.push(`Title length ${title.length} chars (ideal 30-70)`);
  } else {
    issues.push("Missing <title>");
  }

  const desc = getMetaContent(html, "name", "description");
  if (desc) {
    score += 6;
    if (desc.length >= 100 && desc.length <= 165) score += 4;
    else warnings.push(`Meta description length ${desc.length} chars (ideal 100-165)`);
  } else {
    issues.push("Missing meta description");
  }

  const expectedCanonical = toPublicUrl(relPath);
  const canonical = getLinkHref(html, "canonical");
  if (canonical === expectedCanonical) {
    score += 10;
  } else if (canonical) {
    score += 5;
    warnings.push(`Canonical (${canonical}) != expected (${expectedCanonical})`);
  } else {
    issues.push("Missing <link rel='canonical'>");
  }

  const ogTitle = getMetaContent(html, "property", "og:title");
  const ogDesc = getMetaContent(html, "property", "og:description");
  const ogImg = getMetaContent(html, "property", "og:image");
  const twCard = getMetaContent(html, "name", "twitter:card");
  if (ogTitle && ogDesc && ogImg && twCard) {
    score += 10;
  } else {
    const missing = [
      !ogTitle && "og:title",
      !ogDesc && "og:description",
      !ogImg && "og:image",
      !twCard && "twitter:card"
    ].filter(Boolean);
    score += Math.max(0, 10 - missing.length * 3);
    warnings.push(`Incomplete social meta: ${missing.join(", ")}`);
  }

  return { score, title, desc, robots: getMetaContent(html, "name", "robots") };
}

function checkContentAndSchema(html, relPath, issues, warnings) {
  let score = 0;
  const h1s = extractTagTexts(html, "h1");
  const h2s = extractTagTexts(html, "h2");
  if (h1s.length === 1 && h1s[0]) {
    score += 7;
  } else if (h1s.length === 0) {
    issues.push("Missing <h1>");
  } else {
    score += 4;
    warnings.push(`Multiple H1 tags (${h1s.length})`);
  }
  if (h2s.length > 0) score += 3;
  else warnings.push("No <h2> subheadings found");

  const words = countVisibleWords(html);
  const minWords = relPath.startsWith("blog/") && relPath !== "blog/index.html" ? 600 : 250;
  if (words >= minWords) {
    score += 10;
  } else if (words >= 150) {
    score += 5;
    warnings.push(`Low word count (${words} < ${minWords})`);
  } else {
    issues.push(`Thin content (${words} words)`);
  }

  const ld = parseJsonLdBlocks(html);
  if (ld.errors.length > 0) {
    issues.push(`Invalid JSON-LD syntax: ${ld.errors[0]}`);
  } else if (ld.count > 0) {
    score += 10;
  } else {
    issues.push("No Schema.org JSON-LD found");
  }

  return { score, words, schemaTypes: ld.types };
}

function checkImagesAndLinks(html, relPath, issues, warnings, inboundCounts) {
  let score = 0;
  const imgs = extractImages(html);
  let imgIssues = 0;
  let missingDimCount = 0;

  for (const img of imgs) {
    if (img.alt === null || img.alt === "") imgIssues += 1;
    if (!img.width || !img.height) missingDimCount += 1;
    const resolved = resolveLocalTarget(img.src, relPath);
    if (resolved) {
      const abs = path.join(ROOT_DIR, resolved);
      if (!fs.existsSync(abs)) {
        issues.push(`Missing image file: ${img.src}`);
        imgIssues += 1;
      } else if (fs.statSync(abs).size > MAX_IMAGE_BYTES) {
        warnings.push(`Large image (>250KB): ${resolved}`);
      }
    }
  }

  if (imgIssues === 0) score += 10;
  else {
    score += Math.max(0, 10 - imgIssues * 3);
    warnings.push(`${imgIssues} image(s) missing alt text or source file`);
  }
  if (missingDimCount > 0) {
    warnings.push(`${missingDimCount} <img> missing width/height (CLS risk)`);
  }

  let brokenLinks = 0;
  let internalLinks = 0;
  for (const match of html.matchAll(/<a\s+[^>]*\bhref=["']([^"']+)["']/gi)) {
    const resolved = resolveLocalTarget(match[1], relPath);
    if (!resolved) continue;
    internalLinks += 1;
    if (inboundCounts.has(resolved)) {
      inboundCounts.set(resolved, inboundCounts.get(resolved) + 1);
    }
    if (!fs.existsSync(path.join(ROOT_DIR, resolved))) {
      brokenLinks += 1;
      issues.push(`Broken internal link: ${match[1]} -> ${resolved}`);
    }
  }

  if (brokenLinks === 0) score += 10;
  else score += Math.max(0, 10 - brokenLinks * 5);

  return { score, brokenLinks, internalLinks };
}

function runAudit() {
  const publicPages = getAllHtmlFiles({ includeExcluded: false });
  const inboundCounts = new Map(publicPages.map((p) => [p, 0]));
  const sitemapSet = new Set([
    ...readSitemapMap("sitemap.xml").keys(),
    ...readSitemapMap("sitemap-blog.xml").keys()
  ]);

  const seenTitles = new Map();
  const seenDescs = new Map();
  const results = [];

  for (const relPath of publicPages) {
    const html = fs.readFileSync(path.join(ROOT_DIR, relPath), "utf8");
    const issues = [];
    const warnings = [];

    const head = checkTechnicalHead(html, relPath, issues, warnings);
    if (/noindex/i.test(head.robots)) {
      issues.push(`Public page has noindex directive (${head.robots})`);
    }
    if (head.title) {
      if (seenTitles.has(head.title)) {
        warnings.push(`Duplicate <title> shared with ${seenTitles.get(head.title)}`);
      } else {
        seenTitles.set(head.title, relPath);
      }
    }
    if (head.desc) {
      if (seenDescs.has(head.desc)) {
        warnings.push(`Duplicate meta description shared with ${seenDescs.get(head.desc)}`);
      } else {
        seenDescs.set(head.desc, relPath);
      }
    }

    const content = checkContentAndSchema(html, relPath, issues, warnings);
    const links = checkImagesAndLinks(html, relPath, issues, warnings, inboundCounts);

    let infraScore = 0;
    const url = toPublicUrl(relPath);
    if (sitemapSet.has(url)) infraScore += 5;
    else issues.push("Missing from sitemap.xml / sitemap-blog.xml");

    if (html.includes("seo-plugin.js")) infraScore += 5;
    else warnings.push("Missing js/seo-plugin.js");

    if (!html.includes("main.js")) {
      warnings.push("Missing js/main.js mobile/UX bundle");
    }

    const totalScore = Math.min(100, head.score + content.score + links.score + infraScore);
    results.push({
      file: relPath,
      url,
      score: totalScore,
      words: content.words,
      internalLinks: links.internalLinks,
      schemaTypes: content.schemaTypes,
      issues,
      warnings
    });
  }

  for (const excluded of EXCLUDED_PUBLIC_PAGES) {
    const abs = path.join(ROOT_DIR, excluded);
    if (!fs.existsSync(abs)) continue;
    const html = fs.readFileSync(abs, "utf8");
    const robots = getMetaContent(html, "name", "robots");
    if (!/noindex/i.test(robots)) {
      results.push({
        file: excluded,
        url: `${SITE_URL}/${excluded}`,
        score: 0,
        words: 0,
        internalLinks: 0,
        schemaTypes: [],
        issues: ["Utility page missing <meta name='robots' content='noindex, nofollow'>"],
        warnings: []
      });
    }
  }

  const orphans = publicPages.filter((p) => p !== "index.html" && (inboundCounts.get(p) || 0) === 0);
  const avgScore = Math.round(
    results.filter((r) => !EXCLUDED_PUBLIC_PAGES.has(r.file)).reduce((acc, r) => acc + r.score, 0) /
      publicPages.length
  );

  const reportDir = path.join(ROOT_DIR, "scratch");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, "seo-audit-report.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), avgScore, orphans, pages: results }, null, 2)
  );

  const allCritical = results.filter((r) => r.issues.length > 0);
  console.log(`\n=== PRAKHAR INDIA SEO AUDIT (Rank-Math Static Suite) ===`);
  console.log(`Public Pages Audited : ${publicPages.length}`);
  console.log(`Average SEO Score    : ${avgScore}/100`);
  console.log(`Pages With Issues    : ${allCritical.length}`);
  console.log(`Orphan Pages (0 in)  : ${orphans.length}`);
  if (orphans.length) {
    console.log(`  Orphans: ${orphans.join(", ")}`);
  }
  console.log("");

  for (const r of allCritical) {
    console.log(`[SCORE ${String(r.score).padStart(2, " ")}/100] ${r.file}`);
    for (const err of r.issues) console.log(`  CRITICAL: ${err}`);
  }

  const topWarnPages = results.filter((r) => r.warnings.length > 0 && r.issues.length === 0);
  if (topWarnPages.length) {
    console.log(`\nPages with warnings only (${topWarnPages.length}):`);
    for (const r of topWarnPages.slice(0, 15)) {
      console.log(`  [${r.score}/100] ${r.file} -> ${r.warnings.join(" | ")}`);
    }
    if (topWarnPages.length > 15) {
      console.log(`  ...and ${topWarnPages.length - 15} more (see scratch/seo-audit-report.json)`);
    }
  }

  console.log(`\nFull report saved to: ${path.relative(ROOT_DIR, reportPath)}`);
  if (process.argv.includes("--strict") && allCritical.length > 0) {
    process.exitCode = 1;
  }
}

runAudit();
