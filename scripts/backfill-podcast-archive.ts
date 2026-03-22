import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import {
  buildArchiveInsightQuestions,
  extractSentences,
  truncateOption,
} from "../src/lib/podcast-quiz-helpers";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    let v = t.slice(eq + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const prisma = new PrismaClient();

const LENNY_MCP_URL = "https://lenny-mcp.onrender.com/mcp";
const MCP_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/event-stream",
} as const;

const ARCHIVE_CATEGORY_SLUG = "podcast-archive";
const DEFAULT_CONCURRENCY = 6;

type EpisodeRecord = {
  guest: string;
  title: string;
  topic: string;
  description: string;
  content: string;
  sourceTranscript: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
};

function parseArgs() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitIndex = args.indexOf("--limit");
  const concurrencyIndex = args.indexOf("--concurrency");

  const limit =
    limitIndex >= 0 ? Number.parseInt(args[limitIndex + 1] ?? "", 10) : null;
  const concurrency =
    concurrencyIndex >= 0
      ? Number.parseInt(args[concurrencyIndex + 1] ?? "", 10)
      : DEFAULT_CONCURRENCY;

  return {
    dryRun,
    limit: Number.isFinite(limit) ? limit : null,
    concurrency:
      Number.isFinite(concurrency) && concurrency > 0
        ? concurrency
        : DEFAULT_CONCURRENCY,
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseSseJsonPayload<T>(payload: string): T | null {
  const dataLines = payload
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6));

  const lastLine = dataLines.at(-1);
  if (!lastLine) return null;

  try {
    return JSON.parse(lastLine) as T;
  } catch {
    return null;
  }
}

async function initializeMcpSession() {
  const response = await fetch(LENNY_MCP_URL, {
    method: "POST",
    headers: MCP_HEADERS,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "pm-streak-archive-import",
          version: "1.0.0",
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`MCP initialize failed with status ${response.status}`);
  }

  const sessionId = response.headers.get("mcp-session-id");
  if (!sessionId) {
    throw new Error("MCP session id missing");
  }

  return sessionId;
}

async function callMcpTool(
  sessionId: string,
  name: string,
  args: Record<string, unknown>
) {
  const response = await fetch(LENNY_MCP_URL, {
    method: "POST",
    headers: {
      ...MCP_HEADERS,
      "mcp-session-id": sessionId,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: {
        name,
        arguments: args,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`MCP tool ${name} failed with status ${response.status}`);
  }

  const text = await response.text();
  const payload = parseSseJsonPayload<{
    result?: { content?: Array<{ type: string; text?: string }> };
  }>(text);

  return payload?.result?.content ?? [];
}

async function callToolText(
  sessionId: string,
  name: string,
  args: Record<string, unknown>,
  retries = 3
) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const content = await callMcpTool(sessionId, name, args);
      return content
        .filter((item) => item.type === "text" && item.text)
        .map((item) => item.text ?? "")
        .join("\n\n");
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }

      await sleep(attempt * 750);
    }
  }

  return "";
}

function parseEpisodeGuests(rawText: string) {
  return rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !/^Available Episodes/i.test(line))
    .filter(
      (line) =>
        !/^(Failure|Interview Q Compilation|Teaser_2021|Various \(Year-End Review\))$/i.test(
          line
        )
    );
}

