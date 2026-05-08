import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";
import { createOpportunity, writeCronLog } from "@/lib/geo/safe-prisma";
import { writeMemoryBatch } from "@/lib/claude-memory";
import type { Prisma } from "@prisma/client";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

function parseScoutJsonl(response: string): {
  query: string;
  intent_score?: number;
  intentScore?: number;
  gap_score?: number;
  gapScore?: number;
  llm_source?: string;
  source?: string;
  current_top_3?: string[];
  currentTop3?: string[];
}[] {
  const jsonMatch = response.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {}
  }
  const lines = response.split("\n").filter((l) => l.trim().startsWith("{"));
  return lines
    .map((l) => {
      try { return JSON.parse(l.trim()); } catch { return null; }
    })
    .filter(Boolean);
}

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const result = await callAgent(
      Agents.scout(),
      `Run today's demand scan for PM upskilling queries. After your analysis, append a trailing \`\`\`json array with one entry per discovered opportunity:
[{ "query": "...", "intent_score": <0-100>, "source": "chatgpt|perplexity|gemini|google", "current_top_3": ["url1", "url2", "url3"], "gap_score": <0-100> }]
Only include queries where intent_score > 50 and pm-streak is NOT in the current top 3.`,
      `scout-${new Date().toISOString().slice(0, 10)}`,
      { timeoutMs: 90_000 }
    );

    const opportunities = parseScoutJsonl(result.response);
    let queued = 0;
    const errors: string[] = [];

    for (const row of opportunities) {
      const query = row.query ?? row.query;
      if (!query) continue;
      try {
        await createOpportunity({
          query,
          intentScore: row.intent_score ?? row.intentScore ?? 50,
          source: row.llm_source ?? row.source ?? "scout",
          currentTop3: (row.current_top_3 ?? row.currentTop3 ?? []) as Prisma.InputJsonValue,
          gapScore: row.gap_score ?? row.gapScore ?? 50,
        });
        queued++;
      } catch (e) {
        errors.push(`${query}: ${(e as Error).message.slice(0, 200)}`);
      }
    }

    await writeCronLog({
      cronId: "scout/run",
      status: queued > 0 ? "ok" : "empty",
      summary: queued > 0 ? `Queued ${queued} opportunities from ${opportunities.length} parsed` : `Parsed ${opportunities.length} rows, 0 queued`,
      details: { parsed: opportunities.length, queued, errors },
    });

    // Write discovered opportunities to Claude memory store for Dreams consolidation.
    if (queued > 0 && process.env.ANTHROPIC_GEO_MEMORY_STORE_ID) {
      const date = new Date().toISOString().slice(0, 10);
      await writeMemoryBatch(
        opportunities
          .filter((r) => r.query)
          .map((r) => ({
            key: `opportunity:${r.query.toLowerCase().replace(/\s+/g, "-").slice(0, 80)}:${date}`,
            content: `Scout opportunity ${date} — query="${r.query}" intentScore=${r.intent_score ?? r.intentScore ?? 50} source=${r.llm_source ?? r.source ?? "scout"} gapScore=${r.gap_score ?? r.gapScore ?? 50}`,
            metadata: { source: "scout", date },
          }))
      );
    }

    return NextResponse.json({
      ok: true,
      responseLength: result.response.length,
      parsed: opportunities.length,
      opportunitiesQueued: queued,
      errors: errors.slice(0, 10),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
