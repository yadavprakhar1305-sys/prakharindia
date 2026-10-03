const fs = require('fs');

['sitemap.xml', 'sitemap-blog.xml'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<lastmod>[^<]+<\/lastmod>/g, '<lastmod>2026-09-09</lastmod>');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated lastmod in ${file} to 2026-09-09.`);
  }
});
