"use client";

import { Flame, ShieldAlert } from "lucide-react";
import BrowserLink from "@/components/BrowserLink";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[var(--bg-main)] text-white font-sans">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--green-primary)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] flex items-center justify-center shadow-2xl shadow-[var(--green-primary)]/20 active:scale-95 transition-transform">
              <Flame size={44} className="text-white streak-flame" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Join <span className="text-[var(--green-primary)]">PM</span> Streak
          </h1>
          <p className="text-[var(--text-secondary)] text-sm font-bold opacity-80">
            Build product mastery, one streak at a time.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert size={18} className="text-[var(--orange-primary)]" />
              <p className="text-sm font-black">Sign-up is temporarily disabled</p>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              We paused direct account creation while hardening auth security.
              Existing users can still sign in.
            </p>
          </div>

          <BrowserLink
            href="/login"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl border-2 border-white/5 bg-white text-black hover:bg-white/90 text-base font-black transition-all shadow-xl active:scale-[0.98]"
          >
            Go to sign in
          </BrowserLink>
        </div>

        <p className="text-center mt-12 text-[10px] text-[var(--text-secondary)]/50 leading-relaxed font-bold uppercase tracking-tight">
          By signing up you agree to our{" "}
          <a href="/terms" className="underline hover:text-white">Terms</a>
          {" & "}
          <a href="/privacy" className="underline hover:text-white">Privacy</a>
        </p>
      </div>
    </div>
  );
}
