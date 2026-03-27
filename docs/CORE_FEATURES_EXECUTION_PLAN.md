# Core Features Execution Plan

This document converts the product spec into implementation-ready engineering tickets and Emergent prompts for the current codebase (`Next.js + Prisma + Postgres`).

## Current Codebase Snapshot (important for planning)

- Existing entities:
  - `Job` exists but currently models listing metadata (`source` is currently `wellfound | linkedin | himalayas`).
  - `Lesson` exists for quiz lessons; no dedicated PM case-attempt scoring model yet.
  - Credits exist on `User` (`credits`, `CreditTransaction`) with spend helpers in `src/lib/credits.ts`.
- Existing capabilities we should reuse:
  - Job scraping flow (`src/lib/job-scraper.ts`, `src/app/api/cron/scrape-jobs/route.ts`)
  - LLM integration (`src/lib/groq.ts`, `src/lib/llm-lessons.ts`)
  - Credit gating patterns (`src/app/api/interview-prep/route.ts`)

---

## Target Architecture Decisions

1. **Do not repurpose `Job.source` directly** (it currently stores listing source provider).  
   Add a new field for JD origin (`jdSource`) and keep existing `source` for backward compatibility.

2. **Add dedicated models for target-plan-attempt-readiness** instead of overloading `CompletedLesson`.

3. **Use strict JSON schemas** for JD parser and AI judge outputs, and reject malformed model output.

4. **Compute readiness weighted by JD focus**, with recency weighting on attempts.

5. **Use credits only for AI-heavy features** (deep review/full mock), while keeping daily drill mostly free.

---

## Epic A: JD Selection + Configurable Plan

### Ticket A1 — Prisma schema foundation for JD + planning
**Complexity:** Medium  
**Files:**
- `prisma/schema.prisma`
- `prisma/migrations/*`

**Changes:**
- `Job`:
  - Add `jdSource` (`scraped | pasted`)
  - Add `rawJdText` (`String?`)
  - Add `parsedSkills` (`Json?`)
  - Add `parsedLevel` (`String?`)
  - Add `parsedDomain` (`String?`)
  - Add `estimatedInterviewFocus` (`Json?`)
- Add `UserJobTarget`:
  - `id, userId, jobId?, customJdText?, targetDate, createdAt`
- Add `LearningPlan`:
  - `id, userJobTargetId, planConfig(Json), generatedAt`
- Add `PlanLesson`:
  - `id, learningPlanId, dayIndex, lessonType, skillTags(Json), lessonId?`

**Acceptance criteria:**
- Prisma client generates successfully.
- Migration applies cleanly on local DB.
- Existing job listing queries continue to work unchanged.

---

### Ticket A2 — JD parsing service + storage
**Complexity:** Medium  
**Files:**
- `src/lib/jd-parser.ts` (new)
- `src/lib/groq.ts` (reuse helper)
- `src/app/api/jobs/route.ts` (read support)
- `src/app/api/job-targets/route.ts` (new)

**Changes:**
- Implement parser function:
  - Input: raw JD text
  - Output (strict JSON): `skills[]`, `level`, `domain`, `mustHave[]`, `niceToHave[]`, `estimatedInterviewFocus`
- Persist parsed data into `Job` row for both:
  - scraped jobs lacking parsed fields
  - pasted jobs created by user

**Acceptance criteria:**
- Invalid LLM output is retried or hard-fails with typed error.
- Parsed JSON always conforms to schema.
- Pasted JD creates a reusable `Job` row with `jdSource = pasted`.

---

### Ticket A3 — Plan generator service
**Complexity:** Medium  
**Files:**
- `src/lib/plan-generator.ts` (new)
- `src/app/api/learning-plans/route.ts` (new)

**Changes:**
- Inputs: parsed JD, `daysUntilTarget`, optional baseline skill profile.
- Outputs:
  - `sessionsPerWeek`
  - week-by-week distribution by lesson type
  - day tags for skill mapping
- Persist `LearningPlan` + `PlanLesson[]`.

