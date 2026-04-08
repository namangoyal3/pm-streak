/**
 * Lightweight server-side A/B assignment.
 * Uses a stable cookie so users always see the same variant.
 * 50/50 split determined by hashing the cookie value.
 */

import { cookies } from "next/headers";
import { randomBytes } from "crypto";

export type ABVariant = "control" | "treatment";

const COOKIE_NAME = "ab_uid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

/**
 * Returns the variant for the current user.
 * Assigns and sets a persistent cookie if one doesn't exist.
 * Safe to call in Next.js server components and route handlers.
 */
export async function getVariant(experiment: string): Promise<ABVariant> {
  const jar = await cookies();
  let uid = jar.get(COOKIE_NAME)?.value;

  if (!uid) {
    uid = randomBytes(8).toString("hex");
    jar.set(COOKIE_NAME, uid, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  // Stable hash: XOR bytes of uid + experiment name
  const seed = `${uid}:${experiment}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return hash % 2 === 0 ? "control" : "treatment";
}
