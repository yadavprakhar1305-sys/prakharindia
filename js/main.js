// ══════════════════════════════════════════════════════════════════════
// PRAKHAR INDIA — MODERN INTERACTION & MOBILE OPTIMIZATION SCRIPT
// ══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ensure Mobile Backdrop exists
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    backdrop.id = 'navBackdrop';
    document.body.appendChild(backdrop);
  }

  // 2. Auto-inject Hamburger Menu button if missing in header
  const header = document.querySelector('.header, #siteHeader');
  let menuBtn = document.querySelector('.menu-btn, #menuBtn, .mobile-toggle');
  
  if (!menuBtn && header) {
    const headerWrap = header.querySelector('.wrap') || header;
    const headerCta = header.querySelector('.header-cta') || headerWrap;
    menuBtn = document.createElement('button');
    menuBtn.className = 'menu-btn';
    menuBtn.id = 'menuBtn';
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    headerCta.appendChild(menuBtn);
  }

  // Auto-inject quick phone button in header if not present
  if (header && !header.querySelector('.header-phone-quick')) {
    const headerCta = header.querySelector('.header-cta');
    if (headerCta) {
      const qPhone = document.createElement('a');
      qPhone.href = 'tel:9044499111';
      qPhone.className = 'header-phone-quick';
      qPhone.setAttribute('aria-label', 'Call +91 90444 99111');
      qPhone.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
      if (menuBtn && menuBtn.parentNode === headerCta) {
        headerCta.insertBefore(qPhone, menuBtn);
      } else {
        headerCta.appendChild(qPhone);
      }
    }
  }

  // 3. Universal Mobile Menu Open/Close Logic
  const toggleBtns = document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn');
  const navEls = document.querySelectorAll('.nav, #mainNav');

  function closeMenu() {
    toggleBtns.forEach(b => b.classList.remove('open'));
    navEls.forEach(n => n.classList.remove('open'));
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    toggleBtns.forEach(b => b.classList.add('open'));
    navEls.forEach(n => n.classList.add('open'));
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('nav-open');
  }

  toggleBtns.forEach(toggle => {
    if (toggle.dataset.menuBound) return;
    toggle.dataset.menuBound = 'true';
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isOpen = toggle.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    const isMenuClick = Array.from(toggleBtns).some(b => b.contains(e.target)) || Array.from(navEls).some(n => n.contains(e.target));
    if (!isMenuClick) {
      closeMenu();
    }
  });

  navEls.forEach(nav => {
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Add luxury Drawer Footer inside mobile nav if not present
    if (!nav.querySelector('.nav-drawer-footer')) {
      const drawerFooter = document.createElement('div');
      drawerFooter.className = 'nav-drawer-footer';
      drawerFooter.innerHTML = `
        <a href="tel:9044499111" class="nav-drawer-btn nav-drawer-call">
          <span>📞</span> Call +91 90444 99111
        </a>
        <a href="https://wa.me/919044499111?text=Hello%20Prakhar%20India%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener" class="nav-drawer-btn nav-drawer-wa">
          <span>💬</span> Chat on WhatsApp
        </a>
        <div style="text-align:center; font-size:0.75rem; color:#8f897f; margin-top:8px;">
          ✓ RERA Approved · 10-Yr Structural Warranty · Estd. 2014
        </div>
      `;
      nav.appendChild(drawerFooter);
    }
  });

  // 4. Sticky Header Elevation
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // 5. Native Mobile App-Style Bottom Sticky Action Bar
  if (!document.querySelector('.mobile-bottom-bar, #mobileBottomBar')) {
    const bottomBar = document.createElement('nav');
    bottomBar.className = 'mobile-bottom-bar';
    bottomBar.id = 'mobileBottomBar';
    bottomBar.setAttribute('aria-label', 'Mobile quick contact and quote actions');

    // Determine smart target for the 3rd button
    let thirdHref = '#estimator';
    let thirdLabel = 'लागत कैलकुलेटर';
    let thirdIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/><line x1="8" y1="14" x2="8.01" y2="14"/><line x1="12" y1="14" x2="12.01" y2="14"/><line x1="16" y1="14" x2="16.01" y2="14"/><line x1="8" y1="18" x2="8.01" y2="18"/><line x1="12" y1="18" x2="16" y2="18"/></svg>`;

    if (!document.getElementById('estimator')) {
      if (document.getElementById('rental-inquiry')) {
        thirdHref = '#rental-inquiry';
        thirdLabel = 'फ्लैट इन्क्वायरी';
        thirdIcon = `🏢`;
      } else if (document.getElementById('book-visit')) {
        thirdHref = '#book-visit';
        thirdLabel = 'प्लॉट विजिट';
        thirdIcon = `📍`;
      } else if (document.getElementById('enquiry') || document.getElementById('enquiryForm')) {
        thirdHref = document.getElementById('enquiry') ? '#enquiry' : '#enquiryForm';
        thirdLabel = 'साइट विजिट';
        thirdIcon = `🗓️`;
      } else {
        thirdHref = 'https://wa.me/919044499111?text=Hello%20Prakhar%20India%2C%20I%20am%20interested%20in%20your%20services';
        thirdLabel = 'इन्क्वायरी भेजें';
        thirdIcon = `✉️`;
      }
    }

    bottomBar.innerHTML = `
      <a href="tel:9044499111" class="mob-bar-btn mob-bar-call" id="mobBarCall" aria-label="Call +91 90444 99111">
        <span class="mob-bar-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>
        </span>
        <span>कॉल करें</span>
      </a>
      <a href="https://wa.me/919044499111?text=Hello%20Prakhar%20India%2C%20I%20am%20interested%20in%20real%20estate%20and%20construction%20services" target="_blank" rel="noopener" class="mob-bar-btn mob-bar-wa" id="mobBarWa" aria-label="Chat on WhatsApp">
        <span class="mob-bar-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3z"/></svg>
        </span>
        <span>व्हाट्सएप</span>
      </a>
      <a href="${thirdHref}" class="mob-bar-btn mob-bar-calc" id="mobBarCalc" aria-label="${thirdLabel}">
        <span class="mob-bar-icon">${thirdIcon}</span>
        <span>${thirdLabel}</span>
      </a>
    `;
    document.body.appendChild(bottomBar);

    // Smooth scroll handler for anchor links
    bottomBar.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 6. Regional Filter Tabs & Search
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

  // 7. FAQ Accordion Logic
  const faqQuestions = document.querySelectorAll('.faq-q, .faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item') || q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // 8. Social Proof Notification Ticker (Safe for Mobile)
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
    position: fixed; bottom: 82px; left: 16px;
    background: rgba(15, 23, 42, 0.96); backdrop-filter: blur(12px);
    color: #fff; border-left: 4px solid #c9a96e;
    padding: 12px 16px; border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    display: flex; align-items: center; gap: 12px;
    transform: translateY(140%); opacity: 0;
    transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 9999; max-width: 330px; font-family: system-ui, sans-serif;
    border: 1px solid rgba(255,255,255,0.12);
  `;
  toastContainer.innerHTML = `
    <div style="width:36px;height:36px;background:rgba(201,169,110,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;">🏡</div>
    <div style="font-size:0.82rem;line-height:1.35;flex:1;">
      <strong id="proof-name" style="color:#f8fafc;display:block;">Srivastava Family, Varanasi</strong>
      <span id="proof-msg" style="color:#94a3b8;">booked turnkey villa construction proposal</span>
    </div>
    <button type="button" id="proofClose" aria-label="Dismiss notification" style="background:none;border:none;color:#94a3b8;font-size:1.1rem;cursor:pointer;padding:0 4px;margin-left:4px;line-height:1;">&times;</button>
  `;
  document.body.appendChild(toastContainer);

  const proofClose = document.getElementById('proofClose');
  if (proofClose) {
    proofClose.addEventListener('click', (e) => {
      e.stopPropagation();
      toastContainer.style.transform = 'translateY(140%)';
      toastContainer.style.opacity = '0';
    });
  }

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
      }, 4200);
    }
  }

  setTimeout(triggerNotification, 4000);
  setInterval(triggerNotification, 26000);

  // 9. Floating Action Buttons (for Desktop viewports)
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

  // 10. Reveal failsafe — content must never stay invisible.
  // Any .reveal element still hidden gets shown, even if another script fails.
  const revealAll = () => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  const revealInView = () => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      // Reveal anything at or above the fold. Elements already scrolled past
      // count too, so a fast jump can never skip a block permanently.
      if (r.top < innerHeight + 100) el.classList.add('in');
    });
  };
  revealInView();
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView, { passive: true });
  window.addEventListener('pageshow', revealInView);
  document.addEventListener('focusin', e => {
    const card = e.target.closest && e.target.closest('.reveal');
    if (card) card.classList.add('in');
  });
  // If no element ever revealed, the animation script is broken: show everything.
  setTimeout(() => {
    if (!document.querySelector('.reveal.in')) revealAll();
  }, 5000);
  // Absolute last resort for slow/blocked assets.
  window.addEventListener('load', () => setTimeout(revealInView, 300));
});
