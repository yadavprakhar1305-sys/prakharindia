const fs = require('fs');

const cssPath = 'css/style.css';
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  
  const alignmentCSS = `
/* 🌟 UNIVERSAL CONTENT ALIGNMENT & HEADER OVERLAP FIX */
.page-header {
  padding-top: calc(var(--header-h) + 36px) !important;
  padding-bottom: 40px !important;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
  color: var(--white) !important;
}

main, article, .article-body, .policy-content, .booking-wrapper {
  margin-top: 10px;
}

.header-inner {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}

.logo {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  text-decoration: none !important;
}

.logo img {
  max-height: 40px !important;
  width: auto !important;
  display: inline-block !important;
  vertical-align: middle !important;
}

.grid-4, .location-grid {
  align-items: stretch !important;
}

.location-item, .card {
  box-sizing: border-box !important;
  word-break: break-word !important;
}
`;

  if (!css.includes('UNIVERSAL CONTENT ALIGNMENT')) {
    css += `\n${alignmentCSS}`;
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('Appended alignment & header overlap CSS rules to css/style.css.');
  }
}
