/**
 * Interview prep credit pricing (client-safe). Imported by credits.ts — keep in sync.
 */
export const INTERVIEW_PREP_PRICING = {
  creditsPerQuestion: 1,
  questionsPerSession: 5,
} as const;

export function interviewPrepSessionCreditTotal(): number {
  return (
    INTERVIEW_PREP_PRICING.creditsPerQuestion * INTERVIEW_PREP_PRICING.questionsPerSession
  );
}
