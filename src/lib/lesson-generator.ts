import { prisma } from "./prisma";

type GenerationMode = "explore" | "deep_dive";

interface SearchResult {
  guest: string;
  episodeTitle: string | null;
  snippet: string;
}

interface GenerateLessonInput {
  topic: string;
  userId: string;
  generationMode?: GenerationMode;
  sourceLessonId?: string | null;
}

const LENNY_MCP_URL = "https://lenny-mcp.onrender.com/mcp";
const MCP_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json, text/event-stream",
} as const;

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

function getFallbackContent(topic: string): SearchResult[] {
  const topicContent: Record<string, SearchResult[]> = {
    onboarding: [
      {
        guest: "Adam Fishman",
        episodeTitle: "How to build a high-performing growth team",
        snippet:
          "Onboarding is the one part of your product that nearly every user touches. The strongest onboarding flows shorten time-to-value, reduce cognitive load, and get the user to their first meaningful outcome quickly.",
      },
    ],
    hiring: [
      {
        guest: "Nikhyl Singhal",
        episodeTitle: "Hiring world-class product managers",
        snippet:
          "Great hiring loops test how candidates think, not just what they know. The best PM interviews surface judgment, synthesis, and the ability to reason through ambiguous product trade-offs.",
      },
    ],
    ai: [
      {
        guest: "Ravi Mehta",
        episodeTitle: "The AI prototype method",
        snippet:
          "AI product work moves faster when teams prototype with the model early, stay close to real user workflows, and treat non-determinism as a design constraint rather than an edge case.",
      },
    ],
    strategy: [
      {
        guest: "Gibson Biddle",
        episodeTitle: "The DHM strategy framework",
        snippet:
          "A durable strategy is useful only when it delights customers, is hard to copy, and improves the economics of the business. Strategy should make trade-offs visible, not hide them.",
      },
    ],
    roadmap: [
      {
        guest: "Sachin Rekhi",
        episodeTitle: "Outcome-driven roadmaps",
        snippet:
          "A roadmap is strongest when it tells a story about outcomes, customer problems, and how the team will measure progress. Feature lists alone do not create alignment.",
      },
    ],
    pricing: [
      {
        guest: "Madhavan Ramanujam",
        episodeTitle: "The art and science of pricing",
        snippet:
          "Pricing becomes a product advantage when it reflects willingness to pay, customer value, and packaging clarity. Teams usually underinvest in testing the story behind the price.",
      },
    ],
  };

  const key = Object.keys(topicContent).find((candidate) =>
    topic.toLowerCase().includes(candidate)
  );

  return (
    topicContent[key ?? ""] ?? [
      {
        guest: "Lenny's Podcast Archive",
        episodeTitle: "Curated PM insights",
        snippet: `Across the archive, ${topic} shows up as a mix of user empathy, decision quality, and execution discipline. The consistent pattern is to define the outcome clearly, study real user behavior, and turn the insight into a practical next step.`,
      },
    ]
  );
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

    const parsed = parseSearchResults(text);
    return parsed.length > 0 ? parsed : getFallbackContent(query);
  } catch {
    return getFallbackContent(query);
  }
}