**Acceptance criteria:**
- 15-day plan has higher daily intensity than 60-day plan.
- Plan generation idempotent for same target unless `forceRegenerate=true`.
- API returns normalized weekly/day breakdown for UI.

---

### Ticket A4 — Job browse + JD paste + timeframe UI
**Complexity:** Large  
**Files:**
- `src/app/jobs/page.tsx`
- `src/app/interview-prep/page.tsx` (or dedicated onboarding flow page)
- `src/components/*` (new selector/timeframe components)

**Changes:**
- Two-tab selection:
  - Browse roles (existing jobs list with filters)
  - Paste JD textarea
- Timeframe chooser:
  - 15 / 30 / 60 / custom date
- Submit flow creates `UserJobTarget` and triggers plan generation.

**Acceptance criteria:**
- User can complete flow using either tab.
- Validation errors are clear (`empty JD`, `past date`, etc.).
- On success, user lands on plan view.

---

### Ticket A5 — Plan view UI
**Complexity:** Medium  
**Files:**
- `src/app/dashboard/page.tsx` (or new `/plan` page)

**Changes:**
- Weekly cards with lesson mix counts.
- Skill tags shown per block.
- Day progress indicator (`Day n of m`).

**Acceptance criteria:**
- Week/day rendering matches persisted `PlanLesson`.
- Empty-state shown if no target selected.

---

## Epic B: Daily Case + AI Judge

### Ticket B1 — Case lesson and attempts schema
**Complexity:** Medium  
**Files:**
- `prisma/schema.prisma`
- `prisma/migrations/*`

**Changes:**
- Extend `Lesson` with PM-case metadata:
  - `type` (`product_sense | metrics | execution | strategy | behavioral`)
  - `promptText`
  - `skillTags` (`String[]` or `Json`)
- Add `LessonAttempt`:
  - `id, userId, lessonId, userAnswer`
  - `scoreUserFocus, scoreStructure, scoreData, scoreTradeoffs`
  - `feedbackSummary, feedbackComments(Json), createdAt`
- Add `Skill` + `UserSkillProfile`.

**Acceptance criteria:**
- Migration compatible with existing lessons.
- Attempt insert + read succeeds with all score fields.

---

### Ticket B2 — Daily drill assignment API
**Complexity:** Medium  
**Files:**
- `src/app/api/daily-drill/route.ts` (new)
- `src/lib/daily-drill.ts` (new)

**Changes:**
- Resolve current `UserJobTarget`.
- Select/compose one drill for today from plan and skill gaps.
- Return prompt + metadata (`dayIndex`, `targetTitle`).

**Acceptance criteria:**
- Same user gets stable drill for the same date.
- If no plan exists, API returns guided setup response.

---

### Ticket B3 — AI judge API + strict scoring contract
**Complexity:** Large  
**Files:**
- `src/app/api/lesson-attempts/route.ts` (new)
- `src/lib/ai-judge.ts` (new)

**Changes:**
- Input: lesson prompt + user answer (+ optional reference answers).
- Output schema:
  - scores: `user_focus`, `structure`, `data_thinking`, `tradeoffs` (1-5)
  - `feedback_comments` (2-3 critical comments)
  - `skill_deltas`
- Persist `LessonAttempt`, then update `UserSkillProfile` via weighted moving average.

**Acceptance criteria:**
- Rejects malformed score ranges.
- Feedback avoids generic praise (prompt contract + post-validation).
- Skill profile updates after every successful attempt.

---

### Ticket B4 — Daily drill UI + feedback view
**Complexity:** Medium  
**Files:**
- `src/app/daily-challenge/page.tsx` (reuse or split)
- `src/components/*` (new score bars and feedback block)

**Changes:**
- Display one drill/day with free-form answer box.
- Submit to judge endpoint.
- Render numeric dimension scores + 2-3 critical comments + “tomorrow focus”.

**Acceptance criteria:**
- Submission + feedback loop works end-to-end.
- History view shows recent attempts.

---

