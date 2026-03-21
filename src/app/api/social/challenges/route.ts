import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendChallengeReceivedEmail, sendChallengeAcceptedEmail } from "@/lib/email";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const received = await prisma.friendChallenge.findMany({
    where: { challengeeId: userId, status: "pending" },
    include: {
      challenger: { select: { name: true, level: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const sent = await prisma.friendChallenge.findMany({
    where: { challengerId: userId },
    include: {
      challengee: { select: { name: true, level: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return NextResponse.json({ received, sent });
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { challengeeId, message } = await req.json();

  if (!challengeeId || challengeeId === userId) {
    return NextResponse.json({ error: "Invalid challenge target" }, { status: 400 });
  }

  const [challenger, challengee] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
    prisma.user.findUnique({ where: { id: challengeeId }, select: { name: true, email: true } }),
  ]);

  if (!challengee) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const finalMessage = message || "I challenge you to complete today's lesson!";

  const [challenge] = await Promise.all([
    prisma.friendChallenge.create({
      data: {
        challengerId: userId,
        challengeeId,
        message: finalMessage,
        status: "pending",
      },
    }),
    // Write in-app notification
    prisma.notification.create({
      data: {
        userId: challengeeId,
        fromUserId: userId,
        type: "challenge_received",
        payload: JSON.stringify({
          challengerName: challenger?.name,
          message: finalMessage,
        }),
      },
    }),
  ]);

  // Fire-and-forget email (don't block response)
  sendChallengeReceivedEmail({
    toEmail: challengee.email,
    toName: challengee.name,
    fromName: challenger?.name ?? "A friend",
    message: finalMessage,
  }).catch(() => {});

  return NextResponse.json({ challenge });
}

export async function PATCH(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { challengeId, action } = await req.json();

  const challenge = await prisma.friendChallenge.findUnique({
    where: { id: challengeId },
    include: {
      challenger: { select: { id: true, name: true, email: true } },
      challengee: { select: { name: true } },
    },
  });

  if (!challenge || challenge.challengeeId !== userId) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  const newStatus = action === "accept" ? "accepted" : "declined";

  await Promise.all([
    prisma.friendChallenge.update({
      where: { id: challengeId },
      data: { status: newStatus },
    }),
    // Notify the original challenger
    prisma.notification.create({
      data: {
        userId: challenge.challengerId,
        fromUserId: userId,
        type: `challenge_${newStatus}`,
        payload: JSON.stringify({
          challengeeName: challenge.challengee.name,
          challengeId,
        }),
      },
    }),
  ]);

  // Send email to challenger if accepted
  if (newStatus === "accepted") {
    sendChallengeAcceptedEmail({
      toEmail: challenge.challenger.email,
      toName: challenge.challenger.name,
      fromName: challenge.challengee.name,
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
