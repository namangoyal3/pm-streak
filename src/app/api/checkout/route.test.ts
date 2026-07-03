import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

// Regression: Dodo product-ID env vars and the caller-supplied ?productId were
// stored/passed with a trailing newline, leaking %0A into the checkout URL and
// the post-payment redirect_url. The route must trim both before building the URL.

const authMock = vi.fn(async () => null as string | null);
vi.mock("@/lib/auth", () => ({ getCurrentUserId: () => authMock() }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findUnique: vi.fn() }, coupon: { findUnique: vi.fn() } } }));
vi.mock("@/lib/ga4-server", () => ({
  serverEvents: {
    checkoutInitiated: vi.fn(), checkoutError: vi.fn(),
    checkoutDodoRedirect: vi.fn(),
  },
}));
vi.mock("@/lib/acquisition", () => ({ recordAcquisitionEvent: vi.fn() }));

function makeReq(url: string) {
  return { nextUrl: new URL(url), headers: new Headers() } as unknown as import("next/server").NextRequest;
}

describe("checkout GET — newline hygiene", () => {
  beforeEach(() => {
    vi.resetModules();
    authMock.mockResolvedValue(null);
    process.env.DODO_PAYMENTS_ENVIRONMENT = "live_mode\n";
    process.env.DODO_PAYMENTS_RETURN_URL = "https://learnanything.pro/dashboard?checkout=success\n";
    process.env.NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID = "pdt_quarterly\n";
  });
  afterEach(() => vi.clearAllMocks());

  it("uses the trimmed env product ID when no productId is supplied", async () => {
    const { GET } = await import("./route");
    const res = await GET(makeReq("https://x/api/checkout?plan=quarterly"));
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain("/buy/pdt_quarterly");
    expect(loc).not.toContain("%0A");
  });

  it("uses the plan's configured product over a caller-supplied productId (no arbitrary purchase)", async () => {
    const { GET } = await import("./route");
    // Caller tries to check out a product that isn't the quarterly plan's product.
    const res = await GET(makeReq("https://x/api/checkout?plan=quarterly&productId=pdt_someone_elses%0A"));
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain("/buy/pdt_quarterly");
    expect(loc).not.toContain("pdt_someone_elses");
    expect(loc).not.toContain("%0A");
  });

  it("falls back to the URL productId when the plan is unknown", async () => {
    const { GET } = await import("./route");
    const res = await GET(makeReq("https://x/api/checkout?productId=pdt_direct%0A"));
    const loc = res.headers.get("location") ?? "";
    expect(loc).toContain("/buy/pdt_direct");
    expect(loc).not.toContain("%0A");
  });

  it("keeps the redirect_url free of the env trailing newline", async () => {
    const { GET } = await import("./route");
    const res = await GET(makeReq("https://x/api/checkout?plan=quarterly&productId=pdt_abc"));
    const loc = res.headers.get("location") ?? "";
    const redirect = new URL(loc).searchParams.get("redirect_url") ?? "";
    expect(redirect).toBe("https://learnanything.pro/dashboard?checkout=success");
    expect(redirect).not.toContain("\n");
  });
});
