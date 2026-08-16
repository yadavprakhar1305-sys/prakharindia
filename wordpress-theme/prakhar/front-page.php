<?php
/**
 * Front page template.
 *
 * Mirrors the original static homepage (index.html).
 *
 * @package Prakhar
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1 data-lang-en>Manpower and Construction Solutions Across India</h1>
      <h1 data-lang-hi>पूरे भारत में श्रम और निर्माण समाधान</h1>
      <p data-lang-en>Prakhar India supplies skilled, semi-skilled, and general workers for projects across India and undertakes residential, commercial, industrial, and eligible government construction work.</p>
      <p data-lang-hi>प्रखर इंडिया पूरे भारत में परियोजनाओं के लिए कुशल, अर्ध-कुशल और सामान्य श्रमिकों की आपूर्ति करता है और आवासीय, वाणिज्यिक, औद्योगिक और पात्र सरकारी निर्माण कार्य करता है।</p>
      <div class="hero-buttons">
        <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-primary" data-lang-en>Request Manpower</a>
        <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-primary" data-lang-hi>श्रमिक मांगें</a>
        <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline" data-lang-en>Request Construction Quote</a>
        <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline" data-lang-hi>निर्माण कोटेशन प्राप्त करें</a>
      </div>
      <div class="hero-secondary">
        <a href="<?php echo esc_url(home_url('/projects/')); ?>" data-lang-en>View Projects</a>
        <a href="<?php echo esc_url(home_url('/projects/')); ?>" data-lang-hi>परियोजनाएं देखें</a>
        <span style="margin:0 12px;color:var(--blue-300);">|</span>
        <a href="<?php echo esc_url(home_url('/careers/')); ?>" data-lang-en>Register as a Worker</a>
        <a href="<?php echo esc_url(home_url('/careers/')); ?>" data-lang-hi>कार्यकर्ता के रूप में पंजीकरण</a>
      </div>
    </div>
  </div>
</section>

<section style="padding:40px 0;background:var(--white);border-bottom:1px solid var(--gray-200);">
  <div class="container">
    <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:center;">
      <div style="display:flex;gap:32px;flex-wrap:wrap;align-items:center;">
        <div style="display:flex;align-items:center;gap:16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 24px;">
          <div style="font-size:1.5rem;">👷</div>
          <div>
            <div style="font-weight:700;font-size:1rem;">General Labour</div>
            <div style="font-size:0.85rem;color:var(--gray-500);">₹500/worker · Min 50</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-left:12px;">
            <button onclick="homeQty('labour',-10)" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:0.8rem;font-weight:600;cursor:pointer;color:var(--gray-600);">−10</button>
            <button onclick="homeQty('labour',-1)" id="homeLabourMinus" disabled style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:1.125rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
            <input type="number" id="homeLabourQty" value="0" min="0" max="500" onchange="homeSetQty('labour', this.value)" style="width:50px;height:36px;text-align:center;font-weight:700;font-size:1rem;border:1px solid var(--gray-300);border-radius:4px;outline:none;">
            <button onclick="homeQty('labour',1)" id="homeLabourPlus" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:1.125rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>
            <button onclick="homeQty('labour',10)" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:0.8rem;font-weight:600;cursor:pointer;color:var(--gray-600);">+10</button>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:16px;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-md);padding:16px 24px;">
          <div style="font-size:1.5rem;">🧱</div>
          <div>
            <div style="font-weight:700;font-size:1rem;">Mistri (Skilled)</div>
            <div style="font-size:0.85rem;color:var(--gray-500);">₹700/worker · Min 20</div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;margin-left:12px;">
            <button onclick="homeQty('mistri',-10)" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:0.8rem;font-weight:600;cursor:pointer;color:var(--gray-600);">−10</button>
            <button onclick="homeQty('mistri',-1)" id="homeMistriMinus" disabled style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:1.125rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;">−</button>
            <input type="number" id="homeMistriQty" value="0" min="0" max="200" onchange="homeSetQty('mistri', this.value)" style="width:50px;height:36px;text-align:center;font-weight:700;font-size:1rem;border:1px solid var(--gray-300);border-radius:4px;outline:none;">
            <button onclick="homeQty('mistri',1)" id="homeMistriPlus" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:1.125rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;">+</button>
            <button onclick="homeQty('mistri',10)" style="width:32px;height:32px;border-radius:4px;border:1px solid var(--gray-300);background:var(--white);font-size:0.8rem;font-weight:600;cursor:pointer;color:var(--gray-600);">+10</button>
          </div>
        </div>
      </div>
      <div style="text-align:center;min-width:200px;padding:12px 24px;background:var(--blue-50);border-radius:var(--radius-md);">
        <div style="font-size:0.85rem;color:var(--gray-600);">Total</div>
        <div style="font-size:1.5rem;font-weight:800;color:var(--blue-600);" id="homeCartTotal">₹0</div>
        <div style="font-size:0.8rem;color:var(--gray-500);margin-bottom:8px;"><span id="homeCartItems">0</span> workers</div>
        <a href="<?php echo esc_url(home_url('/book-workforce/')); ?>" class="btn btn-primary btn-sm" id="homeBookBtn" style="pointer-events:none;opacity:0.5;">Book Now</a>
      </div>
    </div>
  </div>
</section>

<div class="trust-strip">
  <div class="container">
    <div class="trust-item"><div class="number">10+</div><div class="label" data-lang-en>Years Experience</div><div class="label" data-lang-hi>वर्षों का अनुभव</div></div>
    <div class="trust-item"><div class="number">5000+</div><div class="label" data-lang-en>Workers Deployed</div><div class="label" data-lang-hi>श्रमिक तैनात</div></div>
    <div class="trust-item"><div class="number">10+</div><div class="label" data-lang-en>States Served</div><div class="label" data-lang-hi>सेवित राज्य</div></div>
    <div class="trust-item"><div class="number">100+</div><div class="label" data-lang-en>Projects Completed</div><div class="label" data-lang-hi>परियोजनाएं पूर्ण</div></div>
    <div class="trust-item"><div class="number">100%</div><div class="label" data-lang-en>Statutory Compliance</div><div class="label" data-lang-hi>वैधानिक अनुपालन</div></div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>Our Services</h2>
      <h2 data-lang-hi>हमारी सेवाएं</h2>
      <p data-lang-en>Three business divisions built on safety, quality, transparency, and timely delivery.</p>
      <p data-lang-hi>सुरक्षा, गुणवत्ता, पारदर्शिता और समय पर डिलीवरी पर निर्मित तीन व्यावसायिक प्रभाग।</p>
    </div>
    <div class="services-grid">
      <div class="service-card">
        <div class="icon">👷</div>
        <h3 data-lang-en>Manpower Supply</h3>
        <h3 data-lang-hi>श्रम आपूर्ति</h3>
        <p data-lang-en>Skilled, semi-skilled, and general workers for construction, industrial, infrastructure, and institutional projects across India.</p>
        <p data-lang-hi>पूरे भारत में निर्माण, औद्योगिक, बुनियादी ढांचे और संस्थागत परियोजनाओं के लिए कुशल, अर्ध-कुशल और सामान्य श्रमिक।</p>
        <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-outline btn-sm" data-lang-en>Learn More</a>
        <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-outline btn-sm" data-lang-hi>और जानें</a>
      </div>
      <div class="service-card">
        <div class="icon">🏗️</div>
        <h3 data-lang-en>Building Construction</h3>
        <h3 data-lang-hi>भवन निर्माण</h3>
        <p data-lang-en>Residential, commercial, institutional, and industrial construction with turnkey project execution and quality assurance.</p>
        <p data-lang-hi>टर्नकी परियोजना निष्पादन और गुणवत्ता आश्वासन के साथ आवासीय, वाणिज्यिक, संस्थागत और औद्योगिक निर्माण।</p>
        <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline btn-sm" data-lang-en>Learn More</a>
        <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline btn-sm" data-lang-hi>और जानें</a>
      </div>
      <div class="service-card">
        <div class="icon">📋</div>
        <h3 data-lang-en>Government Contracts</h3>
        <h3 data-lang-hi>सरकारी अनुबंध</h3>
        <p data-lang-en>Eligible government and institutional contract execution with verified credentials, registrations, and past performance.</p>
        <p data-lang-hi>सत्यापित प्रमाण-पत्र, पंजीकरण और पिछले प्रदर्शन के साथ पात्र सरकारी और संस्थागत अनुबंध निष्पादन।</p>
        <a href="<?php echo esc_url(home_url('/government/')); ?>" class="btn btn-outline btn-sm" data-lang-en>Learn More</a>
        <a href="<?php echo esc_url(home_url('/government/')); ?>" class="btn btn-outline btn-sm" data-lang-hi>और जानें</a>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:var(--gray-50);">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>Workforce Categories</h2>
      <h2 data-lang-hi>कार्यबल श्रेणियां</h2>
      <p data-lang-en>We deploy across a wide range of trades and skill levels to match project requirements.</p>
      <p data-lang-hi>हम परियोजना की आवश्यकताओं से मेल खाने के लिए विभिन्न प्रकार के ट्रेडों और कौशल स्तरों पर तैनाती करते हैं।</p>
    </div>
    <div class="workers-grid">
      <div class="worker-cat"><div class="icon">🧱</div>Masons &amp; Mistris</div>
      <div class="worker-cat"><div class="icon">🪵</div>Shuttering Carpenters</div>
      <div class="worker-cat"><div class="icon">🔩</div>Bar Benders &amp; Steel Fixers</div>
      <div class="worker-cat"><div class="icon">⚡</div>Electricians</div>
      <div class="worker-cat"><div class="icon">🔧</div>Plumbers</div>
      <div class="worker-cat"><div class="icon">🎨</div>Painters &amp; Polishers</div>
      <div class="worker-cat"><div class="icon">🔥</div>Welders &amp; Fabricators</div>
      <div class="worker-cat"><div class="icon">⬜</div>Tile &amp; Marble Workers</div>
      <div class="worker-cat"><div class="icon">🏭</div>Machine Operators</div>
      <div class="worker-cat"><div class="icon">📦</div>Helpers &amp; Loaders</div>
      <div class="worker-cat"><div class="icon">👔</div>Site Supervisors</div>
      <div class="worker-cat"><div class="icon">🏢</div>Warehouse &amp; Factory Workers</div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?php echo esc_url(home_url('/workforce/')); ?>" class="btn btn-outline" data-lang-en>View All Categories</a>
      <a href="<?php echo esc_url(home_url('/workforce/')); ?>" class="btn btn-outline" data-lang-hi>सभी श्रेणियां देखें</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>Construction Capabilities</h2>
      <h2 data-lang-hi>निर्माण क्षमताएं</h2>
      <p data-lang-en>From residential buildings to industrial structures — we deliver quality construction across project sizes.</p>
      <p data-lang-hi>आवासीय भवनों से लेकर औद्योगिक संरचनाओं तक — हम परियोजना के आकार में गुणवत्तापूर्ण निर्माण प्रदान करते हैं।</p>
    </div>
    <div class="construction-grid">
      <div class="construction-item"><div class="icon">🏠</div><h3 data-lang-en>Residential Construction</h3><h3 data-lang-hi>आवासीय निर्माण</h3></div>
      <div class="construction-item"><div class="icon">🏢</div><h3 data-lang-en>Commercial Construction</h3><h3 data-lang-hi>वाणिज्यिक निर्माण</h3></div>
      <div class="construction-item"><div class="icon">🏥</div><h3 data-lang-en>Institutional Construction</h3><h3 data-lang-hi>संस्थागत निर्माण</h3></div>
      <div class="construction-item"><div class="icon">🏭</div><h3 data-lang-en>Industrial Buildings</h3><h3 data-lang-hi>औद्योगिक भवन</h3></div>
      <div class="construction-item"><div class="icon">🔄</div><h3 data-lang-en>Renovation &amp; Repair</h3><h3 data-lang-hi>नवीनीकरण और मरम्मत</h3></div>
      <div class="construction-item"><div class="icon">🔑</div><h3 data-lang-en>Turnkey Projects</h3><h3 data-lang-hi>टर्नकी परियोजनाएं</h3></div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-secondary" data-lang-en>Request Construction Quote</a>
      <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-secondary" data-lang-hi>निर्माण कोटेशन प्राप्त करें</a>
    </div>
  </div>
</section>

<section class="section" style="background:var(--gray-50);">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>Featured Projects</h2>
      <h2 data-lang-hi>प्रमुख परियोजनाएं</h2>
      <p data-lang-en>Selected projects demonstrating our capability across manpower deployment and construction.</p>
      <p data-lang-hi>श्रम तैनाती और निर्माण में हमारी क्षमता प्रदर्शित करने वाली चुनिंदा परियोजनाएं।</p>
    </div>
    <div class="project-grid">
      <div class="project-card">
        <div class="project-card-img" style="background:var(--blue-50);color:var(--blue-400);font-weight:600;">Project Photo</div>
        <div class="project-card-body">
          <div class="project-tags"><span>Construction</span><span>Commercial</span></div>
          <h3>Commercial Complex Construction</h3>
          <div class="meta">Noida, Uttar Pradesh | 2024-2025</div>
          <p data-lang-en>Turnkey construction of a G+3 commercial complex including structural, electrical, and finishing work.</p>
          <p data-lang-hi>जी+3 वाणिज्यिक परिसर का टर्नकी निर्माण जिसमें संरचनात्मक, विद्युत और परिष्करण कार्य शामिल है।</p>
        </div>
      </div>
      <div class="project-card">
        <div class="project-card-img" style="background:var(--blue-50);color:var(--blue-400);font-weight:600;">Project Photo</div>
        <div class="project-card-body">
          <div class="project-tags"><span>Manpower</span><span>Industrial</span></div>
          <h3>Workforce Deployment for Factory</h3>
          <div class="meta">Greater Noida, Uttar Pradesh | 2024</div>
          <p data-lang-en>Deployed 120+ skilled and semi-skilled workers for a large-scale manufacturing facility project.</p>
          <p data-lang-hi>एक बड़े पैमाने पर विनिर्माण सुविधा परियोजना के लिए 120+ कुशल और अर्ध-कुशल श्रमिकों की तैनाती।</p>
        </div>
      </div>
      <div class="project-card">
        <div class="project-card-img" style="background:var(--blue-50);color:var(--blue-400);font-weight:600;">Project Photo</div>
        <div class="project-card-body">
          <div class="project-tags"><span>Construction</span><span>Residential</span></div>
          <h3>Residential Apartment Construction</h3>
          <div class="meta">Delhi | 2023-2024</div>
          <p data-lang-en>Construction of a G+5 residential apartment building with quality finishing and timely delivery.</p>
          <p data-lang-hi>गुणवत्ता परिष्करण और समय पर डिलीवरी के साथ जी+5 आवासीय अपार्टमेंट भवन का निर्माण।</p>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?php echo esc_url(home_url('/projects/')); ?>" class="btn btn-outline" data-lang-en>View All Projects</a>
      <a href="<?php echo esc_url(home_url('/projects/')); ?>" class="btn btn-outline" data-lang-hi>सभी परियोजनाएं देखें</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>Operational Coverage</h2>
      <h2 data-lang-hi>परिचालन कवरेज</h2>
      <p data-lang-en>We serve clients across multiple states with reliable workforce deployment and construction services.</p>
      <p data-lang-hi>हम विश्वसनीय कार्यबल तैनाती और निर्माण सेवाओं के साथ कई राज्यों में ग्राहकों की सेवा करते हैं।</p>
    </div>
    <div class="location-grid">
      <div class="location-item">Delhi <span class="state">NCR</span></div>
      <div class="location-item">Noida <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Greater Noida <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Lucknow <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Ghaziabad <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Agra <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Kanpur <span class="state">Uttar Pradesh</span></div>
      <div class="location-item">Gurugram <span class="state">Haryana</span></div>
      <div class="location-item">Faridabad <span class="state">Haryana</span></div>
      <div class="location-item">Jaipur <span class="state">Rajasthan</span></div>
      <div class="location-item">Dehradun <span class="state">Uttarakhand</span></div>
      <div class="location-item">Chandigarh <span class="state">Chandigarh</span></div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?php echo esc_url(home_url('/locations/')); ?>" class="btn btn-outline" data-lang-en>View All Locations</a>
      <a href="<?php echo esc_url(home_url('/locations/')); ?>" class="btn btn-outline" data-lang-hi>सभी स्थान देखें</a>
    </div>
  </div>
</section>

<section class="section" style="background:var(--gray-50);">
  <div class="section-title">
    <h2 data-lang-en>Safety &amp; Compliance</h2>
    <h2 data-lang-hi>सुरक्षा और अनुपालन</h2>
    <p data-lang-en>We maintain statutory compliance, safety documentation, and proper registration for all deployments.</p>
    <p data-lang-hi>हम सभी तैनातियों के लिए वैधानिक अनुपालन, सुरक्षा दस्तावेज और उचित पंजीकरण बनाए रखते हैं।</p>
  </div>
  <div class="container">
    <div class="compliance-list">
      <div class="compliance-item"><span class="badge"></span> PF &amp; ESI Registration</div>
      <div class="compliance-item"><span class="badge"></span> Labour Licence</div>
      <div class="compliance-item"><span class="badge"></span> GST Registration</div>
      <div class="compliance-item"><span class="badge"></span> Contractor Licence</div>
      <div class="compliance-item"><span class="badge"></span> Insurance Coverage</div>
      <div class="compliance-item"><span class="badge"></span> Safety Policy &amp; Training</div>
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="<?php echo esc_url(home_url('/compliance/')); ?>" class="btn btn-outline" data-lang-en>Download Company Profile</a>
      <a href="<?php echo esc_url(home_url('/compliance/')); ?>" class="btn btn-outline" data-lang-hi>कंपनी प्रोफ़ाइल डाउनलोड करें</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-title">
      <h2 data-lang-en>What Our Clients Say</h2>
      <h2 data-lang-hi>हमारे ग्राहक क्या कहते हैं</h2>
    </div>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <div class="text" data-lang-en>"Prakhar India provided reliable workers for our residential project. Their team was professional and responsive to our changing requirements."</div>
        <div class="text" data-lang-hi>"प्रखर इंडिया ने हमारी आवासीय परियोजना के लिए विश्वसनीय श्रमिक प्रदान किए। उनकी टीम पेशेवर थी।"</div>
        <div class="author">- Mr. Sharma</div>
        <div class="role" data-lang-en>Builder, Delhi</div>
        <div class="role" data-lang-hi>बिल्डर, दिल्ली</div>
      </div>
      <div class="testimonial-card">
        <div class="text" data-lang-en>"We needed a large workforce on short notice. Prakhar India mobilised skilled workers within a week and maintained quality throughout."</div>
        <div class="text" data-lang-hi>"हमें कम समय में बड़ी कार्यबल की आवश्यकता थी। प्रखर इंडिया ने एक सप्ताह के भीतर कुशल श्रमिक जुटाए।"</div>
        <div class="author">- Mr. Verma</div>
        <div class="role" data-lang-en>Project Manager, Noida</div>
        <div class="role" data-lang-hi>परियोजना प्रबंधक, नोएडा</div>
      </div>
      <div class="testimonial-card">
        <div class="text" data-lang-en>"Professional approach to construction with good quality control. Completed our commercial project on time and within budget."</div>
        <div class="text" data-lang-hi>"अच्छे गुणवत्ता नियंत्रण के साथ निर्माण के लिए पेशेवर दृष्टिकोण। हमारी वाणिज्यिक परियोजना समय पर पूरी की।"</div>
        <div class="author">- Mrs. Gupta</div>
        <div class="role" data-lang-en>Property Owner, Gurugram</div>
        <div class="role" data-lang-hi>संपत्ति मालिक, गुरुग्राम</div>
      </div>
    </div>
  </div>
</section>

<section class="cta-banner">
  <div class="container">
    <h2 data-lang-en>Ready to Get Started?</h2>
    <h2 data-lang-hi>शुरू करने के लिए तैयार हैं?</h2>
    <p data-lang-en>Tell us about your project requirements and our team will provide a suitable proposal within 24 hours.</p>
    <p data-lang-hi>हमें अपनी परियोजना की आवश्यकताओं के बारे में बताएं और हमारी टीम 24 घंटे के भीतर उपयुक्त प्रस्ताव प्रदान करेगी।</p>
    <div class="hero-buttons" style="justify-content:center;">
      <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-primary" data-lang-en>Request Manpower</a>
      <a href="<?php echo esc_url(home_url('/manpower/')); ?>" class="btn btn-primary" data-lang-hi>श्रमिक मांगें</a>
      <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline" data-lang-en>Request Construction Quote</a>
      <a href="<?php echo esc_url(home_url('/construction/')); ?>" class="btn btn-outline" data-lang-hi>निर्माण कोटेशन प्राप्त करें</a>
    </div>
  </div>
</section>

<?php get_footer(); ?>