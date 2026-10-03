const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. index.html
let idx = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
idx = idx.replace(/materials, labour, supervision and finishing/g, 'materials, site execution, supervision and finishing');
fs.writeFileSync(path.join(rootDir, 'index.html'), idx);

// 2. css/style.css
let css = fs.readFileSync(path.join(rootDir, 'css', 'style.css'), 'utf8');
css = css.replace(/Pan-India Manpower & Civil Construction Contractor/g, 'Real Estate Developer & Turnkey Civil Construction Company');
fs.writeFileSync(path.join(rootDir, 'css', 'style.css'), css);

// 3. js/forms.js
let forms = fs.readFileSync(path.join(rootDir, 'js', 'forms.js'), 'utf8');
forms = forms
  .replace(/'manpower-urgent': 'Urgent'/g, "'property-urgent': 'Urgent'")
  .replace(/'manpower-bulk': 'High'/g, "'township-bulk': 'High'")
  .replace(/'manpower-urgent': 'Manpower Operations'/g, "'property-urgent': 'Real Estate Operations'")
  .replace(/'manpower-bulk': 'Senior Operations Manager'/g, "'township-bulk': 'Senior Real Estate Manager'")
  .replace(/'manpower': 'Manpower Operations'/g, "'property': 'Real Estate Sales'")
  .replace(/if \(type === 'manpower'\)/g, "if (type === 'property')")
  .replace(/leadType = 'manpower-bulk'/g, "leadType = 'township-bulk'")
  .replace(/leadType = 'manpower-urgent'/g, "leadType = 'property-urgent'");
fs.writeFileSync(path.join(rootDir, 'js', 'forms.js'), forms);

// 4. js/seo-toolkit.js
let seo = fs.readFileSync(path.join(rootDir, 'js', 'seo-toolkit.js'), 'utf8');
seo = seo.replace(/Prakhar India Manpower & Construction - UP & Pan-India Services/g, 'Prakhar India Real Estate & Construction');
fs.writeFileSync(path.join(rootDir, 'js', 'seo-toolkit.js'), seo);

// 5. pages/admin/dashboard.html
let dash = fs.readFileSync(path.join(rootDir, 'pages', 'admin', 'dashboard.html'), 'utf8');
dash = dash
  .replace(/PRAKHAR INDIA MANPOWER &amp; CONSTRUCTION/g, 'PRAKHAR INDIA REAL ESTATE &amp; CONSTRUCTION')
  .replace(/PRAKHAR INDIA MANPOWER & CONSTRUCTION/g, 'PRAKHAR INDIA REAL ESTATE & CONSTRUCTION')
  .replace(/UP's premier supplier of skilled, semi-skilled &amp; general construction, and government civil building construction contractor/g, "Uttar Pradesh's premier real estate developer and turnkey civil construction company")
  .replace(/MANPOWER &amp; CONSTRUCTION/g, 'REAL ESTATE &amp; CONSTRUCTION');
fs.writeFileSync(path.join(rootDir, 'pages', 'admin', 'dashboard.html'), dash);

// 6. README.md
let readme = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');
readme = `# Prakhar India - Real Estate & Construction Website

Corporate and lead-generation website for Prakhar India, a trusted real estate developer and turnkey civil construction contractor based in Mirzapur, Uttar Pradesh.

## Features
- **Real Estate Development** - Residential villas, apartments, plots, and commercial properties across Uttar Pradesh
- **Turnkey House Construction** - Fixed-price building construction, architectural design, 3D renderings, and structural engineering
- Lead capture forms with smart routing (property, construction, tender, custom build)
- Interactive construction cost per sq ft estimator
`;
fs.writeFileSync(path.join(rootDir, 'README.md'), readme);

console.log('Final cleanup completed successfully.');
