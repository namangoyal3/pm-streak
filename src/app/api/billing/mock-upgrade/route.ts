import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { isPro } = await req.json();

  try {
    const user = await prisma.user.update({
      where: { id: guard.userId },
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
