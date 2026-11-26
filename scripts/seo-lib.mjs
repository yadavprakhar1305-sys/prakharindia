import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

export const SITE_URL = "https://prakharind.com";
export const ROOT_DIR = path.resolve(import.meta.dirname, "..");
export const EXCLUDED_PUBLIC_PAGES = new Set([
  "pages/admin.html",
  "pages/login.html",
  "pages/signup.html"
]);

const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " "
};

/** Decode basic HTML entities for clean metadata and word-count analysis. */
export function decodeEntities(value = "") {
  return value.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITY_MAP[m] || m);
}

/** Return normalized forward-slash paths of HTML pages across root, pages/, blog/, and flagship landing folders. */
export function getAllHtmlFiles({ includeExcluded = false } = {}) {
  const dirs = ["", "pages", "blog", "turnkey-house-construction-varanasi"];
  const results = [];

  for (const dir of dirs) {
    const absDir = path.join(ROOT_DIR, dir);
    if (!fs.existsSync(absDir)) continue;
    for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
      const rel = dir ? `${dir}/${entry.name}` : entry.name;
      if (!includeExcluded && EXCLUDED_PUBLIC_PAGES.has(rel)) continue;
      results.push(rel);
    }
  }
  return results.sort();
}

/** Convert a relative HTML file path into its canonical https://prakharind.com URL. */
export function toPublicUrl(relPath) {
  const clean = relPath.replace(/\\/g, "/");
  if (clean === "index.html") return `${SITE_URL}/`;
  if (clean === "blog/index.html") return `${SITE_URL}/blog/`;
  if (clean === "turnkey-house-construction-varanasi/index.html") return `${SITE_URL}/turnkey-house-construction-varanasi/`;
  return `${SITE_URL}/${clean}`;
}

/** Resolve last modification date (YYYY-MM-DD and full ISO) via git history or file mtime. */
export function getFileDates(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: ROOT_DIR,
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim();
    if (out) {
      return { iso: out, ymd: out.slice(0, 10) };
    }
  } catch {
    // Fall back to filesystem mtime below when file is untracked or git unavailable.
  }
  const stat = fs.statSync(path.join(ROOT_DIR, relPath));
  const iso = stat.mtime.toISOString();
  return { iso, ymd: iso.slice(0, 10) };
}

/** Extract `<meta>` content attribute regardless of attribute order. */
export function getMetaContent(html, attrName, attrValue) {
  const tagRegex = /<meta\s+[^>]*>/gi;
  const escaped = attrValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nameRe = new RegExp(`\\b${attrName}=["']${escaped}["']`, "i");
  const contentRe = /\bcontent=["']([^"']*)["']/i;

  for (const match of html.matchAll(tagRegex)) {
    const tag = match[0];
    if (!nameRe.test(tag)) continue;
    const cm = tag.match(contentRe);
    if (cm) return decodeEntities(cm[1].trim());
  }
  return "";
}

/** Extract first `<link rel="...">` href attribute regardless of attribute order. */
export function getLinkHref(html, relValue) {
  const tagRegex = /<link\s+[^>]*>/gi;
  const relRe = new RegExp(`\\brel=["'][^"']*\\b${relValue}\\b[^"']*["']`, "i");
  const hrefRe = /\bhref=["']([^"']*)["']/i;

  for (const match of html.matchAll(tagRegex)) {
    const tag = match[0];
    if (!relRe.test(tag)) continue;
    const hm = tag.match(hrefRe);
    if (hm) return hm[1].trim();
  }
  return "";
}

/** Extract inner text of all tags matching `tagName`, stripped of nested markup. */
export function extractTagTexts(html, tagName) {
  const re = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  const out = [];
  for (const m of html.matchAll(re)) {
    out.push(decodeEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()));
  }
  return out;
}

/** Extract visible text word count after stripping scripts, styles, and tags. */
export function countVisibleWords(html) {
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const target = bodyMatch ? bodyMatch[1] : html;
  const stripped = target
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return stripped ? stripped.split(" ").length : 0;
}

/** Parse all JSON-LD blocks and return `{ count, errors, types }`. */
export function parseJsonLdBlocks(html) {
  const re = /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let count = 0;
  const errors = [];
  const types = new Set();

  const collectTypes = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(collectTypes);
      return;
    }
    if (Array.isArray(node["@type"])) {
      node["@type"].forEach((t) => types.add(String(t)));
    } else if (node["@type"]) {
      types.add(String(node["@type"]));
    }
    if (Array.isArray(node["@graph"])) {
      node["@graph"].forEach(collectTypes);
    }
    for (const val of Object.values(node)) {
      if (val && typeof val === "object") collectTypes(val);
    }
  };

  for (const match of html.matchAll(re)) {
    count += 1;
    try {
      const parsed = JSON.parse(match[1].trim());
      collectTypes(parsed);
    } catch (err) {
      errors.push(err.message);
    }
  }
  return { count, errors, types: Array.from(types) };
}

/** Extract `<img ...>` metadata for SEO and CLS auditing. */
export function extractImages(html) {
  const out = [];
  for (const match of html.matchAll(/<img\s+([^>]*)>/gi)) {
    const attrs = match[1];
    const getAttr = (name) => {
      const m = attrs.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
      return m ? m[1].trim() : null;
    };
    out.push({
      src: getAttr("src") || "",
      alt: getAttr("alt"),
      width: getAttr("width"),
      height: getAttr("height"),
      loading: getAttr("loading")
    });
  }
  return out;
}

/** Resolve a local href/src attribute relative to `fromRelPath` into a workspace-relative path, or null if external/non-file. */
export function resolveLocalTarget(rawRef, fromRelPath) {
  if (!rawRef) return null;
  const ref = rawRef.split("#")[0].split("?")[0].trim();
  if (!ref) return null;
  if (/^(?:mailto:|tel:|javascript:|data:|sms:|whatsapp:)/i.test(ref)) return null;

  let pathname = ref;
  if (/^https?:\/\//i.test(ref)) {
    if (!ref.startsWith(SITE_URL)) return null;
    pathname = ref.slice(SITE_URL.length) || "/";
  }

  if (pathname === "/") return "index.html";
  if (pathname === "/blog" || pathname === "/blog/") return "blog/index.html";
  if (pathname === "/turnkey-house-construction-varanasi" || pathname === "/turnkey-house-construction-varanasi/") {
    return "turnkey-house-construction-varanasi/index.html";
  }

  const baseDir = path.posix.dirname(fromRelPath.replace(/\\/g, "/"));
  const joined = pathname.startsWith("/")
    ? pathname.slice(1)
    : path.posix.normalize(path.posix.join(baseDir === "." ? "" : baseDir, pathname));

  if (joined.endsWith("/")) return `${joined}index.html`;
  return joined;
}

/** Extract existing `<url>` entries from a sitemap XML file into a Map keyed by `<loc>`. */
export function readSitemapMap(xmlFilename) {
  const filePath = path.join(ROOT_DIR, xmlFilename);
  const map = new Map();
  if (!fs.existsSync(filePath)) return map;
  const xml = fs.readFileSync(filePath, "utf8");
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const block = match[1];
    const getTag = (tag) => {
      const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
      return m ? m[1].trim() : "";
    };
    const loc = getTag("loc");
    if (!loc) continue;
    map.set(loc, {
      loc,
      lastmod: getTag("lastmod"),
      changefreq: getTag("changefreq"),
      priority: getTag("priority")
    });
  }
  return map;
}
