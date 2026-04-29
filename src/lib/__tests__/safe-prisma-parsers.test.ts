import { describe, expect, it } from "vitest";
import { parsePulseMetrics, parseRivalGaps } from "../geo/safe-prisma";

// ── parsePulseMetrics ────────────────────────────────────────────────────────

describe("parsePulseMetrics", () => {
  it("returns [] when no JSON block is present", () => {
    expect(parsePulseMetrics("Here is my analysis of the pages. No structured data.")).toEqual([]);
  });

  it("parses a valid trailing JSON block", () => {
    const response = `
I analyzed 3 pages today. Traffic is growing.

\`\`\`json
[
  { "slug": "build-pm-portfolio", "sessions30d": 142, "leads30d": 2, "citability": 76 },
  { "slug": "pm-frameworks", "sessions30d": 0, "leads30d": 0, "citability": null }
]
\`\`\``;
    const rows = parsePulseMetrics(response);
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ slug: "build-pm-portfolio", sessions30d: 142, leads30d: 2, citability: 76 });
    expect(rows[1]).toMatchObject({ slug: "pm-frameworks", sessions30d: 0, leads30d: 0 });
  });

  it("takes the LAST json block (ignores prose code blocks before it)", () => {
    const response = `
Some earlier block:
\`\`\`json
{ "not": "an array" }
\`\`\`

Real metrics:
\`\`\`json
[{ "slug": "real-slug", "sessions30d": 10, "leads30d": 1 }]
\`\`\``;
    const rows = parsePulseMetrics(response);
    expect(rows).toHaveLength(1);
    expect(rows[0].slug).toBe("real-slug");
  });

  it("filters rows missing required fields", () => {
    const response = `\`\`\`json
[
  { "slug": "good", "sessions30d": 5, "leads30d": 0 },
  { "slug": "bad-missing-sessions", "leads30d": 0 },
  { "sessions30d": 10, "leads30d": 0 }
]
\`\`\``;
    const rows = parsePulseMetrics(response);
    expect(rows).toHaveLength(1);
    expect(rows[0].slug).toBe("good");
  });

  it("returns [] on malformed JSON", () => {
    const response = `\`\`\`json\n[{ broken json\n\`\`\``;
    expect(parsePulseMetrics(response)).toEqual([]);
  });
});

// ── parseRivalGaps ───────────────────────────────────────────────────────────

describe("parseRivalGaps", () => {
  it("returns [] when no JSON block is present", () => {
    expect(parseRivalGaps("Competitors are strong in roadmap tooling.")).toEqual([]);
  });

  it("parses a valid gap list", () => {
    const response = `
Competitive analysis complete.

\`\`\`json
[
  { "query": "pm roadmap tools 2026", "intentScore": 0.8, "gapScore": 0.9, "competitors": ["productboard.com", "roadmunk.com"] },
  { "query": "product discovery techniques", "intentScore": 0.75, "gapScore": 0.85, "competitors": ["intercom.com"] }
]
\`\`\``;
    const gaps = parseRivalGaps(response);
    expect(gaps).toHaveLength(2);
    expect(gaps[0]).toMatchObject({
      query: "pm roadmap tools 2026",
      intentScore: 0.8,
      gapScore: 0.9,
      competitors: ["productboard.com", "roadmunk.com"],
    });
  });

  it("filters rows missing required fields", () => {
    const response = `\`\`\`json
[
  { "query": "good", "intentScore": 0.7, "gapScore": 0.8, "competitors": [] },
  { "intentScore": 0.7, "gapScore": 0.8, "competitors": [] },
  { "query": "no-scores", "competitors": [] }
]
\`\`\``;
    const gaps = parseRivalGaps(response);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].query).toBe("good");
  });

  it("returns [] on malformed JSON", () => {
    const response = `\`\`\`json\n[{ broken\n\`\`\``;
    expect(parseRivalGaps(response)).toEqual([]);
  });
});
