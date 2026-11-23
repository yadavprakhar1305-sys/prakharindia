/**
 * Prakhar India Website SEO & Conversion Runtime Plugin.
 * Features:
 *  - Speculation Rules prerendering/prefetching for near-instant internal navigation (CWV/LCP boost)
 *  - On-demand GA4 & Microsoft Clarity loader (dormant until IDs are set in js/seo-config.js)
 *  - Automatic conversion tracking (phone calls, WhatsApp clicks, lead form submissions)
 *  - Cross-origin external link rel="noopener" hardening
 */
(() => {
  const cfg = Object.assign(
    {
      ga4MeasurementId: "",
      clarityProjectId: "",
      speculationRules: true,
      trackConversions: true
    },
    window.PRAKHAR_SEO_CONFIG || {}
  );

  function injectSpeculationRules() {
    if (!cfg.speculationRules) return;
    if (typeof HTMLScriptElement.supports !== "function" || !HTMLScriptElement.supports("speculationrules")) {
      return;
    }
    const rules = {
      prerender: [
        {
          where: {
            and: [
              { href_matches: "/*" },
              { not: { href_matches: "/pages/admin.html" } },
              { not: { href_matches: "/pages/login.html" } },
              { not: { href_matches: "/pages/signup.html" } },
              { not: { selector_matches: "[rel~=nofollow]" } }
            ]
          },
          eagerness: "moderate"
        }
      ]
    };
    const script = document.createElement("script");
    script.type = "speculationrules";
    script.textContent = JSON.stringify(rules);
    document.head.appendChild(script);
  }

  function loadGA4(id) {
    if (!/^G-[A-Z0-9]{6,}$/i.test(id)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }

  function loadClarity(id) {
    if (!/^[a-z0-9]{6,}$/i.test(id)) return;
    window.clarity = window.clarity || function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  }

  function trackEvent(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
    if (typeof window.clarity === "function") {
      window.clarity("event", eventName);
    }
  }

  function hardenExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
      const rel = (anchor.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (!rel.includes("noopener")) rel.push("noopener");
      anchor.setAttribute("rel", rel.join(" "));
    });
  }

  function bindConversionEvents() {
    if (!cfg.trackConversions) return;
    document.addEventListener("click", (event) => {
      const link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("phone_call_click", { page_path: location.pathname, link_url: href });
      } else if (href.includes("wa.me/")) {
        trackEvent("whatsapp_click", { page_path: location.pathname, link_url: href });
      }
    });

    document.addEventListener("click", (event) => {
      const tierBtn = event.target.closest && event.target.closest("[data-calc-rate], [data-rate-pick]");
      if (tierBtn) {
        trackEvent("estimator_tier_select", {
          page_path: location.pathname,
          rate: tierBtn.getAttribute("data-calc-rate") || tierBtn.getAttribute("data-rate-pick")
        });
        return;
      }
      const zoneBtn = event.target.closest && event.target.closest("[data-mzp-zone]");
      if (zoneBtn) {
        trackEvent("mirzapur_3d_zone_select", {
          page_path: location.pathname,
          zone: zoneBtn.getAttribute("data-mzp-zone")
        });
      }
    });

    document.addEventListener("submit", (event) => {
      const form = event.target;
      if (form && form.tagName === "FORM") {
        trackEvent("lead_form_submit", {
          page_path: location.pathname,
          form_id: form.id || "unnamed_form"
        });
      }
    });
  }

  injectSpeculationRules();
  loadGA4(cfg.ga4MeasurementId);
  loadClarity(cfg.clarityProjectId);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      hardenExternalLinks();
      bindConversionEvents();
    });
  } else {
    hardenExternalLinks();
    bindConversionEvents();
  }
})();
