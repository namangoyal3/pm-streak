import { createHmac, timingSafeEqual } from "node:crypto";
import { paddleApiBase } from "./paddle-config";

export function verifyPaddleWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string
): boolean {
  if (!signatureHeader) return false;
  const parts = signatureHeader.split(";").map((p) => p.trim());
  const ts = parts.find((p) => p.startsWith("ts="))?.slice(3);
  const h1 = parts.find((p) => p.startsWith("h1="))?.slice(3);
  if (!ts || !h1) return false;

  const signedPayload = `${ts}:${rawBody}`;
  const expected = createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  try {
    const a = Buffer.from(h1, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function createPaddleCheckout(opts: {
  priceId: string;
  userId: string;
}): Promise<{ checkoutUrl: string }> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) {
    throw new Error("PADDLE_API_KEY is not configured");
  }

  const res = await fetch(`${paddleApiBase()}/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Paddle-Version": "1",
    },
    body: JSON.stringify({
      items: [{ price_id: opts.priceId, quantity: 1 }],
      custom_data: { user_id: opts.userId },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Paddle checkout failed (${res.status}): ${text}`);
  }

  let json: { data?: { checkout?: { url?: string } } };
  try {
    json = JSON.parse(text) as typeof json;
  } catch {
    throw new Error("Paddle checkout: invalid JSON");
  }

  const checkoutUrl = json.data?.checkout?.url;
  if (!checkoutUrl) {
    throw new Error("Paddle checkout: missing checkout URL");
  }

  return { checkoutUrl };
}

export async function createPaddlePortalSession(
  paddleCustomerId: string
): Promise<{ portalUrl: string }> {
  const key = process.env.PADDLE_API_KEY;
  if (!key) {
    throw new Error("PADDLE_API_KEY is not configured");
  }

  const res = await fetch(
    `${paddleApiBase()}/customers/${paddleCustomerId}/portal-sessions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Paddle-Version": "1",
      },
      body: JSON.stringify({}),
    }
  );

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Paddle portal failed (${res.status}): ${text}`);
  }

  const json = JSON.parse(text) as {
    data?: { urls?: { general?: string } };
  };
  const portalUrl = json.data?.urls?.general;
  if (!portalUrl) {
    throw new Error("Paddle portal: missing URL");
  }
  return { portalUrl };
}
