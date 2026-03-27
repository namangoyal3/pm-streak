/**
 * Fixed-amount UPI QR images for India (static QR per plan).
 * Bundled assets in /public (see BUNDLED); override with NEXT_PUBLIC_* in .env if needed.
 */

/** Default QR assets shipped in `public/` — amounts match fixed UPI QR totals. */
const BUNDLED = {
  yearly: {
    path: "/india-upi-yearly.png",
    amount: "₹1,899 / year",
    title: "Yearly Pro",
  },
  quarterly: {
    path: "/india-upi-quarterly.png",
    amount: "₹1,699 / 3 months",
    title: "Quarterly Pro",
  },
  monthly: {
    path: "/india-upi-monthly.png",
    amount: "₹499 / month",
    title: "Monthly Pro",
  },
} as const;

export type IndiaUpiPlan = {
  /** Public URL to QR image (PNG/WebP) */
  qrImageUrl: string;
  /** Shown next to the QR, e.g. "₹4,999 / year" */
  amountLabel: string;
  /** Short title, e.g. "Yearly Pro" */
  title: string;
};

function push(
  out: IndiaUpiPlan[],
  url: string | undefined,
  amountLabel: string | undefined,
  title: string | undefined,
) {
  const u = url?.trim();
  if (!u) return;
  out.push({
    qrImageUrl: u,
    amountLabel: amountLabel?.trim() || "See amount on QR",
    title: title?.trim() || "Pro",
  });
}

/** Returns configured India UPI plans (empty if none — hide the block). */
export function getIndiaUpiPlans(): IndiaUpiPlan[] {
  const out: IndiaUpiPlan[] = [];
  push(
    out,
    process.env.NEXT_PUBLIC_INDIA_UPI_YEARLY_QR_URL?.trim() || BUNDLED.yearly.path,
    process.env.NEXT_PUBLIC_INDIA_UPI_YEARLY_AMOUNT?.trim() || BUNDLED.yearly.amount,
    process.env.NEXT_PUBLIC_INDIA_UPI_YEARLY_TITLE?.trim() || BUNDLED.yearly.title,
  );
  push(
    out,
    process.env.NEXT_PUBLIC_INDIA_UPI_QUARTERLY_QR_URL?.trim() || BUNDLED.quarterly.path,
    process.env.NEXT_PUBLIC_INDIA_UPI_QUARTERLY_AMOUNT?.trim() || BUNDLED.quarterly.amount,
    process.env.NEXT_PUBLIC_INDIA_UPI_QUARTERLY_TITLE?.trim() || BUNDLED.quarterly.title,
  );
  push(
    out,
    process.env.NEXT_PUBLIC_INDIA_UPI_MONTHLY_QR_URL?.trim() || BUNDLED.monthly.path,
    process.env.NEXT_PUBLIC_INDIA_UPI_MONTHLY_AMOUNT?.trim() || BUNDLED.monthly.amount,
    process.env.NEXT_PUBLIC_INDIA_UPI_MONTHLY_TITLE?.trim() || BUNDLED.monthly.title,
  );
  // Single fallback when only one generic QR is set
  if (out.length === 0) {
    push(
      out,
      process.env.NEXT_PUBLIC_INDIA_UPI_QR_URL,
      process.env.NEXT_PUBLIC_INDIA_UPI_AMOUNT,
      process.env.NEXT_PUBLIC_INDIA_UPI_TITLE,
    );
  }
  return out;
}
