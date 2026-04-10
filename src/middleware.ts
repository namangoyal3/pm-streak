import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "ab_uid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Assign a stable A/B uid cookie if not present
  if (!request.cookies.get(COOKIE_NAME)) {
    const uid = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    response.cookies.set(COOKIE_NAME, uid, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/pricing"],
};
