---
name: Jobs Board — Himalayas API Data Quality
description: Himalayas.app API returns non-PM jobs; PM title filter added to scraper
type: project
---

The Himalayas.app public API (`/jobs/api?q=product+manager`) returns generic job results
that often have zero PM roles. Queries for "product manager", "product management", "senior PM"
returned 20 results in March 2026 with 0 actual PM titles.

**Fix applied:** `scripts/scrape-pm-jobs.ts` now has `isPMJob(title)` filter that checks for
PM-specific title patterns before inserting into DB. Non-PM records already inserted were
deactivated (isActive=false).

**Ongoing:** The jobs board will show an empty state until a better data source is found or
the Himalayas API improves. Consider switching to Ashby, Greenhouse, or Lever APIs that support
category/department filtering. Alternatively, seed with manually curated jobs.

**Why:** The jobs board being the empty state is better than showing irrelevant jobs (pharmacology
specialists, geotechnics engineers) to PM learners — that would damage trust in the product.
