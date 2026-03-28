import { prisma } from "@/lib/prisma";
import { groqCreate } from "@/lib/groq";
import type { InterviewPrepContext } from "@/lib/interview-research";

export type DailyDrillSelection = {
  dayIndex: number;
  targetTitle: string;
  lessonType: string;
  skillTags: string[];
  lesson: {
    id: string;
    title: string;
    promptText: string;
    type: string | null;
    skillTags: string[];
  };
};

function dateKey(date = new Date()): string {
  return date.toISOString().split("T")[0]!;
}

function toSkillTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function fallbackPrompt(lessonType: string, skills: string[], targetTitle: string): string {
  const focus = skills.length > 0 ? skills.slice(0, 3).join(", ") : "structure, user empathy, trade-offs";
  return `You are interviewing for ${targetTitle}. This is a ${lessonType.replace("_", " ")} drill.\n\nPrompt:\nPropose a clear approach to solve a realistic PM problem. Use a structured framework, show explicit trade-offs, and include the top metrics you'd track.\n\nFocus today on: ${focus}.\n\nQuestion: How would you answer this in a 5-10 minute interview response?`;
}

async function buildDrillPrompt(params: {
  lessonType: string;
  skillTags: string[];
  targetTitle: string;
  company: string;
  context: InterviewPrepContext | null;
}): Promise<string> {
  const { lessonType, skillTags, targetTitle, company, context } = params;
  const fw = context?.frameworks?.slice(0, 3).map((f) => `${f.name}: ${f.whenToUse}`).join("\n") ?? "";
  const sig = context?.companySignals?.slice(0, 3).map((s) => `${s.theme} — ${s.whyItMatters}`).join("\n") ?? "";
  const arche = context?.archetypeQuestions?.slice(0, 2).map((q) => q.question).join("\n") ?? "";

  try {
    const result = await groqCreate({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You write ONE realistic PM interview case prompt. Output a single scenario (5-12 sentences) with concrete constraints, stakeholders, and success criteria. No multiple choice. The candidate answers in 5-10 minutes spoken.",
        },
        {
          role: "user",
          content: [
            `Role: ${targetTitle} at ${company}.`,
            `Lesson focus: ${lessonType.replace(/_/g, " ")}.`,
            `Skills: ${skillTags.join(", ") || "general PM"}.`,
            fw ? `Frameworks to lean on:\n${fw}` : "",
            sig ? `What hiring teams often probe:\n${sig}` : "",
            arche ? `Example question themes (inspire but do not copy verbatim):\n${arche}` : "",
            "\nWrite one scenario prompt only.",
          ]
            .filter(Boolean)
            .join("\n\n"),
        },
      ],
      temperature: 0.5,
      max_tokens: 600,
    });
    const out = result.choices[0]?.message?.content?.trim();
    if (out && out.length > 120) return out;
  } catch {
    /* ignore */
  }

  return fallbackPrompt(lessonType, skillTags, targetTitle);
}

export async function getDailyDrillForUser(userId: string): Promise<DailyDrillSelection | null> {
  const today = dateKey();

  const latestPlan = await prisma.learningPlan.findFirst({
    where: { userJobTarget: { userId } },
    orderBy: { generatedAt: "desc" },
    include: {
      userJobTarget: { include: { job: true } },
      planLessons: { orderBy: { dayIndex: "asc" } },
    },
  });

  if (!latestPlan || latestPlan.planLessons.length === 0) return null;

  const startDate = latestPlan.generatedAt;
  const elapsedDays = Math.max(
    1,
    Math.floor((new Date(today).getTime() - new Date(dateKey(startDate)).getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
  const planIndex = Math.min(elapsedDays, latestPlan.planLessons.length);
  const planLesson = latestPlan.planLessons.find((p) => p.dayIndex === planIndex) ?? latestPlan.planLessons[latestPlan.planLessons.length - 1]!;
  const skillTags = toSkillTags(planLesson.skillTags);
  const targetTitle = latestPlan.userJobTarget.job?.title ?? "your target PM role";
  const company = latestPlan.userJobTarget.job?.company ?? "your target company";

  const rawCtx = latestPlan.userJobTarget.interviewPrepContext;
  const prepContext =
    rawCtx && typeof rawCtx === "object" ? (rawCtx as InterviewPrepContext) : null;

  let lesson = null as null | {
    id: string;
    title: string;
    promptText: string | null;
    type: string | null;
    skillTags: string[];
  };

  if (planLesson.lessonId) {
    const existing = await prisma.lesson.findUnique({
      where: { id: planLesson.lessonId },
      select: { id: true, title: true, promptText: true, type: true, skillTags: true },
    });
    if (existing) lesson = existing;
  }

  if (!lesson) {
    const promptText = await buildDrillPrompt({
      lessonType: planLesson.lessonType,
      skillTags,
      targetTitle,
      company,
      context: prepContext,
    });

    const generated = await prisma.lesson.create({
      data: {
        title: `Daily ${planLesson.lessonType.replace("_", " ")} drill`,
        slug: `daily-drill-${userId.slice(0, 8)}-${today}-${planLesson.dayIndex}`,
        description: `Auto-generated daily drill for day ${planLesson.dayIndex}`,
        content: "",
        xpReward: 10,
        difficulty: 2,
        dayNumber: 1,
        categoryId: (await prisma.category.findFirst({ select: { id: true }, orderBy: { sortOrder: "asc" } }))?.id
          ?? (await prisma.category.create({
            data: {
              name: "Daily Drills",
              slug: "daily-drills",
              description: "AI-evaluated PM daily drills",
              icon: "🧠",
              color: "#4f46e5",
              sortOrder: 500,
            },
            select: { id: true },
          })).id,
        aiGenerated: true,
        generatedForUserId: userId,
        type: planLesson.lessonType,
        skillTags,
        promptText,
      },
      select: { id: true, title: true, promptText: true, type: true, skillTags: true },
    });

    await prisma.planLesson.update({
      where: { id: planLesson.id },
      data: { lessonId: generated.id },
    });
    lesson = generated;
  }

  return {
    dayIndex: planLesson.dayIndex,
    targetTitle,
    lessonType: planLesson.lessonType,
    skillTags,
    lesson: {
      id: lesson.id,
      title: lesson.title,
      promptText: lesson.promptText ?? fallbackPrompt(planLesson.lessonType, skillTags, targetTitle),
      type: lesson.type,
      skillTags: lesson.skillTags,
    },
  };
}
