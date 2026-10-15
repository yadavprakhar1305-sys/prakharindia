# Schema & Structured Data Findings: prakharind.com

## Coverage Status: 100% of Indexable Pages

### Entity Architecture
The site now implements connected Schema.org entities across all public templates:

| Entity Type | Pages Implemented | Key Schema Properties |
| :--- | :--- | :--- |
| **`RealEstateAgent` & `GeneralContractor`** | `index.html`, 12 City pages, 10 Construction pages | `name`, `address`, `geo`, `priceRange`, `telephone`, `areaServed`, `logo` |
| **`Service`** | `index.html`, `pages/construction.html` | `serviceType`, `offers` (with lowPrice ₹1,650, highPrice ₹2,650) |
| **`FAQPage`** | `index.html`, `blog/construction-cost-per-sqft-uttar-pradesh.html` | Questions & answers targeting rate cards, approvals, guarantees |
| **`BlogPosting` & `Article`** | 11 Blog posts in `/blog/` | `headline`, `author`, `publisher`, `datePublished`, `dateModified` |
| **`BreadcrumbList`** | Subpages & Articles | Hierarchical `ListItem` trail for clean mobile search SERP breadcrumbs |

### Critical Bug Fix
- ** लखनऊ (Lucknow) Duplicate Coordinates Bug:** All 11 regional pages were previously initialized with Lucknow's GeoCoordinates (`26.8467, 80.9462`). All 11 pages now possess their authentic coordinates (e.g., Mirzapur `25.1503, 82.5633`, Varanasi `25.3176, 82.9739`, Noida `28.5355, 77.3910`, Ayodhya `26.7922, 82.1998`, Prayagraj `25.4358, 81.8463`).
