export type Lang = "en" | "hi";

type Dict = Record<string, { en: string; hi: string }>;

export const dict: Dict = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.manpower": { en: "Manpower", hi: "श्रम" },
  "nav.capabilities": { en: "Capabilities", hi: "क्षमताएं" },
  "nav.projects": { en: "Projects", hi: "परियोजनाएं" },
  "nav.estimator": { en: "Estimator", hi: "अनुमानक" },
  "nav.contact": { en: "Contact", hi: "संपर्क" },
  "nav.stats": { en: "Track Record", hi: "उपलब्धियां" },

  "hero.badge": { en: "Structural Evolution — Blueprint to Reality", hi: "संरचनात्मक विकास — ब्लूप्रिंट से वास्तविकता तक" },
  "hero.h1.1": { en: "Manpower &", hi: "श्रम एवं" },
  "hero.h1.2": { en: "Construction", hi: "निर्माण" },
  "hero.h1.3": { en: "Solutions", hi: "समाधान" },
  "hero.sub": {
    en: "Prakhar India supplies skilled, semi-skilled, and general workers for projects across India and undertakes residential, commercial, industrial, and eligible government construction work.",
    hi: "प्रखर इंडिया पूरे भारत में परियोजनाओं के लिए कुशल, अर्ध-कुशल और सामान्य श्रमिकों की आपूर्ति करता है और आवासीय, वाणिज्यिक, औद्योगिक और पात्र सरकारी निर्माण कार्य करता है।",
  },
  "hero.cta.manpower": { en: "Request Manpower", hi: "श्रमिक मांगें" },
  "hero.cta.quote": { en: "Request Construction Quote", hi: "निर्माण कोटेशन प्राप्त करें" },
  "hero.scroll": { en: "Scroll to build the site", hi: "साइट बनाने के लिए स्क्रॉल करें" },

  "sec.manpower": { en: "02 — MANPOWER", hi: "०२ — श्रम" },
  "sec.manpower.title": { en: "Workforce deployed like a living force field", hi: "जीवित बल क्षेत्र की तरह तैनात कार्यबल" },
  "sec.manpower.sub": {
    en: "Hover the deployment grid. Every node is a verified trade — scaled, trained, and contract-compliant.",
    hi: "तैनाती ग्रिड पर होवर करें। हर नोड एक सत्यापित ट्रेड है — स्तरीकृत, प्रशिक्षित और अनुबंध-अनुरूप।",
  },

  "sec.cap": { en: "03 — CAPABILITIES", hi: "०३ — क्षमताएं" },
  "sec.cap.title": { en: "Watch the structure build itself", hi: "संरचना को स्वयं बनते देखें" },
  "sec.cap.sub": {
    en: "Residential. Commercial. Industrial. Every phase — foundation, structure, roof — assembled to precision in real time.",
    hi: "आवासीय। वाणिज्यिक। औद्योगिक। हर चरण — नींव, संरचना, छत — वास्तविक समय में सटीकता से निर्मित।",
  },
  "cap.step.foundation": { en: "FOUNDATION", hi: "नींव" },
  "cap.step.structure": { en: "STRUCTURE", hi: "संरचना" },
  "cap.step.roof": { en: "ROOF", hi: "छत" },
  "cap.res": { en: "Residential", hi: "आवासीय" },
  "cap.com": { en: "Commercial", hi: "वाणिज्यिक" },
  "cap.ind": { en: "Industrial", hi: "औद्योगिक" },

  "sec.stats": { en: "04 — TRACK RECORD", hi: "०४ — उपलब्धियां" },
  "stats.years.n": { en: "10+", hi: "१०+" },
  "stats.years.l": { en: "Years Experience", hi: "वर्षों का अनुभव" },
  "stats.workers.n": { en: "5000+", hi: "५०००+" },
  "stats.workers.l": { en: "Workers Deployed", hi: "श्रमिक तैनात" },
  "stats.states.n": { en: "10+", hi: "१०+" },
  "stats.states.l": { en: "States Served", hi: "सेवित राज्य" },
  "stats.projects.n": { en: "100+", hi: "१००+" },
  "stats.projects.l": { en: "Projects Completed", hi: "परियोजनाएं पूर्ण" },
  "stats.compliance.n": { en: "100%", hi: "१००%" },
  "stats.compliance.l": { en: "Statutory Compliance", hi: "वैधानिक अनुपालन" },

  "sec.projects": { en: "05 — PROJECTS", hi: "०५ — परियोजनाएं" },
  "sec.projects.title": { en: "Selected delivery record", hi: "चुनिंदा डिलीवरी रिकॉर्ड" },
  "proj.1.tags": { en: "Construction · Commercial", hi: "निर्माण · वाणिज्यिक" },
  "proj.1.name": { en: "Commercial Complex Construction", hi: "वाणिज्यिक परिसर निर्माण" },
  "proj.1.meta": { en: "Noida, Uttar Pradesh | 2024–2025", hi: "नोएडा, उत्तर प्रदेश | २०२४–२०२५" },
  "proj.1.desc": {
    en: "Turnkey construction of a G+3 commercial complex including structural, electrical, and finishing work.",
    hi: "जी+३ वाणिज्यिक परिसर का टर्नकी निर्माण जिसमें संरचनात्मक, विद्युत और परिष्करण कार्य शामिल है।",
  },
  "proj.2.tags": { en: "Manpower · Industrial", hi: "श्रम · औद्योगिक" },
  "proj.2.name": { en: "Workforce Deployment for Factory", hi: "फैक्ट्री के लिए कार्यबल तैनाती" },
  "proj.2.meta": { en: "Greater Noida, Uttar Pradesh | 2024", hi: "ग्रेटर नोएडा, उत्तर प्रदेश | २०२४" },
  "proj.2.desc": {
    en: "Deployed 120+ skilled and semi-skilled workers for a large-scale manufacturing facility project.",
    hi: "एक बड़े पैमाने पर विनिर्माण सुविधा परियोजना के लिए १२०+ कुशल और अर्ध-कुशल श्रमिकों की तैनाती।",
  },
  "proj.3.tags": { en: "Construction · Residential", hi: "निर्माण · आवासीय" },
  "proj.3.name": { en: "Residential Apartment Construction", hi: "आवासीय अपार्टमेंट निर्माण" },
  "proj.3.meta": { en: "Delhi | 2023–2024", hi: "दिल्ली | २०२३–२०२४" },
  "proj.3.desc": {
    en: "Construction of a G+5 residential apartment building with quality finishing and timely delivery.",
    hi: "गुणवत्ता परिष्करण और समय पर डिलीवरी के साथ जी+५ आवासीय अपार्टमेंट भवन का निर्माण।",
  },
  "sec.projects.cta": { en: "View All Projects", hi: "सभी परियोजनाएं देखें" },

  "sec.estimator": { en: "06 — PROJECT ESTIMATOR", hi: "०६ — परियोजना अनुमानक" },
  "sec.estimator.title": { en: "Scale it. See it. Estimate it.", hi: "स्केल करें। देखें। अनुमान लगाएं।" },
  "sec.estimator.sub": {
    en: "Drag the sliders. The site scales in real time and a working estimate is generated instantly.",
    hi: "स्लाइडर खींचें। साइट वास्तविक समय में स्केल होती है और कार्य अनुमान तुरंत बनता है।",
  },
  "est.workers": { en: "Workers", hi: "श्रमिक" },
  "est.workers.type": { en: "Worker type", hi: "श्रमिक प्रकार" },
  "est.type.labour": { en: "General Labour", hi: "सामान्य श्रम" },
  "est.type.mistri": { en: "Mistri (Skilled)", hi: "मिस्त्री (कुशल)" },
  "est.days": { en: "Days", hi: "दिन" },
  "est.size": { en: "Site size", hi: "साइट आकार" },
  "est.size.s": { en: "Small", hi: "छोटा" },
  "est.size.m": { en: "Medium", hi: "मध्यम" },
  "est.size.l": { en: "Large", hi: "बड़ा" },
  "est.estimate": { en: "Estimated engagement", hi: "अनुमानित अनुबंध" },
  "est.cta": { en: "Send this requirement", hi: "यह आवश्यकता भेजें" },
  "est.note": { en: "Indicative daily-rate estimate. Final quote within 24 hours.", hi: "संकेतक दैनिक दर अनुमान। अंतिम कोटेशन २४ घंटे में।" },

  "sec.trust": { en: "07 — COMPLIANCE & SAFETY", hi: "०७ — अनुपालन और सुरक्षा" },
  "sec.trust.title": { en: "Trust is engineered, not marketed", hi: "विश्वास इंजीनियर किया जाता है, विज्ञापित नहीं" },
  "comp.1": { en: "PF & ESI Registration", hi: "पीएफ और ईएसआई पंजीकरण" },
  "comp.2": { en: "Labour Licence", hi: "श्रम लाइसेंस" },
  "comp.3": { en: "GST Registration", hi: "जीएसटी पंजीकरण" },
  "comp.4": { en: "Contractor Licence", hi: "ठेकेदार लाइसेंस" },
  "comp.5": { en: "Insurance Coverage", hi: "बीमा कवरेज" },
  "comp.6": { en: "Safety Policy & Training", hi: "सुरक्षा नीति और प्रशिक्षण" },

  "sec.testi": { en: "08 — CLIENT VOICE", hi: "०८ — ग्राहक आवाज़" },
  "t.1.q": {
    en: "Prakhar India provided reliable workers for our residential project. Their team was professional and responsive to our changing requirements.",
    hi: "प्रखर इंडिया ने हमारी आवासीय परियोजना के लिए विश्वसनीय श्रमिक प्रदान किए। उनकी टीम पेशेवर थी।",
  },
  "t.1.a": { en: "Mr. Sharma — Builder, Delhi", hi: "श्री शर्मा — बिल्डर, दिल्ली" },
  "t.2.q": {
    en: "We needed a large workforce on short notice. Prakhar India mobilised skilled workers within a week and maintained quality throughout.",
    hi: "हमें कम समय में बड़ी कार्यबल की आवश्यकता थी। प्रखर इंडिया ने एक सप्ताह के भीतर कुशल श्रमिक जुटाए।",
  },
  "t.2.a": { en: "Mr. Verma — Project Manager, Noida", hi: "श्री वर्मा — परियोजना प्रबंधक, नोएडा" },
  "t.3.q": {
    en: "Professional approach to construction with good quality control. Completed our commercial project on time and within budget.",
    hi: "अच्छे गुणवत्ता नियंत्रण के साथ निर्माण के लिए पेशेवर दृष्टिकोण। हमारी वाणिज्यिक परियोजना समय पर पूरी की।",
  },
  "t.3.a": { en: "Mrs. Gupta — Property Owner, Gurugram", hi: "श्रीमती गुप्ता — संपत्ति मालिक, गुरुग्राम" },

  "sec.locations": { en: "Operational coverage", hi: "परिचालन कवरेज" },
  "fc.legend": { en: "Worker categories — hover to expand", hi: "श्रमिक श्रेणियां — होवर करें" },

  "contact.title": { en: "Start the build", hi: "निर्माण शुरू करें" },
  "contact.sub": {
    en: "Tell us about your project and our team will provide a suitable proposal within 24 hours.",
    hi: "हमें अपनी परियोजना के बारे में बताएं और हमारी टीम २४ घंटे के भीतर उपयुक्त प्रस्ताव देगी।",
  },
  "contact.call": { en: "Call now", hi: "अभी कॉल करें" },
  "contact.mail": { en: "Email", hi: "ईमेल" },
  "contact.address": { en: "Mirzapur, Uttar Pradesh 231001", hi: "मिर्ज़ापुर, उत्तर प्रदेश २३१००१" },
  "footer.tagline": {
    en: "Reliable manpower solutions and construction services across India. We deploy skilled, semi-skilled, and general workers, undertake building construction, and execute eligible government contracts.",
    hi: "पूरे भारत में विश्वसनीय श्रम समाधान और निर्माण सेवाएं। हम विभिन्न आकारों की परियोजनाओं के लिए कुशल, अर्ध-कुशल और सामान्य श्रमिकों की तैनाती करते हैं।",
  },
  "footer.rights": { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" },
  "footer.est": { en: "Engineered deployment. Precision construction.", hi: "इंजीनियर्ड तैनाती। सटीक निर्माण।" },
  "legacy.note": { en: "Legal: Privacy Policy / Terms / Grievance", hi: "कानूनी: गोपनीयता नीति / शर्तें / शिकायत" },
};

