import { prisma } from "@/lib/prisma";

export async function getValidCheckoutCoupon(opts: {
  code?: string | null;
  email?: string | null;
  sessionEmail?: string | null;
}): Promise<{ code: string; discountPercent: number } | null> {
  const rawCode = opts.code?.trim();
  if (!rawCode) return null;

  const coupon = await prisma.coupon.findUnique({
    where: { code: rawCode },
  });

  if (!coupon) return null;

  const checkoutEmail = opts.email?.trim().toLowerCase() ?? null;
  const sessionEmail = opts.sessionEmail?.trim().toLowerCase() ?? null;
  const couponEmail = coupon.email.toLowerCase();

  const isGlobal = coupon.email === "*";
  const sessionEmailMatch = sessionEmail && couponEmail === sessionEmail;
  const emailParamMatch = !sessionEmail && checkoutEmail && couponEmail === checkoutEmail;

  if (!isGlobal && !sessionEmailMatch && !emailParamMatch) {
    return null;
  }

  return {
    code: coupon.code,
    discountPercent: coupon.discountPercent,
  };
}
