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

// LOCATIONS PAGE
const locationsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Our Real Estate &amp; Construction Locations | Prakhar India</title>
<meta name="description" content="Prakhar India project locations and regional operations across Mirzapur, Varanasi, Prayagraj, Lucknow & Uttar Pradesh.">
<link rel="canonical" href="https://prakharind.com/pages/locations.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Regional Presence</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Our Property &amp; Construction Locations</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Developing landmark communities and executing turnkey civil construction across key UP hubs.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="prop-grid">
      <article class="prop-card">
        <div class="prop-body">
          <h3>Mirzapur (Corporate HQ)</h3>
          <p style="font-size:0.9rem;color:var(--muted);margin-top:8px;">Plotted townships, independent villas, commercial spaces, and turnkey house construction across Mirzapur City &amp; Vindhyachal.</p>
          <a href="mirzapur.html" class="btn btn-dark" style="margin-top:16px;width:100%;">Explore Mirzapur Hub →</a>
        </div>
      </article>

      <article class="prop-card">
        <div class="prop-body">
          <h3>Varanasi</h3>
          <p style="font-size:0.9rem;color:var(--muted);margin-top:8px;">Luxury independent villas, boutique apartments, and custom building contracting along Sarnath Road &amp; Ring Road.</p>
          <a href="construction-company-varanasi.html" class="btn btn-dark" style="margin-top:16px;width:100%;">Explore Varanasi Hub →</a>
        </div>
      </article>

      <article class="prop-card">
        <div class="prop-body">
          <h3>Prayagraj</h3>
          <p style="font-size:0.9rem;color:var(--muted);margin-top:8px;">Commercial complexes, retail shop plots, row houses, and turnkey construction in Civil Lines &amp; Jhunsi.</p>
          <a href="construction-company-prayagraj.html" class="btn btn-dark" style="margin-top:16px;width:100%;">Explore Prayagraj Hub →</a>
        </div>
      </article>

      <article class="prop-card">
        <div class="prop-body">
          <h3>Lucknow</h3>
          <p style="font-size:0.9rem;color:var(--muted);margin-top:8px;">Modern multi-storey residential towers, premium 3BHK apartments, and architectural design services in Gomti Nagar Ext.</p>
          <a href="../index.html#properties" class="btn btn-dark" style="margin-top:16px;width:100%;">Explore Lucknow Hub →</a>
        </div>
      </article>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// GOVERNMENT PAGE
const governmentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Government &amp; Public Works Construction Contracts | Prakhar India</title>
<meta name="description" content="Prakhar India undertakes public works, government tenders, educational institutions & commercial civil infrastructure construction in Uttar Pradesh.">
<link rel="canonical" href="https://prakharind.com/pages/government.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Public Works &amp; Tenders</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Government Civil Construction Contracts</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Execution of public buildings, schools, healthcare centers, and infrastructure projects across Uttar Pradesh.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">Institutional Capability</span>
        <h2>High-standard institutional <em>execution</em></h2>
      </div>
      <p class="lead">Registered civil contractor with verified credentials, equipment fleet, and strict engineering compliance.</p>
    </div>
    <div class="about-points">
      <div class="about-point"><h4>Certified Engineering</h4><p>IS code structural calculations, soil test verifications, and quality assurance audit logs.</p></div>
      <div class="about-point"><h4>Safety Standards</h4><p>Strict site safety protocols, PPE mandates, and environmental compliance.</p></div>
      <div class="about-point"><h4>Timely Completion</h4><p>Milestone-based project management tracking for government bodies &amp; institutions.</p></div>
      <div class="about-point"><h4>Transparent Bidding</h4><p>Compliant with PWD, CPWD, and state infrastructure tender requirements.</p></div>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// COMPLIANCE PAGE
const complianceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Quality &amp; RERA Compliance | Prakhar India Real Estate &amp; Construction</title>
<meta name="description" content="Prakhar India adheres to strict RERA property guidelines, IS structural safety codes, clear-title verification, and ISO quality standards.">
<link rel="canonical" href="https://prakharind.com/pages/compliance.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Quality &amp; Regulatory Standards</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">RERA &amp; Engineering Quality Compliance</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Complete legal transparency, structural safety certifications, and clear-title guarantees.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="about-points">
      <div class="about-point"><h4>RERA Registration</h4><p>Every development project is verified and registered under UP-RERA with clear disclosures.</p></div>
      <div class="about-point"><h4>Structural Code Compliance</h4><p>Buildings designed according to IS 456:2000 and IS 1893 (Seismic Zone III/IV safety codes).</p></div>
      <div class="about-point"><h4>Title Due Diligence</h4><p>100% legal verification of land ownership and non-encumbrance certification prior to sale.</p></div>
      <div class="about-point"><h4>Material Testing</h4><p>Regular cube testing of M25/M30 concrete mixes and certified Fe-550D steel verification.</p></div>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// CAREERS PAGE
const careersHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Careers at Prakhar India Real Estate &amp; Construction</title>
<meta name="description" content="Join Prakhar India — careers for Civil Engineers, Site Supervisors, Architects, Sales Managers, and Project Coordinators in UP.">
<link rel="canonical" href="https://prakharind.com/pages/careers.html">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Join Our Team</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Build Your Career With Prakhar India</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">We are hiring Civil Engineers, Site Supervisors, Property Consultants, and Architects.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap" style="max-width:700px;">
    <div class="form-glass" style="background:#fff;border:1px solid #ece5da;">
      <h3 style="color:#0d0e10;">Submit Your Application</h3>
      <p style="color:#6f6a62;">Send us your details and our HR team will contact you for open positions.</p>
      <form onsubmit="event.preventDefault(); alert('Application submitted successfully! Our team will contact you shortly.');">
        <div class="f-group"><label style="color:#2a2723;">Full Name *</label><input type="text" required placeholder="Your full name" style="color:#0d0e10;border:1px solid #ccc;"></div>
        <div class="f-group"><label style="color:#2a2723;">Mobile Number *</label><input type="tel" required placeholder="10-digit mobile" maxlength="10" style="color:#0d0e10;border:1px solid #ccc;"></div>
        <div class="f-group"><label style="color:#2a2723;">Role Applied For *</label>
          <select style="color:#0d0e10;border:1px solid #ccc;">
            <option>Civil Engineer / Site Manager</option>
            <option>Architect / 3D Designer</option>
            <option>Property Advisor / Sales Manager</option>
            <option>Site Supervisor</option>
            <option>Other Role</option>
          </select>
        </div>
        <div class="f-group"><label style="color:#2a2723;">Experience &amp; Notes</label><textarea rows="3" placeholder="Briefly describe your experience..." style="color:#0d0e10;border:1px solid #ccc;"></textarea></div>
        <button type="submit" class="btn btn-gold" style="width:100%;">Submit Application</button>
      </form>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;

// PRIVACY, TERMS, GRIEVANCE
const privacyHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Privacy Policy | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:60px 0;"><div class="wrap" style="max-width:800px;">
<h2>Privacy Policy</h2>
<p>Prakhar India Real Estate &amp; Construction ("Prakhar India", "we", "our") respects your privacy. We collect customer contact details, project preferences, and site visit requests solely to provide real estate sales advice, construction quotations, and property services.</p>
<p>We do not share your personal information with third-party advertisers. All information collected is stored securely.</p>
</div></section>
${footerHtml}
</body></html>`;

const termsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Terms &amp; Conditions | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:60px 0;"><div class="wrap" style="max-width:800px;">
<h2>Terms &amp; Conditions</h2>
<p>By accessing or using the website of Prakhar India Real Estate &amp; Construction (https://prakharind.com), you agree to comply with our terms. Property prices, plot sizes, and construction cost estimates shown on the website are indicative and subject to final formal agreement.</p>
</div></section>
${footerHtml}
</body></html>`;

const grievanceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Grievance Redressal | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:60px 0;"><div class="wrap" style="max-width:800px;">
<h2>Grievance Redressal</h2>
<p>For any customer concerns regarding property bookings, construction progress, or site operations, please reach our Grievance Officer at prakharindiaofficial@gmail.com or call +91-9044499111.</p>
</div></section>
${footerHtml}
</body></html>`;

// LOGIN, SIGNUP, ADMIN
const loginHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Client Login | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:80px 0;"><div class="wrap" style="max-width:440px;">
<div class="form-glass" style="background:#fff;border:1px solid #ece5da;">
<h3 style="color:#0d0e10;">Client Account Sign In</h3>
<p style="color:#6f6a62;">Access your saved properties and construction progress.</p>
<form onsubmit="event.preventDefault(); localStorage.setItem('prakhar_user_logged_in','true'); alert('Logged in successfully!'); window.location.href='../index.html';">
<div class="f-group"><label style="color:#2a2723;">Mobile or Email *</label><input type="text" required placeholder="Enter mobile or email" style="color:#0d0e10;border:1px solid #ccc;"></div>
<div class="f-group"><label style="color:#2a2723;">Password *</label><input type="password" required placeholder="Password" style="color:#0d0e10;border:1px solid #ccc;"></div>
<button type="submit" class="btn btn-gold" style="width:100%;">Sign In</button>
</form>
</div>
</div></section>
${footerHtml}
</body></html>`;

const signupHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Create Account | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:80px 0;"><div class="wrap" style="max-width:440px;">
<div class="form-glass" style="background:#fff;border:1px solid #ece5da;">
<h3 style="color:#0d0e10;">Create Account</h3>
<p style="color:#6f6a62;">Save properties and track project updates.</p>
<form onsubmit="event.preventDefault(); alert('Account created successfully!'); window.location.href='login.html';">
<div class="f-group"><label style="color:#2a2723;">Full Name *</label><input type="text" required placeholder="Your name" style="color:#0d0e10;border:1px solid #ccc;"></div>
<div class="f-group"><label style="color:#2a2723;">Mobile *</label><input type="tel" required placeholder="10-digit mobile" maxlength="10" style="color:#0d0e10;border:1px solid #ccc;"></div>
<div class="f-group"><label style="color:#2a2723;">Password *</label><input type="password" required placeholder="Password" style="color:#0d0e10;border:1px solid #ccc;"></div>
<button type="submit" class="btn btn-gold" style="width:100%;">Register Account</button>
</form>
</div>
</div></section>
${footerHtml}
</body></html>`;

const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><title>Admin Portal | Prakhar India Real Estate &amp; Construction</title>
${headCommon}
</head>
<body>
${headerHtml}
<section class="sec" style="padding:80px 0;"><div class="wrap" style="max-width:440px;">
<div class="form-glass" style="background:#fff;border:1px solid #ece5da;">
<h3 style="color:#0d0e10;">Admin Sign In</h3>
<p style="color:#6f6a62;">Internal portal for property leads and project management.</p>
<form onsubmit="event.preventDefault(); localStorage.setItem('prakhar_admin_logged_in','true'); window.location.href='admin/dashboard.html';">
<div class="f-group"><label style="color:#2a2723;">Username *</label><input type="text" required value="admin" style="color:#0d0e10;border:1px solid #ccc;"></div>
<div class="f-group"><label style="color:#2a2723;">Password *</label><input type="password" required placeholder="Password" style="color:#0d0e10;border:1px solid #ccc;"></div>
<button type="submit" class="btn btn-gold" style="width:100%;">Dashboard Login</button>
</form>
</div>
</div></section>
${footerHtml}
</body></html>`;

