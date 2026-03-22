import type { BillingInterval } from "./catalog";
import type { PriceBand } from "./price-bands";

/**
 * Map Paddle price IDs from env. Configure in Paddle dashboard per band × interval.
 * Example: PADDLE_PRICE_MONTHLY_A, PADDLE_PRICE_QUARTERLY_A, ...
 */
const ENV_KEYS: Record<
  PriceBand,
  Record<BillingInterval, string>
> = {
  A: {
    monthly: "PADDLE_PRICE_MONTHLY_A",
    quarterly: "PADDLE_PRICE_QUARTERLY_A",
    yearly: "PADDLE_PRICE_YEARLY_A",
  },
  B: {
    monthly: "PADDLE_PRICE_MONTHLY_B",
    quarterly: "PADDLE_PRICE_QUARTERLY_B",
    yearly: "PADDLE_PRICE_YEARLY_B",
  },
  C: {
    monthly: "PADDLE_PRICE_MONTHLY_C",
    quarterly: "PADDLE_PRICE_QUARTERLY_C",
    yearly: "PADDLE_PRICE_YEARLY_C",
  },
};

export function getPaddlePriceId(
  band: PriceBand,
  interval: BillingInterval
): string | undefined {
  const name = ENV_KEYS[band][interval];
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export function paddleApiBase(): string {
  return process.env.PADDLE_ENVIRONMENT === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";
}
