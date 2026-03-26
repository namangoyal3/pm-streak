/**
 * Email sending via Resend (open-source SDK: github.com/resend/resend-node)
 * Templates built with React Email (open-source: github.com/resend/react-email)
 *
 * All sends are logged to EmailLog for analytics (open/click tracked via Resend webhooks).
 * Rate-limiting: checked before send via EmailLog — no duplicate sends per type per window.
 */
import React from "react";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { prisma } from "./prisma";
import crypto from "node:crypto";

// ── client ─────────────────────────────────────────────────────────────────

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";
// EMAIL_FROM must be set to a verified Resend domain — e.g. "Naman @ PM Streak <naman@yourdomain.com>"
// Without it, Resend's @resend.dev sandbox only delivers to the account owner's email.
const FROM = process.env.EMAIL_FROM;
if (!FROM) {
  console.error("[email] EMAIL_FROM env var is not set. Emails will NOT be delivered to users. Set a verified Resend domain sender.");
}

// ── unsubscribe token ──────────────────────────────────────────────────────

export function generateUnsubscribeToken(userId: string): string {
  const secret = process.env.UNSUBSCRIBE_SECRET || "pm-streak-unsub-secret";
  return crypto.createHmac("sha256", secret).update(userId).digest("hex").slice(0, 32);
}

export function verifyUnsubscribeToken(userId: string, token: string): boolean {
  return generateUnsubscribeToken(userId) === token;
}

// ── rate-limit guard ───────────────────────────────────────────────────────

async function alreadySent(userId: string, emailType: string, cooldownHours: number): Promise<boolean> {
  if (cooldownHours === 0) return false;
  const since = new Date(Date.now() - cooldownHours * 60 * 60 * 1000);
  const existing = await prisma.emailLog.findFirst({
    where: { userId, emailType, sentAt: { gte: since } },
    select: { id: true },
  });
  return !!existing;
}

// ── core send helper ───────────────────────────────────────────────────────

async function sendEmail({
  userId,
  emailType,
  toEmail,
  subject,
  reactElement,
  cooldownHours = 20,
}: {
  userId: string;
  emailType: string;
  toEmail: string;
  subject: string;
  reactElement: React.ReactElement;
  cooldownHours?: number;
}): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailOptOut: true },
  });
  if (user?.emailOptOut) return false;

  if (await alreadySent(userId, emailType, cooldownHours)) return false;

  const resend = getResend();
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set — skipping send");
    return false;
  }

  if (!FROM) {
    console.error(`[email] EMAIL_FROM not set — skipping send of ${emailType} to ${toEmail}`);
    return false;
  }

  const html = await render(reactElement);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: toEmail,
      subject,
      html,
      headers: {
        "List-Unsubscribe": `<${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}>`,
      },
    });

    if (error || !data) {
      console.error(`[email] Resend error for ${emailType}:`, error);
      return false;
    }

    await prisma.emailLog.create({
      data: { userId, emailType, resendId: data.id },
    });

    return true;
  } catch (err) {
    console.error(`[email] Send failed for ${emailType}:`, err instanceof Error ? err.message : err);
    return false;
  }
}

// ── lazy template imports ──────────────────────────────────────────────────
// Imported lazily to avoid build-time JSX issues in non-React contexts

async function getTemplates() {
  const [
    { WelcomeEmail },
    { Day2NudgeEmail },
    { StreakAtRiskEmail },
    { ProNudgeEmail },
    { ReengagementEmail },
    { WeeklyDigestEmail },
    { MilestoneEmail },
    { ProWinbackEmail },
    { ChallengeReceivedEmail },
    { ChallengeAcceptedEmail },
  ] = await Promise.all([
    import("@/emails/welcome"),
    import("@/emails/day2-nudge"),
    import("@/emails/streak-at-risk"),
    import("@/emails/pro-nudge"),
    import("@/emails/reengagement"),
    import("@/emails/weekly-digest"),
    import("@/emails/milestone"),
    import("@/emails/pro-winback"),
    import("@/emails/challenge-received"),
    import("@/emails/challenge-accepted"),
  ]);
  return {
    WelcomeEmail, Day2NudgeEmail, StreakAtRiskEmail, ProNudgeEmail,
    ReengagementEmail, WeeklyDigestEmail, MilestoneEmail, ProWinbackEmail,
    ChallengeReceivedEmail, ChallengeAcceptedEmail,
  };
}

