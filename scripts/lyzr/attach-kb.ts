import { attachKBToAll } from "../../src/lib/geo/kb-attach";

const kbId = process.env.LYZR_KB_ID;
if (!kbId) {
  console.error("LYZR_KB_ID not set");
  process.exit(1);
}

(async () => {
  console.log(`Attaching KB ${kbId} to all 9 agents...`);
  const results = await attachKBToAll(kbId);
  for (const [id, status] of Object.entries(results)) {
    console.log(`  ${id}: ${status}`);
  }
  const ok = Object.values(results).filter((v) => v === "ok").length;
  console.log(`\nDone: ${ok}/${Object.keys(results).length} agents bound.`);
})();
