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
  const upgraded = await prisma.lesson.findMany({
    where: {
      isLocked: true,
      aiGenerated: false,
      content: { contains: "Tactical Application" },
    },
    select: {
      id: true,
      title: true,
      guestName: true,
      dayNumber: true,
      category: { select: { name: true, slug: true } },
    },
    orderBy: { dayNumber: "asc" },
  });

  console.log(`\n✅ AI-upgraded archive lessons: ${upgraded.length}\n`);
  for (const l of upgraded) {
    console.log(`  [${l.category?.slug ?? "?"}] ${l.guestName ?? l.title}`);
  }

  const total = await prisma.lesson.count({
    where: { isLocked: true, aiGenerated: false, sourceTranscript: { not: null } },
  });
  console.log(`\nTotal archive lessons: ${total}`);
  console.log(`Still basic (not yet upgraded): ${total - upgraded.length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
