import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { serverEvents } from "@/lib/ga4-server";

const DODO_ENV =
  (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode" | undefined) ??
  "live_mode";

const DODO_BASE =
  DODO_ENV === "test_mode"
    ? "https://test.dodopayments.com"
    : "https://live.dodopayments.com";

const RETURN_URL =
  process.env.DODO_PAYMENTS_RETURN_URL ??
  `${process.env.NEXTAUTH_URL ?? ""}/dashboard?checkout=success`;

const DISCOUNTED_PRODUCTS: Record<string, string> = {
  monthly: process.env.NEXT_PUBLIC_DODO_MONTHLY_DISCOUNTED_PRODUCT_ID ?? "",
  quarterly: process.env.NEXT_PUBLIC_DODO_QUARTERLY_DISCOUNTED_PRODUCT_ID ?? "",
  yearly: process.env.NEXT_PUBLIC_DODO_YEARLY_DISCOUNTED_PRODUCT_ID ?? "",
};

const FALLBACK_PRODUCTS: Record<string, string> = {
  monthly: process.env.NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID ?? "",
  quarterly: process.env.NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID ?? "",
  yearly: process.env.NEXT_PUBLIC_DODO_YEARLY_PRODUCT_ID ?? "",
};

export async function GET(req: NextRequest) {
  // Resolve userId early so it\'s available for error tracking
  const userId = await getCurrentUserId();
  let sessionEmail: string | null = null;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    sessionEmail = user?.email ?? null;
  }

  const { searchParams } = req.nextUrl;
  const plan = searchParams.get("metadata_plan") ?? searchParams.get("plan");
  let productId = searchParams.get("productId");

  // If no productId provided but plan is, use the base product for that plan
  if (!productId && plan) {
    productId = FALLBACK_PRODUCTS[plan];
  }

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  if (productId.trim() === "") {
    console.error("[checkout] productId resolved to empty string — check DODO product ID env vars");
    if (userId) await serverEvents.checkoutError(userId, "empty_product_id");
    return NextResponse.json({ error: "Checkout is misconfigured. Please contact support." }, { status: 500 });
  }

  // Construct the checkout URL
  const checkoutUrl = new URL(
    `${DODO_BASE.replace("live.dodopayments.com", "checkout.dodopayments.com").replace("test.dodopayments.com", "test.checkout.dodopayments.com")}/buy/${productId}`
  );

  checkoutUrl.searchParams.set("quantity", "1");
  checkoutUrl.searchParams.set("redirect_url", RETURN_URL);

  const email = searchParams.get("email");
  if (email) checkoutUrl.searchParams.set("email", email);

  // Resolve the authenticated user's email for coupon ownership checks


  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("metadata_")) {
      checkoutUrl.searchParams.set(key, value);
    }
    if (key === "discount_code") {
      const coupon = await prisma.coupon.findUnique({ where: { code: value } });
      if (coupon) {
        const isGlobal = coupon.email === "*";
        // Signed-in: validate against session email to prevent coupon theft
        const emailMatch = sessionEmail && coupon.email.toLowerCase() === sessionEmail.toLowerCase();
        // Signed-out: allow if the URL carries the matching email (e.g. email link flow).
        // Dodo will still gate the purchase to that email at payment time.
        const urlEmailMatch = !sessionEmail && email && coupon.email.toLowerCase() === email.toLowerCase();

        if (isGlobal || emailMatch || urlEmailMatch) {
          checkoutUrl.searchParams.set(key, value);
        }
      }
    }
  }

  // Track checkout initiation before redirect
  if (userId) {
    await serverEvents.checkoutInitiated(userId, plan ?? "unknown");
    await serverEvents.checkoutDodoRedirect(userId);
  }

  return NextResponse.redirect(checkoutUrl.toString());
}
