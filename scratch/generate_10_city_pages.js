const fs = require('fs');
const path = require('path');

const cities = [
  {
    slug: 'construction-company-prayagraj',
    name: 'Prayagraj',
    aliases: 'Allahabad / Sangam City',
    distKm: 100,
    lat: 25.4358,
    lng: 81.8463,
    title: 'Construction Company in Prayagraj | Manpower Supply | Prakhar India',
    desc: 'Top construction company & manpower supplier in Prayagraj. 100% EPF/ESIC compliant labor, 24-48h deployment. Call +91-9044499111 for civil contracting quotes.',
    focusKw: 'construction company in prayagraj',
    secKw: 'manpower supply prayagraj, labour contractor prayagraj, thekedar in prayagraj, civil contractor prayagraj, building contractor prayagraj, mistri prayagraj, mazdoor prayagraj',
    introText: 'Looking for a reliable, licensed construction company in Prayagraj or need immediate manpower supply in Prayagraj for your residential, commercial, or industrial project? Prakhar India (Prakhar Enterprises) is your trusted engineering partner and labor thekedar. Located just 100 km from our Mirzapur operational headquarters, we provide rapid 24 to 48-hour workforce deployment and complete civil execution across the Sangam city. Whether you need skilled raj mistri for building construction in Civil Lines, industrial helpers in Naini, or turnkey civil contracting for large-scale infrastructure and Mahakumbh corridor expansions, our team guarantees 100% statutory compliance including EPF, ESIC, and Workmen Compensation (WC) Insurance. Avoid unorganized contractors and project delays. For immediate quotes and workforce booking, call our project desk at +91-9044499111 or connect with us on WhatsApp today.',
    reasons: [
      'Mahakumbh & Urban Infrastructure Track Record: Proven civil capability to execute fast-track public works, bridge approaches, commercial hotels, and urban beautification projects aligned with Prayagraj Development Authority (PDA) norms.',
      'Naini Industrial Corridor Dominance: Rapid blue-collar labor mobilization for manufacturing plants, heavy machinery fabrication units, and logistics godowns in the Naini Industrial Corridor.',
      '100% Legal & Statutory Immunity: Complete compliance with the Contract Labour (Regulation & Abolition) Act, EPF, ESIC, and UP Minimum Wages Act, shielding principal employers from legal claims.',
      'Rapid Mobilization from Mirzapur HQ: Located just 2 hours away via NH-19 and NH-35, our rapid mobilization team handles site inspections and worker dispatch within 24–48 hours.',
      'Mechanized Civil Contracting: Modern construction equipment including automatic concrete batching mixers, steel bar bending machines, and steel shuttering plates for zero structural defects.'
    ],
    industrialAreas: [
      { name: 'Naini Industrial Area', desc: 'Heavy engineering, glass manufacturing, electrical machinery, and food processing plants.' },
      { name: 'Phaphamau & Shantipuram', desc: 'Rapidly expanding residential colonies, educational institutes, and warehousing parks.' },
      { name: 'Jhunsi & Andawa Corridor', desc: 'High-density real estate developments, commercial shopping complexes, and road projects.' },
      { name: 'Civil Lines, Katra & George Town', desc: 'Premium commercial construction, corporate office fitouts, and renovation projects.' },
      { name: 'Soraon & Mauaima', desc: 'Agricultural storage facilities, cold stores, and rural infrastructure.' },
      { name: 'Karchana, Handia & Meja', desc: 'Mega infrastructure, thermal power peripheral civil works, and highway bypass expansions.' },
      { name: 'Bara Industrial Zone', desc: 'Cement units, thermal plants, and heavy industrial workforce deployments.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Prayagraj?', a: 'Prakhar India is ranked among the top construction companies and licensed manpower agencies serving Prayagraj. With its Mirzapur operations base just 100 km away, the company provides turnkey civil construction, government tender execution, and skilled labour thekedari backed by 100% statutory compliance. Call +91-9044499111 for consultation.' },
      { q: 'How much does a mason (mistri) charge per day in Prayagraj? (प्रयागराज में मिस्त्री का दैनिक चार्ज कितना है?)', a: 'In Prayagraj, a skilled raj mistri charges between ₹1,000 and ₹1,150 per day for an 8-hour shift, while unskilled helpers (mazdoor) charge approximately ₹700 per day. Prakhar India provides verified masons and helpers with complete EPF/ESIC coverage for long-term and short-term contracts.' },
      { q: 'Where can I hire labour for construction in Prayagraj? (प्रयागराज में लेबर और ठेकेदार कहाँ से मिलेंगे?)', a: 'Instead of relying on unverified daily labour chowks in Naini or Phaphamau, you can directly hire verified, biometric-screened construction crews from Prakhar India by calling +91-9044499111. We deploy teams within 24–48 hours directly to your job site.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Prayagraj?', a: 'Yes. 100% of our industrial and civil workers in Prayagraj are enrolled under EPFO and ESIC. We provide clients with monthly ECR slips, contribution challans, and complete statutory indemnity.' },
      { q: 'How fast can Prakhar India deploy workers in Prayagraj?', a: 'We mobilize standard construction crews and factory helpers within 24 to 48 hours across Naini, Phaphamau, Jhunsi, and surrounding industrial zones.' },
      { q: 'Do you take government construction tenders in Prayagraj?', a: 'Yes, Prakhar India is a Class-A civil contractor experienced in executing UP PWD, Prayagraj Nagar Nigam, Smart City, and irrigation department civil works.' },
      { q: 'What is the cost of building a house in Prayagraj per sq ft?', a: 'In Prayagraj, residential turnkey construction ranges from ₹1,400 to ₹1,650 per sq. ft. for standard finishes, and ₹1,800 to ₹2,300 per sq. ft. for premium architectural construction. Pure labor thekedari ranges between ₹230 and ₹320 per sq. ft.' },
      { q: 'Can I get manpower for factory/warehouse in Naini, Prayagraj?', a: 'Yes. We supply packaging staff, forklift assistants, CNC helpers, loading/unloading mazdoor, and inventory sorters for manufacturing plants and logistics godowns throughout Prayagraj.' }
    ],
    nearby1: { name: 'Varanasi', file: 'construction-company-varanasi.html' },
    nearby2: { name: 'Bhadohi', file: 'construction-company-bhadohi.html' }
  },
  {
    slug: 'construction-company-varanasi',
    name: 'Varanasi',
    aliases: 'Banaras / Kashi',
    distKm: 65,
    lat: 25.3176,
    lng: 82.9739,
    title: 'Construction Company in Varanasi | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Varanasi. 100% EPF/ESIC compliant labour, turnkey building construction. Call +91-9044499111 for rapid deployment.',
    focusKw: 'construction company in varanasi',
    secKw: 'manpower supply varanasi, labour contractor varanasi, thekedar in varanasi, civil contractor varanasi, building contractor varanasi, mistri varanasi, mazdoor varanasi',
    introText: 'Looking for the most reliable construction company in Varanasi or require instant manpower supply in Varanasi for hotel development, industrial manufacturing, or heritage corridor projects? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and licensed workforce thekedar. Located just 65 km from our central Mirzapur headquarters, our operations team reaches any site in Varanasi, Ramnagar, Sarnath, or Shivpur within 90 minutes. We provide turnkey residential and commercial civil construction, hotel infrastructure building, and specialized skilled tradesmen including raj mistri, tile setters, shuttering carpenters, and factory helpers. Backed by 100% statutory compliance under EPF, ESIC, and CLRA regulations, we ensure seamless execution with zero client liability. Contact our senior project desk at +91-9044499111 or connect via WhatsApp for immediate deployment.',
    reasons: [
      'Hospitality & Heritage Civil Expertise: Specialized engineering capability to build modern multi-storey hotels, guest houses, and commercial centers aligned with Varanasi Development Authority (VDA) zoning and heritage conservation rules.',
      'Ramnagar Industrial Area Sourcing: Comprehensive contract labour supply for packaging plants, food processing, logistics godowns, and heavy fabrication units in Ramnagar and Karkhiyaon industrial parks.',
      '65 km Proximity Advantage: Daily supervisory mobility and emergency worker mobilization from our Mirzapur HQ across NH-19 and Ring Road Phase 1 & 2.',
      'Strict Structural Vetting: High-strength M25/M30 mechanized concrete pouring, computerized bar bending, and water-tight foundation engineering suited for Varanasi’s alluvial soil.',
      'Zero Labour Liability: 100% EPF, ESIC, and Workmen Compensation insurance compliance with transparent monthly ECR filing.'
    ],
    industrialAreas: [
      { name: 'Ramnagar Industrial Area', desc: 'Manufacturing units, engineering workshops, and logistics hubs.' },
      { name: 'Karkhiyaon Industrial Area (UPSIDA Agro Park)', desc: 'Food processing, packaging, and cold chain facilities.' },
      { name: 'Shivpur, Tarna & Babatpur Airport Road', desc: 'Hotel developments, commercial shopping hubs, and luxury housing schemes.' },
      { name: 'Rohania & Chandpur Industrial Estate', desc: 'Commercial warehouses, transport hubs, and small-scale manufacturing.' },
      { name: 'Sigra, Bhelupur & Mahmoorganj', desc: 'Prime urban commercial complexes, institutional buildings, and interior civil remodeling.' },
      { name: 'Sarnath & Ashapur', desc: 'Heritage-sensitive tourism infrastructure, boutique resorts, and residential townships.' },
      { name: 'Pindra, Cholapur & Sewapuri', desc: 'Rural infrastructure, highway corridors, and solar plant installations.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Varanasi?', a: 'Prakhar India is Varanasi’s top-rated civil construction company and manpower supply agency. Headquartered 65 km away in Mirzapur, Prakhar India provides turnkey commercial, residential, and industrial construction backed by EPF/ESIC compliant workforce. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Varanasi? (वाराणसी में राज मिस्त्री का रेट क्या है?)', a: 'In Varanasi, an experienced raj mistri charges between ₹1,000 and ₹1,200 per day for an 8-hour shift, while general construction mazdoor charge ₹700 per day. Prakhar India provides verified mistri teams with complete statutory protection.' },
      { q: 'Where can I hire labour for construction in Varanasi?', a: 'Call Prakhar India directly at +91-9044499111. We supply verified, experienced construction crews directly to your site in Sigra, Ramnagar, Shivpur, Rohania, or Sarnath within 24–48 hours.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Varanasi?', a: 'Yes. All workers deployed by Prakhar India in Varanasi are enrolled with EPF and ESIC, and we provide monthly ECR challans and compliance documentation to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Varanasi?', a: 'Because our headquarters in Mirzapur is just 65 km away, we can inspect your site and mobilize workforce within 24 to 48 hours across Varanasi district.' },
      { q: 'Do you take government construction tenders in Varanasi?', a: 'Yes, we are a Class-A contractor experienced in executing UP PWD, Varanasi Development Authority (VDA), and Smart City infrastructure projects.' },
      { q: 'What is the cost of building a house in Varanasi per sq ft?', a: 'Standard residential construction in Varanasi costs ₹1,400 to ₹1,650 per sq. ft., while luxury and hotel construction ranges from ₹1,800 to ₹2,400 per sq. ft. Pure labor thekedari costs ₹240 to ₹330 per sq. ft.' },
      { q: 'Can I get manpower for factory/warehouse in Ramnagar, Varanasi?', a: 'Yes, we supply warehouse helpers, packaging operators, forklift drivers, and machine maintenance staff for manufacturing units in Ramnagar and Karkhiyaon.' }
    ],
    nearby1: { name: 'Chandauli', file: 'construction-company-chandauli.html' },
    nearby2: { name: 'Jaunpur', file: 'construction-company-jaunpur.html' }
  },
  {
    slug: 'construction-company-jaunpur',
    name: 'Jaunpur',
    aliases: 'Shiraz-e-Hind',
    distKm: 85,
    lat: 25.7464,
    lng: 82.6837,
    title: 'Construction Company in Jaunpur | Manpower Supply | Prakhar India',
    desc: 'Leading construction company & labour thekedar in Jaunpur. 100% EPF/ESIC compliant manpower, civil contracting & building. Call +91-9044499111 for quick quotes.',
    focusKw: 'construction company in jaunpur',
    secKw: 'manpower supply jaunpur, labour contractor jaunpur, thekedar in jaunpur, civil contractor jaunpur, building contractor jaunpur, mistri jaunpur, mazdoor jaunpur',
    introText: 'Are you looking for an experienced construction company in Jaunpur or require licensed manpower supply in Jaunpur for agro-processing plants, commercial building construction, or highway infrastructure? Prakhar India (Prakhar Enterprises) is your trusted Class-A civil contractor and manpower thekedar. Located 85 km from our Mirzapur operations headquarters, we serve the entire Jaunpur district including Shahganj, Machhlishahr, Mariahu, and Badlapur with 24 to 48-hour workforce deployment. We provide skilled raj mistri, shuttering carpenters, steel rebar fixers, electricians, and general construction mazdoor, alongside complete turnkey civil construction services. All our workers are 100% covered under EPF and ESIC statutory frameworks. Call our engineering team at +91-9044499111 or contact us on WhatsApp for fast project mobilization.',
    reasons: [
      'Siddharth Nagar & Agro-Industrial Coverage: Rapid deployment of skilled and unskilled labor for rice mills, oil extraction plants, and cold storage units across Jaunpur.',
      'Highway & Bridge Civil Capability: Specialized experience supporting national and state highway expansions connecting Jaunpur with Varanasi, Ayodhya, and Lucknow.',
      'Fast 85 km Access: Direct connectivity via SH-5 and NH-31 ensures rapid site inspections, equipment mobilization, and daily supervisory oversight from Mirzapur.',
      'End-to-End Turnkey Delivery: Complete material procurement (grade-A cement, Fe-550D TMT steel, quality bricks) and mechanized construction management.',
      'Zero Legal Hassles: Complete adherence to UP minimum wage notifications, EPF, ESIC, and Workmen Compensation policies.'
    ],
    industrialAreas: [
      { name: 'Siddharth Nagar Industrial Estate', desc: 'Agro-processing, engineering workshops, and small-scale manufacturing.' },
      { name: 'Shahganj', desc: 'Major commercial mandi, cold storage facilities, and railway infrastructure civil works.' },
      { name: 'Machhlishahr', desc: 'Commercial building complexes, residential developments, and rural roads.' },
      { name: 'Mariahu & Kerakat', desc: 'Highway expansion projects, commercial retail outlets, and housing colonies.' },
      { name: 'Badlapur & Khutahan', desc: 'Warehousing, grain storage godowns, and institutional construction.' },
      { name: 'Jaunpur City & Olandganj', desc: 'Commercial shopping centers, bank offices, and private residential buildings.' },
      { name: 'Zafarabad', desc: 'Railway junction peripheral development, transport warehouses, and boundary wall projects.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Jaunpur?', a: 'Prakhar India is recognized as the leading construction company and licensed labour contractor in Jaunpur. Headquartered 85 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Jaunpur? (जौनपुर में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Jaunpur, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Jaunpur?', a: 'Call Prakhar India at +91-9044499111 to deploy verified masons, shuttering carpenters, and general helpers directly to your project site in Jaunpur, Shahganj, or Mariahu.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Jaunpur?', a: 'Yes, 100% of our workforce deployed in Jaunpur is registered under EPFO and ESIC.' },
      { q: 'How fast can Prakhar India deploy workers in Jaunpur?', a: 'We deploy manpower within 24 to 48 hours anywhere in Jaunpur district.' },
      { q: 'Do you take government construction tenders in Jaunpur?', a: 'Yes, we are a Class-A contractor executing UP PWD, Jal Nigam, and rural development civil contracts.' },
      { q: 'What is the cost of building a house in Jaunpur per sq ft?', a: 'Turnkey residential construction in Jaunpur costs between ₹1,350 and ₹1,600 per sq. ft., while labour thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for factory/warehouse in Jaunpur?', a: 'Yes, we supply warehouse helpers, packaging operators, and machinery staff for agro-processing mills and godowns across Jaunpur.' }
    ],
    nearby1: { name: 'Varanasi', file: 'construction-company-varanasi.html' },
    nearby2: { name: 'Azamgarh', file: 'construction-company-azamgarh.html' }
  },
  {
    slug: 'construction-company-chandauli',
    name: 'Chandauli',
    aliases: 'Pt. DDU Nagar / Mughalsarai',
    distKm: 75,
    lat: 25.2608,
    lng: 83.2721,
    title: 'Construction Company in Chandauli | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Chandauli. Mughalsarai logistics, railway civil works, 100% EPF/ESIC labour. Call +91-9044499111 for 24-48h deployment.',
    focusKw: 'construction company in chandauli',
    secKw: 'manpower supply chandauli, labour contractor chandauli, thekedar in chandauli, civil contractor chandauli, building contractor chandauli, mistri chandauli, mazdoor chandauli',
    introText: 'Need an experienced construction company in Chandauli or looking for verified manpower supply in Chandauli and the Pt. Deen Dayal Upadhyaya Nagar (Mughalsarai) railway and logistics corridor? Prakhar India (Prakhar Enterprises) is your premier Class-A civil contractor and licensed workforce thekedar. Located just 75 km from our Mirzapur operational headquarters, we provide 24 to 48-hour worker deployment and complete civil execution across Chandauli, Mughalsarai, Chakia, and Sakaldiha. Whether you require heavy logistics warehouse workers, railway siding civil contractors, skilled raj mistri, or industrial welders, our staff is 100% EPF, ESIC, and GST compliant. Call our operations desk directly at +91-9044499111 or connect via WhatsApp for fast site mobilization.',
    reasons: [
      'Mughalsarai Logistics & Railway Civil Specialization: Dedicated experience supporting railway freight corridors, container godowns, and transport terminals across Pt. DDU Nagar.',
      'Agro-Hub & Rice Mill Workforce: Supplying skilled mill operators, packaging helpers, and bulk loading mazdoor for Chandauli’s massive rice processing belt (Rice Bowl of UP).',
      '75 km Quick-Response Radius: Rapid mobilization from Mirzapur HQ via NH-19 and GT Road ensures prompt on-site survey and deployment.',
      'Heavy Industrial Infrastructure: Expert execution of heavy RCC flooring, boundary walls, weighbridge civil foundations, and PEB steel storage sheds.',
      'Zero Statutory Liability: Comprehensive monthly EPF/ESIC contribution proof and complete compliance under the Contract Labour Act.'
    ],
    industrialAreas: [
      { name: 'Pt. Deen Dayal Upadhyaya Nagar (Mughalsarai)', desc: 'Major railway junction, transport logistics parks, and commercial hubs.' },
      { name: 'Chandauli District HQ & Mandi Area', desc: 'Grain trading complexes, commercial office buildings, and retail plazas.' },
      { name: 'Chakia & Naugarh', desc: 'Eco-infrastructure, canal civil works, and rural housing schemes.' },
      { name: 'Sakaldiha & Dhanapur', desc: 'Agricultural storage godowns, residential construction, and brick kiln civil support.' },
      { name: 'Saiyadraja (UP-Bihar Border Corridor)', desc: 'Transport check-post logistics godowns, petrol pump civil infrastructure, and highway boundary walls.' },
      { name: 'Alinagar', desc: 'Industrial fabrication units, transport garages, and commercial warehouses.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Chandauli?', a: 'Prakhar India is the premier construction company and licensed labour contractor serving Chandauli and Mughalsarai. Backed by its Mirzapur operations HQ just 75 km away, Prakhar India provides turnkey building and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Chandauli? (चंदौली में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Chandauli, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled labour charges ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Chandauli?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Mughalsarai, Chakia, or Chandauli City.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Chandauli?', a: 'Yes, 100% of our workers in Chandauli are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Chandauli?', a: 'We mobilize construction crews and warehouse workers within 24 to 48 hours across Chandauli district.' },
      { q: 'Do you take government construction tenders in Chandauli?', a: 'Yes, we are a Class-A contractor executing UP PWD, railway siding, and irrigation civil works.' },
      { q: 'What is the cost of building a house in Chandauli per sq ft?', a: 'Turnkey residential building construction in Chandauli costs ₹1,350 to ₹1,600 per sq. ft., while labour thekedari ranges from ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for factory/warehouse in Mughalsarai, Chandauli?', a: 'Yes, we provide warehouse packaging, loading/unloading mazdoor, and machine operators across Pt. DDU Nagar and Chandauli.' }
    ],
    nearby1: { name: 'Varanasi', file: 'construction-company-varanasi.html' },
    nearby2: { name: 'Ghazipur', file: 'construction-company-ghazipur.html' }
  },
  {
    slug: 'construction-company-sonbhadra',
    name: 'Sonbhadra',
    aliases: 'Energy Capital of India',
    distKm: 120,
    lat: 24.6861,
    lng: 83.0658,
    title: 'Construction Company in Sonbhadra | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Sonbhadra. NTPC, Singrauli power plants, mining civil works, 100% EPF/ESIC. Call +91-9044499111 for 24-48h deployment.',
    focusKw: 'construction company in sonbhadra',
    secKw: 'manpower supply sonbhadra, labour contractor sonbhadra, thekedar in sonbhadra, civil contractor sonbhadra, building contractor sonbhadra, mistri sonbhadra, mazdoor sonbhadra',
    introText: 'Looking for a seasoned construction company in Sonbhadra or need certified manpower supply in Sonbhadra for thermal power plants, coal mining infrastructure, or heavy industrial civil works? Prakhar India (Prakhar Enterprises) is your premier Class-A civil contractor and industrial labor thekedar. Located 120 km from our Mirzapur operational headquarters, we maintain dedicated deployment teams across Robertsganj, Renukoot, Anpara, Obra, and Shaktinagar. We provide certified high-pressure welders, mechanical fitters, shuttering masons, heavy machinery helpers, and general labour teams, backed by 100% statutory compliance including EPF, ESIC, and Workmen Compensation policies. Contact our industrial project desk at +91-9044499111 or message us on WhatsApp for rapid workforce mobilization.',
    reasons: [
      'Power Hub & Mining Civil Specialization: Deep technical experience executing heavy industrial foundations, ash dyke civil works, and conveyor structures for NTPC, UPVUNL, Hindalco, and Singrauli belt units.',
      'High-Skill Mechanical & Electrical Trades: Supplying certified 6G/TIG welders, structural fitters, industrial riggers, and high-voltage substation electricians.',
      '120 km Direct Highway Connection: Connected via SH-5A (Vindhyachal Corridor) with active mobilization hubs in Robertsganj and Renukoot.',
      'Heavy Duty Earthwork & Blast-Proof Construction: Fleet of heavy excavators, JCBs, and specialized stone masonry crews suited for Sonbhadra’s rocky terrain.',
      '100% Industrial Safety Compliance: Strict adherence to Directorate General of Mines Safety (DGMS) guidelines and mandatory industrial safety PPE.'
    ],
    industrialAreas: [
      { name: 'Robertsganj (District HQ)', desc: 'Commercial market complexes, administrative buildings, and residential colonies.' },
      { name: 'Renukoot', desc: 'Aluminum smelting (Hindalco), chemical manufacturing, and township civil maintenance.' },
      { name: 'Anpara & Obra', desc: 'Thermal power station civil maintenance, ash dyke height raising, and plant labor.' },
      { name: 'Shaktinagar (Singrauli Belt)', desc: 'Coal mining infrastructure, NTPC plant maintenance, and heavy machinery support.' },
      { name: 'Dalla & Churk', desc: 'Cement manufacturing plants, stone crushing units, and heavy logistics yards.' },
      { name: 'Ghorawal & Chopan', desc: 'Riverbed stone mining, railway bridge civil works, and rural development projects.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Sonbhadra?', a: 'Prakhar India is the premier construction company and industrial manpower agency in Sonbhadra. Serving Robertsganj, Renukoot, Anpara, and Obra from its Mirzapur operations base, Prakhar India provides turnkey civil execution and certified plant workforce. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Sonbhadra? (सोनभद्र में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Sonbhadra, a skilled industrial raj mistri charges ₹1,050 to ₹1,200 per day, while general industrial labour charges ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Sonbhadra?', a: 'Call Prakhar India at +91-9044499111 for verified mechanical fitters, certified welders, masons, and general labour deployed directly to your plant or site in Sonbhadra.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Sonbhadra?', a: 'Yes, 100% of our industrial and civil workers in Sonbhadra are enrolled with EPF and ESIC.' },
      { q: 'How fast can Prakhar India deploy workers in Sonbhadra?', a: 'We deploy industrial crews and plant helpers within 24 to 48 hours across Sonbhadra district.' },
      { q: 'Do you take government construction tenders in Sonbhadra?', a: 'Yes, we are a Class-A contractor executing UP PWD, irrigation, and power sector civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Sonbhadra per sq ft?', a: 'Residential construction in Sonbhadra costs between ₹1,400 and ₹1,650 per sq. ft. due to rocky soil conditions, while labor thekedari ranges from ₹240 to ₹320 per sq. ft.' },
      { q: 'Can I get manpower for thermal plants and factories in Anpara / Renukoot?', a: 'Yes, we supply certified welders, fitters, riggers, and general maintenance staff for power plants and industrial units across Sonbhadra.' }
    ],
    nearby1: { name: 'Prayagraj', file: 'construction-company-prayagraj.html' },
    nearby2: { name: 'Varanasi', file: 'construction-company-varanasi.html' }
  },
  {
    slug: 'construction-company-bhadohi',
    name: 'Bhadohi',
    aliases: 'Sant Ravidas Nagar / Carpet City',
    distKm: 40,
    lat: 25.4194,
    lng: 82.5701,
    title: 'Construction Company in Bhadohi | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Bhadohi. Carpet factory labor, warehouse construction, 100% EPF/ESIC compliant. Call +91-9044499111 for rapid quote.',
    focusKw: 'construction company in bhadohi',
    secKw: 'manpower supply bhadohi, labour contractor bhadohi, thekedar in bhadohi, civil contractor bhadohi, building contractor bhadohi, mistri bhadohi, mazdoor bhadohi',
    introText: 'Looking for a trusted construction company in Bhadohi (Sant Ravidas Nagar) or need reliable manpower supply in Bhadohi for export carpet factories, packaging godowns, or commercial building construction? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and licensed workforce thekedar. Located just 40 km from our Mirzapur operational headquarters, our supervisory teams and workforce reach Bhadohi, Gyanpur, Suriyawan, and Gopiganj in less than 45 minutes. We deliver turnkey warehouse erection, factory flooring, residential home construction, and compliant blue-collar labour supply. All workers are 100% covered under EPF, ESIC, and statutory insurance. Call our Bhadohi desk directly at +91-9044499111 or connect via WhatsApp for immediate quotes.',
    reasons: [
      'Carpet & Textile Industry Specialization: Providing vetted packaging labor, export warehouse handlers, and factory maintenance crews across Carpet City Bhadohi.',
      'Immediate 40 km Proximity: Fastest response time in the region with 24-hour on-site deployment directly from our Mirzapur base via the Ganga Bridge corridor.',
      'Industrial PEB Shed & Tremix Flooring: High-durability concrete floor casting, dust-proof industrial finishes, and PEB steel structures for export manufacturing units.',
      '100% Statutory Compliance: Full EPF/ESIC enrolment, protecting exporters and factory owners from labor department penalties.',
      'Experienced Civil Engineering: Turnkey commercial and residential building execution with computer-tested concrete and Fe-550 TMT rebar.'
    ],
    industrialAreas: [
      { name: 'Bhadohi Industrial Area (UPSIDA)', desc: 'Carpet manufacturing units, dyeing plants, and export warehouses.' },
      { name: 'Gopiganj (GT Road Corridor)', desc: 'Commercial transport hubs, retail centers, and manufacturing sheds.' },
      { name: 'Gyanpur (District HQ)', desc: 'Government administrative buildings, residential colonies, and educational campuses.' },
      { name: 'Suriyawan', desc: 'Grain storage warehouses, rural road civil works, and private residential developments.' },
      { name: 'Khamaria', desc: 'Carpet weaving clusters, export packing godowns, and commercial shops.' },
      { name: 'Aurai', desc: 'Highway commercial complexes, warehousing hubs, and petrol pump civil structures.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Bhadohi?', a: 'Prakhar India is recognized as the leading construction company and licensed labour contractor in Bhadohi. Headquartered just 40 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Bhadohi? (भदोही में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Bhadohi, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Bhadohi?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Bhadohi, Gyanpur, or Gopiganj.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Bhadohi?', a: 'Yes, 100% of our workers in Bhadohi are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Bhadohi?', a: 'Because of our close 40 km proximity, we can deploy construction crews and factory workers within 24 to 48 hours across Bhadohi district.' },
      { q: 'Do you take government construction tenders in Bhadohi?', a: 'Yes, we are a Class-A contractor executing UP PWD, Nagar Palika, and rural civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Bhadohi per sq ft?', a: 'Turnkey residential construction in Bhadohi costs ₹1,350 to ₹1,600 per sq. ft., while labour thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for carpet factories and warehouses in Bhadohi?', a: 'Yes, we supply export packaging staff, loading/unloading mazdoor, and machine maintenance staff for carpet factories across Bhadohi and Gopiganj.' }
    ],
    nearby1: { name: 'Varanasi', file: 'construction-company-varanasi.html' },
    nearby2: { name: 'Prayagraj', file: 'construction-company-prayagraj.html' }
  },
  {
    slug: 'construction-company-ghazipur',
    name: 'Ghazipur',
    aliases: 'Land of Warriors',
    distKm: 120,
    lat: 25.5840,
    lng: 83.5770,
    title: 'Construction Company in Ghazipur | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Ghazipur. Purvanchal Expressway civil works, 100% EPF/ESIC compliant labour. Call +91-9044499111 for quick quote.',
    focusKw: 'construction company in ghazipur',
    secKw: 'manpower supply ghazipur, labour contractor ghazipur, thekedar in ghazipur, civil contractor ghazipur, building contractor ghazipur, mistri ghazipur, mazdoor ghazipur',
    introText: 'Looking for a reliable construction company in Ghazipur or need licensed manpower supply in Ghazipur along the Purvanchal Expressway and Ganga riverfront corridor? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and manpower thekedar. Located 120 km from our Mirzapur operational headquarters, we maintain mobile deployment units serving Ghazipur City, Zamania, Mohamadabad, Saidpur, and Dildarnagar within 24 to 48 hours. We deliver turnkey commercial building construction, cold storage godown erection, highway boundary walls, and skilled blue-collar labour supply. Backed by 100% statutory compliance under EPF, ESIC, and CLRA frameworks, we guarantee zero legal liability for principal employers. Contact our Ghazipur desk at +91-9044499111 or message us on WhatsApp for immediate site consultation.',
    reasons: [
      'Purvanchal Expressway Corridor Infrastructure: Specialized civil engineering and workforce deployment for logistics hubs, fuel stations, and commercial plazas along the expressway.',
      'Agro-Cold Storage & Warehouse Construction: Turnkey erection of heavy-capacity cold storage facilities, grain warehouses, and packaging sheds.',
      '120 km Direct Access: Seamless transport access from Mirzapur via NH-19 and Varanasi-Ghazipur Highway (NH-31) ensures rapid equipment and labor transit.',
      'Riverfront & Flood-Resilient Civil Works: Engineered deep-pile foundations and reinforced retaining walls designed for Ghazipur’s riparian soil conditions.',
      '100% Statutory Compliance: Monthly ECR filings, ESIC health coverage, and Workmen Compensation insurance for complete client peace of mind.'
    ],
    industrialAreas: [
      { name: 'Ghazipur City & Lanka', desc: 'Commercial shopping complexes, banking offices, and residential colonies.' },
      { name: 'Mohamadabad', desc: 'Major agricultural trade mandi, cold storage infrastructure, and commercial plazas.' },
      { name: 'Zamania', desc: 'Railway corridor civil works, grain storage godowns, and residential housing.' },
      { name: 'Saidpur', desc: 'Highway commercial developments, educational institutions, and riverfront infrastructure.' },
      { name: 'Dildarnagar Junction', desc: 'Logistics warehousing, railway siding support, and transport complexes.' },
      { name: 'Jangipur & Sadat', desc: 'Agro-processing facilities, cold chain logistics, and rural civil contracts.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Ghazipur?', a: 'Prakhar India is the premier construction company and licensed labour contractor serving Ghazipur. Headquartered 120 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Ghazipur? (गाजीपुर में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Ghazipur, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Ghazipur?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Ghazipur, Mohamadabad, or Zamania.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Ghazipur?', a: 'Yes, 100% of our workers in Ghazipur are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Ghazipur?', a: 'We deploy construction crews and warehouse workers within 24 to 48 hours across Ghazipur district.' },
      { q: 'Do you take government construction tenders in Ghazipur?', a: 'Yes, we are a Class-A contractor executing UP PWD, expressway corridor, and rural civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Ghazipur per sq ft?', a: 'Turnkey residential construction in Ghazipur costs ₹1,350 to ₹1,600 per sq. ft., while labour thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for cold storage and warehouses in Ghazipur?', a: 'Yes, we supply warehouse packaging staff, loading/unloading mazdoor, and machine operators across Ghazipur and Mohamadabad.' }
    ],
    nearby1: { name: 'Varanasi', file: 'construction-company-varanasi.html' },
    nearby2: { name: 'Ballia', file: 'construction-company-ballia.html' }
  },
  {
    slug: 'construction-company-azamgarh',
    name: 'Azamgarh',
    aliases: 'Purvanchal Education & Trade Hub',
    distKm: 140,
    lat: 26.0738,
    lng: 83.1859,
    title: 'Construction Company in Azamgarh | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Azamgarh. Purvanchal Expressway infrastructure, commercial construction, 100% EPF/ESIC. Call +91-9044499111 now.',
    focusKw: 'construction company in azamgarh',
    secKw: 'manpower supply azamgarh, labour contractor azamgarh, thekedar in azamgarh, civil contractor azamgarh, building contractor azamgarh, mistri azamgarh, mazdoor azamgarh',
    introText: 'Looking for an established construction company in Azamgarh or require dependable manpower supply in Azamgarh for commercial shopping complexes, residential buildings, or Purvanchal Expressway industrial zones? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and licensed workforce thekedar. Located 140 km from our Mirzapur operational headquarters, we provide rapid 24 to 48-hour workforce deployment across Azamgarh City, Phoolpur, Lalganj, Sagri, Mehnagar, and Mubarakpur. We deliver turnkey civil construction, PEB industrial sheds, hospital buildings, and skilled blue-collar labour supply including raj mistri, tile setters, shuttering carpenters, and electricians. All our staff members are 100% covered under EPF, ESIC, and statutory insurance. Call our Azamgarh desk at +91-9044499111 or connect via WhatsApp for immediate quotes.',
    reasons: [
      'Purvanchal Expressway Industrial Node Execution: Proven capability to construct warehousing parks, commercial hubs, and transport terminals along the expressway corridor.',
      'Commercial & Institutional Building Specialization: Turnkey execution of multi-storey shopping complexes, private hospitals, nursing homes, and educational colleges in Azamgarh.',
      '140 km Rapid Mobilization: Fast connectivity via SH-67 and the expressway network ensures timely material delivery and supervisor transit from Mirzapur.',
      'Mubarakpur Textile & Packaging Support: Supplying factory helpers, packaging labor, and electrical maintenance teams for the regional textile and weaving sector.',
      'Zero Statutory Liability: Comprehensive monthly EPF/ESIC compliance certificates protecting builders and property owners.'
    ],
    industrialAreas: [
      { name: 'Azamgarh City & Civil Lines', desc: 'Prime commercial shopping complexes, diagnostic centers, and residential housing.' },
      { name: 'Mubarakpur', desc: 'Weaving clusters, packaging godowns, and commercial retail markets.' },
      { name: 'Phoolpur Pawai', desc: 'Commercial hubs, agro-storage facilities, and highway development.' },
      { name: 'Lalganj', desc: 'Purvanchal Expressway junction developments, transport logistics, and private colleges.' },
      { name: 'Sagri & Bilariyaganj', desc: 'Rural infrastructure, flood-resilient civil works, and warehousing godowns.' },
      { name: 'Mehnagar & Mohammadpur', desc: 'Residential building construction, petrol pumps, and market plazas.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Azamgarh?', a: 'Prakhar India is the leading construction company and licensed labour contractor serving Azamgarh. Headquartered 140 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Azamgarh? (आजमगढ़ में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Azamgarh, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Azamgarh?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Azamgarh City, Phoolpur, or Lalganj.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Azamgarh?', a: 'Yes, 100% of our workers in Azamgarh are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Azamgarh?', a: 'We deploy construction crews and warehouse workers within 24 to 48 hours across Azamgarh district.' },
      { q: 'Do you take government construction tenders in Azamgarh?', a: 'Yes, we are a Class-A contractor executing UP PWD, expressway corridor, and rural civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Azamgarh per sq ft?', a: 'Turnkey residential construction in Azamgarh costs ₹1,350 to ₹1,600 per sq. ft., while labour thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for commercial projects and warehouses in Azamgarh?', a: 'Yes, we supply warehouse packaging staff, loading/unloading mazdoor, and machine operators across Azamgarh.' }
    ],
    nearby1: { name: 'Jaunpur', file: 'construction-company-jaunpur.html' },
    nearby2: { name: 'Mau', file: 'construction-company-mau.html' }
  },
  {
    slug: 'construction-company-mau',
    name: 'Mau',
    aliases: 'Maunath Bhanjan',
    distKm: 150,
    lat: 25.9419,
    lng: 83.5610,
    title: 'Construction Company in Mau | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Mau. Textile factory labor, commercial building construction, 100% EPF/ESIC. Call +91-9044499111 for quick deployment.',
    focusKw: 'construction company in mau',
    secKw: 'manpower supply mau, labour contractor mau, thekedar in mau, civil contractor mau, building contractor mau, mistri mau, mazdoor mau',
    introText: 'Looking for a reliable construction company in Mau (Maunath Bhanjan) or need licensed manpower supply in Mau for textile processing units, commercial shopping complexes, or warehousing projects? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and licensed workforce thekedar. Located 150 km from our Mirzapur operational headquarters, we maintain dedicated deployment teams serving Mau City, Ghosi, Madhuban, and Muhammadabad Gohna. We deliver turnkey industrial factory construction, commercial retail building, residential villas, and skilled blue-collar labour supply including raj mistri, shuttering carpenters, bar benders, electricians, and factory workers. All workers are 100% covered under EPF and ESIC statutory frameworks. Contact our Mau operations desk at +91-9044499111 or connect via WhatsApp for immediate quotes.',
    reasons: [
      'Textile & Powerloom Industry Sourcing: Supplying experienced factory helpers, packaging labor, loom operators, and electrical maintenance teams for Mau\'s major textile industrial base.',
      'Commercial Building & Retail Complex Construction: Turnkey execution of multi-storey commercial centers, banking complexes, and retail markets in Mau City.',
      '150 km Reliable Coverage: Seamless connectivity via Varanasi-Gorakhpur Highway (NH-29) ensures fast mobilization of machinery and supervisory personnel from Mirzapur.',
      'Industrial PEB Shed & Heavy Flooring: Engineered steel structure erection, heavy tremix/VDF flooring, and boundary wall construction for manufacturing units.',
      '100% Statutory Compliance: Zero client legal liability with complete monthly EPF, ESIC, and Workmen Compensation documentation.'
    ],
    industrialAreas: [
      { name: 'Maunath Bhanjan (City Center & Industrial Area)', desc: 'Textile powerloom clusters, spinning mills, and commercial markets.' },
      { name: 'Ghosi', desc: 'Commercial shopping hubs, agricultural storage godowns, and highway infrastructure.' },
      { name: 'Madhuban', desc: 'Residential developments, healthcare clinics, and rural road networks.' },
      { name: 'Muhammadabad Gohna', desc: 'Textile processing units, cold storage facilities, and retail complexes.' },
      { name: 'Kopaganj', desc: 'Commercial trading mandis, transport logistics godowns, and housing colonies.' },
      { name: 'Doharighat', desc: 'Riverfront flood-protection civil works, highway bypass projects, and commercial hubs.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Mau?', a: 'Prakhar India is the leading construction company and licensed labour contractor serving Mau. Headquartered 150 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Mau? (मऊ में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Mau, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Mau?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Mau City, Ghosi, or Madhuban.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Mau?', a: 'Yes, 100% of our workers in Mau are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Mau?', a: 'We deploy construction crews and warehouse workers within 24 to 48 hours across Mau district.' },
      { q: 'Do you take government construction tenders in Mau?', a: 'Yes, we are a Class-A contractor executing UP PWD, textile park, and rural civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Mau per sq ft?', a: 'Turnkey residential construction in Mau costs ₹1,350 to ₹1,600 per sq. ft., while labour thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for textile factories and warehouses in Mau?', a: 'Yes, we supply warehouse packaging staff and machine operators across Mau.' }
    ],
    nearby1: { name: 'Azamgarh', file: 'construction-company-azamgarh.html' },
    nearby2: { name: 'Ballia', file: 'construction-company-ballia.html' }
  },
  {
    slug: 'construction-company-ballia',
    name: 'Ballia',
    aliases: 'Bhrigu Nagari',
    distKm: 160,
    lat: 25.7582,
    lng: 84.1482,
    title: 'Construction Company in Ballia | Manpower Supply | Prakhar India',
    desc: 'Top civil contractor & manpower supplier in Ballia. Turnkey building construction, 100% EPF/ESIC compliant labor. Call +91-9044499111 for quick 24-48h deployment.',
    focusKw: 'construction company in ballia',
    secKw: 'manpower supply ballia, labour contractor ballia, thekedar in ballia, civil contractor ballia, building contractor ballia, mistri ballia, mazdoor ballia',
    introText: 'Looking for an experienced construction company in Ballia or require verified manpower supply in Ballia along the Ganga-Ghaghara river basin and UP-Bihar border corridor? Prakhar India (Prakhar Enterprises) is your premier Class-A civil engineering contractor and licensed workforce thekedar. Located 160 km from our Mirzapur operational headquarters, we maintain dedicated deployment teams serving Ballia City, Rasra, Bairia, Bansdih, Sikanderpur, and Belthara Road within 24 to 48 hours. We deliver turnkey residential house construction, commercial shopping complexes, flood-resilient civil engineering, and compliant blue-collar labour supply including raj mistri, tile setters, shuttering carpenters, electricians, and general construction mazdoor. Backed by 100% statutory compliance under EPF, ESIC, and CLRA frameworks, we guarantee zero legal liability. Call our Ballia desk at +91-9044499111 or connect via WhatsApp for immediate quotes.',
    reasons: [
      'Flood-Resilient & Riverbank Civil Engineering: Specialized engineering expertise constructing deep-piled foundations, RCC retaining walls, and water-tight basements designed for Ballia\'s alluvial soil.',
      'Agro-Processing & Cold Chain Construction: Turnkey execution of potato cold storages, grain warehousing godowns, and commercial retail plazas across Rasra and Ballia.',
      '160 km Reliable Access: Fast transport via NH-31 and state highways ensures timely mobilization of concrete mixers, steel shuttering, and skilled tradesmen from Mirzapur.',
      'Cross-Border Logistics Workforce: Supplying loading/unloading mazdoor, packaging staff, and warehouse maintenance helpers for UP-Bihar border trading hubs.',
      '100% Statutory Compliance: Zero client legal liability with complete monthly EPF, ESIC, and Workmen Compensation documentation.'
    ],
    industrialAreas: [
      { name: 'Ballia City & Civil Lines', desc: 'Commercial markets, banking hubs, private hospitals, and residential colonies.' },
      { name: 'Rasra', desc: 'Industrial sugar mill area, commercial mandi, cold storage godowns, and educational campuses.' },
      { name: 'Bairia (UP-Bihar Border)', desc: 'Riverfront embankment works, transport logistics check-posts, and rural housing.' },
      { name: 'Bansdih', desc: 'Commercial retail plazas, grain godowns, and residential building construction.' },
      { name: 'Sikanderpur', desc: 'Fragrance/attar extraction units, agricultural warehouses, and road bypass infrastructure.' },
      { name: 'Belthara Road', desc: 'Railway corridor commercial developments, storage yards, and residential colonies.' }
    ],
    faqs: [
      { q: 'Which is the best construction company in Ballia?', a: 'Prakhar India is the leading construction company and licensed labour contractor serving Ballia. Headquartered 160 km away in Mirzapur, we deliver turnkey civil construction and compliant manpower. Call +91-9044499111.' },
      { q: 'How much does a mason (mistri) charge per day in Ballia? (बलिया में मिस्त्री का दैनिक चार्ज क्या है?)', a: 'In Ballia, a skilled raj mistri charges ₹1,000 to ₹1,100 per day, while unskilled construction mazdoor charge ₹700 per day.' },
      { q: 'Where can I hire labour for construction in Ballia?', a: 'Call Prakhar India at +91-9044499111 for rapid site deployment of verified construction workers in Ballia City, Rasra, or Bairia.' },
      { q: 'Do you supply EPF/ESIC compliant workers in Ballia?', a: 'Yes, 100% of our workers in Ballia are covered under EPF and ESIC with monthly ECR slips provided to clients.' },
      { q: 'How fast can Prakhar India deploy workers in Ballia?', a: 'We deploy construction crews and warehouse workers within 24 to 48 hours across Ballia district.' },
      { q: 'Do you take government construction tenders in Ballia?', a: 'Yes, we are a Class-A contractor executing UP PWD, flood protection, and rural civil infrastructure tenders.' },
      { q: 'What is the cost of building a house in Ballia per sq ft?', a: 'Turnkey residential construction in Ballia costs ₹1,350 to ₹1,600 per sq. ft., while labor thekedari costs ₹220 to ₹300 per sq. ft.' },
      { q: 'Can I get manpower for warehouses and cold storage in Ballia?', a: 'Yes, we supply warehouse packaging staff, loading/unloading mazdoor, and machine operators across Ballia and Rasra.' }
    ],
    nearby1: { name: 'Ghazipur', file: 'construction-company-ghazipur.html' },
    nearby2: { name: 'Mau', file: 'construction-company-mau.html' }
  }
];

