import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

type CreateArgs = { data: { provider: string; eventType: string; payload: string; externalId: string | null; userId: string | null } };

const prismaState = {
  createCalls: [] as CreateArgs[],
  duplicateOnNextCreate: false,
  userId: "user_abc" as string | null,
  // count() returns this many existing rows of the matching eventType (BEFORE the
  // current create); after `create` runs the effective count is +1. Tests override
  // this to simulate "this is/isn't the first event of its type".
  preInsertCountByEventType: {} as Record<string, number>,
};

const granterCalls = {
  grantDodoPro: [] as unknown[],
  setDodoSubscriptionCancelling: [] as unknown[],
  revokeDodoPro: [] as unknown[],
  userUpdate: [] as unknown[],
};

const resendSends: Array<{ from: string; to: string; subject: string; text: string }> = [];

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
      count: vi.fn(async (args: { where: { provider: string; eventType: string } }) => {
        const before = prismaState.preInsertCountByEventType[args.where.eventType] ?? 0;
        const inserted = prismaState.createCalls.filter(
          (c) => c.data.provider === args.where.provider && c.data.eventType === args.where.eventType
        ).length;
        return before + inserted;
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

vi.mock("resend", () => ({
  Resend: class {
    public emails = {
      send: vi.fn(async (args: { from: string; to: string; subject: string; text: string }) => {
        resendSends.push(args);
        return { id: "email_" + resendSends.length };
      }),
    };
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
    prismaState.preInsertCountByEventType = {};
    granterCalls.grantDodoPro = [];
    granterCalls.setDodoSubscriptionCancelling = [];
    granterCalls.revokeDodoPro = [];
    granterCalls.userUpdate = [];
    resendSends.length = 0;
    process.env.DODO_PAYMENTS_WEBHOOK_SECRET = "whsec_test";
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.EMAIL_FROM = "alerts@learnanything.pro";
    process.env.OPS_ALERT_EMAIL = "ops@learnanything.pro";
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

describe("POST /api/webhooks/dodo-payments — first-event alerting (LEA-7 AC 5)", () => {
  beforeEach(() => {
    prismaState.createCalls = [];
    prismaState.duplicateOnNextCreate = false;
    prismaState.userId = "user_abc";
    prismaState.preInsertCountByEventType = {};
    granterCalls.grantDodoPro = [];
    granterCalls.setDodoSubscriptionCancelling = [];
    granterCalls.revokeDodoPro = [];
    granterCalls.userUpdate = [];
    resendSends.length = 0;
    process.env.DODO_PAYMENTS_WEBHOOK_SECRET = "whsec_test";
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.EMAIL_FROM = "alerts@learnanything.pro";
    process.env.OPS_ALERT_EMAIL = "ops@learnanything.pro";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("sends an ops email on the FIRST subscription.active event ever", async () => {
    // Mocked count returns 0 pre-insert; after recordDodoEvent inserts, post count is 1.
    prismaState.preInsertCountByEventType = { "subscription.active": 0 };
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();

    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(200);

    expect(resendSends).toHaveLength(1);
    const sent = resendSends[0];
    expect(sent.to).toBe("ops@learnanything.pro");
    expect(sent.from).toBe("alerts@learnanything.pro");
    expect(sent.subject).toContain("subscription.active");
    expect(sent.subject.toLowerCase()).toContain("paying customer");
    // Payload is included for context
    expect(sent.text).toContain("sub_test_001");
  });

  it("does NOT send an ops email when this is NOT the first event of its type", async () => {
    // Simulate one already in the DB pre-insert; post count = 2.
    prismaState.preInsertCountByEventType = { "subscription.active": 1 };
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload("evt_second");

    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(200);
    expect(resendSends).toHaveLength(0);
    // BillingEvent recording still happens
    expect(prismaState.createCalls).toHaveLength(1);
  });

  it("uses an 'investigate' subject on the first subscription.failed event", async () => {
    prismaState.preInsertCountByEventType = { "subscription.failed": 0 };
    const event = {
      type: "subscription.failed",
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

    const { POST } = await import("./route");
    const res = await POST(buildRequest(event, "evt_failed_1"));
    expect(res.status).toBe(200);

    expect(resendSends).toHaveLength(1);
    expect(resendSends[0].subject).toContain("subscription.failed");
    expect(resendSends[0].subject.toLowerCase()).toContain("investigate");
  });

  it("does not send when OPS_ALERT_EMAIL is unset (best-effort skip, no throw)", async () => {
    delete process.env.OPS_ALERT_EMAIL;
    prismaState.preInsertCountByEventType = { "subscription.active": 0 };
    const { POST } = await import("./route");
    const { event, eventId } = buildSubscriptionActivePayload();

    const res = await POST(buildRequest(event, eventId));
    expect(res.status).toBe(200);
    expect(resendSends).toHaveLength(0);
    // Webhook still recorded the event and granted Pro
    expect(prismaState.createCalls).toHaveLength(1);
    expect(granterCalls.grantDodoPro).toHaveLength(1);
  });
});
