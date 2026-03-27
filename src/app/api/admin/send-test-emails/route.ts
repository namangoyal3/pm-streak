/**
 * POST /api/admin/send-test-emails
 * Sends all 11 email templates to the admin email for review.
 * Admin-only, secured by CRON_SECRET header.
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendWelcomeEmail,
  sendDay2NudgeEmail,
  sendStreakAtRiskEmail,
  sendProNudgeEmail,
  sendReengagementEmail,
  sendWeeklyDigestEmail,
  sendMilestoneEmail,
  sendProWinbackEmail,
  sendChallengeReceivedEmail,
  sendChallengeAcceptedEmail,
} from "@/lib/email";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find admin user
  const user = await prisma.user.findFirst({
    where: { email: ADMIN_EMAIL },
    select: { id: true, email: true, name: true, plan: true, streakCount: true, xp: true, credits: true },
  });

  if (!user) {
    return NextResponse.json({ error: `User ${ADMIN_EMAIL} not found in DB` }, { status: 404 });
  }

  const adminUser = user;
  const results: Record<string, boolean | string> = {};

  // Helper: send with cooldown bypassed (cooldownHours=0 skips rate-limit)
  // We temporarily remove any recent EmailLog for this user to bypass cooldowns
  async function sendBypassed(name: string, fn: () => Promise<boolean>) {
    // Delete recent logs for this email type so cooldown doesn't block
    await prisma.emailLog.deleteMany({
      where: { userId: adminUser.id, emailType: name },
    });
    try {
      results[name] = await fn();
    } catch (e) {
      results[name] = `error: ${e instanceof Error ? e.message : String(e)}`;
    }
  }

  const { id: userId, email: toEmail, name: toName } = adminUser;

  await sendBypassed("welcome", () =>
    sendWelcomeEmail({ userId, toEmail, toName })
  );

  await sendBypassed("day2_nudge", () =>
    sendDay2NudgeEmail({ userId, toEmail, toName })
  );

  await sendBypassed("streak_at_risk", () =>
    sendStreakAtRiskEmail({ userId, toEmail, toName, streakCount: 12, nextLessonTitle: "How great PMs say no without killing morale" })
  );

  await sendBypassed("pro_nudge_7day", () =>
    sendProNudgeEmail({ userId, toEmail, toName, streakCount: 7, creditsLeft: 10, variant: "7day" })
  );

  await sendBypassed("pro_nudge_14day", () =>
    sendProNudgeEmail({ userId, toEmail, toName, streakCount: 14, creditsLeft: 8, variant: "14day" })
  );

  await sendBypassed("reengagement_3day", () =>
    sendReengagementEmail({ userId, toEmail, toName, streakCount: 5, daysInactive: 3, variant: "3day" })
  );

  await sendBypassed("reengagement_7day", () =>
    sendReengagementEmail({ userId, toEmail, toName, streakCount: 0, daysInactive: 7, variant: "7day" })
  );

  await sendBypassed("weekly_digest", () =>
    sendWeeklyDigestEmail({
      userId, toEmail, toName,
      streakCount: 14, xp: 420, lessonsThisWeek: 5,
      plan: "free", creditsLeft: 3,
      leaderboardRank: 12,
      topFriend: { name: "Priya", lessonsCompleted: 7 },
      unusedFeature: "interview_prep",
    })
  );

  await sendBypassed("milestone_7", () =>
    sendMilestoneEmail({ userId, toEmail, toName, streakCount: 7, gemsEarned: 50 })
  );

  await sendBypassed("pro_winback", () =>
    sendProWinbackEmail({ userId, toEmail, toName, daysInactive: 8, creditsLeft: 15 })
  );

  await sendBypassed("challenge_received", () =>
    sendChallengeReceivedEmail({
      userId, toEmail, toName,
      fromName: "Rahul Mehta",
      message: "Let's see who finishes more lessons this week 👊",
    })
  );

  await sendBypassed("challenge_accepted", () =>
    sendChallengeAcceptedEmail({ userId, toEmail, toName, fromName: "Priya Singh" })
  );

  const sent = Object.values(results).filter((v) => v === true).length;
  const failed = Object.entries(results).filter(([, v]) => v !== true);

  return NextResponse.json({
    ok: true,
    sentTo: toEmail,
    sent,
    total: 12,
    results,
    ...(failed.length > 0 ? { failed } : {}),
  });
}
