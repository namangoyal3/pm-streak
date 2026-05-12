/**
 * GA4 Event Tracking for Conversion Funnel Analysis
 * Tracks key user actions to identify dropoff points.
 *
 * Per LEA-6 / CONVERSION_PLAN.md this file is the canonical registry of
 * conversion-funnel event names. Each name below is fired from one specific
 * call site so the funnel is observable end-to-end in GA4 Realtime:
 *
 *   trial_start_attempt           — POST /api/billing/start-trial entry
 *   trial_start_success           — trial granted in /api/billing/start-trial
 *   trial_start_blocked           — { reason } from /api/billing/start-trial
 *   checkout_initiated            — GET /api/checkout entry
 *   checkout_dodo_redirect        — before redirecting to Dodo
 *   checkout_error                — { error } from /api/checkout
 *   pricing_page_view             — /pricing mounted (server)
 *   hero_cta_clicked              — homepage hero CTA click
 *   dashboard_upgrade_cta_clicked — dashboard upgrade bar click
 *
 * Server-side names go through `trackServerEvent` in `ga4-server.ts`
 * (Measurement Protocol). Client-side names go through `trackEvent` below,
 * which writes to `window.gtag`. Event payloads must contain no PII beyond
 * the existing GA user id — no emails, no payment tokens.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GA4Event = {
  event_name: string;
  event_params?: Record<string, any>;
};

// Conversion funnel events
export const FUNNEL_EVENTS = {
  // Acquisition
  PAGE_VIEW: 'page_view',
  
  // Activation
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  LESSON_STARTED: 'lesson_started',
  LESSON_COMPLETED: 'lesson_completed',
  QUIZ_SUBMITTED: 'quiz_submitted',
  
  // Retention
  DAILY_STREAK: 'daily_streak',
  RETURN_VISIT: 'return_visit',
  
  // Revenue
  PRICING_PAGE_VIEW: 'pricing_page_view',
  UPGRADE_CLICKED: 'upgrade_clicked',
  TRIAL_STARTED: 'trial_started',
  SUBSCRIPTION_STARTED: 'subscription_started',
  PAYMENT_COMPLETED: 'payment_completed',
  
  // Referral
  SHARE_CLICKED: 'share_clicked',
  REFERRAL_INVITED: 'referral_invited',
};

/**
 * Canonical conversion-funnel event names (LEA-6).
 * Use these constants in both client (`trackEvent`) and server
 * (`trackServerEvent` from `ga4-server.ts`) call sites so the event name
 * is owned in exactly one place.
 */
export const CONVERSION_FUNNEL_EVENTS = {
  TRIAL_START_ATTEMPT: 'trial_start_attempt',
  TRIAL_START_SUCCESS: 'trial_start_success',
  TRIAL_START_BLOCKED: 'trial_start_blocked',
  CHECKOUT_INITIATED: 'checkout_initiated',
  CHECKOUT_DODO_REDIRECT: 'checkout_dodo_redirect',
  CHECKOUT_ERROR: 'checkout_error',
  PRICING_PAGE_VIEW: 'pricing_page_view',
  HERO_CTA_CLICKED: 'hero_cta_clicked',
  DASHBOARD_UPGRADE_CTA_CLICKED: 'dashboard_upgrade_cta_clicked',
} as const;

export type ConversionFunnelEvent =
  (typeof CONVERSION_FUNNEL_EVENTS)[keyof typeof CONVERSION_FUNNEL_EVENTS];

/**
 * Client-side helpers for the three conversion-funnel events that fire from
 * the browser (the others fire from API routes via `serverEvents` in
 * `ga4-server.ts`). Keep payloads PII-free.
 */
export const conversionFunnel = {
  pricingPageView: () =>
    trackEvent(CONVERSION_FUNNEL_EVENTS.PRICING_PAGE_VIEW),
  heroCtaClicked: (variant?: string) =>
    trackEvent(
      CONVERSION_FUNNEL_EVENTS.HERO_CTA_CLICKED,
      variant ? { experiment_variant: variant } : {},
    ),
  dashboardUpgradeCtaClicked: (source?: string) =>
    trackEvent(
      CONVERSION_FUNNEL_EVENTS.DASHBOARD_UPGRADE_CTA_CLICKED,
      source ? { source } : {},
    ),
};

