import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPaddleWebhookSignature } from "@/lib/billing/paddle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaddleSubPayload = {
  id?: string;
  status?: string;
  customer_id?: string;
  custom_data?: { user_id?: string };
  items?: Array<{ price?: { id?: string } }>;
  current_billing_period?: { ends_at?: string | null };
  canceled_at?: string | null;
};

function extractUserId(data: PaddleSubPayload): string | null {
  const uid = data.custom_data?.user_id;
  if (typeof uid === "string" && uid.length > 0) return uid;
  return null;
}

async function resolveUserId(
  data: PaddleSubPayload
): Promise<string | null> {
  const direct = extractUserId(data);
  if (direct) return direct;
  const cid = data.customer_id;
  if (!cid) return null;
  const u = await prisma.user.findFirst({
    where: { paddleCustomerId: cid },
    select: { id: true },
  });
  return u?.id ?? null;
}

async function handleSubscriptionEvent(
  eventType: string,
  raw: unknown,
  eventId?: string
): Promise<void> {
  const data = raw as PaddleSubPayload;
  const userId = await resolveUserId(data);
  const subId = data.id;
  const customerId = data.customer_id;
  const status = (data.status ?? "").toLowerCase();
  const priceId = data.items?.[0]?.price?.id ?? null;
  const endsAt = data.current_billing_period?.ends_at
    ? new Date(data.current_billing_period.ends_at)
    : null;

  try {
    await prisma.billingEvent.create({
      data: {
        userId,
        provider: "paddle",
        eventType,
        payload: JSON.stringify(raw),
        externalId: eventId,
      },
    });
  } catch (e: unknown) {
    const code =
      e && typeof e === "object" && "code" in e
        ? (e as { code?: string }).code
        : undefined;
    if (code === "P2002") {
      return;
    }
    throw e;
  }

  if (!userId || !subId) return;

  const activeLike =
    status === "active" || status === "trialing" || status === "past_due";

  if (activeLike) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "pro",
        billingStatus: status === "trialing" ? "trialing" : "active",
        billingProvider: "paddle",
        paddleCustomerId: customerId ?? undefined,
        renewsAt: endsAt,
        cancelsAt: null,
        trialEndsAt: null,
        priceBand: undefined,
      },
    });

    await prisma.subscription.upsert({
      where: { paddleSubscriptionId: subId },
      create: {
        userId,
        paddleSubscriptionId: subId,
        paddlePriceId: priceId,
        status: status === "trialing" ? "trialing" : "active",
        currentPeriodEnd: endsAt,
      },
      update: {
        paddlePriceId: priceId ?? undefined,
        status: status === "trialing" ? "trialing" : "active",
        currentPeriodEnd: endsAt,
      },
    });

    const keys = [
      "unlimited_ai_lessons",
      "deep_dives",
      "interview_sprint",
      "role_roadmaps",
      "saved_notes",
      "premium_recaps",
    ] as const;
    for (const key of keys) {
      await prisma.entitlement.upsert({
        where: { userId_key: { userId, key } },
        create: { userId, key, source: "subscription" },
        update: { expiresAt: null },
      });
    }
    return;
  }

  if (status === "canceled" || status === "cancelled") {
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "free",
        billingStatus: "canceled",
        cancelsAt: data.canceled_at ? new Date(data.canceled_at) : new Date(),
      },
    });
    await prisma.subscription.updateMany({
      where: { paddleSubscriptionId: subId },
      data: { status: "canceled" },
    });
    await prisma.entitlement.deleteMany({
      where: { userId, source: "subscription" },
    });
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const sig =
    req.headers.get("paddle-signature") ?? req.headers.get("Paddle-Signature");

  if (!verifyPaddleWebhookSignature(rawBody, sig, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: { event_type?: string; data?: unknown; event_id?: string };
  try {
    payload = JSON.parse(rawBody) as {
      event_type?: string;
      data?: unknown;
      event_id?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = payload.event_type ?? "";
  const eventId = payload.event_id;
  try {
    if (eventType.startsWith("subscription.")) {
      await handleSubscriptionEvent(eventType, payload.data, eventId);
    } else {
      try {
        await prisma.billingEvent.create({
          data: {
            provider: "paddle",
            eventType: eventType || "unknown",
            payload: rawBody,
            externalId: eventId,
          },
        });
      } catch {
        /* duplicate */
      }
    }
  } catch (e) {
    console.error("Paddle webhook handler error", e);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
