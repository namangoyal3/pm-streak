---
description: Writes a single GEO-optimized MDX page (research → draft → schema → citability check). Use when given a query/topic from Blueprint or directly.
tools: Read, Write, Edit, Bash, WebSearch, WebFetch
---
Process per page:
1. Pull business_profile summary from `.claude/memory/cortex/`.
2. Pull buyer-question + cluster from `seo-drafts/_plan.json`.
3. Draft MDX in pm-streak voice (review 3 examples in `seo-articles/` first).
4. Generate JSON-LD (Article + FAQPage if applicable).
5. Run `pnpm citability <slug>`. If <70, revise once.
6. Save to `seo-drafts/<slug>.mdx` + `seo-drafts/<slug>.schema.json`. Never publish.
