import { z } from "zod";

const BASE = process.env.LYZR_API_BASE ?? "https://agent-prod.studio.lyzr.ai/v3";

// ── Dev mock mode (LYZR_MOCK=true) ───────────────────────────────────────────
// Returns realistic stub responses keyed on session ID prefix.
// Lets you run the full pipeline locally without Lyzr network access.

const MOCK_RESPONSES: Record<string, string> = {
  "lyzr-dream-scout": JSON.stringify({
    duplicates_merged: [{ canonical_query: "best pm courses 2026", merged_from: ["top pm courses 2026", "best product management courses"] }],
    stale_closed: ["pm certification online"],
    opportunity_clusters: [
      { cluster_name: "PM Interview Prep", queries: ["pm interview questions", "product manager interview prep", "how to crack pm interview"], recommended_slug: "pm-interview-prep-guide" },
      { cluster_name: "AI for PMs", queries: ["ai product manager skills", "how to use ai as pm", "ai pm tools 2026"], recommended_slug: "ai-product-manager-skills" }
    ],
    top5_priority_gaps: [
      { query: "pm interview preparation guide", intent_score: 92, gap_score: 88, cluster: "PM Interview Prep" },
      { query: "ai product manager skills 2026", intent_score: 87, gap_score: 85, cluster: "AI for PMs" },
      { query: "product manager salary negotiation", intent_score: 84, gap_score: 79, cluster: "PM Career" },
      { query: "product roadmap frameworks", intent_score: 81, gap_score: 76, cluster: "PM Frameworks" },
      { query: "how to become senior pm", intent_score: 78, gap_score: 74, cluster: "PM Career" }
    ]
  }),

  "lyzr-dream-rival": JSON.stringify({
    updated_rival_intelligence: [
      { competitor: "Reforge", ranking_topics: ["product strategy", "growth loops", "pm frameworks"], gap_topics: ["pm salary negotiation", "ai for pms"], content_velocity: 3 },
      { competitor: "Lenny's Newsletter", ranking_topics: ["pm metrics", "pm interviews", "product sense"], gap_topics: ["pm interview simulation", "daily pm practice"], content_velocity: 2 }
    ],
    gaps_now_addressed: ["pm resume template", "product roadmap basics"],
    top5_cross_competitor_gaps: [
      { topic: "PM salary negotiation", competitors_ranking: ["Reforge", "Product School"], urgency_score: 91 },
      { topic: "AI tools for product managers", competitors_ranking: ["Lenny's Newsletter", "Maven"], urgency_score: 88 },
      { topic: "PM interview simulation", competitors_ranking: ["Product School", "Section"], urgency_score: 85 },
      { topic: "Daily PM practice problems", competitors_ranking: ["IVPM", "Product School"], urgency_score: 82 },
      { topic: "Product metrics deep dive", competitors_ranking: ["Reforge", "Lenny's Newsletter", "Maven"], urgency_score: 79 }
    ],
    new_competitor_observations: ["Reforge launched a new AI PM track — direct competition", "Product School increased content velocity 40% this quarter"]
  }),

  "lyzr-dream-pulse": JSON.stringify({
    rewrite_queue: [
      { slug: "pm-skills-guide", reason: "citability dropped 3 consecutive snapshots (82→74→68→61)", priority: "high" },
      { slug: "product-manager-resume", reason: "zero attributed leads for 24 consecutive days", priority: "high" },
      { slug: "agile-for-pms", reason: "citability below 70 for 2 weeks", priority: "medium" }
    ],
    winner_pages: ["pm-interview-questions", "product-roadmap-template"],
    success_patterns: [
      "Pages with ≥5 FAQ items get 2.3x more AI citations",
      "Comparison tables with ≥5 rows consistently score citability ≥80",
      "Pages updated within 90 days retain top-3 AI ranking"
    ],
    failure_patterns: [
      "Pages without inline citations drop citability below 70 within 60 days",
      "Thin intro sections (<150 words) correlate with high bounce and zero leads"
    ]
  }),

  "lyzr-dream-blueprint": JSON.stringify({
    queue_cleaned: [
      { removed_slug: "pm-basics-overview", reason: "already_published" },
      { removed_slug: "product-thinking-101", reason: "duplicate" }
    ],
    unaddressed_clusters: [
      { cluster_id: "cls_ai_pm", cluster_name: "AI for Product Managers", queries: ["ai pm skills", "ai tools for pm", "chatgpt for product managers"] },
      { cluster_id: "cls_salary", cluster_name: "PM Compensation", queries: ["pm salary negotiation", "senior pm salary", "pm total compensation"] }
    ],
    reprioritized_plan: [
      { rank: 1, slug: "pm-interview-prep-guide", cluster_id: "cls_interview", rationale: "Highest Scout intent + Rival urgency overlap" },
      { rank: 2, slug: "ai-product-manager-skills", cluster_id: "cls_ai_pm", rationale: "Competitor gap + high intent score" },
      { rank: 3, slug: "pm-salary-negotiation", cluster_id: "cls_salary", rationale: "Cross-competitor gap, zero pm-streak coverage" }
    ],
    new_content_angles: [
      "PM Interview Simulator — interactive Q&A practice",
      "AI Tools Roundup for PMs — weekly updated comparison",
      "PM Salary Database — crowdsourced by role and company"
    ]
  }),

  "lyzr-dream-cortex": JSON.stringify({
    dream_snapshot: {
      date: new Date().toISOString().slice(0, 10),
      immediate_creates: [
        { query: "pm interview preparation guide", slug: "pm-interview-prep-guide", rationale: "Scout #1 priority + Rival urgency_score 85 + Blueprint rank 1" },
        { query: "ai product manager skills 2026", slug: "ai-product-manager-skills-2026", rationale: "Scout #2 priority + Rival urgency_score 88 + Blueprint rank 2" },
        { query: "pm salary negotiation guide", slug: "pm-salary-negotiation", rationale: "Rival urgency_score 91 + Blueprint rank 3, no pm-streak page exists" }
      ],
      urgent_rewrites: [
        { slug: "pm-skills-guide", rationale: "Pulse: citability 82→61 over 3 snapshots" },
        { slug: "product-manager-resume", rationale: "Pulse: zero leads 24 consecutive days" }
      ],
      protected_pages: ["pm-interview-questions", "product-roadmap-template"],
      top_content_opportunities: [
        "AI PM skills cluster has 3 high-intent queries with no pm-streak coverage",
        "Salary negotiation is a top Rival gap with urgency 91 — create immediately",
        "Winner pages (pm-interview-questions, product-roadmap-template) should get internal links from new pages"
      ],
      cross_agent_insights: [
        "Reforge AI PM track launch increases urgency for ai-product-manager-skills page",
        "FAQ-heavy pages (≥5 items) consistently win citations — enforce in Forge prompts",
        "PM interview cluster is the single highest-ROI content area this week"
      ],
      kb_supersedes: ["opportunities.jsonl:duplicate_queries", "rival_gaps.json:addressed_topics", "content_plan.json:published_slugs"]
    }
  }),
};

