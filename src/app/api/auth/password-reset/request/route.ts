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
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (user) {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Password reset email service is unavailable. Try again shortly." },
        { status: 503 }
      );
    }

    const token = await signPasswordResetToken(user.id);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;
    const loginUrl = `${appUrl}/api/auth/password-reset/login?token=${encodeURIComponent(token)}`;
    try {
      await sendPasswordResetEmail({
        toEmail: user.email,
        toName: user.name,
        resetUrl,
        loginUrl,
      });
    } catch {
      return NextResponse.json(
        { error: "Could not send reset email. Please retry in a minute." },
        { status: 502 }
      );
    }
  }

  // Avoid user enumeration: always return success.
  return NextResponse.json({
    ok: true,
    message: "If that email exists, a reset link has been sent.",
  });
}
