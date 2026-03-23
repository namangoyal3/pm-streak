import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signPasswordResetToken } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = await signPasswordResetToken(user.id);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;
    await sendPasswordResetEmail({
      toEmail: user.email,
      toName: user.name,
      resetUrl,
    }).catch(() => {});
  }

  // Avoid user enumeration: always return success.
  return NextResponse.json({
    ok: true,
    message: "If that email exists, a reset link has been sent.",
  });
}
