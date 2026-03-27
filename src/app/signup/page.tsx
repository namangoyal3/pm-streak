"use client";

import { Flame, ShieldCheck } from "lucide-react";
import Link from "next/link";
import BrowserLink from "@/components/BrowserLink";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 bg-[var(--bg-main)] text-white font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--green-primary)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-7 sm:mb-10">
          <div className="flex items-center justify-center mb-5 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[var(--green-primary)] to-[var(--green-dark)] flex items-center justify-center shadow-2xl shadow-[var(--green-primary)]/20">
              <Flame size={34} className="text-white streak-flame sm:w-11 sm:h-11" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-0.5">
            Join <span className="text-[var(--green-primary)]">PM</span> Streak
          </h1>
          <p className="text-[10px] font-bold text-[var(--text-secondary)] tracking-wide mb-2">by learnanything.pro</p>
          <p className="text-[var(--text-secondary)] text-sm font-bold opacity-80">
            New accounts are allowed via Google sign-in only.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={18} className="text-[var(--green-primary)]" />
              <p className="text-sm font-black">Email/password registration is disabled</p>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              For security hardening, new users can only create accounts using Google OAuth.
            </p>
          </div>

          <BrowserLink
            href="/api/auth/google"
            className="flex items-center justify-center gap-3 w-full py-4.5 sm:py-5 rounded-2xl border-2 border-white/5 bg-white text-black hover:bg-white/90 text-base font-black transition-all shadow-xl active:scale-[0.98]"
          >
            Continue with Google
          </BrowserLink>

          <p className="text-center mt-8 text-sm font-bold text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--green-primary)] hover:underline">Log in</Link>
          </p>
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
