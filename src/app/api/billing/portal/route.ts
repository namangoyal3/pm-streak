import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createPaddlePortalSession } from "@/lib/billing/paddle";

export async function POST() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { paddleCustomerId: true },
  });

  if (!user?.paddleCustomerId) {
    return NextResponse.json(
      { error: "No billing account yet. Subscribe from the pricing page first." },
      { status: 400 }
    );
  }

  try {
    const { portalUrl } = await createPaddlePortalSession(user.paddleCustomerId);
    return NextResponse.json({ url: portalUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Portal failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
