import { NextResponse } from "next/server";

/**
 * Validates the Authorization header against CRON_SECRET.
 *
 * Fails closed:
 *  - 500 if CRON_SECRET env var is unset (prevents "Bearer undefined" comparisons)
 *  - 401 if the header does not match "Bearer <CRON_SECRET>"
 *
 * Returns null on success, or a NextResponse on failure.
 *
 * Usage:
 *   const deny = assertCronAuth(req);
 *   if (deny) return deny;
 */
export function assertCronAuth(req: Request | { headers: { get(name: string): string | null } }): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server misconfigured: CRON_SECRET env var is required" },
      { status: 500 }
    );
  }
  const auth = (req as { headers: { get(name: string): string | null } }).headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
