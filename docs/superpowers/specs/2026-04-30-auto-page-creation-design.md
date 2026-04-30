# Auto Page Creation Pipeline — Design Spec

**Date:** 2026-04-30
**Branch:** main
**Status:** Approved for implementation

---

## Problem

PM Streak has 917 pages being improved nightly by the Retrofit pipeline. New pages are only created manually. The `GeoOpportunity` table (populated daily by Rival) contains high-intent keyword gaps with competitor data — but nothing acts on it. We're leaving targeted content opportunities on the table every day.

## Goal

A fully automatic nightly pipeline that picks the highest-intent unaddressed keyword opportunities, writes a GEO-optimised article for each, passes a quality gate, and publishes it live — zero human involvement required.

**Success criteria:**
- 3–5 new pages published per night
- Every new page passes: word count ≥ 1200, citability ≥ 70, FAQ section present, hero image present
- Opportunity data (competitor gaps, target queries) is baked into the article content
- Pages are indexed by Google within hours via IndexNow

---

## Architecture

```
DAILY CRON SEQUENCE (UTC)
──────────────────────────────────────────────────────────────────
00:45  Cortex refresh
01:00  Scout (keyword gaps) + Rival (competitor gaps → GeoOpportunity)
01:15  Pulse snapshot
01:30  Anchor
02:00  Retrofit tick (improve existing 917 pages, 20/night)
03:00  Generate SEO
03:30  ← NEW: Create tick (new pages from GeoOpportunity, 5/night)

NEW: /api/geo/create/tick  (POST)
──────────────────────────────────────────────────────────────────
         GeoOpportunity table
              │ top-5 by intentScore DESC
              │ where addressed=false, intentScore ≥ 0.65
              ▼
         ┌─────────────────────────────┐
         │  1. Duplicate check         │──▶ slug in Article? → skip
         │  2. Blueprint call          │──▶ page_type, outline, queries
         │  3. Forge (enriched prompt) │──▶ MDX + schema_meta
         │  4. Quality gate            │──▶ word count, citability, FAQ
         │     └── fail → 1 expand    │
         │         └── fail → skip    │
         │  5. publishArticle()        │──▶ Article DB + ISR + IndexNow
         │  6. markOpportunityAddressed│
         └─────────────────────────────┘
              │
              ▼
         { created, failed, skipped, decisions[] }
```

### State machine: GeoOpportunity

```
unaddressed ──▶ [in_progress] ──▶ addressed  (pageSlug set)
     │               │
     │          failed (attempts++, stays unaddressed)
     │               │
     │          [attempts ≥ 3] ──▶ permanently_skipped
     │
     └── skipped (duplicate found / intentScore < 0.65)
```

---

## New Files

| File | Purpose |
|------|---------|
| `src/app/api/geo/create/tick/route.ts` | Cron endpoint — auth, quota, calls `runCreateTick()` |
| `src/lib/geo/create-worker.ts` | `runCreateTick()`, `buildForgePrompt()` |

## Existing Code Reused (unchanged)

| File | Reuse |
|------|-------|
| `src/lib/geo/safe-prisma.ts` | `listUnaddressedOpportunities()`, `markOpportunityAddressed()`, `publishArticle()` |
| `src/lib/geo/citability.ts` | `scoreCitability()`, `passesGate()` |
| `src/lib/geo/forge-runner.ts` | `runForge()` expansion retry logic |
| `src/lib/lyzr.ts` | `callAgent(Agents.blueprint())`, `callAgent(Agents.forge())` |
| `src/lib/geo/safe-prisma.ts` | `cleanArticleBody()` — applied before publish |
| `vercel.json` | Add cron + maxDuration entries |

---

## Enriched Forge Prompt

The key EXPANSION value: competitor data and target queries from `GeoOpportunity` are injected directly into the Forge prompt.

