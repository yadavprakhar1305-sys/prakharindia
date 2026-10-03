const fs = require('fs');

const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const blogSitemap = fs.readFileSync('sitemap-blog.xml', 'utf8');

const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const blogUrls = [...blogSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

console.log(`sitemap.xml total URLs: ${sitemapUrls.length}`);
console.log(`sitemap-blog.xml total URLs: ${blogUrls.length}`);

// Check if any URL is missing canonical tag or returns error
let missingFiles = [];
sitemapUrls.forEach(url => {
  let localPath = url.replace('https://prakharind.com/', '');
  if (localPath === '') localPath = 'index.html';
  if (!fs.existsSync(localPath)) {
    missingFiles.push(localPath);
  }
});

console.log(`Missing physical files in sitemap: ${missingFiles.length}`);
if (missingFiles.length > 0) {
  console.log(missingFiles);
}
