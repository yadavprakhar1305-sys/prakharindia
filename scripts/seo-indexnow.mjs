import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR, SITE_URL, readSitemapMap } from "./seo-lib.mjs";

const KEY_FILE_NAME = "2fcc7028924e5e4b150b89e294b0876d.txt";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function collectUrlsFromArgs() {
  const urlsArg = process.argv.find((a) => a.startsWith("--urls="));
  if (urlsArg) {
    return urlsArg
      .slice("--urls=".length)
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean);
  }
  return [
    ...readSitemapMap("sitemap.xml").keys(),
    ...readSitemapMap("sitemap-blog.xml").keys()
  ];
}

async function submitIndexNow() {
  const keyPath = path.join(ROOT_DIR, KEY_FILE_NAME);
  if (!fs.existsSync(keyPath)) {
    throw new Error(`Missing IndexNow key file: ${KEY_FILE_NAME}`);
  }
  const key = fs.readFileSync(keyPath, "utf8").trim();
  const keyLocation = `${SITE_URL}/${KEY_FILE_NAME}`;
  const urlList = collectUrlsFromArgs();
  const dryRun = process.argv.includes("--dry-run");

  if (urlList.length === 0) {
    console.log("No URLs to submit.");
    return;
  }

  console.log(`IndexNow Key URL : ${keyLocation}`);
  console.log(`URLs Prepared    : ${urlList.length}`);

  if (dryRun) {
    console.log("Dry-run mode enabled. Sample URLs:", urlList.slice(0, 5));
    return;
  }

  // Verify live host verification file first so IndexNow does not fail with 403/404.
  const verifyRes = await fetch(keyLocation);
  const verifyBody = verifyRes.ok ? (await verifyRes.text()).trim() : "";
  if (!verifyRes.ok || verifyBody !== key) {
    throw new Error(
      `Live verification file check failed (${verifyRes.status}). Deploy ${KEY_FILE_NAME} to Vercel before submitting.`
    );
  }

  const payload = {
    host: new URL(SITE_URL).hostname,
    key,
    keyLocation,
    urlList
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload)
  });

  const bodyText = await res.text();
  console.log(`IndexNow Response: HTTP ${res.status} ${res.statusText}${bodyText ? ` -> ${bodyText}` : ""}`);
  if (!res.ok) {
    process.exitCode = 1;
  }
}

submitIndexNow().catch((err) => {
  console.error("IndexNow error:", err.message);
  process.exitCode = 1;
});