```
Standard Forge prompt
  +
  "Target query for title/H1/meta: {opportunity.query}"
  "Your comparison table MUST include these competitors as rows:
     {opportunity.currentTop3} — compare each vs PM Streak"
  "FAQ questions MUST be phrased as: [{target_queries}]"
  "Link naturally to these existing PM Streak pages:
     - /learn/pm/{slug1} (citability {score})
     - /learn/pm/{slug2} (citability {score})
     - /learn/pm/{slug3} (citability {score})"
```

Internal links: top-3 `GeoPageTriage` rows with `currentCitability ≥ 75`, ordered by citability DESC. Selected before the Forge call; no extra API calls needed.

---

## Quality Gate (all must pass before publish)

| Gate | Value | Source |
|------|-------|--------|
| Word count | ≥ 1,200 | `bodyWordCount()` from forge-runner |
| Citability | ≥ 70 | `scoreCitability()` from citability.ts |
| FAQ section | present | `/^## FAQ/im` regex on body |
| Hero image | present | `picsum.photos` or `/images/` in body |
| Intent score | ≥ 0.65 | `GeoOpportunity.intentScore` (pre-gate, filters at selection) |

**Gate failure behaviour:**
1. First failure → one auto-expansion retry (reuses forge-runner expansion pass)
2. Second failure → `attempts++`, opportunity stays `unaddressed`, retried next night
3. After 3 attempts → permanently skipped (logged, not retried)

---

## Idempotency & Error Safety

**Duplicate guard:** Before calling Blueprint/Forge, check `prisma.article.findUnique({ where: { slug } })`. If exists → mark opportunity addressed, skip Forge call.

**Partial failure (publish succeeds, markAddressed fails):** The duplicate guard catches this on the next tick — slug found in Article → mark addressed → skip. No double Forge call.

**All external calls (Blueprint, Forge, publishArticle) wrapped in try/catch:**
- On catch: `attempts++`, `lastError` logged, opportunity stays `unaddressed`
- Max 3 attempts, then permanently skipped

---

## Error & Rescue Registry

| Codepath | Failure | Rescue action |
|----------|---------|---------------|
| DB fetch (listUnaddressedOpportunities) | Connection failure | Catch → return early, log error |
| Blueprint call | Timeout / empty response | Catch → attempts++, skip to next |
| Forge call | Timeout / null MDX | Catch → attempts++, skip to next |
| Quality gate | Below threshold | 1 expansion retry, then attempts++ |
| publishArticle() | DB write failure | Catch → attempts++, page not live |
| markOpportunityAddressed() | DB write failure | Catch + log; duplicate guard catches on next tick |
| IndexNow ping | Network timeout | Fire-and-forget; already handled in publishArticle() |

---

## Test Plan

| Test | Type | What it verifies |
|------|------|-----------------|
| Happy path: opportunity → published article | Integration | Full flow, article in DB, opportunity marked addressed |
| Duplicate guard | Unit | Slug exists → skip, no Forge call, opportunity marked addressed |
| Quality gate fail → expansion retry | Unit | First fail triggers expansion; second fail → attempts++ |
| 3 attempts exhausted → permanent skip | Unit | `attempts ≥ 3` → skipped, never picked again |
| Blueprint timeout | Unit | Catch fires, attempts++, opportunity stays unaddressed |
| `buildForgePrompt()` | Unit | Competitor names appear in prompt, target queries in FAQ hint |
| Internal link selection | Unit | Returns top-3 by citability ≥ 75 |
| intentScore < 0.65 | Unit | Never selected by `listUnaddressedOpportunities` |

---

## DB Migration Required

`GeoOpportunity` needs two new fields (schema addition, no data loss):

```prisma
model GeoOpportunity {
  // ... existing fields ...
  attempts   Int     @default(0)   // retry counter, max 3
  lastError  String?               // last failure message
}
```

Run `prisma db push` on deploy (build script handles this locally; Vercel skips it — run manually against Neon after merge).

