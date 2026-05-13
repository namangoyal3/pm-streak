import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CONVERSION_FUNNEL_EVENTS,
  conversionFunnel,
  trackEvent,
} from "../ga4-events";

declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
}

describe("ga4-events: CONVERSION_FUNNEL_EVENTS", () => {
  it("exposes the 9 LEA-6 funnel event names exactly", () => {
    // Lock the contract — adding/renaming any of these must be deliberate.
    expect(CONVERSION_FUNNEL_EVENTS).toEqual({
      TRIAL_START_ATTEMPT: "trial_start_attempt",
      TRIAL_START_SUCCESS: "trial_start_success",
      TRIAL_START_BLOCKED: "trial_start_blocked",
      CHECKOUT_INITIATED: "checkout_initiated",
      CHECKOUT_DODO_REDIRECT: "checkout_dodo_redirect",
      CHECKOUT_ERROR: "checkout_error",
      PRICING_PAGE_VIEW: "pricing_page_view",
      HERO_CTA_CLICKED: "hero_cta_clicked",
      DASHBOARD_UPGRADE_CTA_CLICKED: "dashboard_upgrade_cta_clicked",
    });
  });
});

describe("ga4-events: conversionFunnel client helpers", () => {
  const gtag = vi.fn();
  const originalWindow = (globalThis as { window?: Window }).window;

  beforeEach(() => {
    gtag.mockReset();
    (globalThis as unknown as { window: { gtag: typeof gtag } }).window = {
      gtag,
    };
  });

  afterEach(() => {
    if (originalWindow === undefined) {
      delete (globalThis as { window?: Window }).window;
    } else {
      (globalThis as { window?: Window }).window = originalWindow;
    }
  });

  it("pricingPageView fires with no params", () => {
    conversionFunnel.pricingPageView();
    expect(gtag).toHaveBeenCalledWith("event", "pricing_page_view", {});
  });

  it("heroCtaClicked attaches the variant when supplied and omits it otherwise", () => {
    conversionFunnel.heroCtaClicked();
    expect(gtag).toHaveBeenLastCalledWith("event", "hero_cta_clicked", {});

    conversionFunnel.heroCtaClicked("treatment");
    expect(gtag).toHaveBeenLastCalledWith("event", "hero_cta_clicked", {
      experiment_variant: "treatment",
    });
  });

  it("dashboardUpgradeCtaClicked attaches the source when supplied", () => {
    conversionFunnel.dashboardUpgradeCtaClicked("pro_banner");
    expect(gtag).toHaveBeenLastCalledWith(
      "event",
      "dashboard_upgrade_cta_clicked",
      { source: "pro_banner" },
    );
  });

  it("trackEvent never throws on the server (window undefined)", () => {
    delete (globalThis as { window?: Window }).window;
    expect(() => trackEvent("any_event", { ok: true })).not.toThrow();
  });
});

describe("ga4-server: trackServerEvent URL hygiene", () => {
  const fetchMock = vi.fn();
  const originalFetch = globalThis.fetch;
  const originalGaId = process.env.NEXT_PUBLIC_GA_ID;
  const originalSecret = process.env.GA4_MEASUREMENT_SECRET;

  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    // Reproduce LEA-14: env value carries a trailing newline (the bug
    // surfaced in production on dpl_3uB7ovzAgNx8hkWjkMCNeQZ8CKrd).
    process.env.NEXT_PUBLIC_GA_ID = "G-G8MN39TWEP\n";
    process.env.GA4_MEASUREMENT_SECRET = "secret-abc\n";
    vi.resetModules();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    process.env.NEXT_PUBLIC_GA_ID = originalGaId;
    process.env.GA4_MEASUREMENT_SECRET = originalSecret;
  });

  it("strips trailing whitespace from GA_ID and the measurement secret in the request URL", async () => {
    const { trackServerEvent } = await import("../ga4-server");
    await trackServerEvent("pricing_page_view", { plan: "pro" }, "user-1");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(calledUrl).toBe(
      "https://www.google-analytics.com/mp/collect?measurement_id=G-G8MN39TWEP&api_secret=secret-abc",
    );
    expect(calledUrl).not.toMatch(/\s/);
  });
});
