// Citability scoring for GEO pages.
// Gate: pages must score ≥70 before Signal will publish.
// Auto-merge gate: ≥80 for auto-merge, <80 requires human review.

export const CITABILITY_THRESHOLD = 70;
export const AUTO_MERGE_THRESHOLD = 80;

interface CitabilityFactors {
  hasJsonLd: boolean;
  hasStats: boolean;
  hasCitations: boolean;
  hasFaqSection: boolean;
  hasDefinitions: boolean;
  hasExpertQuotes: boolean;
  hasComparisons: boolean;
  hasStepByStep: boolean;
  wordCount: number;
  readabilityGrade: number;
}

export function scoreCitability(factors: CitabilityFactors): number {
  let score = 0;

  // Structural signals (max 40)
  if (factors.hasJsonLd) score += 10;
  if (factors.hasFaqSection) score += 8;
  if (factors.hasDefinitions) score += 7;
  if (factors.hasStepByStep) score += 8;
  if (factors.hasComparisons) score += 7;

  // Authority signals (max 30)
  if (factors.hasStats) score += 10;
  if (factors.hasCitations) score += 10;
  if (factors.hasExpertQuotes) score += 10;

  // Content quality (max 30)
  if (factors.wordCount >= 1500) score += 15;
  else if (factors.wordCount >= 800) score += 10;
  else if (factors.wordCount >= 400) score += 5;

  if (factors.readabilityGrade >= 8 && factors.readabilityGrade <= 12) score += 15;
  else if (factors.readabilityGrade >= 6) score += 10;
  else score += 5;

  return Math.min(100, score);
}

export function passesGate(score: number): boolean {
  return score >= CITABILITY_THRESHOLD;
}

export function canAutoMerge(score: number): boolean {
  return score >= AUTO_MERGE_THRESHOLD;
}

export function analyzeMdx(content: string): CitabilityFactors {
  const lower = content.toLowerCase();
  return {
    hasJsonLd: content.includes('"@context"') || content.includes("application/ld+json"),
    hasStats: /\d+%|\d+x|\$[\d,]+/.test(content),
    hasCitations: /\[[\d]+\]|\(source:|according to/i.test(content),
    hasFaqSection: /##.*faq|##.*frequently asked/i.test(content),
    hasDefinitions: /##.*what is|##.*definition/i.test(content),
    hasExpertQuotes: /\u201c|\u201d.*\u2014|blockquote/i.test(content),
    hasComparisons: /##.*vs\.?|##.*comparison|##.*alternative/i.test(content),
    hasStepByStep: /##.*how to|##.*step[\s-]*\d|##.*guide/i.test(content),
    wordCount: content.split(/\s+/).length,
    readabilityGrade: estimateReadabilityGrade(content),
  };
}

function estimateReadabilityGrade(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  // Flesch-Kincaid grade level
  return 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  const matches = word.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (word.endsWith("e")) count--;
  return Math.max(1, count);
}
