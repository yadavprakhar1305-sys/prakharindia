const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');

// Standard Luxury Real Estate Header HTML for pages/
const headerHtml = `<div class="topbar">
  <div class="wrap">
    <span>Mirzapur · Varanasi · Prayagraj · Lucknow</span>
    <div class="topbar-links">
      <a href="mailto:prakharindiaofficial@gmail.com">prakharindiaofficial@gmail.com</a>
      <span>Mon – Sat · 9:00 AM – 7:00 PM</span>
    </div>
  </div>
</div>

<header class="header" id="siteHeader">
  <div class="wrap">
    <a href="../index.html" class="brand">
      <img src="../images/logo.png" alt="Prakhar India logo" width="46" height="46">
      <div>
        <span class="brand-name">PRAKHAR INDIA</span>
        <span class="brand-tag">Real Estate &amp; Construction</span>
      </div>
    </a>
    <nav class="nav" id="mainNav">
      <a href="../index.html">Home</a>
      <a href="../index.html#properties">Properties</a>
      <a href="construction.html">Construction</a>
      <a href="projects.html">Projects</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-cta">
      <a href="tel:9044499111" class="header-phone">
        <span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg></span>
        <b>+91 90444 99111</b>
      </a>
      <a href="../index.html#enquire" class="btn btn-gold">Book a Site Visit</a>
    </div>
  </div>
</header>`;

const footerHtml = `<footer class="footer">
  <div class="wrap">
    <div class="footer-cta">
      <h2>Ready to own a place that's <em>truly yours?</em></h2>
      <a href="../index.html#enquire" class="btn btn-gold">Book a site visit</a>
    </div>
    <div class="footer-grid">
      <div class="footer-about">
        <a href="../index.html" class="brand"><img src="../images/logo.png" alt="Prakhar India logo" width="46" height="46"><div><span class="brand-name">PRAKHAR INDIA</span><span class="brand-tag">Real Estate &amp; Construction</span></div></a>
        <p>Developing homes, plots and commercial spaces — and building them right — across Uttar Pradesh since 2014.</p>
      </div>
      <div>
        <h4>Properties</h4>
        <ul>
          <li><a href="../index.html#properties">Villas &amp; Houses</a></li>
          <li><a href="../index.html#properties">Apartments</a></li>
          <li><a href="../index.html#properties">Residential Plots</a></li>
          <li><a href="../index.html#properties">Commercial Spaces</a></li>
        </ul>
      </div>
      <div>
        <h4>Construction</h4>
        <ul>
          <li><a href="construction.html">Turnkey Construction</a></li>
          <li><a href="construction.html">Architecture &amp; Design</a></li>
          <li><a href="construction.html">Interiors &amp; Renovation</a></li>
          <li><a href="../index.html#estimator">Cost Estimator</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="../blog/">Blog &amp; Insights</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Prakhar India Real Estate &amp; Construction. All rights reserved.</span>
      <nav>
        <a href="privacy-policy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="grievance.html">Grievance</a>
      </nav>
    </div>
  </div>
</footer>`;

// Common text replacements across files
function sanitizeContent(html) {
  return html
    .replace(/Prakhar India Manpower &amp; Construction/g, 'Prakhar India Real Estate &amp; Construction')
    .replace(/Prakhar India Manpower & Construction/g, 'Prakhar India Real Estate & Construction')
    .replace(/PRAKHAR INDIA MANPOWER &amp; CONSTRUCTION/g, 'PRAKHAR INDIA REAL ESTATE &amp; CONSTRUCTION')
    .replace(/PRAKHAR INDIA MANPOWER & CONSTRUCTION/g, 'PRAKHAR INDIA REAL ESTATE & CONSTRUCTION')
    .replace(/Prakhar Enterprises – Manpower Supply Company/g, 'Prakhar India Real Estate & Construction')
    .replace(/Manpower &amp; Construction/g, 'Real Estate &amp; Construction')
    .replace(/Manpower & Construction/g, 'Real Estate & Construction')
    .replace(/MANPOWER &amp; CONSTRUCTION/g, 'REAL ESTATE &amp; CONSTRUCTION')
    .replace(/manpower supply company/ig, 'real estate developer')
    .replace(/manpower supply/ig, 'real estate development')
    .replace(/labour thekedar/ig, 'building contractor')
    .replace(/labour contractor/ig, 'civil contractor')
    .replace(/manpower/ig, 'real estate')
    .replace(/labourers/ig, 'site team')
    .replace(/labour/ig, 'construction team')
    .replace(/workforce/ig, 'building projects')
    .replace(/EPF\/ESIC/g, 'RERA')
    .replace(/EPF and ESIC/g, 'RERA & ISO')
    .replace(/mistri/ig, 'mason')
    .replace(/thekedar/ig, 'contractor')
    .replace(/thekedari/ig, 'contracting');
}

console.log('Sanitizer script ready.');
