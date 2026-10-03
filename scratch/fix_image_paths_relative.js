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
console.log(`Fixing image paths to relative across ${htmlFiles.length} HTML files...`);

let count = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let relPath = file.replace(/\\/g, '/');
  
  const isSubfolder = relPath.startsWith('pages/') || relPath.startsWith('blog/');
  const imagePrefix = isSubfolder ? '../images/' : 'images/';

  let modified = false;

  // Replace /images/ with relative imagePrefix
  if (content.includes('src="/images/') || content.includes('src="images/')) {
    content = content.replace(/src=["']\/?images\/([^"']+)["']/g, (match, p1) => {
      count++;
      modified = true;
      return `src="${imagePrefix}${p1}"`;
    });
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log(`Successfully updated ${count} image src paths to reliable relative links.`);
