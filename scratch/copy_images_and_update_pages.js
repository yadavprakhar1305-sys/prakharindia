const fs = require('fs');
const path = require('path');

// 1. Copy generated images from brain artifact directory to project images/ directory
const brainDir = 'C:\\Users\\yadav\\.gemini\\antigravity-ide\\brain\\f838c343-f8b8-497c-825c-b401a761b303';
const targetImagesDir = 'images';

if (!fs.existsSync(targetImagesDir)) {
  fs.mkdirSync(targetImagesDir, { recursive: true });
}

const brainFiles = fs.readdirSync(brainDir);

const imageMap = {
  'maharashtra_industrial': 'maharashtra-industrial.jpg',
  'gujarat_manufacturing': 'gujarat-manufacturing.jpg',
  'pan_india_workforce': 'pan-india-workforce.jpg'
};

for (const [key, targetName] of Object.entries(imageMap)) {
  const matchedFile = brainFiles.find(f => f.startsWith(key) && f.endsWith('.jpg'));
  if (matchedFile) {
    const srcPath = path.join(brainDir, matchedFile);
    const destPath = path.join(targetImagesDir, targetName);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${matchedFile} to ${destPath}`);
  }
}

// 2. Update pages/locations.html to showcase Pan-India All-States Coverage
const locFile = 'pages/locations.html';
if (fs.existsSync(locFile)) {
  let content = fs.readFileSync(locFile, 'utf8');

  const panIndiaGrid = `
<!-- All-India States Dedicated Presence Section -->
<section class="content-section" style="background:#f8fafc;padding:60px 0;">
  <div class="container">
    <div class="section-title" style="text-align:center;max-width:850px;margin:0 auto 36px;">
      <span style="color:var(--orange-500);font-weight:700;text-transform:uppercase;letter-spacing:1px;font-size:0.9rem;">Pan-India Operations</span>
      <h2 data-lang-en>All-India States &amp; UTs Manpower &amp; Construction Coverage</h2>
      <h2 data-lang-hi>अखिल भारतीय राज्य और केंद्र शासित प्रदेश कवरेज</h2>
      <p data-lang-en>Deploying 100% EPF/ESIC statutory compliant industrial workforce, factory staffing, and civil construction teams across all 28 States &amp; 8 Union Territories.</p>
      <div style="margin-top:16px;">
        <a href="manpower.html" class="btn btn-primary" style="background:var(--orange-500);border:none;padding:12px 28px;font-weight:700;">Explore Nationwide Services →</a>
      </div>
    </div>

    <div class="grid-4" style="margin-top:24px; display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
      <a href="manpower-maharashtra.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f97316;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Maharashtra</strong>
        <span style="font-size:0.85rem;color:#64748b;">Mumbai, Pune, Chakan MIDC</span>
      </a>
      <a href="manpower-delhi-ncr.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #2563eb;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Delhi NCR</strong>
        <span style="font-size:0.85rem;color:#64748b;">Gurugram, Noida, Warehousing</span>
      </a>
      <a href="manpower-gujarat.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #10b981;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Gujarat</strong>
        <span style="font-size:0.85rem;color:#64748b;">GIDC Sanand, Dahej PCPIR</span>
      </a>
      <a href="manpower-karnataka.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #8b5cf6;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Karnataka</strong>
        <span style="font-size:0.85rem;color:#64748b;">Bengaluru Tech Parks, Mysuru</span>
      </a>
      <a href="manpower-tamil-nadu.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f59e0b;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Tamil Nadu</strong>
        <span style="font-size:0.85rem;color:#64748b;">Chennai, Sriperumbudur, Hosur</span>
      </a>
      <a href="manpower-telangana.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #06b6d4;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Telangana</strong>
        <span style="font-size:0.85rem;color:#64748b;">Hyderabad Genome Valley</span>
      </a>
      <a href="manpower-west-bengal.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #ef4444;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">West Bengal</strong>
        <span style="font-size:0.85rem;color:#64748b;">Kolkata, Durgapur, Haldia</span>
      </a>
      <a href="manpower-rajasthan.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f97316;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Rajasthan</strong>
        <span style="font-size:0.85rem;color:#64748b;">Bhiwadi RIICO, Jaipur, Solar</span>
      </a>
      <a href="manpower-madhya-pradesh.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #10b981;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Madhya Pradesh</strong>
        <span style="font-size:0.85rem;color:#64748b;">Indore, Pithampur SEZ, Bhopal</span>
      </a>
      <a href="manpower-bihar.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #8b5cf6;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Bihar</strong>
        <span style="font-size:0.85rem;color:#64748b;">Patna, Barauni, Highways</span>
      </a>
      <a href="manpower-punjab.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f59e0b;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Punjab</strong>
        <span style="font-size:0.85rem;color:#64748b;">Ludhiana Steel, Jalandhar</span>
      </a>
      <a href="manpower-chhattisgarh.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #06b6d4;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Chhattisgarh</strong>
        <span style="font-size:0.85rem;color:#64748b;">Korba Power, Bhilai Steel</span>
      </a>
      <a href="manpower-odisha.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #ef4444;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Odisha</strong>
        <span style="font-size:0.85rem;color:#64748b;">Jharsuguda, Paradeep Port</span>
      </a>
      <a href="manpower-jharkhand.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f97316;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Jharkhand</strong>
        <span style="font-size:0.85rem;color:#64748b;">Jamshedpur, Dhanbad Mining</span>
      </a>
      <a href="manpower-uttarakhand.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #10b981;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Uttarakhand</strong>
        <span style="font-size:0.85rem;color:#64748b;">Pantnagar SIDCUL, Haridwar</span>
      </a>
      <a href="manpower-assam.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #2563eb;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">Assam &amp; North-East</strong>
        <span style="font-size:0.85rem;color:#64748b;">Guwahati Refineries &amp; Infra</span>
      </a>
      <a href="manpower-uttar-pradesh.html" class="card" style="display:block;text-align:center;padding:20px;border-top:3px solid #f97316;text-decoration:none;background:#fff;border-radius:8px;">
        <strong style="display:block;color:#0f172a;font-size:1.1rem;margin-bottom:4px;">⭐ All Uttar Pradesh</strong>
        <span style="font-size:0.85rem;color:#64748b;">75 Districts Coverage</span>
      </a>
    </div>
  </div>
</section>
`;

  content = content.replace(/<!-- Uttar Pradesh Dedicated Hub Section -->[\s\S]*?<\/section>/, panIndiaGrid);
  fs.writeFileSync(locFile, content, 'utf8');
  console.log('Updated pages/locations.html with Pan-India state directory.');
}

// 3. Update index.html location grid
const indexFile = 'index.html';
if (fs.existsSync(indexFile)) {
  let content = fs.readFileSync(indexFile, 'utf8');
  const newIndexGrid = `<div class="location-grid">
      <div class="location-item"><a href="pages/manpower-maharashtra.html" style="color:inherit;text-decoration:none;">Maharashtra <span class="state">Mumbai &amp; Pune</span></a></div>
      <div class="location-item"><a href="pages/manpower-gujarat.html" style="color:inherit;text-decoration:none;">Gujarat <span class="state">Sanand &amp; Dahej</span></a></div>
      <div class="location-item"><a href="pages/manpower-karnataka.html" style="color:inherit;text-decoration:none;">Karnataka <span class="state">Bengaluru Tech Parks</span></a></div>
      <div class="location-item"><a href="pages/manpower-delhi-ncr.html" style="color:inherit;text-decoration:none;">Delhi NCR <span class="state">Gurugram &amp; Noida</span></a></div>
      <div class="location-item"><a href="pages/manpower-tamil-nadu.html" style="color:inherit;text-decoration:none;">Tamil Nadu <span class="state">Chennai &amp; Hosur</span></a></div>
      <div class="location-item"><a href="pages/manpower-telangana.html" style="color:inherit;text-decoration:none;">Telangana <span class="state">Hyderabad</span></a></div>
      <div class="location-item"><a href="pages/manpower-west-bengal.html" style="color:inherit;text-decoration:none;">West Bengal <span class="state">Kolkata &amp; Durgapur</span></a></div>
      <div class="location-item"><a href="pages/manpower-rajasthan.html" style="color:inherit;text-decoration:none;">Rajasthan <span class="state">Bhiwadi &amp; Jaipur</span></a></div>
      <div class="location-item"><a href="pages/manpower-madhya-pradesh.html" style="color:inherit;text-decoration:none;">Madhya Pradesh <span class="state">Indore &amp; Pithampur</span></a></div>
      <div class="location-item"><a href="pages/manpower-uttar-pradesh.html" style="color:inherit;text-decoration:none;">Uttar Pradesh <span class="state">75 Districts</span></a></div>
      <div class="location-item"><a href="pages/manpower-punjab.html" style="color:inherit;text-decoration:none;">Punjab <span class="state">Ludhiana &amp; Steel</span></a></div>
      <div class="location-item"><a href="pages/manpower-odisha.html" style="color:inherit;text-decoration:none;">Odisha <span class="state">Jharsuguda &amp; Paradeep</span></a></div>
    </div>`;

  content = content.replace(/<div class="location-grid">[\s\S]*?<\/div>/, newIndexGrid);
  fs.writeFileSync(indexFile, content, 'utf8');
  console.log('Updated index.html Operational Coverage location grid.');
}
