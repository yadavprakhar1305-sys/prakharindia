const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    if (['node_modules', '.git', 'legacy-site', 'stage'].includes(item)) continue;
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) getHtmlFiles(full, files);
    else if (item.endsWith('.html')) files.push(full);
  }
  return files;
}

const files = getHtmlFiles('.');
const pageMap = new Map();

files.forEach(f => {
  const norm = path.relative('.', f).replace(/\\/g, '/');
  pageMap.set(norm, { file: norm, inLinks: [], outLinks: [] });
});

files.forEach(f => {
  const sourceNorm = path.relative('.', f).replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf8');
  const hrefs = [...content.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  
  hrefs.forEach(href => {
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('data:')) return;
    let cleanHref = href.split('#')[0].split('?')[0];
    if (!cleanHref) return;
    
    // Convert root-relative links (/pages/...) to site-relative (pages/...)
    let resolved;
    if (cleanHref.startsWith('/')) {
      resolved = cleanHref.replace(/^\//, '');
    } else {
      resolved = path.normalize(path.join(path.dirname(sourceNorm), cleanHref)).replace(/\\/g, '/');
    }
    
    let target = resolved;
    if (target === '' || target === '.' || target === '/') target = 'index.html';
    if (target.endsWith('/')) target = target.slice(0, -1);
    if (!pageMap.has(target) && pageMap.has(target + '/index.html')) target = target + '/index.html';
    if (!pageMap.has(target) && pageMap.has(target + '.html')) target = target + '.html';
    
    if (pageMap.has(target)) {
      pageMap.get(target).inLinks.push(sourceNorm);
      pageMap.get(sourceNorm).outLinks.push(target);
    }
  });
});

console.log('--- INBOUND LINK REPORT (ORPHANS & LOW-LINK PAGES) ---');
for (const [file, data] of pageMap.entries()) {
  const uniqueIn = [...new Set(data.inLinks)];
  if (uniqueIn.length <= 2) {
    console.log(`${file}: ${uniqueIn.length} inbound links -> [${uniqueIn.join(', ')}]`);
  }
}
