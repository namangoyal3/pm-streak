import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createPaddleCheckout } from "@/lib/billing/paddle";
import { getPaddlePriceId } from "@/lib/billing/paddle-config";
import type { BillingInterval } from "@/lib/billing/catalog";
import { getPriceBandFromCountry, type PriceBand } from "@/lib/billing/price-bands";

function countryFromRequest(req: NextRequest, override?: string | null): string {
  if (override && /^[A-Za-z]{2}$/.test(override)) {
    return override.toUpperCase();
  }
  const h =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "US";
  return h.length === 2 ? h.toUpperCase() : "US";
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    interval?: BillingInterval;
    country?: string | null;
  };

  const interval: BillingInterval =
    body.interval === "monthly" || body.interval === "quarterly"
      ? body.interval
      : "yearly";

  const country = countryFromRequest(req, body.country ?? null);

  const override = await prisma.countryPriceOverride.findUnique({
    where: { countryCode: country },
  });
  const band: PriceBand =
    (override?.priceBand as PriceBand | undefined) ?? getPriceBandFromCountry(country);

  const priceId = getPaddlePriceId(band, interval);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "Billing is not configured (set PADDLE_PRICE_* env vars for your Paddle prices).",
      },
      { status: 503 }
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      country,
      priceBand: band,
    },
  });

  try {
    const { checkoutUrl } = await createPaddleCheckout({ priceId, userId });
    return NextResponse.json({ url: checkoutUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
