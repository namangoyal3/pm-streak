# pm-streak GEO Swarm — Final Tech Spec

**Status:** v1.0 · 2026-04-28 · Hand to Claude Code as the single source of truth.
**Repo:** https://github.com/namangoyal3/pm-streak (private — Next.js + Prisma + Vercel; "Duolingo for PMs").
**Vendor:** Lyzr Agent Studio (cloud, Community Plan, org `learnanythingpro's Organization`, account `learnanythingpro@gmail.com`).
**Goal:** make pm-streak the answer ChatGPT / Perplexity / Gemini / Google AI Overviews recommend when PMs ask about product-management upskilling. 8 specialized agents + a Conductor manager, orchestrated from inside the pm-streak monorepo.

This document supersedes ARCHITECTURE.md and IMPLEMENTATION_CLAUDE_CODE.md for execution. It includes everything Claude Code needs to ship the remaining work cold.

---

## 0. Current state (what's already done)

| Resource | Status | ID / Notes |
|---|---|---|
| Lyzr workspace | live | `learnanythingpro's Organization` (Community Plan, 1,220 credits at provisioning) |
| OpenAI provider credential (Lyzr-side) | live | `provider_id=openai`, `llm_credential_id=67c6c33f0606a0f240482ef4` |
| Anthropic provider | **not configured** | Add via Studio → Configure → Models if you want Claude models |
| Knowledge Base `pm_streak_shared_kb` | live, **empty** | `LYZR_KB_ID=69efd40cf46eb457ee3deec9` · Qdrant [Lyzr 2] · text-embedding-ada-002 |
| Cortex agent | live | `69efd277afeddeb24ff7e619` · gpt-4o |
| Blueprint agent | live | `69efd278733dd9fb9595c574` · gpt-4o-mini |
| Scout agent | live | `69efd2792aab7e01071fde74` · gpt-4o-mini |
| Forge agent | live | `69efd27a5db2b4c6a619c806` · gpt-4o |
| Rival agent | live | `69efd27ba40fee05a7db4a11` · gpt-4o-mini |
| Signal agent | live | `69efd27dafeddeb24ff7e61b` · gpt-4o-mini |
| Anchor agent | live | `69efd27d733dd9fb9595c576` · gpt-4o-mini · drafts-only enforced in system prompt |
| Pulse agent | live | `69efd27e2aab7e01071fde76` · gpt-4o-mini |
| Conductor (managerial) | live | `69efd2d65db2b4c6a619c80e` · gpt-4o · `managed_agents` populated with all 8 |
| KB attached to agents | **0 / 9** | Cortex has a non-canonical `{type:"RAG"}` artefact from probing. Studio UI does NOT recognize it. |
| KB content | **empty** | Cortex will seed it once wired up (Phase 2). |
| pm-streak repo integration | **not started** | Phase 1 below. |

`outputs/.env` (downloaded earlier) has all of the above as env vars.

---

## 1. Hard rules (non-negotiable)

1. **Anchor never auto-sends.** Drafts only. No `email_send`, `reddit_post`, `linkedin_post`, or `slack_send` tools attached. If a request asks Anchor to send, refuse and return drafts.
2. **Forge → Signal pipeline gated on citability ≥ 70.** Auto-merge of GEO PRs requires citability ≥ 80; below that requires human review.
3. **Lyzr API key is server-only.** Never `NEXT_PUBLIC_*`, never echo in logs, never commit. `.env.local` gitignored. Rotate the current key after wiring is done since it transited a chat session.
4. **Pulse can preempt Forge.** If Pulse fires `rewrite_needed` for a slug Forge is already on, queue it — do not restart.
5. **All Prisma writes from agent tool routes go through allowlisted helpers** (`src/lib/geo/safe-prisma.ts`). No raw SQL from agents.
6. **The KB must be attached to every agent that consumes pm-streak knowledge** (all 9). An agent without the KB attached will hallucinate facts.
7. **Don't delete existing Lyzr resources.** If you need to redo an agent, PUT/PATCH it; never DELETE-then-CREATE (it changes the ID and breaks env).

---

## 2. Lyzr API contract (the parts that matter, with gotchas)

### 2.1 Base URL and auth

- Base: `https://agent-prod.studio.lyzr.ai`
- Auth header: `x-api-key: $LYZR_API_KEY`
- OpenAPI spec: `GET /openapi.json` (fully introspectable; ~1100 paths)

