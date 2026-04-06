/**
 * scripts/submit-indexnow.ts
 *
 * CLI script to submit all sitemap URLs to IndexNow for instant indexing.
 * Run after deploys or content updates:
 *
 *   npx tsx scripts/submit-indexnow.ts
 *
 * Requires:
 *   INDEXNOW_KEY env var
 *   NEXT_PUBLIC_APP_URL env var (defaults to https://learnanything.pro)
 */

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.error("❌ INDEXNOW_KEY environment variable not set.");
  console.error("   Generate one: openssl rand -hex 16");
  console.error("   Then set it in .env and deploy the key file to /public/{key}.txt");
  process.exit(1);
}

// All public routes that should be indexed
const ROUTES = [
  "/",
  "/learn",
  "/pricing",
  "/explore",
  "/interview-prep",
  "/jobs",
  "/daily-challenge",
  "/leaderboard",
  "/social",
  "/role-roadmaps",
  "/interview-sprint",
  "/invite",
  "/llms.txt",
];

async function submitToIndexNow() {
  const host = new URL(SITE_URL).host;
  const absoluteUrls = ROUTES.map((r) => `${SITE_URL}${r}`);

  console.log(`\n🚀 Submitting ${absoluteUrls.length} URLs to IndexNow...`);
  console.log(`   Host: ${host}`);
  console.log(`   Key: ${INDEXNOW_KEY!.slice(0, 8)}...`);
  console.log("");

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: absoluteUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`✅ Successfully submitted ${absoluteUrls.length} URLs!`);
      console.log("   These will be indexed by Bing, Yandex, Seznam, and Naver.");
      console.log("   Bing index feeds ChatGPT, Perplexity, and Claude.");
      console.log("\nSubmitted URLs:");
      absoluteUrls.forEach((url) => console.log(`   ${url}`));
    } else {
      const errorText = await res.text().catch(() => "Unknown");
      console.error(`❌ IndexNow API returned ${res.status}: ${errorText}`);
    }
  } catch (err) {
    console.error("❌ Failed to reach IndexNow API:", err);
  }
}

submitToIndexNow();