## Epic C: Readiness Score + Credits/Paywall

### Ticket C1 — Readiness compute service
**Complexity:** Medium  
**Files:**
- `src/lib/readiness.ts` (new)
- `src/app/api/readiness/route.ts` (new)

**Changes:**
- Aggregate last `N` attempts with recency weighting.
- Map 1-5 dimensions to 0-100.
- Weight skills by JD’s `estimatedInterviewFocus`.
- Return:
  - global readiness score
  - per-skill scores
  - strengths/weaknesses summary text

**Acceptance criteria:**
- Score changes when new attempts are added.
- Different JD focus distributions produce different global scores for same attempts.

---

### Ticket C2 — Engagement metrics + paywall trigger model
**Complexity:** Medium  
**Files:**
- `prisma/schema.prisma`
- `src/lib/engagement.ts` (new)

**Changes:**
- Add `UserEngagementMetric`:
  - `userId, totalAttempts, activeDays, lastShownPaywallAt, declineCount`
- Update metrics after each attempt.
- Trigger logic:
  - if `totalAttempts >= 10 && activeDays >= 4 && credits == 0`, mark paywall-eligible

**Acceptance criteria:**
- Metrics update atomically with attempts.
- Prompt frequency throttled using `lastShownPaywallAt` and `declineCount`.

---

### Ticket C3 — Credit wallet normalization
**Complexity:** Small  
**Files:**
- `src/lib/credits.ts`
- `prisma/schema.prisma`

**Changes:**
- Keep existing `User.credits` as balance source-of-truth (short term).
- Add optional `metadata Json?` to `CreditTransaction` for feature attribution.
- Add reasons:
  - `purchase`, `bonus`, `mock_interview`, `deep_review`, `portfolio_artifact`

**Acceptance criteria:**
- Existing spend/refresh flows continue working.
- New reasons and metadata are queryable for analytics.

---

### Ticket C4 — Readiness dashboard + monetization UX
**Complexity:** Medium  
**Files:**
- `src/app/dashboard/page.tsx`
- `src/components/ProModal.tsx` (reuse)

**Changes:**
- Render:
  - overall readiness gauge
  - per-skill bars
  - strengths/weaknesses text
- Show credit upsell panel when paywall-eligible.
- Offer starter credits and/or purchase CTA.

**Acceptance criteria:**
- Dashboard appears after minimum attempt threshold.
- Paywall prompts only when trigger conditions true.

---

### Ticket C5 — Credit purchase integration
**Complexity:** Medium  
**Files:**
- `src/app/api/checkout/route.ts`
- `src/app/api/webhooks/*`
- `src/lib/billing/*`

**Changes:**
- Add one-time credit pack SKU(s) (e.g., 10 credits pack).
- Webhook credits wallet on successful purchase.
- Record `CreditTransaction(reason="purchase")`.

**Acceptance criteria:**
- Successful test webhook increments user credits exactly once.
- Duplicate webhook events are idempotent.

---

## Cross-Cutting Tickets

### Ticket X1 — Observability and events
**Complexity:** Small  
**Files:**
- `src/components/providers/posthog-provider.tsx`
- event helper module

Track:
- `job_target_created`
- `jd_pasted`
- `plan_generated`
- `daily_drill_submitted`
- `readiness_viewed`
- `paywall_shown`
- `credits_purchased`

### Ticket X2 — Security and abuse controls
**Complexity:** Small  
Add:
- request size limits for JD paste and answers
- rate limiting on generation/judge endpoints
- schema validation (`zod`) for all AI I/O

### Ticket X3 — Testing
**Complexity:** Medium  
Add:
- unit tests for readiness weighting and skill profile update
- integration tests for attempt submission and credit deductions
- contract tests for JD parser and AI judge response schema

---

## Suggested Delivery Sequence

1. **A1 → A2 → A3** (data + parser + planner)
2. **A4 → A5** (selection and roadmap UX)
3. **B1 → B2 → B3 → B4** (daily ritual loop)
4. **C1 → C2 → C4** (readiness + paywall signal + dashboard)
5. **C3 → C5** (wallet normalization + purchase)
6. **X1/X2/X3** continuously

