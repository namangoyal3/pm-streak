import crypto from "crypto";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import type { BillingInterval } from "./catalog";
import { computeUpiPeriodEnd } from "./upi-india-server";

const RAZORPAY_API_BASE = "https://api.razorpay.com/v1";

const PRO_KEYS = [
  "unlimited_ai_lessons",
  "deep_dives",
  "interview_sprint",
  "role_roadmaps",
  "saved_notes",
  "premium_recaps",
] as const;

const PLAN_CONFIG = {
  monthly: {
    amount: 24900,
    billingInterval: "month" as const,
    title: "Monthly Pro",
    description: "PM Streak Pro - Monthly",
  },
  quarterly: {
    amount: 66900,
    billingInterval: "quarter" as const,
    title: "Quarterly Pro",
    description: "PM Streak Pro - Quarterly",
  },
  yearly: {
    amount: 124900,
    billingInterval: "year" as const,
    title: "Yearly Pro",
    description: "PM Streak Pro - Yearly",
  },
} satisfies Record<
  BillingInterval,
  {
    amount: number;
    billingInterval: "month" | "quarter" | "year";
    title: string;
    description: string;
  }
>;

export type RazorpayPlan = BillingInterval;

export type RazorpayCheckoutConfig = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  notes: Record<string, string>;
};

export type RazorpayOrderEntity = {
  id: string;
  amount: number;
  amount_due?: number;
  amount_paid?: number;
  currency: string;
  receipt: string;
  status: string;
  notes?: Record<string, unknown> | null;
  created_at?: number;
};

export type RazorpayPaymentEntity = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  order_id: string | null;
  captured: boolean;
  email?: string | null;
  contact?: string | null;
  notes?: Record<string, unknown> | null;
  created_at?: number;
};

export type RazorpayWebhookBody = {
  event?: string;
  payload?: {
    order?: { entity?: RazorpayOrderEntity };
    payment?: { entity?: RazorpayPaymentEntity };
  };
};

export function getRazorpayPlanConfig(plan: RazorpayPlan) {
  return PLAN_CONFIG[plan];
}

export function isRazorpayConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() &&
      process.env.RAZORPAY_KEY_SECRET?.trim()
  );
}

export function isRazorpayWebhookConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_WEBHOOK_SECRET?.trim());
}

function getRazorpayKeyId(): string {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim();
  if (!keyId) {
    throw new Error("NEXT_PUBLIC_RAZORPAY_KEY_ID is not configured");
  }
  return keyId;
}

function getRazorpayKeySecret(): string {
  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!secret) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured");
  }
  return secret;
}

function getRazorpayWebhookSecret(): string {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim();
  if (!secret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  }
  return secret;
}

function getRazorpayAuthHeader(): string {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

async function razorpayRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`${RAZORPAY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: getRazorpayAuthHeader(),
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Razorpay API ${res.status}: ${text}`);
  }

  return text ? (JSON.parse(text) as T) : ({} as T);
}

function parseString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getBillingInterval(plan: RazorpayPlan): "month" | "quarter" | "year" {
  return PLAN_CONFIG[plan].billingInterval;
}

function upsertProEntitlements(userId: string, expiresAt: Date) {
  return Promise.all(
    PRO_KEYS.map((key) =>
      prisma.entitlement.upsert({
        where: { userId_key: { userId, key } },
        create: { userId, key, source: "razorpay", expiresAt },
        update: { source: "razorpay", expiresAt },
      })
    )
  );
}

function pickLatestExpiry(...dates: Array<Date | null | undefined>): Date {
  let latest = new Date();
  for (const candidate of dates) {
    if (!candidate || Number.isNaN(candidate.getTime())) continue;
    if (candidate > latest) {
      latest = candidate;
    }
  }
  return latest;
}

