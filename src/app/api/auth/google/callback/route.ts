import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=google_cancelled", appUrl));
  }

  try {
    const redirectUri = `${appUrl}/api/auth/google/callback`;

    // Exchange code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL("/login?error=google_failed", appUrl));
    }

    const { access_token } = await tokenRes.json();

    // Get Google user info
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userInfoRes.ok) {
      return NextResponse.redirect(new URL("/login?error=google_failed", appUrl));
    }

    const { id: googleId, email, name, picture } = await userInfoRes.json();

    // Find existing user by googleId or email
    let user = await prisma.user.findFirst({
      where: { OR: [{ googleId }, { email }] },
    });

    if (!user) {
      // New user — create account
      user = await prisma.user.create({
        data: {
          googleId,
          email,
          name: name || email.split("@")[0],
          passwordHash: null,
          avatarUrl: picture,
          streakFreezes: 2,
          gems: 50,
        },
      });
    } else {
      // Existing user — link Google and sync name + avatar from Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId || googleId,
          name: name || user.name,
          avatarUrl: picture || user.avatarUrl,
        },
      });
    }

    const token = await signToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const redirectTo = user.onboarded ? "/dashboard" : "/onboarding";
    return NextResponse.redirect(new URL(redirectTo, appUrl));
  } catch (err) {
    console.error("Google OAuth error:", err);
    return NextResponse.redirect(new URL("/login?error=google_failed", appUrl));
  }
}
