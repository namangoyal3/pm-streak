import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import {
  getPaywallState,
  incrementPaywallDecline,
  markPaywallShown,
} from "@/lib/engagement";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const state = await getPaywallState(userId);
  return NextResponse.json(state);
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { action?: "shown" | "declined" };
  const action = body.action;
  if (action !== "shown" && action !== "declined") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  if (action === "shown") {
    await markPaywallShown(userId);
  } else {
    await incrementPaywallDecline(userId);
  }

  return NextResponse.json({
    ok: true,
    action,
  });
}
