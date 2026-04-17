# Security Reviewer

## Task
Find vulnerabilities that could leak user data, bypass payments, or expose API keys.

## Scope
- All `src/app/api/` routes
- `src/middleware.ts`
- `src/lib/billing/` 
- `prisma/schema.prisma` (data exposure via API)
- `.env` vs `.env.example` (no secrets in example)

## Check
- [ ] All `/api/*` routes check auth/session before returning data
- [ ] Prisma queries can't be injection attacked
- [ ] No `console.log` with user emails, payment info, tokens
- [ ] Rate limiting on auth-sensitive routes
- [ ] Feature flags validated server-side, not just client

## Output
`REVIEWS/security-review-YYYY-MM-DD.md`