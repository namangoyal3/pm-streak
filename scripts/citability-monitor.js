#!/usr/bin/env node
/**
 * PM Streak Citability Score Monitor
 *
 * Tracks research papers published and estimates the citability score
 * for learnanything.pro. Run after each publishing session.
 *
 * Usage: node scripts/citability-monitor.js
 */

const fs = require("fs");
const path = require("path");

// ── Scoring model ────────────────────────────────────────────────────────────
// Base score from initial audit
const BASE_SCORE = 35.2;

// Points per research paper (ScholarlyArticle + Dataset schema, DOI, CC BY 4.0)
const POINTS_PER_PAPER = 8;

// Technical SEO bonuses (one-time)
const TECHNICAL_BONUSES = {
  robots_txt: { label: "robots.txt with AI crawler permissions", points: 3, file: "../public/robots.txt" },
  sitemap_xml: { label: "sitemap.xml with /research/* entries", points: 3, file: "../public/sitemap.xml" },
  llms_txt: { label: "llms.txt for AI crawlers", points: 4, file: "../public/llms.txt" },
  research_index: { label: "Research index page (/research)", points: 4, file: "../src/app/research/page.tsx" },
  jsonld_helpers: { label: "ScholarlyArticle + Dataset JSON-LD helpers", points: 3, file: "../src/components/JsonLd.tsx" },
};

// Research papers configuration
const RESEARCH_PAPERS = [
  {
    slug: "ai-pm-2026",
    title: "AI in Product Management 2026",
    file: "../src/app/research/ai-pm-2026/page.tsx",
    doi: "10.1234/pmstreak.ai-pm-2026",
    keyStats: ["312% AI adoption growth", "47% planning time reduction", "n=2,047"],
  },
  {
    slug: "pm-frameworks-2026",
    title: "PM Frameworks Analysis 2026",
    file: "../src/app/research/pm-frameworks-2026/page.tsx",
    doi: "10.1234/pmstreak.pm-frameworks-2026",
    keyStats: ["RICE 8.7/10", "OKR 8.2/10", "3,247 implementations"],
  },
  {
    slug: "pm-career-2026",
    title: "PM Career Development 2026",
    file: "../src/app/research/pm-career-2026/page.tsx",
    doi: "10.1234/pmstreak.pm-career-2026",
    keyStats: ["$167k median salary", "2.4 yrs to Senior PM", "n=5,312"],
  },
];

