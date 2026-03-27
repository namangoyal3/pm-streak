import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseJdText } from "@/lib/jd-parser";
import { estimateDaysUntilTarget } from "@/lib/pm-foundations";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const latest = await prisma.userJobTarget.findFirst({
    where: { userId },
    include: {
      job: true,
      plans: {
        orderBy: { generatedAt: "desc" },
        take: 1,
        include: {
          planLessons: {
            orderBy: { dayIndex: "asc" },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ target: latest });
}

type PostBody = {
  jobId?: string;
  customJdText?: string;
  targetDate?: string;
};

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as PostBody;
  const jobId = body.jobId?.trim();
  const customJdText = body.customJdText?.trim();
  const targetDateRaw = body.targetDate?.trim();

  if (!jobId && !customJdText) {
    return NextResponse.json(
      { error: "Provide either jobId or customJdText" },
      { status: 400 }
    );
  }

  if (customJdText && customJdText.length < 120) {
    return NextResponse.json(
      { error: "JD is too short. Please paste a fuller job description." },
      { status: 400 }
    );
  }

  const targetDate = targetDateRaw ? new Date(targetDateRaw) : null;
  if (!targetDate || Number.isNaN(targetDate.getTime())) {
    return NextResponse.json({ error: "Invalid targetDate" }, { status: 400 });
  }
  if (targetDate <= new Date()) {
    return NextResponse.json(
      { error: "Target date must be in the future." },
      { status: 400 }
    );
  }

  let selectedJobId = jobId ?? null;
  if (jobId) {
    const existing = await prisma.job.findUnique({ where: { id: jobId } });
    if (!existing) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
  }

  if (!selectedJobId && customJdText) {
    const parsed = await parseJdText(customJdText);
    const pastedJob = await prisma.job.create({
      data: {
        title: "Custom PM Target Role",
        company: "Custom",
        location: "Flexible",
        remote: true,
        applyUrl: "https://example.com/custom-jd",
        description: customJdText.slice(0, 320),
        tags: parsed.skills,
        source: "pasted",
        isActive: false,
        jdSource: "pasted",
        rawJdText: customJdText,
        parsedSkills: parsed.skills,
        parsedLevel: parsed.level,
        parsedDomain: parsed.domain,
        estimatedInterviewFocus: parsed.estimatedInterviewFocus,
      },
    });
    selectedJobId = pastedJob.id;
  }

  const created = await prisma.userJobTarget.create({
    data: {
      userId,
      jobId: selectedJobId,
      customJdText: customJdText ?? null,
      targetDate,
    },
    include: { job: true },
  });

  return NextResponse.json({
    target: created,
    daysUntilTarget: estimateDaysUntilTarget(targetDate),
  });
}
