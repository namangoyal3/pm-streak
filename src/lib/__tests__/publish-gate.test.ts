import { describe, expect, it } from "vitest";
import { decidePublish, parseJudgeResponse, type JudgeVerdict } from "../geo/publish-gate";
import { findOwnCitation, pickProbeQuery } from "../geo/citation-probe";
import { rewriteStockImages } from "../geo/safe-prisma";

const okJudge: JudgeVerdict = { score: 85, reason: "solid", errored: false };

describe("decidePublish", () => {
  it("auto-publishes when score ≥80, judge passes, not a sample slot", () => {
    expect(decidePublish({ citabilityScore: 85, judge: okJudge, publishedThisTick: 0, sampleEvery: 4 }))
      .toEqual({ publish: true, reason: "auto_publish" });
  });

  it("holds 70-79 scores as drafts (auto-merge threshold)", () => {
    expect(decidePublish({ citabilityScore: 75, judge: okJudge, publishedThisTick: 0, sampleEvery: 4 }).reason)
      .toBe("score_below_auto_merge");
  });

  it("holds when the LLM judge scores low", () => {
    const judge: JudgeVerdict = { score: 40, reason: "fluffy intro", errored: false };
    expect(decidePublish({ citabilityScore: 90, judge, publishedThisTick: 0, sampleEvery: 4 }).reason).toBe("judge_low");
  });

  it("fails safe to draft when the judge call errors", () => {
    const judge: JudgeVerdict = { score: 0, reason: "timeout", errored: true };
    const d = decidePublish({ citabilityScore: 90, judge, publishedThisTick: 0, sampleEvery: 4 });
    expect(d).toEqual({ publish: false, reason: "judge_error" });
  });

  it("holds every Nth publishable article as a review sample", () => {
    // publishedThisTick 3 → this is the 4th publishable article → held
    expect(decidePublish({ citabilityScore: 90, judge: okJudge, publishedThisTick: 3, sampleEvery: 4 }).reason)
      .toBe("review_sample");
    expect(decidePublish({ citabilityScore: 90, judge: okJudge, publishedThisTick: 2, sampleEvery: 4 }).publish)
      .toBe(true);
  });

  it("sampleEvery=1 reviews everything", () => {
    expect(decidePublish({ citabilityScore: 95, judge: okJudge, publishedThisTick: 0, sampleEvery: 1 }).reason)
      .toBe("review_sample");
  });
});

describe("parseJudgeResponse", () => {
  it("parses and clamps a valid response", () => {
    expect(parseJudgeResponse('{"score": 120, "reason": "great"}')).toEqual({ score: 100, reason: "great" });
  });

  it("tolerates prose around the JSON", () => {
    expect(parseJudgeResponse('Here you go: {"score": 55.6, "reason": "ok"} hope that helps').score).toBe(56);
  });

  it("throws on a non-numeric score", () => {
    expect(() => parseJudgeResponse('{"score": "high"}')).toThrow();
  });

  it("throws when no JSON is present", () => {
    expect(() => parseJudgeResponse("I cannot judge this")).toThrow();
  });
});

describe("rewriteStockImages", () => {
  it("rewrites markdown picsum images to branded /api/og", () => {
    const body = "Intro\n\n![PM roadmap](https://picsum.photos/seed/pm/800/400)\n\nMore";
    expect(rewriteStockImages(body, "Fallback Title"))
      .toContain("![PM roadmap](/api/og?title=PM%20roadmap)");
  });

  it("uses the article title when alt text is empty", () => {
    const body = "![](https://picsum.photos/800/400)";
    expect(rewriteStockImages(body, "North Star Metric"))
      .toBe("![North Star Metric](/api/og?title=North%20Star%20Metric)");
  });

  it("rewrites html img tags", () => {
    const body = '<img src="https://picsum.photos/seed/x/600" alt="x" />';
    expect(rewriteStockImages(body, "T")).toContain('src="/api/og?title=T"');
  });

  it("leaves non-picsum images alone", () => {
    const body = "![ok](/api/og?title=ok) ![also](/images/hero.png)";
    expect(rewriteStockImages(body, "T")).toBe(body);
  });
});

describe("findOwnCitation", () => {
  it("matches own host in string citations, ignoring www", () => {
    const citations = ["https://competitor.com/a", "https://www.learnanything.pro/learn/pm/x"];
    expect(findOwnCitation(citations, "learnanything.pro")).toBe("https://www.learnanything.pro/learn/pm/x");
  });

  it("matches {url} object citations (search_results shape)", () => {
    expect(findOwnCitation([{ url: "https://learnanything.pro/y" }], "learnanything.pro")).toBe("https://learnanything.pro/y");
  });

  it("returns undefined when absent or malformed", () => {
    expect(findOwnCitation(["https://other.com", "not a url"], "learnanything.pro")).toBeUndefined();
    expect(findOwnCitation(null, "learnanything.pro")).toBeUndefined();
  });
});

describe("pickProbeQuery", () => {
  it("prefers GSC topQueries", () => {
    expect(pickProbeQuery({ slug: "s", topQueries: [{ query: "best pm course" }], opportunityQuery: "opp", articleTitle: "t" }))
      .toBe("best pm course");
  });

  it("falls back to opportunity query, then title, then slug", () => {
    expect(pickProbeQuery({ slug: "s", opportunityQuery: "opp q", articleTitle: "t" })).toBe("opp q");
    expect(pickProbeQuery({ slug: "s", articleTitle: "The Title" })).toBe("The Title");
    expect(pickProbeQuery({ slug: "north-star-metric" })).toBe("north star metric");
  });
});
