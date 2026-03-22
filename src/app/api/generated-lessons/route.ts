import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { getGeneratedLessonsForUser } from "@/lib/lesson-access";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const lessons = await getGeneratedLessonsForUser(userId);
  return NextResponse.json({ lessons });
}
