"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomepageTrialButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/billing/start-trial", { method: "POST" });
      if (res.status === 401) {
        router.push("/auth/signup?redirect=/dashboard?trial=started");
        return;
      }
      if (res.status === 403) {
        alert("You've already used your free trial. Upgrade to Pro to continue.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        alert("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/dashboard?trial=started");
    } catch {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? "Starting…" : "Start Pro trial for 3 days →"}
    </button>
  );
}
