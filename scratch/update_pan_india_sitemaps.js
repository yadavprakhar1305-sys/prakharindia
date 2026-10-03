const fs = require('fs');

const stateSlugs = [
  'maharashtra', 'delhi-ncr', 'gujarat', 'karnataka', 'tamil-nadu',
  'telangana', 'west-bengal', 'rajasthan', 'madhya-pradesh', 'bihar',
  'punjab', 'chhattisgarh', 'odisha', 'jharkhand', 'uttarakhand', 'assam'
];

const blogSlugs = [
  'pan-india-industrial-manpower-supply-report-2026',
  'maharashtra-industrial-manpower-demand-2026',
  'gujarat-manufacturing-workforce-trends-2026',
  'karnataka-tech-park-construction-labour-guide',
  'delhi-ncr-infrastructure-workforce-sourcing'
];

// Update sitemap.xml
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
stateSlugs.forEach(slug => {
  const loc = `https://prakharind.com/pages/manpower-${slug}.html`;
  if (!sitemap.includes(loc)) {
    const entry = `  <url><loc>${loc}</loc><lastmod>2026-09-09</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n`;
    sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
  }
});
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

// Update sitemap-blog.xml & sitemap.xml for blogs
let blogSitemap = fs.readFileSync('sitemap-blog.xml', 'utf8');
blogSlugs.forEach(slug => {
  const loc = `https://prakharind.com/blog/${slug}.html`;
  if (!blogSitemap.includes(loc)) {
    const entry = `  <url><loc>${loc}</loc><lastmod>2026-09-09</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    blogSitemap = blogSitemap.replace('</urlset>', `${entry}</urlset>`);
  }
  if (!sitemap.includes(loc)) {
    const entry = `  <url><loc>${loc}</loc><lastmod>2026-09-09</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    sitemap = sitemap.replace('</urlset>', `${entry}</urlset>`);
  }
});
fs.writeFileSync('sitemap-blog.xml', blogSitemap, 'utf8');
fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

console.log('Successfully updated sitemap.xml and sitemap-blog.xml with all Pan-India state pages & state blogs.');
