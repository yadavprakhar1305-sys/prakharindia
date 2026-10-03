const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const allHtmlFiles = [];

function getFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(root, full).replace(/\\/g, '/');
    if (e.isDirectory()) {
      if (['.git', 'node_modules', 'scratch', 'legacy-site', 'stage', '.vercel', 'wordpress-theme'].includes(e.name)) continue;
      getFiles(full);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      if (['login.html', 'signup.html', 'admin.html'].includes(e.name) || rel.includes('admin/')) continue;
      allHtmlFiles.push(rel);
    }
  }
}

getFiles(root);
console.log('Indexed ' + allHtmlFiles.length + ' public indexable HTML pages');

const today = new Date().toISOString().split('T')[0];
let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Sort so index.html and main pages come first
allHtmlFiles.sort((a, b) => {
  if (a === 'index.html') return -1;
  if (b === 'index.html') return 1;
  return a.localeCompare(b);
});

allHtmlFiles.forEach(f => {
  let urlPath = f === 'index.html' ? '' : f;
  let priority = '0.8';
  let changefreq = 'weekly';
  if (f === 'index.html' || f === 'pages/manpower-uttar-pradesh.html' || f === 'pages/mirzapur.html' || f === 'pages/manpower.html' || f === 'pages/construction.html') {
    priority = '1.0';
    changefreq = 'daily';
  } else if (f.startsWith('pages/manpower-')) {
    priority = '0.9';
    changefreq = 'weekly';
  } else if (f.startsWith('blog/')) {
    priority = '0.8';
    changefreq = 'weekly';
  } else if (['pages/privacy-policy.html', 'pages/terms.html', 'pages/grievance.html'].includes(f)) {
    priority = '0.4';
    changefreq = 'monthly';
  }
  
  sitemapXml += `  <url>\n    <loc>https://prakharind.com/${urlPath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
});

sitemapXml += '</urlset>\n';
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('✅ Generated fresh sitemap.xml with ' + allHtmlFiles.length + ' indexed URLs');

// Also generate sitemap-blog.xml
const blogFiles = allHtmlFiles.filter(f => f.startsWith('blog/'));
let blogSitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
blogFiles.forEach(f => {
  blogSitemapXml += `  <url>\n    <loc>https://prakharind.com/${f}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
});
blogSitemapXml += '</urlset>\n';
fs.writeFileSync(path.join(root, 'sitemap-blog.xml'), blogSitemapXml, 'utf8');
console.log('✅ Generated sitemap-blog.xml with ' + blogFiles.length + ' blog articles');
