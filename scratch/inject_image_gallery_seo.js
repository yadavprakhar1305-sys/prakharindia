const fs = require('fs');

const imageGalleryHtml = `
<!-- PRAKHAR INDIA — VISUAL INDUSTRIAL GALLERY & IMAGE SEO -->
<section class="image-seo-gallery" style="background:#f8fafc; padding:48px 0; border-top:1px solid #e2e8f0; border-bottom:1px solid #e2e8f0; margin:40px 0; font-family:'Outfit', sans-serif;">
  <div class="container" style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <div style="text-align:center; max-width:800px; margin:0 auto 32px;">
      <span style="color:#f97316; font-weight:700; text-transform:uppercase; letter-spacing:1px; font-size:0.85rem;">Official Project Gallery</span>
      <h2 style="font-size:1.8rem; color:#0f172a; font-weight:800; margin-top:4px;">Workforce &amp; Civil Construction Site Operations — prakharind.com</h2>
      <p style="color:#64748b; font-size:0.95rem;">Verified industrial manufacturing, power plant labour, and commercial civil construction projects across India.</p>
    </div>

    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
      <figure style="margin:0; background:#fff; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        <a href="https://prakharind.com/pages/manpower-maharashtra.html" title="Prakhar India — Maharashtra Industrial Manpower &amp; MIDC Construction (prakharind.com)" style="display:block; overflow:hidden;">
          <img src="/images/maharashtra-industrial.jpg" alt="Prakhar India — Maharashtra Industrial Manpower &amp; MIDC Construction | prakharind.com" title="Maharashtra Industrial Manpower — prakharind.com" loading="lazy" decoding="async" style="width:100%; height:240px; object-fit:cover; display:block; transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </a>
        <figcaption style="padding:14px 18px; font-size:0.88rem; color:#334155; border-top:1px solid #f1f5f9; background:#fff;">
          <strong>Maharashtra MIDC Industrial &amp; Construction Operations</strong><br>
          <span style="color:#64748b; font-size:0.82rem;">Source &amp; Verification: <a href="https://prakharind.com/pages/manpower-maharashtra.html" style="color:#0284c7; text-decoration:none; font-weight:600;">prakharind.com/maharashtra</a></span>
        </figcaption>
      </figure>

      <figure style="margin:0; background:#fff; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        <a href="https://prakharind.com/pages/manpower-gujarat.html" title="Prakhar India — Gujarat GIDC Manufacturing &amp; Chemical Plant Staffing (prakharind.com)" style="display:block; overflow:hidden;">
          <img src="/images/gujarat-manufacturing.jpg" alt="Prakhar India — Gujarat GIDC Manufacturing &amp; Chemical Plant Staffing | prakharind.com" title="Gujarat GIDC Manufacturing — prakharind.com" loading="lazy" decoding="async" style="width:100%; height:240px; object-fit:cover; display:block; transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </a>
        <figcaption style="padding:14px 18px; font-size:0.88rem; color:#334155; border-top:1px solid #f1f5f9; background:#fff;">
          <strong>Gujarat GIDC Manufacturing &amp; Chemical Plant Staffing</strong><br>
          <span style="color:#64748b; font-size:0.82rem;">Source &amp; Verification: <a href="https://prakharind.com/pages/manpower-gujarat.html" style="color:#0284c7; text-decoration:none; font-weight:600;">prakharind.com/gujarat</a></span>
        </figcaption>
      </figure>

      <figure style="margin:0; background:#fff; border:1px solid #cbd5e1; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        <a href="https://prakharind.com/pages/manpower-uttar-pradesh.html" title="Prakhar India — Pan-India Industrial Workforce &amp; Civil Construction (prakharind.com)" style="display:block; overflow:hidden;">
          <img src="/images/pan-india-workforce.jpg" alt="Prakhar India — Pan-India Industrial Workforce &amp; Civil Construction | prakharind.com" title="Pan-India Industrial Workforce — prakharind.com" loading="lazy" decoding="async" style="width:100%; height:240px; object-fit:cover; display:block; transition:transform 0.3s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </a>
        <figcaption style="padding:14px 18px; font-size:0.88rem; color:#334155; border-top:1px solid #f1f5f9; background:#fff;">
          <strong>Pan-India EPF/ESIC Compliant Industrial Workforce</strong><br>
          <span style="color:#64748b; font-size:0.82rem;">Source &amp; Verification: <a href="https://prakharind.com/" style="color:#0284c7; text-decoration:none; font-weight:600;">prakharind.com</a></span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>
`;

const targetPages = [
  'index.html',
  'pages/manpower.html',
  'pages/construction.html',
  'pages/locations.html',
  'blog/index.html'
];

targetPages.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('class="image-seo-gallery"')) {
      content = content.replace(/<footer class="footer"/, `${imageGalleryHtml}\n<footer class="footer"`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Injected SEO Image Gallery with prakharind.com links in ${file}`);
    }
  }
});
