import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isUserPro } from "@/lib/entitlements";

/**
 * Monthly credit refresh cron.
 * Called by Vercel Cron on the 1st of each month.
 * Free users: 10 credits. Pro users: 50 credits.
 */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { creditsRefreshedAt: null },
        { creditsRefreshedAt: { lt: startOfMonth } },
      ],
    },
    select: { id: true },
  });

  let refreshed = 0;
  for (const user of users) {
    const newCredits = (await isUserPro(user.id)) ? 50 : 10;
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { credits: newCredits, creditsRefreshedAt: now },
      }),
      prisma.creditTransaction.create({
        data: { userId: user.id, amount: newCredits, reason: "monthly_refresh" },
      }),
    ]);
    refreshed++;
  }

  return NextResponse.json({ refreshed, total: users.length });
}
