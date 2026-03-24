import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const remote = searchParams.get("remote");
  const rawSearch = searchParams.get("q");
  // Clamp search length to prevent excessive DB work
  const search = rawSearch ? rawSearch.slice(0, 100) : null;

  const jobs = await prisma.job.findMany({
    where: {
      isActive: true,
      ...(remote === "true" ? { remote: true } : {}),
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { scrapedAt: "desc" },
    take: 50,
  });

  return NextResponse.json({ jobs });
}
