import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const [user, unreadNotifications] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streakCount: true,
        longestStreak: true,
        streakFreezes: true,
        gems: true,
        xpBoostActive: true,
        streakLostAt: true,
        lostStreakVal: true,
        streakGoal: true,
        onboarded: true,
        lastActiveAt: true,
        createdAt: true,
      },
    }),
    prisma.notification.count({ where: { userId, readAt: null } }),
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: { ...user, unreadNotifications } });
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("token", "", { maxAge: 0, path: "/" });
  return response;
}