export type WorkerCatId =
  | "mason"
  | "shuttering"
  | "steel"
  | "electrician"
  | "plumber"
  | "painter"
  | "welder"
  | "tile"
  | "operator"
  | "helper"
  | "supervisor"
  | "warehouse";

export const workerCats: Record<WorkerCatId, { en: string; hi: string }> = {
  mason: { en: "Masons & Mistris", hi: "मिस्त्री एवं राज" },
  shuttering: { en: "Shuttering Carpenters", hi: "शटरिंग बढ़ई" },
  steel: { en: "Bar Benders & Steel Fixers", hi: "सरिया बेंडर व स्टील फिक्सर" },
  electrician: { en: "Electricians", hi: "इलेक्ट्रीशियन" },
  plumber: { en: "Plumbers", hi: "प्लंबर" },
  painter: { en: "Painters & Polishers", hi: "पेंटर व पॉलिशर" },
  welder: { en: "Welders & Fabricators", hi: "वेल्डर व फैब्रिकेटर" },
  tile: { en: "Tile & Marble Workers", hi: "टाइल व संगमरमर श्रमिक" },
  operator: { en: "Machine Operators", hi: "मशीन ऑपरेटर" },
  helper: { en: "Helpers & Loaders", hi: "हेल्पर व लोडर" },
  supervisor: { en: "Site Supervisors", hi: "साइट सुपरवाइज़र" },
  warehouse: { en: "Warehouse & Factory Workers", hi: "गोदाम व फैक्ट्री श्रमिक" },
};

export const locations: { city: string; state: string }[] = [
  { city: "Delhi", state: "NCR" },
  { city: "Noida", state: "Uttar Pradesh" },
  { city: "Greater Noida", state: "Uttar Pradesh" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Ghaziabad", state: "Uttar Pradesh" },
  { city: "Agra", state: "Uttar Pradesh" },
  { city: "Kanpur", state: "Uttar Pradesh" },
  { city: "Gurugram", state: "Haryana" },
  { city: "Faridabad", state: "Haryana" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Dehradun", state: "Uttarakhand" },
  { city: "Chandigarh", state: "Chandigarh" },
];