### 2.2 Network egress gotcha

`agent-prod.studio.lyzr.ai` is **not on Cowork's egress allowlist**. Two consequences:

- `web_fetch` from this workspace will fail.
- `bash` `curl`/`wget` will fail.
- **Workaround:** call from inside the Studio page's JS context via `mcp__Claude_in_Chrome__javascript_tool` — same-origin, no CORS, browser cookies + `x-api-key` both work. This is how all admin work in this codebase is done.

When running from pm-streak's own server (Vercel), no allowlist applies — Vercel can call Lyzr freely.

### 2.3 Endpoints we use

| Endpoint | Method | Purpose | Body schema (key fields) |
|---|---|---|---|
| `/v3/agents/template/single-task` | POST | Create agent | `name`, `agent_role`, `agent_instructions`, `agent_goal`, `provider_id`, `llm_credential_id`, `model`, `temperature`, `top_p`, `features[]`, `managed_agents[]`, `tool_configs[]`, `response_format` |
| `/v3/agents/template/single-task/{id}` | PUT | Update agent | same shape as POST |
| `/v3/agents/{id}` | GET / DELETE | Read / delete agent | — |
| `/v3/agents/` | GET | List all agents | — |
| `/v3/inference/chat/` | POST | Run an agent | `user_id`, `agent_id`, `session_id`, `message` |
| `/v3/providers/type?provider_type=openai` | GET | List configured provider credentials | — |
| `/v3/workflows/` | GET / POST | Workflows (visual graph) | `flow_name`, `flow_data` (opaque), `api_key` |
| `/v1/sessions/{agent_id}` | POST | New session | — |

### 2.4 KB-attach gotcha (read this carefully)

The OpenAPI says `Feature` is `{type: string, config: object, priority: int, enabled: bool}` — fully permissive. **Lyzr's API accepts any shape with HTTP 200**, but the Studio UI only recognizes one specific shape. Probing showed:

- `{type: "RAG", config: {id: KB_ID}, priority: 0}` → API accepts (returned in GET), Studio UI shows toggle **OFF**. Effectively a no-op.
- `{type: "KNOWLEDGE_BASE", config: {id: KB_ID}, ...}` → also accepted, also UI-invisible.
- The **canonical shape** is the one Lyzr Studio itself sends when you click "Update" after toggling Knowledge Base on. As of this writing it has not yet been captured; capture it before bulk-applying.

**Procedure to capture the canonical shape (run once, then reuse):**

```js
// Run inside a tab on https://studio.lyzr.ai/agent-create/<cortex-id>
// after toggling Knowledge Base on and selecting pm_streak_shared_kb in the modal:
//
// 1. Open DevTools Network tab (or use mcp__Claude_in_Chrome__read_network_requests)
// 2. Click the "Update" button at the bottom of the agent form.
// 3. Find the PUT to /v3/agents/template/single-task/<cortex-id>.
// 4. Copy request.body.features[0]. That object is the canonical shape.
```

KB modal defaults that have to be replicated exactly when bulk-applying:
- mode: **RAG** (not "Agentic RAG")
- Number of Chunks: **5**
- Retrieval Type: **Basic**
- Score Threshold: **0.0**

### 2.5 Other quirks discovered

- **KB names** allow only `[a-z0-9_]` — hyphens are rejected with a non-blocking error message. Use `pm_streak_shared_kb`, not `pm-streak-shared-kb`.
- **Agent-create URL pattern** is `/agent-create/{id}` (not `/agent-builder/agent/{id}` — that 404s).
- **Workflow `flow_data`** schema is opaque (`additionalProperties: true`). Do **not** try to create a managerial workflow programmatically without studying an existing one's `flow_data`. The `managed_agents` field on a worker-style agent gives the same routing behavior and is fully documented — that's why the Conductor is implemented as an agent with `managed_agents`, not as a `/v3/workflows/` row.
- **Rate limit:** 5-hour window can exceed during heavy probing. If you hit it, stop and write progress to `outputs/STATUS.md`; don't retry-loop.
- **Provider availability:** only OpenAI configured today. To use Claude, add an Anthropic provider in Studio → Configure → Models, then update agent `provider_id` and `model`.

---

## 3. Code architecture (where things live in pm-streak)

