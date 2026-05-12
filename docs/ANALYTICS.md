# Analytics (GA4 + PostHog)

## GA4 measurement ID

- Set `NEXT_PUBLIC_GA_ID` in Vercel (no trailing newline — or the app trims it in `layout.tsx`).
- Optional: `NEXT_PUBLIC_GA_DEBUG=true` enables GA4 **DebugView** in Google Analytics → Admin → DebugView (useful when validating events).

## Attribution & “Unassigned” / (direct) / (not set)

1. **Use consistent UTM links** for paid/organic campaigns so GA can map to Default channel groups:
   - `utm_source`, `utm_medium`, `utm_campaign` at minimum; add `utm_content` / `utm_term` when testing creatives or keywords.
   - Example: `https://your-domain.com/?utm_source=instagram&utm_medium=paid_social&utm_campaign=march_launch`

2. **Landing URL must keep query params** through any redirect (e.g. `www` ↔ apex, HTTP → HTTPS). If a redirect strips `?utm_*`, the session loses campaign context.

3. **First-party context**: This app sends the initial `gtag('config')` with `page_location` and `page_path` including `window.location.search`, so UTMs on the first load are attached to the first hit. Client navigations are tracked via `GoogleAnalyticsTracker` (`page_view` with `page_location`).

4. **Google Ads / Meta**: Link Google Ads and import cost data in GA where applicable; use parallel tracking so clicks keep `gclid` / platform IDs when relevant.

5. **Referrers**: Some in-app browsers or privacy tools strip referrer — a share of traffic may still appear as **Direct**; that’s expected.

## SPA page views

- `GoogleAnalyticsTracker` fires `page_view` on route changes (pathname + search).
- Do not duplicate another GA snippet in the page (single `dataLayer` / single measurement ID).

## PostHog

- Configure `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` as in `.env.example`.
- Use product analytics there for funnels; use GA4 for marketing attribution and Ads alignment.

## Conversion funnel events (LEA-6)

Canonical registry: `src/lib/ga4-events.ts` (`CONVERSION_FUNNEL_EVENTS` + the
`conversionFunnel` client helpers). Server-side calls go through
`serverEvents` in `src/lib/ga4-server.ts` via the GA4 Measurement Protocol —
they require `GA4_MEASUREMENT_SECRET` to be set in the deploy environment;
without it the route logs and no-ops.

| Event | Call site | Side |
|---|---|---|
| `trial_start_attempt` | `src/app/api/billing/start-trial/route.ts` (entry of `POST`) | server |
| `trial_start_success` | `src/app/api/billing/start-trial/route.ts` (trial granted) | server |
| `trial_start_blocked` | `src/app/api/billing/start-trial/route.ts` (with `{ reason }`) | server |
| `checkout_initiated` | `src/app/api/checkout/route.ts` (entry of `GET`) | server |
| `checkout_dodo_redirect` | `src/app/api/checkout/route.ts` (immediately before `NextResponse.redirect`) | server |
| `checkout_error` | `src/app/api/checkout/route.ts` (with `{ error }`) | server |
| `pricing_page_view` | `src/app/pricing/page.tsx` (fires on mount, anonymous + logged in) | server |
| `hero_cta_clicked` | `src/components/HeroCtaLink.tsx` (homepage hero CTA) | client |
| `dashboard_upgrade_cta_clicked` | `src/components/ProBanner.tsx` and `src/app/dashboard/page.tsx` (upgrade card) | client |

Payload rules:

- No PII in event params — no emails, no payment tokens, no full user records.
- The internal user id is passed as the Measurement Protocol `client_id` for
  attribution, not embedded in `event_params`.
- For `trial_start_blocked` and `checkout_error`, keep `reason` / `error`
  values to short stable enums (`not_authenticated`, `trial_already_used`,
  `empty_product_id`, `missing_product_id`, …) so GA4 reports stay readable.

### Verifying in production

1. Deploy the change.
2. Open GA4 → Reports → Realtime in one tab and DebugView in another (set
   `NEXT_PUBLIC_GA_DEBUG=true` if you want DebugView to populate).
3. Visit `/` in an incognito window, click the hero CTA → expect
   `hero_cta_clicked` then `pricing_page_view`.
4. Sign up, complete a lesson far enough to trigger `maybeGrantProTrial`, or
   POST `/api/billing/start-trial` → expect `trial_start_attempt` followed by
   `trial_start_success` (or `trial_start_blocked` with a reason).
5. From the dashboard, click the upgrade CTA → expect
   `dashboard_upgrade_cta_clicked`. On `/pricing`, click the checkout button
   → expect `checkout_initiated` followed by `checkout_dodo_redirect`.
