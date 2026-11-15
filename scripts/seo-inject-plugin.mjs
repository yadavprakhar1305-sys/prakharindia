import fs from "node:fs";
import path from "node:path";
import { EXCLUDED_PUBLIC_PAGES, ROOT_DIR, getAllHtmlFiles } from "./seo-lib.mjs";

const RSS_LINK_TAG =
  '<link rel="alternate" type="application/rss+xml" title="Prakhar India Real Estate &amp; Construction Blog RSS" href="https://prakharind.com/rss.xml">';
const NOINDEX_TAG = '<meta name="robots" content="noindex, nofollow">';

function injectPluginTags() {
  const publicPages = getAllHtmlFiles({ includeExcluded: false });
  let updated = 0;

  for (const relPath of publicPages) {
    const abs = path.join(ROOT_DIR, relPath);
    let html = fs.readFileSync(abs, "utf8");
    const prefix = relPath.includes("/") ? "../" : "";
    let changed = false;

    const shouldHaveRss = relPath === "index.html" || relPath.startsWith("blog/");
    if (shouldHaveRss && !html.includes("rss.xml")) {
      if (html.includes("</head>")) {
        html = html.replace("</head>", `  ${RSS_LINK_TAG}\n</head>`);
        changed = true;
      }
    }

    if (!html.includes("seo-plugin.js")) {
      const snippet = `<script defer src="${prefix}js/seo-config.js?v=1.0"></script>\n<script defer src="${prefix}js/seo-plugin.js?v=1.0"></script>`;
      if (html.includes("</body>")) {
        html = html.replace("</body>", `${snippet}\n</body>`);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(abs, html, "utf8");
      updated += 1;
    }
  }

  let noindexUpdated = 0;
  for (const utilityPath of EXCLUDED_PUBLIC_PAGES) {
    const abs = path.join(ROOT_DIR, utilityPath);
    if (!fs.existsSync(abs)) continue;
    let html = fs.readFileSync(abs, "utf8");
    if (!/meta[^>]*name=["']robots["'][^>]*noindex/i.test(html) && html.includes("</head>")) {
      html = html.replace("</head>", `  ${NOINDEX_TAG}\n</head>`);
      fs.writeFileSync(abs, html, "utf8");
      noindexUpdated += 1;
    }
  }

  console.log(`Injected seo-plugin.js / RSS tags into ${updated} public page(s).`);
  console.log(`Added noindex meta tag to ${noindexUpdated} utility page(s).`);
}

injectPluginTags();