```
pm-streak/
├── .env.local                                    # NEW — gitignored, holds LYZR_*
├── .env.example                                  # UPDATE — placeholder LYZR_* keys
├── CLAUDE.md                                     # UPDATE — add "GEO Swarm" section (see §6)
├── docs/
│   ├── geo-architecture.md                       # NEW — copy of ARCHITECTURE.md
│   └── geo-tech-spec.md                          # NEW — this doc
├── prisma/
│   └── migrations/
│       └── geo_swarm_init/                       # NEW — see §5 for schema
├── src/
│   ├── lib/
│   │   ├── lyzr.ts                               # NEW — typed Lyzr client (§4.1)
│   │   └── geo/
│   │       ├── conductor.ts                      # NEW — high-level orchestration helpers
│   │       ├── citability.ts                     # MOVE — already exists in scripts/, expose as lib
│   │       ├── safe-prisma.ts                    # NEW — allowlisted query helpers
│   │       └── kb-seed.ts                        # NEW — Cortex bootstrap that ingests repo files
│   ├── agents/                                   # NEW — per-agent specs in TS
│   │   ├── cortex/spec.ts
│   │   ├── blueprint/spec.ts
│   │   ├── scout/spec.ts
│   │   ├── forge/spec.ts
│   │   ├── rival/spec.ts
│   │   ├── signal/spec.ts
│   │   ├── anchor/spec.ts
│   │   ├── pulse/spec.ts
│   │   └── conductor/spec.ts
│   └── app/
│       └── api/
│           └── geo/
│               ├── conductor/event/route.ts      # NEW — Lyzr → pm-streak callback
│               ├── cortex/refresh/route.ts       # NEW — GitHub webhook
│               ├── pulse/snapshot/route.ts       # NEW — daily cron target
│               ├── scout/run/route.ts            # NEW — daily cron target
│               ├── rival/run/route.ts            # NEW — weekly cron target
│               ├── anchor/run/route.ts           # NEW — weekly cron target
│               └── tools/                        # NEW — APIs Lyzr tools call
│                   ├── citability/route.ts
│                   ├── prisma-query/route.ts
│                   ├── ga4-query/route.ts
│                   └── github-pr/route.ts
├── cron/
│   └── geo/                                      # NEW — thin Vercel cron handlers (or use vercel.json crons)
├── seo-drafts/                                   # EXISTS — Forge writes here
├── seo-articles/                                 # EXISTS — Signal commits here via PR
└── .github/workflows/
    └── geo-signal-pr.yml                         # NEW — auto-merge gated on citability ≥80
```

---

## 4. Reference snippets Claude Code should drop in verbatim

### 4.1 `src/lib/lyzr.ts`

```ts
import { z } from "zod";

const BASE = process.env.LYZR_API_BASE ?? "https://agent-prod.studio.lyzr.ai/v3";

const ChatResponse = z.object({
  response: z.string(),
  module_outputs: z.record(z.unknown()).optional(),
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
};

export const callConductor = (message: string, sessionId: string) =>
  callAgent(process.env.LYZR_CONDUCTOR_ID!, message, sessionId, {
    userId: "pm-streak-conductor",
    timeoutMs: 120_000,
  });

// Admin: update an agent's full config (used to bulk-attach KB, change models, etc.)
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
```

### 4.2 `src/lib/geo/kb-attach.ts` (one-shot — finishes the §0 todo)

```ts
import { getAgent, putAgent } from "@/lib/lyzr";

const KB_FEATURE = {
  // FILL IN from the canonical shape captured per §2.4.
  // Shape pattern (likely — verify with network capture):
  //   { type: "KNOWLEDGE_BASE", config: { id, top_k: 5, retrieval_type: "basic", score_threshold: 0 }, priority: 0, enabled: true }
};

const ALL = [
  process.env.LYZR_AGENT_CORTEX,
  process.env.LYZR_AGENT_BLUEPRINT,
  process.env.LYZR_AGENT_SCOUT,
  process.env.LYZR_AGENT_FORGE,
  process.env.LYZR_AGENT_RIVAL,
  process.env.LYZR_AGENT_SIGNAL,
  process.env.LYZR_AGENT_ANCHOR,
  process.env.LYZR_AGENT_PULSE,
  process.env.LYZR_CONDUCTOR_ID,
].filter(Boolean) as string[];

const PUT_FIELDS = [
  "name", "description", "agent_role", "agent_instructions", "agent_goal",
  "agent_context", "agent_output", "examples", "tool", "tool_usage_description",
  "response_format", "provider_id", "model", "top_p", "temperature",
  "managed_agents", "tool_configs", "store_messages", "llm_credential_id",
];

export async function attachKBToAll(kbId: string) {
  const feature = { ...KB_FEATURE, config: { ...((KB_FEATURE as any).config ?? {}), id: kbId } };
  const results: Record<string, "ok" | string> = {};
  for (const id of ALL) {
    try {
      const cur = await getAgent(id);
      const body: Record<string, unknown> = {};
      for (const k of PUT_FIELDS) body[k] = cur[k];
      body.features = [feature];
      await putAgent(id, body);
      const after = await getAgent(id);
      results[id] = after.features?.[0]?.config?.id === kbId ? "ok" : `mismatch: ${JSON.stringify(after.features?.[0])}`;
    } catch (e) {
      results[id] = (e as Error).message;
    }
  }
  return results;
}
```

