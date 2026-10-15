# Technical SEO Findings: prakharind.com

## Audit Scope
- Total HTML files audited: 51
- Indexable public HTML pages: 47
- Blocked utility pages: 4 (`/pages/admin.html`, `/pages/login.html`, `/pages/signup.html`, `/pages/admin/dashboard.html`)

## Key Observations & Status

### 1. Robots.txt Configuration
- **Status:** **PASS**
- **Details:** The site includes a dedicated `robots.txt` configuration that permits all search engines (`Googlebot`, `Bingbot`) and explicitly allows AI bots (`GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`).
- **Remediation Done:** The non-standard `Sitemap: https://prakharind.com/llms.txt` entry was removed to avoid GSC XML format validation failures.

### 2. Canonical Tag Audit
- **Status:** **PASS (100% on Public Pages)**
- **Details:** All 47 public pages have self-referential canonical tags with strict `https://` protocol and standard URLs matching sitemap paths.

### 3. XML Sitemaps
- **Status:** **PASS**
- **Files:**
  - `https://prakharind.com/sitemap.xml` (Contains all 47 public pages)
  - `https://prakharind.com/sitemap-blog.xml` (Contains 11 blog articles)
- **Synchronization:** Verified 0 orphaned pages, 0 missing sitemap entries.

### 4. Heading Hierarchy (H1)
- **Status:** **PASS**
- **Details:** Every public indexable page has exactly one primary `<h1>` tag with descriptive keyword targeting. Utility pages are isolated from indexing.
