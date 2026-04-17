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

// Convenience wrappers for trial/checkout funnel events
export const serverEvents = {
  trialStartAttempt: (userId: string) =>
    trackServerEvent("trial_start_attempt", { user_id: userId }, userId),

  trialStartSuccess: (userId: string, trialDays: number) =>
    trackServerEvent("trial_start_success", {
      trial_days: trialDays,
      user_id: userId,
    }, userId),

  trialStartBlocked: (userId: string, reason: string) =>
    trackServerEvent("trial_start_blocked", {
      blocked_reason: reason,
      user_id: userId,
    }, userId),

  checkoutInitiated: (userId: string, plan: string) =>
    trackServerEvent("checkout_initiated", {
      plan,
      user_id: userId,
    }, userId),

  checkoutDodoRedirect: (userId: string) =>
    trackServerEvent("checkout_dodo_redirect", { user_id: userId }, userId),

  checkoutError: (userId: string, error: string) =>
    trackServerEvent("checkout_error", {
      error,
      user_id: userId,
    }, userId),

  pricingPageView: (userId?: string) =>
    trackServerEvent("pricing_page_view", { user_id: userId ?? "anonymous" }),
};