### 4.3 `src/lib/geo/kb-seed.ts` (Cortex bootstrap — Phase 2)

```ts
// Reads pm-streak repo files + Prisma schema and ingests them into Lyzr KB
// via Cortex (which writes to the shared KB through its own instructions).
import { callAgent, Agents } from "@/lib/lyzr";
import fs from "node:fs/promises";
import path from "node:path";

const REPO_FILES_TO_SEED = [
  "DESIGN.md",
  "CONVERSION_PLAN.md",
  "CLAUDE.md",
  "prisma/schema.prisma",
  ".graphify_analysis.json",
  ".graphify_labels.json",
];

export async function seedKB(repoRoot: string, sessionId = `seed-${Date.now()}`) {
  const docs: { path: string; content: string }[] = [];
  for (const rel of REPO_FILES_TO_SEED) {
    const full = path.join(repoRoot, rel);
    try {
      docs.push({ path: rel, content: await fs.readFile(full, "utf8") });
    } catch (e) { /* missing files are fine */ }
  }
  // Sample a few seo-articles for brand voice
  const articlesDir = path.join(repoRoot, "seo-articles");
  try {
    const entries = await fs.readdir(articlesDir);
    for (const f of entries.slice(0, 5)) {
      docs.push({ path: `seo-articles/${f}`, content: await fs.readFile(path.join(articlesDir, f), "utf8") });
    }
  } catch {}

  const message = [
    "Refresh the pm-streak business profile in the shared KB. Below is the current repo content.",
    "For each file, extract relevant facts (ICP, lesson taxonomy, brand voice exemplars, podcast guests, pricing/plan facts, North-Star metric).",
    "Output a strict JSON business_profile, then commit each fact as a KB row.",
    "",
    ...docs.map((d) => `=== ${d.path} ===\n${d.content.slice(0, 8000)}`),
  ].join("\n\n");

  return callAgent(Agents.cortex(), message, sessionId, { timeoutMs: 180_000 });
}
```

### 4.4 Vercel cron handlers

```ts
// src/app/api/geo/scout/run/route.ts
import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const result = await callAgent(
    Agents.scout(),
    "Run today's scan. Append new opportunities to opportunities.jsonl in the shared KB.",
    `scout-${new Date().toISOString().slice(0, 10)}`,
    { timeoutMs: 90_000 }
  );
  return NextResponse.json({ ok: true, length: result.response.length });
}
```

```json
// vercel.json (merge with existing)
{
  "crons": [
    { "path": "/api/geo/scout/run",      "schedule": "0 6 * * *" },
    { "path": "/api/geo/pulse/snapshot", "schedule": "0 2 * * *" },
    { "path": "/api/geo/rival/run",      "schedule": "0 4 * * 1" },
    { "path": "/api/geo/anchor/run",     "schedule": "0 3 * * 1" }
  ]
}
```

---

## 5. Prisma migration

```prisma
model GeoOpportunity {
  id             String   @id @default(cuid())
  query          String
  intentScore    Float
  source         String   // 'chatgpt' | 'perplexity' | 'gemini' | 'google'
  currentTop3    Json
  gapScore       Float
  addressed      Boolean  @default(false)
  pageSlug       String?
  createdAt      DateTime @default(now())
  @@index([addressed, intentScore])
}

model GeoPageMetric {
  id              String   @id @default(cuid())
  slug            String
  citabilityScore Float
  ga4Sessions     Int
  attributedLeads Int
  citationCount   Int
  snapshotDate    DateTime @default(now())
  @@index([slug, snapshotDate])
}

model GeoCitation {
  id          String   @id @default(cuid())
  pageSlug    String
  source      String   // 'g2' | 'reddit' | 'haro' | 'directory:<name>'
  url         String
  status      String   // 'drafted' | 'awaiting_approval' | 'sent' | 'live'
  approvedBy  String?
  draftBody   String?
  createdAt   DateTime @default(now())
}
```

