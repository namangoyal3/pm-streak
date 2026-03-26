import { prisma } from "./prisma";
import { getToday, getYesterday } from "./utils";
import { sendMilestoneEmail as sendStreakMilestoneEmail } from "./email";

export async function checkAndUpdateStreak(userId: string): Promise<{
  streakCount: number;
  streakBroken: boolean;
  frozenToday: boolean;
  earnBackEligible: boolean;
  perfectStreak: number;
}> {
  const today = getToday();
  const yesterday = getYesterday();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const todayEntry = await prisma.streakDay.findUnique({
    where: { userId_date: { userId, date: today } },
  });
  if (todayEntry) {
    return {
      streakCount: user.streakCount,
      streakBroken: false,
      frozenToday: todayEntry.frozen,
      earnBackEligible: false,
      perfectStreak: user.perfectStreak,
    };
  }

  const yesterdayEntry = await prisma.streakDay.findUnique({
    where: { userId_date: { userId, date: yesterday } },
  });

  if (!yesterdayEntry && user.streakCount > 0) {
    if (user.streakFreezes > 0) {
      await prisma.streakDay.create({
        data: { userId, date: yesterday, completed: false, frozen: true },
      });
      await prisma.user.update({
        where: { id: userId },
        data: { streakFreezes: { decrement: 1 }, perfectStreak: 0 },
      });
      return {
        streakCount: user.streakCount,
        streakBroken: false,
        frozenToday: false,
        earnBackEligible: false,
        perfectStreak: 0,
      };
    }
    // Streak broken — save for earn-back
    const lostStreak = user.streakCount;
    await prisma.user.update({
      where: { id: userId },
      data: {
        streakCount: 0,
        perfectStreak: 0,
        streakLostAt: new Date(),
        lostStreakVal: lostStreak,
      },
    });
    return {
      streakCount: 0,
      streakBroken: true,
      frozenToday: false,
      earnBackEligible: true,
      perfectStreak: 0,
    };
  }

  // Check if earn-back is still available
  const earnBackEligible =
    user.streakLostAt !== null &&
    user.lostStreakVal > 0 &&
    (Date.now() - new Date(user.streakLostAt).getTime()) / 3600000 < 48;

  return {
    streakCount: user.streakCount,
    streakBroken: false,
    frozenToday: false,
    earnBackEligible,
    perfectStreak: user.perfectStreak,
  };
}

export async function recordLessonCompletion(userId: string, xpEarned: number) {
  const today = getToday();

  const existingEntry = await prisma.streakDay.findUnique({
    where: { userId_date: { userId, date: today } },
  });

  if (!existingEntry) {
    await prisma.streakDay.create({
      data: { userId, date: today, completed: true },
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const newStreak = existingEntry ? user.streakCount : user.streakCount + 1;

  const newXP = user.xp + xpEarned;
  const newLevel = Math.floor(newXP / 100) + 1;
  const newPerfectStreak = existingEntry ? user.perfectStreak : user.perfectStreak + 1;

  // Milestone detection
  const milestone = detectMilestone(user.streakCount, newStreak);

  // Gem bonus for streak milestones
  const milestoneGems = detectMilestoneGems(user.streakCount, newStreak);

  await prisma.user.update({
    where: { id: userId },
    data: {
      xp: newXP,
      level: newLevel,
      streakCount: newStreak,
      longestStreak: Math.max(user.longestStreak, newStreak),
      perfectStreak: newPerfectStreak,
      lastActiveAt: new Date(),
      ...(milestoneGems > 0 ? { gems: { increment: milestoneGems } } : {}),
    },
  });

  // Fire milestone email (non-blocking)
  if (milestone && milestoneGems > 0) {
    sendStreakMilestoneEmail({
      userId,
      toEmail: user.email,
      toName: user.name,
      streakCount: newStreak,
      gemsEarned: milestoneGems,
    }).catch(() => {});
  }

  return { newStreak, newXP, newLevel, perfectStreak: newPerfectStreak, milestone, milestoneGems };
}

function detectMilestone(oldStreak: number, newStreak: number): string | null {
  const milestones = [3, 7, 14, 30, 50, 100, 365];
  for (const m of milestones) {
    if (oldStreak < m && newStreak >= m) return `${m}-day streak`;
  }
  return null;
}

function detectMilestoneGems(oldStreak: number, newStreak: number): number {
  // Gem rewards at streak milestones
  const gemMilestones: Record<number, number> = { 3: 10, 7: 25, 14: 25, 30: 50, 50: 50, 100: 100 };
  for (const [m, gems] of Object.entries(gemMilestones)) {
    if (oldStreak < Number(m) && newStreak >= Number(m)) return gems;
  }
  return 0;
}
