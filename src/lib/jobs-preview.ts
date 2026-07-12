interface PreviewableJob {
  title: string;
  company: string;
}

const FREE_PREVIEW_LIMIT = 3;

/**
 * Picks the jobs to render in the list. Pro users see everything.
 * Free users see a preview of FREE_PREVIEW_LIMIT cards, deduped by
 * title + company so the teaser shows variety instead of three
 * near-identical listings. If there are fewer unique roles than the
 * limit, remaining slots are backfilled with the skipped duplicates.
 */
export function previewJobs<T extends PreviewableJob>(jobs: T[], isPro: boolean): T[] {
  if (isPro) return jobs;

  const seen = new Set<string>();
  const preview: T[] = [];

  for (const job of jobs) {
    const key = `${job.title.trim().toLowerCase()}|${job.company.trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    preview.push(job);
    if (preview.length === FREE_PREVIEW_LIMIT) return preview;
  }

  if (preview.length < FREE_PREVIEW_LIMIT) {
    const picked = new Set(preview);
    for (const job of jobs) {
      if (picked.has(job)) continue;
      preview.push(job);
      if (preview.length === FREE_PREVIEW_LIMIT) break;
    }
  }

  return preview;
}
