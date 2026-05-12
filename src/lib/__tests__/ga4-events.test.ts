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
