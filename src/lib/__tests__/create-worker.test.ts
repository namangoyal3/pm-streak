import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildForgePrompt } from "../geo/create-worker";

// ── Module mocks ──────────────────────────────────────────────────────────────
// Paths are relative to THIS test file (src/lib/__tests__/).

vi.mock("../geo/safe-prisma", () => ({
  listUnaddressedOpportunities: vi.fn(),
  markOpportunityAddressed: vi.fn(),
  selectInternalLinks: vi.fn(),
  publishArticle: vi.fn(),
}));

vi.mock("../geo/forge-runner", () => ({
  runForge: vi.fn(),
}));

vi.mock("@/lib/lyzr", () => ({
  callAgent: vi.fn(),
  Agents: {
    blueprint: () => "bp-agent-id",
    forge: () => "forge-agent-id",
  },
}));

vi.mock("../geo/citability", () => ({
  analyzeMdx: vi.fn(),
  passesGate: vi.fn(),
  scoreCitability: vi.fn(),
}));

vi.mock("../geo/publish-gate", () => ({
  judgeCitability: vi.fn(),
  decidePublish: vi.fn(),
}));

// ── Import mocked modules after vi.mock ───────────────────────────────────────
import * as safePrisma from "../geo/safe-prisma";
import * as forgeRunner from "../geo/forge-runner";
import * as lyzr from "@/lib/lyzr";
import * as citability from "../geo/citability";
import * as publishGate from "../geo/publish-gate";
import { runCreateTick } from "../geo/create-worker";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeOpportunity(overrides: Partial<{
  id: string;
  query: string;
  intentScore: number;
  gapScore: number;
  source: string;
  currentTop3: unknown;
  addressed: boolean;
  pageSlug: string | null;
  createdAt: Date;
  attempts: number;
  lastError: string | null;
  updatedAt: Date;
}> = {}) {
  return {
    id: "opp-1",
    query: "best pm tools 2025",
    intentScore: 0.85,
    gapScore: 0.9,
    source: "rival",
    currentTop3: ["productboard.com", "roadmunk.com", "aha.io"],
    addressed: false,
    pageSlug: null,
    createdAt: new Date("2025-01-01"),
    attempts: 0,
    lastError: null,
    updatedAt: new Date("2025-01-01"),
    ...overrides,
  };
}

function makePrisma(overrides: {
  articleFindUnique?: unknown;
} = {}) {
  return {
    article: {
      findUnique: vi.fn().mockResolvedValue(overrides.articleFindUnique ?? null),
    },
    geoOpportunity: {
      update: vi.fn().mockResolvedValue({}),
    },
  } as unknown as import("@prisma/client").PrismaClient;
}

// Blueprint JSON that callAgent returns as a valid response
function makeBlueprintResponse(partial: Partial<{
  title: string;
  page_type: string;
  target_queries: string[];
  outline: string[];
}> = {}) {
  const obj = {
    title: "Best PM Tools 2025",
    page_type: "comparison",
    target_queries: ["best pm tools", "product management software"],
    outline: ["Overview", "Comparison Table", "FAQ"],
    ...partial,
  };
  return { response: JSON.stringify(obj) };
}