function cleanSnippet(snippet: string, maxLength = 320) {
  const cleaned = snippet
    .replace(/\b[A-Za-z .'()-]+ \(\d{2}:\d{2}:\d{2}\):\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.length > maxLength
    ? `${cleaned.slice(0, maxLength).trim()}...`
    : cleaned;
}

function extractLeadSentence(snippet: string, topic: string) {
  const cleaned = cleanSnippet(snippet, 220);
  const firstSentence = cleaned.match(/.*?[.!?](?:\s|$)/)?.[0]?.trim();
  if (firstSentence && firstSentence.length >= 45) {
    return firstSentence;
  }

  return `${topic} gets stronger when the team reduces friction, makes the user outcome obvious, and turns insight into a concrete product decision.`;
}

function buildSourceTranscript(topic: string, results: SearchResult[]) {
  const sections = results.map((result, index) => {
    const episodeLine = result.episodeTitle ? `Episode: ${result.episodeTitle}` : "Episode: archive excerpt";
    return `${index + 1}. ${result.guest}\n${episodeLine}\n${cleanSnippet(result.snippet, 420)}`;
  });

  return `Transcript highlights for ${topic}:\n\n${sections.join("\n\n")}`;
}

function buildLessonContent(
  topic: string,
  results: SearchResult[],
  generationMode: GenerationMode,
  sourceLessonTitle?: string | null
) {
  const lead = results[0];
  const additional = results.slice(1, 3);
  const introLabel =
    generationMode === "deep_dive"
      ? `This deeper dive builds on "${sourceLessonTitle ?? topic}" and pulls in adjacent transcript insights from Lenny's Podcast.`
      : `This custom lesson is built from transcript highlights across Lenny's Podcast for "${topic}".`;

  const summary = extractLeadSentence(lead.snippet, topic);
  const highlightLines = [
    `FOUNDATIONAL IDEA`,
    summary,
    "",
    `WHY THIS TOPIC MATTERS`,
    `${topic} keeps surfacing in strong PM conversations because it changes how teams prioritize, where they look for evidence, and how quickly users reach value.`,
    "",
    `TRANSCRIPT HIGHLIGHTS`,
    `${lead.guest}${lead.episodeTitle ? ` — ${lead.episodeTitle}` : ""}: ${cleanSnippet(lead.snippet)}`,
    ...additional.flatMap((result) => [
      `${result.guest}${result.episodeTitle ? ` — ${result.episodeTitle}` : ""}: ${cleanSnippet(result.snippet)}`,
    ]),
    "",
    `HOW TO APPLY THIS THIS WEEK`,
    `1. Name the user outcome you want ${topic} to improve.`,
    `2. Audit the biggest friction or ambiguity in the current experience.`,
    `3. Turn one insight from this lesson into an experiment, decision, or team discussion this week.`,
  ];

  return `${introLabel}\n\n${highlightLines.join("\n")}`;
}

function buildQuestions(topic: string, results: SearchResult[]) {
  const lead = results[0];
  const guestOptions = Array.from(
    new Set([
      lead.guest,
      ...results.slice(1).map((result) => result.guest),
      "Lenny Rachitsky",
      "Shreyas Doshi",
      "Julie Zhuo",
    ])
  ).slice(0, 4);

  const q1Options = guestOptions.includes(lead.guest)
    ? guestOptions
    : [lead.guest, ...guestOptions.slice(0, 3)];

  const q2Correct = extractLeadSentence(lead.snippet, topic);
  const q2Options = [
    q2Correct,
    `Treat ${topic} as a one-time setup task and move on.`,
    `Ignore user friction until acquisition improves.`,
    `Prioritize output volume over user outcomes.`,
  ];

  const q3Correct = `Apply one insight from ${topic} to a real product decision this week.`;

  return [
    {
      questionText: `Which expert is featured most prominently in this lesson on ${topic}?`,
      options: q1Options,
      correctIndex: q1Options.indexOf(lead.guest),
      explanation: `${lead.guest} is the primary source for the leading transcript highlight in this lesson.`,
    },
    {
      questionText: `Which takeaway best matches the transcript evidence in this lesson?`,
      options: q2Options,
      correctIndex: 0,
      explanation: `The lesson centers on this pattern from the transcript excerpts: ${q2Correct}`,
    },
    {
      questionText: `What is the best next step after finishing a lesson on ${topic}?`,
      options: [
        q3Correct,
        "Wait until you have more data before changing anything.",
        "Turn the lesson into a slide deck before applying it.",
        "Treat the topic as theory and keep it separate from daily work.",
      ],
      correctIndex: 0,
      explanation: "Retention is higher when you turn a takeaway into a concrete decision, experiment, or product review right away.",
    },
  ];
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
}: GenerateLessonInput) {
  const normalizedTopic = topic.trim();
  const topicKey = normalizeTopicKey(normalizedTopic);

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
  const content = buildLessonContent(
    normalizedTopic,
    searchResults,
    generationMode,
    sourceLesson?.title ?? null
  );
  const questions = buildQuestions(normalizedTopic, searchResults);
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
