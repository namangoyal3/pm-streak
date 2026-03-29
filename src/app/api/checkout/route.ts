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

  // Construct the checkout URL
  const checkoutUrl = new URL(
    `${DODO_BASE.replace("live.dodopayments.com", "checkout.dodopayments.com").replace("test.dodopayments.com", "test.checkout.dodopayments.com")}/buy/${productId}`
  );

  // Apply FLAT70 coupon by default if it's one of our standard plans
  // Unless we specifically received a productId that is one of the pre-discounted ones
  const isPreDiscounted = Object.values(DISCOUNTED_PRODUCTS).includes(productId);
  if (!isPreDiscounted && (plan || searchParams.has("metadata_plan"))) {
    checkoutUrl.searchParams.set("coupon_code", "FLAT70");
    checkoutUrl.searchParams.set("coupon", "FLAT70"); // Dodo sometimes uses 'coupon'
  }

  checkoutUrl.searchParams.set("quantity", "1");
  checkoutUrl.searchParams.set("redirect_url", RETURN_URL);

  const email = searchParams.get("email");
  if (email) checkoutUrl.searchParams.set("email", email);

  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("metadata_")) {
      checkoutUrl.searchParams.set(key, value);
    }
  }

  return NextResponse.redirect(checkoutUrl.toString());
}