// Future topics (Phase 4)
const UPCOMING_TOPICS = [
  "Remote Product Management Effectiveness",
  "PM Tool Adoption & ROI Analysis",
  "Cross-functional Collaboration in PM",
  "PM Decision-Making Under Uncertainty",
  "Product-Led Growth Metrics",
  "B2B vs B2C PM Differences",
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function fileExists(relPath) {
  const abs = path.resolve(__dirname, relPath);
  return fs.existsSync(abs);
}

function checkFileHasContent(relPath, searchString) {
  const abs = path.resolve(__dirname, relPath);
  if (!fs.existsSync(abs)) return false;
  const content = fs.readFileSync(abs, "utf8");
  return content.includes(searchString);
}

// ── Main audit ───────────────────────────────────────────────────────────────

function audit() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  PM Streak Citability Monitor");
  console.log("  learnanything.pro");
  console.log(`  ${new Date().toISOString()}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  let score = BASE_SCORE;
  const results = [];

  // ── Technical SEO bonuses
  console.log("TECHNICAL SEO FOUNDATION");
  console.log("─────────────────────────");
  for (const [key, bonus] of Object.entries(TECHNICAL_BONUSES)) {
    const present = fileExists(bonus.file);
    const pts = present ? bonus.points : 0;
    score += pts;
    const icon = present ? "✅" : "❌";
    console.log(`${icon} ${bonus.label}${present ? ` (+${pts} pts)` : " (missing)"}`);
    results.push({ type: "technical", key, present, points: pts });
  }

  // ── Research papers
  const papersFound = [];
  console.log("\nRESEARCH PAPERS");
  console.log("─────────────────");
  for (const paper of RESEARCH_PAPERS) {
    const present = fileExists(paper.file);
    const hasDoi = present && checkFileHasContent(paper.file, paper.doi);
    // Pages use researchPaperSchema() helper (which emits ScholarlyArticle) — check for the helper import
    const hasSchema = present && (
      checkFileHasContent(paper.file, "ScholarlyArticle") ||
      checkFileHasContent(paper.file, "researchPaperSchema")
    );
    const hasDataset = present && (
      checkFileHasContent(paper.file, "Dataset") ||
      checkFileHasContent(paper.file, "datasetSchema")
    );
    const complete = present && hasDoi && hasSchema && hasDataset;
    const pts = complete ? POINTS_PER_PAPER : present ? Math.round(POINTS_PER_PAPER * 0.4) : 0;
    score += pts;

    const icon = complete ? "✅" : present ? "⚠️ " : "❌";
    console.log(`${icon} ${paper.title}${complete ? ` (+${pts} pts)` : present ? " (incomplete schema)" : " (missing)"}`);
    if (present) {
      const checks = [
        hasDoi ? "DOI ✓" : "DOI ✗",
        hasSchema ? "ScholarlyArticle ✓" : "ScholarlyArticle ✗",
        hasDataset ? "Dataset ✓" : "Dataset ✗",
      ];
      console.log(`   ${checks.join(" · ")}`);
      console.log(`   Stats: ${paper.keyStats.join(", ")}`);
    }
    if (complete) papersFound.push(paper);
    results.push({ type: "paper", slug: paper.slug, present, complete, points: pts });
  }

  // ── Score summary
  const capped = Math.min(score, 100);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("CITABILITY SCORE ESTIMATE");
  console.log("─────────────────────────");
  console.log(`  Base score:          ${BASE_SCORE.toFixed(1)} / 100`);
  console.log(`  Technical SEO:      +${results.filter(r => r.type === "technical").reduce((a, r) => a + r.points, 0).toFixed(1)}`);
  console.log(`  Research papers:    +${results.filter(r => r.type === "paper").reduce((a, r) => a + r.points, 0).toFixed(1)}`);
  console.log(`  ─────────────────────────`);
  console.log(`  TOTAL:               ${capped.toFixed(1)} / 100`);

  const grade =
    capped >= 90 ? "A (Excellent)" :
    capped >= 75 ? "B (Good)" :
    capped >= 60 ? "C (Fair)" :
    capped >= 45 ? "D (Needs Work)" : "F (Critical)";
  console.log(`  Grade:               ${grade}`);

  // ── Upcoming topics
  console.log("\nNEXT STEPS TO REACH 100/100");
  console.log("────────────────────────────");
  const papersNeeded = Math.ceil((100 - capped) / POINTS_PER_PAPER);
  if (papersNeeded > 0) {
    console.log(`  Create ${papersNeeded} more research paper(s) to close the gap:`);
    UPCOMING_TOPICS.slice(0, Math.min(papersNeeded + 1, UPCOMING_TOPICS.length)).forEach((topic, i) => {
      console.log(`  ${i + 1}. ${topic}`);
    });
  } else {
    console.log("  Score is at or above 100. Maintain freshness by updating papers annually.");
  }

  // ── Log entry
  const logEntry = {
    date: new Date().toISOString(),
    score: capped,
    papersCount: papersFound.length,
    technicalSeoComplete: results.filter(r => r.type === "technical" && r.present).length,
    breakdown: results,
  };

  const logPath = path.resolve(__dirname, "citability-log.json");
  let log = [];
  if (fs.existsSync(logPath)) {
    try { log = JSON.parse(fs.readFileSync(logPath, "utf8")); } catch {}
  }
  log.push(logEntry);
  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  console.log(`\n  Log saved to: scripts/citability-log.json`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  return capped;
}

audit();
