/**
 * Server-side GA4 event tracking via Measurement Protocol
 * Used in API routes where `window.gtag` is not available.
 *
 * Requires: GA4 Measurement Secret (create in GA4 Admin → Data Streams →
 * your stream → Measurement Protocol API → Create Secret)
 *
 * Env vars needed:
 *   NEXT_PUBLIC_GA_ID=G-G8MN39TWEP
 *   GA4_MEASUREMENT_SECRET=<your-secret>
 */

import { CONVERSION_FUNNEL_EVENTS } from "./ga4-events";

const GA4_MEASUREMENT_URL = "https://www.google-analytics.com/mp/collect";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const MEASUREMENT_SECRET = process.env.GA4_MEASUREMENT_SECRET;

interface GA4Event {
  name: string;
  params: Record<string, string | number | boolean>;
}

/**
 * Send server-side event to GA4 via Measurement Protocol
 */
export async function trackServerEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {},
  clientId?: string
): Promise<void> {
  // If no measurement secret configured, just log
  if (!MEASUREMENT_SECRET || !GA_ID) {
    console.log(`📊 [GA4 Server] ${eventName}`, params);
    return;
  }

  const payload = {
    client_id: clientId ?? "server",
    events: [
      {
        name: eventName,
        params: {
          engagement_time_msec: 100,
          ...params,
        },
      },
    ],
  };

  try {
    const url = `${GA4_MEASUREMENT_URL}?measurement_id=${GA_ID}&api_secret=${MEASUREMENT_SECRET}`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error(`[GA4] Failed to send event ${eventName}:`, err);
  }
}

// Convenience wrappers for trial/checkout funnel events.
// Event names are sourced from `CONVERSION_FUNNEL_EVENTS` so the canonical
// registry in `ga4-events.ts` stays the single source of truth.
export const serverEvents = {
  trialStartAttempt: (userId: string | null) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.TRIAL_START_ATTEMPT,
      { authenticated: Boolean(userId) },
      userId ?? undefined,
    ),

  trialStartSuccess: (userId: string, trialDays: number) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.TRIAL_START_SUCCESS,
      { trial_days: trialDays },
      userId,
    ),

  trialStartBlocked: (userId: string | null, reason: string) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.TRIAL_START_BLOCKED,
      { reason },
      userId ?? undefined,
    ),

  checkoutInitiated: (userId: string | null, plan: string) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.CHECKOUT_INITIATED,
      { plan },
      userId ?? undefined,
    ),

  checkoutDodoRedirect: (userId: string | null) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.CHECKOUT_DODO_REDIRECT,
      {},
      userId ?? undefined,
    ),

  checkoutError: (userId: string | null, error: string) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.CHECKOUT_ERROR,
      { error },
      userId ?? undefined,
    ),

  pricingPageView: (userId?: string | null) =>
    trackServerEvent(
      CONVERSION_FUNNEL_EVENTS.PRICING_PAGE_VIEW,
      {},
      userId ?? undefined,
    ),
};