/**
 * Server-side A/B variant reader.
 * Cookie assignment happens in middleware (src/middleware.ts).
 * This function only reads — safe to call in any Server Component.
 */

import { cookies } from "next/headers";

export type ABVariant = "control" | "treatment";

const COOKIE_NAME = "ab_uid";

export async function getVariant(experiment: string): Promise<ABVariant> {
  const jar = await cookies();
  const uid = jar.get(COOKIE_NAME)?.value;

  // No cookie yet (first request — middleware sets it on the response, not the
  // request, so it won't be readable until the next page load). Default to
  // treatment so cold/unassigned traffic always sees the trial CTA offer
  // (conversion fix DIR-01: "control" was silently hiding the offer from new visitors).
  if (!uid) return "treatment";

  // Stable hash: deterministic split on uid + experiment name
  const seed = `${uid}:${experiment}`; // uid is guaranteed non-empty here
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return hash % 2 === 0 ? "control" : "treatment";
}
