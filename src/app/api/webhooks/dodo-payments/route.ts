import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  grantDodoPro,
  setDodoSubscriptionCancelling,
  revokeDodoPro,
  findUserByEmail,
} from "@/lib/billing/dodo-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function resolveUserId(email: string, customerId: string): Promise<string | null> {
  const user = await findUserByEmail(email);
  if (user) return user.id;

  const byCustomer = await prisma.user.findFirst({
    where: { paddleCustomerId: customerId },
    select: { id: true },
  });
  return byCustomer?.id ?? null;
}

function isDuplicateError(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      String((error as { code?: unknown }).code ?? "") === "P2002"
  );
}

async function recordDodoEvent(opts: {
  eventId: string | null;
  eventType: string;
  payload: unknown;
  userId?: string | null;
}): Promise<void> {
  if (!opts.eventId) return;
  try {
    await prisma.billingEvent.create({
      data: {
        provider: "dodo",
        eventType: opts.eventType,
        payload: JSON.stringify(opts.payload),
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

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Lazy import so the Webhooks factory (which validates the key) only runs at request time
  const { Webhooks } = await import("@dodopayments/nextjs");

  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
  if (!webhookKey) {
    console.error("[dodo-webhook] DODO_PAYMENTS_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  // Standard Webhooks message id — Dodo sends this in the `webhook-id` header
  // and we use it as `BillingEvent.externalId` for idempotency. Read it before
  // we hand the request to the Webhooks factory (which consumes the body).
  const eventId = req.headers.get("webhook-id");

  const handler = Webhooks({
    webhookKey,

    onSubscriptionActive: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
      await recordDodoEvent({
        eventId,
        eventType: payload.type,
        payload,
        userId,
      });
      if (!userId) {
        console.error("[dodo-webhook] onSubscriptionActive: user not found for", sub.customer.email);
        return;
      }
      await grantDodoPro({
        userId,
        dodoSubscriptionId: sub.subscription_id,
        productId: sub.product_id,
        nextBillingDate: new Date(sub.next_billing_date),
        customerId: sub.customer.customer_id,
      });
      console.log("[dodo-webhook] Pro granted for", sub.customer.email, "until", sub.next_billing_date);
    },

    onSubscriptionRenewed: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
      await recordDodoEvent({
        eventId,
        eventType: payload.type,
        payload,
        userId,
      });
      if (!userId) {
        console.error("[dodo-webhook] onSubscriptionRenewed: user not found for", sub.customer.email);
        return;
      }
      await grantDodoPro({
        userId,
        dodoSubscriptionId: sub.subscription_id,
        productId: sub.product_id,
        nextBillingDate: new Date(sub.next_billing_date),
        customerId: sub.customer.customer_id,
      });
      console.log("[dodo-webhook] Pro renewed for", sub.customer.email, "until", sub.next_billing_date);
    },

    onSubscriptionCancelled: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
      await recordDodoEvent({
        eventId,
        eventType: payload.type,
        payload,
        userId,
      });
      if (!userId) return;
      await setDodoSubscriptionCancelling({
        userId,
        dodoSubscriptionId: sub.subscription_id,
        cancelsAt: new Date(sub.next_billing_date),
      });
      console.log("[dodo-webhook] Cancellation scheduled for", sub.customer.email);
    },

    onSubscriptionExpired: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
      await recordDodoEvent({
        eventId,
        eventType: payload.type,
        payload,
        userId,
      });
      if (!userId) return;
      await revokeDodoPro({
        userId,
        dodoSubscriptionId: sub.subscription_id,
      });
      console.log("[dodo-webhook] Pro expired for", sub.customer.email);
    },

    onSubscriptionFailed: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
      await recordDodoEvent({
        eventId,
        eventType: payload.type,
        payload,
        userId,
      });
      if (!userId) return;
      await prisma.user.update({
        where: { id: userId },
        data: { billingStatus: "past_due" },
      });
      console.log("[dodo-webhook] Payment failed for", sub.customer.email);
    },
  });

  try {
    return await handler(req);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    console.error("[dodo-webhook] handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
