const fs = require('fs');
const path = require('path');

const states = [
  {
    slug: 'maharashtra',
    state: 'Maharashtra',
    code: 'IN-MH',
    geo: '19.0760;72.8777',
    lat: 19.0760,
    lng: 72.8777,
    hubs: ['Mumbai', 'Pune', 'Thane', 'Nagpur', 'Nashik', 'Chakan MIDC', 'Ranjangaon', 'Aurangabad'],
    desc: 'Prakhar India: Leading manpower supplier & labour contractor in Maharashtra. EPF/ESIC skilled workforce for Mumbai, Pune, MIDC & factories. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Maharashtra | Labour Contractor - Prakhar India',
    industryFocus: 'Automotive, Pharmaceutical, Heavy Engineering, Port Logistics, Warehousing & Commercial Construction'
  },
  {
    slug: 'delhi-ncr',
    state: 'Delhi NCR',
    code: 'IN-DL',
    geo: '28.6139;77.2090',
    lat: 28.6139,
    lng: 77.2090,
    hubs: ['Delhi', 'Gurugram', 'Faridabad', 'Panipat', 'Sonipat', 'IMT Manesar'],
    desc: 'Top manpower supplier & labour contractor in Delhi NCR. Skilled industrial, warehouse & construction workforce for Gurugram & Faridabad. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Delhi NCR | Labour Contractor - Prakhar India',
    industryFocus: 'E-commerce Logistics, Infrastructure Highways, Electronics Manufacturing & Commercial Real Estate'
  },
  {
    slug: 'gujarat',
    state: 'Gujarat',
    code: 'IN-GJ',
    geo: '23.0225;72.5714',
    lat: 23.0225,
    lng: 72.5714,
    hubs: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Sanand GIDC', 'Dahej PCPIR', 'Hazira'],
    desc: 'Trusted manpower supplier & labour contractor in Gujarat. EPF/ESIC factory & industrial workforce across GIDC zones, Ahmedabad & Surat. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Gujarat | GIDC Industrial Labour - Prakhar India',
    industryFocus: 'Chemical Plants, Petrochemicals, Textile Units, Automobile Manufacturing & Port Infrastructure'
  },
  {
    slug: 'karnataka',
    state: 'Karnataka',
    code: 'IN-KA',
    geo: '12.9716;77.5946',
    lat: 12.9716,
    lng: 77.5946,
    hubs: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Belagavi', 'Peenya', 'Bommasandra Industrial Area'],
    desc: 'Prakhar India: Top manpower supply agency & labour contractor in Karnataka. Skilled tech park, factory & civil labour in Bengaluru. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Karnataka | Bengaluru Labour Contractor - Prakhar India',
    industryFocus: 'Tech Park Construction, Precision Machining, Electronics Assembly & Commercial Real Estate'
  },
  {
    slug: 'tamil-nadu',
    state: 'Tamil Nadu',
    code: 'IN-TN',
    geo: '13.0827;80.2707',
    lat: 13.0827,
    lng: 80.2707,
    hubs: ['Chennai', 'Coimbatore', 'Madurai', 'Sriperumbudur', 'Hosur', 'Tiruppur Textile Corridor'],
    desc: 'Reliable manpower supplier & labour contractor in Tamil Nadu. Skilled industrial labour for Sriperumbudur, Hosur, Chennai & factories. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Tamil Nadu | Industrial Labour Contractor - Prakhar India',
    industryFocus: 'Automobile Plants, Garment Weaving, Hardware Manufacturing & Renewable Energy Projects'
  },
  {
    slug: 'telangana',
    state: 'Telangana',
    code: 'IN-TG',
    geo: '17.3850;78.4867',
    lat: 17.3850,
    lng: 78.4867,
    hubs: ['Hyderabad', 'Warangal', 'Medak', 'Pashamylaram', 'Genome Valley', 'Patancheru'],
    desc: 'Leading manpower supplier & labour contractor in Telangana. EPF/ESIC compliant industrial workforce for Hyderabad & Medak units. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Telangana | Hyderabad Labour Agency - Prakhar India',
    industryFocus: 'Pharma Manufacturing, IT Infrastructure, Heavy Engineering & Warehouse Logistics'
  },
  {
    slug: 'west-bengal',
    state: 'West Bengal',
    code: 'IN-WB',
    geo: '22.5726;88.3639',
    lat: 22.5726,
    lng: 88.3639,
    hubs: ['Kolkata', 'Durgapur', 'Asansol', 'Haldia Port Zone', 'Siliguri', 'Howrah'],
    desc: 'Trusted manpower supply agency in West Bengal. Skilled industrial, port & construction labour contractor in Kolkata & Durgapur. Call +91 9044499111.',
    title: 'Best Manpower Supplier in West Bengal | Labour Contractor - Prakhar India',
    industryFocus: 'Steel & Metals, Chemical Processing, Jute Manufacturing, Port Logistics & Highway Infra'
  },
  {
    slug: 'rajasthan',
    state: 'Rajasthan',
    code: 'IN-RJ',
    geo: '26.9124;75.7873',
    lat: 26.9124,
    lng: 75.7873,
    hubs: ['Jaipur', 'Bhiwadi', 'Neemrana', 'Jodhpur', 'Kota', 'Udaipur RIICO Belts'],
    desc: 'Top manpower supplier & labour contractor in Rajasthan. EPF/ESIC skilled workers for Bhiwadi, RIICO industrial parks & Jaipur. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Rajasthan | RIICO Industrial Labour - Prakhar India',
    industryFocus: 'Solar Energy Plants, Stone Quarrying, Auto Ancillaries, Cement Manufacturing & Construction'
  },
  {
    slug: 'madhya-pradesh',
    state: 'Madhya Pradesh',
    code: 'IN-MP',
    geo: '22.7196;75.8577',
    lat: 22.7196,
    lng: 75.8577,
    hubs: ['Indore', 'Bhopal', 'Pithampur SEZ', 'Gwalior', 'Dewas', 'Jabalpur'],
    desc: 'Prakhar India: Best manpower supplier & labour contractor in MP. Skilled factory, SEZ & construction workforce for Indore & Pithampur. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Madhya Pradesh | Pithampur Labour - Prakhar India',
    industryFocus: 'Pharma Formulations, Auto Component Manufacturing, Textile Mills & Infrastructure Contracts'
  },
  {
    slug: 'bihar',
    state: 'Bihar',
    code: 'IN-BR',
    geo: '25.5941;85.1376',
    lat: 25.5941,
    lng: 85.1376,
    hubs: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Begusarai', 'Barauni Industrial Area'],
    desc: 'Leading manpower supplier & labour contractor in Bihar. Skilled mistri, labourers, carpenters & civil workers in Patna & Begusarai. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Bihar | Labour Contractor Patna - Prakhar India',
    industryFocus: 'Food Processing, Thermal Power Plants, Road & Highway Construction, Brick Masonry'
  },
  {
    slug: 'punjab',
    state: 'Punjab',
    code: 'IN-PB',
    geo: '30.9010;75.8573',
    lat: 30.9010,
    lng: 75.8573,
    hubs: ['Ludhiana', 'Jalandhar', 'Amritsar', 'Mohali', 'Mandi Gobindgarh', 'Bathinda'],
    desc: 'Trusted manpower supplier & labour contractor in Punjab. EPF/ESIC skilled workforce for Ludhiana factories & Mandi Gobindgarh steel. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Punjab | Ludhiana Industrial Labour - Prakhar India',
    industryFocus: 'Steel Rolling Mills, Textile & Hosiery, Hand Tool Units, Rice Processing & Civil Contracts'
  },
  {
    slug: 'chhattisgarh',
    state: 'Chhattisgarh',
    code: 'IN-CG',
    geo: '21.2514;81.6296',
    lat: 21.2514,
    lng: 81.6296,
    hubs: ['Raipur', 'Bhilai', 'Korba Thermal Zone', 'Bilaspur', 'Durg Industrial Corridor'],
    desc: 'Best manpower supplier in Chhattisgarh. Skilled industrial labour for Korba power plants, Bhilai steel units & mining in Raipur. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Chhattisgarh | Mining & Power Labour - Prakhar India',
    industryFocus: 'Steel Plants, Thermal Power Generation, Coal Mining, Cement Fabrication & Civil Projects'
  },
  {
    slug: 'odisha',
    state: 'Odisha',
    code: 'IN-OR',
    geo: '20.2961;85.8245',
    lat: 20.2961,
    lng: 85.8245,
    hubs: ['Bhubaneswar', 'Jharsuguda', 'Rourkela', 'Angul', 'Paradeep Port', 'Kalinganagar'],
    desc: 'Prakhar India: Top manpower supplier in Odisha. EPF/ESIC skilled labour for Jharsuguda smelters, Angul power & Paradeep port. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Odisha | Steel & Port Labour Agency - Prakhar India',
    industryFocus: 'Aluminum Smelters, Steel Plants, Deepwater Ports, Mining Logistics & Heavy Civil Infra'
  },
  {
    slug: 'jharkhand',
    state: 'Jharkhand',
    code: 'IN-JH',
    geo: '23.3441;85.3096',
    lat: 23.3441,
    lng: 85.3096,
    hubs: ['Jamshedpur', 'Ranchi', 'Dhanbad Mining Belt', 'Bokaro Steel City', 'Ramgarh'],
    desc: 'Leading manpower supplier & labour contractor in Jharkhand. Skilled workers for Jamshedpur steel, Dhanbad coal mines & Ranchi. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Jharkhand | Mining & Steel Labour - Prakhar India',
    industryFocus: 'Integrated Steel Mills, Coal Extraction, Heavy Equipment Maintenance & Construction'
  },
  {
    slug: 'uttarakhand',
    state: 'Uttarakhand',
    code: 'IN-UK',
    geo: '30.3165;78.0322',
    lat: 30.3165,
    lng: 78.0322,
    hubs: ['Pantnagar SIDCUL', 'Haridwar', 'Dehradun', 'Roorkee', 'Rudrapur'],
    desc: 'Trusted manpower supplier in Uttarakhand. EPF/ESIC skilled factory workers for Pantnagar SIDCUL, Haridwar & Dehradun units. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Uttarakhand | SIDCUL Industrial Labour - Prakhar India',
    industryFocus: 'Automobile Assembly, FMCG Packaging, Pharmaceutical Plants & Hydro Infra Projects'
  },
  {
    slug: 'assam',
    state: 'Assam',
    code: 'IN-AS',
    geo: '26.1445;91.7362',
    lat: 26.1445,
    lng: 91.7362,
    hubs: ['Guwahati', 'Dibrugarh', 'Tinsukia', 'Silchar', 'Bongaigaon Industrial Belt'],
    desc: 'Best manpower supplier & labour contractor in Assam. Skilled workers for oil refineries, tea processing & Guwahati civil infra. Call +91 9044499111.',
    title: 'Best Manpower Supplier in Assam | Guwahati Industrial Labour - Prakhar India',
    industryFocus: 'Petroleum Refineries, Tea Processing Facilities, Cement Plants & Highway Expansion'
  }
];