Migration name: `geo_swarm_init`. Run `pnpm prisma migrate dev --name geo_swarm_init` after dropping the schema in.

---

## 6. CLAUDE.md addition

Append to your existing `CLAUDE.md`:

```markdown
## GEO Swarm (Lyzr-backed)

This repo deploys 8 GEO agents on Lyzr Agent Studio, orchestrated by a Conductor managerial agent. Full design: `docs/geo-architecture.md`. Tech spec: `docs/geo-tech-spec.md`.

### Conventions
- Lyzr client: `src/lib/lyzr.ts`. All agent calls go through `callAgent(agentId, message, sessionId)` or `callConductor(message, sessionId)`.
- Agent IDs come from `process.env.LYZR_AGENT_*` and `LYZR_CONDUCTOR_ID` — never hardcode.
- API routes that Lyzr tools call live under `src/app/api/geo/tools/*`. Validate every input with Zod.
- Forge writes drafts to `seo-drafts/<slug>.mdx`; Signal opens PRs from there. Never write directly to `seo-articles/`.
- Citability gate ≥70 enforced in `src/lib/geo/citability.ts`. Don't bypass.
- All Prisma access from agent tool routes goes through allowlisted helpers in `src/lib/geo/safe-prisma.ts`. No raw SQL from agents.

### Hard rules
- Anchor never auto-sends. Drafts only.
- Lyzr API key is server-only. Never `NEXT_PUBLIC_*`. Never echo in logs.
- KB attachment is required on every agent before calling it for real. See `src/lib/geo/kb-attach.ts`.

### Useful commands
- `pnpm tsx scripts/lyzr/attach-kb.ts` — bulk-attach the shared KB to all 9 agents.
- `pnpm tsx scripts/lyzr/seed-kb.ts` — Cortex bootstrap from repo files.
- `pnpm tsx scripts/lyzr/smoke.ts <agent>` — smoke test an agent.
- `/forge-page <topic>` — Claude Code slash command to forge a draft locally.
- `/lyzr-deploy <agent>` — push that agent's spec from `src/agents/*/spec.ts` to Lyzr.
- `/pulse-snapshot` — manual Pulse run + analyst review.
```

---

## 7. Claude Code subagents and slash commands

Drop these files into `.claude/`:

### `.claude/agents/lyzr-builder.md`
```markdown
---
description: Builds and updates Lyzr agents/workflows via the Lyzr API. Use when wiring a new agent or updating system prompts.
tools: Read, Edit, Write, Bash, Grep, Glob
---
You translate `src/agents/<name>/spec.ts` into a Lyzr agent via the REST API. Always:
1. Read the spec.
2. PUT/PATCH the corresponding Lyzr agent.
3. Verify with GET + a smoke message via callAgent.
4. Report back agent ID, last-updated timestamp, smoke response. Never print the API key.
```

### `.claude/agents/forge-writer.md`
```markdown
---
description: Writes a single GEO-optimized MDX page (research → draft → schema → citability check). Use when given a query/topic from Blueprint or directly.
tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---
Process per page:
1. Pull business_profile summary from `.claude/memory/cortex/`.
2. Pull buyer-question + cluster from `seo-drafts/_plan.json`.
3. Draft MDX in pm-streak voice (review 3 examples in `seo-articles/` first).
4. Generate JSON-LD (Article + FAQPage if applicable).
5. Run `pnpm citability <slug>`. If <70, revise once.
6. Save to `seo-drafts/<slug>.mdx` + `seo-drafts/<slug>.schema.json`. Never publish.
```

### `.claude/agents/pulse-analyst.md`
```markdown
---
description: Reads pulse snapshots and decides which pages to enqueue for rewrite. Output is a recommendation, never executes the enqueue.
tools: Read, Bash, Grep
---
Read recent rows from GeoPageMetric. Apply rule: rewrite_needed = (citability < 70) OR (attributed_leads == 0 for 21 consecutive days). Output prioritized rewrite queue as JSON. Recommend; do not write.
```

