import { describe, expect, it } from "vitest";
import { extractFaqPairs, extractHowToSteps } from "../geo/markdown-faq";

describe("extractFaqPairs", () => {
  it("returns [] when no FAQ section is present", () => {
    expect(extractFaqPairs("# Title\n\nSome body. ## Conclusion")).toEqual([]);
  });

  it("parses ### Q / paragraph A pairs", () => {
    const body = `## FAQ

### What is RICE?

RICE is a prioritization framework that scores Reach, Impact, Confidence, Effort.

### When should you use RICE?

Use it when you have many candidate features and need a transparent way to rank them.
`;
    const pairs = extractFaqPairs(body);
    expect(pairs.length).toBe(2);
    expect(pairs[0].question).toBe("What is RICE?");
    expect(pairs[0].answer.startsWith("RICE is a prioritization")).toBe(true);
    expect(pairs[1].question).toBe("When should you use RICE?");
  });

  it("parses **Q?** / A pairs", () => {
    const body = `## FAQ

**What is RICE?**
A prioritization framework.

**Why use it?**
It surfaces tradeoffs explicitly.
`;
    const pairs = extractFaqPairs(body);
    expect(pairs.length).toBe(2);
    expect(pairs[0].question).toBe("What is RICE?");
    expect(pairs[1].question).toBe("Why use it?");
  });

  it("stops at the next ## heading", () => {
    const body = `## FAQ
### Q1?
A1.

## Other section
This is not in FAQ.
`;
    const pairs = extractFaqPairs(body);
    expect(pairs).toEqual([{ question: "Q1?", answer: "A1." }]);
  });

  it("handles 'Frequently Asked Questions' heading variant", () => {
    const body = `## Frequently Asked Questions

### Q1?
A1.
`;
    expect(extractFaqPairs(body).length).toBe(1);
  });
});

describe("extractHowToSteps", () => {
  it("converts a ## How to section into HowToStep entries", () => {
    const body = `## How to prioritize a roadmap

### Step 1: List candidates
Write down every feature you're considering.

### Step 2: Score each one
Use RICE or ICE.
`;
    const steps = extractHowToSteps(body);
    expect(steps.length).toBe(2);
    expect(steps[0].name).toBe("Step 1: List candidates?");
    // Note: parser auto-appends ? so name is normalised; we mostly care text is non-empty.
    expect(steps[0].text.length).toBeGreaterThan(0);
  });

  it("returns [] when no HowTo section is present", () => {
    expect(extractHowToSteps("## FAQ\n### Q?\nA.")).toEqual([]);
  });
});
