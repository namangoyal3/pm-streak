/**
 * Shared PM job scraper logic — used by both:
 *   - scripts/scrape-pm-jobs.ts  (manual runs)
 *   - /api/cron/scrape-jobs       (Vercel cron, every 6 hours)
 *
 * Sources:
 *   1. Himalayas      — remote JSON API
 *   2. Remotive       — remote JSON API
 *   3. We Work Remotely — RSS feed
 *   4. Remote OK      — remote JSON API
 *   5. Indeed         — RSS feed (aggregates LinkedIn + others)
 *   6. LinkedIn       — jsearch via RapidAPI (requires RAPIDAPI_KEY env var)
 *   7. YC Work at a Startup — cheerio page scrape
 *   8. Greenhouse boards   — public JSON APIs for PM-heavy companies
 */
import * as cheerio from "cheerio";
import { PlaywrightCrawler, Configuration } from "crawlee";

// rss-parser ships CJS; dynamic import keeps Next.js edge/server happy
async function getRssParser() {
  const { default: Parser } = await import("rss-parser");
  return new Parser({ timeout: 10000 });
}

// ─── Normalised job shape ────────────────────────────────────────────────────

export interface NormJob {
  title: string;
  company: string;
  applyUrl: string;
  description: string | null;
  remote: boolean;
  location: string | null;
  tags: string[];
  postedAt: Date | null;
  source: string;
}

export interface ScraperSummary {
  source: string;
  fetched: number;
  valid: number;
  created: number;
  refreshed: number;
}

// ─── Title filter ────────────────────────────────────────────────────────────

const PM_TITLE_PATTERNS = [
  "product manager", "product management", "product lead",
  "head of product", "vp of product", "vp, product", "vp product",
  "director of product", "director, product",
  "principal pm", "group pm", "staff pm", "senior pm", "sr. pm",
  "associate product", "associate pm", " apm",
  "growth pm", "ai pm", "founding pm",
  "full stack", "fullstack", "full-stack",
  "founding engineer", "ai engineer",
  "product engineer", "product ops", "product operations",
  "product strategy", "product analyst",
  "technical product",
];

export function isPMJob(title: string): boolean {
  const t = title.toLowerCase();
  return PM_TITLE_PATTERNS.some((p) => t.includes(p));
}

export function extractTags(title: string, extra: string[] = []): string[] {
  const tags = new Set<string>(extra.filter(Boolean).slice(0, 3));
  const t = title.toLowerCase();
  if (t.includes("senior") || t.includes("sr.") || t.includes("staff")) tags.add("Senior");
  if (t.includes("principal")) tags.add("Principal");
  if (t.includes("director") || t.includes("head of") || t.includes("vp")) tags.add("Leadership");
  if (t.includes("growth")) tags.add("Growth PM");
  if (t.includes("ai ") || t.includes(" ai") || t.includes(" ml ") || t.includes("machine learning")) tags.add("AI PM");
  if (t.includes("full stack") || t.includes("fullstack") || t.includes("full-stack")) tags.add("Full Stack");
  if (t.includes("founding")) tags.add("Founding");
  if (t.includes("associate") || t.includes(" apm")) tags.add("APM");
  if (t.includes("data") || t.includes("analytics")) tags.add("Data PM");
  if (t.includes("platform")) tags.add("Platform PM");
  if (t.includes("technical")) tags.add("Technical PM");
  if (!tags.size) tags.add("PM");
  return Array.from(tags).slice(0, 5);
}

// ─── Helper ──────────────────────────────────────────────────────────────────

async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "pm-streak-bot/1.0", ...(options?.headers as Record<string, string> ?? {}) },
      signal: AbortSignal.timeout(9000),
      ...options,
    });
    if (!res.ok) { console.warn(`  ⚠ ${url} → HTTP ${res.status}`); return null; }
    return res;
  } catch (err) {
    console.warn(`  ⚠ fetch failed: ${url} —`, err instanceof Error ? err.message : String(err));
    return null;
  }
}

// ─── Source 1: Himalayas ─────────────────────────────────────────────────────

interface HimalayasJob {
  title: string;
  companyName: string;
  applicationLink: string;
  excerpt?: string | null;
  categories?: string[];
  seniority?: string[];
  pubDate?: string | null;
  locationRestrictions?: string[];
}

