import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { syncSubscriberFromRevenueCat } from "@/lib/billing/revenuecat-server";

/**
 * Call after a successful Web purchase in the SDK so the DB matches RevenueCat
 * before webhooks arrive (or as a fallback).
 */
export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const result = await syncSubscriberFromRevenueCat(userId);
    return NextResponse.json({
      ok: true,
      active: result.active,
      managementUrl: result.managementUrl,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Sync failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
