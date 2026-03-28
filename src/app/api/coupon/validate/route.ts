import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { verifyCouponSignature } from "@/lib/coupon";

const MAX_ATTEMPTS_PER_IP = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const attemptCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attemptCounts.get(ip);

  if (!entry || now > entry.resetAt) {
    attemptCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_ATTEMPTS_PER_IP) {
    return false;
  }

  entry.count++;
  return true;
}

function sanitizeError(): NextResponse {
  return NextResponse.json({ error: "Invalid or expired coupon", valid: false }, { status: 400 });
}

async function logAttempt(code: string, ip: string, userId: string | null, success: boolean, reason: string) {
  try {
    await prisma.couponAttempt.create({
      data: { code, ip, userAgent: null, success, reason },
    });
  } catch (e) {
    console.error("Failed to log coupon attempt:", e);
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests", valid: false },
      { status: 429 }
    );
  }

  let code = "";
  try {
    const body = await req.json();
    code = body.code || "";
  } catch {
    return sanitizeError();
  }

  if (!code || typeof code !== "string" || code.length < 10 || code.length > 50) {
    await logAttempt(code, ip, null, false, "invalid_format");
    return sanitizeError();
  }

  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      await logAttempt(code, ip, null, false, "unauthenticated");
      return NextResponse.json({ error: "Login required", valid: false }, { status: 401 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.trim() },
    });

    if (!coupon) {
      await logAttempt(code, ip, userId, false, "not_found");
      return sanitizeError();
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (!user) {
      await logAttempt(code, ip, userId, false, "user_not_found");
      return sanitizeError();
    }

    const emailMatch = user.email.toLowerCase() === coupon.email.toLowerCase();
    if (!emailMatch) {
      await logAttempt(code, ip, userId, false, "email_mismatch");
      return sanitizeError();
    }

    if (coupon.usedAt) {
      await logAttempt(code, ip, userId, false, "already_used");
      return sanitizeError();
    }

    if (Date.now() > coupon.expiresAt.getTime()) {
      await logAttempt(code, ip, userId, false, "expired");
      return sanitizeError();
    }

    const validSignature = verifyCouponSignature(
      coupon.code,
      coupon.email,
      coupon.discountPercent,
      coupon.expiresAt.getTime(),
      coupon.signature
    );

    if (!validSignature) {
      await logAttempt(code, ip, userId, false, "invalid_signature");
      return sanitizeError();
    }

    await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        usedAt: new Date(),
        usedByUserId: userId,
      },
    });

    await logAttempt(code, ip, userId, true, "success");

    return NextResponse.json({
      valid: true,
      discountPercent: coupon.discountPercent,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return sanitizeError();
  }
}
