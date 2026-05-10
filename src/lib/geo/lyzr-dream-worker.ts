// lyzr-dream-worker.ts — "Dreaming" for Lyzr agents.
//
// Mirrors the Claude Dreams concept entirely within Lyzr — no external APIs.
// Each agent receives a reflection prompt to deduplicate its KB knowledge,
// resolve contradictions, and surface insights. Cortex then ingests all
// agent outputs and writes a consolidated summary back to pm_streak_shared_kb.
//
// The primary Lyzr KB is NEVER deleted or overwritten — Cortex appends
// a consolidated "dream_snapshot" entry that supersedes stale facts.
//
// Flow:
//   1. Scout → reflects on opportunity data
//   2. Rival → reflects on competitor gaps
//   3. Pulse → reflects on performance patterns
//   4. Blueprint → reflects on content plan
//   5. Cortex → consolidates all outputs + writes back to KB

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { callAgent, Agents } from "@/lib/lyzr";
import { writeCronLog } from "@/lib/geo/safe-prisma";

export type AgentDreamResult = {
  agent: string;
  status: "ok" | "error" | "skipped";
  summary: string;
  output?: string;
  outputPath?: string;
  error?: string;
};

export type LyzrDreamResult = {
  ranAt: string;
  results: AgentDreamResult[];
  cortexConsolidated: boolean;
};

// ── Per-agent reflection prompts ─────────────────────────────────────────────

const DREAM_PROMPTS: Record<string, string> = {
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
4. Rank the top 5 cross-competitor gap topics by urgency (multiple competitors ranking, no pm-streak page).

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
3. Identify "winner" pages (top 3 across all 4 AI engines for 7+ consecutive days). Protect from rewrite.
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
3. Re-prioritize the remaining queue based on current opportunity scores from Scout.
4. Surface 3-5 new content angles not yet planned.

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

// ── Cortex consolidation prompt ───────────────────────────────────────────────

function buildCortexConsolidationPrompt(
  date: string,
  agentOutputs: { agent: string; output: string }[]
): string {
  const sections = agentOutputs
    .map((a) => `=== ${a.agent.toUpperCase()} DREAM OUTPUT ===\n${a.output.slice(0, 3000)}`)
    .join("\n\n");

  return `You are entering dream consolidation mode. The date is ${date}.

Below are the consolidated reflection outputs from all GEO swarm agents.
Your job:
1. Read all outputs.
2. Identify cross-agent patterns (e.g. Scout top gaps that match Blueprint unaddressed clusters, Rival gaps that align with Pulse rewrite queue).
3. Produce a unified dream_snapshot that supersedes stale KB entries.
4. Write the dream_snapshot to the shared KB so all agents can read it next session.

Cross-agent synthesis rules:
- A Scout top-5 gap + a Rival cross-competitor gap = HIGH PRIORITY page (create immediately).
- A Pulse rewrite_needed + Blueprint reprioritized = URGENT rewrite.
- A Pulse winner_page = protect from any rewrite or redirect queue.

Output strict JSON only — this is machine-parsed and written to the KB:
\`\`\`json
{
  "dream_snapshot": {
    "date": "${date}",
    "immediate_creates": [{ "query": "", "slug": "", "rationale": "" }],
    "urgent_rewrites": [{ "slug": "", "rationale": "" }],
    "protected_pages": ["slug1"],
    "top_content_opportunities": ["..."],
    "cross_agent_insights": ["..."],
    "kb_supersedes": ["list of stale KB keys this snapshot replaces"]
  }
}
\`\`\`

--- AGENT OUTPUTS ---

${sections}`;
}

// ── Main runner ───────────────────────────────────────────────────────────────

export async function runLyzrDream(): Promise<LyzrDreamResult> {
  const ranAt = new Date().toISOString();
  const date = ranAt.slice(0, 10);
  const results: AgentDreamResult[] = [];

  // Ensure cache dir exists.
  const cacheDir = join(process.cwd(), ".lyzr-dream-cache");
  try { mkdirSync(cacheDir, { recursive: true }); } catch { /* ok */ }

  // Step 1-4: Run reflection on each worker agent.
  const workerAgents: Array<{ key: keyof typeof Agents; label: string }> = [
    { key: "scout",     label: "scout" },
    { key: "rival",     label: "rival" },
    { key: "pulse",     label: "pulse" },
    { key: "blueprint", label: "blueprint" },
  ];

  for (const { key, label } of workerAgents) {
    const prompt = DREAM_PROMPTS[label];
    try {
      const resp = await callAgent(
        Agents[key](),
        prompt,
        `lyzr-dream-${label}-${date}`,
        { timeoutMs: 90_000 }
      );

      const jsonMatch = resp.response.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      const output = jsonMatch?.[1]?.trim() ?? resp.response.trim();

      const outPath = join(cacheDir, `${label}-${date}.json`);
      try { writeFileSync(outPath, output, "utf-8"); } catch { /* non-critical */ }

      results.push({ agent: label, status: "ok", summary: `${output.length} chars`, output, outputPath: outPath });
    } catch (e) {
      const error = e instanceof Error ? e.message.slice(0, 300) : String(e);
      results.push({ agent: label, status: "error", summary: "Failed", error });
    }
  }

  // Step 5: Cortex consolidates all worker outputs and writes back to the KB.
  let cortexConsolidated = false;
  const successfulOutputs = results
    .filter((r) => r.status === "ok" && r.output)
    .map((r) => ({ agent: r.agent, output: r.output! }));

  if (successfulOutputs.length > 0) {
    try {
      const cortexPrompt = buildCortexConsolidationPrompt(date, successfulOutputs);
      const cortexResp = await callAgent(
        Agents.cortex(),
        cortexPrompt,
        `lyzr-dream-cortex-${date}`,
        { timeoutMs: 120_000 }
      );

      const jsonMatch = cortexResp.response.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
      const output = jsonMatch?.[1]?.trim() ?? cortexResp.response.trim();

      const outPath = join(cacheDir, `cortex-${date}.json`);
      try { writeFileSync(outPath, output, "utf-8"); } catch { /* non-critical */ }

      results.push({ agent: "cortex", status: "ok", summary: `Consolidated + wrote to KB (${output.length} chars)`, output, outputPath: outPath });
      cortexConsolidated = true;
    } catch (e) {
      const error = e instanceof Error ? e.message.slice(0, 300) : String(e);
      results.push({ agent: "cortex", status: "error", summary: "Consolidation failed", error });
    }
  } else {
    results.push({ agent: "cortex", status: "skipped", summary: "No worker outputs to consolidate" });
  }

  const okCount = results.filter((r) => r.status === "ok").length;
  const errCount = results.filter((r) => r.status === "error").length;

  // Non-blocking log write.
  writeCronLog({
    cronId: "lyzr-dream/run",
    status: cortexConsolidated ? "ok" : errCount > 0 ? "error" : "empty",
    summary: `Lyzr dream: ${okCount} ok, ${errCount} errors, cortex_consolidated=${cortexConsolidated}`,
    details: { ranAt, cortexConsolidated, results: results.map((r) => ({ agent: r.agent, status: r.status, summary: r.summary })) },
  }).catch(() => undefined);

  return { ranAt, results, cortexConsolidated };
}
