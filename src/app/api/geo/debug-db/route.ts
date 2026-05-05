import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({
    databaseUrl: process.env.DATABASE_URL?.substring(0, 60),
    hasDB: !!process.env.DATABASE_URL,
  });
}