// A forge output that passes all quality gates
function makeGoodForgeOutput() {
  // The MDX body must:
  // - have >= 1200 words
  // - match FAQ_REGEX: /##\s+(faq|frequently asked questions)/i
  // - match HERO_REGEX: /picsum\.photos\/seed\/|\/images\//
  const body = [
    "## Introduction",
    "This is a great PM tools guide.",
    // FAQ section to pass FAQ_REGEX
    "## FAQ",
    "Q: What are the best PM tools?",
    "A: Productboard, Roadmunk, Aha.",
    // Hero image path to pass HERO_REGEX
    "![hero](/images/pm-tools.png)",
  ].join("\n\n");

  // Pad to 1200+ words
  const padding = Array(300).fill("word").join(" ");
  const fullBody = body + "\n\n" + padding;

  return {
    mdx: fullBody,
    schema_meta: { meta: { title: "Best PM Tools 2025", description: "A guide." } },
    body_word_count: 1300,
    passes: 1,
    floor: 1000,
  };
}

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();

  // Default safe implementations
  (safePrisma.selectInternalLinks as ReturnType<typeof vi.fn>).mockResolvedValue([
    { slug: "pm-roadmap-guide", currentCitability: 82 },
  ]);
  (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([]);
  (safePrisma.markOpportunityAddressed as ReturnType<typeof vi.fn>).mockResolvedValue({});
  (safePrisma.publishArticle as ReturnType<typeof vi.fn>).mockResolvedValue({ id: "art-1", slug: "best-pm-tools-2025", vertical: "pm" });

  (forgeRunner.runForge as ReturnType<typeof vi.fn>).mockResolvedValue(makeGoodForgeOutput());

  (lyzr.callAgent as ReturnType<typeof vi.fn>).mockResolvedValue(makeBlueprintResponse());

  (citability.analyzeMdx as ReturnType<typeof vi.fn>).mockReturnValue({
    hasJsonLd: true, hasStats: true, hasCitations: true, hasFaqSection: true,
    hasDefinitions: false, hasExpertQuotes: false, hasComparisons: true, hasStepByStep: false,
    wordCount: 1300, readabilityGrade: 9,
  });
  (citability.scoreCitability as ReturnType<typeof vi.fn>).mockReturnValue(80);
  (citability.passesGate as ReturnType<typeof vi.fn>).mockReturnValue(true);

  (publishGate.judgeCitability as ReturnType<typeof vi.fn>).mockResolvedValue({ score: 85, reason: "solid", errored: false });
  (publishGate.decidePublish as ReturnType<typeof vi.fn>).mockReturnValue({ publish: true, reason: "auto_publish" });
});

// ── buildForgePrompt tests (pure — no mocks needed) ───────────────────────────

describe("buildForgePrompt", () => {
  const baseOpp = { query: "product management tools", currentTop3: ["productboard.com", "aha.io"] };
  const baseBlueprint = {
    title: "Top PM Tools",
    page_type: "comparison",
    target_queries: ["best pm tools", "pm software comparison"],
    outline: ["Overview", "Comparison", "FAQ"],
  };
  const baseLinks = [{ slug: "pm-roadmap-guide", currentCitability: 82 }];

  it("includes all competitor names from currentTop3", () => {
    const prompt = buildForgePrompt(baseOpp, baseBlueprint, baseLinks);
    expect(prompt).toContain("productboard.com");
    expect(prompt).toContain("aha.io");
  });

  it("includes target_queries as FAQ seeds", () => {
    const prompt = buildForgePrompt(baseOpp, baseBlueprint, baseLinks);
    expect(prompt).toContain("best pm tools");
    expect(prompt).toContain("pm software comparison");
  });

  it("includes internal link slugs", () => {
    const prompt = buildForgePrompt(baseOpp, baseBlueprint, baseLinks);
    expect(prompt).toContain("pm-roadmap-guide");
  });

  it("includes the target query", () => {
    const prompt = buildForgePrompt(baseOpp, baseBlueprint, baseLinks);
    expect(prompt).toContain("product management tools");
  });

  it("handles empty internalLinks gracefully — contains 'none available yet'", () => {
    const prompt = buildForgePrompt(baseOpp, baseBlueprint, []);
    expect(prompt).toContain("none available yet");
  });

  it("handles non-array currentTop3 by converting to string", () => {
    const oppWithStringTop3 = { query: "some query", currentTop3: "productboard.com" };
    const prompt = buildForgePrompt(oppWithStringTop3, baseBlueprint, baseLinks);
    expect(prompt).toContain("productboard.com");
  });
});

// ── runCreateTick tests ────────────────────────────────────────────────────────

