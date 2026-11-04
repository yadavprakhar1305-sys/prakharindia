const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.vercel', 'legacy-site', 'scratch', 'stage', 'wordpress-theme', 'prakharind.com-audit'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
};

const files = walk(root);
const rows = [];
for (const f of files) {
  if (/admin|login|signup/.test(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const head = (html.split('</head>')[0] || '');
  const get = (re) => { const m = head.match(re); return m ? (m[1] || '').trim() : ''; };
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const title = get(/<title[^>]*>([\s\S]*?)<\/title>/i).replace(/\s+/g, ' ');
  const desc = get(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || get(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const canonical = get(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  const ogTitle = get(/property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  const ogImage = get(/property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  const h1s = (html.match(/<h1\b/gi) || []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const missingAlt = imgs.filter(t => !/\balt=/.test(t)).length;
  const jsonldType = get(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/i);
  rows.push({ rel, titleLen: title.length, title, descLen: desc.length, canonical, ogTitle: !!ogTitle, ogImage, h1s, imgs: imgs.length, missingAlt });
}

// sitemap URLs
const sm = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const smPaths = new Set(locs.map(u => u.replace('https://prakharind.com/', '').replace(/\/$/, 'index.html') || 'index.html'));
const fileSet = new Set(rows.map(r => r.rel));

const report = {
  totalHtml: files.length,
  audited: rows.length,
  issues: {
    titleTooLong: rows.filter(r => r.titleLen > 60).map(r => `${r.rel} (${r.titleLen})`),
    titleTooShort: rows.filter(r => r.titleLen < 25).map(r => `${r.rel} (${r.titleLen})`),
    descTooLong: rows.filter(r => r.descLen > 160).map(r => `${r.rel} (${r.descLen})`),
    descTooShort: rows.filter(r => r.descLen < 70).map(r => `${r.rel} (${r.descLen})`),
    noCanonical: rows.filter(r => !r.canonical).map(r => r.rel),
    noOgTitle: rows.filter(r => !r.ogTitle).map(r => r.rel),
    noOgImage: rows.filter(r => !r.ogImage).map(r => r.rel),
    noH1: rows.filter(r => r.h1s === 0).map(r => r.rel),
    multiH1: rows.filter(r => r.h1s > 1).map(r => `${r.rel} (${r.h1s})`),
    imgNoAlt: rows.filter(r => r.missingAlt > 0).map(r => `${r.rel} (${r.missingAlt}/${r.imgs})`),
  },
  sitemapMissingFiles: locs.filter(u => {
    const p = u.replace('https://prakharind.com/', '').replace(/\/$/, 'index.html') || 'index.html';
    return !fileSet.has(p) && p !== 'index.html';
  }),
  filesNotInSitemap: [...fileSet].filter(f => {
    const u = f === 'index.html' ? '' : f;
    return !locs.some(l => l.replace('https://prakharind.com/', '').replace(/\/$/, 'index.html') === (u || 'index.html'));
  }).filter(f => !/admin\/dashboard/.test(f)),
  titles: rows.map(r => `${r.rel} | ${r.titleLen} | ${r.title}`),
};

fs.writeFileSync(path.join(__dirname, 'seo-audit-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ totalHtml: report.totalHtml, audited: report.audited, issues: Object.fromEntries(Object.entries(report.issues).map(([k, v]) => [k, v.length])), sitemapMissingFiles: report.sitemapMissingFiles, filesNotInSitemap: report.filesNotInSitemap.length }, null, 2));
