import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";
import { prisma } from "@/lib/prisma";
import { parsePulseMetrics } from "@/lib/geo/safe-prisma";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const result = await callAgent(
      Agents.pulse(),
      `Take a daily performance snapshot. Write metrics to pulse_metrics.jsonl. Flag pages needing rewrites.

After your analysis, append a trailing \`\`\`json block (array) with one entry per page you analyzed:
[{ "slug": "...", "sessions30d": <number>, "leads30d": <number>, "citability": <number|null> }]
This block is machine-parsed to update the self-improvement queue — include it even if sessions are 0.`,
      `pulse-${new Date().toISOString().slice(0, 10)}`,
      { timeoutMs: 90_000 }
    );

    // Loop 2: parse structured metrics and update GeoPageTriage in parallel.
    // Use allSettled so a single bad row doesn't abort all sibling writes.
    const rows = parsePulseMetrics(result.response);
    const now = new Date();
    const upsertResults = await Promise.allSettled(
      rows.map((r) =>
        prisma.geoPageTriage.upsert({
          where: { slug: r.slug },
          create: {
            slug: r.slug,
            source: "article",
            jobStatus: "pending",
            ga4Sessions30d: r.sessions30d,
            attributedLeads30d: r.leads30d,
            ...(r.citability != null ? { currentCitability: r.citability } : {}),
          },
          update: {
            ga4Sessions30d: r.sessions30d,
            attributedLeads30d: r.leads30d,
            updatedAt: now,
            ...(r.citability != null ? { currentCitability: r.citability } : {}),
          },
        })
      )
    );
    upsertResults.forEach((res, i) => {
      if (res.status === "rejected") {
        console.warn(`[pulse/snapshot] triage upsert failed for slug ${rows[i]?.slug}:`, res.reason);
      }
    });

    return NextResponse.json({ ok: true, length: result.response.length, triageUpdated: rows.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
