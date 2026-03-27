/**
 * recategorize-archive.ts
 *
 * Migrates all lessons in the "podcast-archive" category into the correct
 * topic categories (product-strategy, growth-metrics, user-psychology,
 * leadership-execution, pricing-monetization) using keyword matching + Groq.
 *
 * Usage:
 *   npx tsx scripts/recategorize-archive.ts [--dry-run] [--limit N]
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import Groq from "groq-sdk";
import { classifyEpisodeTopic } from "../src/lib/archive-category-map";

// Load .env files in priority order (first match wins per key)
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
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "***REMOVED***";
const prisma = new PrismaClient();
const groq = new Groq({ apiKey: GROQ_API_KEY });

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? Number.parseInt(args[limitIdx + 1] ?? "", 10) : null;
  return { dryRun, limit: Number.isFinite(limit) ? (limit as number) : null };
}

async function main() {
  const { dryRun, limit } = parseArgs();

  console.log(`[recategorize] starting${dryRun ? " (dry run)" : ""}`);

  // Find the podcast-archive category
  const archiveCat = await prisma.category.findUnique({
    where: { slug: "podcast-archive" },
  });

  if (!archiveCat) {
    console.log("[recategorize] no podcast-archive category found — nothing to do");
    return;
  }

  // Load all topic categories into a slug→id map
  const topicCats = await prisma.category.findMany({
    where: {
      slug: {
        in: [
          "product-strategy",
          "growth-metrics",
          "user-psychology",
          "leadership-execution",
          "pricing-monetization",
        ],
      },
    },
    select: { id: true, slug: true, name: true },
  });

  const slugToId = new Map(topicCats.map((c) => [c.slug, c.id]));

  if (slugToId.size === 0) {
    console.error("[recategorize] no topic categories found in DB — run seed first");
    process.exitCode = 1;
    return;
  }

  console.log(`[recategorize] found topic categories: ${[...slugToId.keys()].join(", ")}`);

  // Fetch archive lessons
  const lessons = await prisma.lesson.findMany({
    where: { categoryId: archiveCat.id },
    select: { id: true, title: true, guestName: true, episodeTitle: true },
    orderBy: { dayNumber: "asc" },
    ...(limit ? { take: limit } : {}),
  });

  console.log(`[recategorize] ${lessons.length} archive lessons to reclassify`);

  const tally: Record<string, number> = {};
  let moved = 0;
  let failed = 0;

  for (const lesson of lessons) {
    const title = lesson.episodeTitle ?? lesson.title;
    const guest = lesson.guestName ?? "";

    try {
      // Small delay to stay comfortably under Groq's 30 RPM free-tier limit
      await sleep(2100);
      const slug = await classifyEpisodeTopic(groq, title, guest);
      const categoryId = slugToId.get(slug);

      tally[slug] = (tally[slug] ?? 0) + 1;

      if (!categoryId) {
        console.warn(`[recategorize] unknown slug "${slug}" for ${guest || title}`);
        failed++;
        continue;
      }

      if (dryRun) {
        console.log(`[recategorize] (dry) ${guest || title} → ${slug}`);
      } else {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { categoryId },
        });
        moved++;
        console.log(`[recategorize] moved ${guest || title} → ${slug}`);
      }
    } catch (err) {
      failed++;
      console.error(
        `[recategorize] failed ${guest || title}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  console.log("\n[recategorize] category distribution:");
  for (const [slug, count] of Object.entries(tally).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${slug}: ${count}`);
  }
  console.log(`[recategorize] done. moved=${moved} failed=${failed}`);

  if (!dryRun) {
    // If the podcast-archive category is now empty, remove it
    const remaining = await prisma.lesson.count({ where: { categoryId: archiveCat.id } });
    if (remaining === 0) {
      await prisma.category.delete({ where: { id: archiveCat.id } });
      console.log("[recategorize] deleted empty podcast-archive category");
    } else {
      console.log(`[recategorize] ${remaining} lessons still in podcast-archive (not moved)`);
    }
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
