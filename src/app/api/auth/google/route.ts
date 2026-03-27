import { NextRequest, NextResponse } from "next/server";
import { getCanonicalOrigin } from "@/lib/app-origin";

export async function GET(req: NextRequest) {
  const origin = getCanonicalOrigin(req.nextUrl.origin);
  const redirectUri = `${origin}/api/auth/google/callback`;

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("Missing GOOGLE_CLIENT_ID environment variable");
    return NextResponse.redirect(new URL(`/login?error=google_failed`, origin));
  }

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "email profile");
  url.searchParams.set("prompt", "select_account");

  return NextResponse.redirect(url.toString());
}
