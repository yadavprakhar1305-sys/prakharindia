import fs from "node:fs";
import path from "node:path";
import {
  ROOT_DIR,
  SITE_URL,
  getAllHtmlFiles,
  getFileDates,
  getMetaContent,
  extractTagTexts,
  readSitemapMap,
  toPublicUrl
} from "./seo-lib.mjs";

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemapXml(entries) {
  const rows = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>
`;
}

function buildRssXml(items) {
  const nowRfc = new Date().toUTCString();
  const renderedItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Prakhar India — Real Estate, Plots &amp; Turnkey Construction UP</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Verified RERA-approved plot townships, Vindhyachal corridor real estate, house construction cost guides &amp; civil contracting updates across Uttar Pradesh.</description>
    <language>en-in</language>
    <lastBuildDate>${nowRfc}</lastBuildDate>
${renderedItems}
  </channel>
</rss>
`;
}

function syncSitemapsAndRss() {
  const existingMain = readSitemapMap("sitemap.xml");
  const existingBlog = readSitemapMap("sitemap-blog.xml");
  const publicPages = getAllHtmlFiles({ includeExcluded: false });

  const mainEntries = [];
  const blogEntries = [];
  const rssItems = [];

  for (const relPath of publicPages) {
    const loc = toPublicUrl(relPath);
    const dates = getFileDates(relPath);
    const isBlog = relPath.startsWith("blog/");

    if (isBlog) {
      const prev = existingBlog.get(loc);
      const isIndex = relPath === "blog/index.html";
      blogEntries.push({
        loc,
        lastmod: dates.ymd,
        changefreq: prev?.changefreq || (isIndex ? "weekly" : "monthly"),
        priority: prev?.priority || (isIndex ? "0.7" : "0.7")
      });

      if (!isIndex) {
        const html = fs.readFileSync(path.join(ROOT_DIR, relPath), "utf8");
        const title = extractTagTexts(html, "title")[0] || loc;
        const description = getMetaContent(html, "name", "description") || title;
        rssItems.push({
          title,
          url: loc,
          description,
          pubDate: new Date(dates.iso).toUTCString(),
          sortKey: dates.iso
        });
      }
    } else {
      const prev = existingMain.get(loc);
      const defaultFreq = relPath === "index.html" ? "daily" : "weekly";
      const defaultPriority = relPath === "index.html" ? "1.0" : "0.8";
      mainEntries.push({
        loc,
        lastmod: dates.ymd,
        changefreq: prev?.changefreq || defaultFreq,
        priority: prev?.priority || defaultPriority
      });
    }
  }

  // Add top hub pages to RSS feed alongside all blog posts so cornerstones stay fresh.
  const cornerstoneHubs = [
    "pages/real-estate-mirzapur.html",
    "pages/plots-in-mirzapur.html",
    "pages/construction.html"
  ];
  for (const relPath of cornerstoneHubs) {
    const abs = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(abs)) continue;
    const html = fs.readFileSync(abs, "utf8");
    const dates = getFileDates(relPath);
    const title = extractTagTexts(html, "title")[0] || relPath;
    const description = getMetaContent(html, "name", "description") || title;
    rssItems.push({
      title,
      url: toPublicUrl(relPath),
      description,
      pubDate: new Date(dates.iso).toUTCString(),
      sortKey: dates.iso
    });
  }

  rssItems.sort((a, b) => b.sortKey.localeCompare(a.sortKey));

  fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), buildSitemapXml(mainEntries), "utf8");
  fs.writeFileSync(path.join(ROOT_DIR, "sitemap-blog.xml"), buildSitemapXml(blogEntries), "utf8");
  fs.writeFileSync(path.join(ROOT_DIR, "rss.xml"), buildRssXml(rssItems), "utf8");

  console.log(`Synced sitemap.xml (${mainEntries.length} URLs)`);
  console.log(`Synced sitemap-blog.xml (${blogEntries.length} URLs)`);
  console.log(`Generated rss.xml (${rssItems.length} feed items)`);
}

syncSitemapsAndRss();
