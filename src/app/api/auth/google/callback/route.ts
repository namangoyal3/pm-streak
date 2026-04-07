import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "@/lib/email";
import { getCanonicalOrigin } from "@/lib/app-origin";

export async function GET(req: NextRequest) {
  const origin = getCanonicalOrigin(req.nextUrl.origin);
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=google_cancelled", origin));
  }

  try {
    const redirectUri = `${origin}/api/auth/google/callback`;

    // Exchange code for access token
    const tokenParams = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams,
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Google token exchange failed:", {
        status: tokenRes.status,
        error: errorText,
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) + "...",
          redirect_uri: redirectUri,
        }
      });
      return NextResponse.redirect(new URL("/login?error=google_failed", origin));
    }

    const { access_token } = await tokenRes.json();

    // Get Google user info
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userInfoRes.ok) {
      const errorText = await userInfoRes.text();
      console.error("Google user info fetch failed:", {
        status: userInfoRes.status,
        error: errorText,
      });
      return NextResponse.redirect(new URL("/login?error=google_failed", origin));
    }

    const { id: googleId, email, name, picture } = await userInfoRes.json();

    const reqCountry = req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry");

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
          country: reqCountry || null,
        },
      });
      // Fire-and-forget welcome email
      sendWelcomeEmail({ userId: user.id, toEmail: email, toName: user.name }).catch((err) => {
        console.error("[google-callback] Failed to send welcome email to", email, err);
      });
    } else {
      // Existing user — link Google and sync name + avatar from Google
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId || googleId,
          name: name || user.name,
          avatarUrl: picture || user.avatarUrl,
          country: reqCountry || user.country,
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
    return NextResponse.redirect(new URL(redirectTo, origin));
  } catch (err) {
    console.error("Google OAuth error:", err);
    return NextResponse.redirect(new URL("/login?error=google_failed", origin));
  }
}