describe("runCreateTick", () => {
  it("happy path: creates article and marks opportunity addressed", async () => {
    const opp = makeOpportunity();
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    const result = await runCreateTick(prisma, {});

    expect(result.created).toBe(1);
    expect(result.failed).toBe(0);
    expect(result.skipped).toBe(0);
    expect(safePrisma.publishArticle).toHaveBeenCalledOnce();
    expect(safePrisma.markOpportunityAddressed).toHaveBeenCalledWith(
      opp.id,
      expect.any(String) // slug
    );
    expect(result.decisions[0].action).toBe("created");
  });

  it("hold-for-review: publish decision false → drafted, publishArticle called with published:false", async () => {
    const opp = makeOpportunity();
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);
    (publishGate.decidePublish as ReturnType<typeof vi.fn>).mockReturnValue({ publish: false, reason: "judge_low" });

    const result = await runCreateTick(prisma, {});

    expect(result.created).toBe(0);
    expect(result.drafted).toBe(1);
    expect(safePrisma.publishArticle).toHaveBeenCalledWith(expect.objectContaining({ published: false }));
    expect(safePrisma.markOpportunityAddressed).toHaveBeenCalledOnce();
    expect(result.decisions[0].action).toBe("drafted:judge_low");
  });

  it("duplicate guard: skips runForge and marks addressed when article already exists", async () => {
    const opp = makeOpportunity();
    // Existing article found
    const prisma = makePrisma({ articleFindUnique: { id: "existing-art", slug: "best-pm-tools-2025" } });

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    const result = await runCreateTick(prisma, {});

    expect(result.skipped).toBe(1);
    expect(forgeRunner.runForge).not.toHaveBeenCalled();
    expect(safePrisma.markOpportunityAddressed).toHaveBeenCalledWith(opp.id, expect.any(String));
    expect(result.decisions[0].action).toBe("duplicate_skipped");
  });

  it("quality gate failure (low word count): increments attempts and does not publish", async () => {
    const opp = makeOpportunity();
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    // Forge returns content below the 1200-word floor
    (forgeRunner.runForge as ReturnType<typeof vi.fn>).mockResolvedValue({
      mdx: "Short content\n\n## FAQ\nQ: A\n\n![hero](/images/x.png)",
      schema_meta: null,
      body_word_count: 400,
      passes: 1,
      floor: 1200,
    });

    const result = await runCreateTick(prisma, {});

    expect(result.failed).toBe(1);
    expect(prisma.geoOpportunity.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: opp.id },
        data: expect.objectContaining({ attempts: { increment: 1 } }),
      })
    );
    expect(safePrisma.publishArticle).not.toHaveBeenCalled();
    expect(result.decisions[0].action).toBe("gate_failed");
  });

  it("max attempts: permanently skips without calling callAgent", async () => {
    const opp = makeOpportunity({ attempts: 3 });
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    const result = await runCreateTick(prisma, {});

    expect(result.skipped).toBe(1);
    expect(lyzr.callAgent).not.toHaveBeenCalled();
    expect(result.decisions[0].action).toBe("permanently_skipped");
  });

  it("dry run: does not call callAgent or publishArticle, decision is would_create", async () => {
    const opp = makeOpportunity();
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    const result = await runCreateTick(prisma, { dryRun: true });

    expect(lyzr.callAgent).not.toHaveBeenCalled();
    expect(safePrisma.publishArticle).not.toHaveBeenCalled();
    expect(result.decisions[0].action).toBe("would_create");
  });

  it("missing currentTop3: fails with error after Blueprint call, runForge not called", async () => {
    const opp = makeOpportunity({ currentTop3: null });
    const prisma = makePrisma();

    (safePrisma.listUnaddressedOpportunities as ReturnType<typeof vi.fn>).mockResolvedValue([opp]);

    const result = await runCreateTick(prisma, {});

    expect(result.failed).toBe(1);
    // Blueprint (callAgent) IS called — the guard fires AFTER blueprint
    expect(lyzr.callAgent).toHaveBeenCalledOnce();
    expect(forgeRunner.runForge).not.toHaveBeenCalled();
    expect(prisma.geoOpportunity.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: opp.id },
        data: expect.objectContaining({ attempts: { increment: 1 } }),
      })
    );
  });
});