export async function fetchHimalayas(): Promise<NormJob[]> {
  const queries = ["product manager", "AI product manager", "full stack engineer", "founding engineer"];
  const seen = new Set<string>();
  const all: NormJob[] = [];
  for (const q of queries) {
    const res = await safeFetch(`https://himalayas.app/jobs/api?q=${encodeURIComponent(q)}&limit=30`);
    if (!res) continue;
    const data = await res.json() as { jobs?: HimalayasJob[] };
    for (const j of data.jobs ?? []) {
      if (!j.applicationLink || seen.has(j.applicationLink)) continue;
      seen.add(j.applicationLink);
      all.push({
        title: j.title, company: j.companyName, applyUrl: j.applicationLink,
        description: j.excerpt?.slice(0, 500) ?? null,
        remote: !j.locationRestrictions?.length,
        location: j.locationRestrictions?.join(", ") || null,
        tags: extractTags(j.title, [...(j.categories ?? []).slice(0, 2), ...(j.seniority ?? []).slice(0, 1)]),
        postedAt: j.pubDate ? new Date(j.pubDate) : null, source: "himalayas",
      });
    }
  }
  return all;
}

// ─── Source 2: Remotive ──────────────────────────────────────────────────────

interface RemotiveJob {
  url: string; title: string; company_name: string;
  description?: string; candidate_required_location?: string;
  tags?: string[]; publication_date?: string;
}

export async function fetchRemotive(): Promise<NormJob[]> {
  const seen = new Set<string>();
  const all: NormJob[] = [];
  for (const cat of ["product", "engineering"]) {
    const res = await safeFetch(`https://remotive.com/api/remote-jobs?category=${cat}&limit=50`);
    if (!res) continue;
    const data = await res.json() as { jobs?: RemotiveJob[] };
    for (const j of data.jobs ?? []) {
      if (!j.url || seen.has(j.url)) continue;
      seen.add(j.url);
      all.push({
        title: j.title, company: j.company_name, applyUrl: j.url,
        description: j.description ? j.description.replace(/<[^>]+>/g, "").slice(0, 500) : null,
        remote: true, location: j.candidate_required_location ?? null,
        tags: extractTags(j.title, j.tags?.slice(0, 2) ?? []),
        postedAt: j.publication_date ? new Date(j.publication_date) : null, source: "remotive",
      });
    }
  }
  return all;
}

// ─── Source 3: We Work Remotely RSS ──────────────────────────────────────────

export async function fetchWeWorkRemotely(): Promise<NormJob[]> {
  const parser = await getRssParser();
  const feeds = [
    "https://weworkremotely.com/categories/remote-product-jobs.rss",
    "https://weworkremotely.com/categories/remote-full-stack-programming-jobs.rss",
    "https://weworkremotely.com/categories/remote-management-finance-jobs.rss",
  ];
  const all: NormJob[] = [];
  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of feed.items) {
        const title = item.title?.trim() ?? "";
        const url = item.link?.trim() ?? "";
        if (!url) continue;
        const colonIdx = title.indexOf(":");
        const role = colonIdx > -1 ? title.slice(colonIdx + 1).trim() : title;
        const company = colonIdx > -1 ? title.slice(0, colonIdx).trim() : "Unknown";
        all.push({
          title: role, company, applyUrl: url,
          description: item.contentSnippet?.slice(0, 500) ?? null,
          remote: true, location: null,
          tags: extractTags(role),
          postedAt: item.pubDate ? new Date(item.pubDate) : null, source: "weworkremotely",
        });
      }
    } catch (err) {
      console.warn(`  ⚠ WWR RSS failed:`, err instanceof Error ? err.message : String(err));
    }
  }
  return all;
}

// ─── Source 4: Remote OK ─────────────────────────────────────────────────────

interface RemoteOKJob {
  url: string; position: string; company: string;
  description?: string; location?: string; tags?: string[]; date?: string;
}

export async function fetchRemoteOK(): Promise<NormJob[]> {
  const seen = new Set<string>();
  const all: NormJob[] = [];
  for (const tag of ["product-manager", "ai", "full-stack", "engineer"]) {
    const res = await safeFetch(`https://remoteok.com/api?tag=${tag}`);
    if (!res) continue;
    const data = await res.json() as RemoteOKJob[];
    for (const j of data.slice(1)) {
      if (!j.url || seen.has(j.url)) continue;
      seen.add(j.url);
      all.push({
        title: j.position, company: j.company, applyUrl: j.url,
        description: j.description ? j.description.replace(/<[^>]+>/g, "").slice(0, 500) : null,
        remote: true, location: j.location ?? null,
        tags: extractTags(j.position, j.tags?.slice(0, 2) ?? []),
        postedAt: j.date ? new Date(j.date) : null, source: "remoteok",
      });
    }
  }
  return all;
}

