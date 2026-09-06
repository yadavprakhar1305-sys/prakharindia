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
  window.CLARITY_ID = 'YOUR_CLARITY_ID'; // ← REPLACE THIS

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
      "streetAddress": "Mirzapur City",
      "addressLocality": "Mirzapur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "231001",
      "addressCountry": "IN"
    }
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

  console.log('[SEO Toolkit] 🚀 All SEO optimizations active.');
})();
