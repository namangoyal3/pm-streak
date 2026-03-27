/**
 * Unlocks all archive lessons for one user or all users.
 *
 * Usage:
 *   npx tsx scripts/unlock-all-for-user.ts                  # admin only
 *   npx tsx scripts/unlock-all-for-user.ts user@example.com # one user
 *   npx tsx scripts/unlock-all-for-user.ts --all            # every user
 *   npx tsx scripts/unlock-all-for-user.ts --all --dry-run  # preview
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

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
const args = process.argv.slice(2);
const allUsers = args.includes("--all");
const dryRun = args.includes("--dry-run");
const emailArg = args.find((a) => !a.startsWith("--"));

async function main() {
  const archiveCount = await prisma.lesson.count({ where: { isLocked: true, aiGenerated: false } });
  const BATCH_SIZE = 5;
  const batchesNeeded = Math.ceil(archiveCount / BATCH_SIZE);

  if (allUsers) {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, unlockedBatch: true },
      orderBy: { createdAt: "asc" },
    });
    console.log(`${dryRun ? "[dry-run] " : ""}Unlocking all ${archiveCount} archive lessons for ${users.length} users (batch → ${batchesNeeded}):\n`);
    for (const user of users) {
      if (!dryRun) {
        await prisma.user.update({ where: { id: user.id }, data: { unlockedBatch: batchesNeeded } });
      }
      console.log(`  ✅ ${user.email} (was batch=${user.unlockedBatch})`);
    }
    console.log(`\n${dryRun ? "Would update" : "Updated"} ${users.length} users.`);
    return;
  }

  const email = emailArg ?? "namangoyal21197@gmail.com";
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, unlockedBatch: true } });
  if (!user) { console.error(`User not found: ${email}`); process.exitCode = 1; return; }
  if (!dryRun) await prisma.user.update({ where: { id: user.id }, data: { unlockedBatch: batchesNeeded } });
  console.log(`✅ ${email}: unlockedBatch ${user.unlockedBatch} → ${batchesNeeded} (unlocks all ${archiveCount} archive lessons)${dryRun ? " [dry-run]" : ""}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
