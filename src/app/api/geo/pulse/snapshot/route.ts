import { NextResponse } from "next/server";
import { Agents, callAgent } from "@/lib/lyzr";

const isAllowed = (req: Request) =>
  req.headers.get("x-vercel-cron") === "1" ||
  req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

export async function POST(req: Request) {
  if (!isAllowed(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const result = await callAgent(
    Agents.pulse(),
    "Take a daily performance snapshot. Write metrics to pulse_metrics.jsonl. Flag pages needing rewrites.",
    `pulse-${new Date().toISOString().slice(0, 10)}`,
    { timeoutMs: 90_000 }
  );
  return NextResponse.json({ ok: true, length: result.response.length });
}
