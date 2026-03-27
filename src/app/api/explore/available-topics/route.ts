import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EXPLORE_SEED_TOPICS } from "@/lib/explore-topics";

/**
 * Returns a list of topics that are "ready" in the library (templates)
 * plus some core seed topics to ensure discoverability.
 */
export async function GET() {
  const templates = await prisma.lesson.findMany({
    where: {
      aiGenerated: true,
      generatedForUserId: null,
    },
    select: { title: true },
    take: 20,
  });

  const templateTitles = templates.map((t) => t.title.replace(/\s+—\s+(Custom Lesson|Deeper Dive)$/, ""));
  const allTopics = Array.from(new Set([...templateTitles, ...EXPLORE_SEED_TOPICS]));

  return NextResponse.json({ topics: allTopics });
}
