// ======================================================================
//  Prakhar India — Sovereign MNC Real Estate & Infrastructure UI Engine
//  Handles: 4 MNC Editions, EN/Hinglish i18n, WAI-ARIA Service Tabs,
//  Cost Estimator (mirzapur-3d synced), Portfolio Filter, <dialog> 3D
//  Inspector Modal & Direct WhatsApp Advisory Dispatch
// ======================================================================
(function () {
  'use strict';

  const STORAGE_THEME = 'prakhar_mnc_tone';
  const STORAGE_LANG = 'prakhar_lang';
  const VALID_THEMES = ['sovereign', 'corporate', 'biophilic', 'obsidian'];
  const THEME_META = {
    sovereign: { label: 'Emaar / DLF Sovereign Limestone', color: '#111317' },
    corporate: { label: 'L&T / CBRE Institutional Navy', color: '#09182c' },
    biophilic: { label: 'Tata / Mahindra Cedar & Stone', color: '#0d261d' },
    obsidian:  { label: 'Sobha / Sotheby’s Obsidian Atelier', color: '#08090d' }
  };

  const I18N_COPY = {
    en: {
      brandSub: 'Real Estate & Turnkey Construction · UP',
      navServices: 'Services',
      navCalc: 'Estimator',
      navPlots: 'Mirzapur 3D',
      navHow: 'Methodology',
      navVisit: 'Book Site Visit',
      heroBadge: 'RERA Approved · Lucknow · Varanasi · Mirzapur · Ayodhya',
      heroTitle: 'Land Ownership, Custom Residences & Institutional Builds.',
      heroLead: 'Verified freehold plots, RERA residences, and fixed-rate turnkey construction across Uttar Pradesh with 100% stage-wise billing transparency and a 10-year structural warranty.',
      g1Title: 'Fixed-Rate Contracts',
      g2Title: 'Branded BOQ Specs',
      g3Title: '10-Yr Structural Warranty',
      ctaCalc: 'Estimate Project Cost',
      ctaPlots: 'Explore Mirzapur 3D Plots',
      sec1Title: 'Integrated Real Estate & EPC Divisions',
      sec1Sub: 'Transparent unit specifications, clear land titles, and dedicated engineering supervision across residential, plotted, and turnkey portfolios.',
      tab1: 'Turnkey Home Construction',
      tab2: 'RERA Approved Plots',
      tab3: 'Ready Villas & Flats',
      tab4: 'Manpower & Labour Supply',
      calcTitle: 'Calculate Construction Budget',
      calcSub: 'Set total plot footprint, number of floors, and finishing specification tier for an institutional BOQ estimate.',
      calcCta: 'Request Detailed Engineering BOQ',
      calcNote: 'Includes foundation, RCC frame, brickwork, TATA/JSW steel, ACC/UltraTech cement, plumbing, and finishing.',
      propTitle: 'Featured Freehold Plots, Villas & Commercial Assets',
      stepTitle: 'Four-Phase Turnkey Delivery Protocol',
      s1T: '1. Soil Audit & 3D Elevation',
      s1D: 'Geo-technical testing, architectural floor plans, Vaastu orientation, and structural beam layouts approved before mobilization.',
      s2T: '2. Fixed BOQ Agreement',
      s2D: 'Locked per-sq.ft rate mentioning steel, cement, tile, and sanitary brands on stamped legal agreement — zero escalation surprise.',
      s3T: '3. Supervised Stage Casting',
      s3D: 'Dedicated civil engineer site inspection with digital lab cube testing and stage-linked milestone billing.',
      s4T: '4. Commissioning & 10-Yr Warranty',
      s4D: 'Leakage pressure check, earthing verification, complete key handover, and 10-year structural coverage certificate.',
      faqTitle: 'Governance, Contracts & Buyer Assurance',
      mzpTitle: 'Mirzapur 3D Masterplan & Verified Plots',
      mzpSub: 'Drag to orbit our interactive Mirzapur land corridor model. Select any 3D enclave block to inspect road width, registry readiness, sq.ft rates, or calculate construction cost.',
      formHeading: 'Schedule a Private Advisory or Site Visit',
      formLead: 'Speak directly with Prakhar India engineering and plot advisory team in Lucknow, Varanasi, Prayagraj, Mirzapur, or Ayodhya.',
      mobCall: 'Call Desk',
      mobWa: 'WhatsApp',
      mobCalc: 'Estimator'
    },
    hinglish: {
      brandSub: 'Real Estate & Turnkey Construction · UP',
      navServices: 'Services',
      navCalc: 'Kharcha Calculator',
      navPlots: 'Mirzapur 3D Plots',
      navHow: 'Kaise Kaam Hota Hai',
      navVisit: 'Site Visit Book Karein',
      heroBadge: 'RERA Approved · Lucknow · Varanasi · Mirzapur · Ayodhya',
      heroTitle: 'Sahi Zameen, Mazboot Ghar Aur Clear Title — Ek Hi Jagah.',
      heroLead: 'UP ke 7+ shahron mein verified freehold plots, RERA flats, aur fixed-rate turnkey ghar construction — 100% branded material aur 10-saal ki structural warranty ke saath.',
      g1Title: 'Fixed Rate Contract',
      g2Title: 'Branded BOQ Material',
      g3Title: '10-Saal Warranty',
      ctaCalc: 'Ghar Banwane Ka Kharcha Dekhein',
      ctaPlots: 'Mirzapur 3D Plots Dekhein',
      sec1Title: 'Real Estate Aur Turnkey Nirman Vibhag',
      sec1Sub: 'Har budget aur family need ke hisab se transparent packages — Bina kisi hidden charge ke.',
      tab1: 'Turnkey Ghar Banwayein',
      tab2: 'RERA Approved Plots',
      tab3: 'Ready Villas & Flats',
      tab4: 'Manpower & Labour Thekedar',
      calcTitle: 'Ghar Construction Budget Calculator',
      calcSub: 'Plot size, floor count aur finishing tier chunein — turant engineering estimate dekhein.',
      calcCta: 'Engineer Se Exact Quotation Mangwayein',
      calcNote: 'Is estimate mein foundation, RCC structure, brickwork, TATA/JSW steel, ACC/UltraTech cement aur finishing shamil hai.',
      propTitle: 'UP Ke Chune Hue Plots, Villas Aur Commercial Assets',
      stepTitle: 'Hamare Kaam Karne Ka 4-Step Tareeka',
      s1T: '1. Soil Audit & 3D Naksha',
      s1D: 'Site visit, Vaastu orientation, 3D elevation aur structural layout — shuruat se pehle sab approve.',
      s2T: '2. Fixed BOQ Agreement',
      s2D: 'Sariya, cement aur sanitary brands likhit rate ke saath stamp agreement par — beech mein koi rate hike nahi.',
      s3T: '3. Engineer Supervision',
      s3D: 'Har stage par civil engineer checking, lab cube test aur stage-wise milestone billing.',
      s4T: '4. Chaabi Handover & Warranty',
      s4D: 'Leakage aur earthing test ke baad ghar ki chaabi handover + 10-saal ki structural warranty.',
      faqTitle: 'Sawaal Jawab — Contracts, Registry & Loan',
      mzpTitle: 'Mirzapur 3D Masterplan & Verified Plots',
      mzpSub: '3D model ko ghumayein aur kisi bhi zone par click karein — turant road width, Dakhil Kharij registry aur sq.ft rate check karein.',
      formHeading: 'Site Visit Ya Private Engineering Advice Book Karein',
      formLead: 'Lucknow, Varanasi, Prayagraj, Mirzapur aur Ayodhya team se seedha baat karein.',
      mobCall: 'कॉल करें',
      mobWa: 'व्हाट्सएप',
      mobCalc: 'खर्चा कैलकुलेटर'
    }
  };

  function getSavedTheme() {
    try {
      const t = localStorage.getItem(STORAGE_THEME);
      return VALID_THEMES.includes(t) ? t : 'sovereign';
    } catch (_) {
      return 'sovereign';
    }
  }

  function getSavedLang() {
    try {
      const l = localStorage.getItem(STORAGE_LANG);
      return l === 'en' ? 'en' : 'hinglish';
    } catch (_) {
      return 'hinglish';
    }
  }

  function applyTheme(tone) {
    const clean = VALID_THEMES.includes(tone) ? tone : 'sovereign';
    document.documentElement.setAttribute('data-site-mnc', clean);
    try { localStorage.setItem(STORAGE_THEME, clean); } catch (_) {}

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme && THEME_META[clean]) {
      metaTheme.setAttribute('content', THEME_META[clean].color);
    }

    document.querySelectorAll('[data-mnc-pick]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-mnc-pick') === clean));
    });

    const summaryEl = document.getElementById('mncSummaryText');
    if (summaryEl && THEME_META[clean]) {
      summaryEl.textContent = THEME_META[clean].label;
    }
  }

  function applyLanguage(lang) {
    const clean = lang === 'en' ? 'en' : 'hinglish';
    document.documentElement.setAttribute('data-lang', clean);
    try { localStorage.setItem(STORAGE_LANG, clean); } catch (_) {}

    const dict = I18N_COPY[clean] || I18N_COPY.hinglish;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === clean));
    });
  }

  // Apply before paint to prevent theme flash
  applyTheme(getSavedTheme());

  function formatINR(num) {
    return '₹' + Math.round(num).toLocaleString('en-IN');
  }

  function initServiceTabs(onSelectRate) {
    const tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"][data-panel]'));
    const panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length || !panels.length) return;

    function activateTab(tab, focusTab) {
      const targetId = tab.getAttribute('data-panel');
      tabs.forEach(function (t) {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach(function (p) {
        p.hidden = p.id !== targetId;
      });
      if (focusTab) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activateTab(tab, false);
      });
      tab.addEventListener('keydown', function (e) {
        let next = index;
        if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault();
        activateTab(tabs[next], true);
      });
    });

    document.querySelectorAll('[data-rate-pick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const pickedRate = Number(btn.getAttribute('data-rate-pick'));
        if (pickedRate && typeof onSelectRate === 'function') {
          onSelectRate(pickedRate);
        }
        const estEl = document.getElementById('estimator');
        if (estEl) estEl.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function initEstimator() {
    const areaInput = document.getElementById('estArea');
    const floorsSelect = document.getElementById('estFloors');
    const tierBtns = Array.prototype.slice.call(document.querySelectorAll('[data-calc-rate]'));
    if (!areaInput || !floorsSelect) return null;

    let currentRate = 1850;
    const areaOut = document.getElementById('estAreaOut');
    const floorsOut = document.getElementById('estFloorsOut');
    const totalOut = document.getElementById('estTotal');
    const rateLabel = document.getElementById('calcRateLabel');
    const outStruct = document.getElementById('outStruct');
    const outMason = document.getElementById('outMason');
    const outFinish = document.getElementById('outFinish');
    const outMep = document.getElementById('outMep');

    const FLOOR_NAMES = {
      1: 'Ground Only (1 Floor)',
      2: 'G + 1 (2 Floors)',
      3: 'G + 2 (3 Floors)',
      4: 'G + 3 (4 Floors)'
    };

    function recalc() {
      const area = Math.max(600, Number(areaInput.value) || 1600);
      const floors = Math.max(1, Number(floorsSelect.value) || 2);
      const totalSqft = area * floors;
      const total = totalSqft * currentRate;

      if (areaOut) areaOut.textContent = area.toLocaleString('en-IN') + ' sq.ft/floor';
      if (floorsOut) floorsOut.textContent = FLOOR_NAMES[floors] || (floors + ' Floors');
      if (rateLabel) rateLabel.textContent = formatINR(currentRate) + ' / sq.ft · ' + totalSqft.toLocaleString('en-IN') + ' built-up sq.ft';
      if (totalOut) totalOut.textContent = formatINR(total);
      if (outStruct) outStruct.textContent = formatINR(total * 0.35);
      if (outMason) outMason.textContent = formatINR(total * 0.30);
      if (outFinish) outFinish.textContent = formatINR(total * 0.23);
      if (outMep) outMep.textContent = formatINR(total * 0.12);
    }

    function setRate(rate) {
      currentRate = rate || 1850;
      tierBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-calc-rate')) === currentRate));
      });
      recalc();
    }

    areaInput.addEventListener('input', recalc);
    floorsSelect.addEventListener('change', recalc);
    tierBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        setRate(Number(b.getAttribute('data-calc-rate')));
      });
    });

    recalc();
    return setRate;
  }

  function initPortfolioFilter() {
    const buttons = Array.prototype.slice.call(document.querySelectorAll('[data-prop-filter]'));
    const cards = Array.prototype.slice.call(document.querySelectorAll('.prop-card-mnc[data-type]'));
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.getAttribute('data-prop-filter') || 'all';
        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        cards.forEach(function (card) {
          const type = card.getAttribute('data-type');
          card.hidden = !(filter === 'all' || type === filter);
        });
      });
    });
  }

  function initAdvisoryForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameEl = document.getElementById('eName');
      const phoneEl = document.getElementById('ePhone');
      const interestEl = document.getElementById('eInterest');
      const cityEl = document.getElementById('eCity');
      const msgEl = document.getElementById('eMsg');

      const name = (nameEl && nameEl.value || '').trim();
      let digits = (phoneEl && phoneEl.value || '').replace(/\D/g, '');
      if (digits.length === 12 && digits.indexOf('91') === 0) digits = digits.slice(2);
      if (digits.length === 11 && digits.indexOf('0') === 0) digits = digits.slice(1);

      if (name.length < 2) {
        if (feedback) {
          feedback.textContent = 'Please enter your full name so our senior engineer can address your enquiry.';
          feedback.style.color = '#b91c1c';
        }
        if (nameEl) nameEl.focus();
        return;
      }

      if (!/^[6-9]\d{9}$/.test(digits)) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid 10-digit Indian mobile number.';
          feedback.style.color = '#b91c1c';
        }
        if (phoneEl) phoneEl.focus();
        return;
      }

      const interest = interestEl ? interestEl.value : 'General Real Estate / Turnkey Enquiry';
      const city = cityEl ? cityEl.value : 'Uttar Pradesh';
      const notes = (msgEl && msgEl.value || '').trim();

      const waText =
        'Namaste Prakhar India Advisory Desk,%0A' +
        'Name: ' + encodeURIComponent(name) + '%0A' +
        'Mobile: ' + encodeURIComponent('+91 ' + digits) + '%0A' +
        'Division: ' + encodeURIComponent(interest) + '%0A' +
        'City: ' + encodeURIComponent(city) +
        (notes ? '%0ANotes: ' + encodeURIComponent(notes) : '');

      if (feedback) {
        feedback.textContent = 'Opening verified WhatsApp advisory desk for ' + name + '...';
        feedback.style.color = 'var(--p-accent-ink)';
      }

      window.open('https://wa.me/919044499111?text=' + waText, '_blank', 'noopener');
    });
  }

  function initLegacyAlertForms() {
    document.querySelectorAll('form').forEach(function (form) {
      if (form.id === 'enquiryForm' || form.dataset.waBound === '1') return;
      const inlineHandler = form.getAttribute('onsubmit') || '';
      if (inlineHandler.indexOf('alert(') === -1 && !form.hasAttribute('data-wa-dispatch')) return;

      form.removeAttribute('onsubmit');
      form.dataset.waBound = '1';

      let statusEl = form.querySelector('.form-wa-status');
      if (!statusEl) {
        statusEl = document.createElement('p');
        statusEl.className = 'form-wa-status';
        statusEl.setAttribute('role', 'status');
        statusEl.setAttribute('aria-live', 'polite');
        statusEl.style.cssText = 'font-size:0.84rem;font-weight:600;margin:8px 0 0;min-height:1.2em;color:var(--gold,#d9b978);';
        form.appendChild(statusEl);
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
        const summaryParts = [];
        let phoneDigits = '';

        fields.forEach(function (el) {
          const val = (el.value || '').trim();
          if (!val) return;
          const label = el.getAttribute('placeholder') || el.getAttribute('name') || el.type || 'Detail';
          if (el.type === 'tel') {
            let d = val.replace(/\D/g, '');
            if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
            if (d.length === 11 && d.indexOf('0') === 0) d = d.slice(1);
            phoneDigits = d;
          }
          summaryParts.push(label.replace(/\*+/g, '').trim() + ': ' + val);
        });

        if (phoneDigits && !/^[6-9]\d{9}$/.test(phoneDigits)) {
          statusEl.textContent = 'Please enter a valid 10-digit Indian mobile number.';
          statusEl.style.color = '#f87171';
          return;
        }

        statusEl.textContent = 'Redirecting your enquiry directly to Prakhar India WhatsApp Advisory Desk (+91 90444 99111)...';
        statusEl.style.color = '#4ade80';

        const pageTitle = document.title.split('|')[0].trim();
        const waMsg =
          'Namaste Prakhar India,%0A' +
          'Page: ' + encodeURIComponent(pageTitle) + '%0A' +
          summaryParts.map(encodeURIComponent).join('%0A');

        window.open('https://wa.me/919044499111?text=' + waMsg, '_blank', 'noopener');
      });
    });
  }

  function init3dTourDialog() {
    const dialog = document.getElementById('tour3dDialog');
    if (!dialog) return;

    function openDialog() {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) dialog.showModal();
      } else {
        dialog.setAttribute('open', 'open');
      }
      requestAnimationFrame(function () {
        if (typeof window.resize3dInspector === 'function') window.resize3dInspector();
      });
      setTimeout(function () {
        if (typeof window.resize3dInspector === 'function') window.resize3dInspector();
      }, 280);
    }

    function closeDialog() {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    }

    document.querySelectorAll('[data-open-3d-tour]').forEach(function (trigger) {
      trigger.addEventListener('click', openDialog);
    });
    document.querySelectorAll('[data-close-3d-tour]').forEach(function (closer) {
      closer.addEventListener('click', closeDialog);
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog();
    });

    const motionBtn = document.getElementById('tour3dMotionToggle');
    if (motionBtn) {
      motionBtn.addEventListener('click', function () {
        if (typeof window.toggleInspectorAutoRotate === 'function') {
          const active = window.toggleInspectorAutoRotate();
          motionBtn.textContent = active ? 'Pause Spin' : 'Resume Spin';
          motionBtn.setAttribute('aria-pressed', String(!active));
        }
      });
    }
  }

  function initRevealObserver() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '80px 0px', threshold: 0.04 });
    items.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getSavedTheme());
    applyLanguage(getSavedLang());

    document.querySelectorAll('[data-mnc-pick]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.getAttribute('data-mnc-pick'));
      });
    });

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang-btn'));
      });
    });

    const setRateFn = initEstimator();
    initServiceTabs(setRateFn);
    initPortfolioFilter();
    initAdvisoryForm();
    initLegacyAlertForms();
    init3dTourDialog();
    initRevealObserver();
  });
})();