function generateHtml(c) {
  const schemaObj = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor"],
        "@id": `https://prakharind.com/pages/${c.slug}.html#localbusiness`,
        "name": `Prakhar India — Construction Company & Manpower Supply ${c.name}`,
        "url": `https://prakharind.com/pages/${c.slug}.html`,
        "telephone": "+91-9044499111",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot No. 14, Industrial Area",
          "addressLocality": "Mirzapur City",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "231001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": c.lat,
          "longitude": c.lng
        },
        "areaServed": {
          "@type": "City",
          "name": c.name,
          "sameAs": `https://en.wikipedia.org/wiki/${encodeURIComponent(c.name)}`
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "07:00",
          "closes": "21:00"
        }
      },
      {
        "@type": "Service",
        "@id": `https://prakharind.com/pages/${c.slug}.html#service`,
        "name": `Civil Construction & Manpower Supply Services in ${c.name}`,
        "provider": {
          "@id": `https://prakharind.com/pages/${c.slug}.html#localbusiness`
        },
        "areaServed": `${c.name}, Uttar Pradesh`,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${c.name} Construction & Labour Services`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Skilled & Unskilled Manpower Supply ${c.name}`
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Turnkey Civil Construction ${c.name}`
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": `https://prakharind.com/pages/${c.slug}.html#faq`,
        "mainEntity": c.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://prakharind.com/pages/${c.slug}.html#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://prakharind.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Uttar Pradesh",
            "item": "https://prakharind.com/pages/manpower-uttar-pradesh.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `Construction Company in ${c.name}`,
            "item": `https://prakharind.com/pages/${c.slug}.html`
          }
        ]
      }
    ]
  };

  const reasonsHtml = c.reasons.map(r => {
    const parts = r.split(':');
    if (parts.length > 1) {
      return `        <li style="margin-bottom:1rem;"><strong style="color:#0f172a; font-size:1.05rem;">${parts[0].trim()}:</strong> ${parts.slice(1).join(':').trim()}</li>`;
    }
    return `        <li style="margin-bottom:1rem;">${r}</li>`;
  }).join('\n');

  const industrialAreasHtml = c.industrialAreas.map((area, idx) => `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem; transition:transform 0.2s ease, box-shadow 0.2s ease;">
          <h4 style="color:#0f172a; margin:0 0 0.5rem; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
            <span style="display:inline-block; width:8px; height:8px; background:#f97316; border-radius:50%;"></span>
            ${area.name}
          </h4>
          <p style="color:#475569; margin:0; font-size:0.92rem; line-height:1.6;">${area.desc}</p>
        </div>`).join('\n');

  const faqsHtml = c.faqs.map(f => `
      <div class="faq-item" style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem 1.5rem; margin-bottom:1rem; box-shadow:0 2px 6px rgba(15,23,42,0.03);">
        <h3 style="color:#0f172a; font-size:1.12rem; margin:0 0 0.6rem; font-weight:700; line-height:1.4;">${f.q}</h3>
        <p style="color:#475569; margin:0; font-size:0.96rem; line-height:1.7;">${f.a}</p>
      </div>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${c.title}</title>
<meta name="title" content="${c.title}">
<meta name="description" content="${c.desc}">
<meta name="keywords" content="${c.focusKw}, ${c.secKw}">
<meta name="author" content="Prakhar India (Prakhar Enterprises)">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="https://prakharind.com/pages/${c.slug}.html">
<link rel="alternate" hreflang="en-IN" href="https://prakharind.com/pages/${c.slug}.html">
<link rel="alternate" hreflang="hi-IN" href="https://prakharind.com/pages/${c.slug}.html">
<link rel="alternate" hreflang="x-default" href="https://prakharind.com/pages/${c.slug}.html">

<!-- Geo Meta Tags -->
<meta name="geo.region" content="IN-UP">
<meta name="geo.placename" content="${c.name}">
<meta name="geo.position" content="${c.lat};${c.lng}">
<meta name="ICBM" content="${c.lat}, ${c.lng}">

<!-- Open Graph / Social -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://prakharind.com/pages/${c.slug}.html">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.desc}">
<meta property="og:image" content="https://prakharind.com/images/og-prakhar-india.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Prakhar India">
<meta property="og:locale" content="en_IN">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${c.title}">
<meta name="twitter:description" content="${c.desc}">
<meta name="twitter:image" content="https://prakharind.com/images/og-prakhar-india.jpg">

<!-- Favicon & Styles -->
<link rel="stylesheet" href="../css/style.css?v=12.0">
<link rel="icon" href="../images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="../images/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

<!-- JSON-LD Schema Graph -->
<script type="application/ld+json">
${JSON.stringify(schemaObj, null, 2)}
</script>
</head>
<body>
<header class="header">
  <div class="header-inner">
    <a href="../index.html" class="logo" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
      <img src="../images/logo.png" alt="Prakhar Enterprises Orange Crane Logo — prakharind.com" title="Prakhar Enterprises" style="height:48px;width:48px;border-radius:10px;object-fit:contain;background:#fff;padding:2px;border:1.5px solid rgba(249,115,22,0.3);box-shadow:0 4px 14px rgba(15,23,42,0.1);">
      <div class="logo-brand">
        <span class="logo-title" style="font-weight:800;color:#0f172a;font-size:1.2rem;line-height:1.1;">PRAKHAR ENTERPRISES</span>
        <span class="logo-sub" style="font-size:0.7rem;font-weight:700;color:#f97316;letter-spacing:0.6px;text-transform:uppercase;display:block;">Construction &amp; Manpower</span>
      </div>
    </a>
    <nav class="nav">
      <a href="../index.html">Home</a>
      <a href="about.html">About</a>
      <a href="manpower.html" class="active">Manpower</a>
      <a href="construction.html">Construction</a>
      <a href="projects.html">Projects</a>
      <a href="../blog/" style="color:#38bdf8;font-weight:600;">📝 Blog</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-cta" style="display:flex;align-items:center;gap:12px;">
      <a href="tel:9044499111" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;font-size:0.88rem;padding:0.55rem 1.1rem;background:linear-gradient(135deg, #f97316, #ea580c);color:#fff;border-radius:8px;text-decoration:none;font-weight:700;box-shadow:0 4px 14px rgba(249,115,22,0.35);">
        <span>📞</span> +91-9044499111
      </a>
    </div>
  </div>
</header>

<main style="background:#f8fafc; padding-bottom:4rem;">
  <!-- Breadcrumb Bar -->
  <div style="background:#0f172a; color:#94a3b8; padding:0.75rem 0; font-size:0.86rem; border-bottom:1px solid #1e293b;">
    <div class="container" style="max-width:1200px; margin:0 auto; padding:0 1.5rem; display:flex; align-items:center; gap:8px;">
      <a href="../index.html" style="color:#cbd5e1; text-decoration:none;">Home</a>
      <span>›</span>
      <a href="manpower-uttar-pradesh.html" style="color:#cbd5e1; text-decoration:none;">Uttar Pradesh</a>
      <span>›</span>
      <span style="color:#f97316; font-weight:600;">${c.name} Construction &amp; Manpower</span>
    </div>
  </div>

  <!-- Hero Section -->
  <section style="background:radial-gradient(100% 100% at 50% 0%, #172554 0%, #0a1128 50%, #050811 100%); color:#fff; padding:3.5rem 0 4rem; position:relative; overflow:hidden;">
    <div class="container" style="max-width:1200px; margin:0 auto; padding:0 1.5rem; position:relative; z-index:2;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(249,115,22,0.15); border:1px solid rgba(249,115,22,0.4); padding:0.4rem 1rem; border-radius:50px; font-size:0.85rem; font-weight:700; color:#fb923c; margin-bottom:1.5rem; text-transform:uppercase; letter-spacing:1px;">
        <span>⚡</span> Direct Mobilization: ~${c.distKm} km from Mirzapur HQ
      </div>
      <h1 style="font-size:2.5rem; line-height:1.2; font-weight:800; margin:0 0 1.25rem; color:#ffffff; max-width:950px;">
        Construction Company in ${c.name} — Manpower Supply &amp; Civil Contractor
      </h1>
      <p style="font-size:1.15rem; line-height:1.8; color:#cbd5e1; max-width:900px; margin:0 0 2rem;">
        ${c.introText}
      </p>
      <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
        <a href="tel:9044499111" style="background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; padding:0.85rem 1.75rem; border-radius:10px; font-weight:800; text-decoration:none; font-size:1rem; display:inline-flex; align-items:center; gap:8px; box-shadow:0 8px 20px rgba(249,115,22,0.4);">
          📞 Call ${c.name} Operations Desk: +91-9044499111
        </a>
        <a href="https://api.whatsapp.com/send?phone=919044499111&text=Hello%20Prakhar%20India,%20I%20need%20construction/manpower%20services%20in%20${encodeURIComponent(c.name)}" target="_blank" rel="noopener" style="background:#25d366; color:#fff; padding:0.85rem 1.75rem; border-radius:10px; font-weight:800; text-decoration:none; font-size:1rem; display:inline-flex; align-items:center; gap:8px; box-shadow:0 8px 20px rgba(37,211,102,0.3);">
          💬 WhatsApp Instant Quotation
        </a>
      </div>
    </div>
  </section>

  <!-- Main Content Layout -->
  <div class="container" style="max-width:1200px; margin:3rem auto 0; padding:0 1.5rem;">
    
    <!-- Section: Why Businesses Choose Us -->
    <section style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 4px 14px rgba(15,23,42,0.04);">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 1.5rem; border-left:5px solid #f97316; padding-left:1rem;">
        Why ${c.name} Businesses &amp; Builders Choose Prakhar India
      </h2>
      <ul style="padding-left:1.25rem; line-height:1.8; color:#334155; font-size:1.02rem; margin:0;">
${reasonsHtml}
      </ul>
    </section>

    <!-- Section: Our Services -->
    <section style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 4px 14px rgba(15,23,42,0.04);">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 1.75rem; border-left:5px solid #0ea5e9; padding-left:1rem;">
        Our Core Services in ${c.name}
      </h2>

      <div style="margin-bottom:2rem;">
        <h3 style="color:#0f172a; font-size:1.35rem; font-weight:700; margin:0 0 0.75rem; color:#ea580c;">
          1. Manpower Supply in ${c.name} — Masons, Mistri, Bar Benders, Electricians, Welders &amp; General Labour
        </h3>
        <p style="color:#475569; font-size:1rem; line-height:1.8; margin:0 0 1rem;">
          We supply pre-screened, trade-tested, and verified blue-collar workforce across ${c.name} with rapid 24 to 48-hour site deployment:
        </p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          <div style="background:#f8fafc; padding:1.25rem; border-radius:10px; border:1px solid #e2e8f0;">
            <strong style="color:#0f172a; display:block; margin-bottom:0.25rem;">🧱 Master Masons (राज मिस्त्री):</strong>
            <span style="color:#64748b; font-size:0.92rem;">Brick masonry, AAC blocks, plastering, stone cladding, and tile fixing.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:10px; border:1px solid #e2e8f0;">
            <strong style="color:#0f172a; display:block; margin-bottom:0.25rem;">🏗️ Bar Benders &amp; Steel Fixers:</strong>
            <span style="color:#64748b; font-size:0.92rem;">TMT cutting, beam/column rebar cages, and slab steel tying.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:10px; border:1px solid #e2e8f0;">
            <strong style="color:#0f172a; display:block; margin-bottom:0.25rem;">📐 Shuttering Carpenters:</strong>
            <span style="color:#64748b; font-size:0.92rem;">Steel and waterproof plywood formwork for RCC casting.</span>
          </div>
          <div style="background:#f8fafc; padding:1.25rem; border-radius:10px; border:1px solid #e2e8f0;">
            <strong style="color:#0f172a; display:block; margin-bottom:0.25rem;">⚡ Certified Electricians &amp; Welders:</strong>
            <span style="color:#64748b; font-size:0.92rem;">3-phase conduit wiring, panel setup, structural steel &amp; PEB welding.</span>
          </div>
        </div>
      </div>

      <div style="margin-bottom:2rem; border-top:1px solid #e2e8f0; padding-top:1.75rem;">
        <h3 style="color:#0f172a; font-size:1.35rem; font-weight:700; margin:0 0 0.75rem; color:#0284c7;">
          2. Civil &amp; Turnkey Construction in ${c.name}
        </h3>
        <p style="color:#475569; font-size:1rem; line-height:1.8; margin:0;">
          From architectural soil testing and municipal approvals to structural RCC foundation pouring, MEP execution, and architectural finishing, Prakhar India provides complete turnkey building contracting for commercial plazas, residential duplex homes, industrial sheds, and warehousing complexes in ${c.name}.
        </p>
      </div>

      <div style="border-top:1px solid #e2e8f0; padding-top:1.75rem;">
        <h3 style="color:#0f172a; font-size:1.35rem; font-weight:700; margin:0 0 0.75rem; color:#059669;">
          3. Government Tender Execution in ${c.name}
        </h3>
        <p style="color:#475569; font-size:1rem; line-height:1.8; margin:0;">
          As a registered Class-A contractor, we execute government infrastructure projects across ${c.name}, including UP PWD roads, municipal drainage networks, boundary walls, and Jal Jeevan Mission civil infrastructure with complete compliance and bank guarantee backing.
        </p>
      </div>
    </section>

    <!-- Section: Local Industrial Areas & Coverage -->
    <section style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 4px 14px rgba(15,23,42,0.04);">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 0.75rem; border-left:5px solid #10b981; padding-left:1rem;">
        Local Industrial Areas &amp; Geographic Coverage in ${c.name}
      </h2>
      <p style="color:#64748b; font-size:1rem; margin:0 0 1.75rem; line-height:1.6;">
        Our operational network, supervisors, and labor transport reach all tehsils, industrial nodes, and commercial centers across ${c.name}:
      </p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
${industrialAreasHtml}
      </div>
    </section>

    <!-- Section: 5-Step Deployment Process -->
    <section style="background:#0f172a; color:#fff; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem;">
      <h2 style="color:#fff; font-size:1.85rem; font-weight:800; margin:0 0 1.5rem; text-align:center;">
        5-Step Workforce &amp; Civil Deployment Process in ${c.name}
      </h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1.25rem;">
        <div style="background:#1e293b; border-radius:12px; padding:1.25rem; border-top:3px solid #f97316;">
          <span style="font-size:1.5rem; font-weight:800; color:#f97316; display:block; margin-bottom:0.5rem;">01</span>
          <strong style="color:#fff; display:block; margin-bottom:0.25rem;">Enquiry &amp; Scope</strong>
          <p style="color:#94a3b8; font-size:0.86rem; margin:0;">Call +91-9044499111 or WhatsApp your requirement.</p>
        </div>
        <div style="background:#1e293b; border-radius:12px; padding:1.25rem; border-top:3px solid #38bdf8;">
          <span style="font-size:1.5rem; font-weight:800; color:#38bdf8; display:block; margin-bottom:0.5rem;">02</span>
          <strong style="color:#fff; display:block; margin-bottom:0.25rem;">Site Inspection</strong>
          <p style="color:#94a3b8; font-size:0.86rem; margin:0;">Technical survey in ${c.name} within 12–24 hours.</p>
        </div>
        <div style="background:#1e293b; border-radius:12px; padding:1.25rem; border-top:3px solid #10b981;">
          <span style="font-size:1.5rem; font-weight:800; color:#10b981; display:block; margin-bottom:0.5rem;">03</span>
          <strong style="color:#fff; display:block; margin-bottom:0.25rem;">Compliance Docs</strong>
          <p style="color:#94a3b8; font-size:0.86rem; margin:0;">EPF, ESIC &amp; quotation handover with zero liability.</p>
        </div>
        <div style="background:#1e293b; border-radius:12px; padding:1.25rem; border-top:3px solid #f59e0b;">
          <span style="font-size:1.5rem; font-weight:800; color:#f59e0b; display:block; margin-bottom:0.5rem;">04</span>
          <strong style="color:#fff; display:block; margin-bottom:0.25rem;">Deployment</strong>
          <p style="color:#94a3b8; font-size:0.86rem; margin:0;">24–48h workforce &amp; equipment mobilization.</p>
        </div>
        <div style="background:#1e293b; border-radius:12px; padding:1.25rem; border-top:3px solid #a855f7;">
          <span style="font-size:1.5rem; font-weight:800; color:#a855f7; display:block; margin-bottom:0.5rem;">05</span>
          <strong style="color:#fff; display:block; margin-bottom:0.25rem;">Supervision</strong>
          <p style="color:#94a3b8; font-size:0.86rem; margin:0;">On-site management, safety audits &amp; output tracking.</p>
        </div>
      </div>
    </section>

    <!-- Section: Pricing Table -->
    <section style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 4px 14px rgba(15,23,42,0.04);">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 1rem; border-left:5px solid #f59e0b; padding-left:1rem;">
        Standard Labour &amp; Construction Pricing in ${c.name}
      </h2>
      <p style="color:#64748b; font-size:0.96rem; margin:0 0 1.5rem;">
        Transparent, statutory-compliant rates for ${c.name}. Custom rates available for large bulk deployments and long-term contracts.
      </p>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.95rem;">
          <thead>
            <tr style="background:#f1f5f9; color:#0f172a;">
              <th style="padding:1rem; border-bottom:2px solid #cbd5e1;">Trade / Role</th>
              <th style="padding:1rem; border-bottom:2px solid #cbd5e1;">Skill &amp; Scope Description</th>
              <th style="padding:1rem; border-bottom:2px solid #cbd5e1;">Daily Rate Base (8h Shift)</th>
              <th style="padding:1rem; border-bottom:2px solid #cbd5e1;">Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">General Labour (Unskilled Mazdoor)</td>
              <td style="padding:1rem; color:#475569;">Material handling, excavation, concrete mixer helper</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹700 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">100% EPF/ESIC Compliant</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Semi-Skilled Assistant</td>
              <td style="padding:1rem; color:#475569;">Tile cutting assistant, batching helper, machine feeder</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹780 – ₹850 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">Biometric Enrolled</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Master Mason (Raj Mistri)</td>
              <td style="padding:1rem; color:#475569;">Brick masonry, AAC blocks, plastering, boundary walls</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹1,000 – ₹1,150 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">Trade Tested</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Bar Bender &amp; Steel Fixer</td>
              <td style="padding:1rem; color:#475569;">TMT cutting, column cages, foundation &amp; slab rebar</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹950 – ₹1,100 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">Blueprint Literate</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Shuttering Carpenter</td>
              <td style="padding:1rem; color:#475569;">Steel &amp; marine ply formwork for slabs &amp; beams</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹950 – ₹1,100 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">Quality Inspected</td>
            </tr>
            <tr style="border-bottom:1px solid #e2e8f0; background:#f8fafc;">
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Certified Welder / Fitter</td>
              <td style="padding:1rem; color:#475569;">PEB shed structural welding, pipeline, factory trusses</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹1,050 – ₹1,300 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">Safety Certified</td>
            </tr>
            <tr>
              <td style="padding:1rem; font-weight:700; color:#0f172a;">Licensed Industrial Electrician</td>
              <td style="padding:1rem; color:#475569;">3-phase conduit wiring, control panels, plant lighting</td>
              <td style="padding:1rem; font-weight:700; color:#f97316;">₹1,000 – ₹1,200 / day</td>
              <td style="padding:1rem; color:#059669; font-weight:600;">ITI Certified</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style="color:#64748b; font-size:0.86rem; margin:1rem 0 0; font-style:italic;">
        *Note: Daily rates vary by contract tenure, total workforce volume, overtime shifts, and site boarding accommodations.
      </p>
    </section>

    <!-- Section: Compliance & Safety -->
    <section style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 4px 14px rgba(15,23,42,0.04);">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 1.5rem; border-left:5px solid #6366f1; padding-left:1rem;">
        Statutory Compliance &amp; Safety Standards in ${c.name}
      </h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem;">
        <div style="border-left:3px solid #10b981; padding-left:1rem;">
          <h4 style="color:#0f172a; margin:0 0 0.25rem;">100% EPF &amp; ESIC</h4>
          <p style="color:#64748b; font-size:0.9rem; margin:0;">Direct monthly electronic challans and ECR slips provided to principal employers.</p>
        </div>
        <div style="border-left:3px solid #38bdf8; padding-left:1rem;">
          <h4 style="color:#0f172a; margin:0 0 0.25rem;">Workmen Compensation</h4>
          <p style="color:#64748b; font-size:0.9rem; margin:0;">Comprehensive insurance coverage against accidental site liabilities.</p>
        </div>
        <div style="border-left:3px solid #f97316; padding-left:1rem;">
          <h4 style="color:#0f172a; margin:0 0 0.25rem;">GST &amp; CLRA License</h4>
          <p style="color:#64748b; font-size:0.9rem; margin:0;">Fully licensed contract labour provider with ITC-compliant tax invoicing.</p>
        </div>
        <div style="border-left:3px solid #a855f7; padding-left:1rem;">
          <h4 style="color:#0f172a; margin:0 0 0.25rem;">Mandatory Safety PPE</h4>
          <p style="color:#64748b; font-size:0.9rem; margin:0;">Helmets, steel-toe boots, safety vests, and harnesses mandatory on all sites.</p>
        </div>
      </div>
    </section>

    <!-- Section: FAQs -->
    <section style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem;">
      <h2 style="color:#0f172a; font-size:1.85rem; font-weight:800; margin:0 0 1.5rem; border-left:5px solid #f97316; padding-left:1rem;">
        Frequently Asked Questions — Construction &amp; Labour in ${c.name}
      </h2>
      <div class="faq-container">
${faqsHtml}
      </div>
    </section>

    <!-- Section: Contact Block -->
    <section style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:#fff; border-radius:16px; padding:2.5rem; margin-bottom:2.5rem; box-shadow:0 10px 25px rgba(15,23,42,0.15);">
      <h2 style="color:#fff; font-size:1.85rem; font-weight:800; margin:0 0 1.5rem;">
        Contact Prakhar India in ${c.name}
      </h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2rem;">
        <div>
          <p style="color:#cbd5e1; line-height:1.8; margin:0 0 1.25rem; font-size:0.96rem;">
            <strong style="color:#fff;">Operational Headquarters:</strong> Plot No. 14, Industrial Area, Mirzapur City, UP 231001 (~${c.distKm} km from ${c.name})<br>
            <strong style="color:#fff;">Serving:</strong> All tehsils &amp; industrial areas of ${c.name}<br>
            <strong style="color:#fff;">Operating Hours:</strong> Monday – Sunday, 07:00 AM – 09:00 PM IST<br>
            <strong style="color:#fff;">Email:</strong> prakharindiaofficial@gmail.com
          </p>
        </div>
        <div style="display:flex; flex-direction:column; justify-content:center; gap:1rem;">
          <a href="tel:9044499111" style="background:linear-gradient(135deg, #f97316, #ea580c); color:#fff; padding:0.85rem 1.5rem; border-radius:8px; font-weight:700; text-decoration:none; text-align:center; font-size:1rem; box-shadow:0 4px 14px rgba(249,115,22,0.35);">
            📞 Direct Phone: +91-9044499111
          </a>
          <a href="https://api.whatsapp.com/send?phone=919044499111&text=Hello%20Prakhar%20India,%20I%20need%20manpower/construction%20in%20${encodeURIComponent(c.name)}" target="_blank" rel="noopener" style="background:#25d366; color:#fff; padding:0.85rem 1.5rem; border-radius:8px; font-weight:700; text-decoration:none; text-align:center; font-size:1rem; box-shadow:0 4px 14px rgba(37,211,102,0.25);">
            💬 WhatsApp: +91-9044499111
          </a>
        </div>
      </div>
    </section>

    <!-- Call to Action Banner -->
    <div style="background:linear-gradient(90deg, #ea580c, #f97316); border-radius:12px; padding:1.5rem 2rem; color:#fff; text-align:center; font-weight:700; font-size:1.15rem; margin-bottom:2.5rem; box-shadow:0 6px 18px rgba(249,115,22,0.3);">
      "Need construction workers in ${c.name}? Call 9044499111 — 24-48h deployment. 100% EPF/ESIC compliant."
    </div>

    <!-- Internal Navigation Hub -->
    <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:1.5rem; font-size:0.92rem; line-height:1.8;">
      <strong style="color:#0f172a; display:block; margin-bottom:0.5rem; font-size:1rem;">Explore Related Regional &amp; State Construction Hubs:</strong>
      <div style="display:flex; flex-wrap:wrap; gap:1.25rem;">
        <a href="manpower-uttar-pradesh.html" style="color:#f97316; text-decoration:none; font-weight:600;">UP Manpower &amp; Construction</a>
        <a href="../index.html" style="color:#0284c7; text-decoration:none;">Prakhar India Home</a>
        <a href="${c.nearby1.file}" style="color:#0f172a; text-decoration:none;">Construction in ${c.nearby1.name}</a>
        <a href="${c.nearby2.file}" style="color:#0f172a; text-decoration:none;">Construction in ${c.nearby2.name}</a>
        <a href="contact.html" style="color:#059669; text-decoration:none; font-weight:600;">Contact Engineering Team</a>
      </div>
    </div>

  </div>
</main>

<footer class="footer" style="background:#0b1120; color:#94a3b8; padding:3.5rem 0 2rem; border-top:1px solid #1e293b;">
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
          <li><a href="manpower-maharashtra.html" style="color:#cbd5e1; text-decoration:none;">Manpower Maharashtra</a></li>
          <li><a href="manpower-gujarat.html" style="color:#cbd5e1; text-decoration:none;">Labour Supplier Gujarat</a></li>
          <li><a href="manpower-delhi-ncr.html" style="color:#cbd5e1; text-decoration:none;">Delhi NCR Workforce</a></li>
          <li><a href="manpower-rajasthan.html" style="color:#cbd5e1; text-decoration:none;">Manpower Rajasthan</a></li>
          <li><a href="manpower-punjab.html" style="color:#cbd5e1; text-decoration:none;">Labour Contractor Punjab</a></li>
          <li><a href="manpower-uttarakhand.html" style="color:#cbd5e1; text-decoration:none;">Uttarakhand SIDCUL Labour</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Southern &amp; Central States:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="manpower-karnataka.html" style="color:#cbd5e1; text-decoration:none;">Manpower Karnataka</a></li>
          <li><a href="manpower-tamil-nadu.html" style="color:#cbd5e1; text-decoration:none;">Tamil Nadu Industrial Labour</a></li>
          <li><a href="manpower-telangana.html" style="color:#cbd5e1; text-decoration:none;">Telangana Manpower Agency</a></li>
          <li><a href="manpower-madhya-pradesh.html" style="color:#cbd5e1; text-decoration:none;">Madhya Pradesh Labour</a></li>
          <li><a href="manpower-chhattisgarh.html" style="color:#cbd5e1; text-decoration:none;">Chhattisgarh Mining Labour</a></li>
          <li><a href="manpower-uttar-pradesh.html" style="color:#cbd5e1; text-decoration:none;">Uttar Pradesh Manpower Hub</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Eastern &amp; North-East States:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="manpower-west-bengal.html" style="color:#cbd5e1; text-decoration:none;">West Bengal Labour</a></li>
          <li><a href="manpower-bihar.html" style="color:#cbd5e1; text-decoration:none;">Manpower Supplier Bihar</a></li>
          <li><a href="manpower-odisha.html" style="color:#cbd5e1; text-decoration:none;">Odisha Steel Plant Labour</a></li>
          <li><a href="manpower-jharkhand.html" style="color:#cbd5e1; text-decoration:none;">Jharkhand Mining Manpower</a></li>
          <li><a href="manpower-assam.html" style="color:#cbd5e1; text-decoration:none;">Assam Industrial Labour</a></li>
          <li><a href="manpower-sonbhadra.html" style="color:#cbd5e1; text-decoration:none;">Sonbhadra Power Hub</a></li>
        </ul>
      </div>

      <div>
        <strong style="color:#38bdf8; display:block; margin-bottom:0.75rem; font-size:0.98rem;">Regional Construction Hubs:</strong>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><a href="construction-company-prayagraj.html" style="color:#cbd5e1; text-decoration:none;">Construction Prayagraj</a></li>
          <li><a href="construction-company-varanasi.html" style="color:#cbd5e1; text-decoration:none;">Construction Varanasi</a></li>
          <li><a href="construction-company-jaunpur.html" style="color:#cbd5e1; text-decoration:none;">Construction Jaunpur</a></li>
          <li><a href="construction-company-chandauli.html" style="color:#cbd5e1; text-decoration:none;">Construction Chandauli</a></li>
          <li><a href="construction-company-sonbhadra.html" style="color:#cbd5e1; text-decoration:none;">Construction Sonbhadra</a></li>
          <li><a href="construction-company-bhadohi.html" style="color:#cbd5e1; text-decoration:none;">Construction Bhadohi</a></li>
          <li><a href="book-workforce.html" style="color:#f59e0b; text-decoration:none; font-weight:700;">⚡ Book Labour Online</a></li>
        </ul>
      </div>
    </div>

    <div style="border-top:1px solid #1e293b; margin-top:2.5rem; padding-top:1.5rem; text-align:center; color:#64748b; font-size:0.8rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <div>© 2026 Prakhar India Manpower &amp; Construction Contractor. Plot No. 14, Industrial Area, Mirzapur, UP 231001.</div>
      <div style="display:flex; gap:1.2rem;">
        <a href="privacy-policy.html" style="color:#64748b; text-decoration:none;">Privacy Policy</a>
        <a href="terms.html" style="color:#64748b; text-decoration:none;">Terms &amp; Conditions</a>
        <a href="grievance.html" style="color:#64748b; text-decoration:none;">Grievance Redressal</a>
      </div>
    </div>
  </div>
</footer>

<script src="../js/lang.js?v=12.0"></script>
<script src="../js/main.js?v=12.0"></script>

<!-- Floating WhatsApp & Phone Call Buttons -->
<a href="tel:9044499111" class="call-float" target="_blank" rel="noopener noreferrer" style="position:fixed;width:55px;height:55px;bottom:95px;right:30px;background:linear-gradient(135deg, #f97316 0%, #ea580c 100%);color:#FFF;border-radius:50px;text-align:center;font-size:26px;box-shadow: 0 0 18px rgba(249, 115, 22, 0.8), 0 0 35px rgba(56, 189, 248, 0.6);z-index:9999;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all 0.3s ease;border:2px solid #fff;" title="Call 9044499111">
  📞
</a>
<a href="https://api.whatsapp.com/send?phone=919044499111&text=Hello%20Prakhar%20India!%20I%20am%20interested%20in%20your%20Construction%20%26%20Manpower%20Services%20in%20${encodeURIComponent(c.name)}.%20Please%20share%20details%20and%20quotation." class="whatsapp-float" target="_blank" rel="noopener noreferrer" style="position:fixed;width:55px;height:55px;bottom:30px;right:30px;background-color:#25d366;color:#FFF;border-radius:50px;text-align:center;font-size:30px;box-shadow: 2px 2px 6px rgba(0,0,0,0.3);z-index:9999;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform 0.3s ease;">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.203-.102-1.2-.59-1.385-.658-.182-.065-.315-.1-.452.1-.136.2-.527.659-.646.797-.12.137-.24.154-.442.052-.202-.102-.853-.315-1.624-.997-.6-.533-1.005-1.196-1.123-1.398-.118-.2-.012-.307.088-.408.09-.091.202-.236.302-.354.101-.118.136-.2.203-.336.067-.136.033-.254-.017-.355-.05-.101-.452-1.09-.618-1.493-.16-.39-.324-.337-.442-.337h-.377c-.128 0-.336.048-.512.24-.176.192-.672.656-.672 1.6 0 .943.687 1.857.782 1.983.096.128 1.35 2.06 3.27 2.89.458.197.815.316 1.094.404.46.146.88.125 1.213.076.371-.054 1.2-.49 1.37-9.63.17-.474.17-.88.125-.963-.047-.083-.177-.132-.38-.235z"/>
  </svg>
</a>
</body>
</html>`;
}

const pagesDir = path.join(__dirname, '..', 'pages');
let generatedCount = 0;

for (const c of cities) {
  const filePath = path.join(pagesDir, `${c.slug}.html`);
  const content = generateHtml(c);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[CREATED] ${filePath} (${content.length} bytes)`);
  generatedCount++;
}

console.log(`\nSuccessfully created ${generatedCount} landing pages in ${pagesDir}`);
