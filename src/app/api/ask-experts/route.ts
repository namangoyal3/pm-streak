import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { groqCreate } from "@/lib/groq";
import {
  EXPERT_GUARDRAIL_MESSAGE,
  EXPERT_PROFILE_BY_ID,
  isExpertId,
  type ExpertId,
} from "@/lib/experts";

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

type EvidenceLesson = {
  id: string;
  title: string;
  description: string;
  guestName: string | null;
  episodeTitle: string | null;
  sourceTranscript: string | null;
  content: string;
  topicKey: string | null;
  createdAt: Date;
};

const DOMAIN_PATTERNS: RegExp[] = [
  /\b(product|product management|pm|roadmap|prioritization|trade-?off|discovery|delivery)\b/i,
  /\b(metric|metrics|kpi|north star|activation|retention|churn|funnel|onboarding|growth)\b/i,
  /\b(startup|founder|founding|seed|series [abc]|venture|vc|go-to-market|gtm)\b/i,
  /\b(ai|artificial intelligence|llm|agentic|model|prompt|inference|machine learning)\b/i,
  /\b(user research|customer interview|product strategy|execution|pricing|pmf)\b/i,
];

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "also",
  "because",
  "being",
  "between",
  "could",
  "first",
  "from",
  "have",
  "into",
  "just",
  "like",
  "make",
  "more",
  "most",
  "other",
  "should",
  "than",
  "that",
  "their",
  "them",
  "there",
  "these",
  "this",
  "what",
  "when",
  "where",
  "which",
  "while",
  "with",
  "would",
  "your",
]);

function isInDomain(question: string) {
  return DOMAIN_PATTERNS.some((pattern) => pattern.test(question));
}

function extractSearchTerms(input: string) {
  return [...new Set(
    input
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 3 && !STOP_WORDS.has(token))
  )].slice(0, 8);
}

function sanitizeMessages(raw: unknown): ClientMessage[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const value = item as Record<string, unknown>;
      const role = value.role;
      const content = value.content;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
        return null;
      }
      const trimmed = content.trim();
      if (!trimmed) return null;
      return {
        role,
        content: trimmed.slice(0, 3000),
      } satisfies ClientMessage;
    })
    .filter((msg): msg is ClientMessage => Boolean(msg))
    .slice(-12);
}

function scoreLesson(
  lesson: EvidenceLesson,
  terms: string[],
  hintTerms: string[]
) {
  const haystack = [
    lesson.title,
    lesson.description,
    lesson.guestName ?? "",
    lesson.episodeTitle ?? "",
    lesson.topicKey ?? "",
    lesson.sourceTranscript ?? "",
    lesson.content,
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 2;
  }
  for (const hint of hintTerms) {
    if (haystack.includes(hint.toLowerCase())) score += 1;
  }
  return score;
}

async function fetchEvidence(question: string, expertId: ExpertId) {
  const expert = EXPERT_PROFILE_BY_ID[expertId];
  const terms = extractSearchTerms(question);
  const hintTerms = expert.searchHints;
  const orFilters: Prisma.LessonWhereInput[] = [];

  for (const term of [...terms, ...hintTerms]) {
    orFilters.push({ title: { contains: term, mode: "insensitive" } });
    orFilters.push({ description: { contains: term, mode: "insensitive" } });
    orFilters.push({ guestName: { contains: term, mode: "insensitive" } });
    orFilters.push({ episodeTitle: { contains: term, mode: "insensitive" } });
    orFilters.push({ sourceTranscript: { contains: term, mode: "insensitive" } });
    orFilters.push({ content: { contains: term, mode: "insensitive" } });
    orFilters.push({ topicKey: { contains: term, mode: "insensitive" } });
  }

  if (orFilters.length === 0) return [];

  const lessons = await prisma.lesson.findMany({
    where: { OR: orFilters },
    select: {
      id: true,
      title: true,
      description: true,
      guestName: true,
      episodeTitle: true,
      sourceTranscript: true,
      content: true,
      topicKey: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  return lessons
    .map((lesson) => ({
      lesson,
      score: scoreLesson(lesson, terms, hintTerms),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => entry.lesson);
}

function toEvidenceBlock(lesson: EvidenceLesson, index: number) {
  const rawSnippet = (lesson.sourceTranscript || lesson.content || lesson.description).replace(/\s+/g, " ").trim();
  const snippet = rawSnippet.slice(0, 900);
  const guestMeta = [lesson.guestName, lesson.episodeTitle].filter(Boolean).join(" - ");
  return `[${index + 1}] ${lesson.title}${guestMeta ? ` (${guestMeta})` : ""}\n${snippet}`;
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const expertId = body?.expertId;
  if (!isExpertId(expertId)) {
    return NextResponse.json({ error: "Invalid expert selection." }, { status: 400 });
  }

  const messages = sanitizeMessages(body?.messages);
  const latestUserMessage = [...messages].reverse().find((msg) => msg.role === "user");
  const question = latestUserMessage?.content ?? "";

  if (!question) {
    return NextResponse.json({ error: "Please enter a question." }, { status: 400 });
  }

  if (!isInDomain(question)) {
    return NextResponse.json({ error: EXPERT_GUARDRAIL_MESSAGE }, { status: 400 });
  }

  const evidence = await fetchEvidence(question, expertId);
  if (evidence.length < 2) {
    return NextResponse.json({ error: EXPERT_GUARDRAIL_MESSAGE }, { status: 400 });
  }

  const expert = EXPERT_PROFILE_BY_ID[expertId];
  const evidenceText = evidence.map(toEvidenceBlock).join("\n\n");
  const conversationText = messages
    .slice(-8)
    .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
    .join("\n");

  const completion = await groqCreate({
    model: "llama-3.3-70b-versatile",
    temperature: 0.35,
    max_tokens: 800,
    messages: [
      {
        role: "system",
        content: [
          `You are answering as ${expert.name}.`,
          expert.stylePrompt,
          "You must answer only PM/startup/AI questions using the provided evidence bundle.",
          `If the question is out of scope or evidence is insufficient, reply with exactly: ${EXPERT_GUARDRAIL_MESSAGE}`,
          "Do not fabricate claims. Prefer concise, practical guidance and cite evidence markers like [1], [2].",
        ].join("\n"),
      },
      {
        role: "user",
        content: [
          `Conversation context:\n${conversationText}`,
          `\nLatest user question:\n${question}`,
          `\nEvidence bundle:\n${evidenceText}`,
          "\nAnswer in plain text only.",
        ].join("\n"),
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content?.trim() || EXPERT_GUARDRAIL_MESSAGE;
  return NextResponse.json({
    answer,
    expert: {
      id: expert.id,
      label: expert.label,
      name: expert.name,
    },
    sources: evidence.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      guestName: item.guestName,
      episodeTitle: item.episodeTitle,
    })),
  });
}
