// Sample Lyzr dream run — calls runLyzrDream() directly (no HTTP server needed).
//
// With real Lyzr credentials:
//   pnpm tsx --env-file=.env.local scripts/lyzr/run-dream-sample.ts
//
// With mock mode (no Lyzr network access needed — works locally):
//   LYZR_MOCK=true pnpm tsx scripts/lyzr/run-dream-sample.ts

import { runLyzrDream } from "@/lib/geo/lyzr-dream-worker";

const isMock = process.env.LYZR_MOCK === "true";

if (!isMock) {
  const REQUIRED = ["LYZR_API_KEY", "LYZR_AGENT_CORTEX", "LYZR_AGENT_SCOUT", "LYZR_AGENT_RIVAL", "LYZR_AGENT_PULSE", "LYZR_AGENT_BLUEPRINT"];
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) {
    console.error("Missing env vars:", missing.join(", "));
    console.error("  With credentials: pnpm tsx --env-file=.env.local scripts/lyzr/run-dream-sample.ts");
    console.error("  With mock mode:   LYZR_MOCK=true pnpm tsx scripts/lyzr/run-dream-sample.ts");
    process.exit(1);
  }
}

if (isMock) console.log("Running in MOCK mode — no Lyzr API calls will be made.\n");

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
