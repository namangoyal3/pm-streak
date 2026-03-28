#!/usr/bin/env node
import { PrismaClient } from "@prisma/client";
import { createHash, randomBytes } from "crypto";

const prisma = new PrismaClient();
const COUPON_SECRET = process.env.COUPON_SECRET || process.env.JWT_SECRET || "pm-streak-coupon-secret";

function signCoupon(code, email, discountPercent, expiresAt) {
  const payload = `${code}:${email.toLowerCase()}:${discountPercent}:${expiresAt}`;
  return createHash("sha256").update(payload + COUPON_SECRET).digest("hex");
}

function generateSecureCode() {
  return randomBytes(12).toString("base64url");
}

async function main() {
  const email = process.argv[2];
  const discount = parseInt(process.argv[3]) || 70;
  const expiresMinutes = parseInt(process.argv[4]) || 5;
  
  if (!email) {
    console.error("Usage: node scripts/create-coupon.js <email> [discount] [expiresInMinutes]");
    console.error("Example: node scripts/create-coupon.js user@example.com 50 10");
    process.exit(1);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error("Invalid email format");
    process.exit(1);
  }

  const code = generateSecureCode();
  const expiresAt = new Date(Date.now() + expiresMinutes * 60 * 1000);
  const signature = signCoupon(code, email.toLowerCase(), discount, expiresAt.getTime());

  const coupon = await prisma.coupon.create({
    data: {
      code,
      email: email.toLowerCase(),
      discountPercent: discount,
      signature,
      expiresAt,
    },
  });

  console.log("\n✅ Coupon created successfully!\n");
  console.log(`Email:     ${coupon.email}`);
  console.log(`Code:      ${coupon.code}`);
  console.log(`Discount:  ${coupon.discountPercent}%`);
  console.log(`Expires:   ${coupon.expiresAt.toISOString()}`);
  console.log("\nShare this code with the user: " + coupon.code + "\n");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
