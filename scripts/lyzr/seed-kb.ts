import { seedKB } from "../../src/lib/geo/kb-seed";
import path from "node:path";

const repoRoot = path.resolve(__dirname, "../..");

(async () => {
  console.log("Seeding KB via Cortex...");
  const result = await seedKB(repoRoot);
  console.log("Cortex response:", result.response.slice(0, 500));
})();
