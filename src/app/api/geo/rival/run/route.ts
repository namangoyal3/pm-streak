import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";
import { createOpportunity, parseRivalGaps } from "@/lib/geo/safe-prisma";
import type { Prisma } from "@prisma/client";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const result = await callAgent(
      Agents.rival(),
      `Run daily competitive scan. Update rival_gaps.json in the shared KB.

After your analysis, append a trailing \`\`\`json block (array) of content gaps competitors cover that we don't:
[{ "query": "...", "intentScore": <0-1>, "gapScore": <0-1>, "competitors": ["domain.com", ...] }]
This block is machine-parsed to seed new article opportunities into Scout's queue.`,
      `rival-${new Date().toISOString().slice(0, 10)}`,
      { timeoutMs: 90_000 }
    );

    // Loop 3: parse gap rows and queue them as Scout opportunities.
    const gaps = parseRivalGaps(result.response);
    await Promise.all(
      gaps.map((g) =>
        createOpportunity({
          query: g.query,
          intentScore: g.intentScore,
          source: "rival",
          currentTop3: g.competitors as Prisma.InputJsonValue,
          gapScore: g.gapScore,
        })
      )
    );

    return NextResponse.json({ ok: true, length: result.response.length, opportunitiesQueued: gaps.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
