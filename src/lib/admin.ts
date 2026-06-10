import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Require the current request to be made by an authenticated admin user.
 *
 * Fails closed:
 *  - 401 if not authenticated
 *  - 500 if ADMIN_EMAIL env var is unset (misconfigured server)
 *  - 403 if the user's email does not match ADMIN_EMAIL
 *
 * Returns the userId and email on success, or a NextResponse on failure.
 */
export type AdminGuardResult =
  | { ok: true; userId: string; email: string }
  | { ok: false; response: NextResponse };

export async function requireAdmin(): Promise<AdminGuardResult> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Server misconfigured: ADMIN_EMAIL env var is required" },
        { status: 500 }
      ),
    };
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }),
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  if (!user || user.email !== adminEmail) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true, userId, email: user.email };
}
