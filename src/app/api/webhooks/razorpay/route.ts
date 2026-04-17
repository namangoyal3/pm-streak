import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  ensureRazorpayPaymentCaptured,
  extractRazorpayOrderContext,
  fetchRazorpayOrder,
  grantRazorpayPro,
  getRazorpayPlanConfig,
  isRazorpayWebhookConfigured,
  type RazorpayPlan,
  type RazorpayWebhookBody,
} from "@/lib/billing/razorpay-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isDuplicateError(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      String((error as { code?: unknown }).code ?? "") === "P2002"
  );
}

function parseString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isRazorpayPlan(value: string | null): value is RazorpayPlan {
  return value === "monthly" || value === "quarterly" || value === "yearly";
}

function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret) return false;

  const expected = awaitableHash(rawBody, secret);
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(signature, "utf8"));
}

function awaitableHash(message: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

async function recordWebhookEvent(opts: {
  eventId: string | null;
  eventType: string;
  payload: string;
  userId?: string | null;
}) {
  if (!opts.eventId) return;
  try {
    await prisma.billingEvent.create({
      data: {
        provider: "razorpay",
        eventType: opts.eventType,
        payload: opts.payload,
        externalId: opts.eventId,
        userId: opts.userId ?? null,
      },
    });
  } catch (error) {
    if (!isDuplicateError(error)) {
      throw error;
    }
  }
}

function getPlanFromNotes(notes: Record<string, unknown> | undefined | null): RazorpayPlan | null {
  const plan = parseString(notes?.plan);
  return isRazorpayPlan(plan) ? plan : null;
}

function getUserIdFromNotes(notes: Record<string, unknown> | undefined | null): string | null {
  return parseString(notes?.app_user_id) ?? parseString(notes?.user_id);
}

export async function POST(req: NextRequest) {
  if (!isRazorpayWebhookConfigured()) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  const eventId = req.headers.get("x-razorpay-event-id");

  if (!signature || !verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
  }

  let body: RazorpayWebhookBody;
  try {
    body = JSON.parse(rawBody) as RazorpayWebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = body.event ?? "unknown";
  const payment = body.payload?.payment?.entity ?? null;
  const orderFromWebhook = body.payload?.order?.entity ?? null;

  try {
    if (eventType === "payment.failed") {
      const failedUserId = getUserIdFromNotes(payment?.notes);
      await recordWebhookEvent({
        eventId,
        eventType,
        payload: rawBody,
        userId: failedUserId,
      });
      return NextResponse.json({ received: true });
    }

    if (!payment) {
      await recordWebhookEvent({
        eventId,
        eventType,
        payload: rawBody,
      });
      return NextResponse.json({ received: true });
    }

    const orderId = payment.order_id ?? orderFromWebhook?.id ?? null;
    const order =
      orderFromWebhook ??
      (orderId ? await fetchRazorpayOrder(orderId) : null);

    if (!order || !orderId) {
      return NextResponse.json(
        { error: "Webhook missing order context" },
        { status: 400 }
      );
    }

    const orderContext = extractRazorpayOrderContext(order);
    const plan = orderContext.plan ?? getPlanFromNotes(payment.notes);
    const userId = orderContext.userId ?? getUserIdFromNotes(payment.notes);

    if (!plan || !userId) {
      return NextResponse.json(
        { error: "Webhook missing user or plan context" },
        { status: 400 }
      );
    }

    const planConfig = getRazorpayPlanConfig(plan);
    if (order.amount !== planConfig.amount || order.currency !== "INR") {
      return NextResponse.json(
        { error: "Webhook amount mismatch" },
        { status: 400 }
      );
    }

    const captured = await ensureRazorpayPaymentCaptured(payment.id);
    if (captured.order_id !== order.id) {
      return NextResponse.json(
        { error: "Webhook payment order mismatch" },
        { status: 400 }
      );
    }
    if (captured.amount !== planConfig.amount || captured.currency !== "INR") {
      return NextResponse.json(
        { error: "Webhook captured amount mismatch" },
        { status: 400 }
      );
    }

    const paidAt =
      typeof captured.created_at === "number"
        ? new Date(captured.created_at * 1000)
        : new Date();

    await grantRazorpayPro({
      userId,
      paymentId: captured.id,
      orderId: order.id,
      plan,
      paidAt,
    });

    await recordWebhookEvent({
      eventId,
      eventType,
      payload: rawBody,
      userId,
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