## Slug & Vertical Strategy

- **Slug:** Blueprint returns a `title` field. Slug = `slugify(blueprint.title)` using the existing `slugify()` from `src/lib/seo-score.ts`. Fallback: `slugify(opportunity.query)` if Blueprint title is absent.
- **Vertical:** All auto-created pages set `vertical = "pm"`. Blueprint may override this if it returns a vertical field.

## Internal Link Helper (add to safe-prisma.ts)

```typescript
export async function selectInternalLinks(limit = 3) {
  return prisma.geoPageTriage.findMany({
    where: { currentCitability: { gte: 75 } },
    orderBy: { currentCitability: "desc" },
    take: limit,
    select: { slug: true, currentCitability: true },
  });
}
```

## listUnaddressedOpportunities Update

Add `intentScore` filter to the existing helper:

```typescript
where: { addressed: false, intentScore: { gte: 0.65 } }
```

## FAQ Detection Regex

Unified across gate and citability check: `/##\s+(faq|frequently asked questions)/i`

## Deployment

**DB migration required** (see above). After merging:

**vercel.json additions:**
```json
{
  "functions": {
    "src/app/api/geo/create/tick/route.ts": { "maxDuration": 300 }
  },
  "crons": [
    { "path": "/api/geo/create/tick", "schedule": "30 3 * * *" }
  ]
}
```

**Rollback:** Remove cron entry from `vercel.json`. Pages already published stay live. No DB rollback needed.

**Post-deploy verification:**
1. Hit `GET /api/geo/create/tick` (dry-run) → verify `{ decisions[] }` shape
2. Hit `POST /api/geo/create/tick?quota=1` → verify 1 article created in DB
3. Check `https://learnanything.pro/learn/pm/{new-slug}` renders correctly

---

## NOT In Scope

| Item | Rationale |
|------|-----------|
| Scout integration (Scout → Opportunity) | Scout already feeds Rival → GeoOpportunity; no change needed |
| Admin UI for opportunity queue | Overkill for now; status visible via `/api/geo/retrofit/status` pattern |
| A/B testing new vs existing pages | Deferred; no experiment infra for content variants |
| Topical clustering of internal links | Citability-only is sufficient; keyword matching adds complexity without clear lift |
| Email digest of new pages | Deferred; tick JSON is sufficient for monitoring |

---

## What Already Exists

| Sub-problem | Existing code | Plan reuses it? |
|-------------|--------------|-----------------|
| Opportunity storage | `GeoOpportunity` model + `createOpportunity()` | ✅ Yes |
| Opportunity listing | `listUnaddressedOpportunities()` | ✅ Yes |
| Mark addressed | `markOpportunityAddressed()` | ✅ Yes |
| Article publish + IndexNow + ISR | `publishArticle()` | ✅ Yes |
| Body cleaning | `cleanArticleBody()` | ✅ Yes |
| Citability scoring | `scoreCitability()` in citability.ts | ✅ Yes |
| Forge expansion retry | `runForge()` expansion loop in forge-runner.ts | ✅ Yes |
| Lyzr agent calls | `callAgent()` in lyzr.ts | ✅ Yes |
| Cron auth pattern | `x-vercel-cron` + `CRON_SECRET` | ✅ Yes |

---

## Dream State Delta

```
CURRENT STATE          THIS PLAN              12-MONTH IDEAL
───────────────────    ───────────────────    ───────────────────────────
917 pages, manually    +5 targeted pages/     Every high-intent PM query
grown. Retrofit        night, auto-created    answered by a PM Streak
improves nightly.      from Rival's gaps.     page. Self-sustaining
New pages: manual      Competitor data        content flywheel: Scout
only.                  baked into content.    finds gaps → Rival confirms
                       Zero ops.              → Create publishes →
                                              Retrofit improves →
                                              Pulse tracks → repeat.
```
