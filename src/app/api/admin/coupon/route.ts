import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCouponData } from "@/lib/coupon";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com";

function isAdmin(email: string | null): boolean {
  return email === ADMIN_EMAIL;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, discountPercent, expiresInMinutes = 5 } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const discount = typeof discountPercent === "number" 
      ? Math.max(1, Math.min(100, discountPercent)) 
      : 70;

    const expiryMinutes = typeof expiresInMinutes === "number"
      ? Math.max(1, Math.min(60 * 24, expiresInMinutes))
      : 5;

    const { code, expiresAt, signature } = createCouponData(email, discount, expiryMinutes);

    const coupon = await prisma.coupon.create({
      data: {
        code,
        email: email.toLowerCase(),
        discountPercent: discount,
        signature,
        expiresAt,
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
