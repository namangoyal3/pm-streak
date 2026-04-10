"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  variant: "control" | "treatment";
}

export default function PricingPageTrialCTA({ variant }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("ab_experiment_exposure", {
        experiment: "pro_trial_cta_v1",
        variant,
      });
    }
  }, [variant]);

  if (variant === "control") return null;

  async function handleTrialClick() {
    if (loading) return;
    if (typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("ab_cta_clicked", {
        experiment: "pro_trial_cta_v1",
        variant,
      });
    }

    setLoading(true);
    try {
      const res = await fetch("/api/billing/start-trial", { method: "POST" });
      if (res.status === 401) {
        // Not signed in — send to sign-up with redirect back to pricing
        router.push("/auth/signup?redirect=/pricing");
        return;
      }
      if (res.status === 403) {
        // Trial already used
        alert("You've already used your free trial. Upgrade to Pro to continue.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        alert("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      // Trial started — go to dashboard
      router.push("/dashboard?trial=started");
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-2xl border border-purple-500/40 bg-purple-500/10 p-5 text-center">
      <p className="text-sm font-semibold text-white/80 mb-1">
        Not sure yet? Try Pro free for 3 days.
      </p>
      <p className="text-xs text-white/50 mb-4">
        Unlock all 292+ lessons, interview prep &amp; PM Jobs — cancel anytime.
      </p>
      <button
        onClick={handleTrialClick}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-black text-white hover:bg-purple-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Starting trial…" : "Start 3-day free trial →"}
      </button>
    </div>
  );
}
