"use client";

import { Suspense, useEffect, useState } from "react";
import BrowserLink from "@/components/BrowserLink";
import SafariBar from "@/components/SafariBar";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "google_failed") setError("Google sign-in failed. Please try again.");
    if (err === "google_cancelled") setError("Sign-in was cancelled.");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex">
      <SafariBar />

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-80 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] p-8 flex-shrink-0">
        <div>
          <div className="flex items-center gap-1.5 font-black text-xl tracking-tight mb-12">
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </div>
          <div className="space-y-6">
            {[
              { n: "01", title: "Read the lesson", desc: "2 minutes. One sharp insight from Lenny's best episodes." },
              { n: "02", title: "Answer 3 questions", desc: "Active recall locks the concept in. Perfect score earns bonus gems." },
              { n: "03", title: "Keep your streak", desc: "Daily habit. Leaderboard. XP. The whole game." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4">
                <span className="text-2xl font-black text-[var(--green-primary)]/30 tabular-nums leading-none flex-shrink-0">{n}</span>
                <div>
                  <div className="text-sm font-black mb-0.5">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-[var(--text-secondary)]/50">Built on Lenny&apos;s Podcast · 300+ episodes</p>
      </div>

      {/* Right panel — sign in */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-xs">
          {/* Logo — mobile only */}
          <div className="lg:hidden flex items-center gap-1.5 font-black text-xl tracking-tight mb-10">
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </div>

          <h1 className="text-2xl font-black mb-1">Sign in</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-8">One click. No password.</p>

          {error && (
            <div className="bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30 rounded-xl px-4 py-3 mb-5">
              <p className="text-[var(--red-primary)] text-xs font-bold">{error}</p>
            </div>
          )}

          <BrowserLink
            href="/api/auth/google"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-white/5 hover:border-white/20 text-white text-sm font-bold transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </BrowserLink>

          <p className="text-center mt-8 text-[10px] text-[var(--text-secondary)]/50 leading-relaxed">
            By signing in you agree to our{" "}
            <a href="/terms" className="underline underline-offset-2 hover:text-white">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</a>
          </p>
        </div>
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
