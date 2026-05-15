import { callAgent, Agents } from "../../src/lib/lyzr";

const agents = ["cortex", "blueprint", "scout", "forge", "rival", "signal", "anchor", "pulse"] as const;

// LEA-27: any live agent that still calls itself pm-streak is a failed migration.
const PMSTREAK = /pm-?streak/i;

(async () => {
  const target = process.argv[2] as typeof agents[number] | undefined;
  const list = target ? [target] : agents;
  let failed = false;
  for (const a of list) {
    const id = (Agents as Record<string, () => string>)[a]();
    try {
      const out = await callAgent(id, `In one sentence, what is your role for learnanything.pro?`, `smoke-${a}`);
      const resp = out.response.slice(0, 200);
      if (PMSTREAK.test(out.response)) {
        failed = true;
        console.error(`[${a}] FAIL: live response still mentions pm-streak -> ${resp}`);
      } else {
        console.log(`[${a}] ${resp}`);
      }
    } catch (e) {
      failed = true;
      console.error(`[${a}] ERROR: ${(e as Error).message.slice(0, 200)}`);
    }
  }
  if (failed) process.exit(1);
})();
