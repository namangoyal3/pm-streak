# GEO/SEO Agent Subsystem — Improvement Plan

From the 2026-06-11 focused audit of the SEO agent swarm, commit `afc2a77`.
Four auditors (orchestration, content pipeline, queue/cron, GEO effectiveness),
findings vetted against source. NOTE: the broad-repo remediation plans live on
the `advisor/audit-remediation` branch (PR #28); this is a separate, GEO-focused
set. The markdown-faq FAQ-extraction `\s*$` bug is already fixed in PR #28 — only
the HowTo false-schema part (#9 below) remains.

## Sequencing — the load-bearing decision

The create/retrofit pipeline is **not scheduled** (`vercel.json` has no `geo/*`
crons), so it's inert in prod. That is currently the ONLY thing preventing the
swarm from auto-publishing gameable-gate content at uncapped velocity — the exact
scaled-content-abuse fingerprint Google penalizes (50–80% traffic drops). So:

1. Land the code fixes below (safety + correctness).
2. Add a velocity governor + human-review sample (GEO-03).
3. ONLY THEN schedule the crons (owner flips it on when ready).

Scheduling is the LAST step, owner-gated — not the first.

## Bundle 1 — executable code fixes (this PR)

| # | Fix | File(s) |
|---|---|---|
| 2 | Refiner replaces entire article body — `split("\\n\\n")` is a literal 4-char string, not newlines. Use `"\n\n"`; add a guard that the result isn't drastically shorter than the original | `cron/performance-refiner/route.ts:57` |
| 3 | `lyzr.ts`: wrap abort/network errors in `LyzrError`; add bounded retry+backoff (e.g. 2 retries on 5xx/timeout). Fixes 4 findings (timeout misclassification, no-retry, partial-loss attempts-burn, getAgent) | `lib/lyzr.ts:17-90` |
| 4 | Publish route must compute citability server-side and reject <70; never trust caller-sent `citabilityScore` | `api/geo/signal/publish/route.ts:29-37` |
| 5 | Retrofit "shipped" must not be set by scraping any github URL from LLM prose. Require a PR URL on its own marker line AND validate `/pull/\d+` shape; otherwise leave pending | `lib/geo/retrofit-worker.ts:181` |
| 6 | Retrofit claim: replace findMany→update with an atomic `updateMany({where:{jobStatus:'pending', slug:{in}}, data:{jobStatus:'in_progress'}})` claim | `lib/geo/retrofit-worker.ts:63-83` |
| 8 | Wall-clock budget guard: break the tick loop when `Date.now()-start > maxDuration - perItemBudget`; cap retrofit effective quota (a 240s Conductor call ≈ 1/tick) | `retrofit-worker.ts`, `create-worker.ts` |
| 9 | HowTo JSON-LD emitted for any numbered bold list. Scope `extractHowToSteps` to a `## How to` heading section; un-skip the quarantined test once fixed | `lib/geo/markdown-faq.ts:53`; `learn/[vertical]/[slug]/page.tsx:159` |
| 10 | Scout intent threshold no-op: `gte: 0.65` against a 0–100 score. Normalize to a real floor (e.g. `gte: 65`), and make `createOpportunity` upsert-by-normalized-query (dedup/cannibalization) | `lib/geo/safe-prisma.ts:20`; `scout/run/route.ts` |
| 11 | `JsonLd` doesn't escape `</script>`. Replace `JSON.stringify(data)` with an escaped variant (`.replace(/</g,'\\u003c')`) | `components/JsonLd.tsx:12` |
| 12 | Sanitize scraped competitor/SERP content before interpolating into Forge prompts (delimit + strip instruction-like lines) | `create-worker.ts:57-95`; `forge-runner.ts` |
| 13 | Add `@@index([status])` to `GeoCitation`; add a retention sweep (delete `GeoCronLog`/`GeoPageMetric` > N days) to an existing cron | `prisma/schema.prisma:585`; a cron route |
| 14 | `snapshot` retrofit branch loops without incrementing attempts → infinite retry. Increment attempts / add a snapshot guard | `retrofit-worker.ts:144` |
| — | `Promise.all`→`Promise.allSettled` on per-row batches so one bad row doesn't drop siblings | `pulse/snapshot/route.ts`, `rival/run/route.ts` |
| — | `const query = row.query ?? row.query` no-op coalesce — fix the intended snake_case fallback | `scout/run/route.ts:53` |
| — | Wire `tolerantJsonParse` into the Blueprint parse (currently a bare `JSON.parse(match(/\{[\s\S]*\}/))`); tighten the greedy match | `create-worker.ts:149`; `json-repair.ts` |
| — | Zod-validate enum-like fields (status/source/tier) in safe-prisma helpers | `safe-prisma.ts` |

Out of scope for this PR (documented, not executed): reconcile the
`create-worker` → `seo-articles/` direct write vs the documented Forge→Signal→PR
boundary (#15 — a design decision: which publish path is canonical); the dead
Conductor-routing layer removal (`conductor.ts` — harmless, cosmetic).

## Bundle 2 — owner-gated / larger efforts (NOT auto-executed)

- **#1 Schedule the pipeline** — add `create/tick` + `retrofit/tick` to
  `vercel.json` crons. ONLY after Bundle 1 + a velocity governor. Owner flips on.
- **GEO-03 Velocity governor + human gate** — cap auto-publishes/day, route a
  sample to human review regardless of score, swap Picsum for nanaban images,
  template-vary themes. Needed before scheduling.
- **GEO-02 Close the loop** — wire a real cross-engine citation probe (Perplexity/
  Gemini tools exist), persist on triage, feed back into Blueprint/Cortex
  priorities. The single highest-leverage effectiveness change. Design-spike.
- **GEO-01 Gate = extractable-answer quality** — add an LLM-judge pass scoring
  direct-answer-first + self-contained H2 blocks, beyond regex presence.
- **GEO-05 Off-page distribution** — human-in-the-loop Reddit/community action
  workflow off Anchor's drafts (where ~82% of AI citations actually come from).
- **GEO-06 Person/author E-E-A-T schema** — needs real named reviewers.

## Verification (Bundle 1)

`npx tsc --noEmit` clean; `npx vitest run` (the markdown-faq HowTo test un-skipped
and passing); the refiner guard proven on a sample; publish route rejects a
sub-70 body in a test.