// ── public send functions ──────────────────────────────────────────────────

export async function sendWelcomeEmail({
  userId, toEmail, toName,
}: { userId: string; toEmail: string; toName: string }) {
  const { WelcomeEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "welcome", toEmail,
    subject: `${first}, your first lesson is a 3-minute shortcut to thinking like a top-10% PM`,
    reactElement: React.createElement(WelcomeEmail, { firstName: first, unsubscribeUrl }),
    cooldownHours: 0,
  });
}

export async function sendDay2NudgeEmail({
  userId, toEmail, toName,
}: { userId: string; toEmail: string; toName: string }) {
  const { Day2NudgeEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "day2_nudge", toEmail,
    subject: `${first}, you still haven't started (your 48h window is closing)`,
    reactElement: React.createElement(Day2NudgeEmail, { firstName: first, unsubscribeUrl }),
    cooldownHours: 24,
  });
}

export async function sendStreakAtRiskEmail({
  userId, toEmail, toName, streakCount, nextLessonTitle,
}: { userId: string; toEmail: string; toName: string; streakCount: number; nextLessonTitle?: string }) {
  const { StreakAtRiskEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "streak_at_risk", toEmail,
    subject: getStreakSubject(first, streakCount),
    reactElement: React.createElement(StreakAtRiskEmail, {
      firstName: first, streakCount, nextLessonTitle, unsubscribeUrl,
    }),
    cooldownHours: 20,
  });
}

export async function sendProNudgeEmail({
  userId, toEmail, toName, streakCount, creditsLeft, variant,
}: { userId: string; toEmail: string; toName: string; streakCount: number; creditsLeft: number; variant: "7day" | "14day" }) {
  const { ProNudgeEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: `pro_nudge_${variant}`, toEmail,
    subject: variant === "14day"
      ? `${first}, ${streakCount} days of consistency deserves deeper learning`
      : `Your ${streakCount}-day streak unlocked something — most free users never see it`,
    reactElement: React.createElement(ProNudgeEmail, {
      firstName: first, streakCount, creditsLeft, variant, unsubscribeUrl,
    }),
    cooldownHours: 7 * 24,
  });
}

export async function sendReengagementEmail({
  userId, toEmail, toName, streakCount, daysInactive, variant,
}: { userId: string; toEmail: string; toName: string; streakCount: number; daysInactive: number; variant: "3day" | "7day" }) {
  const { ReengagementEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: `reengagement_${variant}`, toEmail,
    subject: variant === "7day"
      ? `${first}, we built new things while you were gone`
      : streakCount > 0
        ? `Your ${streakCount}-day streak is gone. Here's how to start a better one.`
        : `${first}, it's been 3 days. One lesson brings the habit back.`,
    reactElement: React.createElement(ReengagementEmail, {
      firstName: first, streakCount, daysInactive, variant, unsubscribeUrl,
    }),
    cooldownHours: 72,
  });
}

