import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const FREEZE_COST = 50;

export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.streakFreezes >= 5) {
    return NextResponse.json({ error: "Max streak freezes reached" }, { status: 400 });
  }

  // Atomically decrement gems only if balance is sufficient
  const result = await prisma.user.updateMany({
    where: { id: userId, gems: { gte: FREEZE_COST } },
    data: {
      gems: { decrement: FREEZE_COST },
      streakFreezes: { increment: 1 },
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Not enough gems" }, { status: 400 });
  }

  const updated = await prisma.user.findUnique({
    where: { id: userId },
    select: { gems: true, streakFreezes: true },
  });

  return NextResponse.json({
    streakFreezes: updated!.streakFreezes,
    gems: updated!.gems,
  });
}
