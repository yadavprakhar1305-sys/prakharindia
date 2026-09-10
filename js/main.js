// ══════════════════════════════════════════════════════════════════════
// PRAKHAR INDIA — MODERN INTERACTION & PAN-INDIA ROUTING SCRIPT
// ══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const header = document.querySelector('.header');
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
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

  // 2. Sticky Header Elevation
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // 3. Pan-India Regional Filter Tabs & Search
  window.filterRegion = function(region, btn) {
    const tabs = document.querySelectorAll('.region-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.state-card');
    cards.forEach(card => {
      const cardRegion = card.getAttribute('data-region') || '';
      if (region === 'all' || cardRegion === region) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  window.searchLocations = function(query) {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.state-card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 4. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer && answer.classList.contains('open');
      faqQuestions.forEach(other => {
        if (other.nextElementSibling) other.nextElementSibling.classList.remove('open');
        other.classList.remove('open');
      });
      if (!isOpen && answer) {
        answer.classList.add('open');
        q.classList.add('open');
      }
    });
  });

  // 5. Social Proof Notification Ticker
  const notifications = [
    { name: "Adani Infra, Gujarat", msg: "booked 80 skilled industrial welders" },
    { name: "Supertech Developers, Noida", msg: "deployed 50 shuttering carpenters" },
    { name: "DLF Project Site, Gurugram", msg: "hired 35 certified electricians" },
    { name: "Shree Cement, Rajasthan", msg: "contracted 120 loading & plant helpers" },
    { name: "Tata Projects, Lucknow", msg: "requested full civil turnkey construction quote" },
    { name: "MIDC Industrial Hub, Pune", msg: "booked 40 machine operators" },
    { name: "Patna Flyover Project, Bihar", msg: "onboarded 60 bar benders & steel fixers" },
    { name: "Mirzapur City Residential Villa", msg: "booked 6 Mason Mistris for foundation" }
  ];

  const toastContainer = document.createElement('div');
  toastContainer.className = 'proof-toast';
  toastContainer.style.cssText = `
    position: fixed; bottom: 24px; left: 24px;
    background: #0f172a; color: #fff; border-left: 4px solid #f97316;
    padding: 14px 18px; border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    display: flex; align-items: center; gap: 12px;
    transform: translateY(140%); opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 99999; max-width: 340px; font-family: 'Outfit', sans-serif;
    border: 1px solid rgba(255,255,255,0.1);
  `;
  toastContainer.innerHTML = `
    <div style="width:38px;height:38px;background:rgba(249,115,22,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">⚡</div>
    <div style="font-size:0.83rem;line-height:1.4;">
      <strong id="proof-name" style="color:#f8fafc;display:block;">Ramesh from Noida</strong>
      <span id="proof-msg" style="color:#94a3b8;">just booked 50 construction workers</span>
    </div>
  `;
  document.body.appendChild(toastContainer);

  function triggerNotification() {
    const idx = Math.floor(Math.random() * notifications.length);
    const nameEl = document.getElementById('proof-name');
    const msgEl = document.getElementById('proof-msg');
    if (nameEl && msgEl) {
      nameEl.textContent = notifications[idx].name;
      msgEl.textContent = notifications[idx].msg;
      toastContainer.style.transform = 'translateY(0)';
      toastContainer.style.opacity = '1';
      setTimeout(() => {
        toastContainer.style.transform = 'translateY(140%)';
        toastContainer.style.opacity = '0';
      }, 5500);
    }
  }

  setTimeout(triggerNotification, 3500);
  setInterval(triggerNotification, 22000);

  // 6. Direct WhatsApp Link & Native Call Handler
  document.addEventListener('click', function (e) {
    const waBtn = e.target.closest('.whatsapp-float, a[href*="whatsapp.com"], a[href*="wa.me"]');
    const callBtn = e.target.closest('.call-float, a[href^="tel:"]');
    
    if (waBtn) {
      e.preventDefault();
      const msg = encodeURIComponent("Hello Prakhar India! I am interested in your Pan-India Construction & Manpower Services. Please share rate cards and availability.");
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
      if (isIOS) {
        window.location.href = `whatsapp://send?phone=919044499111&text=${msg}`;
        setTimeout(() => {
          window.location.href = `https://api.whatsapp.com/send?phone=919044499111&text=${msg}`;
        }, 600);
      } else {
        window.open(`https://api.whatsapp.com/send?phone=919044499111&text=${msg}`, '_blank');
      }
    }
    
    if (callBtn) {
      e.preventDefault();
      window.location.href = 'tel:9044499111';
    }
  });
});