/**
 * Track GA4 event
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;
  
  // Send to GA4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Also log to console for debugging
  console.log(`📊 GA4 Event: ${eventName}`, params);
}

/**
 * Track conversion funnel events
 */
export const trackFunnel = {
  // Acquisition
  pageView: (pagePath: string, pageTitle: string) => {
    trackEvent(FUNNEL_EVENTS.PAGE_VIEW, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  },
  
  // Activation
  signupStarted: () => {
    trackEvent(FUNNEL_EVENTS.SIGNUP_STARTED);
  },
  
  signupCompleted: (method: 'google' | 'email') => {
    trackEvent(FUNNEL_EVENTS.SIGNUP_COMPLETED, {
      signup_method: method,
    });
  },
  
  lessonStarted: (lessonId: string, lessonTitle: string) => {
    trackEvent(FUNNEL_EVENTS.LESSON_STARTED, {
      lesson_id: lessonId,
      lesson_title: lessonTitle,
    });
  },
  
  lessonCompleted: (lessonId: string, xpEarned: number) => {
    trackEvent(FUNNEL_EVENTS.LESSON_COMPLETED, {
      lesson_id: lessonId,
      xp_earned: xpEarned,
    });
  },
  
  quizSubmitted: (lessonId: string, score: number, total: number) => {
    trackEvent(FUNNEL_EVENTS.QUIZ_SUBMITTED, {
      lesson_id: lessonId,
      quiz_score: score,
      quiz_total: total,
    });
  },
  
  // Retention
  dailyStreak: (streakCount: number) => {
    trackEvent(FUNNEL_EVENTS.DAILY_STREAK, {
      streak_count: streakCount,
    });
  },
  
  returnVisit: (daysSinceLastVisit: number) => {
    trackEvent(FUNNEL_EVENTS.RETURN_VISIT, {
      days_since_last_visit: daysSinceLastVisit,
    });
  },
  
  // Revenue
  pricingPageView: () => {
    trackEvent(FUNNEL_EVENTS.PRICING_PAGE_VIEW);
  },
  
  upgradeClicked: (source: 'dashboard' | 'homepage' | 'lesson' | 'pricing') => {
    trackEvent(FUNNEL_EVENTS.UPGRADE_CLICKED, {
      source: source,
    });
  },
  
  trialStarted: (experimentVariant?: string) => {
    trackEvent(FUNNEL_EVENTS.TRIAL_STARTED, {
      experiment_variant: experimentVariant,
    });
  },
  
  subscriptionStarted: (plan: 'pro', price: number) => {
    trackEvent(FUNNEL_EVENTS.SUBSCRIPTION_STARTED, {
      plan: plan,
      price: price,
    });
  },
  
  paymentCompleted: (transactionId: string, amount: number) => {
    trackEvent(FUNNEL_EVENTS.PAYMENT_COMPLETED, {
      transaction_id: transactionId,
      amount: amount,
    });
  },
  
  // Referral
  shareClicked: (platform: 'twitter' | 'linkedin' | 'whatsapp' | 'copy') => {
    trackEvent(FUNNEL_EVENTS.SHARE_CLICKED, {
      platform: platform,
    });
  },
  
  referralInvited: (invitesCount: number) => {
    trackEvent(FUNNEL_EVENTS.REFERRAL_INVITED, {
      invites_count: invitesCount,
    });
  },
};

/**
 * Initialize GA4 tracking
 */
export function initGA4(measurementId: string): void {
  if (typeof window === 'undefined') return;
  
  // Load gtag script if not already loaded
  if (!window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: unknown[]) {
      (window.dataLayer as unknown[]).push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
  }
}

/**
 * Get conversion funnel metrics
 */
export function getFunnelMetrics(): Record<string, number> {
  // This would typically query GA4 API
  // For now, return mock data structure
  return {
    homepage_visitors: 0,
    signup_started: 0,
    signup_completed: 0,
    lesson_started: 0,
    lesson_completed: 0,
    pricing_page_views: 0,
    upgrade_clicks: 0,
    trial_starts: 0,
    payments_completed: 0,
  };
}