// ─── Source 5: Indeed RSS ────────────────────────────────────────────────────
// Indeed aggregates jobs from LinkedIn, company sites, Glassdoor & more.

export async function fetchIndeed(): Promise<NormJob[]> {
  const parser = await getRssParser();
  const queries = [
    "product+manager+remote",
    "AI+product+manager",
    "founding+engineer+remote",
    "full+stack+engineer+remote",
  ];
  const seen = new Set<string>();
  const all: NormJob[] = [];
  for (const q of queries) {
    try {
      const feed = await parser.parseURL(
        `https://www.indeed.com/rss?q=${q}&sort=date&radius=25&limit=50`
      );
      for (const item of feed.items) {
        const title = item.title?.trim() ?? "";
        const url = item.link?.trim() ?? "";
        if (!url || seen.has(url)) continue;
        seen.add(url);
        // Indeed title format: "Job Title - Company Name - Location"
        const parts = title.split(" - ");
        const role = parts[0]?.trim() ?? title;
        const company = parts[1]?.trim() ?? "Unknown";
        all.push({
          title: role, company, applyUrl: url,
          description: item.contentSnippet?.slice(0, 500) ?? null,
          remote: title.toLowerCase().includes("remote") || q.includes("remote"),
          location: parts[2]?.trim() ?? null,
          tags: extractTags(role),
          postedAt: item.pubDate ? new Date(item.pubDate) : null, source: "indeed",
        });
      }
    } catch (err) {
      console.warn(`  ⚠ Indeed RSS failed for "${q}":`, err instanceof Error ? err.message : String(err));
    }
  }
  return all;
}

// ─── Source 6: LinkedIn/Google Jobs via jsearch-mega (RapidAPI) ─────────────
// Uses jsearch-mega which aggregates LinkedIn, Google Jobs, Indeed & more.
// Requires RAPIDAPI_KEY env var.

export async function fetchLinkedIn(): Promise<NormJob[]> {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.log("  ℹ LinkedIn/jsearch-mega: RAPIDAPI_KEY not set — skipping");
    return [];
  }
  const queries = [
    "product manager remote",
    "AI product manager",
    "senior product manager",
    "full stack engineer remote",
    "founding engineer startup",
    "associate product manager",
  ];
  const seen = new Set<string>();
  const all: NormJob[] = [];
  for (const q of queries) {
    const res = await safeFetch(
      `https://jsearch-mega.p.rapidapi.com/search?query=${encodeURIComponent(q)}&num_pages=1&date_posted=week`,
      { headers: { "x-rapidapi-key": apiKey, "x-rapidapi-host": "jsearch-mega.p.rapidapi.com" } }
    );
    if (!res) continue;
    const data = await res.json() as { data?: Array<{
      job_title: string; employer_name: string; job_apply_link: string;
      job_description?: string; job_city?: string; job_country?: string;
      job_is_remote?: boolean; job_employment_type?: string;
      job_posted_at_datetime_utc?: string; job_publisher?: string;
    }> };
    for (const j of data.data ?? []) {
      const url = j.job_apply_link;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      const location = [j.job_city, j.job_country].filter(Boolean).join(", ") || null;
      all.push({
        title: j.job_title, company: j.employer_name, applyUrl: url,
        description: j.job_description?.replace(/<[^>]+>/g, "").slice(0, 500) ?? null,
        remote: j.job_is_remote ?? q.includes("remote"),
        location,
        tags: extractTags(j.job_title, j.job_employment_type ? [j.job_employment_type] : []),
        postedAt: j.job_posted_at_datetime_utc ? new Date(j.job_posted_at_datetime_utc) : null,
        source: "linkedin",
      });
    }
  }
  return all;
}

// ─── Source 7: YC Work at a Startup (via Crawlee for retries + anti-bot) ────

