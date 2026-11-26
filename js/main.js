// ══════════════════════════════════════════════════════════════════════
// PRAKHAR INDIA — MODERN INTERACTION & MOBILE OPTIMIZATION SCRIPT
// ══════════════════════════════════════════════════════════════════════

function initPrakharMain() {
  if (window.__prakharNavReady) return;
  window.__prakharNavReady = true;
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
    menuBtn.type = 'button';
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    headerCta.appendChild(menuBtn);
  }

  // Auto-inject quick phone button in header if not present
  if (header && !header.querySelector('.header-phone-quick')) {
    const headerCta = header.querySelector('.header-cta');
    if (headerCta) {
      const qPhone = document.createElement('a');
      qPhone.href = 'tel:+919044499111';
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
  const toggleBtns = document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn, [data-toggle-menu], .mob-bar-calc[href*="javascript"]');
  const navEls = document.querySelectorAll('.nav, #mainNav');

  function closeMenu() {
    document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn').forEach(b => b.classList.remove('open'));
    navEls.forEach(n => n.classList.remove('open'));
    if (backdrop) backdrop.classList.remove('open');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn').forEach(b => b.classList.add('open'));
    navEls.forEach(n => n.classList.add('open'));
    if (backdrop) backdrop.classList.add('open');
    document.body.classList.add('nav-open');
  }

  // Expose unified mobile nav toggle so bottom bar / hamburger buttons work reliably
  window.toggleMobileNav = function(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const refNav = document.getElementById('mainNav') || document.querySelector('.nav');
    const isOpen = refNav && refNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  document.querySelectorAll('.menu-btn, .mobile-toggle, #menuBtn').forEach(toggle => {
    if (toggle.dataset.menuBound === 'main') return;
    toggle.dataset.menuBound = 'main';
    toggle.addEventListener('click', window.toggleMobileNav);
  });

  document.querySelectorAll('[data-toggle-menu]').forEach(btn => {
    if (btn.dataset.menuBound === 'main') return;
    btn.dataset.menuBound = 'main';
    btn.addEventListener('click', window.toggleMobileNav);
  });

  if (backdrop && !backdrop.dataset.menuBound) {
    backdrop.dataset.menuBound = 'main';
    backdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest && (
      e.target.closest('.menu-btn, .mobile-toggle, #menuBtn, [data-toggle-menu], .mob-bar-calc, .nav, #mainNav')
    )) {
      return;
    }
    closeMenu();
  });

  navEls.forEach(nav => {
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('tel:') || href.indexOf('wa.me') !== -1) {
          setTimeout(closeMenu, 180);
        } else {
          closeMenu();
        }
      });
    });

    // Add luxury Drawer Footer inside mobile nav if not present
    if (!nav.querySelector('.nav-drawer-footer')) {
      const drawerFooter = document.createElement('div');
      drawerFooter.className = 'nav-drawer-footer';
      drawerFooter.innerHTML = `
        <a href="tel:+919044499111" class="nav-drawer-btn nav-drawer-call">
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
      <a href="tel:+919044499111" class="mob-bar-btn mob-bar-call" id="mobBarCall" aria-label="Call +91 90444 99111">
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

  // 8. Social Proof Ticker removed to comply with E-E-A-T and Core Web Vitals stability.

  // 9. Floating Action Buttons (for Desktop viewports)
  if (!document.querySelector('.fab-call') && !document.querySelector('.call-float')) {
    const fabCall = document.createElement('a');
    fabCall.href = 'tel:+919044499111';
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

  // 9b. Interactive Non-Blocking Call Popup (auto-opens on website load + when clicking any tel: link)
  function showCallHelper(telHref, isAuto) {
    const numRaw = (telHref || '').replace(/^tel:/i, '').trim() || '+919044499111';
    const numDisplay = numRaw === '+919125566222' ? '+91 91255 66222' : '+91 90444 99111';
    const dialHref = 'tel:' + (numRaw.startsWith('+') ? numRaw : '+91' + numRaw.replace(/\D/g, '').slice(-10));
    let box = document.getElementById('prakharCallToast');
    if (box) box.remove();
    box = document.createElement('div');
    box.id = 'prakharCallToast';
    box.className = 'prakhar-call-toast';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Prakhar India Call Helpline');
    box.innerHTML =
      '<div class="prakhar-call-toast-head">' +
        '<div><small style="display:block;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;color:#d9b978;font-weight:700;">Speak With Our Site Engineer</small>' +
        '<strong style="font-size:1.08rem;">' + numDisplay + '</strong></div>' +
        '<button type="button" class="prakhar-call-toast-close" aria-label="Close call popup">&times;</button>' +
      '</div>' +
      '<div class="prakhar-call-toast-actions">' +
        '<a href="' + dialHref + '" class="prakhar-call-toast-btn primary" data-skip-toast="1">📞 Call Now</a>' +
        '<button type="button" class="prakhar-call-toast-btn" id="prakharCopyNumBtn">Copy Number</button>' +
        '<a href="https://wa.me/919044499111?text=Namaste%20Prakhar%20India%2C%20please%20call%20me%20back." target="_blank" rel="noopener" class="prakhar-call-toast-btn wa">💬 WhatsApp</a>' +
      '</div>';
    document.body.appendChild(box);
    box.querySelector('.prakhar-call-toast-close').addEventListener('click', () => {
      box.remove();
      try { sessionStorage.setItem('prakhar_call_popup_closed', '1'); } catch (_) {}
    });
    const copyBtn = document.getElementById('prakharCopyNumBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(numDisplay).then(() => { copyBtn.textContent = '✓ Copied!'; }).catch(() => { copyBtn.textContent = numDisplay; });
        } else {
          copyBtn.textContent = numDisplay;
        }
      });
    }
    if (!isAuto) {
      setTimeout(() => { if (box && box.parentNode) box.remove(); }, 18000);
    }
  }

  document.addEventListener('click', (e) => {
    const telLink = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!telLink || telLink.dataset.skipToast) return;
    showCallHelper(telLink.getAttribute('href'), false);
  });

  // Auto-open Call popup when website loads (unless dismissed in this session or on admin pages)
  const pathLow = (window.location.pathname || '').toLowerCase();
  const isUtilityPage = pathLow.includes('/admin') || pathLow.includes('/login') || pathLow.includes('/signup');
  let popupClosed = false;
  try { popupClosed = sessionStorage.getItem('prakhar_call_popup_closed') === '1'; } catch (_) {}
  if (!isUtilityPage && !popupClosed) {
    setTimeout(() => {
      if (!document.getElementById('prakharCallToast')) {
        showCallHelper('+919044499111', true);
      }
    }, 1200);
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
    revealAll();
  }, 1800);
  // Absolute last resort for slow/blocked assets.
  window.addEventListener('load', () => setTimeout(revealInView, 300));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPrakharMain);
} else {
  initPrakharMain();
}
