import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { dailyGoal, streakGoal, learningGoal } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: {
      onboarded: true,
      dailyGoal: dailyGoal ?? 1,
      streakGoal: streakGoal ?? 7,
      learningGoal: learningGoal ?? "staying_sharp",
    },
  });

  return NextResponse.json({ ok: true });
}
