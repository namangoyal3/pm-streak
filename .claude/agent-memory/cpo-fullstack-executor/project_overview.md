---
name: PM Streak Project Overview
description: Stack, architecture, monetization system, key file locations for PM Streak
type: project
---

PM Streak is a Next.js 14 app-router app (TypeScript, Prisma/Neon DB, Tailwind) for learning product management.

**Why:** Duolingo-for-PMs concept with streak mechanics, XP, gems, credits.

**How to apply:** Use this as primary context when working on features.

## Key Architecture
- Auth: custom JWT cookie via `src/lib/auth.ts` → `getCurrentUserId()`
- DB: Neon/PostgreSQL via Prisma, schema at `prisma/schema.prisma`
- AI: Groq (llama-3.3-70b-versatile) via `src/lib/groq.ts`, key rotation via GROQ_API_KEY env vars
- Credits: `src/lib/credits.ts` — atomic spend/grant, monthly refresh via cron
- Entitlements: `src/lib/entitlements.ts` → `isUserPro()`

## Monetization System (as of March 2026)
- Free plan: 10 credits/month, limited lessons, 1 AI lesson/day
- Pro plan: ₹499/month or ₹1,899/year, 50 credits/month, all lessons, unlimited AI, jobs, interview prep
- Payment: UPI manual payment → admin grants Pro via `/api/admin/grant-upi-pro`
- Credits cost: lesson_unlock=5, ai_lesson=2, interview_prep=5

## Key Routes
- `/pricing` — pricing page (client component, no auth required)
- `/jobs` — PM jobs board (client component, no auth required)
- `/interview-prep` — AI interview prep (client, hits `/api/interview-prep` POST which requires auth + credits)
- `/api/jobs` — GET, public, Prisma `contains` search
- `/api/interview-prep` — POST, auth-gated, credits-gated, prompt injection protected with allowlists
- `/api/cron/refresh-credits` — GET, CRON_SECRET bearer token required
- `/api/admin/*` — auth-gated + isAdmin(email) check against ADMIN_EMAIL env var

## Ingestion Scripts
- `scripts/ingest-leader-content.ts` — RSS → Groq lesson generation → DB
- `scripts/scrape-pm-jobs.ts` — Himalayas API → PM title filter → DB

## Admin
- Admin email: controlled by ADMIN_EMAIL env var, fallback is namangoyal21197@gmail.com
- Support email: support@pmstreak.app
