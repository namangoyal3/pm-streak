export function getCanonicalOrigin(fallbackOrigin: string): string {
  const configured =
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "");

  const origin = configured || fallbackOrigin;
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}