---

## Emergent Prompts (copy/paste)

### Prompt 1: Schema + planner foundation
```text
Implement Epic A foundation in this Next.js + Prisma repo.

Scope:
1) Update prisma schema:
   - Extend Job with jdSource/rawJdText/parsedSkills/parsedLevel/parsedDomain/estimatedInterviewFocus.
   - Add UserJobTarget, LearningPlan, PlanLesson models.
2) Generate and apply migration.
3) Add /src/lib/jd-parser.ts with strict JSON schema validation (zod) for:
   skills[], level, domain, mustHave[], niceToHave[], estimatedInterviewFocus.
4) Add /src/lib/plan-generator.ts that outputs sessionsPerWeek + per-week/day lesson mix from parsed JD and daysUntilTarget.
5) Create API routes:
   - POST /api/job-targets (browse job or pasted JD + target date)
   - POST /api/learning-plans (generate and persist plan)
6) Keep existing /api/jobs behavior backward compatible.

Constraints:
- Reuse existing Groq client patterns.
- Add robust AI output validation and typed errors.
- Add minimal tests for parser and planner output shape.

Return:
- Changed files list
- Migration summary
- Example request/response payloads for both new endpoints.
```

### Prompt 2: Daily drill + AI judge
```text
Implement Epic B (daily case + harsh AI judge) in this repo.

Scope:
1) Prisma:
   - Add LessonAttempt, Skill, UserSkillProfile.
   - Extend Lesson with type/promptText/skillTags for PM case drills.
2) Create /api/daily-drill:
   - Returns one deterministic drill for today based on user's active job target and plan.
3) Create /api/lesson-attempts:
   - Accepts user answer.
   - Calls AI judge with strict schema:
     scores(user_focus, structure, data_thinking, tradeoffs 1-5),
     feedback_comments(2-3 critical),
     skill_deltas.
   - Persists LessonAttempt.
   - Updates UserSkillProfile via weighted moving average.
4) UI:
   - Daily drill page card with prompt + answer textarea.
   - Feedback panel with numeric bars and critical comments.

Constraints:
- Avoid generic praise in judge prompt.
- Validate all AI output with zod before persistence.
- Keep endpoints authenticated and rate-limited.

Return:
- End-to-end flow demo steps
- Any follow-up migrations needed.
```

### Prompt 3: Readiness + paywall + credits
```text
Implement Epic C (readiness score + credits/paywall) in this repo.

Scope:
1) Add readiness computation module:
   - Recency-weighted last N attempts.
   - Map 1-5 scores to 0-100.
   - Weight dimensions using JD estimatedInterviewFocus.
2) Add /api/readiness endpoint.
3) Add UserEngagementMetric model and update logic after attempts:
   totalAttempts, activeDays, lastShownPaywallAt, declineCount.
4) Paywall trigger:
   if totalAttempts>=10 && activeDays>=4 && credits==0 => eligible.
5) Dashboard UI:
   - Overall readiness gauge
   - Per-skill bars
   - Strength/weakness summary
   - Credits upsell panel when eligible
6) Credits:
   - Extend CreditTransaction reasons + metadata json.
   - Integrate one-time credit pack purchase into existing checkout/webhook flow.

Constraints:
- Preserve existing monthly refresh and spend flows.
- Ensure webhook idempotency for credit grants.
- Add tests for readiness math and paywall trigger logic.

Return:
- Trigger logic summary
- Before/after DB schema notes
- QA checklist for readiness and payments.
```

---

## Definition of Done (for this initiative)

- User can choose scraped role or paste JD, set target date, and get a generated weekly plan.
- User can complete one daily case and receive strict scored feedback.
- Readiness dashboard reflects recent performance and JD-relevant weighting.
- Credits/paywall appears only under defined engagement conditions.
- AI-heavy premium actions consume credits and purchase flow replenishes balance.

