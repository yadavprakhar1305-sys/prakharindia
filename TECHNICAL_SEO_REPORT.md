# Technical SEO Inspection & Repair Report — Prakhar India (`https://prakharind.com/`)

**Inspection Scope:** All 60 workspace HTML files (57 public indexable pages + 3 utility `noindex` pages: `pages/admin.html`, `pages/login.html`, `pages/signup.html`), plus CSS/JS assets, `robots.txt`, `vercel.json`, `sitemap.xml`, `sitemap-blog.xml`, `rss.xml`, `llms.txt`, and `llms-full.txt`.

## 1. Automated Audit Score Summary (`npm run seo:audit -- --strict`)
- **Public Pages Audited:** 57
- **Post-Fix Average Score:** **100/100** (up from 99/100 before fixing thin `309`-word content on `blog/turnkey-house-construction-vs-local-thekedar-up.html`)
- **Critical Issues:** 0
- **Warnings Remaining:** 0
- **Orphan Pages (0 inbound internal links):** []
- **Sitemaps Synced (`npm run seo:sync`):** `sitemap.xml` (44 main/page URLs), `sitemap-blog.xml` (13 blog URLs), `rss.xml` (15 feed items)

## 2. Technical Defects Found & Fixed in Codebase

| Defect / Risk Area | Severity | Scope Found | Root Cause & Impact | Fix Implemented |
| :--- | :--- | :--- | :--- | :--- |
| **`/index.html` Internal Link Leak** | Critical | All 56 public subpages + `index.html` logo | Every subpage linked `href="../index.html"` while `vercel.json` issues a 301 redirect `/index.html -> /`; GSC recorded `/index.html` separately (`19 impr, 1 click`) | Rewrote every internal logo, nav, footer & `BreadcrumbList` home URL across all 57 public pages to canonical `/` and `/blog/` |
| **JavaScript Fatal Syntax Error & Recursion Overflow** | Critical | `js/three-inspector.js` | Duplicate `const camera`, duplicate `const renderer`, duplicate `blueLight`/`grid`, missing closing brace on `init3dBuildingInspector`, and synchronous recursive `animate()` call inside `animate()` | Cleaned all duplicate declarations, fixed `animate()` RAF loop, closed function scope; `node --check` passes cleanly |
| **Mobile Hamburger Double-Fire Listener + Fake Toast** | High | `29` subpages + `js/main.js` | `main.js` bound `#menuBtn` AND subpages' inline script bound a second click listener on `#menuBtn` without checking `dataset.menuBound`, opening & closing immediately; `main.js` also ran a fabricated `proof-toast` popup | Exposed `window.toggleMobileNav` cleanly in `js/main.js`, removed fake social-proof ticker, guarded inline subpage listeners with `dataset.menuBound`, injected `main.js?v=1.3` across all `27` missing pages |
| **Broken Lead Forms (`alert()` Dead-Ends)** | Critical | `20` service & city subpages | Forms used `onsubmit="event.preventDefault(); alert('Thank you!...')"` without sending data or opening WhatsApp, silently dropping mobile enquiries | Added `initLegacyAlertForms()` in `js/mnc-corporate.js?v=1.2` validating Indian phone numbers and dispatching pre-filled WhatsApp lead payloads to `+91 90444 99111` |
| **City Page Doorway Cloning** | High | `6` pages (`agra`, `bareilly`, `ghaziabad`, `gorakhpur`, `jhansi`, `kanpur`) | `CITY_TOKEN`-normalized similarity measured **94.9%–95.9%** pairwise clone ratio — major Helpful Content / Doorway risk | Inserted bespoke `480+` word post-hero local authority (ADA/BDA/GDA/JDA/KDA), soil, connectivity & rate-table blocks on each city page; similarity dropped to **29.1%–40.4%** |
| **Homepage Internal Equity Omission** | High | `index.html` | Limestone redesign removed links to `pages/manpower.html` and `pages/manpower-chandauli.html` even though GSC showed `#1` non-brand clicks (`manpower-chandauli`: 140i / 4c) | Added Tab 4 (**Manpower & Labour Thekedar**) in `#secServices` plus Regional Hub cards & footer columns linking `manpower.html`, `manpower-chandauli.html`, `varanasi`, `prayagraj`, `chandauli`, `noida`, `real-estate-mirzapur.html`, `compliance.html` |
| **Invisible White Table Text on Light Blog Theme** | High | `blog/property-registration-stamp-duty-charges-up-2026.html` & light CSS tables | Hardcoded inline `color:#fff` on `<td>` rendered white-on-white after Limestone light styling (`8.0%` total registration figure invisible) | Added light-surface contrast rules in `css/mnc-corporate.css?v=1.2` and replaced inline `color:#fff` on Stamp Duty cells with `#111317` |
| **Truncated SERP Titles/Meta & Missing BreadcrumbList** | High | `15` priority URLs | Titles up to `93` chars and metas up to `192` chars clipped on mobile (`90%` of GSC impressions); `construction-cost-per-sqft`, `manpower.html`, `manpower-chandauli.html` lacked `BreadcrumbList` | Rewrote all `15` titles (`<=64` chars) & descriptions (`<=160` chars raw); injected `BreadcrumbList` JSON-LD on all 3 pages |
| **E-E-A-T Claim & Price Consistency** | Medium | `10` city pages + `real-estate-mirzapur.html` + `llms*.txt` | Claimed `"over two decades"` vs verified founding `Since 2014`; `real-estate-mirzapur` said `₹850` vs `₹950–₹1,850` / `₹1,150`; `office-space-lucknow` `₹32` vs `₹45` | Unified `"over a decade (since 2014)"`, aligned turnkey baseline to `₹1,450+`, aligned Mirzapur plots (`₹950–₹1,850` & `₹650+` Chunar logistics), clarified office `₹32–₹110/sq.ft`, updated `llms.txt` & `llms-full.txt` |

## 3. Infrastructure, Security, Crawlability & Measurement Checks
- **`robots.txt`:** Explicitly allows Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot; blocks `/admin`, `/login`, `/signup`; declares `Sitemap: https://prakharind.com/sitemap.xml` and `Sitemap: https://prakharind.com/sitemap-blog.xml`.
- **`vercel.json`:** `cleanUrls: false`, `trailingSlash: false`, permanent `301` redirect `/index.html -> /` and `/index -> /`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Robots-Tag: noindex, nofollow` on `/pages/admin.html`, `/pages/login.html`, `/pages/signup.html`, and 1-year `immutable` caching on `/images/*`.
- **Image Audit:** Verified `0` broken image references across all HTML/CSS files against the `29` existing files in `images/`.
- **API / Analytics Gaps Requiring Owner Action:**
  1. `js/seo-config.js` currently has empty `ga4MeasurementId: ""` and `clarityProjectId: ""`. Add real GA4 (`G-...`) and Microsoft Clarity project IDs to track post-click session funnels and WhatsApp/tel conversions already instrumented in `js/seo-plugin.js`.
  2. Live PageSpeed Insights API calls without an API key returned `HTTP 429 Too Many Requests`. Run PSI/CrUX field checks once `GOOGLE_PSI_API_KEY` or Search Console OAuth is connected (mobile UX statically passes with responsive typography, deferred JS bundles, explicit image `width`/`height`, and no layout-shifting popups).
