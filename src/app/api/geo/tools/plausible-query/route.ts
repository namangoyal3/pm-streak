import { NextResponse } from "next/server";
import { z } from "zod";

const RequestSchema = z.object({
  slug: z.string().optional(),
  period: z.enum(["day", "7d", "30d", "month", "6mo", "12mo"]).optional(),
  metrics: z.string().optional(),
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

  const siteId = process.env.PLAUSIBLE_SITE_ID;
  const apiKey = process.env.PLAUSIBLE_API_KEY;

  if (!siteId || !apiKey) {
    return NextResponse.json({
      configured: false,
      message: "Plausible not configured. Set PLAUSIBLE_SITE_ID and PLAUSIBLE_API_KEY.",
      mockData: { slug: parsed.data.slug, visitors: 0, pageviews: 0 },
    });
  }

  const { slug, period = "30d", metrics = "visitors,pageviews,bounce_rate,visit_duration" } = parsed.data;

  try {
    const params = new URLSearchParams({
      site_id: siteId,
      period,
      metrics,
    });
    if (slug) {
      params.set("filters", `event:page==/blog/${slug}`);
    }

    const res = await fetch(`https://plausible.io/api/v1/stats/aggregate?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Plausible ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ configured: true, data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