export function verifyRazorpayCheckoutSignature(params: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  const secret = getRazorpayKeySecret();
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${params.orderId}|${params.paymentId}`)
    .digest("hex");

  if (expected.length !== params.signature.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(params.signature, "utf8")
  );
}

export async function fetchRazorpayOrder(orderId: string) {
  return razorpayRequest<RazorpayOrderEntity>(
    `/orders/${encodeURIComponent(orderId)}`
  );
}

export async function fetchRazorpayPayment(paymentId: string) {
  return razorpayRequest<RazorpayPaymentEntity>(
    `/payments/${encodeURIComponent(paymentId)}`
  );
}

export async function captureRazorpayPayment(payment: RazorpayPaymentEntity) {
  if (payment.status === "captured" || payment.captured) {
    return payment;
  }

  if (payment.status !== "authorized") {
    throw new Error(`Payment ${payment.id} is ${payment.status}`);
  }

  return razorpayRequest<RazorpayPaymentEntity>(
    `/payments/${encodeURIComponent(payment.id)}/capture`,
    {
      method: "POST",
      body: JSON.stringify({
        amount: payment.amount,
        currency: payment.currency,
      }),
    }
  );
}

export async function ensureRazorpayPaymentCaptured(paymentId: string) {
  const payment = await fetchRazorpayPayment(paymentId);
  return captureRazorpayPayment(payment);
}

export function extractRazorpayOrderContext(order: RazorpayOrderEntity): {
  userId: string | null;
  plan: RazorpayPlan | null;
  email: string | null;
  notes: Record<string, unknown>;
} {
  const notes = (order.notes ?? {}) as Record<string, unknown>;
  const userId = parseString(notes.app_user_id) ?? parseString(notes.user_id);
  const planCandidate = parseString(notes.plan);
  const plan =
    planCandidate === "monthly" ||
    planCandidate === "quarterly" ||
    planCandidate === "yearly"
      ? planCandidate
      : null;

  return {
    userId,
    plan,
    email: parseString(notes.email),
    notes,
  };
}

export async function createRazorpayCheckoutOrder(opts: {
  userId: string;
  plan: RazorpayPlan;
}) {
  const user = await prisma.user.findUnique({
    where: { id: opts.userId },
    select: { email: true, name: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const planConfig = getRazorpayPlanConfig(opts.plan);
  const receipt = `rzp_${randomUUID()}`;
  const notes = {
    app_user_id: opts.userId,
    user_id: opts.userId,
    plan: opts.plan,
    billing_interval: planConfig.billingInterval,
    email: user.email,
    source: "pm-streak",
  };

  const order = await razorpayRequest<RazorpayOrderEntity>("/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: planConfig.amount,
      currency: "INR",
      receipt,
      notes,
    }),
  });

  return {
    keyId: getRazorpayKeyId(),
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    name: "PM Streak",
    description: planConfig.description,
    prefill: {
      name: user.name,
      email: user.email,
    },
    theme: {
      color: "#22c55e",
    },
    notes: {
      app_user_id: opts.userId,
      user_id: opts.userId,
      plan: opts.plan,
      billing_interval: planConfig.billingInterval,
      email: user.email,
      source: "pm-streak",
    },
  } satisfies RazorpayCheckoutConfig;
}

export async function grantRazorpayPro(opts: {
  userId: string;
  paymentId: string;
  orderId: string;
  plan: RazorpayPlan;
  paidAt?: Date;
}) {
  const now = opts.paidAt ?? new Date();
  const existingForPayment = await prisma.subscription.findFirst({
    where: {
      userId: opts.userId,
      provider: "razorpay",
      paddleSubscriptionId: opts.paymentId,
    },
    select: { currentPeriodEnd: true },
  });

  if (existingForPayment) {
    const currentPeriodEnd =
      existingForPayment.currentPeriodEnd ?? now;
    await upsertProEntitlements(opts.userId, currentPeriodEnd);
    await prisma.user.update({
      where: { id: opts.userId },
      data: {
        plan: "pro",
        billingStatus: "active",
        billingProvider: "razorpay",
        renewsAt: currentPeriodEnd,
        cancelsAt: null,
        currency: "INR",
        priceBand: "C",
      },
    });
    return { currentPeriodEnd, subscriptionId: opts.paymentId };
  }

  const latestActive = await prisma.subscription.findFirst({
    where: {
      userId: opts.userId,
      status: "active",
      currentPeriodEnd: { gt: now },
    },
    orderBy: { currentPeriodEnd: "desc" },
    select: { currentPeriodEnd: true },
  });
  const user = await prisma.user.findUnique({
    where: { id: opts.userId },
    select: { renewsAt: true },
  });

  const base = pickLatestExpiry(now, latestActive?.currentPeriodEnd, user?.renewsAt);
  const periodEnd = computeUpiPeriodEnd(base, getBillingInterval(opts.plan));

  try {
    await prisma.subscription.create({
      data: {
        userId: opts.userId,
        provider: "razorpay",
        paddleSubscriptionId: opts.paymentId,
        paddlePriceId: opts.plan,
        status: "active",
        billingInterval: getBillingInterval(opts.plan),
        currentPeriodEnd: periodEnd,
      },
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code?: unknown }).code ?? "")
        : "";
    if (code !== "P2002") {
      throw error;
    }
    const duplicate = await prisma.subscription.findFirst({
      where: {
        userId: opts.userId,
        provider: "razorpay",
        paddleSubscriptionId: opts.paymentId,
      },
      select: { currentPeriodEnd: true },
    });
    if (!duplicate) {
      throw error;
    }
    const currentPeriodEnd = duplicate.currentPeriodEnd ?? periodEnd;
    await upsertProEntitlements(opts.userId, currentPeriodEnd);
    await prisma.user.update({
      where: { id: opts.userId },
      data: {
        plan: "pro",
        billingStatus: "active",
        billingProvider: "razorpay",
        renewsAt: currentPeriodEnd,
        cancelsAt: null,
        currency: "INR",
        priceBand: "C",
      },
    });
    return { currentPeriodEnd, subscriptionId: opts.paymentId };
  }

  await upsertProEntitlements(opts.userId, periodEnd);
  await prisma.user.update({
    where: { id: opts.userId },
    data: {
      plan: "pro",
      billingStatus: "active",
      billingProvider: "razorpay",
      renewsAt: periodEnd,
      cancelsAt: null,
      currency: "INR",
      priceBand: "C",
    },
  });

  return { currentPeriodEnd: periodEnd, subscriptionId: opts.paymentId };
}

export async function resolveRazorpayOrderMetadata(
  orderId: string
): Promise<{
  userId: string | null;
  plan: RazorpayPlan | null;
  email: string | null;
  notes: Record<string, unknown>;
}> {
  const order = await fetchRazorpayOrder(orderId);
  return extractRazorpayOrderContext(order);
}
