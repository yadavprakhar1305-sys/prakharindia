const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const blogDir = path.join(rootDir, 'blog');

const baseUrl = 'https://prakharind.com';
const lastmod = '2026-09-30';

// Excluded private/admin files
const excludedPages = new Set([
  'admin.html',
  'login.html',
  'signup.html'
]);

// 1. Collect Pages
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !excludedPages.has(f));
// 2. Collect Blogs
const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

// Build sitemap.xml
let mainUrls = [
  `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`
];

for (const p of pageFiles) {
  const priority = p.startsWith('construction-company-') || p.startsWith('manpower-') || p === 'mirzapur.html' || p === 'manpower.html' || p === 'construction.html' ? '0.9' : '0.8';
  mainUrls.push(`  <url>\n    <loc>${baseUrl}/pages/${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`);
}

for (const b of blogFiles) {
  mainUrls.push(`  <url>\n    <loc>${baseUrl}/blog/${b}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${mainUrls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`[UPDATED] sitemap.xml with ${mainUrls.length} URLs`);

// Build sitemap-blog.xml
let blogUrls = [];
for (const b of blogFiles) {
  blogUrls.push(`  <url>\n    <loc>${baseUrl}/blog/${b}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`);
}

const sitemapBlogXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${blogUrls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(rootDir, 'sitemap-blog.xml'), sitemapBlogXml, 'utf8');
console.log(`[UPDATED] sitemap-blog.xml with ${blogUrls.length} URLs`);