export async function fetchYCStartups(): Promise<NormJob[]> {
  const all: NormJob[] = [];

  // Silence Crawlee's internal storage/logging for library use
  Configuration.getGlobalConfig().set("persistStorage", false);

  const crawler = new PlaywrightCrawler({
    maxRequestRetries: 3,
    requestHandlerTimeoutSecs: 45,
    navigationTimeoutSecs: 30,
    launchContext: { launchOptions: { headless: true } },
    async requestHandler({ page }) {
      // Wait for job listings to render (YC site uses .job-name for each listing)
      await page.waitForSelector(".job-name", { timeout: 15000 }).catch(() => {});
      const html = await page.content();
      const $ = cheerio.load(html);
      // Each job row: .job-name a[href*="/jobs/"] is the title link
      $(".job-name").each((_i, el) => {
        const $el = $(el);
        const $a = $el.find("a[href*='/jobs/']").first();
        const title = $a.text().trim();
        const href = $a.attr("href") ?? "";
        if (!title || !href) return;
        const url = href.startsWith("http") ? href : `https://www.workatastartup.com${href}`;
        // Company name is in nearest ancestor row's company link
        const $row = $el.closest(".mt-2").prev().find("a[href*='/companies/']").first();
        const company = $row.text().trim() || "YC Startup";
        all.push({
          title, company, applyUrl: url,
          description: null,
          remote: true, location: null,
          tags: extractTags(title, ["YC"]),
          postedAt: null, source: "yc",
        });
      });
    },
    async failedRequestHandler({ request }) {
      console.warn(`  ⚠ YC Crawlee failed after retries: ${request.url}`);
    },
  });

  try {
    // Use the canonical PM jobs listing URL (remote)
    await crawler.run(["https://www.workatastartup.com/jobs/r/product-manager"]);
  } catch (err) {
    console.warn(`  ⚠ YC Crawlee error:`, err instanceof Error ? err.message : String(err));
  }

  return all;
}

// ─── Source 8: Greenhouse boards (top PM-heavy companies) ────────────────────

const GREENHOUSE_COMPANIES = [
  { slug: "stripe",    name: "Stripe" },
  { slug: "notion",    name: "Notion" },
  { slug: "figma",     name: "Figma" },
  { slug: "airbnb",    name: "Airbnb" },
  { slug: "linear",    name: "Linear" },
  { slug: "vercel",    name: "Vercel" },
  { slug: "retool",    name: "Retool" },
  { slug: "loom",      name: "Loom" },
  { slug: "airtable",  name: "Airtable" },
  { slug: "brex",      name: "Brex" },
  { slug: "rippling",  name: "Rippling" },
  { slug: "lattice",   name: "Lattice" },
  { slug: "ramp",      name: "Ramp" },
];

interface GreenhouseJob {
  id: number; title: string; absolute_url: string;
  location?: { name?: string }; updated_at?: string;
  departments?: Array<{ name?: string }>;
}

export async function fetchGreenhouse(): Promise<NormJob[]> {
  const all: NormJob[] = [];
  // Run in parallel batches of 4 to stay polite
  const batches = [];
  for (let i = 0; i < GREENHOUSE_COMPANIES.length; i += 4) {
    batches.push(GREENHOUSE_COMPANIES.slice(i, i + 4));
  }
  for (const batch of batches) {
    const results = await Promise.allSettled(
      batch.map(async ({ slug, name }) => {
        const res = await safeFetch(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=false`);
        if (!res) return [];
        const data = await res.json() as { jobs?: GreenhouseJob[] };
        return (data.jobs ?? []).map((j): NormJob => ({
          title: j.title, company: name, applyUrl: j.absolute_url,
          description: null,
          remote: j.location?.name?.toLowerCase().includes("remote") ?? false,
          location: j.location?.name ?? null,
          tags: extractTags(j.title, j.departments?.map((d) => d.name ?? "").filter(Boolean).slice(0, 1) ?? []),
          postedAt: j.updated_at ? new Date(j.updated_at) : null, source: "greenhouse",
        }));
      })
    );
    for (const r of results) {
      if (r.status === "fulfilled") all.push(...r.value);
    }
  }
  return all;
}

// ─── All sources registry ────────────────────────────────────────────────────

export const JOB_SOURCES: Record<string, () => Promise<NormJob[]>> = {
  himalayas:      fetchHimalayas,
  remotive:       fetchRemotive,
  weworkremotely: fetchWeWorkRemotely,
  remoteok:       fetchRemoteOK,
  indeed:         fetchIndeed,
  linkedin:       fetchLinkedIn,
  yc:             fetchYCStartups,
  greenhouse:     fetchGreenhouse,
};
