/**
 * scripts/gsc-metrics.mjs — real Google Search Console truth for the SEO pipeline.
 *
 * Pulls what scraping can't: how many sitemap URLs Google has actually indexed,
 * and 28-day impressions/clicks/position. Dependency-free — signs the service-
 * account JWT with node:crypto (no jose), so the pipeline stays stdlib-only.
 *
 * Env (from ~/.zshenv managed block):
 *   GSC_SITE_URL             e.g. "sc-domain:learnanything.pro"
 *   GA4_SERVICE_ACCOUNT_KEY  service-account JSON (also granted on the GSC property)
 *
 * Returns null (clean no-op) when env is absent or any call fails — the pipeline
 * treats missing GSC data as "not checked", never as a regression.
 */
import { createSign } from "node:crypto";

const b64url = (buf) =>
  Buffer.from(buf).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

async function accessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: key.client_email,
      sub: key.client_email,
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const sig = b64url(createSign("RSA-SHA256").update(`${header}.${claim}`).sign(key.private_key));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${sig}`,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`GSC token: ${JSON.stringify(data)}`);
  return data.access_token;
}

export async function gscMetrics() {
  const site = process.env.GSC_SITE_URL;
  const raw = process.env.GA4_SERVICE_ACCOUNT_KEY;
  if (!site || !raw) return null;
  try {
    const key = JSON.parse(raw);
    const tok = await accessToken(key);
    const enc = encodeURIComponent(site);
    const auth = { Authorization: `Bearer ${tok}` };

    // Indexed-URL count Google reports for our submitted sitemap.
    let sitemapIndexed = null,
      sitemapSubmitted = null;
    try {
      const sm = await (
        await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps`, { headers: auth })
      ).json();
      const ours = (sm.sitemap || []).find((s) => s.path.includes("sitemap.xml")) || (sm.sitemap || [])[0];
      const web = ours?.contents?.find((c) => c.type === "web") || ours?.contents?.[0];
      if (web) {
        sitemapIndexed = Number(web.indexed);
        sitemapSubmitted = Number(web.submitted);
      }
    } catch {
      /* leave null */
    }

    // 28-day search performance (data lags ~2-3 days; totals over the window).
    const end = new Date(Date.now() - 2 * 864e5).toISOString().slice(0, 10);
    const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
    let impressions = 0,
      clicks = 0,
      topQuery = null;
    try {
      const sa = await (
        await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
          method: "POST",
          headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 5 }),
        })
      ).json();
      for (const r of sa.rows || []) {
        impressions += r.impressions;
        clicks += r.clicks;
      }
      if (sa.rows?.length) {
        const t = sa.rows[0];
        topQuery = { q: t.keys[0], impressions: t.impressions, pos: Math.round(t.position * 10) / 10 };
      }
    } catch {
      /* leave zeros */
    }

    return { sitemapIndexed, sitemapSubmitted, impressions, clicks, topQuery };
  } catch (e) {
    console.error(`GSC metrics skipped: ${e.message.split("\n")[0]}`);
    return null;
  }
}
