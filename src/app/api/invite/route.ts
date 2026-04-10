import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, streakCount: true, xp: true, level: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const referralCode = Buffer.from(userId).toString("base64url");

  return NextResponse.json({
    referralCode,
    user: {
      name: user.name,
      streakCount: user.streakCount,
      xp: user.xp,
      level: user.level,
    },
    shareLinks: {
      twitter: buildTwitterLink(user.name, user.streakCount, referralCode),
      linkedin: buildLinkedInLink(referralCode),
      whatsapp: buildWhatsAppLink(user.name, user.streakCount, referralCode),
      email: buildEmailLink(user.name, user.streakCount, referralCode),
      copyLink: buildReferralUrl(referralCode),
    },
    shareMessages: {
      twitter: `I'm on a ${user.streakCount}-day streak learning PM skills on PM Streak! Daily micro-lessons from top PM leaders. Join me:`,
      linkedin: `Building my product management skills with daily micro-lessons from Lenny's Podcast on PM Streak. ${user.xp} XP and counting!`,
      whatsapp: `Hey! I've been using PM Streak to learn product management in 2-3 mins/day. I'm on a ${user.streakCount}-day streak! Check it out:`,
      email: `I thought you'd like PM Streak - daily PM micro-lessons powered by Lenny's Podcast. I'm on a ${user.streakCount}-day streak!`,
    },
  });
}

function buildReferralUrl(code: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  return `${base}/invite?ref=${code}`;
}

function buildTwitterLink(name: string, streak: number, code: string) {
  const text = `I'm on a ${streak}-day streak learning PM skills on @PMStreak! Daily micro-lessons from @LennyRachitsky's Podcast. Join me 🔥`;
  const url = buildReferralUrl(code);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

function buildLinkedInLink(code: string) {
  const url = buildReferralUrl(code);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
}

function buildWhatsAppLink(name: string, streak: number, code: string) {
  const text = `Hey! I've been using PM Streak to learn product management in 2-3 mins/day. I'm on a ${streak}-day streak! Check it out: ${buildReferralUrl(code)}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

function buildEmailLink(name: string, streak: number, code: string) {
  const subject = `${name} invited you to PM Streak`;
  const body = `Hey!\n\nI've been using PM Streak to learn product management in 2-3 minutes a day — daily micro-lessons from top PM leaders.\n\nI'm on a ${streak}-day streak with the goal of learning something new every day.\n\nJoin me here: ${buildReferralUrl(code)}\n\n- ${name}`;
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
