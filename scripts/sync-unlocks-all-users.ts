/**
 * Runs syncArchiveUnlocksForUser for every user who has completed at least one lesson.
 * Safe to re-run — the sync function is idempotent (only unlocks if all visible archive
 * lessons are completed and the next batch hasn't been unlocked yet).
 *
 * Usage: npx tsx scripts/sync-unlocks-all-users.ts [--dry-run]
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { syncArchiveUnlocksForUser } from "../src/lib/lesson-access";

for (const p of [".env.local", ".env", ".env.production"].map((f) => resolve(process.cwd(), f))) {
  if (!existsSync(p)) continue;
  const text = readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const prisma = new PrismaClient();
const dryRun = process.argv.includes("--dry-run");

async function main() {
  // Find all users who have completed at least one lesson
  const usersWithCompletions = await prisma.user.findMany({
    where: { completedLessons: { some: {} } },
    select: { id: true, email: true, unlockedBatch: true, _count: { select: { completedLessons: true } } },
    orderBy: { createdAt: "asc" },
  });

  console.log(`[sync-unlocks] ${usersWithCompletions.length} users with completions${dryRun ? " (dry-run)" : ""}\n`);

  let unlocked = 0;
  let alreadyUpToDate = 0;
  let errors = 0;

  for (const user of usersWithCompletions) {
    try {
      if (dryRun) {
        console.log(`  would sync: ${user.email} (${user._count.completedLessons} completions, batch=${user.unlockedBatch})`);
        continue;
      }

      const result = await syncArchiveUnlocksForUser(user.id);
      if (result && result.count > 0) {
        console.log(`  ✅ ${user.email}: unlocked ${result.count} new lessons → ${result.lessons.map(l => l.title).slice(0, 2).join(", ")}${result.count > 2 ? "…" : ""}`);
        unlocked += result.count;
      } else {
        alreadyUpToDate++;
      }
    } catch (err) {
      console.error(`  ❌ ${user.email}: ${err instanceof Error ? err.message : String(err)}`);
      errors++;
    }
  }

  if (!dryRun) {
    console.log(`\nDone. New lessons unlocked: ${unlocked} | Users already up-to-date: ${alreadyUpToDate} | Errors: ${errors}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
