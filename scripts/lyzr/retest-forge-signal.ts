// Focused retest: Forge length floor + Signal strict-JSON.
// Uses production helpers: forge-runner (auto-expand) and json-repair (tolerant parse).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { callAgent, Agents } from "../../src/lib/lyzr";
import { runForge } from "../../src/lib/geo/forge-runner";
import { tolerantJsonParse } from "../../src/lib/geo/json-repair";

const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const ROOT = join(process.cwd(), "outputs", "agent-tests", `retest-${RUN_ID}`);
mkdirSync(ROOT, { recursive: true });

function save(agent: string, file: string, body: string) {
  const dir = join(ROOT, agent);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, file), body);
}

(async () => {
  let pass = 0;
  let fail = 0;

  // ---- FORGE (with auto-expand retry) ----
  console.log("=== FORGE (pillar floor=1500, retry budget=2 expansions) ===");
  try {
    const result = await runForge(
      {
        cluster: "ai-pm-skills-2026",
        page_type: "pillar",
        title: "AI PM Skills That Will Matter in 2026",
        target_queries: ["ai pm skills 2026", "what skills does an ai product manager need", "ai pm career path"],
        geo_target: 80,
      },
      `retest-forge-${Date.now()}`
    );
    if (result.mdx) save("forge", "page.mdx", result.mdx);
    if (result.schema_meta) save("forge", "schema_meta.json", JSON.stringify(result.schema_meta, null, 2));
    const ok = result.body_word_count >= result.floor && !!result.schema_meta;
    console.log(
      `[FORGE ${ok ? "PASS" : "FAIL"}] body=${result.body_word_count}w floor=${result.floor} passes=${result.passes} schema=${!!result.schema_meta}`
    );
    ok ? pass++ : fail++;
  } catch (e) {
    console.log(`[FORGE FAIL] ${(e as Error).message.slice(0, 200)}`);
    fail++;
  }

  // ---- SIGNAL (strict-then-repair) ----
  console.log("\n=== SIGNAL (strict JSON; tolerant repair fallback) ===");
  {
    const prompt = `For the slug "ai-pm-skills-2026" with citability_score 84, produce a publish_plan.json containing:
- pr_title (string)
- pr_body (markdown string with escaped newlines)
- branch_name
- llms_txt_entry (string)
- sitemap_path
- indexnow_targets (array of urls, must include https://www.bing.com/indexnow and https://yandex.com/indexnow)
- auto_merge (bool)
- utm_params (object: utm_source, utm_medium, utm_campaign)

Follow your STRICT JSON OUTPUT RULES exactly.`;
    const sid = `retest-signal-${Date.now()}`;
    try {
      const out = await callAgent(Agents.signal(), prompt, sid);
      save("signal", "raw_response.txt", out.response);
      const result = tolerantJsonParse<Record<string, unknown>>(out.response);
      const obj = result.parsed ?? null;
      const required = ["pr_title", "pr_body", "branch_name", "llms_txt_entry", "indexnow_targets", "auto_merge", "utm_params"];
      const missing = obj ? required.filter((k) => !(k in obj)) : required;
      const autoMergeOk = obj?.auto_merge === true;
      const ok = !!obj && missing.length === 0 && autoMergeOk;
      if (obj) save("signal", "publish_plan.json", JSON.stringify(obj, null, 2));
      console.log(
        `[SIGNAL ${ok ? "PASS" : "FAIL"}] parsed=${!!obj} repaired=${result.repaired ?? false} missing=[${missing.join(",")}] auto_merge=${obj?.auto_merge}`
      );
      ok ? pass++ : fail++;
    } catch (e) {
      console.log(`[SIGNAL FAIL] ${(e as Error).message.slice(0, 200)}`);
      fail++;
    }
  }

  console.log(`\nResult: ${pass}/${pass + fail} passed`);
  console.log(`Artifacts: ${ROOT}`);
  if (fail > 0) process.exitCode = 1;
})();
