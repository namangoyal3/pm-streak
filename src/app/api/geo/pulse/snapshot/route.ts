import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";
import { prisma } from "@/lib/prisma";
import { parsePulseMetrics } from "@/lib/geo/safe-prisma";
import { queryGscPages, queryGscSummary } from "@/lib/geo/gsc-query";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });

  if (!process.env.GA4_PROPERTY_ID || !process.env.GA4_SERVICE_ACCOUNT_KEY) {
    return NextResponse.json(
      {
        ok: false,
        blocked: true,
        reason: "GA4 reporting is not configured. Set GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY before running Pulse.",
      },
      { status: 503 }
    );
  }

  try {
    // ── Pull GSC ranking data (site-wide + per-page) ─────────────────────
    const gscSummary = await queryGscSummary();
    const gscPages = await queryGscPages({}, 500);

    // Build a lookup map: path → GSC metrics
    const gscBySlug = new Map<string, (typeof gscPages.rows)[0]>();
    for (const row of gscPages.rows) {
      const slug = row.page.split("/").pop() ?? row.page;
      gscBySlug.set(slug, row);
    }

    // ── Run Pulse agent for GA4 metrics ──────────────────────────────────
    const pulsePrompt = gscSummary.configured
      ? `Take a daily performance snapshot. Write metrics to pulse_metrics.jsonl. Flag pages needing rewrites.

GSC 28-day summary: ${gscSummary.impressions} impressions, ${gscSummary.clicks} clicks, avg position ${gscSummary.avgPosition}, CTR ${(gscSummary.ctr * 100).toFixed(1)}%.
I already have per-page GSC ranking data stored separately — focus your analysis on GA4 session/lead trends.

After your analysis, append a trailing \`\`\`json block (array) with one entry per page you analyzed:
[{ "slug": "...", "sessions30d": <number>, "leads30d": <number>, "citability": <number|null> }]
This block is machine-parsed to update the self-improvement queue — include it even if sessions are 0.`
      : `Take a daily performance snapshot. Write metrics to pulse_metrics.jsonl.

⚠ No GSC data available — ranking data is blind. Focus on GA4 session data only.

After your analysis, append a trailing \`\`\`json block (array) with one entry per page you analyzed:
[{ "slug": "...", "sessions30d": <number>, "leads30d": <number>, "citability": <number|null> }]
This block is machine-parsed to update the self-improvement queue — include it even if sessions are 0.`;

    const result = await callAgent(
      Agents.pulse(),
      pulsePrompt,
      `pulse-${new Date().toISOString().slice(0, 10)}`,
      { timeoutMs: 90_000 }
    );

    // ── Parse Pulse metrics, merge with GSC data, update GeoPageTriage ──
    // Use allSettled so a single bad row doesn't abort all sibling writes.
    const rows = parsePulseMetrics(result.response);
    const now = new Date();
    const upsertResults = await Promise.allSettled(
      rows.map((r) => {
        const gsc = gscBySlug.get(r.slug);
        return prisma.geoPageTriage.upsert({
          where: { slug: r.slug },
          create: {
            slug: r.slug,
            source: "article",
            jobStatus: "pending",
            ga4Sessions30d: r.sessions30d,
            attributedLeads30d: r.leads30d,
            gscImpressions28d: gsc?.impressions ?? null,
            gscClicks28d: gsc?.clicks ?? null,
            gscCtr28d: gsc?.ctr ?? null,
            gscAvgPosition28d: gsc?.avgPosition ?? null,
            ...(r.citability != null ? { currentCitability: r.citability } : {}),
          },
          update: {
            ga4Sessions30d: r.sessions30d,
            attributedLeads30d: r.leads30d,
            gscImpressions28d: gsc?.impressions ?? null,
            gscClicks28d: gsc?.clicks ?? null,
            gscCtr28d: gsc?.ctr ?? null,
            gscAvgPosition28d: gsc?.avgPosition ?? null,
            updatedAt: now,
            ...(r.citability != null ? { currentCitability: r.citability } : {}),
          },
        });
      })
    );
    upsertResults.forEach((res, i) => {
      if (res.status === "rejected") {
        console.warn(`[pulse/snapshot] triage upsert failed for slug ${rows[i]?.slug}:`, res.reason);
      }
    });

    return NextResponse.json({
      ok: true,
      pulseLength: result.response.length,
      triageUpdated: rows.length,
      gsc: gscSummary.configured
        ? {
            impressions28d: gscSummary.impressions,
            clicks28d: gscSummary.clicks,
            avgPosition28d: gscSummary.avgPosition,
            ctr28d: gscSummary.ctr,
            pagesWithData: gscPages.rows.length,
          }
        : { configured: false, message: gscSummary.message },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Vercel cron invocations are GET — delegate to the real handler.
export async function GET(req: Request) {
  return POST(req);
}
