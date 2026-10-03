const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');

const headCommon = `<link rel="stylesheet" href="../css/home.css?v=1.0">
<link rel="icon" href="../images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="../images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

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

// 1. ABOUT PAGE
const aboutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>About Us | Prakhar India Real Estate &amp; Construction</title>
<meta name="description" content="Learn about Prakhar India — leading real estate developer and turnkey civil construction company in Mirzapur, Varanasi, Prayagraj & Uttar Pradesh since 2014.">
<link rel="canonical" href="https://prakharind.com/pages/about.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">About Prakhar India</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Building Trust &amp; Excellence Since 2014</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Developer, builder, and partner — under one roof across Uttar Pradesh.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap about-grid">
    <div class="about-media">
      <div class="img-main"><img src="../images/re-villa.jpg" alt="Prakhar India villa project"></div>
      <div class="img-float"><img src="../images/re-interior.jpg" alt="Interior finishing"></div>
      <div class="about-badge"><strong>2014</strong><span>Founded</span></div>
    </div>
    <div>
      <span class="eyebrow">Our Story &amp; Values</span>
      <h2>Creating benchmark homes &amp; <em>spaces</em>.</h2>
      <p class="lead">Prakhar India Real Estate &amp; Construction was established in Mirzapur with a vision to deliver clear-title properties, transparent contracts, and top-tier civil construction engineering.</p>
      <div class="about-points">
        <div class="about-point"><h4>RERA Verified</h4><p>Complete legal clarity and clear title documentation on every property.</p></div>
        <div class="about-point"><h4>Civil Engineering QA</h4><p>RCC structural designs conforming to IS 456 standards and M25/M30 concrete.</p></div>
        <div class="about-point"><h4>On-Time Handover</h4><p>Fixed timeline milestone schedules with zero price escalation.</p></div>
        <div class="about-point"><h4>Customer First</h4><p>Over 328+ satisfied homeowners and commercial clients across UP.</p></div>
      </div>
      <a href="../index.html#enquire" class="btn btn-dark">Talk to our team</a>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// 2. CONTACT PAGE
const contactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contact Us | Prakhar India Real Estate &amp; Construction</title>
<meta name="description" content="Contact Prakhar India for property site visits, plot enquiries, villa bookings, and turnkey house construction quotes in Mirzapur, Varanasi & UP.">
<link rel="canonical" href="https://prakharind.com/pages/contact.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Get In Touch</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Contact Our Property Advisors</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Schedule a site visit or discuss your custom house construction project with our team.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="contact-grid">
      <div class="contact-info">
        <span class="eyebrow">Mirzapur Corporate HQ</span>
        <h3 style="margin-top:14px;">Prakhar India Real Estate &amp; Construction</h3>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg><div><small>Address</small>Plot No. 14, Industrial Area, Mirzapur City, Uttar Pradesh 231001</div></div>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg><div><small>Phone</small><a href="tel:9044499111">+91 90444 99111</a> / <a href="tel:9125566222">+91 91255 66222</a></div></div>
        <div class="info-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg><div><small>Email</small><a href="mailto:prakharindiaofficial@gmail.com">prakharindiaofficial@gmail.com</a></div></div>
        <div class="info-line" style="border-bottom:0;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><div><small>Office Hours</small>Mon – Sat · 9:00 AM – 7:00 PM</div></div>
        <a href="https://share.google/jQ49i1D6NqlaNtPhE" target="_blank" rel="noopener" class="btn btn-dark" style="margin-top:20px;">Get Directions</a>
      </div>
      <iframe title="Prakhar India Office Location" src="https://maps.google.com/maps?q=Mirzapur%20Uttar%20Pradesh%20231001&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" allowfullscreen></iframe>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// 3. CONSTRUCTION PAGE
const constructionHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Turnkey Civil House Construction Services | Prakhar India</title>
<meta name="description" content="Turnkey house construction, architectural design, 3D floor plans & civil contracting in Mirzapur, Varanasi, Prayagraj & UP. Fixed-price contracts with IS-certified quality.">
<link rel="canonical" href="https://prakharind.com/pages/construction.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Civil Engineering &amp; Construction</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Turnkey House Construction Services</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Your plot, our expertise — from architectural design and map approvals to key handover.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Our Construction Offerings</span>
        <h2>End-to-end building <em>solutions</em></h2>
      </div>
      <p class="lead">Certified architects, structural engineers, and experienced site managers for residential &amp; commercial projects.</p>
    </div>

    <div class="svc-grid">
      <div class="svc">
        <div class="svc-num">01</div>
        <h3>Turnkey House Construction</h3>
        <p>Complete fixed-price house building contract from excavation to luxury paint finish.</p>
        <ul><li>Architectural &amp; Vastu plans</li><li>RCC structural core &amp; brickwork</li><li>Fixed-price contract</li></ul>
      </div>
      <div class="svc">
        <div class="svc-num">02</div>
        <h3>Commercial Buildings</h3>
        <p>Retail showrooms, office complexes, hospitals, and hotels built to strict commercial codes.</p>
        <ul><li>Glass curtain walls</li><li>Fire safety &amp; MEP fittings</li><li>On-time delivery</li></ul>
      </div>
      <div class="svc">
        <div class="svc-num">03</div>
        <h3>Architecture &amp; 3D Elevations</h3>
        <p>2D floor plans, 3D exterior renders, structural drawings, and municipal map approvals.</p>
        <ul><li>2D &amp; 3D designs</li><li>Structural calculations</li><li>Approval assistance</li></ul>
      </div>
      <div class="svc">
        <div class="svc-num">04</div>
        <h3>Home Interiors &amp; Renovation</h3>
        <p>Modular kitchens, custom wardrobes, false ceilings, flooring, and structural repairs.</p>
        <ul><li>Modular kitchens</li><li>Flooring &amp; false ceiling</li><li>Structural repair</li></ul>
      </div>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// 4. PROJECTS PAGE
const projectsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Featured Real Estate &amp; Construction Projects | Prakhar India</title>
<meta name="description" content="Explore Prakhar India's portfolio of luxury villas, residential townships, high-rise apartments, and commercial projects across Uttar Pradesh.">
<link rel="canonical" href="https://prakharind.com/pages/projects.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Our Project Portfolio</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Delivered &amp; Ongoing Projects</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">A showcase of residential townships, luxury villas, commercial towers, and custom homes.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="mosaic">
      <div class="tile t-wide t-tall"><img src="../images/re-hero-tower.jpg" alt="Azure Residences"><div class="tile-cap"><small>Residential · Lucknow</small><h3>Azure Residences</h3><p>14-storey luxury apartment complex.</p></div></div>
      <div class="tile"><img src="../images/re-villa.jpg" alt="Sandstone Villa"><div class="tile-cap"><small>Villa · Varanasi</small><h3>Sandstone Villa</h3><p>Contemporary 4 BHK luxury home.</p></div></div>
      <div class="tile"><img src="../images/re-commercial.jpg" alt="Prakhar Business Square"><div class="tile-cap"><small>Commercial · Prayagraj</small><h3>Business Square</h3><p>High-street commercial office complex.</p></div></div>
      <div class="tile t-wide"><img src="../images/re-township.jpg" alt="Vindhya Greens Township"><div class="tile-cap"><small>Township · Mirzapur</small><h3>Vindhya Greens</h3><p>Gated plotted residential development.</p></div></div>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// 5. MIRZAPUR HUB PAGE
const mirzapurHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Prakhar India Mirzapur HQ | Real Estate &amp; Construction Company Mirzapur</title>
<meta name="description" content="Prakhar India Mirzapur HQ — plots for sale in Mirzapur, luxury independent villas, commercial spaces, and turnkey house construction in Mirzapur City & Vindhyachal.">
<link rel="canonical" href="https://prakharind.com/pages/mirzapur.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Mirzapur Corporate HQ</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Real Estate &amp; Construction in Mirzapur</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Clear-title plots, independent villas, commercial shops, and turnkey home construction across Mirzapur district.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Featured Mirzapur Projects</span>
        <h2>Properties in <em>Mirzapur</em></h2>
      </div>
      <a href="../index.html#enquire" class="btn btn-gold">Book Site Visit</a>
    </div>

    <div class="prop-grid">
      <article class="prop-card">
        <div class="prop-img">
          <img src="../images/re-township.jpg" alt="Vindhya Greens Mirzapur">
          <span class="prop-tag gold">Plotted Township</span>
          <div class="prop-price">₹28 L <small>onwards</small></div>
        </div>
        <div class="prop-body">
          <h3>Vindhya Greens Township</h3>
          <div class="prop-loc">Vindhyachal Road, Mirzapur</div>
          <p style="font-size:0.88rem;color:var(--muted);margin-top:8px;">Gated plots with internal paved roads, streetlights, central green park, and security.</p>
        </div>
      </article>

      <article class="prop-card">
        <div class="prop-img">
          <img src="../images/re-hero-tower.jpg" alt="Ganga Heights Mirzapur">
          <span class="prop-tag">Apartments</span>
          <div class="prop-price">₹38 L <small>onwards</small></div>
        </div>
        <div class="prop-body">
          <h3>Ganga Heights</h3>
          <div class="prop-loc">Natwa, Mirzapur</div>
          <p style="font-size:0.88rem;color:var(--muted);margin-top:8px;">2 &amp; 3 BHK modern apartments with lifts, power backup, and car parking.</p>
        </div>
      </article>

      <article class="prop-card">
        <div class="prop-img">
          <img src="../images/re-villa.jpg" alt="Turnkey House Construction Mirzapur">
          <span class="prop-tag gold">Custom Build</span>
          <div class="prop-price">₹1,450 <small>/ sq.ft onwards</small></div>
        </div>
        <div class="prop-body">
          <h3>Turnkey House Construction</h3>
          <div class="prop-loc">All Locations in Mirzapur</div>
          <p style="font-size:0.88rem;color:var(--muted);margin-top:8px;">Build your dream home on your plot with our engineer-supervised civil construction team.</p>
        </div>
      </article>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// Write core pages
fs.writeFileSync(path.join(pagesDir, 'about.html'), aboutHtml);
fs.writeFileSync(path.join(pagesDir, 'contact.html'), contactHtml);
fs.writeFileSync(path.join(pagesDir, 'construction.html'), constructionHtml);
fs.writeFileSync(path.join(pagesDir, 'projects.html'), projectsHtml);
fs.writeFileSync(path.join(pagesDir, 'mirzapur.html'), mirzapurHtml);

console.log('Core pages written successfully.');
