const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pagesDir = path.join(root, 'pages');
const blogDir = path.join(root, 'blog');

const filesToAudit = ['index.html'];

fs.readdirSync(pagesDir).forEach(f => {
  if (f.endsWith('.html') && !['login.html', 'signup.html', 'admin.html'].includes(f)) {
    filesToAudit.push('pages/' + f);
  }
});

fs.readdirSync(blogDir).forEach(f => {
  if (f.endsWith('.html')) {
    filesToAudit.push('blog/' + f);
  }
});

console.log(`Auditing SEO on ${filesToAudit.length} pages...`);

let issues = 0;
filesToAudit.forEach(f => {
  const full = path.join(root, f);
  const html = fs.readFileSync(full, 'utf8');

  const hasTitle = /<title>[^<]+<\/title>/i.test(html);
  const hasDesc = /<meta\s+name=["']description["']/i.test(html);
  const hasCanonical = /<link\s+rel=["']canonical["']/i.test(html);
  const hasViewport = /<meta\s+name=["']viewport["']/i.test(html);
  const hasSchema = /<script\s+type=["']application\/ld\+json["']/i.test(html);
  const hasH1 = /<h1/i.test(html);

  if (!hasTitle || !hasDesc || !hasCanonical || !hasViewport || !hasH1) {
    console.log(`⚠️ Issues in ${f}:`, { hasTitle, hasDesc, hasCanonical, hasViewport, hasSchema, hasH1 });
    issues++;
  }
});

if (issues === 0) {
  console.log(`🎉 All ${filesToAudit.length} pages passed complete SEO audits! (Title, Meta Description, Canonical, Viewport, H1 Tag present on every page)`);
} else {
  console.log(`Found issues in ${issues} pages`);
}
