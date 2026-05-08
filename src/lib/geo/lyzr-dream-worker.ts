// lyzr-dream-worker.ts — "Dreaming" for Lyzr agents.
//
// Mirrors the Claude Dreams concept for the Lyzr-backed GEO swarm.
// Because the Lyzr KB (pm_streak_shared_kb) is write-only via Studio UI,
// this works by sending each agent a special reflection prompt that asks it
// to review everything it knows, deduplicate, resolve contradictions, and
// surface insights. Outputs are:
//   1. Written to the Claude supplementary memory store (bridges both systems).
//   2. Saved to .lyzr-dream-cache/ as JSON snapshots for optional KB re-upload.
//   3. Logged to GeoCronLog.
//
// The primary Lyzr KB is NEVER deleted or overwritten programmatically.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { callAgent, Agents } from "@/lib/lyzr";
import { writeMemoryBatch, type MemoryEntry } from "@/lib/claude-memory";
import { writeCronLog } from "@/lib/geo/safe-prisma";

export type AgentDreamResult = {
  agent: string;
  status: "ok" | "error" | "skipped";
  summary: string;
  outputPath?: string;
  error?: string;
};

export type LyzrDreamResult = {
  ranAt: string;
  results: AgentDreamResult[];
  memoryEntriesWritten: number;
};

// ── Per-agent dream prompts ───────────────────────────────────────────────────

const DREAM_PROMPTS: Record<string, string> = {
  cortex: `You are entering dream mode — a reflection and consolidation pass.
Review ALL knowledge you have stored in the pm_streak_shared_kb.

Tasks:
1. Identify duplicated facts (same fact stored under multiple keys). Choose the most recent/accurate version.
2. Identify contradictions (e.g. two different pricing figures). Resolve to the latest known value and flag the discrepancy.
3. Identify stale entries (references to deprecated features, old pricing, removed lessons). Mark them as superseded.
4. Surface 3-5 NEW insights or patterns not previously captured (e.g. emerging ICP signals, lesson taxonomy gaps).

Output strict JSON only — no prose:
\`\`\`json
{
  "consolidated_business_profile": { "icp": {}, "taxonomy": [], "brand_voice": {}, "pricing": {}, "north_star": "", "podcast_guests": [], "lesson_catalog": [] },
  "duplicates_resolved": [{ "key": "", "kept": "", "discarded": "" }],
  "contradictions_resolved": [{ "key": "", "old_value": "", "new_value": "", "reason": "" }],
  "stale_entries": [{ "key": "", "reason": "" }],
  "new_insights": ["..."]
}
\`\`\``,

  scout: `You are entering dream mode — a reflection and consolidation pass.
Review ALL opportunity data you have accumulated in the shared KB (opportunities.jsonl).

Tasks:
1. Identify duplicate queries (same query phrased differently). Keep the highest-intent version.
2. Identify stale opportunities (queries where pm-streak now ranks in top 3 — gap closed). Mark addressed.
3. Identify opportunity clusters (groups of related queries that should be addressed by a single page).
4. Surface the top 5 highest-priority unaddressed gaps by combined (intent_score + gap_score).

Output strict JSON only:
\`\`\`json
{
  "duplicates_merged": [{ "canonical_query": "", "merged_from": [] }],
  "stale_closed": ["query1", "query2"],
  "opportunity_clusters": [{ "cluster_name": "", "queries": [], "recommended_slug": "" }],
  "top5_priority_gaps": [{ "query": "", "intent_score": 0, "gap_score": 0, "cluster": "" }]
}
\`\`\``,

  rival: `You are entering dream mode — a reflection and consolidation pass.
Review ALL competitor intelligence you have accumulated in the shared KB (rival_gaps.json).

Tasks:
1. Identify competitors whose gap topics have changed since last scan. Update to latest.
2. Identify gap topics that pm-streak has now addressed (a page exists). Remove from gaps.
3. Merge duplicate gap topic entries across competitors.
4. Rank the top 5 cross-competitor gap topics by combined urgency (multiple competitors ranking, no pm-streak page).

Output strict JSON only:
\`\`\`json
{
  "updated_rival_intelligence": [{ "competitor": "", "ranking_topics": [], "gap_topics": [], "content_velocity": 0 }],
  "gaps_now_addressed": ["topic1", "topic2"],
  "top5_cross_competitor_gaps": [{ "topic": "", "competitors_ranking": [], "urgency_score": 0 }],
  "new_competitor_observations": ["..."]
}
\`\`\``,

  pulse: `You are entering dream mode — a reflection and consolidation pass.
Review ALL performance metrics you have accumulated in the shared KB (pulse_metrics.jsonl).

Tasks:
1. Identify pages with consistently declining citability (3+ consecutive drops). Flag for rewrite.
2. Identify pages with zero attributed leads for 21+ consecutive days. Flag for rewrite.
3. Identify "winner" pages (top 3 across all 4 AI engines for 7+ consecutive days). Protect from rewrite queue.
4. Surface 3-5 patterns that predict page success or failure on pm-streak.

Output strict JSON only:
\`\`\`json
{
  "rewrite_queue": [{ "slug": "", "reason": "", "priority": "high|medium|low" }],
  "winner_pages": ["slug1", "slug2"],
  "success_patterns": ["..."],
  "failure_patterns": ["..."]
}
\`\`\``,

  blueprint: `You are entering dream mode — a reflection and consolidation pass.
Review the content plan (content_plan.json) and keyword clusters (keyword_clusters.json) in the shared KB.

Tasks:
1. Identify planned pages that have already been created — remove from queue.
2. Identify keyword clusters with no assigned page — flag as unaddressed.
3. Re-prioritize the remaining queue based on current opportunity scores.
4. Surface 3-5 new content angles not yet planned (cross-reference Scout's top gaps).

Output strict JSON only:
\`\`\`json
{
  "queue_cleaned": [{ "removed_slug": "", "reason": "already_published|duplicate" }],
  "unaddressed_clusters": [{ "cluster_id": "", "cluster_name": "", "queries": [] }],
  "reprioritized_plan": [{ "rank": 0, "slug": "", "cluster_id": "", "rationale": "" }],
  "new_content_angles": ["..."]
}
\`\`\``,
};

