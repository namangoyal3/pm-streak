import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCouponData } from "@/lib/coupon";
import { requireAdmin } from "@/lib/admin";
import DodoPayments from "dodopayments";

export async function GET(req: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.response;

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ coupons });
  } catch (err) {
    console.error("Failed to list coupons:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.response;

    const body = await req.json();
    const { email, discountPercent, expiresInMinutes = 5, isGlobal = false, maxUses = 1, customCode } = body;

    let targetEmail = email;
    if (isGlobal) {
      targetEmail = "*";
    } else {
      if (!targetEmail || typeof targetEmail !== "string") {
        return NextResponse.json({ error: "Email required when not global" }, { status: 400 });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(targetEmail)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
      }
      targetEmail = targetEmail.toLowerCase();
    }

    const discount = typeof discountPercent === "number" 
      ? Math.max(1, Math.min(100, discountPercent)) 
      : 70;

    const expiryMinutes = typeof expiresInMinutes === "number"
      ? Math.max(1, expiresInMinutes) // Removed the 1-day cap
      : 5;

    const validMaxUses = typeof maxUses === "number" ? Math.max(1, maxUses) : 1;

    let { code, expiresAt, signature } = createCouponData(targetEmail, discount, expiryMinutes);

    if (customCode && typeof customCode === "string" && customCode.trim().length > 2) {
      code = customCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    }

    // Sync to Dodo Payments
    try {
      const dodo = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY,
        environment:
          process.env.DODO_PAYMENTS_ENVIRONMENT === "test_mode" ? "test_mode" : "live_mode",
      });

      await dodo.discounts.create({
        amount: discount * 100, // Basis points (e.g. 70% -> 7000)
        type: "percentage",
        code: code,
        name: `PM Streak - Admin Coupon (${isGlobal ? "Global" : targetEmail})`,
        usage_limit: validMaxUses,
        expires_at: expiresAt.toISOString(),
      });
    } catch (dodoError) {
      console.error("Dodo API Error:", dodoError);
      return NextResponse.json(
        { error: "Failed to sync coupon with Dodo Payments" },
        { status: 500 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code,
        email: targetEmail,
        discountPercent: discount,
        signature,
        expiresAt,
        maxUses: validMaxUses,
      },
    });

    return NextResponse.json({
      code: coupon.code,
      email: coupon.email,
      discountPercent: coupon.discountPercent,
      expiresAt: coupon.expiresAt.toISOString(),
    });
  } catch (error) {
    console.error("Coupon creation error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (!guard.ok) return guard.response;

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    if (!code) return NextResponse.json({ error: "Code required" }, { status: 400 });

    // Delete from Dodo first (best effort)
    let dodoDeleted = false;
    try {
      if (process.env.DODO_PAYMENTS_API_KEY) {
        const dodo = new DodoPayments({
          bearerToken: process.env.DODO_PAYMENTS_API_KEY,
          environment:
            process.env.DODO_PAYMENTS_ENVIRONMENT === "test_mode" ? "test_mode" : "live_mode",
        });
        
        try {
          const discount = await dodo.discounts.retrieveByCode(code);
          if (discount && discount.discount_id) {
            await dodo.discounts.delete(discount.discount_id);
            dodoDeleted = true;
          }
        } catch (retrieveErr: any) {
          // If 404, it's fine, it just doesn't exist in Dodo
          console.warn(`Dodo retrieveByCode failed for ${code}:`, retrieveErr?.status || retrieveErr?.message);
        }
      }
    } catch (dodoErr) {
      console.warn("Outer Dodo error:", dodoErr);
    }

    // Use deleteMany to avoid throwing if code not found
    const { count } = await prisma.coupon.deleteMany({ where: { code } });

    if (count === 0 && !dodoDeleted) {
      console.warn(`Coupon ${code} not found in DB or Dodo.`);
    }

    return NextResponse.json({ success: true, dbDeleted: count > 0, dodoDeleted });
  } catch (err) {
    console.error("Failed to delete coupon:", err);
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 });
  }
}
