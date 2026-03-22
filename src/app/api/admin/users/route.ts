import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(email: string): boolean {
  return email === (process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com");
}

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!currentUser || !isAdmin(currentUser.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") || "50"));
  const search = searchParams.get("q") || "";
  const sortBy = searchParams.get("sort") || "createdAt";
  const sortDir = searchParams.get("dir") === "asc" ? "asc" : "desc";

  const where = search
    ? { OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ]}
    : {};

  const validSorts = ["createdAt", "xp", "streakCount", "lastActiveAt", "name"] as const;
  const orderKey = validSorts.includes(sortBy as any) ? (sortBy as typeof validSorts[number]) : "createdAt";

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { [orderKey]: sortDir },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        xp: true,
        level: true,
        streakCount: true,
        longestStreak: true,
        gems: true,
        onboarded: true,
        lastActiveAt: true,
        createdAt: true,
        _count: { select: { completedLessons: true } },
      },
    }),
  ]);

  return NextResponse.json({
    users: users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      xp: u.xp,
      level: u.level,
      streakCount: u.streakCount,
      longestStreak: u.longestStreak,
      gems: u.gems,
      onboarded: u.onboarded,
      lessonsCompleted: u._count.completedLessons,
      lastActiveAt: u.lastActiveAt?.toISOString() ?? null,
      createdAt: u.createdAt.toISOString(),
    })),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
