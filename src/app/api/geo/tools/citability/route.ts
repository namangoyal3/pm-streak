import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeMdx, scoreCitability, passesGate, canAutoMerge } from "@/lib/geo/citability";

const RequestSchema = z.object({
  content: z.string().min(1),
  slug: z.string().optional(),
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

  const { content, slug } = parsed.data;
  const factors = analyzeMdx(content);
  const score = scoreCitability(factors);

  return NextResponse.json({
    slug,
    score,
    passesGate: passesGate(score),
    canAutoMerge: canAutoMerge(score),
    factors,
  });
}
