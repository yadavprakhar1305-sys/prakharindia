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
console.log('--- ALL IMG TAGS ACROSS SITE ---');

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const imgMatches = [...content.matchAll(/<img([^>]*)>/gi)];
  if (imgMatches.length > 0) {
    console.log(`File: ${file} (${imgMatches.length} images)`);
    imgMatches.forEach(m => console.log('  ' + m[0].slice(0, 140)));
  }
});
