// citation-probe.ts — GEO-02: close the measurement loop.
//
// The swarm optimizes a proxy (regex citability score) but never checked the
// real outcome: does an AI answer engine actually cite our pages? This probe
// asks Perplexity (sonar) each page's target query and records whether our
// domain appears in the answer's citations, onto GeoPageTriage — where Pulse,
// Retrofit, and Cortex already read from.
//
// Budget: `limit` pages per run (default 10), rotating through pages not
// probed in the last PROBE_STALE_DAYS, highest GSC impressions first.
// ponytail: single engine (Perplexity); add Gemini as a second engine when
// this data proves useful.

import { PrismaClient, Prisma } from "@prisma/client";

const PROBE_STALE_DAYS = 7;
const PERPLEXITY_TIMEOUT_MS = 30_000;

export type ProbeOutcome = {
  slug: string;
  query: string;
  cited: boolean;
  sourceUrl?: string;
  error?: string;
};

export type ProbeResult = {
  probed: number;
  cited: number;
  errors: number;
  outcomes: ProbeOutcome[];
};

// Pure — unit-testable. Does any citation URL belong to our host?
export function findOwnCitation(citations: unknown, host: string): string | undefined {
  if (!Array.isArray(citations)) return undefined;
  for (const c of citations) {
    const url = typeof c === "string" ? c : typeof (c as { url?: unknown })?.url === "string" ? (c as { url: string }).url : null;
    if (!url) continue;
    try {
      const h = new URL(url).host.replace(/^www\./, "");
      if (h === host.replace(/^www\./, "")) return url;
    } catch {
      // not a URL — skip
    }
  }
  return undefined;
}

// Pure — unit-testable. Best probe query for a triage row.
export function pickProbeQuery(row: {
  slug: string;
  topQueries?: unknown;
  opportunityQuery?: string | null;
  articleTitle?: string | null;
}): string {
  const top = Array.isArray(row.topQueries)
    ? (row.topQueries as { query?: unknown }[]).find((q) => typeof q?.query === "string")
    : undefined;
  if (top) return (top as { query: string }).query;
  if (row.opportunityQuery) return row.opportunityQuery;
  if (row.articleTitle) return row.articleTitle;
  return row.slug.replace(/-/g, " ");
}

async function askPerplexity(query: string, apiKey: string): Promise<unknown[]> {
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "sonar",
      messages: [{ role: "user", content: query }],
      max_tokens: 512,
    }),
    signal: AbortSignal.timeout(PERPLEXITY_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Perplexity ${res.status}`);
  const data = (await res.json()) as { citations?: unknown[]; search_results?: { url?: string }[] };
  // Perplexity has returned citations as `citations` (string[]) and newer
  // `search_results` ([{url}]) — accept both.
  return data.citations ?? data.search_results ?? [];
}

export async function runCitationProbe(
  prisma: PrismaClient,
  opts: { limit?: number } = {}
): Promise<ProbeResult> {
  const limit = Math.min(25, Math.max(1, opts.limit ?? Number(process.env.GEO_PROBE_DAILY_LIMIT ?? 10)));
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) throw new Error("PERPLEXITY_API_KEY not configured");

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";
  const host = new URL(siteUrl).host;

  const staleBefore = new Date(Date.now() - PROBE_STALE_DAYS * 24 * 60 * 60 * 1000);
  const rows = await prisma.geoPageTriage.findMany({
    where: {
      OR: [{ lastCitationProbeAt: null }, { lastCitationProbeAt: { lt: staleBefore } }],
      tier: { notIn: ["kill", "merge"] },
    },
    orderBy: [{ gscImpressions28d: { sort: "desc", nulls: "last" } }],
    take: limit,
    select: { slug: true, topQueries: true },
  });

  const result: ProbeResult = { probed: 0, cited: 0, errors: 0, outcomes: [] };
  if (rows.length === 0) return result;

  const slugs = rows.map((r) => r.slug);
  const [opps, articles] = await Promise.all([
    prisma.geoOpportunity.findMany({ where: { pageSlug: { in: slugs } }, select: { pageSlug: true, query: true } }),
    prisma.article.findMany({ where: { slug: { in: slugs } }, select: { slug: true, title: true } }),
  ]);
  const oppBySlug = new Map(opps.map((o) => [o.pageSlug, o.query]));
  const titleBySlug = new Map(articles.map((a) => [a.slug, a.title]));

  for (const row of rows) {
    const query = pickProbeQuery({
      slug: row.slug,
      topQueries: row.topQueries,
      opportunityQuery: oppBySlug.get(row.slug) ?? null,
      articleTitle: titleBySlug.get(row.slug) ?? null,
    });

    const checkedAt = new Date();
    try {
      const citations = await askPerplexity(query, apiKey);
      const sourceUrl = findOwnCitation(citations, host);
      const cited = Boolean(sourceUrl);
      await prisma.geoPageTriage.update({
        where: { slug: row.slug },
        data: {
          aiCited: cited,
          aiCitedDetails: { perplexity: { cited, query, sourceUrl: sourceUrl ?? null, checkedAt: checkedAt.toISOString() } } as Prisma.InputJsonValue,
          lastCitationProbeAt: checkedAt,
        },
      });
      result.probed++;
      if (cited) result.cited++;
      result.outcomes.push({ slug: row.slug, query, cited, sourceUrl });
    } catch (e) {
      // Record the probe attempt so one bad page doesn't get re-picked forever.
      const message = e instanceof Error ? e.message.slice(0, 200) : String(e);
      await prisma.geoPageTriage
        .update({ where: { slug: row.slug }, data: { lastCitationProbeAt: checkedAt } })
        .catch(() => {});
      result.errors++;
      result.outcomes.push({ slug: row.slug, query, cited: false, error: message });
    }
  }

  return result;
}
