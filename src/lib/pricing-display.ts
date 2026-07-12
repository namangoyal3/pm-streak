const LAUNCH_DISCOUNT_RATE = 0.7;

/**
 * Given a discounted display price (e.g. "₹669" or "$6"), returns the
 * original MRP such that the discounted price is exactly
 * LAUNCH_DISCOUNT_RATE (70%) off the returned value.
 */
export function calculateMRP(discountedPrice: string, isIndia: boolean): string {
  const numMatch = discountedPrice.match(/[\d,.]+/);
  if (!numMatch) return discountedPrice;

  const num = parseFloat(numMatch[0].replace(/,/g, ""));
  const mrp = Math.round(num / (1 - LAUNCH_DISCOUNT_RATE));

  if (isIndia) {
    return `₹${mrp.toLocaleString("en-IN")}`;
  }
  return `$${mrp}`;
}
