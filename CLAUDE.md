# PM Streak — Engineering Guidelines

## Project Context
PM Streak is a daily PM education platform (Duolingo for Product Managers). Next.js 15 app with Prisma, Dodo Payments, RevenueCat, freemium model. AI generates daily lessons from 300+ PM leader transcripts. 0% conversion rate is the critical problem.

## Core Data Model
- `User`: plan, credits, entitlement, streak, xp
- `Article` / `SeoArticle`: AI-generated lesson content
- `ExperimentEvent`: A/B test tracking
- `CheckoutSession`, `Subscription`: payments via Dodo

## Architecture Decisions
- Server actions for writes, API routes for external integrations
- GA4 for analytics, IndexNow for SEO ping
- AI lesson generation via DeepSeek + pipeline cron jobs
- Feature flags control: prioritySupport, ai Tajwal-30 lessons, experiments

## Behavioral Rules

These 12 rules apply to every task. Bias: caution over speed on non-trivial work.

### Rule 1 — Think Before Coding
State assumptions explicitly. If uncertain, ask rather than guess.
Ask: what user outcome does this change? Who is affected?
Before touching payments, auth, or experiment tracking — understand the full data flow.
0% conversion is a product problem, not a code problem. Check `/pricing`, `/dashboard` before adding features.

### Rule 2 — Simplicity First
Minimum code that solves the problem. No speculative features. No abstractions for single-use code.
Small PRs. One logical change per commit. If changing >5 files for one feature, stop — over-engineering.
Copy patterns already in the codebase before importing new abstractions.

### Rule 3 — Surgical Changes
Touch only what you must. Don't refactor adjacent code "while you're there."
Don't add dependencies unless the feature explicitly requires them. Match existing style.

### Rule 4 — Goal-Driven Execution
Always state the user-facing outcome before writing code.
PR title: what changed. PR description: what problem it solves.
Define success criteria. Loop until verified. Test the happy path and one edge case before marking done.

### Rule 5 — Use Claude Only for Judgment Calls
Use for: classification, drafting, summarization, extraction from unstructured text.
Do NOT use for: routing, retries, status-code handling, deterministic transforms. If code can answer, code answers.

### Rule 6 — Token Budgets Are Not Advisory
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh. Surface the breach — do not silently overrun.

### Rule 7 — Surface Conflicts, Don't Average Them
If two patterns contradict, pick one (more recent / more tested). Explain why. Flag the other for cleanup.
Don't blend conflicting patterns. "Average" code that satisfies both is the worst code.

### Rule 8 — Read Before You Write
Before adding code, read the file's exports, the immediate caller, and shared utilities.
If unsure why existing code is structured a certain way, ask before adding to it.

### Rule 9 — Tests Verify Intent, Not Just Behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that cannot fail when business logic changes is wrong.

### Rule 10 — Checkpoint After Every Significant Step
Summarize what was done, what's verified, what's left after each step in a multi-step task.
Don't continue from a state you can't describe back. If you lose track, stop and restate.

### Rule 11 — Match the Codebase's Conventions, Even If You Disagree
Conformance > taste inside the codebase.
If a convention is genuinely harmful, surface it. Don't fork it silently.

### Rule 12 — Fail Loud
"Completed" is wrong if anything was skipped silently. "Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.

## Payment & Auth — Extra Care
- Never log payment tokens, user credentials, or full API keys
- When touching `src/lib/billing/`, `src/app/api/checkout/`, `src/middleware.ts` — explain what you changed and why
- Checkout flow: freemium → trial → paid. If you modify trial logic, test with a fresh user account.

## SEO & AI Content
- SEO articles live in `src/app/[slug]/page.tsx` (auto-generated routes)
- GEO scoring: `src/lib/seo-score.ts` — passage length 134-167 words, self-containment, statistical density
- Never commit full article content (bulk text belongs in `scripts/seo-output/` or `graphify-out/cache/`)

## File Conventions
- Routes: `src/app/api/[feature]/route.ts`
- Components: `src/components/[FeatureName].tsx`
- Server actions: `src/app/[page]/actions.ts`
- Cron jobs: `src/app/api/cron/[job]/route.ts`
- GEO cron jobs: `src/app/api/geo/[agent]/run/route.ts`
- Prisma schema: `prisma/schema.prisma`
- Path alias: `@/*` maps to `./src/*`
- Package manager: `pnpm` (or `npm` fallback)

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

## Image Generation (nanaban)

SEO/GEO page images use [nanaban](https://github.com/paperfoot/nanaban-cli) (paperfoot) — a CLI that generates images via GPT Image 2 at **$0** (billed against ChatGPT Plus/Pro subscription via Codex OAuth), Nano Banana (Gemini), and GPT-5 Image.

- Installed globally via npm: `npm install -g nanaban`
- Auth: `codex login` enables free GPT Image 2 via ChatGPT sub; `nanaban auth` checks reachable models
- Agent mode: `nanaban "<prompt>" --json` returns structured output with file path, cost, model used
- Lyzr tool route: `POST /api/geo/tools/image-gen` (wraps nanaban --json for GEO swarm agents)
- Forge calls this tool when generating article images via the GEO pipeline
- Claude Code skill auto-installed at `~/.claude/skills/nanaban/SKILL.md`
