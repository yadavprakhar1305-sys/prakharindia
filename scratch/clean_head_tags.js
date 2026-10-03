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
console.log(`Cleaning malformed head tags across ${htmlFiles.length} HTML files...`);

let fixedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let relPath = file.replace(/\\/g, '/');

  const isSubfolder = relPath.startsWith('pages/') || relPath.startsWith('blog/');
  const faviconPath = isSubfolder ? '../images/favicon.png' : 'images/favicon.png';

  // Replace malformed favicon/apple-touch-icon tag strings cleanly
  const cleanFaviconMarkup = `<link rel="icon" href="${faviconPath}" type="image/png">\n<link rel="apple-touch-icon" href="${faviconPath}">`;

  if (content.includes("font-size='90'")) {
    fixedCount++;
    content = content.replace(/<link\s+rel=["']icon["'][^>]*>[\s\S]*?<link\s+rel=["']apple-touch-icon["'][^>]*>[\s\S]*?<\/svg>["']>*/gi, cleanFaviconMarkup);
    content = content.replace(/<link\s+rel=["']apple-touch-icon["'][^>]*><text[\s\S]*?<\/svg>["']>*/gi, cleanFaviconMarkup);
    content = content.replace(/<text y=['"].*?font-size='90'.*?<\/svg>["']?>*/gi, '');
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log(`Successfully cleaned head tags across ${fixedCount} HTML files.`);
