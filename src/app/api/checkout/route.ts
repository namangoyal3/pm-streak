import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { serverEvents } from "@/lib/ga4-server";
import { recordAcquisitionEvent } from "@/lib/acquisition";

// Env values are trimmed: several Dodo IDs were stored with a trailing newline,
// which leaked into checkout URLs as %0A and into the post-payment redirect_url.
const env = (key: string): string => (process.env[key] ?? "").trim();

const DODO_ENV =
  (env("DODO_PAYMENTS_ENVIRONMENT") as "test_mode" | "live_mode" | "") || "live_mode";

const DODO_BASE =
  DODO_ENV === "test_mode"
    ? "https://test.dodopayments.com"
    : "https://live.dodopayments.com";

const RETURN_URL =
  env("DODO_PAYMENTS_RETURN_URL") ||
  `${env("NEXTAUTH_URL")}/dashboard?checkout=success`;

const FALLBACK_PRODUCTS: Record<string, string> = {
  monthly: env("NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID"),
  quarterly: env("NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID"),
  yearly: env("NEXT_PUBLIC_DODO_YEARLY_PRODUCT_ID"),
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

  // Fire checkout_initiated at the start of every GET — anonymous users count
  // for funnel observability too.
  await serverEvents.checkoutInitiated(userId, plan ?? "unknown");
  if (userId) {
    await recordAcquisitionEvent({
      userId,
      eventName: "checkout_initiated",
      req,
      metadata: {
        plan: plan ?? "unknown",
        gateway: "dodo",
      },
    });
  }

  // Trim caller-supplied productId too — pricing page links were built from
  // newline-contaminated env vars, so ?productId=pdt_xxx%0A reaches us here.
  if (productId) productId = productId.trim();

  // The plan's configured product is authoritative. This makes env the single
  // source of truth for which product a plan buys, so a price/product change is
  // an env update (no reliance on the pricing page's baked-in link), AND it
  // stops a caller from checking out an arbitrary ?productId of their choosing.
  // Only fall back to the URL productId when the plan is unknown/unconfigured.
  if (plan && FALLBACK_PRODUCTS[plan]) {
    productId = FALLBACK_PRODUCTS[plan];
  } else if (!productId && plan) {
    productId = FALLBACK_PRODUCTS[plan];
  }

  if (!productId) {
    await serverEvents.checkoutError(userId, "missing_product_id");
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  if (productId.trim() === "") {
    console.error("[checkout] productId resolved to empty string — check DODO product ID env vars");
    await serverEvents.checkoutError(userId, "empty_product_id");
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

  // Fire checkout_dodo_redirect immediately before the redirect so the funnel
  // shows the last server-observable step before Dodo takes over.
  await serverEvents.checkoutDodoRedirect(userId);

  return NextResponse.redirect(checkoutUrl.toString());
}
