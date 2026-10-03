const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'legacy-site', 'stage', 'scratch', 'wordpress-theme'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) getHtmlFiles(full, files);
    else if (item.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = getHtmlFiles('.');
console.log(`Processing Image SEO across ${htmlFiles.length} HTML files...`);

let totalImagesUpdated = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let relPath = file.replace(/\\/g, '/');
  let filename = path.basename(file, '.html');
  
  // Extract context topic for keyword-rich ALT tags
  let pageTopic = filename.replace('manpower-', '').replace('construction-', '').replace(/-/g, ' ');
  if (filename === 'index') pageTopic = 'Uttar Pradesh & Pan-India';

  let modified = false;

  // Replace <img> tags with optimized Image SEO attributes
  content = content.replace(/<img([^>]*)>/gi, (match, p1) => {
    totalImagesUpdated++;
    modified = true;

    // Check existing attributes
    let srcMatch = p1.match(/src=["']([^"']+)["']/i);
    let altMatch = p1.match(/alt=["']([^"']*)["']/i);
    
    let src = srcMatch ? srcMatch[1] : '';
    let alt = altMatch ? altMatch[1] : '';

    let cleanSrcName = path.basename(src, path.extname(src)).replace(/-/g, ' ');
    let newAlt = `Prakhar India (${pageTopic}) — ${cleanSrcName || 'Industrial Manpower & Civil Construction'} | prakharind.com`;

    // Rebuild img tag with Image SEO best practices
    let newImg = '<img' + p1;

    if (!altMatch || !alt) {
      newImg = newImg.replace(/<img/i, `<img alt="${newAlt}"`);
    } else if (!alt.includes('prakharind.com')) {
      newImg = newImg.replace(/alt=["']([^"']*)["']/i, `alt="$1 — prakharind.com"`);
    }

    if (!newImg.includes('loading=')) {
      newImg = newImg.replace(/<img/i, '<img loading="lazy" decoding="async"');
    }

    if (!newImg.includes('title=')) {
      newImg = newImg.replace(/<img/i, `title="Prakhar India Industrial Manpower &amp; Construction Services — prakharind.com"`);
    }

    return newImg;
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log(`Image SEO executed successfully across ${htmlFiles.length} files. Total image instances processed: ${totalImagesUpdated}.`);
