import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DISPLAY_PRICES, type BillingInterval } from "@/lib/billing/catalog";
import { getCurrencyForBand, getPriceBandFromCountry, type PriceBand } from "@/lib/billing/price-bands";

function resolveCountry(req: NextRequest, override?: string | null): string {
  if (override && /^[A-Za-z]{2}$/.test(override)) {
    return override.toUpperCase();
  }
  const h =
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    "US";
  return h.length === 2 ? h.toUpperCase() : "US";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const countryOverride = searchParams.get("country");
  const country = resolveCountry(req, countryOverride);

  const row = await prisma.countryPriceOverride.findUnique({
    where: { countryCode: country },
  });
  const band = (row?.priceBand as PriceBand | undefined) ?? getPriceBandFromCountry(country);
  const currency = getCurrencyForBand(band);
  const display = DISPLAY_PRICES[band];

  const intervals: BillingInterval[] = ["monthly", "quarterly", "yearly"];

  return NextResponse.json({
    country,
    priceBand: band,
    currency,
    display,
    defaultInterval: "yearly" as const,
    intervals,
  });
}
