import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_GOALS = ["breaking_in", "interview_prep", "staying_sharp", "lead_strategy"];

export async function PATCH(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { learningGoal } = await req.json();
  if (!VALID_GOALS.includes(learningGoal)) {
    return NextResponse.json({ error: "Invalid goal" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { learningGoal },
  });

  return NextResponse.json({ ok: true, learningGoal });
}