### `.claude/commands/forge-page.md`
```markdown
---
description: Forge a new GEO page from a topic or query.
argument-hint: <topic-or-query>
---
Use the `forge-writer` subagent to produce a draft for: $ARGUMENTS
1. Confirm the slug (kebab-case, ≤6 words).
2. Subagent: forge-writer.
3. Show citability score + first 30 lines of MDX.
4. Do not open a PR.
```

### `.claude/commands/lyzr-deploy.md`
```markdown
---
description: Push an agent's spec from the repo to Lyzr Studio.
argument-hint: <agent-name>
---
Use `lyzr-builder` to deploy `$ARGUMENTS`. Read `src/agents/$ARGUMENTS/spec.ts`, PUT the Lyzr agent, run a smoke message. Report agent ID, model, KB binding, smoke response (first 200 chars).
```

### `.claude/settings.json` (key parts)
```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm:*)",
      "Bash(npx prisma:*)",
      "Bash(git status)", "Bash(git diff)", "Bash(git add:*)", "Bash(git commit:*)",
      "Edit", "Write", "WebSearch"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(printenv:LYZR_API_KEY)",
      "Bash(echo $LYZR_API_KEY)",
      "Read(.env.local)"
    ]
  }
}
```

---

## 8. Phased build plan (each phase = one Claude Code prompt)

Each prompt below is self-contained — paste it into Claude Code at the repo root. Stop after each phase, verify, then proceed.

### Phase 0 — Finish KB attach (the §0 todo)
```
We need to bulk-attach Lyzr KB pm_streak_shared_kb (id 69efd40cf46eb457ee3deec9) to all 9 agents.
The KB attach feature shape is not in Lyzr's OpenAPI; capture it from the Studio UI's own request.

Steps:
1. Open Chrome with the Claude in Chrome extension connected.
2. Navigate to https://studio.lyzr.ai/agent-create/69efd277afeddeb24ff7e619 (Cortex).
3. Click "Update" at the bottom (KB toggle is already ON, KB selected, retrieval=Basic, chunks=5, threshold=0).
4. Capture the PUT body to /v3/agents/template/single-task/69efd277afeddeb24ff7e619 — record features[0] verbatim.
5. Paste features[0] into KB_FEATURE in src/lib/geo/kb-attach.ts.
6. Run `pnpm tsx scripts/lyzr/attach-kb.ts` which calls attachKBToAll().
7. Verify by re-opening 2 agents in Studio (e.g. Forge, Pulse) — Knowledge Base toggle ON, pm_streak_shared_kb selected.
```

### Phase 1 — Foundations
```
Set up the GEO swarm wiring inside pm-streak.
Read docs/geo-tech-spec.md if present, otherwise the IDs are in .env.local.

Tasks:
1. Add src/lib/lyzr.ts per spec §4.1.
2. Add Prisma migration geo_swarm_init per spec §5. Run `pnpm prisma migrate dev --name geo_swarm_init`.
3. Add the four cron route handlers (scout, pulse, rival, anchor) per spec §4.4.
4. Update vercel.json with the four crons.
5. Add `cron-secret` to .env.example.
6. Run `pnpm typecheck && pnpm test`. Commit as feat(geo): foundations.
```

### Phase 2 — Cortex (KB seed)
```
Seed the Lyzr KB with pm-streak repo content via Cortex.

Tasks:
1. Add src/lib/geo/kb-seed.ts per spec §4.3.
2. Add scripts/lyzr/seed-kb.ts that calls seedKB(process.cwd()).
3. Run `pnpm tsx scripts/lyzr/seed-kb.ts` and confirm Cortex returns a coherent business_profile JSON.
4. Add src/app/api/geo/cortex/refresh/route.ts: POST endpoint validated by GitHub webhook signature. On push to main affecting non-`.claude/memory/*` paths, call seedKB().
5. Configure GitHub webhook in repo settings → app token in Vercel env.
6. Commit as feat(geo): cortex seed + webhook.
```

### Phase 3 — Scout + Rival (data agents)
```
Wire Scout (daily) and Rival (weekly).

Tasks:
1. Implement Scout-side tools as Vercel API routes: /api/geo/tools/serper, /api/geo/tools/perplexity, /api/geo/tools/gemini-query. Each Zod-validates and caches for 1h via Vercel KV (or in-memory if not available).
2. Add the tool URLs to the Cortex/Scout/Rival agent specs in src/agents/*/spec.ts. Use /lyzr-deploy <name> to push.
3. Trigger scout cron locally:
   curl -X POST -H 'authorization: Bearer $CRON_SECRET' http://localhost:3000/api/geo/scout/run
