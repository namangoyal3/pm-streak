import type { NextRequest } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const ACQUISITION_COOKIE = "pmstreak_attribution";
const CTA_COOKIE = "pmstreak_last_cta";

type AttributionData = {
  landing_path?: string;
  landing_url?: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  captured_at?: string;
  cta_href?: string;
  cta_text?: string;
  cta_source_path?: string;
  cta_clicked_at?: string;
};

const MAX_FIELD_LENGTH = 500;

function cleanValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_FIELD_LENGTH);
}

function compactJson(data: Record<string, unknown>): Prisma.InputJsonObject {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as Prisma.InputJsonObject;
}

export function getAcquisitionFromRequest(req: NextRequest): AttributionData {
  const rawCookie = req.cookies.get(ACQUISITION_COOKIE)?.value;
  const rawCtaCookie = req.cookies.get(CTA_COOKIE)?.value;
  let cookieData: AttributionData = {};
  let ctaData: Record<string, unknown> = {};

  if (rawCookie) {
    try {
      cookieData = JSON.parse(decodeURIComponent(rawCookie));
    } catch {
      cookieData = {};
    }
  }

  if (rawCtaCookie) {
    try {
      ctaData = JSON.parse(decodeURIComponent(rawCtaCookie));
    } catch {
      ctaData = {};
    }
  }

  const params = req.nextUrl.searchParams;
  return {
    landing_path: cleanValue(cookieData.landing_path) ?? cleanValue(req.nextUrl.pathname),
    landing_url: cleanValue(cookieData.landing_url),
    referrer: cleanValue(cookieData.referrer),
    source: cleanValue(params.get("utm_source")) ?? cleanValue(cookieData.source),
    medium: cleanValue(params.get("utm_medium")) ?? cleanValue(cookieData.medium),
    campaign: cleanValue(params.get("utm_campaign")) ?? cleanValue(cookieData.campaign),
    content: cleanValue(params.get("utm_content")) ?? cleanValue(cookieData.content),
    term: cleanValue(params.get("utm_term")) ?? cleanValue(cookieData.term),
    captured_at: cleanValue(cookieData.captured_at),
    cta_href: cleanValue(ctaData.href),
    cta_text: cleanValue(ctaData.text),
    cta_source_path: cleanValue(ctaData.source_path),
    cta_clicked_at: cleanValue(ctaData.clicked_at),
  };
}

export async function recordAcquisitionEvent(opts: {
  userId: string;
  eventName: string;
  req: NextRequest;
  metadata?: Record<string, unknown>;
}) {
  const attribution = getAcquisitionFromRequest(opts.req);

  try {
    await prisma.experimentEvent.create({
      data: {
        experimentName: "acquisition",
        eventName: opts.eventName,
        userId: opts.userId,
        metadata: compactJson({
          ...attribution,
          ...opts.metadata,
        }),
      },
    });
  } catch (error) {
    console.error("[acquisition] failed to record event", {
      eventName: opts.eventName,
      userId: opts.userId,
      error,
    });
  }
}

export async function recordUserFunnelEvent(opts: {
  userId: string;
  eventName: string;
  metadata?: Record<string, unknown>;
}) {
  try {
    const lastAcquisition = await prisma.experimentEvent.findFirst({
      where: {
        userId: opts.userId,
        experimentName: "acquisition",
      },
      orderBy: { createdAt: "desc" },
      select: { metadata: true },
    });

    await prisma.experimentEvent.create({
      data: {
        experimentName: "acquisition",
        eventName: opts.eventName,
        userId: opts.userId,
        metadata: compactJson({
          ...(lastAcquisition?.metadata && typeof lastAcquisition.metadata === "object"
            ? lastAcquisition.metadata
            : {}),
          ...opts.metadata,
        }),
      },
    });
  } catch (error) {
    console.error("[acquisition] failed to record user event", {
      eventName: opts.eventName,
      userId: opts.userId,
      error,
    });
  }
}
