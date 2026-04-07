import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  grantDodoPro,
  setDodoSubscriptionCancelling,
  revokeDodoPro,
  findUserByEmail,
} from "@/lib/billing/dodo-server";

async function resolveUserId(email: string, customerId: string): Promise<string | null> {
  const user = await findUserByEmail(email);
  if (user) return user.id;

  const byCustomer = await prisma.user.findFirst({
    where: { paddleCustomerId: customerId },
    select: { id: true },
  });
  return byCustomer?.id ?? null;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Lazy import so the Webhooks factory (which validates the key) only runs at request time
  const { Webhooks } = await import("@dodopayments/nextjs");

  const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
  if (!webhookKey) {
    console.error("[dodo-webhook] DODO_PAYMENTS_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const handler = Webhooks({
    webhookKey,

    onSubscriptionActive: async (payload) => {
      const sub = payload.data;
      const userId = await resolveUserId(sub.customer.email, sub.customer.customer_id);
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
      if (!userId) return;
      await prisma.user.update({
        where: { id: userId },
        data: { billingStatus: "past_due" },
      });
      console.log("[dodo-webhook] Payment failed for", sub.customer.email);
    },
  });

  return handler(req);
}