// Generate State Pages
states.forEach(s => {
  const filePath = path.join('pages', `manpower-${s.slug}.html`);
  const hubsList = s.hubs.map(h => `<span class="badge" style="background:#e0f2fe; color:#0369a1; padding:6px 14px; border-radius:20px; font-weight:600; font-size:0.88rem;">📍 ${h}</span>`).join(' ');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${s.title}</title>
<meta name="description" content="${s.desc}">
<link rel="canonical" href="https://prakharind.com/pages/manpower-${s.slug}.html">
<meta name="geo.region" content="${s.code}">
<meta name="geo.placename" content="${s.state}">
<meta name="geo.position" content="${s.geo}">
<meta name="ICBM" content="${s.geo.replace(';', ', ')}">
<meta property="og:title" content="${s.title}"/>
<meta property="og:description" content="${s.desc}"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://prakharind.com/images/og-image.jpg"/>
<meta property="og:url" content="https://prakharind.com/pages/manpower-${s.slug}.html"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:image" content="https://prakharind.com/images/og-image.jpg"/>
<link rel="stylesheet" href="../css/style.css?v=12.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://prakharind.com/#business-${s.slug}",
      "name": "PRAKHAR INDIA MANPOWER & CONSTRUCTION - ${s.state.toUpperCase()}",
      "description": "${s.desc}",
      "url": "https://prakharind.com/pages/manpower-${s.slug}.html",
      "telephone": "+91-9044499111",
      "email": "prakharindiaofficial@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${s.hubs[0]}",
        "addressRegion": "${s.state}",
        "addressCountry": "IN"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": ${s.lat}, "longitude": ${s.lng} },
      "areaServed": ${JSON.stringify(s.hubs)},
      "priceRange": "$$",
      "openingHours": "Mo-Sa 08:00-20:00"
    },
    {
      "@type": "Service",
      "@id": "https://prakharind.com/pages/manpower-${s.slug}.html#service",
      "name": "Industrial Manpower Supply in ${s.state}",
      "provider": { "@id": "https://prakharind.com/#business-${s.slug}" },
      "areaServed": { "@type": "State", "name": "${s.state}" },
      "serviceType": "Industrial Labour Contracting & Manpower Supply",
      "description": "${s.desc}"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://prakharind.com/pages/manpower-${s.slug}.html#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://prakharind.com/" },
        { "@type": "ListItem", "position": 2, "name": "Manpower Services", "item": "https://prakharind.com/pages/manpower.html" },
        { "@type": "ListItem", "position": 3, "name": "${s.state}", "item": "https://prakharind.com/pages/manpower-${s.slug}.html" }
      ]
    }
  ]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
