import { NextRequest, NextResponse } from "next/server";

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

/**
 * GET /api/checkout?productId=xxx&email=yyy&metadata_userId=zzz&metadata_plan=monthly
 * Calls Dodo to build a checkout URL and redirects the browser there.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  // Build Dodo checkout URL directly
  const checkoutUrl = new URL(
    `${DODO_BASE.replace("live.dodopayments.com", "checkout.dodopayments.com").replace("test.dodopayments.com", "test.checkout.dodopayments.com")}/buy/${productId}`
  );

  checkoutUrl.searchParams.set("quantity", "1");
  checkoutUrl.searchParams.set("redirect_url", RETURN_URL);
  checkoutUrl.searchParams.set("coupon_code", "FLAT70");

  const email = searchParams.get("email");
  if (email) checkoutUrl.searchParams.set("email", email);

  // Pass through any metadata_* params
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("metadata_")) {
      checkoutUrl.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(checkoutUrl.toString());
}
