export interface SeoInput {
  title: string;
  description: string;
  body: string;
  primaryKeyword: string;
}

export function scoreSEO(input: SeoInput): number {
  const { title, description, body, primaryKeyword } = input;
  const kw = primaryKeyword.toLowerCase();
  const words = body.trim().split(/\s+/).length;

  let score = 0;

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

  // Internal links (links to /learn/ or /interview-prep or /daily-challenge)
  const internalLinks = (body.match(/\(\/[a-z]/g) || []).length;
  if (internalLinks >= 2) score += 10;
  else if (internalLinks >= 1) score += 5;

  // External links
  if (/\(https?:\/\//.test(body)) score += 5;

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
