import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { computeReadiness } from "@/lib/readiness";

export async function GET(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  void req;
  const result = await computeReadiness(userId);
  return NextResponse.json(result);
}
