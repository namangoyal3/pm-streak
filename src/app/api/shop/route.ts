import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SHOP_ITEMS = {
  streak_freeze: { cost: 50, label: "Streak Freeze" },
  xp_boost:     { cost: 75, label: "XP Boost" },
  streak_repair: { cost: 150, label: "Streak Repair" },
} as const;

type ItemId = keyof typeof SHOP_ITEMS;

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { itemId } = await req.json() as { itemId: ItemId };
  const item = SHOP_ITEMS[itemId];
  if (!item) return NextResponse.json({ error: "Unknown item" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.gems < item.cost) {
    return NextResponse.json({ error: "Not enough gems" }, { status: 400 });
  }

  if (itemId === "streak_freeze") {
    if (user.streakFreezes >= 5) {
      return NextResponse.json({ error: "Already at max streak freezes (5)" }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { gems: { decrement: item.cost }, streakFreezes: { increment: 1 } },
    });
    return NextResponse.json({ gems: updated.gems, streakFreezes: updated.streakFreezes });
  }

  if (itemId === "xp_boost") {
    if (user.xpBoostActive) {
      return NextResponse.json({ error: "XP boost already active" }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { gems: { decrement: item.cost }, xpBoostActive: true },
    });
    return NextResponse.json({ gems: updated.gems, xpBoostActive: updated.xpBoostActive });
  }

  if (itemId === "streak_repair") {
    // Must have a recently broken streak to repair
    if (!user.streakLostAt || user.lostStreakVal <= 0) {
      return NextResponse.json({ error: "No broken streak to repair" }, { status: 400 });
    }
    // Only allow repair within 48 hours of losing the streak
    const hoursAgo = (Date.now() - user.streakLostAt.getTime()) / 1000 / 3600;
    if (hoursAgo > 48) {
      return NextResponse.json({ error: "Streak repair window has expired (48h)" }, { status: 400 });
    }
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        gems: { decrement: item.cost },
        streakCount: user.lostStreakVal,
        streakLostAt: null,
        lostStreakVal: 0,
      },
    });
    return NextResponse.json({ gems: updated.gems, streakCount: updated.streakCount });
  }

  return NextResponse.json({ error: "Unhandled item" }, { status: 400 });
}
