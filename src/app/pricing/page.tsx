"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import type { BillingInterval } from "@/lib/billing/catalog";

type PricesPayload = {
  country: string;
  priceBand: string;
  currency: string;
  display: {
    monthly: string;
    quarterly: string;
    yearly: string;
    yearlyNote: string;
  };
  defaultInterval: "yearly";
};

const PRO_FEATURES = [
  "Unlimited AI lessons & Go Deeper",
  "Interview Sprint drills & feedback",
  "Role-based roadmaps (APM → Senior)",
  "Saved notes, bookmarks & revision tools",
  "Premium recap emails & progress insights",
];

export default function PricingPage() {
  const router = useRouter();
  const [prices, setPrices] = useState<PricesPayload | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/billing/prices")
      .then((r) => r.json())
      .then((d) => setPrices(d))
      .catch(() => setErr("Could not load localized prices."));
  }, []);

  async function checkout(interval: BillingInterval) {
    setErr(null);
    setLoading(interval);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setErr(data.error ?? "Checkout unavailable");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setErr("No checkout URL returned");
    } catch {
      setErr("Network error");
    } finally {
      setLoading(null);
    }
  }

  async function openPortal() {
    setErr(null);
    setLoading("portal");
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setErr(data.error ?? "Billing portal unavailable");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      setErr("Network error");
    } finally {
      setLoading(null);
    }
  }

  const d = prices?.display;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white pb-24">
      <nav className="border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg">
            <span className="text-[var(--green-primary)]">PM</span> Streak
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-bold text-[var(--text-secondary)] hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-xl bg-[var(--green-primary)] text-white text-xs font-black"
            >
              App
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-5 pt-12">
        <div className="flex items-center gap-2 text-[var(--green-primary)] text-xs font-black uppercase tracking-widest mb-3">
          <Sparkles size={14} /> PM Streak Pro
        </div>
        <h1 className="text-4xl font-black tracking-tight mb-3">
          Free core. Upgrade for depth.
        </h1>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-2">
          The full Lenny-based curriculum, streaks, and community stay free.
          Pro unlocks unlimited AI lessons, interview prep, roadmaps, and
          premium study tools.
        </p>
        {prices && (
          <p className="text-[10px] text-[var(--text-secondary)] mb-8">
            Prices shown for region {prices.country} (band {prices.priceBand}) ·
            Taxes handled at checkout where applicable.
          </p>
        )}

        {err && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-200">
            {err}
          </div>
        )}

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-black text-[var(--gold-primary)] uppercase tracking-wide">
                Default · save more
              </div>
              <div className="text-3xl font-black mt-1">
                {d ? d.yearly : "—"}
                <span className="text-sm font-bold text-[var(--text-secondary)]">
                  {" "}
                  / year
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {d?.yearlyNote}
              </p>
            </div>
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => checkout("yearly")}
              className="px-5 py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-black text-sm disabled:opacity-50"
            >
              {loading === "yearly" ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                "Choose annual"
              )}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => checkout("quarterly")}
              className="text-left rounded-2xl border border-[var(--border-color)] px-4 py-3 hover:border-[var(--green-primary)]/50 transition-colors disabled:opacity-50"
            >
              <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase">
                Quarterly
              </div>
              <div className="text-lg font-black">{d?.quarterly ?? "—"}</div>
              <div className="text-[10px] text-[var(--text-secondary)]">
                Lower commitment
              </div>
            </button>
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => checkout("monthly")}
              className="text-left rounded-2xl border border-[var(--border-color)] px-4 py-3 hover:border-[var(--green-primary)]/50 transition-colors disabled:opacity-50"
            >
              <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase">
                Monthly
              </div>
              <div className="text-lg font-black">{d?.monthly ?? "—"}</div>
              <div className="text-[10px] text-[var(--text-secondary)]">
                Flexible
              </div>
            </button>
          </div>

          <ul className="space-y-2.5">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check
                  size={16}
                  className="text-[var(--green-primary)] flex-shrink-0 mt-0.5"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40 p-4 text-xs text-[var(--text-secondary)] space-y-2">
          <p>
            <span className="text-[var(--text-primary)] font-bold">Free</span>{" "}
            includes the full core curriculum, streaks, XP/gems, daily
            challenge, leaderboard & social, and{" "}
            <span className="text-[var(--text-primary)] font-bold">
              5 AI bonus lessons / month
            </span>
            .
          </p>
          <p>
            7-day Pro preview unlocks after{" "}
            <span className="font-bold text-[var(--text-primary)]">
              3 core lessons
            </span>{" "}
            or a{" "}
            <span className="font-bold text-[var(--text-primary)]">
              3-day streak
            </span>{" "}
            — no card required.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={openPortal}
            disabled={loading !== null}
            className="px-4 py-3 rounded-2xl border border-[var(--border-color)] text-sm font-bold text-[var(--text-secondary)] hover:text-white disabled:opacity-50"
          >
            {loading === "portal" ? (
              <Loader2 className="animate-spin mx-auto" size={18} />
            ) : (
              "Manage subscription"
            )}
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-3 rounded-2xl text-center text-sm font-bold text-[var(--green-primary)]"
          >
            Back to app
          </Link>
        </div>
      </div>
    </div>
  );
}
