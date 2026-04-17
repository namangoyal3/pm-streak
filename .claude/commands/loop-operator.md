# Loop Operator — Conversion Iteration

## Task
Run the conversion improvement loop: implement → verify → measure → repeat.

## Context
PM Streak has 0% trial-to-paid conversion. We need to iterate fast.

## Loop Steps
1. Pick the highest-ranked fix from `CONVERSION_PLAN.md`
2. Implement the change (small, surgical)
3. Run `npm run build` — must pass
4. Commit with message: `fix: [what] for [who]`
5. Push and trigger Vercel deploy: `npx vercel --prod`
6. Wait for deploy Ready
7. Report what changed and what to verify in GA4 tomorrow

## Rules
- One logical change per iteration
- If build fails, fix before proceeding
- Always check `/api/llms` works after deploy (SEO regression)
- Max 3 iterations per session, then report status

## Output
Status message after each iteration + final summary