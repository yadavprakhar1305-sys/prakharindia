document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.classList.contains('open');
      faqQuestions.forEach(other => {
        other.nextElementSibling.classList.remove('open');
        other.classList.remove('open');
      });
      if (!isOpen) {
        answer.classList.add('open');
        q.classList.add('open');
      }
    });
  });

  const filterSelects = document.querySelectorAll('.filter-bar select, .filter-bar input');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterSelects.length && projectCards.length) {
    filterSelects.forEach(el => {
      el.addEventListener('change', filterProjects);
      el.addEventListener('input', filterProjects);
    });
  }
  function filterProjects() {
    const typeFilter = document.getElementById('filter-type')?.value?.toLowerCase() || '';
    const locFilter = document.getElementById('filter-location')?.value?.toLowerCase() || '';
    const statusFilter = document.getElementById('filter-status')?.value?.toLowerCase() || '';
    projectCards.forEach(card => {
      const tags = card.querySelector('.project-tags')?.textContent?.toLowerCase() || '';
      const body = card.querySelector('.project-card-body')?.textContent?.toLowerCase() || '';
      const matchType = !typeFilter || tags.includes(typeFilter);
      const matchLoc = !locFilter || body.includes(locFilter);
      const matchStatus = !statusFilter || body.includes(statusFilter);
      card.style.display = (matchType && matchLoc && matchStatus) ? '' : 'none';
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ═══ CLIENT-SIDE PLUGINS EXECUTION MODULE ═══
  const plugins = JSON.parse(localStorage.getItem('prakhar_plugins') || '{"whatsapp":true,"socialProof":false,"darkMode":false}');
  
  // 1. WhatsApp Button Toggle
  const waBtn = document.querySelector('.whatsapp-float');
  if (waBtn && plugins.whatsapp === false) {
    waBtn.style.display = 'none';
  }
  
  // 2. Dark Mode Plugin
  if (plugins.darkMode === true) {
    const darkStyle = document.createElement('style');
    darkStyle.id = 'plugin-darkmode-css';
    darkStyle.textContent = `
      body { background: #0b0f19 !important; color: #cbd5e1 !important; }
      .card, .wp-notice, .construction-item, .testimonial-card { background: #111827 !important; border-color: #1f2937 !important; color: #cbd5e1 !important; }
      .section-title h2, h1, h2, h3, h4, .author { color: #f8fafc !important; }
      p, .desc { color: #94a3b8 !important; }
      .page-header { background: linear-gradient(135deg, #0b0f19 0%, #111827 100%) !important; }
      .footer { background: #030712 !important; border-top: 1px solid #111827 !important; }
      .header { background: rgba(11, 15, 25, 0.85) !important; border-bottom: 1px solid rgba(31, 41, 55, 0.8) !important; }
      .header.scrolled { background: rgba(11, 15, 25, 0.95) !important; }
      .nav a { color: #94a3b8 !important; }
      .nav a:hover, .nav a.active { color: #3b82f6 !important; }
      input, select, textarea { background: #1f2937 !important; border-color: #374151 !important; color: #fff !important; }
      .card-icon, .icon { background: #1f2937 !important; }
    `;
    document.head.appendChild(darkStyle);
  }
  
  // 3. Social Proof Popup Plugin
  if (plugins.socialProof === true) {
    const proofStyle = document.createElement('style');
    proofStyle.textContent = `
      .proof-toast {
        position: fixed; bottom: 20px; left: 20px;
        background: #ffffff; border-left: 4px solid var(--orange-500);
        padding: 16px 20px; border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        display: flex; align-items: center; gap: 12px;
        transform: translateY(120%); opacity: 0;
        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 99999; max-width: 320px; font-family: var(--font-sans);
      }
      .proof-toast.show { transform: translateY(0); opacity: 1; }
      .proof-avatar { width: 36px; height: 36px; background: var(--blue-50); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
      .proof-body { font-size: 0.82rem; color: var(--gray-700); line-height: 1.4; }
      .proof-body strong { color: var(--gray-900); }
    `;
    document.head.appendChild(proofStyle);
    
    const toastContainer = document.createElement('div');
    toastContainer.className = 'proof-toast';
    toastContainer.innerHTML = `
      <div class="proof-avatar">👷</div>
      <div class="proof-body">
        <strong id="proof-name">Ramesh from Varanasi</strong><br>
        <span id="proof-msg">booked 50 Manpower Labours</span>
      </div>
    `;
    document.body.appendChild(toastContainer);
    
    const notifications = [
      { name: "Ramesh from Varanasi", msg: "just booked 50 construction workers" },
      { name: "Vikas from Mirzapur", msg: "requested a Building Construction Quote" },
      { name: "Ankit from Lucknow", msg: "hired 10 Shuttering Carpenters" },
      { name: "Vikram from Prayagraj", msg: "booked 5 Mason Mistris" },
      { name: "Suresh from Bhadohi", msg: "booked 20 skilled factory workers" },
      { name: "Preeti from Noida", msg: "scheduled a site supervision consult" }
    ];
    
    function triggerNotification() {
      const idx = Math.floor(Math.random() * notifications.length);
      document.getElementById('proof-name').textContent = notifications[idx].name;
      document.getElementById('proof-msg').textContent = notifications[idx].msg;
      
      toastContainer.classList.add('show');
      setTimeout(() => {
        toastContainer.classList.remove('show');
      }, 5000);
    }
    
    setTimeout(triggerNotification, 4000);
    setInterval(triggerNotification, 20000);
  }
  
  // 4. Custom Scripts Injection
  const customScript = localStorage.getItem('prakhar_custom_script');
  if (customScript) {
    const div = document.createElement('div');
    div.innerHTML = customScript;
    div.querySelectorAll('script').forEach(s => {
      const newScript = document.createElement('script');
      if (s.src) newScript.src = s.src;
      else newScript.textContent = s.textContent;
      document.head.appendChild(newScript);
    });
  }
});
