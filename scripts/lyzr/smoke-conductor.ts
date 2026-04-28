import { callConductor } from "../../src/lib/lyzr";

(async () => {
  try {
    const out = await callConductor(
      `In one sentence, what is your role for pm-streak and which workers do you orchestrate?`,
      `smoke-conductor`
    );
    console.log(`[conductor] ${out.response.slice(0, 400)}`);
  } catch (e) {
    console.error(`[conductor] ERROR: ${(e as Error).message.slice(0, 400)}`);
    process.exit(1);
  }
})();