<header class="header">
  <div class="header-inner">
    <a href="../index.html" class="logo">Prakhar India <span>Manpower &amp; Construction</span></a>
    <nav class="nav">
      <a href="../index.html">Home</a>
      <a href="about.html">About</a>
      <a href="manpower.html" class="active">Manpower</a>
      <a href="construction.html">Construction</a>
      <a href="../blog/" style="color:#38bdf8;font-weight:600;">📝 Blog</a>
      <a href="contact.html">Contact</a>
      <a href="tel:9044499111" style="color:var(--orange-500);font-weight:700;">📞 9044499111</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    </nav>
    <button class="mobile-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="page-header" style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:#fff; padding:60px 0;">
  <div class="container" style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <nav class="breadcrumb" style="color:#94a3b8; font-size:0.9rem; margin-bottom:12px;"><a href="../index.html" style="color:#38bdf8;">Home</a> / <a href="manpower.html" style="color:#38bdf8;">Manpower</a> / <span>${s.state}</span></nav>
    <h1 style="font-size:2.2rem; color:#fff; font-weight:800; margin-bottom:12px;">#1 Manpower Supplier &amp; Labour Contractor in ${s.state}</h1>
    <p style="color:#cbd5e1; max-width:800px; font-size:1.1rem; line-height:1.7;">Direct, 100% EPF &amp; ESIC statutory compliant industrial labour supply and skilled construction workforce for manufacturing units, infrastructure projects, and warehouses across ${s.state}.</p>
  </div>