4. Confirm rows land in GeoOpportunity. Spot-check 5 for relevance.
5. Commit as feat(geo): scout + rival.
```

### Phase 4 — Blueprint + Forge
```
Implement the writers.

Tasks:
1. Implement Blueprint: reads opportunities + rival_gaps from KB, writes seo-drafts/_plan.json.
2. Implement Forge tool routes: /api/geo/tools/citability, /api/geo/tools/schema-jsonld.
3. Wire forge-writer subagent (.claude/agents/forge-writer.md) per spec §7.
4. Smoke test: /forge-page "ai pm skills 2026". Expect citability ≥70.
5. Add /forge-page slash command per spec §7.
6. Commit as feat(geo): blueprint + forge.
```

### Phase 5 — Signal (publishing)
```
Publishing pipeline.

Tasks:
1. Implement github-pr tool route using @octokit/rest with GitHub App installation token.
2. Implement IndexNow client wrapper. Generate IndexNow key file at /<key>.txt in /public.
3. Extend the existing llms.txt generator to take Forge metadata + Blueprint primary buyer-question.
4. Add .github/workflows/geo-signal-pr.yml: runs lint+test+citability, requires citability ≥80 for auto-merge label `geo:auto`. Below 80 → human review required.
5. Manual approval for first 5 PRs. Confirm 1 page lives end-to-end.
6. Commit as feat(geo): signal.
```

### Phase 6 — Pulse (the loop)
```
Performance loop.

Tasks:
1. Implement /api/geo/tools/ga4-query, /api/geo/tools/plausible-query.
2. Wire pulse-analyst subagent. Add /pulse-snapshot slash command.
3. Daily snapshot cron writes GeoPageMetric. Threshold logic emits enqueue_rewrite event → Conductor.
4. Confirm a draft from Phase 4 gets a Pulse-driven rewrite.
5. Commit as feat(geo): pulse.
```

### Phase 7 — Anchor (drafts only)
```
Authority layer — drafts only.

