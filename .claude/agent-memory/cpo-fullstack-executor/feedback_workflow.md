---
name: Workflow Preferences — PM Streak
description: Preferences for working on this project
type: feedback
---

Do NOT deploy to Vercel unless user explicitly says so.

**Why:** User has separated local work from deployment. All work stays local until green-lit.

**How to apply:** End every session with "ready for deployment — awaiting your go-ahead" rather
than running any Vercel deploy commands.

Do NOT commit unless there are genuine bugs to fix.

**Why:** User wants to control what goes into git history. Don't create commits for routine
script runs, QA passes, or review tasks.

**How to apply:** Only offer to commit when code changes were made to fix real bugs.
