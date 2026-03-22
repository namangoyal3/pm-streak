/**
 * Global price bands (A / B / C) for localized checkout.
 * Tier A: US, CA, UK, EU/EEA, AU, NZ, SG, UAE, JP, KR
 * Tier B: LatAm, SEA (non-SG), TR, ZA, Eastern Europe
 * Tier C: India
 */

export type PriceBand = "A" | "B" | "C";

const TIER_A = new Set([
  "US",
  "CA",
  "GB",
  "UK",
  "AU",
  "NZ",
  "SG",
  "AE",
  "JP",
  "KR",
  // EU / EEA (common codes)
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "CH",
]);

const TIER_C = new Set(["IN"]);

/** Lowercase ISO codes for Tier B defaults (expand as needed) */
const TIER_B = new Set([
  "BR",
  "MX",
  "AR",
  "CL",
  "CO",
  "PE",
  "MY",
  "TH",
  "VN",
  "ID",
  "PH",
  "TR",
  "ZA",
]);

/**
 * Resolve price band from a 2-letter country code (uppercase).
 * Unknown countries default to Tier A (USD anchor).
 */
export function getPriceBandFromCountry(countryCode: string | null | undefined): PriceBand {
  if (!countryCode) return "A";
  const c = countryCode.toUpperCase();
  if (TIER_C.has(c)) return "C";
  if (TIER_A.has(c)) return "A";
  if (TIER_B.has(c)) return "B";
  return "A";
}

export function getCurrencyForBand(band: PriceBand): string {
  if (band === "C") return "INR";
  return "USD";
}
