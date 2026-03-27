"use client";

import Script from "next/script";

/**
 * GA4 init with explicit page_location / page_path on first config.
 * Ensures query strings (UTMs, gclid, fbclid) are on the landing hit — reduces
 * Unassigned / (direct) mis-attribution vs the default gtag config alone.
 * @see https://developers.google.com/analytics/devguides/collection/ga4/views
 */
export default function GoogleAnalyticsInit({
  gaId,
  debugMode = false,
}: {
  gaId: string;
  debugMode?: boolean;
}) {
  const debugSnippet = debugMode ? ",\n            debug_mode: true" : "";

  return (
    <>
      <Script
        id="_pm-ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window['dataLayer'] = window['dataLayer'] || [];
          function gtag(){window['dataLayer'].push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search${debugSnippet}
          });`,
        }}
      />
      <Script
        id="_pm-ga"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
      />
    </>
  );
}
