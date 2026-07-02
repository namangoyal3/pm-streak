import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  articleSlug: z.string().min(1),
  vertical: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const { email, articleSlug, vertical } = parsed.data;

    // Anonymous visitors have no User row, so leads get their own table
    // instead of the user-scoped ExperimentEvent. Upsert dedupes resubmits.
    await prisma.articleLead.upsert({
      where: { email_articleSlug: { email, articleSlug } },
      create: { email, articleSlug, vertical, source: "article_inline" },
      update: {},
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("article-signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
