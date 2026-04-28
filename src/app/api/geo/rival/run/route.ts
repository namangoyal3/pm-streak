import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const result = await callAgent(
      Agents.rival(),
      "Run weekly competitive scan. Update rival_gaps.json in the shared KB.",
      `rival-${new Date().toISOString().slice(0, 10)}`,
      { timeoutMs: 90_000 }
    );
    return NextResponse.json({ ok: true, length: result.response.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
