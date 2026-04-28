import { callAgent, Agents } from "../../src/lib/lyzr";

const agents = ["cortex", "blueprint", "scout", "forge", "rival", "signal", "anchor", "pulse"] as const;

(async () => {
  const target = process.argv[2] as typeof agents[number] | undefined;
  const list = target ? [target] : agents;
  for (const a of list) {
    const id = (Agents as Record<string, () => string>)[a]();
    try {
      const out = await callAgent(id, `In one sentence, what is your role for pm-streak?`, `smoke-${a}`);
      console.log(`[${a}] ${out.response.slice(0, 200)}`);
    } catch (e) {
      console.error(`[${a}] ERROR: ${(e as Error).message.slice(0, 200)}`);
    }
  }
})();
