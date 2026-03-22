import type { PriceBand } from "./price-bands";

/** Display-only amounts (anchor USD / INR). Paddle handles tax & localized charge. */
export const DISPLAY_PRICES: Record<
  PriceBand,
  { monthly: string; quarterly: string; yearly: string; yearlyNote: string }
> = {
  A: {
    monthly: "$10",
    quarterly: "$24",
    yearly: "$79",
    yearlyNote: "per month billed annually",
  },
  B: {
    monthly: "$7",
    quarterly: "$18",
    yearly: "$54",
    yearlyNote: "per month billed annually",
  },
  C: {
    monthly: "₹299",
    quarterly: "₹699",
    yearly: "₹2,499",
    yearlyNote: "per month billed annually",
  },
};

export type BillingInterval = "monthly" | "quarterly" | "yearly";