function getMockResponse(sessionId: string): string | null {
  for (const [prefix, response] of Object.entries(MOCK_RESPONSES)) {
    if (sessionId.startsWith(prefix)) return response;
  }
  return null;
}

const ChatResponse = z.object({
  response: z.string(),
  module_outputs: z.record(z.string(), z.unknown()).optional(),
  session_id: z.string().optional(),
});

export class LyzrError extends Error {
  constructor(public agentId: string, public status: number, body: string) {
    super(`Lyzr ${agentId} ${status}: ${body.slice(0, 500)}`);
  }
}

async function fetchJson(path: string, init: RequestInit, timeoutMs = 60_000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LYZR_API_KEY!,
        ...init.headers,
      },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new LyzrError(path, res.status, await res.text());
    return res.json();
  } finally {
    clearTimeout(t);
  }
}

export async function callAgent(
  agentId: string,
  message: string,
  sessionId: string,
  opts: { userId?: string; timeoutMs?: number } = {}
) {
  if (process.env.LYZR_MOCK === "true") {
    const mock = getMockResponse(sessionId);
    if (mock) {
      return ChatResponse.parse({ response: "```json\n" + mock + "\n```", session_id: sessionId });
    }
  }

  const json = await fetchJson(
    `/inference/chat/`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id: opts.userId ?? "pm-streak-system",
        agent_id: agentId,
        session_id: sessionId,
        message,
      }),
    },
    opts.timeoutMs
  );
  return ChatResponse.parse(json);
}

export const Agents = {
  cortex: () => process.env.LYZR_AGENT_CORTEX!,
  blueprint: () => process.env.LYZR_AGENT_BLUEPRINT!,
  scout: () => process.env.LYZR_AGENT_SCOUT!,
  forge: () => process.env.LYZR_AGENT_FORGE!,
  rival: () => process.env.LYZR_AGENT_RIVAL!,
  signal: () => process.env.LYZR_AGENT_SIGNAL!,
  anchor: () => process.env.LYZR_AGENT_ANCHOR!,
  pulse: () => process.env.LYZR_AGENT_PULSE!,
  retrofit: () => process.env.LYZR_AGENT_RETROFIT!,
};

export const callConductor = (message: string, sessionId: string) =>
  callAgent(process.env.LYZR_CONDUCTOR_ID!, message, sessionId, {
    userId: "pm-streak-conductor",
    timeoutMs: 120_000,
  });

export async function getAgent(agentId: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const res = await fetch(`${BASE}/agents/${agentId}`, {
      headers: { "x-api-key": process.env.LYZR_API_KEY! },
      signal: ctrl.signal,
    });
    if (!res.ok) throw new LyzrError(agentId, res.status, await res.text());
    return res.json();
  } finally {
    clearTimeout(t);
  }
}

export async function putAgent(agentId: string, body: object) {
  return fetchJson(`/agents/template/single-task/${agentId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
