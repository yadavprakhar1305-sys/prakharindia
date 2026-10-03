const fs = require('fs');
const path = require('path');

// 1. Copy generated logo image
const brainDir = 'C:\\Users\\yadav\\.gemini\\antigravity-ide\\brain\\f838c343-f8b8-497c-825c-b401a761b303';
const targetImagesDir = 'images';

if (!fs.existsSync(targetImagesDir)) {
  fs.mkdirSync(targetImagesDir, { recursive: true });
}

const brainFiles = fs.readdirSync(brainDir);
const matchedLogo = brainFiles.find(f => f.startsWith('prakhar_india_logo') && f.endsWith('.jpg'));

if (matchedLogo) {
  const srcPath = path.join(brainDir, matchedLogo);
  fs.copyFileSync(srcPath, path.join(targetImagesDir, 'logo.jpg'));
  fs.copyFileSync(srcPath, path.join(targetImagesDir, 'logo.png'));
  fs.copyFileSync(srcPath, path.join(targetImagesDir, 'favicon.png'));
  console.log(`Copied logo asset to ${targetImagesDir}/logo.png and favicon.png`);
}

// 2. Create SVG Vector Logo Fallback
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
  <defs>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>
  <!-- Helmet & Crane Mark -->
  <path d="M 20,60 A 25,25 0 0,1 70,60 Z" fill="url(#orangeGrad)" />
  <path d="M 15,62 L 75,62 L 75,67 L 15,67 Z" fill="url(#blueGrad)" />
  <polygon points="35,62 70,15 75,18 40,62" fill="url(#blueGrad)" />
  <polygon points="65,15 70,15 70,30 65,30" fill="url(#orangeGrad)" />
  <!-- Text -->
  <text x="90" y="48" font-family="'Outfit', 'Inter', sans-serif" font-weight="800" font-size="32" fill="#0f172a">PRAKHAR INDIA</text>
  <text x="92" y="70" font-family="'Outfit', 'Inter', sans-serif" font-weight="600" font-size="14" fill="#f97316" letter-spacing="2">MANPOWER &amp; CONSTRUCTION</text>
</svg>`;

fs.writeFileSync(path.join(targetImagesDir, 'logo.svg'), svgLogo, 'utf8');

// 3. Process all HTML files to update Navbar Logo and Browser Favicon
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
console.log(`Updating Navbar Logo and Browser Favicon across ${htmlFiles.length} HTML files...`);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let relPath = file.replace(/\\/g, '/');
  
  const logoImgPath = relPath.startsWith('pages/') || relPath.startsWith('blog/') ? '../images/logo.png' : 'images/logo.png';
  const faviconImgPath = relPath.startsWith('pages/') || relPath.startsWith('blog/') ? '../images/favicon.png' : 'images/favicon.png';

  // Update Favicon tag in <head>
  const newFaviconTag = `<link rel="icon" href="${faviconImgPath}" type="image/png">\n<link rel="apple-touch-icon" href="${faviconImgPath}">`;
  if (content.includes('<link rel="icon"')) {
    content = content.replace(/<link\s+rel=["']icon["'][^>]*>/i, newFaviconTag);
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', `${newFaviconTag}\n</head>`);
  }

  // Update Navbar Logo anchor tag
  const logoMarkup = `<a href="${relPath.startsWith('pages/') || relPath.startsWith('blog/') ? '../index.html' : 'index.html'}" class="logo" style="display:flex; align-items:center; text-decoration:none;"><img src="${logoImgPath}" alt="Prakhar India — prakharind.com" title="Prakhar India Manpower &amp; Construction — prakharind.com" style="height:38px; width:auto; border-radius:4px; margin-right:10px; object-fit:contain;"> <span style="font-weight:800; color:#0f172a; font-size:1.2rem;">Prakhar India</span></a>`;

  if (content.includes('class="logo"')) {
    content = content.replace(/<a\s+[^>]*class=["']logo["'][^>]*>([\s\S]*?)<\/a>/i, logoMarkup);
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully updated Navbar logo and Browser tab favicons site-wide.');
