import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { generatePlan } from "@/lib/plan-generator";

function daysBetween(now: Date, targetDate: Date): number {
  const ms = targetDate.getTime() - now.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const userJobTargetId = typeof body.userJobTargetId === "string" ? body.userJobTargetId : "";
  const forceRegenerate = Boolean(body.forceRegenerate);
  if (!userJobTargetId) {
    return NextResponse.json({ error: "userJobTargetId is required" }, { status: 400 });
  }

  const target = await prisma.userJobTarget.findFirst({
    where: { id: userJobTargetId, userId },
    include: {
      job: {
        select: {
          id: true,
          parsedSkills: true,
          parsedLevel: true,
          parsedDomain: true,
          estimatedInterviewFocus: true,
        },
      },
    },
  });
  if (!target) {
    return NextResponse.json({ error: "Target not found" }, { status: 404 });
  }

  if (!forceRegenerate) {
    const latest = await prisma.learningPlan.findFirst({
      where: { userJobTargetId },
      include: {
        planLessons: { orderBy: { dayIndex: "asc" } },
      },
      orderBy: { generatedAt: "desc" },
    });
    if (latest) {
      return NextResponse.json({ learningPlan: latest, reused: true });
    }
  }

  const days = daysBetween(new Date(), target.targetDate);
  const parsed = {
    skills: Array.isArray(target.job?.parsedSkills) ? (target.job?.parsedSkills as string[]) : [],
    level: target.job?.parsedLevel ?? "PM",
    domain: target.job?.parsedDomain ?? "general_pm",
    estimatedInterviewFocus:
      (target.job?.estimatedInterviewFocus as Record<string, number> | null | undefined) ?? {},
  };

  const generated = generatePlan({
    parsedJD: {
      skills: parsed.skills,
      level: parsed.level,
      domain: parsed.domain,
      mustHave: [],
      niceToHave: [],
      estimatedInterviewFocus: {
        product_sense: parsed.estimatedInterviewFocus.product_sense ?? 0.24,
        metrics: parsed.estimatedInterviewFocus.metrics ?? 0.22,
        execution: parsed.estimatedInterviewFocus.execution ?? 0.22,
        strategy: parsed.estimatedInterviewFocus.strategy ?? 0.16,
        behavioral: parsed.estimatedInterviewFocus.behavioral ?? 0.16,
      },
    },
    daysUntilTarget: days,
  });

  const created = await prisma.$transaction(async (tx) => {
    const plan = await tx.learningPlan.create({
      data: {
        userJobTargetId,
        planConfig: generated.planConfig,
      },
    });

    if (generated.planLessons.length > 0) {
      await tx.planLesson.createMany({
        data: generated.planLessons.map((lesson) => ({
          learningPlanId: plan.id,
          dayIndex: lesson.dayIndex,
          lessonType: lesson.lessonType,
          skillTags: lesson.skillTags,
        })),
      });
    }

    return tx.learningPlan.findUnique({
      where: { id: plan.id },
      include: { planLessons: { orderBy: { dayIndex: "asc" } } },
    });
  });

  return NextResponse.json({ learningPlan: created, reused: false });
}

export async function GET(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userJobTargetId = searchParams.get("userJobTargetId");

  const target =
    userJobTargetId
      ? await prisma.userJobTarget.findFirst({
          where: { id: userJobTargetId, userId },
          select: { id: true },
        })
      : await prisma.userJobTarget.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
          select: { id: true },
        });

  if (!target) {
    return NextResponse.json({ learningPlan: null });
  }

  const plan = await prisma.learningPlan.findFirst({
    where: { userJobTargetId: target.id },
    orderBy: { generatedAt: "desc" },
    include: {
      planLessons: {
        orderBy: { dayIndex: "asc" },
      },
    },
  });

  return NextResponse.json({ learningPlan: plan, userJobTargetId: target.id });
}