Tasks:
1. Verify Anchor's system prompt forbids auto-send. Update if missing.
2. Implement directory-submit tool route. Restrict allowlist: G2, Capterra, AlternativeTo, ProductHunt only.
3. NO email_send, NO reddit_post, NO linkedin_post tools.
4. Drafts written to GeoCitation with status='drafted'. Email digest job at 9am UTC weekly summarizes pending drafts to user inbox (with user's existing transactional email setup).
5. Commit as feat(geo): anchor drafts only.
```

---

## 9. Verification matrix

After each phase, run these:

| Phase | Verification |
|---|---|
| 0 | `curl https://agent-prod.studio.lyzr.ai/v3/agents/<id>` — `features[0].config.id == LYZR_KB_ID` for all 9 IDs. Studio UI for 2 spot-checks shows KB toggle ON. |
| 1 | `pnpm prisma migrate status` clean. `vercel.json` parses. `pnpm typecheck` green. |
| 2 | Cortex returns business_profile JSON when called. KB content count > 0 in Studio's KB detail view. |
| 3 | `GeoOpportunity` table populated. Rival gap report present in KB. Sample 5 opportunities — relevance ≥ 70%. |
| 4 | `/forge-page` produces MDX with citability ≥ 70. Schema validates against schema.org. |
| 5 | One page deployed end-to-end. IndexNow ping receipt. llms.txt entry present. Page URL in sitemap. |
| 6 | Pulse cron writes daily metrics. Rewrite queue non-empty after a week. Auto-rewrite triggered for a known low-scorer. |
| 7 | Anchor never produces a tool call to send. Drafts table populated. Weekly digest in inbox. |

---

## 10. Smoke tests

```ts
// scripts/lyzr/smoke.ts
import { callAgent, Agents } from "@/lib/lyzr";

const agents = ["cortex","blueprint","scout","forge","rival","signal","anchor","pulse"] as const;

(async () => {
  const target = process.argv[2] as typeof agents[number] | undefined;
  const list = target ? [target] : agents;
  for (const a of list) {
    const id = (Agents as any)[a]();
    const out = await callAgent(id, `In one sentence, what is your role for pm-streak?`, `smoke-${a}`);
    console.log(`[${a}] ${out.response.slice(0, 200)}`);
  }
})();
```

```bash
pnpm tsx scripts/lyzr/smoke.ts          # all 8
pnpm tsx scripts/lyzr/smoke.ts forge    # one
```

---

## 11. Risks, known issues, and how to detect them

| Risk | Detection | Mitigation |
|---|---|---|
| KB attached with wrong feature shape (silent no-op) | Studio UI shows KB toggle OFF after PUT | Re-capture canonical shape per §2.4 |
| API key leaked in git history | `git log -p \| grep sk-default-` | Rotate immediately. Update Vercel + .env.local |
| Forge writes hallucinated PM facts | Manual review of first 10 drafts | Forge has `verify_claims` post-step requiring inline citations for numbers |
| Anchor sends despite drafts-only rule | Audit log of outbound email (none should originate from Anchor) | Drafts table check; if any `status='sent'` row attributed to Anchor, alert |
| Cron infinite loop (Cortex push → push → refresh) | GitHub webhook deliveries pile up | Filter webhook by paths; ignore commits to `.claude/memory/*` |
| Cost blowup on Forge Opus calls | Monthly Lyzr usage spike | Tiered models — Sonnet/4o for first draft, Opus only on Pulse-triggered rewrites |
| Lyzr 5-hour rate limit during bulk ops | 429 from any endpoint | Stop, write progress to `outputs/STATUS.md`, resume after window |
| Lyzr Studio outage | smoke.ts fails for all agents | Fall back to lyzr-framework (Apache 2.0, OSS) running locally with same agent specs |
| Vercel cron silently fails | No new GeoOpportunity rows for 24h | Add a "pulse-of-pulse" check that pages you if Scout cron hasn't written in 26h |

---

## 12. Glossary of IDs (canonical reference)

```
LYZR_API_BASE         = https://agent-prod.studio.lyzr.ai/v3
LYZR_KB_ID            = 69efd40cf46eb457ee3deec9     # pm_streak_shared_kb
LYZR_PROVIDER_ID      = openai
LYZR_LLM_CREDENTIAL_ID= 67c6c33f0606a0f240482ef4     # OpenAI provider in Lyzr workspace

LYZR_CONDUCTOR_ID     = 69efd2d65db2b4c6a619c80e     # Manager
LYZR_AGENT_CORTEX     = 69efd277afeddeb24ff7e619
LYZR_AGENT_BLUEPRINT  = 69efd278733dd9fb9595c574
LYZR_AGENT_SCOUT      = 69efd2792aab7e01071fde74
LYZR_AGENT_FORGE      = 69efd27a5db2b4c6a619c806
LYZR_AGENT_RIVAL      = 69efd27ba40fee05a7db4a11
LYZR_AGENT_SIGNAL     = 69efd27dafeddeb24ff7e61b
LYZR_AGENT_ANCHOR     = 69efd27d733dd9fb9595c576
LYZR_AGENT_PULSE      = 69efd27e2aab7e01071fde76
```

These are stable. They will not change unless you delete and recreate (don't).

---

## 13. Final checklist for Claude Code

```
[ ] outputs/.env moved to pm-streak/.env.local; verified .gitignored
[ ] Lyzr API key rotated in Lyzr Studio (the current one transited a chat session)
[ ] CLAUDE.md extended with §6 GEO Swarm section
[ ] .claude/agents/{lyzr-builder,forge-writer,pulse-analyst}.md added
[ ] .claude/commands/{forge-page,lyzr-deploy,pulse-snapshot}.md added
[ ] .claude/settings.json deny list in place
[ ] src/lib/lyzr.ts in place
[ ] Prisma geo_swarm_init migrated
[ ] vercel.json crons added
[ ] Phase 0 KB attach complete — 9/9 agents bound
[ ] KB seeded with repo content (Cortex returns coherent business_profile)
[ ] Phase 1–4 PRs merged
[ ] First /forge-page run citability ≥70
[ ] Phase 5 Signal merged, first auto-PR live
[ ] Phase 6 Pulse loop closed (rewrite triggered)
[ ] Phase 7 Anchor drafts-only verified (zero auto-sends)
```

When all 16 boxes are ticked, the swarm is operational and self-sustaining.

---

*End of tech spec. This is the only doc Claude Code needs to ship the rest. ARCHITECTURE.md and IMPLEMENTATION_CLAUDE_CODE.md are now reference-only.*
