# PM Streak GEO Swarm — Architecture

**Goal:** ship an open-source clone of Lucato AI's 8-agent GEO platform, deployed on **Lyzr Agent Studio (cloud)**, integrated with the existing **pm-streak** Next.js / Prisma / Vercel codebase so that every PM-related buyer question on ChatGPT, Perplexity, Gemini, and Google AI Overviews surfaces pm-streak as the answer.

**Author:** namangoyal3 · **Status:** Design doc · **Target stack:** Lyzr Agent Studio + pm-streak (Next.js / TypeScript / Prisma / Vercel)

---

## 1. System overview

```
                 ┌────────────────────────────────────────────────┐
                 │           Lyzr Agent Studio (cloud)            │
                 │                                                │
        ┌────────┤  Conductor (Manager Agent — Lyzr Managerial)   │
        │        │     ├─ Cortex   (BI / shared KB writer)        │
        │        │     ├─ Blueprint (strategy)                    │
  cron  │        │     ├─ Scout    (demand intel)                 │
  webhk │        │     ├─ Forge    (content & design)             │
        │        │     ├─ Rival    (competitive intel)            │
        │        │     ├─ Signal   (publishing & indexing)        │
        │        │     ├─ Anchor   (authority & citation)         │
        │        │     └─ Pulse    (performance & feedback loop)  │
        │        │                                                │
        │        │  Shared Knowledge Base (RAG)                   │
        │        │   ├─ business_profile.json   (Cortex)          │
        │        │   ├─ keyword_clusters.json   (Blueprint)       │
        │        │   ├─ opportunities.jsonl     (Scout)           │
        │        │   ├─ rival_gaps.json         (Rival)           │
        │        │   ├─ citations.jsonl         (Anchor)          │
        │        │   └─ pulse_metrics.jsonl     (Pulse)           │
        │        └────────────────────────────────────────────────┘
        │                          │  REST (Lyzr Agent API)
        ▼                          ▼
┌──────────────────┐    ┌───────────────────────────────┐
│  Vercel Cron     │    │  pm-streak (Next.js, Prisma)  │
│  (existing /cron │◄───┤   /seo-articles, /seo-drafts  │
│  handlers)       │    │   /cron/*, /scripts/*         │
└──────────────────┘    │   .graphify_*, llms.txt       │
                        │   citability scorer           │
                        └───────────────────────────────┘
                                   │
                                   ▼
                           GitHub PR + Vercel deploy
```

### What's already in pm-streak that we reuse

| Existing artifact | Used by | Why it matters |
|---|---|---|
| `cron/` | Conductor triggers | Vercel cron already wired — we add HTTP calls to Lyzr Agent API endpoints from here. |
| `seo-articles/`, `seo-drafts/` | Forge, Signal | Forge writes drafts here; Signal opens PRs. |
| `.graphify_analysis.json`, `.graphify_ast.json`, `.graphify_labels.json` | Cortex KB seed, Blueprint | Existing site-graph + label data, perfect Cortex memory seed. |
| `llms.txt` support (per Apr 14 commit) | Signal | Already produced by the SEO pipeline — Signal extends. |
| Citability scoring (per Apr 21 commit, 35.2 → 76) | Pulse | Becomes Pulse's primary KPI tool. |
| `.claude/` agent memory | Cortex | Mirror to Lyzr KB so Cortex starts pre-warmed. |
| `prisma/` schema (lessons, users, leads) | Cortex, Pulse | Lead-flow truth source for Pulse's feedback loop. |
| `scripts/` | Tool wrappers | Existing Python/TS helpers exposed as Lyzr custom tools. |

---

## 2. The 8 agents — Lyzr-native specs

Every agent is a **Lyzr Agent Studio agent** with a system prompt, model, knowledge-base bindings, and a tool list. The **Conductor** is a Lyzr **Managerial workflow** that delegates and aggregates.

### 2.1 Cortex — Business Intelligence
*"Living profile of pm-streak that every other agent reads from."*

