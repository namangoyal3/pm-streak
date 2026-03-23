import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { sendWelcomeEmail } from "@/lib/email";

function safeReason(input: string | undefined) {
  if (!input) return "unknown";
  return input.toLowerCase().replace(/[^a-z0-9_ -]/g, "").slice(0, 120);
}

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.redirect(
      new URL("/login?error=google_not_configured", origin)
    );
  }
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
      let reason = "token_exchange_failed";
      try {
        const parsed = JSON.parse(errorText) as {
          error?: string;
          error_description?: string;
        };
        reason = safeReason(
          parsed.error_description || parsed.error || reason
        );
      } catch {
        reason = safeReason(errorText || reason);
      }
      console.error("Google token exchange failed:", {
        status: tokenRes.status,
        error: errorText,
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID?.slice(0, 10) + "...",
          redirect_uri: redirectUri,
        }
      });
      return NextResponse.redirect(
        new URL(`/login?error=google_failed&reason=${encodeURIComponent(reason)}`, origin)
      );
    }

    const { access_token } = await tokenRes.json();

    // Get Google user info
    const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userInfoRes.ok) {
      const errorText = await userInfoRes.text();
      const reason = safeReason(errorText || "userinfo_failed");
      console.error("Google user info fetch failed:", {
        status: userInfoRes.status,
        error: errorText,
      });
      return NextResponse.redirect(
        new URL(`/login?error=google_failed&reason=${encodeURIComponent(reason)}`, origin)
      );
    }

    const { id: googleId, email, name, picture } = await userInfoRes.json();
    if (!email) {
      return NextResponse.redirect(
        new URL("/login?error=google_failed&reason=missing_email_scope", origin)
      );
    }

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
      // Fire-and-forget welcome email
      sendWelcomeEmail({ toEmail: email, toName: user.name }).catch(() => {});
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
    return NextResponse.redirect(new URL(redirectTo, origin));
  } catch (err) {
    console.error("Google OAuth error:", err);
    const reason = safeReason(
      err instanceof Error ? err.message : "oauth_exception"
    );
    return NextResponse.redirect(
      new URL(`/login?error=google_failed&reason=${encodeURIComponent(reason)}`, origin)
    );
  }
}
