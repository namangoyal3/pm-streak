import { CustomerPortal } from "@dodopayments/nextjs";

const env =
  (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode" | undefined) ??
  "test_mode";

/**
 * Redirects authenticated users to the Dodo Payments customer portal.
 * Query param: customer_id (required)
 */
export const GET = CustomerPortal({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  environment: env,
});