export async function sendWeeklyDigestEmail({
  userId, toEmail, toName, streakCount, xp, lessonsThisWeek, plan, creditsLeft,
  leaderboardRank, topFriend, unusedFeature,
}: {
  userId: string; toEmail: string; toName: string; streakCount: number; xp: number;
  lessonsThisWeek: number; plan: string; creditsLeft: number;
  leaderboardRank?: number;
  topFriend?: { name: string; lessonsCompleted: number };
  unusedFeature?: "interview_prep" | "ai_lessons" | "jobs";
}) {
  const { WeeklyDigestEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  const subjectLine = lessonsThisWeek === 0
    ? `${first}, your PM learning streak is at risk this week`
    : streakCount >= 14
      ? `${streakCount} days 🔥 ${first}'s weekly PM recap`
      : `Your PM week: ${lessonsThisWeek} lessons, ${streakCount}-day streak`;
  return sendEmail({
    userId, emailType: "weekly_digest", toEmail,
    subject: subjectLine,
    reactElement: React.createElement(WeeklyDigestEmail, {
      firstName: first, streakCount, xp, lessonsThisWeek,
      plan: plan as "free" | "pro", creditsLeft,
      leaderboardRank, topFriend, unusedFeature,
      unsubscribeUrl,
    }),
    cooldownHours: 6 * 24,
  });
}

export async function sendMilestoneEmail({
  userId, toEmail, toName, streakCount, gemsEarned,
}: { userId: string; toEmail: string; toName: string; streakCount: number; gemsEarned: number }) {
  const { MilestoneEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  const milestoneEmoji: Record<number, string> = { 7: "⚡", 14: "💎", 30: "👑", 50: "🏆", 100: "🌟" };
  const emoji = milestoneEmoji[streakCount] ?? "🔥";
  return sendEmail({
    userId, emailType: `milestone_${streakCount}`, toEmail,
    subject: `${emoji} ${streakCount} days, ${first} — you're in the top ${streakCount >= 30 ? "3%" : "15%"} of PM learners`,
    reactElement: React.createElement(MilestoneEmail, {
      firstName: first, streakCount, gemsEarned, unsubscribeUrl,
    }),
    cooldownHours: 0,
  });
}

export async function sendProWinbackEmail({
  userId, toEmail, toName, daysInactive, creditsLeft,
}: { userId: string; toEmail: string; toName: string; daysInactive: number; creditsLeft: number }) {
  const { ProWinbackEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "pro_winback", toEmail,
    subject: `${first}, ${creditsLeft} Pro credits are expiring unused`,
    reactElement: React.createElement(ProWinbackEmail, {
      firstName: first, daysInactive, creditsLeft, unsubscribeUrl,
    }),
    cooldownHours: 7 * 24,
  });
}

export async function sendChallengeReceivedEmail({
  userId, toEmail, toName, fromName, message,
}: { userId: string; toEmail: string; toName: string; fromName: string; message: string }) {
  const { ChallengeReceivedEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "challenge_received", toEmail,
    subject: `${fromName} challenged you to a PM duel ⚔️`,
    reactElement: React.createElement(ChallengeReceivedEmail, {
      firstName: first, fromName, message, unsubscribeUrl,
    }),
    cooldownHours: 0,
  });
}

export async function sendChallengeAcceptedEmail({
  userId, toEmail, toName, fromName,
}: { userId: string; toEmail: string; toName: string; fromName: string }) {
  const { ChallengeAcceptedEmail } = await getTemplates();
  const first = toName.split(" ")[0];
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?token=${generateUnsubscribeToken(userId)}&userId=${userId}`;
  return sendEmail({
    userId, emailType: "challenge_accepted", toEmail,
    subject: `${fromName} accepted 🔥 Don't let them beat you`,
    reactElement: React.createElement(ChallengeAcceptedEmail, {
      firstName: first, fromName, unsubscribeUrl,
    }),
    cooldownHours: 0,
  });
}

// ── transactional (no logging needed) ─────────────────────────────────────

export async function sendPasswordResetEmail({
  toEmail, toName, resetUrl,
}: { toEmail: string; toName: string; resetUrl: string }) {
  const resend = getResend();
  if (!resend || !FROM) return;
  const first = toName.split(" ")[0] || "there";
  await resend.emails.send({
    from: FROM, to: toEmail,
    subject: "Reset your PM Streak password",
    html: `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:480px;margin:32px auto;padding:24px">
      <h2 style="color:#111">Reset your PM Streak password</h2>
      <p style="color:#374151">Hi ${first}, click below to reset your password. Expires in 30 minutes.</p>
      <a href="${resetUrl}" style="display:inline-block;background:#58cc02;color:#fff;font-weight:700;padding:12px 28px;border-radius:10px;text-decoration:none;margin:16px 0">Reset password →</a>
      <p style="color:#9ca3af;font-size:13px">If you didn't request this, ignore this email.</p>
    </body></html>`,
  });
}

// ── analytics ─────────────────────────────────────────────────────────────

export async function markEmailOpened(resendId: string) {
  await prisma.emailLog.updateMany({
    where: { resendId },
    data: { openedAt: new Date() },
  });
}

export async function markEmailClicked(resendId: string) {
  await prisma.emailLog.updateMany({
    where: { resendId },
    data: { clickedAt: new Date() },
  });
}

// ── helpers ────────────────────────────────────────────────────────────────

function getStreakSubject(firstName: string, streak: number): string {
  if (streak >= 30) return `⚠️ ${streak} days → 0. Not on your watch, ${firstName}.`;
  if (streak >= 14) return `${streak}-day streak. 3 minutes to save it. ${firstName}, go.`;
  if (streak >= 7) return `Your ${streak}-day streak resets at midnight, ${firstName} 🔥`;
  if (streak >= 3) return `Don't let ${streak} days end tonight, ${firstName}`;
  return `Today's lesson is 3 minutes, ${firstName}. Your streak is waiting.`;
}
