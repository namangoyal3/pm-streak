import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { grantUpiIndiaPro } from "@/lib/billing/upi-india-server";

/**
 * Record a confirmed India UPI payment and activate Pro for the period.
 * Static bank/UPI QR does not notify this app — you confirm manually (UTR, bank SMS, email)
 * then call this from the dashboard or via this API.
 */
export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  let body: {
    userId?: string;
    email?: string;
    interval?: "month" | "quarter" | "year";
    paidAt?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const interval = body.interval;
  if (interval !== "month" && interval !== "quarter" && interval !== "year") {
    return NextResponse.json(
      { error: "interval must be \"month\", \"quarter\", or \"year\"" },
      { status: 400 },
    );
  }

  let targetUserId = body.userId?.trim();
  const email = body.email?.trim().toLowerCase();
  if (!targetUserId && email) {
    const u = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!u) {
      return NextResponse.json({ error: "User not found for email" }, { status: 404 });
    }
    targetUserId = u.id;
  }

  if (!targetUserId) {
    return NextResponse.json(
      { error: "Provide userId or email" },
      { status: 400 },
    );
  }

  let paidAt: Date | undefined;
  if (body.paidAt) {
    paidAt = new Date(body.paidAt);
    if (Number.isNaN(paidAt.getTime())) {
      return NextResponse.json({ error: "Invalid paidAt" }, { status: 400 });
    }
  }

  try {
    const result = await grantUpiIndiaPro({
      userId: targetUserId,
      interval,
      paidAt,
    });
    return NextResponse.json({
      ok: true,
      currentPeriodEnd: result.currentPeriodEnd.toISOString(),
      subscriptionId: result.subscriptionId,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Grant failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
