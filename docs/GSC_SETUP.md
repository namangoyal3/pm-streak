# GSC Ranking Setup — Paste into Antigravity

```
PM Streak GSC ranking setup for learnanything.pro:

1. Add learnanything.pro as a domain property in Google Search Console (https://search.google.com/search-console → Add property → Domain → learnanything.pro). Follow the DNS TXT verification.

2. Once verified, go to Settings → Users and permissions → add the client_email from GA4_SERVICE_ACCOUNT_KEY as a Delegated Owner.

3. In Vercel (pmstreak project), add env vars:
   GA4_PROPERTY_ID=properties/{property-number}
   GSC_SITE_URL=sc-domain:learnanything.pro

4. Redeploy. Verify with GET /api/geo/health — ga4.gsc should be true.

5. Run the IndexNow script to submit all 800+ articles: npx tsx scripts/submit-indexnow.ts

Pulse agent will auto-pull rankings daily after this.
```
