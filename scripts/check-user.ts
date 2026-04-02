import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: "maximiliano.oge@gmail.com" } });
  const coupon = await prisma.coupon.findUnique({ where: { code: "l6m8FXspfm3OEAf_" } });
  
  console.log("User Data:", user ? { country: user.country } : "NOT_FOUND");
  console.log("Coupon Data:", coupon ? { discountPercent: coupon.discountPercent } : "NOT_FOUND");
}

main().catch(console.error).finally(() => prisma.$disconnect());
