const fs = require('fs');

const metaFixes = {
  'index.html': 'Prakhar India: Leading manpower supplier & civil construction contractor in UP & India. 100% compliant skilled labour, mistri & workers. Call +91 9044499111.',
  'pages/construction.html': 'Top civil construction contractor in UP & India. Turnkey residential, commercial, industrial building construction & tender contracts. Call +91 9044499111.',
  'pages/locations.html': 'Prakhar India regional service hubs: Manpower supply & civil construction across Mirzapur, Sonbhadra, Lucknow, Noida, Varanasi & Uttar Pradesh.',
  'pages/manpower-ayodhya.html': 'Best manpower supplier & labour contractor in Ayodhya, UP. EPF/ESIC compliant construction labour, mistri & industrial workforce. Call +91 9044499111.',
  'pages/manpower.html': 'Prakhar India: Nationwide manpower supply agency. Skilled, semi-skilled & industrial labour for factories, plants & civil construction in UP & India.',
  'pages/mirzapur.html': '#1 manpower supplier & construction contractor in Mirzapur, UP. Skilled mistri, labourers, carpenters, electricians & factory workers. Call +91 9044499111.',
  'pages/privacy-policy.html': 'Prakhar India Privacy Policy: How we protect user, client, worker, and business enquiry data on our website and digital services platform.',
  'pages/terms.html': 'Prakhar India Terms and Conditions: Official terms of service for manpower contracting, civil construction, worker bookings, and site services.'
};

for (const [file, newDesc] of Object.entries(metaFixes)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${newDesc}">`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated meta description for ${file} (${newDesc.length} chars).`);
  }
}

// Expand book-workforce.html content
const bookFile = 'pages/book-workforce.html';
if (fs.existsSync(bookFile)) {
  let content = fs.readFileSync(bookFile, 'utf8');
  if (!content.includes('id="workforce-guide-section"')) {
    const richSection = `
    <!-- ENRICHED WORKFORCE BOOKING & STATUTORY COMPLIANCE GUIDE -->
    <section id="workforce-guide-section" style="max-width:1200px; margin:40px auto; padding:32px 24px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; font-family:'Outfit', sans-serif;">
      <h2 style="font-size:1.6rem; color:#0f172a; margin-bottom:16px; font-weight:700;">How to Book Verified Labour &amp; Construction Mistri Online with Prakhar India</h2>
      <p style="color:#475569; line-height:1.7; margin-bottom:20px;">
        Prakhar India provides a streamlined, 100% legally compliant digital workforce booking system for residential home builders, commercial contractors, industrial plants, and government project executors across Mirzapur, Varanasi, Sonbhadra, Lucknow, Noida, and all Uttar Pradesh.
      </p>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:28px;">
        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #cbd5e1;">
          <h3 style="font-size:1.1rem; color:#0284c7; margin-bottom:8px; font-weight:600;">100% EPF &amp; ESIC Statutory Compliance</h3>
          <p style="font-size:0.9rem; color:#64748b; margin:0; line-height:1.6;">Every worker dispatched by Prakhar India is covered under mandatory Employees Provident Fund (EPF), Employees State Insurance (ESIC), and Workmen Compensation policies. We provide monthly statutory compliance challans with every commercial invoice.</p>
        </div>
        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #cbd5e1;">
          <h3 style="font-size:1.1rem; color:#0284c7; margin-bottom:8px; font-weight:600;">24 to 48-Hour Rapid Onsite Deployment</h3>
          <p style="font-size:0.9rem; color:#64748b; margin:0; line-height:1.6;">Our centralized workforce mobilization hubs in Mirzapur and Lucknow enable rapid deployment of skilled masons (mistri), bar benders, shuttering carpenters, electricians, and general construction labour directly to your project site within 24 to 48 hours.</p>
        </div>
        <div style="background:#fff; padding:20px; border-radius:8px; border:1px solid #cbd5e1;">
          <h3 style="font-size:1.1rem; color:#0284c7; margin-bottom:8px; font-weight:600;">Transparent Rates &amp; Zero Hidden Fees</h3>
          <p style="font-size:0.9rem; color:#64748b; margin:0; line-height:1.6;">View instant daily wage and monthly contract rates upfront. All rates reflect official UP state minimum wage notifications, basic worker pay, tool allowances, and statutory benefits with no hidden agency markups.</p>
        </div>
      </div>

      <h3 style="font-size:1.3rem; color:#0f172a; margin-bottom:12px; font-weight:700;">Categories of Skilled &amp; Unskilled Workforce Available for Booking</h3>
      <ul style="color:#334155; line-height:1.8; margin-left:20px; margin-bottom:24px;">
        <li><strong>General Construction Labour:</strong> Excavation, material handling, concrete mixing, brick carrying, site cleaning, and helper roles.</li>
        <li><strong>Civil Mason (Mistri):</strong> Brickwork, plastering, stone masonry, RCC casting, tile fitting, and foundation work.</li>
        <li><strong>Shuttering Carpenter:</strong> Wooden formwork, ply shuttering, staging, scaffolding, and column box assembly.</li>
        <li><strong>Bar Bender &amp; Steel Fixer:</strong> Rebar cutting, bending, tying, mesh placement, and slab reinforcement.</li>
        <li><strong>Industrial Technicians &amp; Electricians:</strong> Cable laying, panel wiring, conduit fixing, generator maintenance, and factory maintenance crew.</li>
        <li><strong>Welders &amp; Fitters:</strong> Structural steel fabrication, MIG/TIG welding, pipeline fitting, and industrial plant assembly.</li>
      </ul>

      <div style="background:#0f172a; color:#fff; padding:20px 24px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <h4 style="margin:0 0 4px; font-size:1.1rem; color:#f97316;">Need Customized Bulk Workforce Deployment?</h4>
          <p style="margin:0; font-size:0.88rem; color:#cbd5e1;">For contracts requiring 50+ workers or long-term industrial plant staffing, speak directly with our deployment directors.</p>
        </div>
        <a href="tel:9044499111" style="background:#f97316; color:#fff; padding:10px 20px; border-radius:6px; font-weight:700; text-decoration:none; font-size:0.95rem;">Call +91 9044499111</a>
      </div>
    </section>
    `;
    content = content.replace(/<\/footer>/, `</footer>\n${richSection}`);
    fs.writeFileSync(bookFile, content, 'utf8');
    console.log('Expanded content on pages/book-workforce.html.');
  }
}
