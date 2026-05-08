// Sample Lyzr dream run — calls runLyzrDream() directly (no HTTP server needed).
// Usage: pnpm tsx --env-file=.env.local scripts/lyzr/run-dream-sample.ts
//
// Runs dream mode on all 5 Lyzr agents (Cortex, Scout, Rival, Pulse, Blueprint),
// prints each agent's consolidated JSON output, and writes results to
// .lyzr-dream-cache/ and the Claude memory store (if ANTHROPIC_GEO_MEMORY_STORE_ID set).

import { runLyzrDream } from "@/lib/geo/lyzr-dream-worker";

const REQUIRED = [
  "LYZR_API_KEY",
  "LYZR_AGENT_CORTEX",
  "LYZR_AGENT_SCOUT",
  "LYZR_AGENT_RIVAL",
  "LYZR_AGENT_PULSE",
  "LYZR_AGENT_BLUEPRINT",
];

const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing env vars:", missing.join(", "));
  console.error("Run: pnpm tsx --env-file=.env.local scripts/lyzr/run-dream-sample.ts");
  process.exit(1);
}

console.log("Starting Lyzr dream run...\n");
const start = Date.now();

runLyzrDream()
  .then((result) => {
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\nCompleted in ${elapsed}s — ${result.results.length} agents processed\n`);

    for (const r of result.results) {
      const icon = r.status === "ok" ? "✓" : r.status === "error" ? "✗" : "–";
      console.log(`${icon} ${r.agent.padEnd(10)} ${r.summary}`);
      if (r.outputPath) console.log(`  → saved: ${r.outputPath}`);
      if (r.error) console.log(`  error: ${r.error}`);
    }

    if (result.memoryEntriesWritten > 0) {
      console.log(`\n${result.memoryEntriesWritten} entries written to Claude memory store.`);
    } else {
      console.log("\nNote: ANTHROPIC_GEO_MEMORY_STORE_ID not set — memory store write skipped.");
    }
    process.exit(0);
  })
  .catch((e) => {
    console.error("Dream run failed:", e);
    process.exit(1);
  });
