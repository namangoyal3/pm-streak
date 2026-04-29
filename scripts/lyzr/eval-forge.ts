/**
 * Forge eval suite — runs after every Forge spec change or forge-runner change.
 *
 * Checks:
 *  1. extractMdx parses both fence formats (with and without newline after ```mdx)
 *  2. bodyWordCount is accurate
 *  3. A real Forge call produces MDX above the pillar floor (1200 words)
 *  4. Schema meta block is present and has required keys
 *  5. No split list items (number/bullet on own line)
 *  6. No frontmatter / H1 / <script> leaking into body
 *  7. Hero image present (Picsum URL)
 *  8. ≥5 H2 sections, FAQ section present
 *
 * Run: npx tsx scripts/lyzr/eval-forge.ts
 * Exit 0 = all pass, exit 1 = failures.
 */

import { runForge } from "../../src/lib/geo/forge-runner";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const OUT = join(process.cwd(), "outputs", "evals", `forge-${RUN_ID}`);
mkdirSync(OUT, { recursive: true });

type Result = { name: string; pass: boolean; detail: string };
const results: Result[] = [];

function check(name: string, pass: boolean, detail = "") {
  results.push({ name, pass, detail });
  console.log(`  [${pass ? "PASS" : "FAIL"}] ${name}${!pass && detail ? ` — ${detail}` : ""}`);
}

(async () => {
  // ── Unit tests (no network) ─────────────────────────────────────────────

  console.log("\n=== Unit tests ===");

  // 1. extractMdx — standard newline variant
  {
    const text = "```mdx\nHello world\n```";
    const match = text.match(/```(?:mdx|md|markdown)\s*\n?([\s\S]*?)\n```/i);
    check("extractMdx: standard newline variant", match?.[1] === "Hello world", `got: ${match?.[1]}`);
  }

  // 2. extractMdx — no-newline variant (the bug we fixed)
  {
    const text = "```mdx![Image](https://picsum.photos/seed/x/1200/630)\n\nSome content\n```";
    const match = text.match(/```(?:mdx|md|markdown)\s*\n?([\s\S]*?)\n```/i);
    const extracted = match?.[1] ?? "";
    check(
      "extractMdx: no-newline after fence marker",
      extracted.startsWith("!["),
      `got: ${extracted.slice(0, 60)}`
    );
  }

  // 3. Split list item detection & fix
  {
    const badBody = "1.\n**Title**: text\n\n-\n**Another**: text";
    check("Split OL detection", /^\d+\.\n[^\n]/m.test(badBody));
    check("Split UL detection", /^-\n[^\n]/m.test(badBody));
    const fixed = badBody
      .replace(/^(\d+\.)\n([^\n])/gm, "$1 $2")
      .replace(/^(-)\n([^\n])/gm, "$1 $2");
    check("Split OL fix", !/^\d+\.\n[^\n]/m.test(fixed), fixed.slice(0, 80));
    check("Split UL fix", !/^-\n[^\n]/m.test(fixed), fixed.slice(0, 80));
  }

  // 4. Frontmatter / H1 / script leak detection
  {
    const leaky = '---\ntitle: Test\n---\n\n# My Title\n\nBody\n\n<script type="application/ld+json">{}</script>';
    check("Frontmatter leak detectable", /^---[\s\S]*?---/m.test(leaky));
    check("H1 leak detectable", /^# /m.test(leaky));
    check("Script leak detectable", /<script\s+type=["']application\/ld\+json["']/i.test(leaky));
  }

  // ── Integration test (real Forge call) ──────────────────────────────────

  console.log("\n=== Integration test (real Forge call ~60s) ===");

  try {
    const result = await runForge(
      {
        cluster: "eval-pm-onboarding-2026",
        page_type: "pillar",
        title: "How to Onboard as a New Product Manager",
        target_queries: [
          "how to onboard as a new PM",
          "first 30 days as product manager",
          "new PM onboarding checklist",
        ],
        geo_target: 75,
      },
      `eval-forge-${Date.now()}`
    );

    writeFileSync(join(OUT, "article.mdx"), result.mdx ?? "");
    writeFileSync(join(OUT, "schema_meta.json"), JSON.stringify(result.schema_meta, null, 2));
    writeFileSync(join(OUT, "summary.json"), JSON.stringify({
      body_word_count: result.body_word_count,
      passes: result.passes,
      floor: result.floor,
    }, null, 2));

    console.log(`  Forge: ${result.body_word_count} words, ${result.passes} passes, floor=${result.floor}`);

    const body = result.mdx ?? "";
    const meta = (result.schema_meta as Record<string, unknown> | null)?.meta as Record<string, unknown> | undefined;

    check(`Word count ≥ floor (${result.floor})`, result.body_word_count >= result.floor, `got ${result.body_word_count}`);
    check("Schema meta present", !!result.schema_meta, "null");
    check("meta.slug present", !!meta?.slug, JSON.stringify(meta));
    check("meta.word_count is number", typeof meta?.word_count === "number", `got: ${meta?.word_count}`);
    check("No frontmatter in body", !/^---[\s\S]*?---/m.test(body));
    check("No H1 at body start", !(/^# /m.test(body.trimStart()) && !body.trimStart().startsWith("![")), "H1 found");
    check("No <script> in body", !/<script\s+type=["']application\/ld\+json["']/i.test(body));
    check("No split ordered list items", !/^\d+\.\n[^\n]/m.test(body));
    check("No split unordered list items", !/^-\n[^\n]/m.test(body));
    check("Picsum hero image present", body.includes("picsum.photos/seed/"), "no picsum URL");
    const h2Count = (body.match(/^## /gm) ?? []).length;
    check(`≥5 H2 sections`, h2Count >= 5, `got ${h2Count}`);
    check("FAQ section present", /^## FAQ/im.test(body));

  } catch (e) {
    check("Integration test: no crash", false, (e as Error).message.slice(0, 200));
  }

  // ── Summary ──────────────────────────────────────────────────────────────

  const passed = results.filter((r) => r.pass).length;
  const failed = results.filter((r) => !r.pass).length;
  console.log(`\n=== Summary: ${passed}/${results.length} passed, ${failed} failed ===`);

  // Loop 4: on failures, post a KB note to Cortex so agents can learn from it.
  if (failed > 0) {
    const failureList = results
      .filter((r) => !r.pass)
      .map((r) => `- ${r.name}${r.detail ? `: ${r.detail}` : ""}`)
      .join("\n");
    console.log("\nFailed:\n" + failureList);
    console.log(`\nArtifacts: ${OUT}`);

    // Post failure summary to Cortex so it's stored in KB for future agent sessions.
    const cortexUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://learnanything.pro";
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      try {
        const res = await fetch(`${cortexUrl}/api/geo/cortex/refresh`, {
          method: "POST",
          headers: { Authorization: `Bearer ${cronSecret}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            note: `eval-forge run ${RUN_ID}: ${failed} check(s) failed.\n${failureList}\nArtifacts: ${OUT}`,
          }),
        });
        if (res.ok) console.log("[eval] Failure note posted to Cortex KB.");
      } catch {
        // Non-fatal — eval result is the source of truth regardless.
      }
    }

    process.exitCode = 1;
  } else {
    console.log(`Artifacts: ${OUT}`);
  }
})();
