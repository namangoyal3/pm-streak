"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { BillingInterval } from "@/lib/billing/catalog";
import { cn } from "@/lib/utils";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type CheckoutResponse = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
  };
  theme: {
    color: string;
  };
  notes: Record<string, string>;
};

let razorpayScriptPromise: Promise<boolean> | null = null;

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if ((window as Window & { Razorpay?: unknown }).Razorpay) {
    return Promise.resolve(true);
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve) => {
      const existing = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      ) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  return razorpayScriptPromise;
}

async function createOrder(plan: BillingInterval) {
  const res = await fetch("/api/billing/razorpay/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  if (res.status === 401) {
    return { needsAuth: true as const };
  }

  const data = (await res.json()) as
    | { error?: string; checkout?: CheckoutResponse }
    | { needsAuth?: boolean };

  if (!res.ok || !("checkout" in data) || !data.checkout) {
    const message = "error" in data && data.error ? data.error : "Unable to start Razorpay checkout";
    throw new Error(message);
  }

  return { checkout: data.checkout };
}

export default function RazorpayCheckoutButton({
  plan,
  className,
  children,
}: {
  plan: BillingInterval;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function confirmPayment(response: RazorpayResponse) {
    const verifyRes = await fetch("/api/billing/razorpay/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      }),
    });

    const payload = (await verifyRes.json()) as { error?: string };
    if (!verifyRes.ok) {
      throw new Error(payload.error ?? "Payment verification failed");
    }
  }

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    try {
      const result = await createOrder(plan);
      if ("needsAuth" in result) {
        router.push("/signup?redirect=/pricing");
        return;
      }

      const ready = await loadRazorpayScript();
      if (!ready) {
        razorpayScriptPromise = null;
        throw new Error("Failed to load Razorpay checkout");
      }

      const RazorpayCtor = (window as Window & {
        Razorpay?: new (options: Record<string, unknown>) => {
          open: () => void;
          on?: (event: string, callback: () => void) => void;
        };
      }).Razorpay;

      if (!RazorpayCtor) {
        throw new Error("Razorpay checkout is unavailable");
      }

      const checkout = new RazorpayCtor({
        key: result.checkout.keyId,
        amount: result.checkout.amount,
        currency: result.checkout.currency,
        name: result.checkout.name,
        description: result.checkout.description,
        order_id: result.checkout.orderId,
        prefill: result.checkout.prefill,
        notes: result.checkout.notes,
        theme: result.checkout.theme,
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
        handler: async (response: RazorpayResponse) => {
          try {
            await confirmPayment(response);
            router.replace("/dashboard?checkout=success&gateway=razorpay");
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "Payment verification failed";
            alert(message);
            setLoading(false);
          }
        },
      });

      checkout.open();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to start Razorpay checkout";
      alert(message);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(className, loading && "opacity-70 cursor-not-allowed")}
    >
      {loading ? "Opening Razorpay..." : children}
    </button>
  );
}
