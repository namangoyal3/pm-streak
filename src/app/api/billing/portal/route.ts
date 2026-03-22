import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { syncSubscriberFromRevenueCat } from "@/lib/billing/revenuecat-server";

/**
 * Returns RevenueCat subscription management URL (Web Billing) when available.
 */
export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { managementUrl } = await syncSubscriberFromRevenueCat(userId);
    if (!managementUrl) {
      return NextResponse.json(
        {
          error:
            "No subscription management link yet. Complete a Pro purchase in RevenueCat first.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ url: managementUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Portal failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
