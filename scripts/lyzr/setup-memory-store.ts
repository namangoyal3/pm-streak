// One-shot script: creates the Claude memory store for the GEO swarm Dreams feature.
// Run once, then set ANTHROPIC_GEO_MEMORY_STORE_ID in .env.local and Vercel.
//
// Usage: pnpm tsx scripts/lyzr/setup-memory-store.ts

import { createGeoMemoryStore } from "@/lib/claude-memory";

(async () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY not set. Add it to .env.local first.");
    process.exit(1);
  }
  if (process.env.ANTHROPIC_GEO_MEMORY_STORE_ID) {
    console.log("Memory store already set:", process.env.ANTHROPIC_GEO_MEMORY_STORE_ID);
    console.log("Delete ANTHROPIC_GEO_MEMORY_STORE_ID from .env.local to recreate.");
    process.exit(0);
  }

  console.log("Creating Claude memory store for GEO swarm...");
  const id = await createGeoMemoryStore();
  console.log("\nSuccess! Add this to .env.local and Vercel env vars:");
  console.log(`ANTHROPIC_GEO_MEMORY_STORE_ID="${id}"`);
})();
