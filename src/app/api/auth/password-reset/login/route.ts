import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyPasswordResetToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const origin = req.nextUrl.origin;

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_link", origin));
  }

  const payload = await verifyPasswordResetToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login?error=invalid_link", origin));
  }

  const sessionToken = await signToken(payload.userId);
  const response = NextResponse.redirect(new URL("/dashboard", origin));
  response.cookies.set("token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}
