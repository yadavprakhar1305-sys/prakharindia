// ══════════════════════════════════════════════════════════════════════
// PRAKHAR INDIA — MODERN INTERACTION & MOBILE OPTIMIZATION SCRIPT
// ══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Universal Mobile Menu Toggle
  const toggleBtns = document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn');
  const navEls = document.querySelectorAll('.nav, #mainNav');

  toggleBtns.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggle.classList.toggle('open');
      navEls.forEach(nav => nav.classList.toggle('open'));
    });
  });

  document.addEventListener('click', (e) => {
    const isMenuClick = Array.from(toggleBtns).some(b => b.contains(e.target)) || Array.from(navEls).some(n => n.contains(e.target));
    if (!isMenuClick) {
      toggleBtns.forEach(b => b.classList.remove('open'));
      navEls.forEach(n => n.classList.remove('open'));
    }
  });

  navEls.forEach(nav => {
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggleBtns.forEach(b => b.classList.remove('open'));
        navEls.forEach(n => n.classList.remove('open'));
      });
    });
  });

  // 2. Sticky Header Elevation
  const header = document.querySelector('.header, #siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
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
  const faqQuestions = document.querySelectorAll('.faq-q, .faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item') || q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // 5. Social Proof Notification Ticker
  const notifications = [
    { name: "Srivastava Family, Varanasi", msg: "booked turnkey villa construction proposal" },
    { name: "Apex Commercial, Prayagraj", msg: "enquired about Civil Lines retail space" },
    { name: "Verma Residency, Lucknow", msg: "booked 3BHK apartment site visit" },
    { name: "Vindhya Greens, Mirzapur", msg: "reserved 1,800 sq.ft residential plot" },
    { name: "Gupta & Sons, Prayagraj", msg: "contracted turnkey commercial building" },
    { name: "Sharma Villa, Sarnath", msg: "approved 3D architectural floor plans" }
  ];

  const toastContainer = document.createElement('div');
  toastContainer.className = 'proof-toast';
  toastContainer.style.cssText = `
    position: fixed; bottom: 24px; left: 24px;
    background: #0f172a; color: #fff; border-left: 4px solid #c9a96e;
    padding: 14px 18px; border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    display: flex; align-items: center; gap: 12px;
    transform: translateY(140%); opacity: 0;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 99999; max-width: 340px; font-family: system-ui, sans-serif;
    border: 1px solid rgba(255,255,255,0.1);
  `;
  toastContainer.innerHTML = `
    <div style="width:38px;height:38px;background:rgba(201,169,110,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;">🏡</div>
    <div style="font-size:0.83rem;line-height:1.4;">
      <strong id="proof-name" style="color:#f8fafc;display:block;">Srivastava Family, Varanasi</strong>
      <span id="proof-msg" style="color:#94a3b8;">booked turnkey villa construction proposal</span>
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

  setTimeout(triggerNotification, 4000);
  setInterval(triggerNotification, 24000);

  // 6. Dynamic Floating Action Buttons (Call & WhatsApp)
  if (!document.querySelector('.fab-call') && !document.querySelector('.call-float')) {
    const fabCall = document.createElement('a');
    fabCall.href = 'tel:9044499111';
    fabCall.className = 'fab-call';
    fabCall.id = 'fabCall';
    fabCall.title = 'Call Direct Helpline (+91 90444 99111)';
    fabCall.setAttribute('aria-label', 'Call Direct Helpline');
    fabCall.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.25 1.05l-2.2 2.2z"/></svg>`;
    document.body.appendChild(fabCall);
  }

  if (!document.querySelector('.fab-wa') && !document.querySelector('.whatsapp-float')) {
    const fabWa = document.createElement('a');
    fabWa.href = 'https://wa.me/919044499111?text=Hello%20Prakhar%20India%2C%20I%27d%20like%20to%20know%20more%20about%20your%20properties.';
    fabWa.className = 'fab-wa';
    fabWa.id = 'fabWhatsapp';
    fabWa.target = '_blank';
    fabWa.rel = 'noopener';
    fabWa.setAttribute('aria-label', 'Chat on WhatsApp');
    fabWa.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>`;
    document.body.appendChild(fabWa);
  }
});
