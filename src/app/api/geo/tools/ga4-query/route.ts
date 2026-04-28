import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  slug: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  metrics: z.array(z.string()).optional(),
});

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
    // Return mock data when GA4 isn't configured yet
    return NextResponse.json({
      configured: false,
      message: "GA4 not configured. Set GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY.",
      mockData: {
        slug: parsed.data.slug,
        sessions: 0,
        pageviews: 0,
        avgSessionDuration: 0,
      },
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

    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${gaPropertyId}:runReport`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gaServiceAccountKey}`,
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