// ── Main runner ───────────────────────────────────────────────────────────────

export async function runLyzrDream(): Promise<LyzrDreamResult> {
  const ranAt = new Date().toISOString();
  const sessionSuffix = ranAt.slice(0, 10);
  const results: AgentDreamResult[] = [];
  const memoryEntries: MemoryEntry[] = [];

  const agents: Array<{ key: keyof typeof Agents; label: string }> = [
    { key: "cortex",    label: "cortex" },
    { key: "scout",     label: "scout" },
    { key: "rival",     label: "rival" },
    { key: "pulse",     label: "pulse" },
    { key: "blueprint", label: "blueprint" },
  ];

  // Ensure cache dir exists for snapshot files.
  const cacheDir = join(process.cwd(), ".lyzr-dream-cache");
  try { mkdirSync(cacheDir, { recursive: true }); } catch { /* ok */ }

  for (const { key, label } of agents) {
    const prompt = DREAM_PROMPTS[label];
    if (!prompt) {
      results.push({ agent: label, status: "skipped", summary: "No dream prompt defined" });
      continue;
    }

    try {
      const resp = await callAgent(
        Agents[key](),
        prompt,
        `lyzr-dream-${label}-${sessionSuffix}`,
        { timeoutMs: 90_000 }
      );

      // Extract JSON block from response.
      const jsonMatch = resp.response.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      const raw = jsonMatch?.[1]?.trim() ?? resp.response.trim();

      // Save snapshot to disk.
      const outPath = join(cacheDir, `${label}-${sessionSuffix}.json`);
      try {
        writeFileSync(outPath, raw, "utf-8");
      } catch { /* non-critical */ }

      // Queue memory entry for Claude memory store.
      memoryEntries.push({
        path: `/lyzr-dream/${label}/${sessionSuffix}`,
        content: `Lyzr dream ${sessionSuffix} — agent="${label}" consolidated output (${raw.length} chars):\n${raw.slice(0, 1200)}`,
      });

      results.push({
        agent: label,
        status: "ok",
        summary: `Consolidated ${raw.length} chars`,
        outputPath: outPath,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message.slice(0, 300) : String(e);
      results.push({ agent: label, status: "error", summary: "Failed", error: message });
    }
  }

  // Write all memory entries to Claude memory store (fire-and-forget if env not set).
  let memoryEntriesWritten = 0;
  if (process.env.ANTHROPIC_GEO_MEMORY_STORE_ID && memoryEntries.length > 0) {
    await writeMemoryBatch(memoryEntries);
    memoryEntriesWritten = memoryEntries.length;
  }

  const okCount = results.filter((r) => r.status === "ok").length;
  const errCount = results.filter((r) => r.status === "error").length;

  // Non-blocking — DB may not be available in all envs.
  writeCronLog({
    cronId: "lyzr-dream/run",
    status: errCount === 0 ? "ok" : okCount > 0 ? "ok" : "error",
    summary: `Lyzr dream complete: ${okCount} ok, ${errCount} errors, ${memoryEntriesWritten} memory entries written`,
    details: { ranAt, results, memoryEntriesWritten },
  }).catch(() => undefined);

  return { ranAt, results, memoryEntriesWritten };
}
