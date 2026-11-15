import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { ROOT_DIR, SITE_URL } from "./seo-lib.mjs";

const DESKTOP_AGENT_DIR = path.join(
  process.env.USERPROFILE || ROOT_DIR,
  "OneDrive",
  "Desktop",
  "Prakhar-SEO-Agent"
);
const REPORT_PATH = path.join(DESKTOP_AGENT_DIR, "latest-seo-report.md");
const LOG_PATH = path.join(DESKTOP_AGENT_DIR, "autopilot-history.log");

const LIVE_URLS = [
  `${SITE_URL}/`,
  `${SITE_URL}/pages/real-estate-mirzapur.html`,
  `${SITE_URL}/pages/plots-in-mirzapur.html`,
  `${SITE_URL}/blog/vindhyachal-corridor-plots-for-sale-mirzapur-real-estate.html`,
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/sitemap-blog.xml`,
  `${SITE_URL}/rss.xml`,
  `${SITE_URL}/2fcc7028924e5e4b150b89e294b0876d.txt`
];

function runStep(label, cmd) {
  console.log(`\n[Autopilot] ${label}...`);
  const out = execSync(cmd, { cwd: ROOT_DIR, encoding: "utf8" });
  process.stdout.write(out);
  return out.trim();
}

function getGitChanges() {
  return execSync("git status --porcelain", { cwd: ROOT_DIR, encoding: "utf8" })
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

async function checkLiveEndpoints() {
  const checks = [];
  for (const url of LIVE_URLS) {
    const start = Date.now();
    try {
      const res = await fetch(url);
      checks.push({
        url,
        status: res.status,
        ms: Date.now() - start,
        cache: res.headers.get("cache-control") || "-"
      });
    } catch (err) {
      checks.push({ url, status: "ERR", ms: Date.now() - start, cache: err.message });
    }
  }
  return checks;
}

function writeDesktopReport({ audit, liveChecks, pushedCommit, indexNowOut, dirtyBefore }) {
  fs.mkdirSync(DESKTOP_AGENT_DIR, { recursive: true });
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const issuePages = audit.pages.filter((p) => p.issues.length > 0);
  const lowPages = audit.pages
    .filter((p) => p.score < 97)
    .sort((a, b) => a.score - b.score)
    .slice(0, 10);

  const lines = [
    `# Prakhar India Automated SEO Agent Report`,
    ``,
    `- **Last Run (IST):** ${now}`,
    `- **Site:** ${SITE_URL}`,
    `- **Public Pages Audited:** ${audit.pages.length}`,
    `- **Average SEO Score:** **${audit.avgScore}/100**`,
    `- **Critical Issues:** ${issuePages.length}`,
    `- **Orphan Pages:** ${audit.orphans.length}`,
    `- **Auto-Push Status:** ${pushedCommit}`,
    `- **IndexNow Ping:** ${indexNowOut}`,
    dirtyBefore.length ? `- **Note:** Local manual edits were already open before run, so auto-push was skipped for safety.` : ``,
    ``,
    `## Live Production URLs Check`,
    `| Status | Latency | URL |`,
    `| --- | --- | --- |`,
    ...liveChecks.map((c) => `| ${c.status} | ${c.ms} ms | ${c.url} |`),
    ``,
    `## Pages Below 97 Score (Optimization Queue)`,
    ...(lowPages.length
      ? lowPages.map(
          (p) => `- **${p.file}** (${p.score}/100): ${[...p.issues, ...p.warnings].filter((w) => !w.includes("main.js")).join(" ; ")}`
        )
      : [`- All pages are 97-100/100!`]),
    ``,
    `---`,
    `Generated automatically by **Prakhar SEO Autopilot Agent**.`
  ].filter((l) => l !== undefined);

  fs.writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");
  fs.appendFileSync(
    LOG_PATH,
    `[${now}] pages=${audit.pages.length} avg=${audit.avgScore}/100 orphans=${audit.orphans.length} live200=${liveChecks.filter((c) => c.status === 200).length}/${liveChecks.length} push="${pushedCommit}" indexnow="${indexNowOut}"\n`,
    "utf8"
  );
  console.log(`\n[Autopilot] Report updated: ${REPORT_PATH}`);
}

async function runCycle({ doPing, autoPush }) {
  const dirtyBefore = getGitChanges();

  runStep("1/4 Injecting SEO runtime plugins & noindex hygiene", "node scripts/seo-inject-plugin.mjs");
  try {
    runStep("2/4 Compressing any new images under 250KB", "python scripts/seo-optimize-images.py --quality 75 --apply");
  } catch (err) {
    console.warn("[Autopilot] Image optimizer skipped:", err.message);
  }
  runStep("3/4 Syncing sitemap.xml, sitemap-blog.xml & rss.xml", "node scripts/seo-sync.mjs");
  runStep("4/4 Running Rank-Math-style SEO Audit", "node scripts/seo-audit.mjs");

  const audit = JSON.parse(
    fs.readFileSync(path.join(ROOT_DIR, "scratch", "seo-audit-report.json"), "utf8")
  );

  let pushedCommit = "No new changes to push";
  if (autoPush) {
    if (dirtyBefore.length > 0) {
      pushedCommit = "Skipped (uncommitted local edits present)";
    } else if (getGitChanges().length > 0) {
      runStep(
        "Auto-committing & pushing SEO updates to origin/main",
        'git add -A && git commit -m "chore(seo): automated SEO agent sync & optimization" && git push origin main'
      );
      pushedCommit = "Pushed new SEO updates to origin/main";
      console.log("[Autopilot] Waiting 35s for Vercel edge deployment...");
      await new Promise((r) => setTimeout(r, 35000));
    }
  }

  const liveChecks = await checkLiveEndpoints();

  let indexNowOut = "Skipped (pass --ping to submit)";
  if (doPing) {
    try {
      const out = runStep("Pinging IndexNow (Bing / DuckDuckGo / Yandex / Copilot)", "node scripts/seo-indexnow.mjs");
      const match = out.match(/IndexNow Response:.*/);
      indexNowOut = match ? match[0] : "Submitted";
    } catch (err) {
      indexNowOut = `Failed: ${err.message}`;
    }
  }

  writeDesktopReport({ audit, liveChecks, pushedCommit, indexNowOut, dirtyBefore });
}

async function main() {
  const doPing = process.argv.includes("--ping");
  const autoPush = process.argv.includes("--auto-push");
  const watchMode = process.argv.includes("--watch");
  const hoursArg = process.argv.find((a) => a.startsWith("--hours="));
  const intervalHours = Math.max(1, Number(hoursArg ? hoursArg.split("=")[1] : 6) || 6);

  do {
    try {
      await runCycle({ doPing, autoPush });
    } catch (err) {
      console.error("[Autopilot Error]", err.message);
    }
    if (!watchMode) break;
    console.log(`\n[Autopilot] Next automatic SEO cycle in ${intervalHours} hour(s). Keep window open to continue...`);
    await new Promise((r) => setTimeout(r, intervalHours * 3600 * 1000));
  } while (watchMode);
}

main();
