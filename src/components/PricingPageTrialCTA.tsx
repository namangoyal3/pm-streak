"use client";

import { useEffect } from "react";
import Link from "next/link";

interface Props {
  variant: "control" | "treatment";
}

export default function PricingPageTrialCTA({ variant }: Props) {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("ab_experiment_exposure", {
        experiment: "pro_trial_cta_v1",
        variant,
      });
    }
  }, [variant]);

  if (variant === "control") return null;

  return (
    <div className="mb-8 rounded-2xl border border-purple-500/40 bg-purple-500/10 p-5 text-center">
      <p className="text-sm font-semibold text-white/80 mb-1">
        Not sure yet? Try Pro free for 7 days.
      </p>
      <p className="text-xs text-white/50 mb-4">
        Unlock all 292+ lessons, interview prep &amp; PM Jobs — cancel anytime.
      </p>
      <Link
        href="/pricing?trial=true"
        onClick={() => {
          if (typeof window !== "undefined" && (window as any).posthog) {
            (window as any).posthog.capture("ab_cta_clicked", {
              experiment: "pro_trial_cta_v1",
              variant,
            });
          }
        }}
        className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-2.5 text-sm font-black text-white hover:bg-purple-600 transition-colors"
      >
        Start 7-day free trial →
      </Link>
    </div>
  );
}
