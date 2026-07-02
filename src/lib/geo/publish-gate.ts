// publish-gate.ts — decides whether a gate-passing article auto-publishes or is
// held as an unpublished draft for human review (GEO-01 + GEO-03).
//
// Two inputs beyond the regex citability score:
//  1. LLM judge (GEO-01): scores extractable-answer quality — direct-answer-first
//     opening and self-contained H2 sections — beyond regex signal presence.
//  2. Review sample (GEO-03): every Nth auto-publishable article is held anyway,
//     so a human sees a steady sample of what the swarm ships.
//
// Fail-safe: a judge API failure NEVER blocks creation and NEVER auto-publishes —
// the article is created as a draft for review.

import { groqCreate } from "@/lib/groq";
import { canAutoMerge } from "./citability";

export const JUDGE_PASS_THRESHOLD = 60;
const DEFAULT_REVIEW_SAMPLE_EVERY = 4;

export type JudgeVerdict = {
  score: number; // 0-100; 0 when errored
  reason: string;
  errored: boolean;
};

export type PublishDecision = {
  publish: boolean;
  reason:
    | "auto_publish"
    | "score_below_auto_merge"
    | "judge_low"
    | "judge_error"
    | "review_sample";
};

const JUDGE_SYSTEM_PROMPT = `You judge how citable an article is for AI search engines (ChatGPT, Perplexity, Google AI Overviews).
Score 0-100 on exactly two criteria, weighted equally:
1. DIRECT ANSWER FIRST: the opening paragraph directly and completely answers the title's implied question in 2-4 sentences, before any preamble.
2. SELF-CONTAINED SECTIONS: each H2 section can be lifted out alone and still make sense — it restates its subject, gives a complete answer in roughly 100-170 words, and does not depend on surrounding text.
Penalize: fluffy intros ("In today's fast-paced world"), sections that are only bullet fragments, marketing filler, sections that assume you read the previous one.
Return ONLY valid JSON: {"score": <0-100>, "reason": "<one short sentence>"}`;

// Pure — unit-testable. Tolerates prose around the JSON and clamps the score.
export function parseJudgeResponse(raw: string): { score: number; reason: string } {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON object in judge response");
  const parsed = JSON.parse(match[0]) as { score?: unknown; reason?: unknown };
  const score = Number(parsed.score);
  if (!Number.isFinite(score)) throw new Error("Judge response missing numeric score");
  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    reason: typeof parsed.reason === "string" ? parsed.reason.slice(0, 300) : "",
  };
}

export async function judgeCitability(body: string): Promise<JudgeVerdict> {
  try {
    const response = await groqCreate({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      max_tokens: 200,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: JUDGE_SYSTEM_PROMPT },
        // 12k chars ≈ 3k tokens — enough to judge opening + several H2 sections.
        { role: "user", content: body.slice(0, 12_000) },
      ],
    });
    const raw = response.choices[0]?.message?.content ?? "";
    const { score, reason } = parseJudgeResponse(raw);
    return { score, reason, errored: false };
  } catch (e) {
    return {
      score: 0,
      reason: e instanceof Error ? e.message.slice(0, 200) : String(e),
      errored: true,
    };
  }
}

// Pure — unit-testable. `publishedThisTick` is the count of auto-published
// articles earlier in the same tick, used for the deterministic review sample.
export function decidePublish(input: {
  citabilityScore: number;
  judge: JudgeVerdict;
  publishedThisTick: number;
  sampleEvery?: number;
}): PublishDecision {
  const sampleEvery =
    input.sampleEvery ??
    Math.max(1, Number(process.env.GEO_REVIEW_SAMPLE_EVERY ?? DEFAULT_REVIEW_SAMPLE_EVERY));

  if (!canAutoMerge(input.citabilityScore)) {
    return { publish: false, reason: "score_below_auto_merge" };
  }
  if (input.judge.errored) return { publish: false, reason: "judge_error" };
  if (input.judge.score < JUDGE_PASS_THRESHOLD) return { publish: false, reason: "judge_low" };
  // Hold every Nth otherwise-publishable article for human review.
  if ((input.publishedThisTick + 1) % sampleEvery === 0) {
    return { publish: false, reason: "review_sample" };
  }
  return { publish: true, reason: "auto_publish" };
}
