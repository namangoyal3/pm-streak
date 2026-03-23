import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    // Find the demo user from seed
    let user = await prisma.user.findUnique({
      where: { email: "demo@pmstreak.com" },
    });

    if (!user) {
      // Fallback: create if missing (though seed should handle it)
      user = await prisma.user.create({
        data: {
          email: "demo@pmstreak.com",
          name: "Demo PM",
          streakFreezes: 5,
          gems: 1000,
          onboarded: true,
        },
      });
    }

    const token = await signToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Demo login error:", err);
    return NextResponse.json({ error: "Demo login failed" }, { status: 500 });
  }
}
