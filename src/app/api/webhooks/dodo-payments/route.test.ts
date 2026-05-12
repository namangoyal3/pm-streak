import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

type CreateArgs = { data: { provider: string; eventType: string; payload: string; externalId: string | null; userId: string | null } };

const prismaState = {
  createCalls: [] as CreateArgs[],
  duplicateOnNextCreate: false,
  userId: "user_abc" as string | null,
};

const granterCalls = {
  grantDodoPro: [] as unknown[],
  setDodoSubscriptionCancelling: [] as unknown[],
  revokeDodoPro: [] as unknown[],
  userUpdate: [] as unknown[],
};

vi.mock("@/lib/prisma", () => ({
  prisma: {
    billingEvent: {
      create: vi.fn(async (args: CreateArgs) => {
        if (prismaState.duplicateOnNextCreate) {
          prismaState.duplicateOnNextCreate = false;
          throw Object.assign(new Error("Unique constraint failed"), { code: "P2002" });
        }
        prismaState.createCalls.push(args);
        return { id: "be_" + prismaState.createCalls.length, ...args.data };
      }),
    },
    user: {
      findFirst: vi.fn(async () => (prismaState.userId ? { id: prismaState.userId } : null)),
      update: vi.fn(async (args: unknown) => {
        granterCalls.userUpdate.push(args);
        return { id: "user_abc" };
      }),
    },
  },
}));

vi.mock("@/lib/billing/dodo-server", () => ({
  findUserByEmail: vi.fn(async () => (prismaState.userId ? { id: prismaState.userId } : null)),
  grantDodoPro: vi.fn(async (args: unknown) => {
    granterCalls.grantDodoPro.push(args);
  }),
  setDodoSubscriptionCancelling: vi.fn(async (args: unknown) => {
    granterCalls.setDodoSubscriptionCancelling.push(args);
  }),
  revokeDodoPro: vi.fn(async (args: unknown) => {
    granterCalls.revokeDodoPro.push(args);
  }),
}));

// Bypass Standard Webhooks signature verification: run the registered handler
// for whichever payload.type the test sends, mirroring the real factory's
// dispatch table.
vi.mock("@dodopayments/nextjs", () => ({
  Webhooks: (config: Record<string, unknown> & { webhookKey: string }) => {
    const dispatch: Record<string, string> = {
      "subscription.active": "onSubscriptionActive",
      "subscription.renewed": "onSubscriptionRenewed",
      "subscription.cancelled": "onSubscriptionCancelled",
      "subscription.expired": "onSubscriptionExpired",
      "subscription.failed": "onSubscriptionFailed",
    };
    return async (req: NextRequest) => {
      const body = await req.text();
      const payload = JSON.parse(body);
      const handlerName = dispatch[payload.type];
      const handler = handlerName ? (config[handlerName] as ((p: unknown) => Promise<void>) | undefined) : undefined;
      if (handler) await handler(payload);
      return new Response(null, { status: 200 });
    };
  },
}));

function buildSubscriptionActivePayload(eventId = "evt_test_123"): { event: Record<string, unknown>; eventId: string } {
  const event = {
    type: "subscription.active",
    business_id: "biz_test",
    timestamp: new Date("2026-05-13T00:00:00Z").toISOString(),
    data: {
      payload_type: "Subscription",
      subscription_id: "sub_test_001",
      product_id: "pdt_test_pro",
      next_billing_date: "2026-06-13T00:00:00Z",
      customer: {
        customer_id: "cus_test_001",
        email: "buyer@example.com",
        name: "Test Buyer",
        metadata: {},
        phone_number: null,
      },
    },
  };
  return { event, eventId };
}

function buildRequest(event: Record<string, unknown>, eventId: string | null): NextRequest {
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "webhook-timestamp": "1715558400",
    "webhook-signature": "v1,ignored-by-mocked-factory",
  };
  if (eventId) headers["webhook-id"] = eventId;
  return new NextRequest("https://example.com/api/webhooks/dodo-payments", {
    method: "POST",
    headers,
    body: JSON.stringify(event),
  });
}

describe("POST /api/webhooks/dodo-payments — BillingEvent recording", () => {
  beforeEach(() => {
    prismaState.createCalls = [];
    prismaState.duplicateOnNextCreate = false;
    prismaState.userId = "user_abc";
    granterCalls.grantDodoPro = [];
    granterCalls.setDodoSubscriptionCancelling = [];
    granterCalls.revokeDodoPro = [];
    granterCalls.userUpdate = [];
    process.env.DODO_PAYMENTS_WEBHOOK_SECRET = "whsec_test";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 500 when DODO_PAYMENTS_WEBHOOK_SECRET is not set", async () => {
    delete process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();
    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(500);
    expect(prismaState.createCalls).toHaveLength(0);
  });

  it("writes a BillingEvent row before granting Pro on subscription.active", async () => {
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();

    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(200);

    expect(prismaState.createCalls).toHaveLength(1);
    const row = prismaState.createCalls[0].data;
    expect(row.provider).toBe("dodo");
    expect(row.eventType).toBe("subscription.active");
    expect(row.externalId).toBe(eventId);
    expect(row.userId).toBe("user_abc");
    // Full event JSON is persisted, not just the inner data
    const parsed = JSON.parse(row.payload);
    expect(parsed.type).toBe("subscription.active");
    expect(parsed.data.subscription_id).toBe("sub_test_001");

    // Granter still runs after recording
    expect(granterCalls.grantDodoPro).toHaveLength(1);
  });

  it("is idempotent when the same external event id is replayed", async () => {
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();

    await POST(buildRequest(event, eventId));
    // simulate Prisma's P2002 on the duplicate insert
    prismaState.duplicateOnNextCreate = true;
    const res = await POST(buildRequest(event, eventId));

    expect(res.status).toBe(200);
    // First write recorded; second was swallowed (duplicate)
    expect(prismaState.createCalls).toHaveLength(1);
    // Granter still re-ran (Dodo's grantDodoPro is itself idempotent on subscription id)
    expect(granterCalls.grantDodoPro).toHaveLength(2);
  });

  it("records BillingEvent even when no user can be resolved", async () => {
    prismaState.userId = null;
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();

    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(200);
    expect(prismaState.createCalls).toHaveLength(1);
    expect(prismaState.createCalls[0].data.userId).toBeNull();
    expect(granterCalls.grantDodoPro).toHaveLength(0);
  });

  it("skips BillingEvent write when webhook-id header is missing", async () => {
    const { POST } = await import("./route");
    const { event } = buildSubscriptionActivePayload();

    const res = await POST(buildRequest(event, null));
    expect(res.status).toBe(200);
    expect(prismaState.createCalls).toHaveLength(0);
  });

  it("records BillingEvent and revokes Pro on subscription.expired", async () => {
    const { POST } = await import("./route");
    const event = {
      type: "subscription.expired",
      business_id: "biz_test",
      timestamp: new Date("2026-05-13T00:00:00Z").toISOString(),
      data: {
        payload_type: "Subscription",
        subscription_id: "sub_test_001",
        product_id: "pdt_test_pro",
        next_billing_date: "2026-06-13T00:00:00Z",
        customer: {
          customer_id: "cus_test_001",
          email: "buyer@example.com",
          name: "Test Buyer",
          metadata: {},
          phone_number: null,
        },
      },
    };

    const res = await POST(buildRequest(event, "evt_expired_1"));
    expect(res.status).toBe(200);
    expect(prismaState.createCalls).toHaveLength(1);
    expect(prismaState.createCalls[0].data.eventType).toBe("subscription.expired");
    expect(granterCalls.revokeDodoPro).toHaveLength(1);
  });
});
