import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COUPON_SECRET = (process.env.COUPON_SECRET || process.env.JWT_SECRET) as string;
if (!COUPON_SECRET) {
  throw new Error("COUPON_SECRET (or JWT_SECRET) env var is required but not set");
}

function signCoupon(code: string, email: string, discountPercent: number, expiresAt: number): string {
  const payload = `${code}:${email === "*" ? "*" : email.toLowerCase()}:${discountPercent}:${expiresAt}`;
  return createHmac("sha256", COUPON_SECRET).update(payload).digest("hex");
}

export function verifyCouponSignature(
  code: string,
  email: string,
  discountPercent: number,
  expiresAt: number,
  signature: string
): boolean {
  const expected = signCoupon(code, email, discountPercent, expiresAt);
  try {
    const a = Buffer.from(signature, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function generateSecureCode(): string {
  return randomBytes(12).toString("base64url");
}

export function createCouponData(
  email: string, 
  discountPercent: number = 70, 
  expiresInMinutes: number = 5
): {
  code: string;
  expiresAt: Date;
  signature: string;
} {
  const code = generateSecureCode();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  const signature = signCoupon(code, email, discountPercent, expiresAt.getTime());
  return { code, expiresAt, signature };
}
