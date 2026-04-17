# Planner Agent — Conversion Funnel

## Task
Analyze PM Streak's conversion funnel and create a prioritized implementation plan to fix 0% trial-to-paid conversion.

## Context
- PM Streak: Duolingo-for-PM, freemium model
- Current: 108 users/day, 0 conversions
- Trial flow: dashboard → start-trial → ??? (mystery what happens next)
- Payment: Dodo Payments + RevenueCat
- Feature flags: `prioritySupport` (behind flag), `aiTajwal30Lessons`

## Steps
1. Read `src/app/api/billing/start-trial/route.ts` and `src/lib/billing/trial.ts`
2. Read `src/app/pricing/page.tsx` and `src/components/PricingPageTrialCTA.tsx`
3. Read `src/app/dashboard/page.tsx`
4. Read `scripts/monitor-conversions.py` for existing funnel data
5. Map every step from free user → paid user
6. Identify where users drop off (no GA4 events = blind spot)
7. Create a SPEC.md with:
   - Ranked list of conversion fixes (by impact/effort)
   - Exact changes needed per page
   - A/B experiment proposal for hero section

## Output
`CONVERSION_PLAN.md` in project root