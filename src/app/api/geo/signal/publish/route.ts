import { NextResponse } from "next/server";
import { z } from "zod";
import { publishArticle } from "@/lib/geo/safe-prisma";

const RequestSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  body: z.string().min(1),
  vertical: z.string().default("pm"),
  citabilityScore: z.number().optional(),
});

const isAllowed = (req: Request) =>
  req.headers.get("x-api-key") === process.env.LYZR_API_KEY ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { slug, title, description, body: articleBody, vertical, citabilityScore } = parsed.data;

  try {
    const article = await publishArticle({ slug, title, description, body: articleBody, vertical });
    return NextResponse.json({
      ok: true,
      id: article.id,
      url: `https://learnanything.pro/learn/${vertical}/${slug}`,
      citabilityScore,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message.slice(0, 500) },
      { status: 500 }
    );
  }
}
