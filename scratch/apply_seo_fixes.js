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
console.log(`Found ${htmlFiles.length} HTML files to update with Pan-India footer directory.`);

const footerHtml = `
<!-- UNIVERSAL PAN-INDIA MANPOWER & CONSTRUCTION FOOTER MATRIX -->
<footer class="footer" style="background:#0f172a; color:#f8fafc; padding:3.5rem 0 2rem; border-top:1px solid #334155; margin-top:4rem; font-family:'Outfit', sans-serif;">
  <div class="container" style="max-width:1200px; margin:0 auto; padding:0 1.5rem;">
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem; border-bottom:1px solid #334155; padding-bottom:1.5rem; margin-bottom:2rem;">
      <div>
        <h3 style="color:#fff; font-size:1.5rem; margin:0 0 0.25rem; font-weight:800;">Prakhar India <span style="color:#f97316; font-size:0.9rem; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Manpower &amp; Construction Contractor</span></h3>
        <p style="color:#94a3b8; margin:0; font-size:0.9rem;">Government Registered &amp; 100% EPF/ESIC Compliant Workforce Provider Across All Indian States &amp; UTs.</p>
      </div>
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <a href="tel:9044499111" style="background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; text-decoration:none; font-size:0.9rem;">📞 Call +91 9044499111</a>
        <a href="https://api.whatsapp.com/send?phone=919044499111&text=Hello%20Prakhar%20India!%20I%20need%20manpower%20%2F%20construction%20services." target="_blank" rel="noopener" style="background:#25d366; color:#fff; padding:0.6rem 1.2rem; border-radius:8px; font-weight:700; text-decoration:none; font-size:0.9rem;">💬 WhatsApp Us</a>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:2rem; font-size:0.86rem; line-height:1.8;">
      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Northern &amp; Western States:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="/pages/manpower-maharashtra.html" style="color:#cbd5e1; text-decoration:none;">Manpower Maharashtra</a></li>
          <li><a href="/pages/manpower-gujarat.html" style="color:#cbd5e1; text-decoration:none;">Labour Supplier Gujarat</a></li>
          <li><a href="/pages/manpower-delhi-ncr.html" style="color:#cbd5e1; text-decoration:none;">Delhi NCR Workforce</a></li>
          <li><a href="/pages/manpower-rajasthan.html" style="color:#cbd5e1; text-decoration:none;">Manpower Rajasthan</a></li>
          <li><a href="/pages/manpower-punjab.html" style="color:#cbd5e1; text-decoration:none;">Labour Contractor Punjab</a></li>
          <li><a href="/pages/manpower-uttarakhand.html" style="color:#cbd5e1; text-decoration:none;">Uttarakhand SIDCUL Labour</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Southern &amp; Central States:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="/pages/manpower-karnataka.html" style="color:#cbd5e1; text-decoration:none;">Manpower Karnataka</a></li>
          <li><a href="/pages/manpower-tamil-nadu.html" style="color:#cbd5e1; text-decoration:none;">Tamil Nadu Industrial Labour</a></li>
          <li><a href="/pages/manpower-telangana.html" style="color:#cbd5e1; text-decoration:none;">Telangana Manpower Agency</a></li>
          <li><a href="/pages/manpower-madhya-pradesh.html" style="color:#cbd5e1; text-decoration:none;">Madhya Pradesh Labour</a></li>
          <li><a href="/pages/manpower-chhattisgarh.html" style="color:#cbd5e1; text-decoration:none;">Chhattisgarh Mining Labour</a></li>
          <li><a href="/pages/manpower-uttar-pradesh.html" style="color:#cbd5e1; text-decoration:none;">Uttar Pradesh Manpower Hub</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Eastern &amp; North-East States:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="/pages/manpower-west-bengal.html" style="color:#cbd5e1; text-decoration:none;">West Bengal Labour</a></li>
          <li><a href="/pages/manpower-bihar.html" style="color:#cbd5e1; text-decoration:none;">Manpower Supplier Bihar</a></li>
          <li><a href="/pages/manpower-odisha.html" style="color:#cbd5e1; text-decoration:none;">Odisha Steel Plant Labour</a></li>
          <li><a href="/pages/manpower-jharkhand.html" style="color:#cbd5e1; text-decoration:none;">Jharkhand Mining Manpower</a></li>
          <li><a href="/pages/manpower-assam.html" style="color:#cbd5e1; text-decoration:none;">Assam Industrial Labour</a></li>
          <li><a href="/pages/manpower-sonbhadra.html" style="color:#cbd5e1; text-decoration:none;">Sonbhadra Power Hub</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">State Research &amp; Blogs:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="/blog/pan-india-industrial-manpower-supply-report-2026.html" style="color:#38bdf8; text-decoration:none; font-weight:700;">📊 Pan-India Report 2026</a></li>
          <li><a href="/blog/maharashtra-industrial-manpower-demand-2026.html" style="color:#cbd5e1; text-decoration:none;">Maharashtra MIDC Trends</a></li>
          <li><a href="/blog/gujarat-manufacturing-workforce-trends-2026.html" style="color:#cbd5e1; text-decoration:none;">Gujarat GIDC Report</a></li>
          <li><a href="/blog/karnataka-tech-park-construction-labour-guide.html" style="color:#cbd5e1; text-decoration:none;">Karnataka Labour Guide</a></li>
          <li><a href="/blog/delhi-ncr-infrastructure-workforce-sourcing.html" style="color:#cbd5e1; text-decoration:none;">Delhi NCR Infra Guide</a></li>
          <li><a href="/pages/book-workforce.html" style="color:#f59e0b; text-decoration:none; font-weight:700;">⚡ Book Labour Online</a></li>
        </ul>
      </div>
    </div>

    <div style="border-top:1px solid #1e293b; margin-top:2.5rem; padding-top:1.5rem; text-align:center; color:#64748b; font-size:0.8rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <div>© 2026 Prakhar India Manpower &amp; Construction Contractor. Plot No. 14, Industrial Area, Mirzapur, UP 231001.</div>
      <div style="display:flex; gap:1.2rem;">
        <a href="/pages/privacy-policy.html" style="color:#64748b; text-decoration:none;">Privacy Policy</a>
        <a href="/pages/terms.html" style="color:#64748b; text-decoration:none;">Terms &amp; Conditions</a>
        <a href="/pages/grievance.html" style="color:#64748b; text-decoration:none;">Grievance Redressal</a>
      </div>
    </div>
  </div>
</footer>
`;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let relPath = file.replace(/\\/g, '/');
  
  // 1. Add Blog Link to header nav if missing
  if (content.includes('<nav class="nav">') && !content.includes('href="/blog/"') && !content.includes('href="../blog/"') && !content.includes('href="blog/"')) {
    let blogLink = relPath.startsWith('pages/') || relPath.startsWith('blog/') ? '<a href="../blog/" style="color:#38bdf8;font-weight:600;">📝 Blog</a>' : '<a href="blog/" style="color:#38bdf8;font-weight:600;">📝 Blog</a>';
    content = content.replace(/<nav class="nav">([\s\S]*?)<\/nav>/, (match, p1) => {
      if (p1.includes('Contact')) {
        return `<nav class="nav">${p1.replace('<a href="contact.html">Contact</a>', `${blogLink}\n      <a href="contact.html">Contact</a>`)}</nav>`;
      } else {
        return `<nav class="nav">${p1}\n      ${blogLink}</nav>`;
      }
    });
  }

  // 2. Inject or Update Footer
  if (content.includes('<footer class="footer"')) {
    content = content.replace(/<footer class="footer"[\s\S]*?<\/footer>/, footerHtml);
  } else if (content.includes('</body>')) {
    content = content.replace('</body>', `${footerHtml}\n</body>`);
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Successfully updated site-wide navigation and injected Pan-India SEO footer matrix.');
