import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { isUserPro } from "@/lib/entitlements";
import {
  createRazorpayCheckoutOrder,
  isRazorpayConfigured,
  type RazorpayPlan,
} from "@/lib/billing/razorpay-server";
import { getValidCheckoutCoupon } from "@/lib/billing/checkout-coupons";
import RazorpayCheckoutLauncher from "@/components/RazorpayCheckoutLauncher";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, AlertTriangle } from "lucide-react";

function parsePlan(value: string | string[] | undefined): RazorpayPlan | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "monthly" || raw === "quarterly" || raw === "yearly") return raw;
  return null;
}

function getFirst(value: string | string[] | undefined): string | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

export default async function RazorpayCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const plan = parsePlan(resolvedSearchParams.plan ?? resolvedSearchParams.metadata_plan);
  if (!plan) {
    redirect("/pricing");
  }

  if (!isRazorpayConfigured()) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-amber-300">
            <ShieldCheck size={12} /> Razorpay not configured
          </div>
          <h1 className="text-3xl font-black tracking-tight">Checkout is not ready yet</h1>
          <p className="mt-3 max-w-lg text-sm text-white/60">
            Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to enable live Razorpay payments.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-black transition-colors hover:bg-white/90"
          >
            <ArrowLeft size={16} /> Back to pricing
          </Link>
        </div>
      </div>
    );
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    redirect("/login?redirect=/pricing");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      priceBand: true,
    },
  });

  if (!user) {
    redirect("/login?redirect=/pricing");
  }

  const isPro = await isUserPro(userId);
  if (isPro) {
    redirect("/dashboard?checkout=already-pro");
  }

  const couponCode = getFirst(resolvedSearchParams.discount_code);
  const coupon = await getValidCheckoutCoupon({
    code: couponCode,
    email: user.email,
    sessionEmail: user.email,
  });

  let orderPayload;
  try {
    orderPayload = await createRazorpayCheckoutOrder({
      userId: user.id,
      plan,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "We could not start Razorpay checkout.";
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-white">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-red-300">
            <AlertTriangle size={12} /> Checkout error
          </div>
          <h1 className="text-3xl font-black tracking-tight">We could not prepare your payment</h1>
          <p className="mt-3 max-w-lg text-sm text-white/60">{message}</p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-black transition-colors hover:bg-white/90"
          >
            <ArrowLeft size={16} /> Back to pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <RazorpayCheckoutLauncher
      keyId={orderPayload.keyId}
      orderPayload={orderPayload}
      redirectTo="/dashboard?checkout=success&gateway=razorpay"
    />
  );
}
