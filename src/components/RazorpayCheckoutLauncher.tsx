"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  RazorpayCheckoutOrder,
  RazorpayOrderRecordPayload,
} from "@/lib/billing/razorpay-server";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Razorpay can only load in the browser"));
      return;
    }

    if (window.Razorpay) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay checkout")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
}

type CheckoutState = "loading" | "opening" | "verifying" | "failed";

export default function RazorpayCheckoutLauncher(props: {
  keyId: string;
  orderPayload: RazorpayOrderRecordPayload;
  redirectTo: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<CheckoutState>("loading");
  const [message, setMessage] = useState("Preparing secure checkout...");

  useEffect(() => {
    let cancelled = false;

    const startCheckout = async () => {
      try {
        await loadRazorpayScript();
        if (cancelled) return;

        const Razorpay = window.Razorpay;
        if (!Razorpay) {
          throw new Error("Razorpay checkout is unavailable.");
        }

        const order = props.orderPayload.order as RazorpayCheckoutOrder;
        const options = {
          key: props.keyId,
          amount: order.amount,
          currency: order.currency,
          name: "PM Streak",
          description: `${props.orderPayload.planTitle} Pro plan`,
          order_id: order.id,
          prefill: {
            name: props.orderPayload.notes.customer_name ?? props.orderPayload.email.split("@")[0],
            email: props.orderPayload.email,
          },
          notes: props.orderPayload.notes,
          theme: {
            color: "#22c55e",
          },
          modal: {
            backdropclose: false,
            escape: true,
            ondismiss: () => {
              if (cancelled) return;
              setState("failed");
              setMessage("Checkout closed before payment was completed.");
            },
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            if (cancelled) return;
            setState("verifying");
            setMessage("Verifying payment...");

            const verification = await fetch("/api/billing/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...response,
                orderId: order.id,
                plan: props.orderPayload.plan,
              }),
            });

            const data = await verification.json().catch(() => ({}));
            if (!verification.ok || !data?.ok) {
              throw new Error(data?.error || "Verification failed.");
            }

            router.replace(props.redirectTo);
          },
        };

        setState("opening");
        setMessage("Opening Razorpay secure checkout...");
        const checkout = new Razorpay(options);
        checkout.on("payment.failed", (response: any) => {
          if (cancelled) return;
          setState("failed");
          setMessage(
            response?.error?.description ||
              response?.error?.reason ||
              "Payment failed. You can try again."
          );
        });
        checkout.open();
      } catch (error) {
        if (cancelled) return;
        setState("failed");
        setMessage(error instanceof Error ? error.message : "Checkout could not be started.");
      }
    };

    startCheckout();

    return () => {
      cancelled = true;
    };
  }, [props.keyId, props.orderPayload, props.redirectTo, router]);

  const retry = () => {
    setState("loading");
    setMessage("Preparing secure checkout...");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_42%),linear-gradient(180deg,#08110c_0%,#050807_55%,#030504_100%)] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
          <ShieldCheck size={12} /> Razorpay Secure Checkout
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Completing your <span className="text-emerald-400">Pro</span> upgrade
        </h1>
        <p className="mt-3 max-w-xl text-sm text-white/60 sm:text-base">
          {props.orderPayload.planTitle} plan • ₹{props.orderPayload.finalAmount.toLocaleString("en-IN")} •
          {props.orderPayload.discountPercent > 0
            ? ` ${props.orderPayload.discountPercent}% launch discount applied`
            : " secure checkout"}
        </p>

        <div className="mt-8 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex items-center gap-3">
            {state === "failed" ? (
              <AlertTriangle className="h-5 w-5 text-amber-300" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            )}
            <div className="text-left">
              <p className="text-sm font-black">{message}</p>
              <p className="text-xs text-white/50">
                {state === "failed"
                  ? "No charge was completed. You can retry the secure checkout."
                  : "We are opening Razorpay and will redirect you back after payment."}
              </p>
            </div>
          </div>

          {state === "failed" && (
            <button
              type="button"
              onClick={retry}
              className={cn(
                "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3",
                "text-sm font-black text-black transition-colors hover:bg-emerald-300"
              )}
            >
              Retry checkout
            </button>
          )}
        </div>

        <p className="mt-6 max-w-lg text-xs leading-6 text-white/40">
          If the checkout modal does not appear automatically, use the retry button. Your payment will be verified
          server-side before Pro access is activated.
        </p>
      </div>
    </div>
  );
}
