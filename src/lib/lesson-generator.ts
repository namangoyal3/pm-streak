import { prisma } from "./prisma";
import { buildSourceTranscript } from "./podcast-quiz-helpers";
import { generateActionablePMLesson, SearchResult } from "./llm-lessons";

type GenerationMode = "explore" | "deep_dive";

interface GenerateLessonInput {
  topic: string;
  userId: string;
  generationMode?: GenerationMode;
  sourceLessonId?: string | null;
  bypassDailyLimit?: boolean;
}

export class TranscriptEvidenceError extends Error {}
export class DailyLimitError extends Error {
  constructor(message = "You've reached your daily limit for AI lessons.") {
    super(message);
    this.name = "DailyLimitError";
  }
}

const LENNY_MCP_URL = "https://lenny-mcp.onrender.com/mcp";
const MCP_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/event-stream",
} as const;
const AI_LESSON_GENERATION_VERSION = "qv4";

function normalizeTopicKey(topic: string) {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(the|a|an|and|of|to|for|on|in)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

function slugifyTopic(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
        clientInfo: { name: "pm-streak", version: "2.0.0" },
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

async function callMcpTool<T>(
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
  const payload = parseSseJsonPayload<{ result?: { content?: Array<{ type: string; text?: string }> } }>(text);
  return payload?.result?.content ?? [];
}

function parseSearchResults(rawText: string): SearchResult[] {
  const chunks = rawText
    .split(/\n---\n/g)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks
    .map((chunk) => {
      const guestMatch = chunk.match(/^##\s+\d+\.\s+(.+)$/m);
      const titleMatch = chunk.match(/^#\s+(.+)$/m);
      const transcriptSection = chunk.includes("## Transcript")
        ? chunk.split("## Transcript")[1]
        : chunk;
      const snippet = transcriptSection
        .replace(/^[:\s-]+/, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!guestMatch || !snippet) return null;

      return {
        guest: guestMatch[1].trim(),
        episodeTitle: titleMatch?.[1]?.trim() ?? null,
        snippet,
      };
    })
    .filter((result): result is SearchResult => !!result)
    .slice(0, 4);
}

function hasStrongEvidence(result: SearchResult) {
  const snippet = result.snippet.trim();
  return Boolean(result.guest) && snippet.length >= 180;
}

async function searchLennyTranscripts(query: string): Promise<SearchResult[]> {
  try {
    const sessionId = await initializeMcpSession();
    const content = await callMcpTool(sessionId, "search_transcripts", {
      query,
      limit: 4,
    });
    const text = content
      .filter((item) => item.type === "text" && item.text)
      .map((item) => item.text ?? "")
      .join("\n\n");

    const parsed = parseSearchResults(text).filter(hasStrongEvidence);
    if (parsed.length < 2) {
      throw new TranscriptEvidenceError(
        "Not enough strong podcast transcript evidence for this topic yet. Try another topic."
      );
    }
    return parsed;
  } catch (error) {
    if (error instanceof TranscriptEvidenceError) {
      throw error;
    }
    throw new TranscriptEvidenceError(
      "Podcast transcript evidence is unavailable right now. Try another topic."
    );
  }
}

async function ensureAiCategory() {
  let aiCategory = await prisma.category.findUnique({
    where: { slug: "ai-generated" },
  });

  if (!aiCategory) {
    aiCategory = await prisma.category.create({
      data: {
        name: "AI-Generated Lessons",
        slug: "ai-generated",
        description: "Custom PM lessons generated from Lenny's Podcast transcripts",
        icon: "🤖",
        color: "#ce82ff",
        sortOrder: 99,
      },
    });
  }

  return aiCategory;
}

async function resolveSourceLesson(sourceLessonId?: string | null) {
  if (!sourceLessonId) return null;

  const lesson = await prisma.lesson.findUnique({
    where: { id: sourceLessonId },
    include: {
      category: true,
    },
  });

  if (!lesson) return null;

  if (lesson.aiGenerated && lesson.sourceLessonId) {
    return resolveSourceLesson(lesson.sourceLessonId);
  }

  return lesson;
}

export async function generateLesson({
  topic,
  userId,
  generationMode = "explore",
  sourceLessonId = null,
  bypassDailyLimit = false,
}: GenerateLessonInput) {
  const normalizedTopic = topic.trim();
  const topicKey = `${normalizeTopicKey(normalizedTopic)}:${AI_LESSON_GENERATION_VERSION}`;

  const existingLesson = await prisma.lesson.findFirst({
    where: {
      aiGenerated: true,
      generatedForUserId: userId,
      topicKey,
      generationMode,
      sourceLessonId,
    },
    orderBy: { createdAt: "desc" },
  });

  if (existingLesson) {
    return existingLesson;
  }

  // Monetization: Check daily limit for free users
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  if (!bypassDailyLimit && user?.plan !== "pro") {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const dailyAiLessonsCount = await prisma.lesson.count({
      where: {
        generatedForUserId: userId,
        aiGenerated: true,
        createdAt: { gte: twentyFourHoursAgo },
      },
    });

    if (dailyAiLessonsCount >= 1) {
      throw new DailyLimitError(
        "You've reached your daily limit for AI lessons. Upgrade to Pro for unlimited Deep Dives."
      );
    }
  }

  const [searchResults, sourceLesson, maxDay] = await Promise.all([
    searchLennyTranscripts(normalizedTopic),
    resolveSourceLesson(sourceLessonId),
    prisma.lesson.aggregate({ _max: { dayNumber: true } }),
  ]);

  const category =
    sourceLesson?.category ??
    (await ensureAiCategory());

  const title =
    generationMode === "deep_dive"
      ? `${normalizedTopic} — Deeper Dive`
      : `${normalizedTopic.charAt(0).toUpperCase() + normalizedTopic.slice(1)} — Custom Lesson`;

  const slug = `ai-${slugifyTopic(normalizedTopic).slice(0, 40)}-${generationMode}-${Date.now()}`;
  const description =
    generationMode === "deep_dive"
      ? `A deeper follow-up lesson on ${normalizedTopic}`
      : `Custom lesson on ${normalizedTopic} from Lenny's Podcast insights`;

  const llmResult = await generateActionablePMLesson(normalizedTopic, searchResults);
  const content = llmResult.content;
  const questions = llmResult.questions;
  const sourceTranscript = buildSourceTranscript(normalizedTopic, searchResults);

  const leadResult = searchResults[0];

  const lesson = await prisma.lesson.create({
    data: {
      title,
      slug,
      description,
      content,
      xpReward: 15,
      difficulty: generationMode === "deep_dive" ? 3 : 2,
      dayNumber: (maxDay._max.dayNumber ?? 22) + 1,
      categoryId: category.id,
      guestName: sourceLesson?.guestName ?? leadResult.guest,
      episodeTitle: sourceLesson?.episodeTitle ?? leadResult.episodeTitle,
      youtubeId: sourceLesson?.youtubeId ?? null,
      youtubeStart: sourceLesson?.youtubeStart ?? null,
      youtubeEnd: sourceLesson?.youtubeEnd ?? null,
      sourceTranscript,
      aiGenerated: true,
      generatedForUserId: userId,
      topicKey,
      generationMode,
      sourceLessonId,
    },
  });

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    await prisma.question.create({
      data: {
        lessonId: lesson.id,
        questionText: question.questionText,
        options: JSON.stringify(question.options),
        correctIndex: question.correctIndex,
        explanation: question.explanation,
        xpReward: 5,
        sortOrder: i,
      },
    });
  }

  return lesson;
}
