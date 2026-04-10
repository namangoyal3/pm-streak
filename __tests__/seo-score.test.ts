import { describe, it, expect } from "vitest";
import { scoreSEO } from "../src/lib/seo-score";

const BASE_BODY = `**Product roadmap planning is** the process of aligning your team's output with business goals.

According to Lenny Rachitsky on Lenny's Podcast, the best roadmaps balance short-term delivery with long-term vision.
According to Shreyas Doshi, PMs should separate "what" from "how" in roadmap conversations.
According to Gibson Biddle, Netflix's PM culture treated roadmaps as hypotheses to test.

## Why Roadmaps Matter in 2026

With AI agents handling more execution in 2026, PMs must focus roadmaps on outcomes not outputs.

### Common Frameworks

- RICE: Reach, Impact, Confidence, Effort
- Jobs to be Done

> **RICE Score**: A prioritisation formula weighing Reach, Impact, Confidence, and Effort.

## Advanced Tactics for 2026

Use AI tooling to simulate roadmap tradeoffs before committing.

## Common Pitfalls

Avoid roadmaps that look like feature factories.

## Success Metrics

- Outcome achievement rate
- Stakeholder satisfaction

## Frequently Asked Questions

### What is roadmap planning?
Roadmap planning is the process of identifying which product bets to make over a given time horizon.

### How often should you update a roadmap?
Most teams update roadmaps quarterly, with lightweight weekly refinements.

### What makes a good roadmap?
A good roadmap shows outcomes, not features, and has clear prioritisation rationale.

### How do you handle stakeholder pressure on the roadmap?
Use data and a clear prioritisation framework to redirect stakeholder demands to outcomes.

### What is the difference between a roadmap and a backlog?
A roadmap shows strategic direction over months; a backlog is the execution queue for sprints.

[Learn more about interview prep](/interview-prep) and [explore PM lessons](/learn).
Check out [Lenny's Newsletter](https://www.lennysnewsletter.com) for more insights.
`;

const BASE_INPUT = {
  title: "Mastering Product Roadmap Planning in 2026",
  description: "The complete guide to product roadmap planning for PMs in 2026. Covers frameworks, stakeholder alignment, and success metrics.",
  body: BASE_BODY,
  primaryKeyword: "product roadmap planning",
};

describe("scoreSEO", () => {
  it("scores a high-quality GEO article above 90", () => {
    const score = scoreSEO({
      ...BASE_INPUT,
      faqPairs: [
        { question: "What is roadmap planning?", answer: "Roadmap planning is..." },
        { question: "How often to update?", answer: "Quarterly..." },
        { question: "What makes a good roadmap?", answer: "Outcomes..." },
        { question: "How to handle stakeholder pressure?", answer: "Use data..." },
        { question: "Roadmap vs backlog?", answer: "Roadmap shows direction..." },
      ],
      howToSteps: [
        { name: "Define outcomes", text: "Start with business goals." },
        { name: "Prioritise", text: "Use RICE or JTBD." },
        { name: "Communicate", text: "Share with stakeholders quarterly." },
      ],
    });
    expect(score).toBeGreaterThanOrEqual(90);
  });

  it("rewards FAQ pairs", () => {
    const withFaq = scoreSEO({
      ...BASE_INPUT,
      faqPairs: [
        { question: "Q1", answer: "A1" },
        { question: "Q2", answer: "A2" },
        { question: "Q3", answer: "A3" },
        { question: "Q4", answer: "A4" },
        { question: "Q5", answer: "A5" },
      ],
    });
    const withoutFaq = scoreSEO({ ...BASE_INPUT });
    expect(withFaq).toBeGreaterThan(withoutFaq);
  });

  it("rewards HowTo steps", () => {
    const withSteps = scoreSEO({
      ...BASE_INPUT,
      howToSteps: [
        { name: "Step 1", text: "Do this." },
        { name: "Step 2", text: "Do that." },
        { name: "Step 3", text: "Check results." },
      ],
    });
    const withoutSteps = scoreSEO({ ...BASE_INPUT });
    expect(withSteps).toBeGreaterThan(withoutSteps);
  });

  it("rewards expert citations", () => {
    const withCitations = scoreSEO({ ...BASE_INPUT }); // BASE_BODY has 3 citations
    const noCitationBody = BASE_BODY.replace(/According to .+?\./g, "");
    const withoutCitations = scoreSEO({ ...BASE_INPUT, body: noCitationBody });
    expect(withCitations).toBeGreaterThan(withoutCitations);
  });

  it("rewards direct answer block at start", () => {
    const withBlock = scoreSEO({ ...BASE_INPUT }); // BASE_BODY starts with **
    const withoutBlock = scoreSEO({ ...BASE_INPUT, body: "No bold start here.\n\n" + BASE_BODY });
    expect(withBlock).toBeGreaterThan(withoutBlock);
  });

  it("caps score at 100", () => {
    const score = scoreSEO({
      ...BASE_INPUT,
      faqPairs: Array(5).fill({ question: "Q", answer: "A" }),
      howToSteps: Array(3).fill({ name: "S", text: "T" }),
    });
    expect(score).toBeLessThanOrEqual(100);
  });

  it("scores thin article below threshold (70)", () => {
    const score = scoreSEO({
      title: "PM tips",
      description: "Short",
      body: "Some advice.",
      primaryKeyword: "PM tips",
    });
    expect(score).toBeLessThan(70);
  });

  it("fails article missing keyword in title", () => {
    const score = scoreSEO({
      ...BASE_INPUT,
      title: "A Generic Guide to Planning",
    });
    const normalScore = scoreSEO(BASE_INPUT);
    expect(score).toBeLessThan(normalScore);
  });
});
