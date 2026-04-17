# Code Reviewer — Payment & Auth

## Task
Audit payment flow, auth, and middleware for security issues and conversion-blocking bugs.

## Focus Areas
- `src/app/api/checkout/route.ts` — Dodo Payments integration
- `src/app/api/billing/start-trial/route.ts` — trial initiation
- `src/middleware.ts` — auth protection, redirect logic
- `src/lib/billing/trial.ts` — trial eligibility logic
- `src/lib/experiment-tracker.ts` — A/B experiment assignment

## Security Checklist
- [ ] No payment tokens logged
- [ ] No API keys in client-side code
- [ ] Middleware redirects logged-in vs logged-out correctly
- [ ] Trial eligibility check can't be bypassed

## Conversion Checklist
- [ ] Checkout session creates correctly
- [ ] Trial start actually creates entitlement in DB
- [ ] A/B assignment is deterministic and persists
- [ ] Redirect after trial start goes somewhere useful

## Output
Review findings in `REVIEWS/payment-flow-review-YYYY-MM-DD.md`