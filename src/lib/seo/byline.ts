// Single source of truth for the site author identity (E-E-A-T / GEO-06).
// Feeds Person JSON-LD + visible bylines across the SEO landers and /about,
// mirroring the GEO_CONTENT_AUTHOR pattern in learn/[vertical]/[slug]/page.tsx.
export const AUTHOR_NAME = process.env.GEO_CONTENT_AUTHOR || "Naman Goyal";
export const AUTHOR_URL = process.env.GEO_CONTENT_AUTHOR_URL || "/about";
export const AUTHOR_CREDENTIAL = "Product manager · Builder of PM Streak";
