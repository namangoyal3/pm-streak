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
