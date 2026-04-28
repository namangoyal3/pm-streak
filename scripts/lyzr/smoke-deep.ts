// Deep agent test:
// 1) KB-depth probes — questions only answerable from the seeded KB files,
//    NOT from the agent system prompts. Looks for verbatim facts.
// 2) Artifact generation — asks each agent to emit its real production
//    deliverable. Saves the raw response and a parsed JSON/MDX artifact
//    to outputs/agent-tests/<run-id>/<agent>/.
//
// Run:
//   node --env-file=.env.local --import=tsx scripts/lyzr/smoke-deep.ts
//
// Exits non-zero if any KB probe or artifact validator fails.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { callAgent, callConductor, Agents } from "../../src/lib/lyzr";

const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const ROOT = join(process.cwd(), "outputs", "agent-tests", RUN_ID);
mkdirSync(ROOT, { recursive: true });

type AgentName = keyof typeof Agents | "conductor";

function save(agent: string, file: string, body: string) {
  const dir = join(ROOT, agent);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, file), body);
}

async function ask(agent: AgentName, prompt: string, sessionId: string, timeoutMs = 120_000) {
  if (agent === "conductor") return callConductor(prompt, sessionId);
  const id = (Agents as Record<string, () => string>)[agent]();
  return callAgent(id, prompt, sessionId, { timeoutMs });
}

// ---------- 1) KB depth probes ----------
// Each fact is a verbatim string from ~/Desktop/pm-streak-kb-seed/01-business-profile.txt
// (or other seed files). If the KB is wired AND retrieval works, the agent
// should reproduce these facts. None of these strings appear in any spec.ts.

type KbProbe = {
  agent: AgentName;
  prompt: string;
  any_of: string[]; // pass if response contains at least N of these
  min_matches: number;
};

const kbProbes: KbProbe[] = [
  {
    agent: "cortex",
    prompt:
      "From the pm-streak shared knowledge base, answer: (a) the exact tagline, (b) the four onboarding learning goals, (c) Tier C (India) Pro pricing, (d) current active user count. Quote verbatim from the KB where possible.",
    any_of: [
      "fastest way to get sharper as a PM",
      "Breaking In",
      "Interview Prep",
      "Staying Sharp",
      "Lead Strategy",
      "299",
      "699",
      "2499",
      "123 active users",
    ],
    min_matches: 6,
  },
  {
    agent: "blueprint",
    prompt:
      "Using the KB, list the 4 article types pm-streak publishes (from the SEO Articles section of the business profile) and the typical word count range.",
    any_of: ["blog", "framework", "interview guide", "concept explainer", "2,000", "3,100", "2000", "3100"],
    min_matches: 4,
  },
  {
    agent: "scout",
    prompt:
      "From the KB, what is pm-streak's North Star Metric? Quote it exactly.",
    any_of: ["citability", "70", "ChatGPT", "Perplexity", "Gemini", "Google AI Overviews", "30%", "14 days"],
    min_matches: 4,
  },
  {
    agent: "forge",
    prompt:
      "From the brand voice guide in the KB, list 5 real companies pm-streak articles use as concrete examples and 3 frameworks Interview Prep references.",
    any_of: ["Figma", "Spotify", "Slack", "Netflix", "Airbnb", "CIRCLES", "RICE", "AARM", "STAR", "HEART"],
    min_matches: 5,
  },
  {
    agent: "rival",
    prompt:
      "From the competitive-landscape KB doc, name the 6 competitors and one positioning gap for each that pm-streak can exploit.",
    any_of: ["Reforge", "Lenny", "Maven", "Section", "IVPM", "Product School"],
    min_matches: 5,
  },
  {
    agent: "signal",
    prompt:
      "From the KB, which search engines does pm-streak ping via IndexNow on publish?",
    any_of: ["Bing", "Yandex", "Perplexity", "Claude"],
    min_matches: 2,
  },
  {
    agent: "anchor",
    prompt:
      "From the KB, list the directories on the allowlist for outreach drafts. Drafts only — never send.",
    any_of: ["G2", "Capterra", "AlternativeTo", "ProductHunt"],
    min_matches: 3,
  },
  {
    agent: "pulse",
    prompt:
      "From the KB data-model-reference, what is the exact paywall trigger condition for pm-streak? List all 5 sub-conditions.",
    any_of: [
      "credits exhausted",
      "10+ lesson attempts",
      "4+ active days",
      "declined paywall",
      "24 hours",
    ],
    min_matches: 3,
  },
  {
    agent: "conductor",
    prompt:
      "From the KB business profile, what is pm-streak's free plan credit allowance per month, and the credit cost of (a) one AI lesson and (b) one interview prep run?",
    any_of: ["10 credits", "2 credits", "5 credits", "AI lesson", "interview prep"],
    min_matches: 3,
  },
];

