import { NextRequest, NextResponse } from "next/server";
import { verifyPasswordResetToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const payload = await verifyPasswordResetToken(token);
  return NextResponse.json({ valid: Boolean(payload) });
}