| Field | Value |
|---|---|
| Lyzr role | Worker agent (also writes to shared KB) |
| Model | Claude Sonnet 4.6 (long context for repo ingestion) |
| Knowledge base inputs | `DESIGN.md`, `CONVERSION_PLAN.md`, `CLAUDE.md`, `.graphify_*.json`, `prisma/schema.prisma`, sampled `seo-articles/*`, public landing pages via scrape |
| Outputs (KB) | `business_profile.json` — ICP, taxonomy, brand voice exemplars, pricing/plan facts, lesson catalog, podcast-guest map |
| Tools | `scrape_url`, `read_repo_file` (GitHub MCP / `octokit`), `prisma_query`, `embed_brand_voice` |
| Trigger | (a) GitHub webhook on push to `main`, (b) weekly Vercel cron |
| SLA | Refresh in <5 min after push |

### 2.2 Blueprint — Content Strategy
*"Roadmap from buyer questions to page types."*

| Field | Value |
|---|---|
| Lyzr role | Worker agent |
| Model | GPT-4.1 (or Claude Sonnet) — needs structured output |
| Inputs | `business_profile.json` (Cortex), `opportunities.jsonl` (Scout), `rival_gaps.json` (Rival) |
| Outputs (KB) | `content_plan.json` — clusters, page-type per cluster (pillar/comparison/use-case/glossary), title, target-query list, GEO score target |
| Tools | `cluster_keywords` (custom tool wrapping HDBSCAN over query embeddings), `score_buyer_intent`, `assign_page_type` |
| Trigger | Weekly + on Scout signal of new high-intent cluster |

### 2.3 Scout — Demand Intelligence
*"What is the PM crowd actually asking AI right now?"*

| Field | Value |
|---|---|
| Lyzr role | Worker agent |
| Model | GPT-4.1-mini (volume calls) |
| Outputs (KB) | `opportunities.jsonl` — `{query, intent_score, llm_source, current_top_3, gap_score, ts}` |
| Tools | `serper_search`, `perplexity_query`, `chatgpt_share_scraper` (open-source: `chatgpt-search-engine` lib), `gemini_query`, `google_trends`, `reddit_pm_scraper` |
| Trigger | Daily Vercel cron at 06:00 UTC |
| Notes | PM-specific seed terms come from `business_profile.json`; Scout expands them via the LLMs themselves to find their preferred phrasing. |

### 2.4 Forge — Content & Design
*"Writes the page, designs the layout, ships the MDX."*

