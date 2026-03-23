/**
 * Permanently removes weak/generic AI lessons and dependent rows.
 *
 * Usage:
 *   npx tsx scripts/cleanup-weak-ai-lessons.ts           # dry run
 *   npx tsx scripts/cleanup-weak-ai-lessons.ts --apply   # destructive cleanup
 *   npm run db:cleanup:weak-ai-lessons                   # destructive cleanup
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  applyWeakAiLessonCleanup,
  previewWeakAiLessons,
} from "../src/lib/ai-lesson-cleanup";

function loadDotEnvIfPresent() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

async function main() {
  loadDotEnvIfPresent();
  const apply = process.argv.includes("--apply");

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing. Set it in environment or .env before running cleanup.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const preview = await previewWeakAiLessons(prisma);

    console.log("Weak AI lesson cleanup report");
    console.log("--------------------------------");
    console.log(`AI lessons scanned: ${preview.scannedLessons}`);
    console.log(`Weak lessons found: ${preview.weakLessonsFound}`);
    console.log(`Affected users: ${preview.affectedUsers}`);
    if (preview.sampleTitles.length > 0) {
      console.log("");
      console.log("Sample weak lessons:");
      for (const row of preview.sampleTitles) console.log(`- ${row}`);
    }

    if (!apply) {
      console.log("");
      console.log("Dry run only. Re-run with --apply to delete weak lessons permanently.");
      return;
    }

    if (preview.weakLessonIds.length === 0) {
      console.log("");
      console.log("Nothing to delete.");
      return;
    }

    const result = await applyWeakAiLessonCleanup(prisma, preview.weakLessonIds);

    console.log("");
    console.log("Cleanup applied successfully:");
    console.log(`- Lessons deleted: ${result.deletedLessons}`);
    console.log(`- Questions deleted: ${result.deletedQuestions}`);
    console.log(`- Quiz attempts deleted: ${result.deletedQuizAttempts}`);
    console.log(`- Completed lesson rows deleted: ${result.deletedCompletions}`);
    console.log(`- Daily challenge rows deleted: ${result.deletedDailyChallenges}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