</div>

<section style="padding:40px 0; background:#f8fafc; border-bottom:1px solid #e2e8f0;">
  <div class="container" style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <h2 style="font-size:1.25rem; color:#475569; margin-bottom:16px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Primary Service Hubs Covered in ${s.state}:</h2>
    <div style="display:flex; flex-wrap:wrap; gap:10px;">
      ${hubsList}
    </div>
  </div>
</section>

<main class="container" style="max-width:1200px; margin:40px auto; padding:0 24px; font-family:'Outfit', sans-serif;">
  <div style="display:grid; grid-template-columns: 1fr 380px; gap:40px; align-items:start;">
    <div>
      <h2 style="font-size:1.75rem; color:#0f172a; font-weight:800; margin-bottom:16px;">Comprehensive Industrial &amp; Construction Manpower Sourcing in ${s.state}</h2>
      <p style="color:#475569; line-height:1.8; margin-bottom:20px; font-size:1.02rem;">
        Prakhar India is a premier government-registered labour contracting agency operating across <strong>${s.state}</strong>. We deliver verified skilled, semi-skilled, and general workforce tailored to the demanding operating environments of ${s.industryFocus}.
      </p>

      <div style="background:#fff; border:1px solid #cbd5e1; border-radius:12px; padding:28px; margin-bottom:32px; box-shadow:0 4px 12px rgba(0,0,0,0.04);">
        <h3 style="color:#0284c7; font-size:1.3rem; font-weight:700; margin-bottom:16px;">Why Leading Companies in ${s.state} Trust Prakhar India</h3>
        <ul style="color:#334155; line-height:1.9; padding-left:20px; margin:0;">
          <li><strong>100% Statutory Compliance:</strong> Strict adherence to EPF, ESIC, CLRA License, Workmen Compensation, and official state minimum wage guidelines.</li>
          <li><strong>24 to 48-Hour Onsite Mobilization:</strong> Rapid deployment of pre-screened workers directly to factory gates and construction sites.</li>
          <li><strong>Background Verified Workers:</strong> Aadhar and police background checks conducted for every electrician, welder, mason, and helper.</li>
          <li><strong>Direct Billing &amp; Transparency:</strong> Clear monthly invoicing with official EPF/ESIC bank payment challans attached.</li>
        </ul>
      </div>

      <h3 style="font-size:1.4rem; color:#0f172a; font-weight:700; margin-bottom:16px;">Workforce Categories Available for Immediate Deployment</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:32px;">
        <div style="background:#f1f5f9; padding:16px 20px; border-radius:8px;">
          <h4 style="margin:0 0 6px; color:#0f172a; font-size:1.05rem;">👷 Skilled Construction Labour</h4>
          <p style="margin:0; font-size:0.88rem; color:#64748b;">Masons (Mistri), Shuttering Carpenters, Bar Benders, Bar Scaffolders &amp; Plasterers.</p>
        </div>
        <div style="background:#f1f5f9; padding:16px 20px; border-radius:8px;">
          <h4 style="margin:0 0 6px; color:#0f172a; font-size:1.05rem;">⚡ Technical &amp; Maintenance Staff</h4>
          <p style="margin:0; font-size:0.88rem; color:#64748b;">ITI Certified Electricians, Fitters, Welders, Cable Pullers &amp; Maintenance Crew.</p>
        </div>
        <div style="background:#f1f5f9; padding:16px 20px; border-radius:8px;">
          <h4 style="margin:0 0 6px; color:#0f172a; font-size:1.05rem;">📦 Warehouse &amp; Logistics Crew</h4>
          <p style="margin:0; font-size:0.88rem; color:#64748b;">Loaders, Unloaders, Packaging Helpers, Inventory Handlers &amp; Forklift Operators.</p>
        </div>
        <div style="background:#f1f5f9; padding:16px 20px; border-radius:8px;">
          <h4 style="margin:0 0 6px; color:#0f172a; font-size:1.05rem;">🏭 Factory Floor Workers</h4>
          <p style="margin:0; font-size:0.88rem; color:#64748b;">Assembly line helpers, machine operators, packing staff &amp; industrial housekeeping.</p>
        </div>
      </div>
    </div>

    <aside style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:28px; position:sticky; top:96px;">
      <h3 style="font-size:1.25rem; color:#0f172a; margin-bottom:16px; font-weight:700;">Request Manpower Quote in ${s.state}</h3>
      <form action="#" method="POST" onsubmit="event.preventDefault(); alert('Thank you! Our ${s.state} deployment manager will contact you within 2 hours.');">
        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.85rem; font-weight:600; color:#475569; margin-bottom:4px;">Company / Project Name *</label>
          <input type="text" required placeholder="e.g. Apex Infra Pvt Ltd" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.9rem; outline:none;">
        </div>
        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.85rem; font-weight:600; color:#475569; margin-bottom:4px;">Phone Number *</label>
          <input type="tel" required placeholder="+91 Mobile Number" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.9rem; outline:none;">
        </div>
        <div style="margin-bottom:14px;">
          <label style="display:block; font-size:0.85rem; font-weight:600; color:#475569; margin-bottom:4px;">City / Project Location *</label>
          <input type="text" required placeholder="${s.hubs[0]}, ${s.state}" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.9rem; outline:none;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block; font-size:0.85rem; font-weight:600; color:#475569; margin-bottom:4px;">Workforce Requirement *</label>
          <select style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:6px; font-size:0.9rem; outline:none;">
            <option>Skilled Construction Labour (10 - 50+)</option>
            <option>Factory &amp; Industrial Helpers (20 - 100+)</option>
            <option>Warehouse Logistics Staff (10 - 50+)</option>
            <option>ITI Electricians &amp; Welders</option>
          </select>
        </div>
        <button type="submit" style="width:100%; background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; border:none; padding:12px; border-radius:6px; font-weight:700; font-size:1rem; cursor:pointer;">Request Immediate Deployment</button>
      </form>
    </aside>
  </div>
