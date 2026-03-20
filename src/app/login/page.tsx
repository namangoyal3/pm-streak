"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Flame, Zap, Trophy, BookOpen } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "google_failed") setError("Google sign-in failed. Please try again.");
    if (err === "google_cancelled") setError("Google sign-in was cancelled.");
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">

        {/* Logo & branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] flex items-center justify-center shadow-xl shadow-[var(--green-primary)]/30">
              <Flame size={44} className="text-white streak-flame" />
            </div>
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white"> Streak</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1.5 font-medium">
            Daily product wisdom in 2–3 minutes
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)]">
            <Flame size={13} className="text-[var(--orange-primary)]" />
            <span className="text-xs font-bold text-white">Streaks</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)]">
            <Zap size={13} className="text-[var(--gold-primary)]" />
            <span className="text-xs font-bold text-white">XP System</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)]">
            <Trophy size={13} className="text-[var(--purple-primary)]" />
            <span className="text-xs font-bold text-white">Ranks</span>
          </div>
        </div>

        {/* Google Sign-In */}
        <a
          href="/api/auth/google"
          className="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-white/5 hover:border-white/20 text-white text-sm font-bold transition-all mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </a>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[var(--border-color)]" />
          <span className="text-xs text-[var(--text-secondary)] font-medium">or</span>
          <div className="flex-1 h-px bg-[var(--border-color)]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--green-primary)] focus:outline-none text-sm font-medium transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--green-primary)] focus:outline-none text-sm font-medium transition-colors"
          />

          {error && (
            <div className="bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30 rounded-xl p-3">
              <p className="text-[var(--red-primary)] text-xs font-bold text-center">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] active:scale-98 text-white font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-[var(--green-primary)]/20"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-[var(--text-secondary)]">
          New here?{" "}
          <Link href="/signup" className="text-[var(--green-primary)] font-black hover:underline">
            Create account
          </Link>
        </p>

        <p className="text-center mt-3 text-[10px] text-[var(--text-secondary)]/60">
          Powered by insights from Lenny&apos;s Podcast
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
