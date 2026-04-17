import crypto from "crypto";
import { afterEach, describe, expect, it } from "vitest";
import {
  getRazorpayPlanConfig,
  verifyRazorpayCheckoutSignature,
} from "@/lib/billing/razorpay-server";

describe("razorpay-server", () => {
  const envBackup = {
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    publicKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  };

  afterEach(() => {
    process.env.RAZORPAY_KEY_SECRET = envBackup.keySecret;
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = envBackup.publicKeyId;
  });

  it("uses the expected live INR plan amounts", () => {
    expect(getRazorpayPlanConfig("monthly")).toMatchObject({
      amount: 24900,
      billingInterval: "month",
    });
    expect(getRazorpayPlanConfig("quarterly")).toMatchObject({
      amount: 66900,
      billingInterval: "quarter",
    });
    expect(getRazorpayPlanConfig("yearly")).toMatchObject({
      amount: 124900,
      billingInterval: "year",
    });
  });

  it("verifies Razorpay checkout signatures", () => {
    process.env.RAZORPAY_KEY_SECRET = "test_secret";

    const orderId = "order_test_123";
    const paymentId = "pay_test_456";
    const signature = crypto
      .createHmac("sha256", "test_secret")
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    expect(
      verifyRazorpayCheckoutSignature({ orderId, paymentId, signature })
    ).toBe(true);
    expect(
      verifyRazorpayCheckoutSignature({
        orderId,
        paymentId,
        signature: signature.slice(0, -1) + "0",
      })
    ).toBe(false);
  });
});
