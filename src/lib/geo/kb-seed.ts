import { callAgent, Agents } from "@/lib/lyzr";
import fs from "node:fs/promises";
import path from "node:path";

const REPO_FILES_TO_SEED = [
  "DESIGN.md",
  "CONVERSION_PLAN.md",
  "CLAUDE.md",
  "prisma/schema.prisma",
  ".graphify_analysis.json",
  ".graphify_labels.json",
];

export async function seedKB(repoRoot: string, sessionId = `seed-${Date.now()}`) {
  const docs: { path: string; content: string }[] = [];
  for (const rel of REPO_FILES_TO_SEED) {
    const full = path.join(repoRoot, rel);
    try {
      docs.push({ path: rel, content: await fs.readFile(full, "utf8") });
    } catch { /* missing files are fine */ }
  }
  // Sample a few seo-articles for brand voice
  const articlesDir = path.join(repoRoot, "seo-articles");
  try {
    const entries = await fs.readdir(articlesDir);
    for (const f of entries.slice(0, 5)) {
      docs.push({ path: `seo-articles/${f}`, content: await fs.readFile(path.join(articlesDir, f), "utf8") });
    }
  } catch {}

  const message = [
    "Refresh the pm-streak business profile in the shared KB. Below is the current repo content.",
    "For each file, extract relevant facts (ICP, lesson taxonomy, brand voice exemplars, podcast guests, pricing/plan facts, North-Star metric).",
    "Output a strict JSON business_profile, then commit each fact as a KB row.",
    "",
    ...docs.map((d) => `=== ${d.path} ===\n${d.content.slice(0, 8000)}`),
  ].join("\n\n");

  return callAgent(Agents.cortex(), message, sessionId, { timeoutMs: 180_000 });
}
