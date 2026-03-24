/**
 * Bumps unlockedBatch to a high value for a user so all archive lessons become accessible.
 * Usage: npx tsx scripts/unlock-all-for-user.ts [email]
 * Default: admin account (namangoyal21197@gmail.com)
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

async function main() {
  const email = process.argv[2] ?? "namangoyal21197@gmail.com";

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, unlockedBatch: true } });
  if (!user) {
    console.error(`User not found: ${email}`);
    process.exitCode = 1;
    return;
  }

  const archiveCount = await prisma.lesson.count({ where: { isLocked: true, aiGenerated: false } });
  // Each batch = 5 lessons, so batches needed = ceil(archiveCount / 5)
  const BATCH_SIZE = 5;
  const batchesNeeded = Math.ceil(archiveCount / BATCH_SIZE);

  await prisma.user.update({ where: { id: user.id }, data: { unlockedBatch: batchesNeeded } });

  console.log(`✅ ${email}: unlockedBatch ${user.unlockedBatch} → ${batchesNeeded} (unlocks all ${archiveCount} archive lessons)`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
