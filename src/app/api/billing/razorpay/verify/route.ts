import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  ensureRazorpayPaymentCaptured,
  extractRazorpayOrderContext,
  fetchRazorpayOrder,
  grantRazorpayPro,
  getRazorpayPlanConfig,
  type RazorpayPlan,
  verifyRazorpayCheckoutSignature,
} from "@/lib/billing/razorpay-server";
import { recordUserFunnelEvent } from "@/lib/acquisition";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isRazorpayPlan(value: string | null): value is RazorpayPlan {
  return value === "monthly" || value === "quarterly" || value === "yearly";
}

function isDuplicateError(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      String((error as { code?: unknown }).code ?? "") === "P2002"
  );
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: {
    plan?: string;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  };

  try {
    body = (await req.json()) as {
      plan?: string;
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const requestedPlan = body.plan ?? null;
  if (!isRazorpayPlan(requestedPlan)) {
    return NextResponse.json(
      { error: "plan must be monthly, quarterly, or yearly" },
      { status: 400 }
    );
  }

  const paymentId = body.razorpay_payment_id?.trim();
  const orderId = body.razorpay_order_id?.trim();
  const signature = body.razorpay_signature?.trim();

  if (!paymentId || !orderId || !signature) {
    return NextResponse.json(
      { error: "Missing Razorpay payment fields" },
      { status: 400 }
    );
  }

  if (!verifyRazorpayCheckoutSignature({ orderId, paymentId, signature })) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 401 });
  }

  try {
    const order = await fetchRazorpayOrder(orderId);
    const orderContext = extractRazorpayOrderContext(order);

    if (orderContext.userId && orderContext.userId !== userId) {
      return NextResponse.json({ error: "Payment does not belong to this account" }, { status: 403 });
    }

    if (orderContext.plan && orderContext.plan !== requestedPlan) {
      return NextResponse.json({ error: "Payment plan mismatch" }, { status: 400 });
    }

    const resolvedPlan = orderContext.plan ?? requestedPlan;
    if (!resolvedPlan) {
      return NextResponse.json({ error: "Missing payment plan" }, { status: 400 });
    }

    const planConfig = getRazorpayPlanConfig(resolvedPlan);
    if (order.amount !== planConfig.amount || order.currency !== "INR") {
      return NextResponse.json({ error: "Payment amount mismatch" }, { status: 400 });
    }

    const payment = await ensureRazorpayPaymentCaptured(paymentId);
    if (payment.order_id !== orderId) {
      return NextResponse.json({ error: "Payment order mismatch" }, { status: 400 });
    }
    if (payment.amount !== planConfig.amount || payment.currency !== "INR") {
      return NextResponse.json({ error: "Captured amount mismatch" }, { status: 400 });
    }

    const paidAt =
      typeof payment.created_at === "number"
        ? new Date(payment.created_at * 1000)
        : new Date();

    const result = await grantRazorpayPro({
      userId,
      paymentId: payment.id,
      orderId,
      plan: resolvedPlan,
      paidAt,
    });

    try {
      await prisma.billingEvent.create({
        data: {
          provider: "razorpay",
          eventType: "checkout_verified",
          payload: JSON.stringify({
            orderId,
            paymentId: payment.id,
            plan: resolvedPlan,
            amount: payment.amount,
            currency: payment.currency,
            currentPeriodEnd: result.currentPeriodEnd.toISOString(),
          }),
          externalId: payment.id,
          userId,
        },
      });
    } catch (error) {
      if (!isDuplicateError(error)) {
        throw error;
      }
    }

    await recordUserFunnelEvent({
      userId,
      eventName: "payment_completed",
      metadata: {
        provider: "razorpay",
        plan: resolvedPlan,
        amount: payment.amount,
        currency: payment.currency,
        paymentId: payment.id,
      },
    });

    return NextResponse.json({
      ok: true,
      gateway: "razorpay",
      plan: resolvedPlan,
      currentPeriodEnd: result.currentPeriodEnd.toISOString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