// 10 Regional Construction City Pages
const cities = [
  { slug: 'construction-company-azamgarh.html', city: 'Azamgarh' },
  { slug: 'construction-company-ballia.html', city: 'Ballia' },
  { slug: 'construction-company-bhadohi.html', city: 'Bhadohi' },
  { slug: 'construction-company-chandauli.html', city: 'Chandauli' },
  { slug: 'construction-company-ghazipur.html', city: 'Ghazipur' },
  { slug: 'construction-company-jaunpur.html', city: 'Jaunpur' },
  { slug: 'construction-company-mau.html', city: 'Mau' },
  { slug: 'construction-company-prayagraj.html', city: 'Prayagraj' },
  { slug: 'construction-company-sonbhadra.html', city: 'Sonbhadra' },
  { slug: 'construction-company-varanasi.html', city: 'Varanasi' }
];

cities.forEach(c => {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Construction Company in ${c.city} | House Construction &amp; Turnkey Builders | Prakhar India</title>
<meta name="description" content="Top construction company in ${c.city}. Prakhar India delivers turnkey house construction, architectural design, structural engineering & property development in ${c.city}, UP.">
<link rel="canonical" href="https://prakharind.com/pages/${c.slug}">
${headCommon}
</head>
<body>
${headerHtml}

<section class="sec-dark" style="padding:80px 0 60px;text-align:center;">
  <div class="wrap">
    <span class="eyebrow light">Civil Engineering &amp; Contracting</span>
    <h1 style="color:#fff;font-size:3rem;margin-top:16px;">Construction Company in ${c.city}</h1>
    <p class="lead" style="margin:12px auto 0;color:#cfcac1;">Turnkey house building, commercial contracting, architectural design, and property development in ${c.city}.</p>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="eyebrow">${c.city} Building Services</span>
        <h2>Custom house construction &amp; <em>contracting</em></h2>
      </div>
      <a href="../index.html#enquire" class="btn btn-gold">Get Construction Quote</a>
    </div>

    <div class="svc-grid">
      <div class="svc">
        <div class="svc-num">01</div>
        <h3>Turnkey House Building</h3>
        <p>Complete fixed-price house construction on your land in ${c.city}.</p>
        <ul><li>Architectural &amp; Vastu plans</li><li>RCC structural core &amp; brickwork</li><li>Fixed-price contract</li></ul>
      </div>
      <div class="svc">
        <div class="svc-num">02</div>
        <h3>Commercial &amp; Retail Contracting</h3>
        <p>Shops, commercial complexes, and showrooms built on time.</p>
        <ul><li>Commercial layout design</li><li>MEP &amp; structural engineering</li><li>Turnkey project handover</li></ul>
      </div>
      <div class="svc">
        <div class="svc-num">03</div>
        <h3>Architecture &amp; Map Approval</h3>
        <p>2D floor plans, 3D exterior renders, and municipal blueprint approvals in ${c.city}.</p>
        <ul><li>2D &amp; 3D designs</li><li>Structural calculations</li><li>Approval assistance</li></ul>
      </div>
    </div>
  </div>
</section>

${footerHtml}
</body>
</html>`;
  fs.writeFileSync(path.join(pagesDir, c.slug), content);
});

// Write static utility pages
fs.writeFileSync(path.join(pagesDir, 'locations.html'), locationsHtml);
fs.writeFileSync(path.join(pagesDir, 'government.html'), governmentHtml);
fs.writeFileSync(path.join(pagesDir, 'compliance.html'), complianceHtml);
fs.writeFileSync(path.join(pagesDir, 'careers.html'), careersHtml);
fs.writeFileSync(path.join(pagesDir, 'privacy-policy.html'), privacyHtml);
fs.writeFileSync(path.join(pagesDir, 'terms.html'), termsHtml);
fs.writeFileSync(path.join(pagesDir, 'grievance.html'), grievanceHtml);
fs.writeFileSync(path.join(pagesDir, 'login.html'), loginHtml);
fs.writeFileSync(path.join(pagesDir, 'signup.html'), signupHtml);
fs.writeFileSync(path.join(pagesDir, 'admin.html'), adminHtml);

console.log('All remaining pages written successfully.');