// ---------- 2) Artifact generation ----------
// Each agent is asked to emit its real production deliverable.
// We save the raw response, then attempt to extract a JSON / MDX artifact.

function extractJson(text: string): unknown | null {
  // Try fenced ```json blocks first
  const fence = text.match(/```(?:json|jsonl|JSON)?\s*\n([\s\S]*?)\n```/);
  const candidate = fence ? fence[1] : text;
  // Greedy: find first { and last }
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}

function extractJsonl(text: string): unknown[] {
  const out: unknown[] = [];
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t.startsWith("{") || !t.endsWith("}")) continue;
    try {
      out.push(JSON.parse(t));
    } catch {
      // ignore
    }
  }
  return out;
}

function extractMdx(text: string): string | null {
  const fence = text.match(/```(?:mdx|md|markdown)\s*\n([\s\S]*?)\n```/i);
  if (fence) return fence[1];
  // fallback: if response begins with frontmatter, take whole thing
  if (text.trimStart().startsWith("---")) return text;
  return null;
}

type ArtifactSpec = {
  agent: AgentName;
  prompt: string;
  validate: (raw: string) => { ok: boolean; reason: string; artifact?: { name: string; body: string } };
  timeoutMs?: number;
};

const artifacts: ArtifactSpec[] = [
  {
    agent: "cortex",
    prompt:
      "Produce the FULL business_profile.json for pm-streak using only the KB. Include all top-level keys: icp, taxonomy, brand_voice, pricing, north_star, podcast_guests. Output ONLY the JSON in a fenced ```json block. No commentary.",
    validate: (raw) => {
      const j = extractJson(raw) as Record<string, unknown> | null;
      if (!j) return { ok: false, reason: "no parseable JSON" };
      const required = ["icp", "taxonomy", "brand_voice", "pricing", "north_star"];
      const missing = required.filter((k) => !(k in (j.business_profile ?? j) as Record<string, unknown>));
      if (missing.length) return { ok: false, reason: `missing keys: ${missing.join(",")}` };
      return { ok: true, reason: "ok", artifact: { name: "business_profile.json", body: JSON.stringify(j, null, 2) } };
    },
  },
  {
    agent: "scout",
    prompt:
      "Produce 5 opportunities as JSONL (one JSON object per line, no fences, no prose). Each must have: query, intent_score (0-100), llm_source, current_top_3 (array of 3 strings), gap_score (0-100), ts (ISO8601). Topics: AI PM skills, PM interview prep, RICE prioritization, north star metric, PM career growth.",
    validate: (raw) => {
      const rows = extractJsonl(raw);
      if (rows.length < 3) return { ok: false, reason: `only ${rows.length} valid JSONL rows` };
      const r = rows[0] as Record<string, unknown>;
      const need = ["query", "intent_score", "llm_source", "current_top_3", "gap_score"];
      const missing = need.filter((k) => !(k in r));
      if (missing.length) return { ok: false, reason: `row missing: ${missing.join(",")}` };
      return {
        ok: true,
        reason: `${rows.length} rows`,
        artifact: { name: "opportunities.jsonl", body: rows.map((x) => JSON.stringify(x)).join("\n") + "\n" },
      };
    },
  },
  {
    agent: "rival",
    prompt:
      "Produce rival_gaps.json — an array of 6 objects, one per competitor (Reforge, Lenny, Product School, Maven, Section, IVPM). Each has: competitor, ranking_topics (array of 5), content_velocity (number/week), schema_usage (bool), llms_txt (bool), gap_topics (array of 3 topics pm-streak should target). Output ONLY a fenced ```json block.",
    validate: (raw) => {
      const fence = raw.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
      const text = fence ? fence[1] : raw;
      let j: unknown;
      try { j = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)); } catch { return { ok: false, reason: "no JSON array" }; }
      if (!Array.isArray(j) || j.length < 4) return { ok: false, reason: `array length ${Array.isArray(j) ? j.length : "n/a"}` };
      const r = j[0] as Record<string, unknown>;
      const need = ["competitor", "ranking_topics", "gap_topics"];
      const missing = need.filter((k) => !(k in r));
      if (missing.length) return { ok: false, reason: `row missing: ${missing.join(",")}` };
      return { ok: true, reason: `${j.length} competitors`, artifact: { name: "rival_gaps.json", body: JSON.stringify(j, null, 2) } };
    },
  },
  {
    agent: "blueprint",
    prompt:
      "Produce content_plan.json — an array of 5 prioritized plan items based on Scout opportunities (use these dummy clusters: 'ai-pm-skills-2026', 'pm-interview-prep', 'rice-prioritization', 'north-star-metric', 'pm-career-paths'). Each item: cluster, page_type (pillar|comparison|use-case|glossary), title, target_queries (array of 3), geo_target (number), priority (1-5). Output ONLY a fenced ```json block with the array.",
    validate: (raw) => {
      const fence = raw.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
      const text = fence ? fence[1] : raw;
      let j: unknown;
      try { j = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)); } catch { return { ok: false, reason: "no JSON array" }; }
      if (!Array.isArray(j) || j.length < 3) return { ok: false, reason: `array length ${Array.isArray(j) ? j.length : "n/a"}` };
      const r = j[0] as Record<string, unknown>;
      const need = ["cluster", "page_type", "title", "target_queries", "priority"];
      const missing = need.filter((k) => !(k in r));
      if (missing.length) return { ok: false, reason: `row missing: ${missing.join(",")}` };
      return { ok: true, reason: `${j.length} plan items`, artifact: { name: "content_plan.json", body: JSON.stringify(j, null, 2) } };
    },
  },
  {
    agent: "forge",
    timeoutMs: 240_000,
    prompt: `Write a complete production-ready MDX page for pm-streak.

Plan item:
- cluster: ai-pm-skills-2026
- page_type: pillar
- title: AI PM Skills That Will Matter in 2026
- target_queries: ["ai pm skills 2026","what skills does an ai product manager need","ai pm career path"]
- geo_target: 80

Requirements:
1. MDX with YAML frontmatter (title, description, slug, publishedAt, updatedAt, author, ogImage).
2. Hero section, 5+ H2 sections, 3+ H3 subsections, at least one comparison table, at least one stat with citation, FAQ section with 5 Q&A, CTA at the end.
3. Brand voice: pm-streak (Lenny-podcast-mentor tone, references real companies — Figma, Spotify, Slack, Netflix, Airbnb).
4. After the MDX, include a fenced \`\`\`json block with: schema (Article + FAQPage JSON-LD), meta (slug, target_queries, geo_score_self_estimate), and word_count (>1500).

Return: \`\`\`mdx ...frontmatter+body... \`\`\` then \`\`\`json ...schema/meta... \`\`\`. No prose outside the fences.`,
    validate: (raw) => {
      const mdx = extractMdx(raw);
      if (!mdx) return { ok: false, reason: "no MDX block" };
      if (!/^---/m.test(mdx)) return { ok: false, reason: "no frontmatter" };
      const wc = mdx.split(/\s+/).length;
      if (wc < 800) return { ok: false, reason: `word count ${wc} < 800` };
      const json = extractJson(raw);
      if (!json) return { ok: false, reason: "no JSON-LD/meta block" };
      // multi-file artifact
      return {
        ok: true,
        reason: `mdx ${wc} words + schema`,
        artifact: { name: "page.mdx", body: mdx + "\n\n<!-- schema/meta -->\n" + JSON.stringify(json, null, 2) },
      };
    },
  },
  {
    agent: "signal",
    prompt: `For the slug "ai-pm-skills-2026" with citability_score 84, produce a publish_plan.json containing:
- pr_title, pr_body (markdown)
- branch_name
- llms_txt_entry (string in llms.txt format)
- sitemap_path
- indexnow_targets (array)
- auto_merge (bool, true if score >= 80)
- utm_params (utm_source, utm_medium, utm_campaign)
Output ONLY a fenced \`\`\`json block.`,
    validate: (raw) => {
      const j = extractJson(raw) as Record<string, unknown> | null;
      if (!j) return { ok: false, reason: "no JSON" };
      const need = ["pr_title", "branch_name", "indexnow_targets", "auto_merge"];
      const missing = need.filter((k) => !(k in j));
      if (missing.length) return { ok: false, reason: `missing: ${missing.join(",")}` };
      if (j.auto_merge !== true) return { ok: false, reason: "auto_merge should be true at score 84" };
      return { ok: true, reason: "publish plan ok", artifact: { name: "publish_plan.json", body: JSON.stringify(j, null, 2) } };
    },
  },
  {
    agent: "anchor",
    prompt: `Produce 4 outreach drafts as a JSON array. Each item: { page_slug, source, draft_body, suggested_target, status }. Sources required: one G2 directory submission, one HARO response, one Reddit r/ProductManagement post, one LinkedIn post. All status="drafted". page_slug="ai-pm-skills-2026". Output ONLY a fenced \`\`\`json block.`,
    validate: (raw) => {
      const fence = raw.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
      const text = fence ? fence[1] : raw;
      let j: unknown;
      try { j = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)); } catch { return { ok: false, reason: "no JSON array" }; }
      if (!Array.isArray(j) || j.length < 3) return { ok: false, reason: `length ${Array.isArray(j) ? j.length : "n/a"}` };
      const allDrafted = (j as Array<Record<string, unknown>>).every((r) => r.status === "drafted");
      if (!allDrafted) return { ok: false, reason: "non-drafted item present" };
      const sources = (j as Array<Record<string, unknown>>).map((r) => String(r.source || "").toLowerCase());
      const hasG2 = sources.some((s) => s.includes("g2"));
      const hasReddit = sources.some((s) => s.includes("reddit"));
      if (!hasG2 || !hasReddit) return { ok: false, reason: "missing required sources" };
      return { ok: true, reason: `${j.length} drafts`, artifact: { name: "citation_drafts.json", body: JSON.stringify(j, null, 2) } };
    },
  },
  {
    agent: "pulse",
    prompt: `Given these 5 page snapshots, produce a rewrite_queue.json (sorted by priority desc) with rows { slug, citability_score, attributed_leads_30d, action } where action is one of: "rewrite_needed","protect_winner","monitor".
Snapshots:
1. {slug:"ai-pm-skills-2026", citability:84, leads_30d:12, top3_engines:4}
2. {slug:"rice-prioritization", citability:68, leads_30d:0}
3. {slug:"pm-interview-prep", citability:72, leads_30d:0, days_no_leads:25}
4. {slug:"north-star-metric", citability:91, leads_30d:8, top3_engines:4}
5. {slug:"pm-career-paths", citability:76, leads_30d:3}
Output ONLY a fenced \`\`\`json block with the array.`,
    validate: (raw) => {
      const fence = raw.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
      const text = fence ? fence[1] : raw;
      let j: unknown;
      try { j = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1)); } catch { return { ok: false, reason: "no JSON array" }; }
      if (!Array.isArray(j) || j.length < 4) return { ok: false, reason: `length ${Array.isArray(j) ? j.length : "n/a"}` };
      const rows = j as Array<Record<string, unknown>>;
      const rice = rows.find((r) => String(r.slug).includes("rice"));
      const interview = rows.find((r) => String(r.slug).includes("interview"));
      const winner = rows.find((r) => String(r.slug).includes("north-star") || String(r.slug).includes("ai-pm-skills"));
      const checks: string[] = [];
      if (rice?.action !== "rewrite_needed") checks.push("rice should be rewrite_needed");
      if (interview?.action !== "rewrite_needed") checks.push("interview should be rewrite_needed");
      if (winner && winner.action !== "protect_winner") checks.push("winner should be protect_winner");
      if (checks.length) return { ok: false, reason: checks.join("; ") };
      return { ok: true, reason: "decisions correct", artifact: { name: "rewrite_queue.json", body: JSON.stringify(rows, null, 2) } };
    },
  },
  {
    agent: "conductor",
    prompt: `Given event=opportunity_found for query "ai pm skills 2026", produce a routing_plan.json with: event, steps (array of {step, agent, action, blocking_condition}), stop_conditions (array), and notes. Must enforce: Forge output must pass citability ≥70 before Signal publishes. Anchor never sends. Output ONLY a fenced \`\`\`json block.`,
    validate: (raw) => {
      const j = extractJson(raw) as Record<string, unknown> | null;
      if (!j) return { ok: false, reason: "no JSON" };
      if (!Array.isArray(j.steps) || (j.steps as unknown[]).length < 3) return { ok: false, reason: "steps too short" };
      const flat = JSON.stringify(j).toLowerCase();
      const checks: string[] = [];
      if (!flat.includes("forge")) checks.push("no Forge step");
      if (!flat.includes("signal")) checks.push("no Signal step");
      if (!/70|citability/.test(flat)) checks.push("no citability gate");
      if (!/draft|never|not.*send|no.*send/.test(flat)) checks.push("no Anchor drafts-only constraint");
      if (checks.length) return { ok: false, reason: checks.join("; ") };
      return { ok: true, reason: "routing plan ok", artifact: { name: "routing_plan.json", body: JSON.stringify(j, null, 2) } };
    },
  },
];

