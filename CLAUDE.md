# CLAUDE.md — PM Streak

## Behavioral Rules (Karpathy Principles)

These four rules apply to EVERY task — read them before touching any code.

### 1. Think Before Coding
- Before writing any code, state what you're about to do and why.
- Identify tradeoffs and edge cases upfront.
- If requirements are unclear, ask — don't assume and implement.
- Never start coding to "figure it out" — think first, code second.

### 2. Simplicity First
- The simplest solution that works is the right solution.
- Do not add abstractions, layers, or generalization unless explicitly asked.
- Do not install new dependencies unless there's no reasonable built-in alternative.
- A 10-line function is better than a 100-line "framework" for a one-time use case.

### 3. Surgical Changes
- Change only what was asked. Nothing more.
- Do not refactor surrounding code, rename variables, add comments, or clean up files you weren't asked to touch.
- If you notice a bug outside your task scope, mention it — don't fix it uninvited.
- Every line you write has a blast radius. Keep it minimal.

### 4. Goal-Driven Execution
- Know the success criteria before writing the first line.
- Write tests or verification steps first if possible.
- Do not claim a task is done until you have verified it works.
- "It should work" is not verification. Run it, check it, confirm it.

## Design System
Always read `DESIGN.md` before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

Key rules:
- Only two saturated colors in the palette: green `#58cc02` and purple `#ce82ff`. Never introduce a third.
- Surfaces must use `--bg-primary/-secondary/-card` variables — no hardcoded hex, no blue-teal.
- Typography: DIN Round Pro → Nunito → system-ui. `font-black` for all headings. Never `font-medium` on H1/H2.
- Section H2s are `text-4xl sm:text-5xl`. Not `text-3xl`.

## SEO content
- `/learn` routes serve AI-generated articles from the `Article` Prisma model.
- Generation pipeline: `src/app/api/cron/generate-seo/route.ts` + `scripts/generate-seo-batch.ts`.
- Keyword queue: `SeoKeyword` table, status machine `pending → mapping → generated | failed`.
- Requires `GROQ_API_KEY` (primary) or `OPENROUTER_API_KEY` (fallback) in `.env.local`.

## Auth
Custom JWT (not next-auth). `src/lib/auth.ts` exports `getCurrentUserId()`.
Sign-up route is `/signup`, not `/auth/signup`.

## Tech
- Next.js 15 App Router, Prisma + Neon Postgres, Tailwind v4, hosted on Vercel.
- Run `npm run build` before deploying — the pipeline is strict on TS errors.
