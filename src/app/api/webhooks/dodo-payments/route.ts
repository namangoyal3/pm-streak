import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  grantDodoPro,
  setDodoSubscriptionCancelling,
  revokeDodoPro,
  findUserByEmail,
} from "@/lib/billing/dodo-server";
import { recordUserFunnelEvent } from "@/lib/acquisition";

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

/**
 * Page the team the first time we ever see a Dodo event of this type.
 * Counts existing rows in `BillingEvent` for (provider="dodo", eventType);
 * after `recordDodoEvent` inserts, count of 1 means this is the first.
 *
 * Best-effort: catches all errors internally so the webhook response is never
 * blocked by an alert failure. Skipped when Resend is not configured.
 *
 * Tracked under [LEA-7] AC 5.
 */
async function notifyFirstDodoEventOfType(opts: {
  eventType: string;
  payload: unknown;
}): Promise<void> {
  try {
    const count = await prisma.billingEvent.count({
      where: { provider: "dodo", eventType: opts.eventType },
    });
    if (count !== 1) return;

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;
    const to = process.env.OPS_ALERT_EMAIL;
    if (!apiKey || !from || !to) {
      console.warn(
        `[dodo-webhook] First ${opts.eventType} event — alert not sent (RESEND_API_KEY, EMAIL_FROM, or OPS_ALERT_EMAIL missing)`
      );
      return;
    }

    const isSuccess =
      opts.eventType === "subscription.active" ||
      opts.eventType === "subscription.renewed";
    const subject = isSuccess
      ? `[pm-streak] First Dodo ${opts.eventType} — paying customer captured`
      : `[pm-streak] First Dodo ${opts.eventType} — investigate`;
    const body = [
      `First Dodo event of type "${opts.eventType}" just landed in BillingEvent.`,
      ``,
      `Payload:`,
      `${JSON.stringify(opts.payload, null, 2)}`,
    ].join("\n");

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to, subject, text: body });
    console.log(`[dodo-webhook] First-${opts.eventType} alert sent to`, to);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      `[dodo-webhook] First-${opts.eventType} alert send failed:`,
      message
    );
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
      await notifyFirstDodoEventOfType({ eventType: payload.type, payload });
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
      await recordUserFunnelEvent({
        userId,
        eventName: "payment_completed",
        metadata: {
          provider: "dodo",
          eventType: payload.type,
          productId: sub.product_id,
          subscriptionId: sub.subscription_id,
        },
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
      await notifyFirstDodoEventOfType({ eventType: payload.type, payload });
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
      await recordUserFunnelEvent({
        userId,
        eventName: "subscription_renewed",
        metadata: {
          provider: "dodo",
          eventType: payload.type,
          productId: sub.product_id,
          subscriptionId: sub.subscription_id,
        },
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
      await notifyFirstDodoEventOfType({ eventType: payload.type, payload });
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
      await notifyFirstDodoEventOfType({ eventType: payload.type, payload });
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
      await notifyFirstDodoEventOfType({ eventType: payload.type, payload });
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