</main>

<script src="../js/seo-toolkit.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Created state landing page: ${filePath}`);
});

// Generate 5 State Industry Blogs
const blogs = [
  {
    slug: 'pan-india-industrial-manpower-supply-report-2026',
    title: 'Pan-India Industrial Manpower Supply & Labour Contracting Report 2026 | Prakhar India',
    desc: 'Comprehensive 2026 report on industrial manpower demand across India: Gujarat GIDC, Maharashtra MIDC, Delhi NCR & UP corridors. EPF/ESIC compliance insights.',
    h1: 'Pan-India Industrial Manpower Supply & Labour Demand Report 2026',
    summary: 'An in-depth analysis of workforce demand across major industrial hubs in India, covering statutory compliance, EPF/ESIC regulations, minimum wage structures, and rapid deployment strategies for 2026.'
  },
  {
    slug: 'maharashtra-industrial-manpower-demand-2026',
    title: 'Maharashtra Industrial Manpower Supply & MIDC Labour Demand (2026) | Prakhar India',
    desc: 'Sourcing industrial manpower in Maharashtra? 2026 report on Mumbai, Pune, Thane & Chakan MIDC workforce trends. Hire 100% EPF/ESIC compliant labour.',
    h1: 'Why Maharashtra MIDC Industrial Belts Require 50,000+ Skilled Workers in 2026',
    summary: 'Detailed workforce trends across Chakan MIDC, Pune automotive corridors, Mumbai port logistics, and Thane manufacturing parks.'
  },
  {
    slug: 'gujarat-manufacturing-workforce-trends-2026',
    title: 'Gujarat Manufacturing Manpower & GIDC Labour Supply Trends (2026) | Prakhar India',
    desc: 'Analysis of industrial manpower demand in Gujarat: GIDC Sanand, Dahej PCPIR, Ahmedabad & Surat factory staffing solutions. Call +91 9044499111.',
    h1: 'Gujarat GIDC Industrial Manufacturing & Chemical Corridor Workforce Report 2026',
    summary: 'Sourcing skilled technicians, plant operators, chemical helpers, and warehouse staff across Sanand, Dahej, Vadodara, and Surat GIDC estates.'
  },
  {
    slug: 'karnataka-tech-park-construction-labour-guide',
    title: 'Karnataka Commercial Construction & Tech Park Labour Sourcing Guide 2026 | Prakhar India',
    desc: 'Guide to hiring construction labour & mistri in Bengaluru & Karnataka. Shuttering carpenters, bar benders & electricians for tech parks.',
    h1: 'How to Source Compliant Civil Construction Labour for Commercial Tech Parks in Bengaluru',
    summary: 'Best practices for contractors deploying large-scale civil construction crews, bar benders, masons, and ITI electricians across Bengaluru and Mysuru.'
  },
  {
    slug: 'delhi-ncr-infrastructure-workforce-sourcing',
    title: 'Delhi NCR Infrastructure & Warehouse Manpower Sourcing Guide 2026 | Prakhar India',
    desc: 'Hire skilled industrial & warehouse manpower in Delhi NCR (Gurugram, Greater Noida, Faridabad). 100% legal compliance & fast deployment.',
    h1: 'Sourcing Warehouse & Highway Infrastructure Workforce across Delhi NCR & Expressway Corridors',
    summary: 'Managing logistics staff, heavy machinery helpers, expressway construction crews, and industrial plant workers in Gurugram, Noida, and Faridabad.'
  }
];

