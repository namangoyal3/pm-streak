import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { isPro } = await req.json();

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { 
        plan: isPro ? "pro" : "free",
        billingStatus: isPro ? "active" : "none"
      },
    });

    return NextResponse.json({ ok: true, plan: user.plan });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }
}
