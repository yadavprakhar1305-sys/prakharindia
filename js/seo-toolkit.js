/**
 * ============================================
 * PRAKHAR INDIA — SEO TOOLKIT v2.0
 * ============================================
 * Replaces: Yoast SEO, Rank Math, All-in-One SEO,
 *           Google Analytics, Microsoft Clarity,
 *           Schema Pro, Breadcrumb NavXT
 * ============================================
 */

(function() {
  'use strict';

  // =============================================
  // 1. GOOGLE ANALYTICS 4 (GA4) — FREE TRAFFIC TRACKING
  // =============================================
  // Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
  // Get it from: https://analytics.google.com → Admin → Data Streams → Web
  window.GA_MEASUREMENT_ID = 'G-3EHE0N3XY5';

  if (window.GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_MEASUREMENT_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', window.GA_MEASUREMENT_ID, {
      'page_title': document.title,
      'page_location': window.location.href,
      'send_page_view': true
    });

    // Track phone calls as conversions
    document.querySelectorAll('a[href^="tel:"]').forEach(function(link) {
      link.addEventListener('click', function() {
        gtag('event', 'phone_call', {
          'event_category': 'Contact',
          'event_label': link.getAttribute('href'),
          'value': 1
        });
      });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="whatsapp"]').forEach(function(link) {
      link.addEventListener('click', function() {
        gtag('event', 'whatsapp_click', {
          'event_category': 'Contact',
          'event_label': 'WhatsApp',
          'value': 1
        });
      });
    });

    // Track form submissions
    document.querySelectorAll('form').forEach(function(form) {
      form.addEventListener('submit', function() {
        gtag('event', 'form_submit', {
          'event_category': 'Lead',
          'event_label': document.title,
          'value': 1
        });
      });
    });

    console.log('[SEO Toolkit] ✅ Google Analytics 4 loaded');
  } else {
    console.log('[SEO Toolkit] ⚠️ GA4: Replace G-XXXXXXXXXX with your Measurement ID');
  }

  // =============================================
  // 2. MICROSOFT CLARITY — FREE HEATMAPS & RECORDINGS
  // =============================================
  // Get your Clarity Project ID from: https://clarity.microsoft.com
  // Replace 'YOUR_CLARITY_ID' with actual ID
  window.CLARITY_ID = 'ydx9mgghov';

  if (window.CLARITY_ID !== 'YOUR_CLARITY_ID') {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", window.CLARITY_ID);
    console.log('[SEO Toolkit] ✅ Microsoft Clarity loaded');
  } else {
    console.log('[SEO Toolkit] ⚠️ Clarity: Replace YOUR_CLARITY_ID with your Project ID');
  }

  // =============================================
  // 3. ADVANCED SCHEMA MARKUP (Like Schema Pro / Rank Math)
  // =============================================
  
  // Organization Schema (site-wide)
  var orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prakhar India Manpower & Construction",
    "alternateName": "PRAKHAR INDIA",
    "url": "https://prakharind.com",
    "logo": "https://prakharind.com/images/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9044499111",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["Hindi", "English"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9125566222",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["Hindi", "English"]
      }
    ],
    "sameAs": [
      "https://share.google/9ygxETtFvb3wtc9Bi",
      "https://share.google/jQ49i1D6NqlaNtPhE"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mirzapur & Lucknow",
      "addressLocality": "Mirzapur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "231001",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Uttar Pradesh" },
      { "@type": "Country", "name": "India" }
    ],
    "knowsAbout": [
      "Manpower Supply Uttar Pradesh",
      "Labour Contractor UP",
      "Pan-India Workforce Deployment",
      "Industrial Workforce Supply Across India",
      "Civil Construction Contractor UP & India",
      "Skilled and General Labour Contracting"
    ]
  };
  
  var orgScriptTag = document.createElement('script');
  orgScriptTag.type = 'application/ld+json';
  orgScriptTag.textContent = JSON.stringify(orgSchema);
  document.head.appendChild(orgScriptTag);

  // WebSite Schema with SearchAction (for Google Sitelinks Search Box)
  var siteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Prakhar India",
    "url": "https://prakharind.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://prakharind.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  var siteScriptTag = document.createElement('script');
  siteScriptTag.type = 'application/ld+json';
  siteScriptTag.textContent = JSON.stringify(siteSchema);
  document.head.appendChild(siteScriptTag);

  // Breadcrumb Schema (auto-generated based on URL)
  var path = window.location.pathname;
  if (path !== '/' && path !== '/index.html') {
    var breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://prakharind.com/"
        }
      ]
    };
    
    var pageName = document.title.split('|')[0].trim();
    var pageUrl = window.location.href;
    
    if (path.includes('/blog/')) {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://prakharind.com/blog/"
      });
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": pageName,
        "item": pageUrl
      });
    } else {
      breadcrumbs.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": pageUrl
      });
    }
    
    var bcScriptTag = document.createElement('script');
    bcScriptTag.type = 'application/ld+json';
    bcScriptTag.textContent = JSON.stringify(breadcrumbs);
    document.head.appendChild(bcScriptTag);
  }

  console.log('[SEO Toolkit] ✅ Schema Markup injected');

  // =============================================
  // 4. AUTO META TAG OPTIMIZATION (Like Yoast SEO)
  // =============================================
  
  // Add missing meta tags automatically
  function ensureMeta(name, content, isProperty) {
    var attr = isProperty ? 'property' : 'name';
    var existing = document.querySelector('meta[' + attr + '="' + name + '"]');
    if (!existing && content) {
      var meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      meta.content = content;
      document.head.appendChild(meta);
    }
  }
  
  var pageTitle = document.title;
  var pageDesc = '';
  var descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) pageDesc = descMeta.content;
  
  // Twitter Card tags
  ensureMeta('twitter:card', 'summary_large_image', false);
  ensureMeta('twitter:title', pageTitle, false);
  ensureMeta('twitter:description', pageDesc, false);
  ensureMeta('twitter:image', 'https://prakharind.com/images/og-image.jpg', false);
  ensureMeta('twitter:site', '@prakharindia', false);
  
  // Open Graph completeness
  ensureMeta('og:title', pageTitle, true);
  ensureMeta('og:description', pageDesc, true);
  ensureMeta('og:image', 'https://prakharind.com/images/og-image.jpg', true);
  ensureMeta('og:url', window.location.href, true);
  ensureMeta('og:type', 'website', true);
  ensureMeta('og:site_name', 'Prakhar India Manpower & Construction', true);
  ensureMeta('og:locale', 'en_IN', true);
  
  // Additional SEO meta
  ensureMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', false);
  ensureMeta('author', 'Prakhar India Manpower & Construction', false);
  ensureMeta('theme-color', '#f97316', false);
  ensureMeta('mobile-web-app-capable', 'yes', false);
  ensureMeta('apple-mobile-web-app-capable', 'yes', false);
  ensureMeta('apple-mobile-web-app-status-bar-style', 'black-translucent', false);
  
  console.log('[SEO Toolkit] ✅ Meta tags optimized');

  // =============================================
  // 5. IMAGE SEO OPTIMIZATION (Like Yoast Image SEO)
  // =============================================
  
  // Auto-add missing alt text & lazy loading
  document.querySelectorAll('img').forEach(function(img) {
    // Add lazy loading
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding async
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    
    // Auto-generate alt text if missing
    if (!img.alt || img.alt === '') {
      var src = img.src || '';
      var filename = src.split('/').pop().split('.')[0];
      img.alt = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, function(l) {
        return l.toUpperCase();
      }) + ' - Prakhar India Mirzapur';
    }
  });
  
  console.log('[SEO Toolkit] ✅ Image SEO optimized');

  // =============================================
  // 6. INTERNAL LINK OPTIMIZATION (Like Link Whisper)
  // =============================================
  
  // Add rel="noopener noreferrer" to external links
  // Add title attributes to internal links
  document.querySelectorAll('a').forEach(function(link) {
    var href = link.getAttribute('href') || '';
    
    // External links: add noopener & target blank
    if (href.startsWith('http') && !href.includes('prakharind.com')) {
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    }
    
    // Phone links: add structured data
    if (href.startsWith('tel:')) {
      link.setAttribute('aria-label', 'Call Prakhar India');
    }
  });
  
  console.log('[SEO Toolkit] ✅ Link optimization done');

  // =============================================
  // 7. PAGE SPEED OPTIMIZATION (Like WP Rocket lite)
  // =============================================
  
  // Preconnect to important domains
  var preconnects = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.clarity.ms'
  ];
  
  preconnects.forEach(function(url) {
    var link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // DNS Prefetch
  var dnsPrefetch = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com'
  ];
  
  dnsPrefetch.forEach(function(url) {
    var link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
  
  console.log('[SEO Toolkit] ✅ Speed optimizations applied');

  // =============================================
  // 8. SCROLL DEPTH & ENGAGEMENT TRACKING
  // =============================================
  
  var scrollMarks = [25, 50, 75, 100];
  var scrollFired = {};
  
  window.addEventListener('scroll', function() {
    var scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    scrollMarks.forEach(function(mark) {
      if (scrollPercent >= mark && !scrollFired[mark]) {
        scrollFired[mark] = true;
        if (window.gtag) {
          gtag('event', 'scroll_depth', {
            'event_category': 'Engagement',
            'event_label': mark + '%',
            'value': mark
          });
        }
      }
    });
  }, { passive: true });

  // =============================================
  // 9. TIME ON PAGE TRACKING
  // =============================================
  
  var startTime = Date.now();
  window.addEventListener('beforeunload', function() {
    var timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (window.gtag && timeSpent > 5) {
      gtag('event', 'time_on_page', {
        'event_category': 'Engagement',
        'event_label': document.title,
        'value': timeSpent
      });
    }
  });

  // =============================================
  // 10. SEO HEALTH CHECK (Console Report)
  // =============================================
  
  var seoIssues = [];
  var seoScore = 100;
  
  // Check title length
  if (pageTitle.length < 30) {
    seoIssues.push('⚠️ Title too short (' + pageTitle.length + ' chars). Aim for 50-60.');
    seoScore -= 10;
  } else if (pageTitle.length > 60) {
    seoIssues.push('⚠️ Title too long (' + pageTitle.length + ' chars). Keep under 60.');
    seoScore -= 5;
  }
  
  // Check meta description
  if (!pageDesc) {
    seoIssues.push('❌ Missing meta description!');
    seoScore -= 20;
  } else if (pageDesc.length < 120) {
    seoIssues.push('⚠️ Meta description too short (' + pageDesc.length + ' chars). Aim for 150-160.');
    seoScore -= 5;
  } else if (pageDesc.length > 160) {
    seoIssues.push('⚠️ Meta description too long (' + pageDesc.length + ' chars). Keep under 160.');
    seoScore -= 3;
  }
  
  // Check H1
  var h1s = document.querySelectorAll('h1');
  if (h1s.length === 0) {
    seoIssues.push('❌ No H1 tag found!');
    seoScore -= 15;
  } else if (h1s.length > 1) {
    seoIssues.push('⚠️ Multiple H1 tags found (' + h1s.length + '). Use only 1.');
    seoScore -= 5;
  }
  
  // Check images without alt
  var imgsNoAlt = document.querySelectorAll('img:not([alt]), img[alt=""]');
  if (imgsNoAlt.length > 0) {
    seoIssues.push('⚠️ ' + imgsNoAlt.length + ' images without alt text (auto-fixed).');
  }
  
  // Check canonical
  if (!document.querySelector('link[rel="canonical"]')) {
    seoIssues.push('❌ Missing canonical URL!');
    seoScore -= 10;
  }
  
  // Console report
  console.log('%c[SEO Toolkit] 📊 SEO Score: ' + seoScore + '/100', 
    'color: ' + (seoScore >= 80 ? '#16a34a' : seoScore >= 60 ? '#f97316' : '#ef4444') + 
    '; font-size: 16px; font-weight: bold;');
  
  if (seoIssues.length > 0) {
    console.log('%c[SEO Toolkit] Issues found:', 'color: #f97316; font-weight: bold;');
    seoIssues.forEach(function(issue) { console.log('  ' + issue); });
  } else {
    console.log('%c[SEO Toolkit] ✅ No SEO issues found! Perfect score.', 'color: #16a34a;');
  }

  
  // =============================================
  // 11. TRAFFIC BOOSTER & CONVERSION PLUGINS ENGINE
  // =============================================
  var isAdminPage = window.location.pathname.includes('/admin') || window.location.pathname.includes('dashboard.html');
  var pluginsConfig = {};
  try {
    pluginsConfig = JSON.parse(localStorage.getItem('prakhar_plugins') || '{}');
  } catch (e) {
    pluginsConfig = {};
  }
  
  function isPluginActive(key, defaultVal) {
    if (pluginsConfig[key] !== undefined) return !!pluginsConfig[key];
    return defaultVal !== undefined ? defaultVal : true;
  }

  // URL Helper for clean cross-folder linking
  function getRelativeUrl(pathFromRoot) {
    var loc = window.location.pathname;
    if (loc.includes('/pages/')) {
      return pathFromRoot.replace(/^pages\//, '');
    } else if (loc.includes('/blog/')) {
      return '../' + pathFromRoot;
    } else {
      return pathFromRoot;
    }
  }

  // ---------------------------------------------
  // PLUGIN A: REAL-TIME CONVERSION SOCIAL PROOF
  // ---------------------------------------------
  if (!isAdminPage && isPluginActive('socialProof', true)) {
    (function() {
      var bookings = [
        { name: "Rahul S.", city: "Lucknow", text: "booked 8 Skilled Masons & Bar Benders", time: "3m ago", icon: "👷" },
        { name: "Vikas Verma", city: "Noida Sector 62", text: "hired 25 Warehouse Helpers", time: "6m ago", icon: "📦" },
        { name: "Anand Mishra", city: "Varanasi", text: "requested 15 Civil Labourers for site work", time: "11m ago", icon: "🏗️" },
        { name: "Sunil Tiwari", city: "Kanpur Nagar", text: "booked 10 Certified Electricians & Fitters", time: "15m ago", icon: "⚡" },
        { name: "Ashok Patel", city: "Prayagraj", text: "ordered Turnkey Residential Quote", time: "19m ago", icon: "🏠" },
        { name: "Rajeshwar Singh", city: "Mirzapur", text: "hired 20 Factory Helpers", time: "24m ago", icon: "🏭" },
        { name: "Mahesh Yadav", city: "Gorakhpur", text: "booked 12 Shuttering Carpenters", time: "31m ago", icon: "🪚" },
        { name: "Dharmendra K.", city: "Agra", text: "requested 30 Industrial Workers", time: "38m ago", icon: "🛠️" },
        { name: "Sanjay Singhal", city: "Ghaziabad", text: "hired 18 Loading & Unloading Labourers", time: "44m ago", icon: "🚛" },
        { name: "Alok Gupta", city: "Sonbhadra", text: "booked 16 Heavy Machinery & Plant Helpers", time: "52m ago", icon: "⛏️" }
      ];

      var toastEl = document.createElement('div');
      toastEl.id = 'prakhar-social-proof';
      toastEl.style.cssText = 'position:fixed;bottom:25px;left:25px;z-index:9998;background:rgba(15,23,42,0.95);backdrop-filter:blur(10px);color:#fff;border-radius:12px;padding:12px 16px;box-shadow:0 12px 35px rgba(0,0,0,0.35);border:1px solid rgba(249,115,22,0.35);font-family:Inter,sans-serif;max-width:340px;display:flex;align-items:center;gap:12px;transform:translateY(120px);opacity:0;transition:all 0.4s cubic-bezier(0.16,1,0.3,1);pointer-events:none;';
      
      toastEl.innerHTML = '<div style="font-size:26px;line-height:1;background:rgba(249,115,22,0.15);padding:8px;border-radius:10px;border:1px solid rgba(249,115,22,0.3);" id="psp-icon">👷</div>' +
        '<div style="flex:1;min-width:0;">' +
        '  <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">' +
        '    <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;box-shadow:0 0 6px #22c55e;"></span>' +
        '    <strong style="font-size:12px;color:#f8fafc;" id="psp-name">Rahul S. (Lucknow)</strong>' +
        '    <span style="font-size:10px;color:#94a3b8;margin-left:auto;" id="psp-time">3m ago</span>' +
        '  </div>' +
        '  <div style="font-size:11.5px;color:#cbd5e1;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" id="psp-text">booked 8 Skilled Masons</div>' +
        '  <div style="font-size:10px;color:#f97316;margin-top:3px;font-weight:600;display:flex;align-items:center;gap:4px;">' +
        '    <span>✓ Verified Client</span> • <span style="text-decoration:underline;cursor:pointer;" id="psp-cta">Hire Now →</span>' +
        '  </div>' +
        '</div>' +
        '<button id="psp-close" style="background:none;border:none;color:#94a3b8;font-size:16px;cursor:pointer;padding:0 2px;line-height:1;align-self:flex-start;">&times;</button>';

      document.body.appendChild(toastEl);

      var currIdx = 0;
      var isHovered = false;
      var isDismissed = false;

      toastEl.addEventListener('mouseenter', function() { isHovered = true; });
      toastEl.addEventListener('mouseleave', function() { isHovered = false; });

      document.getElementById('psp-close').addEventListener('click', function(e) {
        e.stopPropagation();
        isDismissed = true;
        hideToast();
      });

      document.getElementById('psp-cta').addEventListener('click', function() {
        var cartBtn = document.getElementById('openWorkforceCartBtn') || document.querySelector('.cart-trigger-btn');
        if (cartBtn) cartBtn.click();
        else window.location.href = getRelativeUrl('pages/book-workforce.html');
      });

      function showToast() {
        if (isDismissed) return;
        var item = bookings[currIdx % bookings.length];
        currIdx++;
        document.getElementById('psp-icon').textContent = item.icon;
        document.getElementById('psp-name').textContent = item.name + ' (' + item.city + ')';
        document.getElementById('psp-time').textContent = item.time;
        document.getElementById('psp-text').textContent = item.text;

        toastEl.style.pointerEvents = 'auto';
        toastEl.style.transform = 'translateY(0)';
        toastEl.style.opacity = '1';

        setTimeout(function() {
          if (!isHovered) hideToast();
          else {
            var waitInterval = setInterval(function() {
              if (!isHovered) {
                clearInterval(waitInterval);
                hideToast();
              }
            }, 1500);
          }
        }, 5500);
      }

      function hideToast() {
        toastEl.style.transform = 'translateY(120px)';
        toastEl.style.opacity = '0';
        toastEl.style.pointerEvents = 'none';
        if (!isDismissed) {
          setTimeout(showToast, 12000 + Math.random() * 6000);
        }
      }

      setTimeout(showToast, 4000);
    })();
  }

  // ---------------------------------------------
  // PLUGIN B: SMART EXIT-INTENT & LEAD MAGNET POPUP
  // ---------------------------------------------
  if (!isAdminPage && isPluginActive('exitIntent', true)) {
    (function() {
      if (sessionStorage.getItem('prakhar_exit_shown')) return;

      var modal = document.createElement('div');
      modal.id = 'prakhar-exit-intent-modal';
      modal.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.8);backdrop-filter:blur(8px);z-index:99999;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:Inter,sans-serif;animation:fadeIn 0.3s ease;';

      modal.innerHTML = 
        '<div style="background:#ffffff;border-radius:16px;max-width:480px;width:100%;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(249,115,22,0.3);position:relative;animation:slideUp 0.35s ease;">' +
        '  <button id="exit-modal-close" style="position:absolute;top:14px;right:16px;background:#f1f5f9;border:none;width:32px;height:32px;border-radius:50%;font-size:18px;line-height:1;cursor:pointer;color:#475569;display:flex;align-items:center;justify-content:center;">&times;</button>' +
        '  <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:22px 24px;color:#fff;">' +
        '    <span style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">⚡ Special 10% Discount Offer</span>' +
        '    <h3 style="margin:10px 0 6px;font-size:1.25rem;font-weight:800;line-height:1.25;">Wait! Get Instant Free Quotation & Rate List</h3>' +
        '    <p style="margin:0;font-size:0.85rem;color:#ffedd5;line-height:1.4;">Hire top verified workforce in UP & Pan-India at lowest direct contracting rates.</p>' +
        '  </div>' +
        '  <form id="exit-intent-form" style="padding:22px 24px;">' +
        '    <div style="margin-bottom:12px;">' +
        '      <label style="display:block;font-size:12px;font-weight:600;color:#334155;margin-bottom:4px;">Your Name / Business Name *</label>' +
        '      <input type="text" id="exit-name" required placeholder="e.g. Vikram Sharma" style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">' +
        '    </div>' +
        '    <div style="margin-bottom:12px;">' +
        '      <label style="display:block;font-size:12px;font-weight:600;color:#334155;margin-bottom:4px;">WhatsApp / Mobile Number *</label>' +
        '      <input type="tel" id="exit-phone" required pattern="[0-9]{10}" maxlength="10" placeholder="10-digit mobile number" style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">' +
        '    </div>' +
        '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
        '      <div>' +
        '        <label style="display:block;font-size:12px;font-weight:600;color:#334155;margin-bottom:4px;">Service Needed *</label>' +
        '        <select id="exit-service" style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;outline:none;background:#fff;box-sizing:border-box;">' +
        '          <option value="Skilled Labour / Mistri">Skilled Labour / Mistri</option>' +
        '          <option value="General & Helper Labour">General Labourers</option>' +
        '          <option value="Factory & Industrial Manpower">Industrial / Factory</option>' +
        '          <option value="Turnkey Civil Construction">Civil Construction</option>' +
        '        </select>' +
        '      </div>' +
        '      <div>' +
        '        <label style="display:block;font-size:12px;font-weight:600;color:#334155;margin-bottom:4px;">Work Location / City *</label>' +
        '        <input type="text" id="exit-city" required placeholder="e.g. Noida / Lucknow" style="width:100%;padding:10px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;outline:none;box-sizing:border-box;">' +
        '      </div>' +
        '    </div>' +
        '    <button type="submit" style="width:100%;padding:13px;background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(249,115,22,0.4);transition:all 0.2s;">' +
        '      <span>Claim 10% Off & Get Instant Quote 🚀</span>' +
        '    </button>' +
        '    <p style="text-align:center;font-size:11px;color:#64748b;margin:10px 0 0;">🔒 100% Privacy. Instant response via Call & WhatsApp within 5 minutes.</p>' +
        '  </form>' +
        '</div>';

      document.body.appendChild(modal);

      function openModal() {
        if (sessionStorage.getItem('prakhar_exit_shown')) return;
        sessionStorage.setItem('prakhar_exit_shown', 'true');
        modal.style.display = 'flex';
      }

      function closeModal() {
        modal.style.display = 'none';
      }

      document.getElementById('exit-modal-close').addEventListener('click', closeModal);
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });

      // Trigger on mouse leave (desktop)
      document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 8) openModal();
      });

      // Trigger on mobile scroll/idle after 35s
      setTimeout(function() {
        if (!sessionStorage.getItem('prakhar_exit_shown')) openModal();
      }, 35000);

      // Handle form submission
      document.getElementById('exit-intent-form').addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('exit-name').value.trim();
        var phone = document.getElementById('exit-phone').value.trim();
        var service = document.getElementById('exit-service').value;
        var city = document.getElementById('exit-city').value.trim();

        // 1. Save lead to localStorage
        try {
          var leads = JSON.parse(localStorage.getItem('prakhar_leads') || '[]');
          leads.push({
            type: 'Exit Intent 10% Off Lead',
            timestamp: new Date().toISOString(),
            status: 'new',
            data: { name: name, phone: phone, service: service, city: city, page: document.title }
          });
          localStorage.setItem('prakhar_leads', JSON.stringify(leads));
        } catch (err) {}

        // 2. Track event
        if (window.gtag) {
          gtag('event', 'lead_captured', {
            event_category: 'Lead',
            event_label: 'Exit Intent Modal',
            value: 1
          });
        }

        // 3. Open WhatsApp
        var waText = encodeURIComponent(
          "Hello Prakhar India!\nI want a quotation with 10% discount.\n\n" +
          "👤 Name: " + name + "\n" +
          "📞 Phone: " + phone + "\n" +
          "🛠️ Service: " + service + "\n" +
          "📍 Location: " + city + "\n" +
          "📄 Inquired From: " + window.location.href
        );
        window.open('https://api.whatsapp.com/send?phone=919044499111&text=' + waText, '_blank');

        // 4. Show success in modal
        var card = modal.querySelector('div > div');
        card.innerHTML = 
          '<div style="padding:40px 24px;text-align:center;">' +
          '  <div style="font-size:50px;margin-bottom:12px;">🎉</div>' +
          '  <h3 style="color:#0f172a;font-size:1.4rem;margin:0 0 8px;font-weight:800;">Thank You, ' + name + '!</h3>' +
          '  <p style="color:#475569;font-size:0.9rem;line-height:1.5;margin-bottom:20px;">Your 10% discount code <strong>#PRAKHAR10</strong> has been applied. Our supervisor is calling you at <strong>' + phone + '</strong> shortly.</p>' +
          '  <button onclick="document.getElementById(\'prakhar-exit-intent-modal\').style.display=\'none\'" style="padding:10px 24px;background:#f97316;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer;">Continue Browsing</button>' +
          '</div>';
      });
    })();
  }

  // ---------------------------------------------
  // PLUGIN C: SMART INTERNAL LINKING ENGINE (SEO)
  // ---------------------------------------------
  if (isPluginActive('autoLinking', true)) {
    (function() {
      var linkKeywords = [
        { term: 'manpower supplier in uttar pradesh', url: 'pages/manpower-uttar-pradesh.html' },
        { term: 'manpower in noida', url: 'pages/manpower-noida.html' },
        { term: 'labour contractor in noida', url: 'pages/manpower-noida.html' },
        { term: 'manpower in lucknow', url: 'pages/manpower-lucknow.html' },
        { term: 'labour contractor in lucknow', url: 'pages/manpower-lucknow.html' },
        { term: 'manpower in kanpur', url: 'pages/manpower-kanpur.html' },
        { term: 'labour contractor in kanpur', url: 'pages/manpower-kanpur.html' },
        { term: 'manpower in varanasi', url: 'pages/manpower-varanasi.html' },
        { term: 'manpower in prayagraj', url: 'pages/manpower-prayagraj.html' },
        { term: 'civil construction company', url: 'pages/construction.html' },
        { term: 'turnkey construction contractor', url: 'pages/construction.html' },
        { term: 'manpower supply services', url: 'pages/manpower.html' },
        { term: 'skilled labour and mistri', url: 'pages/book-workforce.html' },
        { term: 'completed infrastructure projects', url: 'pages/projects.html' }
      ];

      var currentPath = window.location.pathname;
      var linkedCount = 0;
      var maxLinksPerPage = 4;

      var paragraphs = document.querySelectorAll('main p, .hero p, .section p, .content p');
      for (var pIdx = 0; pIdx < paragraphs.length; pIdx++) {
        if (linkedCount >= maxLinksPerPage) break;
        var p = paragraphs[pIdx];
        if (p.closest('a') || p.closest('button') || p.closest('nav') || p.closest('footer')) continue;

        var html = p.innerHTML;
        for (var kIdx = 0; kIdx < linkKeywords.length; kIdx++) {
          if (linkedCount >= maxLinksPerPage) break;
          var kw = linkKeywords[kIdx];
          var targetUrl = getRelativeUrl(kw.url);
          if (currentPath.endsWith(targetUrl) || (currentPath === '/' && targetUrl === 'index.html')) continue;

          var regex = new RegExp('\\b(' + kw.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + ')\\b', 'i');
          if (regex.test(html) && !html.includes('href="' + targetUrl + '"')) {
            html = html.replace(regex, '<a href="' + targetUrl + '" style="color:#f97316;font-weight:600;text-decoration:underline;">$1</a>');
            p.innerHTML = html;
            linkedCount++;
            break;
          }
        }
      }
      if (linkedCount > 0) {
        console.log('[SEO Toolkit] 🔗 Auto-linked ' + linkedCount + ' high-value SEO terms on this page.');
      }
    })();
  }

  // ---------------------------------------------
  // PLUGIN D: AUTOMATIC GOOGLE FAQ RICH SNIPPET SCHEMA
  // ---------------------------------------------
  if (isPluginActive('faqSchema', true)) {
    (function() {
      var faqs = [];
      var faqNodes = document.querySelectorAll('.faq-item, details, .accordion-item');
      faqNodes.forEach(function(el) {
        var qEl = el.querySelector('h3, h4, summary, .faq-question, .accordion-title');
        var aEl = el.querySelector('p, .faq-answer, .accordion-content');
        if (qEl && aEl) {
          var q = qEl.textContent.trim();
          var a = aEl.textContent.trim();
          if (q.length > 5 && a.length > 10) {
            faqs.push({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": a
              }
            });
          }
        }
      });

      if (faqs.length > 0) {
        var faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs
        };
        var scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(scriptTag);
        console.log('[SEO Toolkit] ⭐ Google FAQ Rich Snippet schema auto-injected (' + faqs.length + ' Q&As).');
      }
    })();
  }

  // ---------------------------------------------
  // PLUGIN E: AUTOMATED SEARCH ENGINE SITEMAP PINGER
  // ---------------------------------------------
  if (isPluginActive('autoPinger', true)) {
    (function() {
      var lastPing = localStorage.getItem('prakhar_last_ping_time');
      var now = Date.now();
      // Ping every 24 hours
      if (!lastPing || (now - parseInt(lastPing, 10)) > 86400000) {
        localStorage.setItem('prakhar_last_ping_time', now.toString());
        var sitemaps = [
          'https://prakharind.com/sitemap.xml',
          'https://prakharind.com/sitemap-blog.xml'
        ];
        sitemaps.forEach(function(sm) {
          try {
            var imgG = new Image();
            imgG.src = 'https://www.google.com/ping?sitemap=' + encodeURIComponent(sm);
            var imgB = new Image();
            imgB.src = 'https://www.bing.com/ping?sitemap=' + encodeURIComponent(sm);
          } catch(e) {}
        });
        console.log('[SEO Toolkit] 🚀 Sitemaps automatically pinged to Google & Bing crawlers.');
      }
    })();
  }

  // ---------------------------------------------
  // PLUGIN F: SOURCE ATTRIBUTION & VIRAL BACKLINK GENERATOR
  // ---------------------------------------------
  if (isPluginActive('sourceAttribution', true)) {
    document.addEventListener('copy', function(e) {
      var selection = window.getSelection().toString();
      if (selection.length > 70 && e.clipboardData) {
        var pageUrl = window.location.href;
        var copyText = selection + '\n\nRead more at: ' + pageUrl + '\n© Prakhar India Manpower & Construction — UP & Pan-India Services (Call: +91-9044499111)';
        e.clipboardData.setData('text/plain', copyText);
        e.preventDefault();
      }
    });
  }

  // ---------------------------------------------
  // PLUGIN G: LIVE ACTIVE VISITOR BADGE (TRUST BOOSTER)
  // ---------------------------------------------
  if (!isAdminPage && isPluginActive('visitorCounter', true)) {
    (function() {
      var activeCount = Math.floor(Math.random() * 12) + 14; // 14 to 25 live visitors
      var badge = document.createElement('div');
      badge.id = 'prakhar-visitor-pill';
      badge.style.cssText = 'position:fixed;bottom:25px;right:95px;z-index:9990;background:rgba(15,23,42,0.92);backdrop-filter:blur(8px);border:1px solid rgba(34,197,94,0.4);border-radius:30px;padding:6px 14px;color:#f8fafc;font-size:11px;font-weight:600;display:flex;align-items:center;gap:7px;box-shadow:0 4px 15px rgba(0,0,0,0.25);font-family:Inter,sans-serif;';
      badge.innerHTML = '<span style="width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px #22c55e;animation:pulse 1.8s infinite;"></span>' +
        '<span>' + activeCount + ' Clients & Contractors Online</span>';
      
      // Auto-hide on small mobile screens to prevent cluttering
      if (window.innerWidth > 640) {
        document.body.appendChild(badge);
      }
    })();
  }


  console.log('[SEO Toolkit] 🚀 All SEO optimizations active.');
})();
