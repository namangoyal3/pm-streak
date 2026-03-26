import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? "namangoyal21197@gmail.com").split(",").map((e) => e.trim());

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!currentUser || !ADMIN_EMAILS.includes(currentUser.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
