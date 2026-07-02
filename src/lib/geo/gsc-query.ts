/**
 * Google Search Console query layer.
 * Uses the same service-account JWT auth pattern as GA4.
 * Documents the ranking data the swarm is completely blind to today.
 *
 * Env vars needed:
 *   GSC_SITE_URL — verified domain/property (e.g. "https://learnanything.pro")
 *   GA4_SERVICE_ACCOUNT_KEY — same service account JSON, also needs GSC permission
 */

import { SignJWT, importPKCS8 } from "jose";

const SITE_URL = process.env.GSC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
const SERVICE_ACCOUNT_KEY = process.env.GA4_SERVICE_ACCOUNT_KEY;

export type GscPageRow = {
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
};

export type GscQueryRow = {
  query: string;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
};

type GscDateRange = {
  startDate: string;  // "YYYY-MM-DD"
  endDate: string;    // "YYYY-MM-DD"
};

async function getAccessToken(serviceAccountKey: string): Promise<string> {
  const parsed = JSON.parse(serviceAccountKey);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("GA4_SERVICE_ACCOUNT_KEY must be a service account JSON string with client_email and private_key.");
  }
  const privateKey = await importPKCS8(parsed.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const assertion = await new SignJWT({
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(parsed.client_email)
    .setSubject(parsed.client_email)
    .setAudience(parsed.token_uri ?? "https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const res = await fetch(parsed.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`GSC OAuth ${res.status}: ${await res.text()}`);
  const data = await res.json();
  if (!data.access_token) throw new Error("GSC OAuth response did not include access_token.");
  return data.access_token;
}

function getDefaultDates(): GscDateRange {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 28); // GSC data lags ~2-3 days, use 28d window
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

/**
 * Query GSC for per-page ranking metrics.
 * Returns one row per page (filtered to /learn/ pages by default).
 */
export async function queryGscPages(
  dateRange: Partial<GscDateRange> = {},
  limit = 250
): Promise<{ configured: boolean; rows: GscPageRow[]; message?: string }> {
  if (!SERVICE_ACCOUNT_KEY) {
    return { configured: false, rows: [], message: "GA4_SERVICE_ACCOUNT_KEY not set." };
  }

  try {
    const { startDate, endDate } = { ...getDefaultDates(), ...dateRange };
    const accessToken = await getAccessToken(SERVICE_ACCOUNT_KEY);

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["page"],
          dimensionFilterGroups: [
            {
              filters: [
                {
                  dimension: "page",
                  operator: "contains",
                  expression: "/learn/",
                },
              ],
            },
          ],
          rowLimit: limit,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      // Common case: site not verified in GSC
      if (res.status === 403 && text.includes("not verified")) {
        return { configured: false, rows: [], message: "Site not verified in Google Search Console." };
      }
      // No data yet is normal for new sites
      if (res.status === 404) {
        return { configured: true, rows: [], message: "No GSC data available yet for this property." };
      }
      throw new Error(`GSC ${res.status}: ${text}`);
    }

    const data = await res.json();
    const rows: GscPageRow[] = (data.rows ?? []).map((r: any) => ({
      page: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      avgPosition: Math.round(r.position * 10) / 10,
    }));

    return { configured: true, rows };
  } catch (e) {
    return { configured: true, rows: [], message: (e as Error).message };
  }
}

/**
 * Query GSC for the search queries driving traffic to a specific page.
 * Returns the top queries for that page.
 */
export async function queryGscQueriesForPage(
  slug: string,
  limit = 20
): Promise<{ configured: boolean; rows: GscQueryRow[]; message?: string }> {
  if (!SERVICE_ACCOUNT_KEY) {
    return { configured: false, rows: [], message: "GA4_SERVICE_ACCOUNT_KEY not set." };
  }

  try {
    const { startDate, endDate } = getDefaultDates();
    const accessToken = await getAccessToken(SERVICE_ACCOUNT_KEY);

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["query"],
          dimensionFilterGroups: [
            {
              filters: [
                {
                  dimension: "page",
                  operator: "contains",
                  expression: slug,
                },
              ],
            },
          ],
          rowLimit: limit,
        }),
      }
    );

    if (!res.ok) {
      return { configured: true, rows: [], message: `GSC ${res.status}` };
    }

    const data = await res.json();
    const rows: GscQueryRow[] = (data.rows ?? []).map((r: any) => ({
      query: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      avgPosition: Math.round(r.position * 10) / 10,
    }));

    return { configured: true, rows };
  } catch (e) {
    return { configured: true, rows: [], message: (e as Error).message };
  }
}

/**
 * Site-wide GSC summary — total impressions, clicks, avg position, CTR.
 * Used by the health endpoint and Pulse for top-level visibility.
 */
export async function queryGscSummary(
  dateRange: Partial<GscDateRange> = {}
): Promise<{
  configured: boolean;
  impressions: number;
  clicks: number;
  ctr: number;
  avgPosition: number;
  message?: string;
}> {
  if (!SERVICE_ACCOUNT_KEY) {
    return { configured: false, impressions: 0, clicks: 0, ctr: 0, avgPosition: 0, message: "No service account key." };
  }

  try {
    const { startDate, endDate } = { ...getDefaultDates(), ...dateRange };
    const accessToken = await getAccessToken(SERVICE_ACCOUNT_KEY);

    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          startDate,
          endDate,
          rowLimit: 1,
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 403 && text.includes("not verified")) {
        return { configured: false, impressions: 0, clicks: 0, ctr: 0, avgPosition: 0, message: "Site not verified in GSC." };
      }
      return { configured: false, impressions: 0, clicks: 0, ctr: 0, avgPosition: 0, message: `GSC ${res.status}` };
    }

    const data = await res.json();
    if (!data.rows?.length) {
      return { configured: true, impressions: 0, clicks: 0, ctr: 0, avgPosition: 0, message: "No data yet." };
    }

    const r = data.rows[0];
    return {
      configured: true,
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      avgPosition: Math.round(r.position * 10) / 10,
    };
  } catch (e) {
    return { configured: false, impressions: 0, clicks: 0, ctr: 0, avgPosition: 0, message: (e as Error).message };
  }
}
