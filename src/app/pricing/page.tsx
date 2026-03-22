"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";

type PricesPayload = {
  country: string;
  priceBand: string;
  display: {
    monthly: string;
    quarterly: string;
    yearly: string;
    yearlyNote: string;
  };
};

const PRO_FEATURES = [
  "Unlimited AI lessons & Go Deeper",
  "Interview Sprint drills & feedback",
  "Role-based roadmaps (APM → Senior)",
  "Saved notes, bookmarks & revision tools",
  "Premium recap emails & progress insights",
];

const RC_PUBLIC_KEY = process.env.NEXT_PUBLIC_REVENUECAT_API_KEY ?? "";

export default function PricingPage() {
  const router = useRouter();
  const [prices, setPrices] = useState<PricesPayload | null>(null);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [rcReady, setRcReady] = useState(false);

  useEffect(() => {
    fetch("/api/billing/prices")
      .then((r) => r.json())
      .then((d) => setPrices(d))
      .catch(() => setErr("Could not load regional pricing hints."));
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.user) setUser(d.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!RC_PUBLIC_KEY || !user?.id) {
      setRcReady(false);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const { Purchases } = await import("@revenuecat/purchases-js");
        if (cancelled) return;
        if (Purchases.isConfigured()) {
          await Purchases.getSharedInstance().changeUser(user.id);
        } else {
          Purchases.configure({ apiKey: RC_PUBLIC_KEY, appUserId: user.id });
        }
        if (!cancelled) setRcReady(true);
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setErr("Could not initialize RevenueCat. Check your API key.");
          setRcReady(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  async function openPaywall() {
    if (!user?.id) {
      router.push("/login");
      return;
    }
    if (!RC_PUBLIC_KEY) {
      setErr("Missing NEXT_PUBLIC_REVENUECAT_API_KEY.");
      return;
    }
    setErr(null);
    setLoading("paywall");
    try {
      const { Purchases } = await import("@revenuecat/purchases-js");
      const purchases = Purchases.getSharedInstance();
      await purchases.presentPaywall({
        customerEmail: user.email,
      });
      const syncRes = await fetch("/api/billing/sync", { method: "POST" });
      if (!syncRes.ok) {
        const j = await syncRes.json().catch(() => ({}));
        setErr(j.error ?? "Could not sync subscription status.");
        return;
      }
      router.push("/dashboard");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Paywall closed or failed";
      if (!/cancel/i.test(msg)) {
        setErr(msg);
      }
    } finally {
      setLoading(null);
    }
  }

  async function openManagement() {
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
        setErr(data.error ?? "Could not open subscription management.");
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
          Checkout and subscription management are powered by{" "}
          <span className="text-[var(--text-primary)] font-bold">RevenueCat Web Billing</span>{" "}
          (connect Stripe or Paddle in the RevenueCat dashboard).
        </p>
        {prices && (
          <p className="text-[10px] text-[var(--text-secondary)] mb-6">
            Marketing anchors for region {prices.country} (band {prices.priceBand}
            ): {d?.yearly} yearly · {d?.quarterly} quarterly · {d?.monthly} monthly — final
            price comes from your RevenueCat products at checkout.
          </p>
        )}

        {!RC_PUBLIC_KEY && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-100">
            Set{" "}
            <code className="text-xs bg-black/30 px-1 rounded">
              NEXT_PUBLIC_REVENUECAT_API_KEY
            </code>{" "}
            to your Web Billing public API key from the RevenueCat dashboard.
          </div>
        )}

        {err && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-200">
            {err}
          </div>
        )}

        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 mb-8">
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            {user
              ? rcReady
                ? "You’re signed in — open the RevenueCat paywall to subscribe."
                : "Connecting to RevenueCat…"
              : "Sign in so we can attach the subscription to your PM Streak account."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              disabled={loading !== null || !user || !rcReady || !RC_PUBLIC_KEY}
              onClick={openPaywall}
              className="flex-1 px-5 py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-black text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading === "paywall" ? (
                <Loader2 className="animate-spin" size={18} />
              ) : null}
              Subscribe with RevenueCat
            </button>
            <button
              type="button"
              disabled={loading !== null || !user}
              onClick={openManagement}
              className="px-5 py-3 rounded-2xl border border-[var(--border-color)] text-sm font-bold text-[var(--text-secondary)] hover:text-white disabled:opacity-50"
            >
              {loading === "portal" ? (
                <Loader2 className="animate-spin mx-auto" size={18} />
              ) : (
                "Manage subscription"
              )}
            </button>
          </div>

          <ul className="space-y-2.5 mt-8">
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
            includes the full core curriculum, streaks, XP/gems, daily challenge,
            leaderboard & social, and{" "}
            <span className="text-[var(--text-primary)] font-bold">
              5 AI bonus lessons / month
            </span>
            .
          </p>
          <p>
            Create a <span className="font-bold text-[var(--text-primary)]">pro</span>{" "}
            entitlement in RevenueCat and set{" "}
            <code className="text-[10px] bg-black/30 px-1 rounded">
              REVENUECAT_ENTITLEMENT_ID
            </code>{" "}
            if you use a different identifier (default:{" "}
            <code className="text-[10px] bg-black/30 px-1 rounded">pro</code>).
          </p>
          <p>
            Webhook URL:{" "}
            <code className="text-[10px] bg-black/30 px-1 rounded break-all">
              {(process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "")}
              /api/billing/webhook/revenuecat
            </code>
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="text-sm font-bold text-[var(--green-primary)]"
          >
            ← Back to app
          </Link>
        </div>
      </div>
    </div>
  );
}
