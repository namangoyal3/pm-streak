import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const result = await callAgent(
    Agents.scout(),
    "Run today's scan. Append new opportunities to opportunities.jsonl in the shared KB.",
    `scout-${new Date().toISOString().slice(0, 10)}`,
    { timeoutMs: 90_000 }
  );
  return NextResponse.json({ ok: true, length: result.response.length });
}
