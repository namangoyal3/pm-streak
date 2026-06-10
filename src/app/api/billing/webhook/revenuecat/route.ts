import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  getAppUserIdFromWebhookEvent,
  getWebhookEventId,
  syncSubscriberFromRevenueCat,
} from "@/lib/billing/revenuecat-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebhookBody = Record<string, unknown>;

export async function POST(req: NextRequest) {
  const token = process.env.REVENUECAT_WEBHOOK_AUTH_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 500 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ error: "Bad body" }, { status: 400 });
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(raw) as WebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const appUserId = getAppUserIdFromWebhookEvent(body);
  if (appUserId) {
    try {
      await syncSubscriberFromRevenueCat(appUserId);
    } catch (e) {
      console.error("RevenueCat webhook sync failed", e);
      return NextResponse.json({ error: "Sync failed" }, { status: 500 });
    }
  }

  const eventId = getWebhookEventId(body);
  if (eventId) {
    try {
      await prisma.billingEvent.create({
        data: {
          provider: "revenuecat",
          eventType: String(
            (body.event as Record<string, unknown> | undefined)?.type ?? "unknown"
          ),
          payload: raw,
          externalId: eventId,
        },
      });
    } catch (e: unknown) {
      const code =
        e && typeof e === "object" && "code" in e
          ? (e as { code?: string }).code
          : undefined;
      if (code === "P2002") {
        return NextResponse.json({ received: true, duplicate: true });
      }
      throw e;
    }
  }

  return NextResponse.json({ received: true });
}