// ---------- runner ----------

(async () => {
  console.log(`Run dir: ${ROOT}\n`);
  let kbPass = 0;
  let kbFail = 0;
  let artPass = 0;
  let artFail = 0;

  console.log("=== KB DEPTH PROBES ===");
  for (const p of kbProbes) {
    const sid = `kbdeep-${p.agent}-${Date.now()}`;
    let resp = "";
    try {
      const out = await ask(p.agent, p.prompt, sid);
      resp = out.response;
    } catch (e) {
      console.error(`[KB FAIL] ${p.agent}: ${(e as Error).message.slice(0, 200)}`);
      kbFail++;
      continue;
    }
    save(String(p.agent), `kb_probe.txt`, `PROMPT:\n${p.prompt}\n\nRESPONSE:\n${resp}\n`);
    const lc = resp.toLowerCase();
    const matched = p.any_of.filter((s) => lc.includes(s.toLowerCase()));
    const ok = matched.length >= p.min_matches;
    if (ok) kbPass++; else kbFail++;
    console.log(
      `[KB ${ok ? "PASS" : "FAIL"}] ${p.agent.padEnd(10)} | ${matched.length}/${p.any_of.length} matches (need ${p.min_matches}) | matched=[${matched.slice(0, 5).join(",")}]`
    );
  }

  console.log("\n=== ARTIFACT GENERATION ===");
  for (const a of artifacts) {
    const sid = `artifact-${a.agent}-${Date.now()}`;
    let resp = "";
    try {
      const out = await ask(a.agent, a.prompt, sid, a.timeoutMs ?? 120_000);
      resp = out.response;
    } catch (e) {
      console.error(`[ART FAIL] ${a.agent}: ERROR ${(e as Error).message.slice(0, 200)}`);
      artFail++;
      continue;
    }
    save(String(a.agent), "raw_response.txt", resp);
    const v = a.validate(resp);
    if (v.ok && v.artifact) save(String(a.agent), v.artifact.name, v.artifact.body);
    if (v.ok) artPass++; else artFail++;
    console.log(`[ART ${v.ok ? "PASS" : "FAIL"}] ${a.agent.padEnd(10)} | ${v.reason}`);
  }

  console.log(
    `\nKB depth: ${kbPass}/${kbPass + kbFail} passed | Artifacts: ${artPass}/${artPass + artFail} passed`
  );
  console.log(`Artifacts written to: ${ROOT}`);
  if (kbFail > 0 || artFail > 0) process.exitCode = 1;
})();