| Field | Value |
|---|---|
| Lyzr role | Worker agent (chained: writer → schema → image → MDX) |
| Model | Claude Opus 4.6 for prose, GPT-4.1 for schema/JSON |
| KB inputs | `business_profile.json`, brand-voice samples |
| Outputs | MDX file in `seo-drafts/<slug>.mdx`, paired `<slug>.schema.json` (JSON-LD), `<slug>.meta.json` |
| Tools | `write_mdx`, `generate_jsonld` (Article / FAQPage / HowTo / SoftwareApplication / Product), `image_gen` (Imagen 3 or DALL-E 3), `tailwind_template_apply` (matches pm-streak's existing Tailwind theme), `citability_score` (calls existing scorer in `scripts/`) |
| Quality gate | Page must score ≥70 on internal citability metric before Signal will publish |
| Trigger | Conductor delegates per Blueprint plan item |

### 2.5 Rival — Competitive Intel
*"Reforge, Lenny's Newsletter, Product School, Maven, Section, IVPM — what they rank for, where the gaps are."*

| Field | Value |
|---|---|
| Lyzr role | Worker agent |
| Model | GPT-4.1 |
| Outputs (KB) | `rival_gaps.json` — per competitor: ranking topics, content velocity, schema usage, llms.txt presence, gap topics |
| Tools | `scrape_url`, `sitemap_parse`, `compare_pages_llm`, `serpapi_overlap` |
| Trigger | Weekly |

### 2.6 Signal — Publishing & Indexing
*"Schema, llms.txt, internal links, IndexNow — the crawler-readable layer."*

| Field | Value |
|---|---|
| Lyzr role | Workflow agent (deterministic pipeline) |
| Model | None for the orchestrator step (pure tool calls); GPT-4.1-mini for internal-link selection |
| Tools | `github_pr_create` (uses installation token), `vercel_deploy_trigger`, `schema_inject` (post-processes MDX to ensure JSON-LD is present), `llms_txt_update` (extends pm-streak's existing generator), `sitemap_update`, `indexnow_submit` (Bing + Yandex), `gsc_inspect` (Google Search Console URL inspection), `internal_link_optimizer` (uses `.graphify_ast.json`) |
| Output | Live URL on `pm-streak.app`, sitemap entry, llms.txt entry, IndexNow ping receipt |
| Trigger | Forge "draft ready" event |
| Safety | No write actions on third-party platforms; PRs gated on CI green. |

### 2.7 Anchor — Authority & Citation
*"Get pm-streak cited on the sites AI engines already trust."*

| Field | Value |
|---|---|
| Lyzr role | Worker agent (with **mandatory human-in-the-loop** for outreach) |
| Model | Claude Sonnet 4.6 (drafts, no auto-send) |
| Outputs (KB) | `citations.jsonl` |
| Tools | `directory_submit` (G2, Capterra, Product Hunt, AlternativeTo, allowlisted only), `haro_responder_draft`, `reddit_post_draft` (`r/ProductManagement`, `r/IndieHackers` — never auto-posted), `linkedin_post_draft`, `email_draft` (no send tool — drafts go to your inbox for approval) |
| Policy | **Anchor never sends email or posts publicly without explicit human approval.** All outreach output is a draft + suggested target. |
| Trigger | Weekly batch; gap-driven (new pillar published → seed citations) |

### 2.8 Pulse — Performance
*"The feedback loop. Underperformers get rewritten."*

| Field | Value |
|---|---|
| Lyzr role | Monitor agent (event emitter back to Conductor) |
| Model | GPT-4.1-mini |
| KB output | `pulse_metrics.jsonl` — daily snapshot per URL: GA4 sessions, Plausible events, Prisma `lead` rows attributed, AI-citation count (from `gego`-style cross-LLM probes), citability score |
| Tools | `prisma_query` (existing pm-streak lead table), `ga4_query`, `plausible_query`, `serpapi_track`, `gego_probe` (open-source: cross-LLM brand-mention tracker), `citability_score`, `enqueue_rewrite` (sends signal to Conductor → Forge) |
| Decision logic | If `citability_score < 70` OR `lead_attribution = 0` for 21 consecutive days → enqueue rewrite. If page is in top 3 across all 4 engines → mark "winner", protect from rewrite. |
| Trigger | Daily 02:00 UTC |

---

## 3. Lyzr Agent Studio configuration

### 3.1 Workspace layout

Create one Lyzr workspace `pm-streak-geo` containing:

1. **8 Agents** — one per role above. Each gets a stable Agent ID + REST endpoint of the form `https://agent-prod.studio.lyzr.ai/v3/inference/chat/`.
2. **1 Knowledge Base** — `pm-streak-shared-kb` with semantic chunking on. Every agent has read access; Cortex/Scout/Rival/Pulse have write access via the `kb_write` tool.
3. **1 Managerial Workflow** — `pm-streak-conductor` — declares the agents above as workers and routes by intent (rules-based router, not LLM-based — cheaper and deterministic).
4. **Custom tools** — registered as Lyzr tools (OpenAPI specs). The non-trivial ones (`citability_score`, `gego_probe`, `cluster_keywords`) live in pm-streak's `scripts/` and are exposed as Vercel API routes that Lyzr calls.
5. **Models** — set per-agent in Studio (no need for a global default). Use the cheapest model that hits the quality bar — Cortex/Forge get the heavy models, everyone else mini.

### 3.2 Authentication & secrets

| Secret | Stored in | Used by |
|---|---|---|
| `LYZR_API_KEY` | Vercel env (server-side only) | pm-streak `cron/*` handlers |
| `LYZR_AGENT_IDS` | Vercel env (JSON map) | pm-streak Conductor proxy |
| OpenAI/Anthropic/Google keys | Lyzr Studio secrets manager | Each agent |
| GitHub App token | Lyzr custom-tool secret | Signal's `github_pr_create` |
| SerpAPI / Perplexity / Hunter.io | Lyzr custom-tool secrets | Scout, Rival, Anchor |
| GA4 service account | Vercel | Pulse (proxied through pm-streak API route) |

Never put third-party API keys in agent system prompts; use Lyzr's tool-secret feature.

### 3.3 Agent API call shape (from pm-streak)

```ts
// src/lib/lyzr.ts (new file)
export async function callAgent(agentId: string, message: string, sessionId: string) {
  const res = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.LYZR_API_KEY!,
    },
    body: JSON.stringify({
      user_id: "pm-streak-system",
      agent_id: agentId,
      session_id: sessionId,
      message,
    }),
  });
  if (!res.ok) throw new Error(`Lyzr ${agentId} ${res.status}`);
  return res.json();
}
```

---

## 4. Orchestration — how the loop actually runs

### 4.1 Schedules (Vercel `vercel.json` → Lyzr)

| Cron | Frequency | What it kicks off |
|---|---|---|
| `0 2 * * *` | Daily 02:00 UTC | Pulse → emits rewrite events |
| `0 6 * * *` | Daily 06:00 UTC | Scout → opportunities update |
| `0 4 * * 1` | Monday 04:00 UTC | Rival + Blueprint (weekly refresh) |
| `0 3 * * 1` | Monday 03:00 UTC | Anchor batch (drafts to inbox) |
| (webhook) | On push to `main` | Cortex profile refresh |

### 4.2 Event flow per new opportunity (happy path)

```
Scout → opportunity row written to KB
   │
   ▼
Conductor sees high-intent unaddressed query → asks Blueprint
   │
   ▼
Blueprint adds page-plan row → Conductor delegates to Forge
   │
   ▼
Forge writes draft + schema + image, runs citability_score
   │       (gate: must be ≥70)
   ▼
Signal opens PR → CI green → auto-merge → Vercel deploy → IndexNow ping
   │
   ▼
Pulse picks up the URL the next day, starts tracking
   │
   ▼
After 7 days, Pulse evaluates:  if citation_count == 0 → enqueue rewrite
                                 if winning → freeze + signal Anchor
```

### 4.3 Conductor logic (managerial)

Use Lyzr's **Managerial workflow** (not DAG) — the workers' outputs are non-deterministic, so you want the manager LLM to decide when a step is "good enough". A rules-only router would underuse the model.

System prompt for Conductor (sketch):

> You are the conductor for pm-streak's GEO swarm. Workers: cortex, blueprint, scout, forge, rival, signal, anchor, pulse. For every incoming event, decide which workers to call, in what order, and when to stop. Always respect: (1) Forge output must pass citability gate before Signal, (2) Anchor outreach must be human-approved, (3) Pulse can preempt — if Pulse fires `rewrite_needed` for a page Forge is already on, queue, don't restart.

---

## 5. Integration with the pm-streak repo

### 5.1 New files / directories to add

```
pm-streak/
├── src/
│   └── lib/
│       ├── lyzr.ts                         # Agent API client
│       └── geo/
│           ├── conductor-proxy.ts          # Local proxy → Lyzr Conductor
│           ├── citability.ts               # (already exists, expose as API)
│           ├── gego-probe.ts               # cross-LLM brand-mention probe
│           └── tools/
│               ├── github-pr.ts
│               ├── indexnow.ts
│               └── llms-txt.ts
├── src/app/api/
│   ├── geo/
│   │   ├── cortex/refresh/route.ts         # Webhook from GitHub
│   │   ├── pulse/snapshot/route.ts         # Cron target
│   │   ├── scout/run/route.ts              # Cron target
│   │   ├── conductor/event/route.ts        # Lyzr → pm-streak callback
│   │   └── tools/                          # OpenAPI-spec'd tools Lyzr calls
│   │       ├── citability/route.ts
│   │       ├── prisma-query/route.ts       # safe, allow-listed queries only
│   │       └── ga4-query/route.ts
├── cron/
│   └── geo/                                # Vercel cron handlers (thin)
│       ├── daily-pulse.ts
│       ├── daily-scout.ts
│       ├── weekly-rival.ts
│       └── weekly-anchor.ts
├── docs/
│   └── geo-architecture.md                 # this doc
└── seo-drafts/                             # Forge writes here (already exists)
```

### 5.2 New Prisma models

```prisma
model GeoOpportunity {
  id            String   @id @default(cuid())
  query         String
  intentScore   Float
  source        String   // 'chatgpt' | 'perplexity' | 'gemini' | 'google'
  currentTop3   Json
  gapScore      Float
  addressed     Boolean  @default(false)
  pageSlug      String?
  createdAt     DateTime @default(now())
  @@index([addressed, intentScore])
}

model GeoPageMetric {
  id            String   @id @default(cuid())
  slug          String
  citabilityScore Float
  ga4Sessions   Int
  attributedLeads Int
  citationCount Int      // from gego-probe
  snapshotDate  DateTime @default(now())
  @@index([slug, snapshotDate])
}

model GeoCitation {
  id        String   @id @default(cuid())
  pageSlug  String
  source    String   // 'g2' | 'reddit' | 'haro' | 'directory:<name>'
  url       String
  status    String   // 'drafted' | 'awaiting_approval' | 'sent' | 'live'
  approvedBy String?
  createdAt DateTime @default(now())
}
```

### 5.3 GitHub Actions

Reuse `.github/workflows/`. Add one workflow:

- `geo-signal-pr.yml` — triggered by Signal via repository_dispatch; verifies citability ≥70 in CI, runs lint/typecheck, opens PR labeled `geo:auto`.

Auto-merge only when: CI green **and** PR carries the `geo:auto` label **and** no human review requested **and** page has citability ≥80. Below 80 → human review required.

### 5.4 llms.txt extension

Today's `llms.txt` is generated by the SEO pipeline (per the Apr 14 commit). Extend it so Signal injects:

- Per-page summary (≤160 chars, lifted from the page's `<meta name="description">` after Forge write).
- Per-page primary buyer-question (from Blueprint's plan).
- A `# pm-streak — for AI` section pointing to the canonical sitemap, the public Prisma stats endpoint (lessons count, current streak distribution), and the ICP definition.

---

## 6. Open-source dependencies

These are the pieces you don't have to build:

| Need | OSS project | License | How we use it |
|---|---|---|---|
| Multi-LLM brand probing | [`AI2HU/gego`](https://github.com/AI2HU/gego) | MIT | Pulse's `gego_probe` tool. Schedule prompts across ChatGPT/Perplexity/Gemini, parse mention/citation. |
| GEO audit logic | [`Auriti-Labs/geo-optimizer-skill`](https://github.com/Auriti-Labs/geo-optimizer-skill) | open | Forge's pre-publish lint; Cortex's "GEO baseline" report. |
| GEO content rewriter | [`cxcscmu/AutoGEO`](https://github.com/cxcscmu/AutoGEO) | research code, ICLR'26 | Forge's optional rewrite pass; Pulse-triggered improvements. |
| Awesome list (research/index) | [`amplifying-ai/awesome-generative-engine-optimization`](https://github.com/amplifying-ai/awesome-generative-engine-optimization) | open | Cortex KB seed for "what good looks like". |
| Open-source AEO/AIO toolkit | [`ai-search-guru/getcito`](https://github.com/ai-search-guru/getcito-worlds-first-open-source-aio-aeo-or-geo-tool) | open | Reference for citability rubric. |
| Lyzr Automata fallback | [`LyzrCore/lyzr-framework`](https://github.com/LyzrCore/lyzr-framework) | Apache 2.0 | Local debug; if Studio is down, Conductor can run on Automata. |
| Schema.org JSON-LD | `schema-dts` (npm) | Apache 2.0 | Forge's typed JSON-LD generation. |
| IndexNow client | `indexnow` npm package | MIT | Signal's instant indexing. |
| Embeddings + clustering | `@xenova/transformers` + `hdbscan-ts` | MIT | Blueprint's local keyword clustering (no per-call cost). |

---

## 7. Rollout plan (phased, 6 weeks)

| Week | Milestone | Acceptance |
|---|---|---|
| 1 | Lyzr workspace + Cortex agent stood up; KB seeded from `.claude/`, `.graphify_*`, `DESIGN.md`. | Calling Cortex via REST returns a coherent business-profile summary. |
| 2 | Scout + Rival live. Daily cron writes `opportunities.jsonl` and `rival_gaps.json`. | 50+ opportunities surfaced in week 1; spot-check shows ≥70% relevance. |
| 3 | Blueprint + Forge end-to-end (no Signal yet). Drafts land in `seo-drafts/`. | One Blueprint cluster → 3 Forge drafts, all ≥70 citability. |
| 4 | Signal wired up. Manual approval for first 5 PRs, then auto-merge ≥80. | One pillar live on `pm-streak.app` end-to-end. |
| 5 | Pulse online. Feedback loop closes — first auto-rewrite triggered. | A draft from week 3 gets a Pulse-driven rewrite. |
| 6 | Anchor (drafts only, no auto-send) + Conductor optimization. | Weekly outreach digest in inbox; Conductor selects right worker without manual intervention 90% of the time. |

After week 6, success = reproduce pm-streak's existing 35.2 → 76 citability lift across all new pages, with ≥30% of pages picked up by at least one LLM citation within 14 days.

---

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| LLM responses change weekly → Scout/Pulse drift | Re-evaluate prompts monthly via offline eval set; pin model versions per agent. |
| Auto-publishing low-quality content harms SEO | Citability gate ≥70 before Signal; auto-merge only ≥80; Pulse rewrites underperformers. |
| Anchor outreach can spam / damage brand | Hard rule: no auto-send. Drafts only, human approval. Encoded in agent system prompt + tool absence. |
| Lyzr Studio outage | Conductor has Automata fallback (same agent specs work in `lyzr-framework`). |
| Lead attribution noise | Pulse's "0 leads in 21 days" rule needs UTM hygiene — add UTMs in Signal step. |
| Cost blowup (Forge using Opus on 100s of pages) | Forge uses tiered models — Sonnet for first draft, Opus only on Pulse-triggered rewrites. |
| Model returns hallucinated PM facts | Cortex KB grounding + Forge has a `verify_claims` post-step that requires inline citations for every numeric claim. |

---

## 9. What this is NOT

- **Not Lucato AI verbatim** — Lucato is a managed service; this is your own swarm running on your tenancy.
- **Not a replacement for human PM editorial judgment** — final say on tone, accuracy, and brand stays with you. Anchor explicitly never sends.
- **Not enterprise-grade governance** — for that, swap Lyzr Cloud for Lyzr Self-Hosted Enterprise and add SOC2-aligned audit logs. Out of scope here.

---

## 10. Open questions for you

1. **Repo access:** ready to mount the pm-streak folder via Cowork so the next pass can write the actual files (Lyzr config, API routes, Prisma migration)?
2. **Models:** OK with Anthropic-heavy (Sonnet 4.6 + Opus 4.6) for Cortex/Forge, OpenAI for the rest? Or keep all single-vendor?
3. **Lyzr tier:** do you have a Lyzr account already, or do you want me to add a "Lyzr setup" appendix?
4. **Anchor scope:** comfortable with directory submissions auto-running (G2/Capterra/AlternativeTo only) and email/Reddit being draft-only? Or draft-only across the board?
5. **GEO-Pricing tie-in:** the repo has `Dodo Payments integration with dynamic geo-pricing` — should Forge surface localized pricing per region in MDX, or keep that out of scope?

---

*End of architecture doc. Hand this to Lyzr Studio, point Cortex at the repo, and the swarm should bootstrap inside the existing pm-streak monorepo.*
