---
name: Security Findings — PM Streak
description: CRITICAL Groq API keys were hardcoded in source, now fixed; other security state
type: project
---

## CRITICAL (FIXED) — Groq API Keys in Source Code

Five Groq API keys were hardcoded in `src/lib/groq.ts`. They were committed to git history in commit 59be937.

**Fix applied:** Removed all hardcoded keys. Keys now read from env vars: GROQ_API_KEY, GROQ_API_KEY_2 through GROQ_API_KEY_5. Keys added to .env.local and .env.production (both untracked files).

**ACTION REQUIRED:** Rotate all 5 Groq keys at console.groq.com. The old keys remain in git history and are compromised.

## HIGH (FIXED) — Prompt Injection in /api/interview-prep

topic and level params were user-controlled strings interpolated directly into LLM prompt.

**Fix applied:** Allowlist validation added. Only values matching ALLOWED_TOPICS and ALLOWED_LEVELS sets are passed to Groq.

## MEDIUM (FIXED) — Missing search length cap in /api/jobs

**Fix applied:** Search param capped to 100 chars.

## LOW — Non-timing-safe CRON_SECRET comparison

Cron secret compared with `!==` (string equality) — susceptible to timing attacks in theory, negligible in practice for cron endpoints.

## INFORMATIONAL — .env.production not in .gitignore

`.env.production` pattern is not in .gitignore (only `.env*.local` is excluded). File is currently untracked (`??`) but a `git add .` could accidentally stage it. Consider adding `*.production` to .gitignore.

## INFORMATIONAL — Hardcoded admin email fallback

Multiple admin route files have `|| "namangoyal21197@gmail.com"` as fallback. This is a personal email hardcoded in source. Should be purely env-var controlled.

## INFORMATIONAL — No rate limiting on AI endpoints

`/api/interview-prep` and `/api/generate-lesson` have no rate limiting beyond credits. A user with credits could exhaust Groq API quota. The credit system provides economic rate limiting, which may be sufficient.
