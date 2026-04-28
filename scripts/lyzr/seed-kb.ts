import { verifyKB } from "../../src/lib/geo/kb-seed";

(async () => {
  console.log("Verifying KB via Cortex...");
  const result = await verifyKB();
  console.log("KB healthy:", result.kbHealthy);
  console.log("Cortex response:", result.response.slice(0, 500));
})();
