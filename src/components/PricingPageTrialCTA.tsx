"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Props {
  variant: "control" | "treatment";
}

// Captures A/B experiment events
function trackEvent(name: string, props: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(name, {
      experiment: "pro_trial_cta_v1",
      ...props,
    });
  }
}

export default function PricingPageTrialCTA({ variant }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<string>("2:59:47");

  // Track exposure
  useEffect(() => {
    trackEvent("ab_trial_cta_exposure", { variant });
  }, [variant]);

  // Live countdown to make it feel urgent
  useEffect(() => {
    // Set a fixed end time (midnight tonight) so all visitors see same countdown
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay.getTime() - now.getTime();

    if (diff <= 0) return;

    const id = setInterval(() => {
      const remaining = Math.max(0, endOfDay.getTime() - Date.now());
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      const s = Math.floor((remaining % 60000) / 1000);
      setCountdown(`${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const handleTrialClick = useCallback(async () => {
    if (loading) return;
    trackEvent("ab_trial_cta_clicked", { variant, cta_position: "pricing_hero" });
    setLoading(true);
    try {
      const res = await fetch("/api/billing/start-trial", { method: "POST" });
      if (res.status === 401) {
        router.push("/signup?redirect=/pricing");
        return;
      }
      if (res.status === 403) {
        trackEvent("ab_trial_cta_blocked", { variant, reason: "already_used" });
        alert("You've already used your free trial. Upgrade to Pro to continue.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        trackEvent("ab_trial_cta_error", { variant });
        alert("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      trackEvent("ab_trial_cta_success", { variant });
      router.push("/dashboard?trial=started");
    } catch {
      trackEvent("ab_trial_cta_error", { variant });
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }, [loading, variant, router]);

  // Control = no special CTA (or very minimal)
  if (variant === "control") return null;

  // Treatment = urgency + social proof
  return (
    <div className="mb-8 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-6 text-center relative overflow-hidden">
      {/* Urgency bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Limited trial offer
        </span>
      </div>

      <h3 className="text-lg font-black text-white mb-1">
        3-Day Pro Trial — Free
      </h3>
      <p className="text-sm text-white/60 mb-1">
        Full access to all 292+ lessons, PM tools &amp; job listings
      </p>

      {/* Countdown */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <span className="text-xs text-white/40">Offer expires in</span>
        <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
          {countdown}
        </span>
      </div>

      {/* Social proof micro-stat */}
      <div className="flex items-center justify-center gap-3 mb-4 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          No credit card required
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Cancel anytime
        </span>
      </div>

      <button
        onClick={handleTrialClick}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 text-sm font-black text-black hover:from-amber-400 hover:to-orange-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-500/25"
      >
        {loading ? "Starting your trial…" : "Start 3-day free trial →"}
      </button>

      <p className="mt-2 text-xs text-white/25">
        Join 200+ PMs learning on PM Streak
      </p>
    </div>
  );
}