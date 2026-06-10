# PM Streak — Conversion Funnel Analysis & Fix Plan

> **STALE (2026-06-11 audit):** The P0-BROKEN items below (GA4 events, trial visibility, homepage CTA) have since SHIPPED — see ga4-server, start-trial route, HomepageTrialButton. The real remaining funnel gaps are in docs/audits/2026-06-11-repo-audit.md (DIR-01..05). Do not action the items below without re-verifying against code.

> Status: PLANNER_COMPLETE | Priority: CRITICAL | Date: 2026-04-15

---

## The Hard Truth

0% conversion is not a code bug. It's a funnel mapping problem. We don't know where users drop off because there are **zero GA4 events** anywhere in the trial/checkout flow.

---

## Funnel Map (Current State)

```
User lands on site
  ↓
Homepage (6 visitors/day, 0 clear CTA to trial)
  ↓
/dashboard — logged-in home
  ↓
/explore — lesson browser
  ↓
Lesson completion (3 required for trial eligibility)
  ↓
maybeGrantProTrial() triggers → sets trialEndsAt + proPreviewConsumed
  ↓
??? — Where does user GO to start trial? No button visible on dashboard.
  ↓
/pricing — shows plans
  ↓
No click to /api/checkout? Dodo env vars may be empty in production
  ↓
ZERO conversions
```

### Critical Finding: `maybeGrantProTrial()` is AUTOMATIC
The trial is granted silently when a user completes 3 lessons OR reaches 3-day streak.
- `trialEndsAt` is set in the DB
- `billingStatus = "trialing"`
- BUT: **no UI tells the user this happened**
- No GA4 event fires on trial grant

---

## Root Causes (Ranked by Impact)

### 🔴 P0 — COMPLETELY BROKEN (Fix These First)

#### 1. No GA4 Events Anywhere in Funnel
**Files affected:** `src/app/api/billing/start-trial/route.ts`, `src/app/api/checkout/route.ts`
**Impact:** We are flying blind. Cannot optimize what we can't measure.
**Fix:** Add `trackEvent()` calls to every funnel step (see implementation below)

#### 2. Trial Is Silent — User Doesn't Know It Exists
**File:** `src/app/dashboard/page.tsx`
**Impact:** `maybeGrantProTrial()` fires automatically, sets `trialEndsAt` in DB, but dashboard shows ZERO indication that user is on a trial or has a path to paid.
**Fix:** Show a "Pro Trial Active" banner when `trialEndsAt > now`. Don't make trial a mystery — tell users they're on it and what it includes.

#### 3. Dodo Payments Product IDs Appear to Be Empty
**File:** `.env.vercel.production`
**Evidence:** `NEXT_PUBLIC_DODO_MONTHLY_DISCOUNTED_PRODUCT_ID`, `NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID` — if these are empty strings, checkout redirects to a broken URL.
**Fix:** Verify these env vars are set in Vercel project settings.

#### 4. Homepage → Pricing Path Is Broken
**Evidence:** 6 homepage visitors/day, 0 reached pricing page (from GA4).
**Files:** `src/app/page.tsx`, `src/components/HomepageTrialButton.tsx`
**Fix:** Make hero CTA explicit: "Start 3-Day Free Trial →" goes to `/pricing` or `/dashboard`. Add GA4 click tracking.

---

### 🟡 P1 — CONVERSION OPTIMIZATION

#### 5. No Urgency or Social Proof on Pricing Page
**File:** `src/app/pricing/page.tsx`
**Fix:** Add "X PMs on a trial right now", testimonial snippets, "Offer ends [date]"

#### 6. Free Tier Has No Hard Stop
**Evidence:** Users have 22 free lessons but no clear reason to upgrade.
**Fix:** After lesson 7, show upgrade prompt. Make free tier feel limited, not unlimited-lite.

#### 7. No A/B Experiments Configured
**File:** `src/lib/ab.ts`
**Fix:** Set up hero CTA text experiment: "Start Free Trial" vs "Try PM Streak Free"

---

## Implementation: Add GA4 Events

Add to `src/lib/ga4-events.ts`:

```typescript
// Trial funnel events
trackEvent("trial_start_attempt")     // POST /api/billing/start-trial called
trackEvent("trial_start_success")     // Trial granted
trackEvent("trial_start_blocked", { reason }) // "Trial already used" or "Not authenticated"

trackEvent("checkout_initiated")      // GET /api/checkout called
trackEvent("checkout_dodo_redirect")  // Redirected to Dodo
trackEvent("checkout_error", { error }) // Checkout failed

trackEvent("pricing_page_view")       // /pricing visited
trackEvent("hero_cta_clicked")        // Homepage CTA clicked
trackEvent("dashboard_upgrade_cta_clicked") // Dashboard upgrade bar clicked
```

---

## A/B Experiment Proposal

| Experiment | Variant A | Variant B | Metric |
|---|---|---|---|
| Hero CTA | "Start Free Trial" | "Try PM Streak — Free" | Click rate to /pricing |
| Trial Banner | "You're on free trial" | "3 days left — unlock all 292 lessons" | Upgrade rate |
| Pricing Anchor | Show monthly $29 first | Show annual $19/mo first | Click to checkout |

---

## Immediate Next Steps (Priority Order)

1. **Verify Dodo env vars** in Vercel project settings — if empty, checkout is broken
2. **Add GA4 events** to start-trial + checkout routes
3. **Show trial banner on dashboard** when `trialEndsAt > now`
4. **Add upgrade bar** to dashboard (sticky bottom, only for free users)
5. **Fix homepage CTA** → goes to `/pricing` with GA4 tracking
6. **Run experiment** on hero CTA text
7. **Add social proof** to pricing page

---

## Funnel Summary Score

| Stage | Status | Evidence |
|---|---|---|
| Homepage → CTA | ❌ BROKEN | 0 clicks to /pricing from 6 visitors |
| Dashboard → Trial awareness | ❌ BROKEN | No trial status shown |
| Trial flow | ⚠️ SILENT | DB works, UI invisible |
| Checkout | ⚠️ UNVERIFIED | Dodo IDs may be empty |
| Post-trial | ❌ NO PATH | No upgrade prompt after trial ends |

**Overall: 0/6 funnel stages working properly**