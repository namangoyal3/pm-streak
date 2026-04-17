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

## Design Principles

### Think Before Coding
- Ask: what user outcome does this change? Who is affected?
- Before touching payments, auth, or experiment tracking — understand the full data flow
- 0% conversion is a product problem, not a code problem. Check `/pricing`, `/dashboard` before adding features.

### Simplicity First
- Small PRs. One logical change per commit.
- If you find yourself changing >5 files for a single feature,停下来 — you're over-engineering.
- Copy patterns already in the codebase before importing new abstractions.

### Surgical Changes
- Don't touch code that doesn't relate to the task
- Don't refactor adjacent code "while you're there"
- Don't add dependencies unless the feature explicitly requires them

### Goal-Driven Execution
- Always state the user-facing outcome before writing code
- PR title: what changed. PR description: what problem it solves.
- Test the happy path and one edge case before marking done.

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
- Prisma schema: `prisma/schema.prisma`
