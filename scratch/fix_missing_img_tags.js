const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'legacy-site', 'stage', 'scratch'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) getHtmlFiles(full, files);
    else if (item.endsWith('.html')) files.push(full);
  }
  return files;
}

const htmlFiles = getHtmlFiles('.');
let totalFixedFiles = 0;
let totalFixedTags = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Fix pattern where tag starts with title="..." or loading="..." or decoding="..." or src="..." without <img
  // Example line:
  // title="Prakhar India..." loading="lazy" decoding="async" src="..." alt="..." style="..." onmouseover="..." onmouseout="..."
  // or inside div/container
  
  // Match lines or strings that contain src= or title= with image attributes but lack <img
  const lines = content.split('\n');
  let fixedLines = lines.map(line => {
    let trimmed = line.trim();
    if (!trimmed.startsWith('<img') && !trimmed.startsWith('<') && (trimmed.includes('src=') && (trimmed.includes('alt=') || trimmed.includes('loading=') || trimmed.includes('title=')))) {
      // Check if it looks like image attributes without <img tag
      totalFixedTags++;
      // Check if it ends with > or />
      let closing = (trimmed.endsWith('>') || trimmed.endsWith('/>')) ? '' : ' />';
      let indent = line.substring(0, line.indexOf(trimmed));
      return `${indent}<img ${trimmed}${closing}`;
    }
    return line;
  });

  let newContent = fixedLines.join('\n');
  if (newContent !== original) {
    fs.writeFileSync(file, newContent, 'utf8');
    totalFixedFiles++;
    console.log(`[FIXED] ${file}`);
  }
});

console.log(`\nDone! Fixed ${totalFixedTags} broken img tags across ${totalFixedFiles} files.`);
