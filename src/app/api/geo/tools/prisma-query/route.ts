import { NextResponse } from "next/server";
import { z } from "zod";
import {
  listUnaddressedOpportunities,
  getLatestMetrics,
  getPageMetrics,
  listCitationsByStatus,
} from "@/lib/geo/safe-prisma";

const RequestSchema = z.object({
  operation: z.enum([
    "list_opportunities",
    "latest_metrics",
    "page_metrics",
    "list_citations",
  ]),
  params: z
    .object({
      limit: z.number().int().min(1).max(200).optional(),
      slug: z.string().optional(),
      days: z.number().int().min(1).max(365).optional(),
      status: z.string().optional(),
    })
    .optional(),
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

  const { operation, params } = parsed.data;

  try {
    let data: unknown;
    switch (operation) {
      case "list_opportunities":
        data = await listUnaddressedOpportunities(params?.limit);
        break;
      case "latest_metrics":
        data = await getLatestMetrics(params?.limit);
        break;
      case "page_metrics":
        if (!params?.slug) {
          return NextResponse.json({ error: "slug required for page_metrics" }, { status: 400 });
        }
        data = await getPageMetrics(params.slug, params.days);
        break;
      case "list_citations":
        data = await listCitationsByStatus(params?.status ?? "drafted");
        break;
    }
    return NextResponse.json({ ok: true, data });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
