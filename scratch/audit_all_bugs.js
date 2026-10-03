const fs = require('fs');
const path = require('path');

function getFiles(dir, exts, files = []) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'legacy-site', 'stage', 'scratch'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) getFiles(full, exts, files);
    else if (exts.some(ext => item.endsWith(ext))) files.push(full);
  }
  return files;
}

const htmlFiles = getFiles('.', ['.html']);
console.log(`Auditing ${htmlFiles.length} HTML files for broken links and assets...`);

let brokenLinks = [];
let brokenImages = [];
let missingScripts = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);

  // Check href links
  const hrefs = [...content.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  hrefs.forEach(href => {
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('data:')) return;
    let cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) return;

    let targetPath;
    if (cleanHref.startsWith('/')) {
      targetPath = cleanHref.slice(1);
    } else {
      targetPath = path.normalize(path.join(dir, cleanHref)).replace(/\\/g, '/');
    }
    if (targetPath.endsWith('/')) targetPath += 'index.html';

    if (!fs.existsSync(targetPath) && !fs.existsSync(targetPath + '.html')) {
      brokenLinks.push({ file, href, targetPath });
    }
  });

  // Check img src
  const imgs = [...content.matchAll(/src=["']([^"']+)["']/gi)].map(m => m[1]);
  imgs.forEach(src => {
    if (src.startsWith('http') || src.startsWith('data:')) return;
    let cleanSrc = src.split('?')[0];
    let targetPath;
    if (cleanSrc.startsWith('/')) {
      targetPath = cleanSrc.slice(1);
    } else {
      targetPath = path.normalize(path.join(dir, cleanSrc)).replace(/\\/g, '/');
    }

    if (!fs.existsSync(targetPath)) {
      brokenImages.push({ file, src, targetPath });
    }
  });
});

console.log('--- BROKEN LINKS REPORT ---');
console.log(`Total broken links found: ${brokenLinks.length}`);
brokenLinks.forEach(b => console.log(`  [${b.file}] broken href: "${b.href}" -> missing: ${b.targetPath}`));

console.log('\n--- BROKEN IMAGES REPORT ---');
console.log(`Total broken images found: ${brokenImages.length}`);
brokenImages.forEach(b => console.log(`  [${b.file}] broken src: "${b.src}" -> missing: ${b.targetPath}`));
