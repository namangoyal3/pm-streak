export interface SeoInput {
  title: string;
  description: string;
  body: string;
  primaryKeyword: string;
  faqPairs?: { question: string; answer: string }[];
  howToSteps?: { name: string; text: string }[];
}

export function scoreSEO(input: SeoInput): number {
  const { title, description, body, primaryKeyword, faqPairs, howToSteps } = input;
  const kw = primaryKeyword.toLowerCase();
  const words = body.trim().split(/\s+/).length;

  let score = 0;

  // ── Traditional SEO signals (75 pts max) ──────────────────────────────────

  // Word count >= 800
  if (words >= 800) score += 20;
  else if (words >= 500) score += 10;

  // H2 headings present
  if (/^## /m.test(body)) score += 15;

  // H3 headings present
  if (/^### /m.test(body)) score += 10;

  // Description length 120-160 chars
  if (description.length >= 120 && description.length <= 160) score += 15;
  else if (description.length >= 80) score += 8;

  // Primary keyword in title
  if (title.toLowerCase().includes(kw)) score += 15;

  // Primary keyword in first 100 words of body
  const first100Words = body.trim().split(/\s+/).slice(0, 100).join(" ").toLowerCase();
  if (first100Words.includes(kw)) score += 10;

  // Internal links
  const internalLinks = (body.match(/\(\/[a-z]/g) || []).length;
  if (internalLinks >= 2) score += 10;
  else if (internalLinks >= 1) score += 5;

  // External links
  if (/\(https?:\/\//.test(body)) score += 5;

  // ── GEO signals (25 pts max) — AI citation quality ───────────────────────

  // FAQ pairs present (feeds FAQPage schema → AI engines extract Q&A)
  if (faqPairs && faqPairs.length >= 5) score += 10;
  else if (faqPairs && faqPairs.length >= 3) score += 5;

  // HowTo steps present (feeds HowTo schema → AI engines extract step lists)
  if (howToSteps && howToSteps.length >= 3) score += 5;

  // Expert citations "According to [name]" — AI engines favour attributed quotes
  const citationCount = (body.match(/According to /gi) || []).length;
  if (citationCount >= 3) score += 5;
  else if (citationCount >= 1) score += 2;

  // Direct answer block — bolded definition at start (GEO snippet extraction)
  if (/^\*\*[A-Z]/.test(body.trim())) score += 5;

  return Math.min(score, 100);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
