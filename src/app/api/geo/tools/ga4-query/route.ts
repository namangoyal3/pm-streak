import { NextResponse } from "next/server";
import { z } from "zod";
import { SignJWT, importPKCS8 } from "jose";

const RequestSchema = z.object({
  slug: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  metrics: z.array(z.string()).optional(),
});

async function getGoogleAccessToken(serviceAccountKey: string): Promise<string> {
  const parsed = JSON.parse(serviceAccountKey);
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("GA4_SERVICE_ACCOUNT_KEY must be a service account JSON string.");
  }

  const privateKey = await importPKCS8(parsed.private_key, "RS256");
  const now = Math.floor(Date.now() / 1000);
  const assertion = await new SignJWT({
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(parsed.client_email)
    .setSubject(parsed.client_email)
    .setAudience(parsed.token_uri ?? "https://oauth2.googleapis.com/token")
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const res = await fetch(parsed.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Google OAuth ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();
  if (!data.access_token) throw new Error("Google OAuth response did not include access_token.");
  return data.access_token;
}

export async function POST(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.LYZR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const gaPropertyId = process.env.GA4_PROPERTY_ID;
  const gaServiceAccountKey = process.env.GA4_SERVICE_ACCOUNT_KEY;

  if (!gaPropertyId || !gaServiceAccountKey) {
    // Do not emit fake zeroes: Pulse/Conductor must treat this as blocked
    // instrumentation, not as pages with no traffic.
    return NextResponse.json({
      configured: false,
      message: "GA4 not configured. Set GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY.",
      slug: parsed.data.slug,
    });
  }

  const { slug, startDate = "7daysAgo", endDate = "today", metrics = ["sessions", "screenPageViews"] } = parsed.data;

  try {
    // Build dimension filter for specific slug
    const dimensionFilter = slug
      ? {
          filter: {
            fieldName: "pagePath",
            stringFilter: { matchType: "CONTAINS", value: slug },
          },
        }
      : undefined;

    const accessToken = gaServiceAccountKey.trim().startsWith("{")
      ? await getGoogleAccessToken(gaServiceAccountKey)
      : gaServiceAccountKey;

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${gaPropertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          dateRanges: [{ startDate, endDate }],
          metrics: metrics.map((name) => ({ name })),
          dimensions: [{ name: "pagePath" }],
          dimensionFilter,
          limit: 100,
        }),
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `GA4 ${res.status}: ${await res.text()}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ configured: true, data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