function parseEpisodeTitle(rawText: string, guest: string) {
  const headers = Array.from(
    rawText.matchAll(/^# (.+)$/gm),
    (match) => match[1].trim()
  );

  return headers.find((header) => !header.startsWith("Episode:")) ?? guest;
}

function cleanTranscriptParagraph(paragraph: string) {
  return paragraph
    .replace(/^[A-Za-z0-9 .&+'’/+-]+ \(\d{2}:\d{2}:\d{2}\):\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function getFallbackParagraphs(transcript: string) {
  const cleaned = transcript.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const chunkSize = 360;
  const chunks: string[] = [];

  for (let i = 0; i < cleaned.length && chunks.length < 3; i += chunkSize) {
    chunks.push(truncate(cleaned.slice(i, i + chunkSize), chunkSize));
  }

  return chunks.filter(Boolean);
}

function extractHighlightParagraphs(transcript: string) {
  const paragraphs = transcript
    .split(/\n{2,}/)
    .map(cleanTranscriptParagraph)
    .filter((paragraph) => paragraph.length >= 140)
    .filter(
      (paragraph) =>
        !/this episode is brought to you by|special limited time offer|visit .* to learn more|sign up and get/i.test(
          paragraph
        )
    );

  if (paragraphs.length === 0) {
    return getFallbackParagraphs(transcript);
  }

  const indexes = Array.from(
    new Set([0, Math.floor(paragraphs.length / 2), paragraphs.length - 1])
  );

  return indexes
    .map((index) => truncate(paragraphs[index], 420))
    .filter(Boolean);
}

function getFirstSentence(text: string) {
  const sentence = text.match(/.*?[.!?](?:\s|$)/)?.[0]?.trim();
  return sentence && sentence.length >= 40 ? sentence : text;
}

function deriveTopic(title: string) {
  const beforePipe = title.split("|")[0]?.trim() ?? title;
  return beforePipe.replace(/^Episode:\s*/i, "").trim();
}

function buildEpisodeRecord(
  guest: string,
  rawText: string
): EpisodeRecord | null {
  const title = parseEpisodeTitle(rawText, guest);
  const transcript = rawText.includes("## Transcript")
    ? rawText.split("## Transcript")[1]?.trim() ?? ""
    : rawText.trim();

  if (!title || !transcript) {
    return null;
  }

  const topic = deriveTopic(title);
  const highlights = extractHighlightParagraphs(transcript);

  if (highlights.length === 0) {
    return null;
  }

  const summary = getFirstSentence(highlights[0]);
  const description = truncate(topic, 110);
  const pmTakeaways = highlights
    .slice(0, 3)
    .map((h, idx) => {
      const line = extractSentences(h, 48, 1)[0] ?? truncate(h, 130);
      return `${idx + 1}. ${truncateOption(line, 160)}`;
    })
    .join("\n");
  const sourceTranscript = [
    `Episode: ${title}`,
    `Guest: ${guest}`,
    "",
    ...highlights.map((highlight, index) => `${index + 1}. ${highlight}`),
  ].join("\n");
  const content = [
    "This lesson is built from a full Lenny's Podcast episode. Focus on the ideas below — quizzes reward recalling the guest's insights and frameworks, not trivia.",
    "",
    "EPISODE",
    title,
    `Guest: ${guest}`,
    "",
    "FOUNDATIONAL IDEA",
    summary,
    "",
    "KEY PM TAKEAWAYS (from transcripts)",
    pmTakeaways,
    "",
    "TRANSCRIPT HIGHLIGHTS",
    ...highlights.flatMap((highlight, index) => [
      `${index + 1}. ${highlight}`,
      "",
    ]),
    "HOW TO APPLY THIS THIS WEEK",
    `1. Name the product, team, or leadership decision this episode most directly influences.`,
    "2. Pull one quote or idea from the lesson into your next roadmap, review, or strategy discussion.",
    "3. Turn the strongest insight into a real experiment, critique, or team question before the week ends.",
  ]
    .join("\n")
    .trim();

  return {
    guest,
    title,
    topic,
    description: `Archive episode: ${description}`,
    content,
    sourceTranscript,
    questions: buildArchiveInsightQuestions({
      guest,
      title,
      topic,
      highlights,
      summary,
    }),
  };
}

async function ensureArchiveCategory() {
  return prisma.category.upsert({
    where: { slug: ARCHIVE_CATEGORY_SLUG },
    update: {
      name: "Podcast Archive",
      description:
        "Unlock the full Lenny's Podcast archive episode by episode.",
      icon: "🎙️",
      color: "#0ea5e9",
      sortOrder: 7,
    },
    create: {
      name: "Podcast Archive",
      slug: ARCHIVE_CATEGORY_SLUG,
      description:
        "Unlock the full Lenny's Podcast archive episode by episode.",
      icon: "🎙️",
      color: "#0ea5e9",
      sortOrder: 7,
    },
  });
}

async function createArchiveLesson(
  categoryId: string,
  dayNumber: number,
  episode: EpisodeRecord
) {
  const slug = `archive-${slugify(episode.guest)}`;
  const existing = await prisma.lesson.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existing) {
    return { created: false, id: existing.id, slug };
  }

  const lesson = await prisma.lesson.create({
    data: {
      title: episode.title,
      slug,
      description: episode.description,
      content: episode.content,
      xpReward: 20,
      difficulty: 2,
      dayNumber,
      categoryId,
      guestName: episode.guest,
      episodeTitle: episode.title,
      sourceTranscript: episode.sourceTranscript,
      isLocked: true,
    },
  });

  await prisma.question.createMany({
    data: episode.questions.map((question, index) => ({
      lessonId: lesson.id,
      questionText: question.questionText,
      options: JSON.stringify(question.options),
      correctIndex: question.correctIndex,
      explanation: question.explanation,
      xpReward: 5,
      sortOrder: index,
    })),
  });

  return { created: true, id: lesson.id, slug };
}

async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<void>
) {
  let currentIndex = 0;

  async function runWorker() {
    while (true) {
      const index = currentIndex;
      currentIndex += 1;

      if (index >= items.length) {
        return;
      }

      await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () =>
      runWorker()
    )
  );
}

async function main() {
  const { dryRun, limit, concurrency } = parseArgs();

  console.log(
    `[archive-import] starting${dryRun ? " (dry run)" : ""} with concurrency ${concurrency}`
  );

  const sessionId = await initializeMcpSession();
  const listText = await callToolText(sessionId, "list_episodes", {});
  const guests = Array.from(new Set(parseEpisodeGuests(listText)));
  const selectedGuests = limit ? guests.slice(0, limit) : guests;

  const existingCoreGuestNames = new Set(
    (
      await prisma.lesson.findMany({
        where: { aiGenerated: false, guestName: { not: null } },
        select: { guestName: true },
      })
    )
      .map((lesson) => lesson.guestName?.trim())
      .filter((guestName): guestName is string => Boolean(guestName))
  );

  const guestsToImport = selectedGuests.filter(
    (guest) => !existingCoreGuestNames.has(guest)
  );

  console.log(
    `[archive-import] ${guests.length} guests listed, ${guestsToImport.length} still need archive records`
  );

  if (dryRun) {
    console.log(
      `[archive-import] first guests to import: ${guestsToImport
        .slice(0, 12)
        .join(", ")}`
    );
    return;
  }

  const archiveCategory = await ensureArchiveCategory();
  const maxDay = await prisma.lesson.aggregate({
    where: { aiGenerated: false },
    _max: { dayNumber: true },
  });

  let nextDayNumber = (maxDay._max.dayNumber ?? 22) + 1;
  /** Serialize day numbers — concurrent workers must not share the same dayNumber. */
  let dayChain = Promise.resolve();
  const allocateDayNumber = () =>
    new Promise<number>((resolve) => {
      dayChain = dayChain.then(() => {
        const d = nextDayNumber;
        nextDayNumber += 1;
        resolve(d);
        return Promise.resolve();
      });
    });

  let createdCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const failures: string[] = [];

  await runWithConcurrency(
    guestsToImport,
    concurrency,
    async (guest, index) => {
      try {
        const rawEpisode = await callToolText(sessionId, "get_episode", {
          guest,
        });
        const episode = buildEpisodeRecord(guest, rawEpisode);

        if (!episode) {
          skippedCount += 1;
          console.log(
            `[archive-import] skipped ${guest} (${index + 1}/${guestsToImport.length})`
          );
          return;
        }

        const dayNumber = await allocateDayNumber();

        const result = await createArchiveLesson(
          archiveCategory.id,
          dayNumber,
          episode
        );

        if (result.created) {
          createdCount += 1;
          console.log(
            `[archive-import] created ${guest} -> ${result.slug} (${index + 1}/${guestsToImport.length})`
          );
        } else {
          skippedCount += 1;
          console.log(
            `[archive-import] exists ${guest} -> ${result.slug} (${index + 1}/${guestsToImport.length})`
          );
        }
      } catch (error) {
        failedCount += 1;
        failures.push(guest);
        console.error(
          `[archive-import] failed ${guest}: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    }
  );

  const archiveCount = await prisma.lesson.count({
    where: {
      aiGenerated: false,
      OR: [{ category: { slug: ARCHIVE_CATEGORY_SLUG } }, { isLocked: true }],
    },
  });

  console.log(
    `[archive-import] done. created=${createdCount} skipped=${skippedCount} failed=${failedCount} archiveCount=${archiveCount}`
  );

  if (failures.length > 0) {
    console.log(`[archive-import] failed guests: ${failures.join(", ")}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
