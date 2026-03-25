/**
 * upgrade-archive-content.ts
 *
 * Re-processes existing archive lessons with Groq AI to produce high-quality
 * content + rigorous quiz questions (same path as Explore lessons).
 *
 * Usage:
 *   npx tsx scripts/upgrade-archive-content.ts [--dry-run] [--limit N] [--concurrency N]
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { generateActionablePMLesson } from "../src/lib/llm-lessons";
import { isGenericLessonContent, isWeakQuestionSet } from "../src/lib/lesson-quality";
import type { SearchResult } from "../src/lib/llm-lessons";

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

const prisma = new PrismaClient();

const DEFAULT_CONCURRENCY = 3;

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitIdx = args.indexOf("--limit");
  const concIdx = args.indexOf("--concurrency");
  const limit = limitIdx >= 0 ? Number.parseInt(args[limitIdx + 1] ?? "", 10) : null;
  const concurrency = concIdx >= 0 ? Number.parseInt(args[concIdx + 1] ?? "", 10) : DEFAULT_CONCURRENCY;
  return {
    dryRun,
    limit: Number.isFinite(limit) ? (limit as number) : null,
    concurrency: Number.isFinite(concurrency) && concurrency > 0 ? concurrency : DEFAULT_CONCURRENCY,
  };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Parse the stored sourceTranscript back into SearchResult[] format.
 *
 * Handles the backfill format:
 *   Episode: <title>
 *   Guest: <name>
 *
 *   1. <highlight>
 *   2. <highlight>
 *   3. <highlight>
 *
 * And also the explore/AI format:
 *   [Guest - Episode Title]
 *   snippet
 */
function parseSourceTranscript(raw: string): SearchResult[] {
  if (!raw) return [];

  // --- Backfill format detection ---
  if (raw.startsWith("Episode:") || raw.startsWith("Guest:")) {
    const lines = raw.split("\n");
    let guest = "";
    let episodeTitle: string | null = null;
    const highlights: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("Episode:")) {
        episodeTitle = trimmed.replace(/^Episode:\s*/i, "").trim() || null;
      } else if (trimmed.startsWith("Guest:")) {
        guest = trimmed.replace(/^Guest:\s*/i, "").trim();
      } else if (/^\d+\.\s/.test(trimmed) && trimmed.length > 40) {
        highlights.push(trimmed.replace(/^\d+\.\s*/, "").trim());
      }
    }

    if (!guest || highlights.length === 0) return [];

    // Return one SearchResult per highlight paragraph (like Lenny MCP search results)
    return highlights.slice(0, 4).map((snippet) => ({
      guest,
      episodeTitle,
      snippet,
    }));
  }

  // --- Explore/AI format: [Guest - Episode Title]\nsnippet ---
  const blocks = raw.split(/\n\n+/).filter(Boolean);
  const results: SearchResult[] = [];

  for (const block of blocks) {
    const lines = block.split("\n");
    const header = lines[0] ?? "";
    const snippet = lines.slice(1).join(" ").replace(/\s+/g, " ").trim();

    if (!snippet || snippet.length < 60) continue;

    const headerMatch = header.match(/^\[(.+?)(?:\s*-\s*(.+?))?\]$/);
    if (!headerMatch) continue;

    results.push({
      guest: (headerMatch[1] ?? "").trim(),
      episodeTitle: headerMatch[2]?.trim() ?? null,
      snippet,
    });
  }

  return results;
}

async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<void>
) {
  let idx = 0;
  async function runWorker() {
    while (true) {
      const i = idx++;
      if (i >= items.length) return;
      await worker(items[i]!, i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, runWorker));
}

async function main() {
  const { dryRun, limit, concurrency } = parseArgs();

  console.log(`[upgrade-content] starting${dryRun ? " (dry run)" : ""} concurrency=${concurrency}`);

  // Fetch only archive lessons that still have basic/generic content (not yet AI-upgraded).
  // AI-upgraded lessons always contain "Tactical Application" in their content.
  const allLessons = await prisma.lesson.findMany({
    where: {
      aiGenerated: false,
      isLocked: true,
      sourceTranscript: { not: null },
    },
    select: {
      id: true,
      title: true,
      guestName: true,
      episodeTitle: true,
      sourceTranscript: true,
      content: true,
    },
    orderBy: { dayNumber: "asc" },
  });

  // Skip lessons that already passed the upgrade (have "Tactical Application" in content)
  const lessons = allLessons
    .filter((l) => isGenericLessonContent(l.content))
    .slice(0, limit ?? allLessons.length);

  console.log(`[upgrade-content] ${lessons.length} archive lessons to process`);

  if (dryRun) {
    console.log("[upgrade-content] dry run — first 5 lessons:");
    for (const l of lessons.slice(0, 5)) {
      console.log(`  ${l.guestName ?? l.title}`);
    }
    return;
  }

  let upgraded = 0;
  let skipped = 0;
  let failed = 0;

  await runWithConcurrency(lessons, concurrency, async (lesson, idx) => {
    const label = `${lesson.guestName ?? lesson.title} (${idx + 1}/${lessons.length})`;
    try {
      const searchResults = parseSourceTranscript(lesson.sourceTranscript ?? "");
      if (searchResults.length < 1) {
        console.log(`[upgrade-content] skip ${label} — could not parse transcript`);
        skipped++;
        return;
      }

      // Derive topic from episode title or guest name
      const topic =
        lesson.episodeTitle
          ?.replace(/\s*\|.*$/, "")
          .replace(/^Episode:\s*/i, "")
          .trim() ?? lesson.guestName ?? lesson.title;

      const result = await generateActionablePMLesson(topic, searchResults);

      if (isGenericLessonContent(result.content) || isWeakQuestionSet(result.questions)) {
        console.log(`[upgrade-content] skip ${label} — quality check failed`);
        skipped++;
        return;
      }

      // Write to DB: update lesson content + update questions in-place (preserves quiz attempt history)
      await prisma.$transaction(async (tx) => {
        await tx.lesson.update({
          where: { id: lesson.id },
          data: { content: result.content },
        });

        // Fetch existing question IDs ordered by sortOrder
        const existingQuestions = await tx.question.findMany({
          where: { lessonId: lesson.id },
          orderBy: { sortOrder: "asc" },
          select: { id: true },
        });

        // Update existing rows, create new ones, leave extras (don't delete — FK from QuizAttempt)
        for (let i = 0; i < result.questions.length; i++) {
          const q = result.questions[i]!;
          const existing = existingQuestions[i];
          if (existing) {
            await tx.question.update({
              where: { id: existing.id },
              data: {
                questionText: q.questionText,
                options: JSON.stringify(q.options),
                correctIndex: q.correctIndex,
                explanation: q.explanation,
                sortOrder: i,
              },
            });
          } else {
            await tx.question.create({
              data: {
                lessonId: lesson.id,
                questionText: q.questionText,
                options: JSON.stringify(q.options),
                correctIndex: q.correctIndex,
                explanation: q.explanation,
                xpReward: 5,
                sortOrder: i,
              },
            });
          }
        }
      });

      upgraded++;
      console.log(`[upgrade-content] upgraded ${label}`);
    } catch (err) {
      failed++;
      console.error(`[upgrade-content] failed ${label}: ${err instanceof Error ? err.message : String(err)}`);
      // Small backoff to avoid hammering Groq on rate-limit errors
      await sleep(1500);
    }
  });

  console.log(`[upgrade-content] done. upgraded=${upgraded} skipped=${skipped} failed=${failed}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
