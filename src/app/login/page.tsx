"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BrowserLink from "@/components/BrowserLink";
import SafariBar from "@/components/SafariBar";

function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const err = searchParams.get("error");
    if (err === "google_failed") setError("Google sign-in failed. Please try again in a moment.");
    if (err === "google_cancelled") setError("Sign-in was cancelled.");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex text-white font-sans bg-[var(--bg-main)]">
      <SafariBar />

      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-80 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] p-8 flex-shrink-0 shadow-2xl z-10 transition-colors">
        <div>
          <div className="flex items-center gap-1.5 font-black text-2xl tracking-tight mb-12">
            <span className="text-[var(--green-primary)]">PM</span>
            <span>Streak</span>
          </div>
          <div className="space-y-8">
            {[
              { n: "01", title: "Study insights", desc: "Actionable frameworks from world-class product leaders." },
              { n: "02", title: "Recall with quiz", desc: "Lock in core product concepts with smart, active recall." },
              { n: "03", title: "Master the game", desc: "Build a habit. Climb the leaderboard. Become a top 1% PM." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-4">
                <span className="text-3xl font-black text-[var(--green-primary)]/20 tabular-nums leading-none flex-shrink-0">{n}</span>
                <div>
                  <div className="text-sm font-black mb-1">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — sign in */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--green-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Sign in</h1>
            <p className="text-sm text-[var(--text-secondary)] font-bold">Build your product intuition, one streak at a time.</p>
          </div>

          {error && (
            <div className="bg-[var(--red-primary)]/10 border-2 border-[var(--red-primary)]/20 rounded-2xl px-5 py-4 mb-8">
              <p className="text-[var(--red-primary)] text-sm font-black flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--red-primary)]" />
                {error}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <BrowserLink
              href="/api/auth/google"
              className="flex items-center justify-center gap-3 w-full py-4.5 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] hover:border-white/10 text-white text-base font-black transition-all shadow-xl active:scale-[0.98]"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </BrowserLink>
          </div>

          <p className="text-center mt-12 text-[10px] text-[var(--text-secondary)]/50 leading-relaxed font-bold uppercase tracking-tight">
            By signing in you agree to our{" "}
            <a href="/terms" className="underline hover:text-white">Terms</a>
            {" & "}
            <a href="/privacy" className="underline hover:text-white">Privacy</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
