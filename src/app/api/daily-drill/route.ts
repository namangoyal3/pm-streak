import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getDailyDrillForUser } from "@/lib/daily-drill";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const drill = await getDailyDrillForUser(userId);
  if (!drill) {
    return NextResponse.json(
      { error: "No learning plan found. Please set your target role first." },
      { status: 404 }
    );
  }

  return NextResponse.json(drill);
}
