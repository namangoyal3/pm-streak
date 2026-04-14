export interface SeoInput {
  title: string;
  description: string;
  body: string;
  primaryKeyword: string;
}

export interface GeoScoreResult {
  seoScore: number;
  geoScore: number;
  overallScore: number;
  breakdown: {
    wordCount: number;
    h2Headings: number;
    h3Headings: number;
    descriptionLen: number;
    keywordInTitle: boolean;
    keywordInFirst100: boolean;
    internalLinks: number;
    externalLinks: number;
    citabilityBlocks: number;
    optimalPassages: number;
    brandMentions: boolean;
    schemaValid: boolean;
  };
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

  // Internal links (links to /learn/ or /interview-prep or /dashboard)
  const internalLinks = (body.match(/\(\/[a-z]/g) || []).length;
  if (internalLinks >= 2) score += 10;
  else if (internalLinks >= 1) score += 5;

  // External links
  if (/\(https?:\/\//.test(body)) score += 5;

  return Math.min(score, 100);
}

/**
 * Score content for AI citation readiness (GEO scoring)
 * Based on geo-seo-claude citability methodology:
 * - Optimal passage length: 134-167 words
 * - Self-contained blocks (can stand alone without surrounding context)
 * - Statistical density (numbers, data, specific facts)
 * - Uniqueness signals (specific examples, named entities)
 */
export function scoreGeo(input: SeoInput): number {
  const { body, primaryKeyword } = input;
  const kw = primaryKeyword.toLowerCase();

  // Split into content blocks (by H2 headings)
  const blocks = body.split(/^##\s+.+$/m).filter(b => b.trim().length > 0);
  let score = 0;

  // 1. Passage length analysis (20 points)
  const passageScores = blocks.map(block => {
    const words = block.trim().split(/\s+/).length;
    // Optimal: 134-167 words
    if (words >= 134 && words <= 167) return 3;
    if (words >= 100 && words <= 200) return 2;
    if (words >= 50) return 1;
    return 0;
  });

  const optimalPassages = passageScores.filter(s => s === 3).length;
  const goodPassages = passageScores.filter(s => s >= 2).length;
  score += Math.min(optimalPassages * 4, 12);  // 4pts per optimal, max 12
  score += Math.min(goodPassages * 2, 8);       // 2pts per good, max 8

  // 2. Self-containment check (20 points)
  // Self-contained blocks don't rely on previous context
  let selfContainedCount = 0;
  for (const block of blocks) {
    const trimmed = block.trim();
    // Doesn't start with a pronoun or connector that depends on prior text
    const badStarters = /^(and|so|therefore|however|also|this means|which means|that is|building on|in contrast|on the other hand)/i;
    const hasHeadingContext = /^(for example|as shown|like |such as|the following|the above|the previous)/i.test(trimmed);
    if (!badStarters.test(trimmed) && !hasHeadingContext) {
      selfContainedCount++;
    }
  }
  score += Math.min(selfContainedCount * 4, 20);

  // 3. Statistical density (20 points)
  // Numbers, percentages, specific data points
  const statMatches = body.match(/\d+%/g) || [];
  const numberMatches = body.match(/\d{2,}/g) || [];
  const dollarMatches = body.match(/\$\d+/g) || [];
  const statCount = statMatches.length + numberMatches.length + dollarMatches.length;
  score += Math.min(statCount * 2, 20);

  // 4. Named entity density (20 points)
  // Names, companies, products, frameworks with capitals
  const namedEntities = body.match(/[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
  // Dedupe and filter common words
  const uniqueEntities = [...new Set(namedEntities)].filter(e =>
    e.length > 3 &&
    !['The', 'This', 'That', 'These', 'Those', 'When', 'What', 'Where', 'How', 'Why'].includes(e)
  );
  score += Math.min(uniqueEntities.length * 2, 20);

  // 5. Keyword integration (10 points)
  const kwLower = kw.toLowerCase();
  const keywordDensity = (body.toLowerCase().match(new RegExp(kwLower, 'g')) || []).length;
  const wordCount = body.split(/\s+/).length;
  const density = (keywordDensity / wordCount) * 100;
  // Ideal: 0.5% - 2%
  if (density >= 0.5 && density <= 2) score += 10;
  else if (density > 0 && density <= 3) score += 5;

  // 6. Q&A format bonus (10 points)
  const faqCount = (body.match(/^###?\s+[^?]*\?|^\*\*[^?]+\*\*/gm) || []).length;
  if (faqCount >= 3) score += 10;
  else if (faqCount >= 1) score += 5;

  return Math.min(score, 100);
}

/**
 * Combined SEO + GEO scoring for articles
 */
export function scoreArticle(input: SeoInput): GeoScoreResult {
  const seoScore = scoreSEO(input);
  const geoScore = scoreGeo(input);
  const overallScore = Math.round(seoScore * 0.6 + geoScore * 0.4);

  // Build breakdown
  const kw = input.primaryKeyword.toLowerCase();
  const words = input.body.trim().split(/\s+/).length;
  const h2Count = (input.body.match(/^## /gm) || []).length;
  const h3Count = (input.body.match(/^### /gm) || []).length;
  const internalLinks = (input.body.match(/\(\/[a-z]/g) || []).length;
  const externalLinks = (input.body.match(/\(https?:\/\//g) || []).length;
  const first100Words = input.body.trim().split(/\s+/).slice(0, 100).join(" ").toLowerCase();

  // Count citability blocks (134-167 word passages)
  const blocks = input.body.split(/^##\s+.+$/m).filter(b => b.trim().length > 0);
  const citabilityBlocks = blocks.filter(b => {
    const w = b.trim().split(/\s+/).length;
    return w >= 134 && w <= 167;
  }).length;

  return {
    seoScore,
    geoScore,
    overallScore,
    breakdown: {
      wordCount: words,
      h2Headings: h2Count,
      h3Headings: h3Count,
      descriptionLen: input.description.length,
      keywordInTitle: input.title.toLowerCase().includes(kw),
      keywordInFirst100: first100Words.includes(kw),
      internalLinks,
      externalLinks,
      citabilityBlocks,
      optimalPassages: citabilityBlocks,
      brandMentions: /\bPM Streak\b/i.test(input.body),
      schemaValid: false, // Would need HTML parsing to verify
    },
  };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}