blogs.forEach(b => {
  const filePath = path.join('blog', `${b.slug}.html`);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${b.title}</title>
<meta name="description" content="${b.desc}">
<link rel="canonical" href="https://prakharind.com/blog/${b.slug}.html">
<meta property="og:title" content="${b.h1}"/>
<meta property="og:description" content="${b.desc}"/>
<meta property="og:type" content="article"/>
<meta property="og:image" content="https://prakharind.com/images/og-image.jpg"/>
<meta property="og:url" content="https://prakharind.com/blog/${b.slug}.html"/>
<link rel="stylesheet" href="../css/style.css?v=12.0">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏗️</text></svg>">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${b.h1}",
  "description": "${b.desc}",
  "author": { "@type": "Organization", "name": "Prakhar India", "url": "https://prakharind.com" },
  "publisher": { "@type": "Organization", "name": "Prakhar India" },
  "datePublished": "2026-09-09",
  "mainEntityOfPage": "https://prakharind.com/blog/${b.slug}.html"
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
<header class="header">
  <div class="header-inner">
    <a href="../index.html" class="logo">Prakhar India <span>Manpower &amp; Construction</span></a>
    <nav class="nav">
      <a href="../index.html">Home</a>
      <a href="../pages/about.html">About</a>
      <a href="../pages/manpower.html">Manpower</a>
      <a href="../pages/construction.html">Construction</a>
      <a href="./" class="active" style="color:#38bdf8;font-weight:600;">📝 Blog</a>
      <a href="../pages/contact.html">Contact</a>
      <a href="tel:9044499111" style="color:var(--orange-500);font-weight:700;">📞 9044499111</a>
    </nav>
  </div>
</header>

<main style="max-width:800px; margin:40px auto; padding:0 24px; font-family:'Outfit', sans-serif; line-height:1.8; color:#334155;">
  <nav style="font-size:0.88rem; color:#64748b; margin-bottom:16px;"><a href="../index.html" style="color:#0284c7;">Home</a> / <a href="./" style="color:#0284c7;">Blog</a> / <span>${b.slug}</span></nav>
  <h1 style="font-size:2.2rem; color:#0f172a; font-weight:800; margin-bottom:16px;">${b.h1}</h1>
  <p style="font-size:1.1rem; color:#475569; font-weight:500; border-left:4px solid #f97316; padding-left:16px; margin-bottom:32px;">${b.summary}</p>

  <h2 style="font-size:1.5rem; color:#0f172a; font-weight:700; margin:28px 0 12px;">1. Industrial Growth &amp; Workforce Demands in 2026</h2>
  <p>As industrial investment accelerates across India's primary manufacturing and logistics corridors, the requirement for statutory-compliant skilled and semi-skilled manpower has reached unprecedented levels. Companies operating in heavy engineering, chemical manufacturing, e-commerce fulfillment, and civil infrastructure projects require dependable workforce deployment partners.</p>

  <h2 style="font-size:1.5rem; color:#0f172a; font-weight:700; margin:28px 0 12px;">2. Mandatory EPF, ESIC &amp; Statutory Compliance</h2>
  <p>Under India's updated labour code framework, compliance is non-negotiable. Prakhar India ensures 100% coverage under Employees Provident Fund (EPF), Employees State Insurance (ESIC), and Contract Labour (Regulation and Abolition) Act licenses, protecting principal employers from legal penalties.</p>

  <div style="background:#0f172a; color:#fff; padding:28px; border-radius:12px; margin:36px 0; text-align:center;">
    <h3 style="color:#fff; margin:0 0 8px; font-size:1.3rem;">Need Industrial Manpower Deployment?</h3>
    <p style="color:#cbd5e1; margin-bottom:20px; font-size:0.95rem;">Deploy pre-screened skilled workers and technicians anywhere in India within 24 to 48 hours.</p>
    <a href="../pages/contact.html" style="background:#f97316; color:#fff; padding:12px 24px; border-radius:6px; font-weight:700; text-decoration:none; display:inline-block;">Contact Prakhar India Today</a>
  </div>
</main>

<script src="../js/seo-toolkit.js" defer></script>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Created state blog post: ${filePath}`);
});

console.log('Finished generating all state landing pages and blog articles.');
