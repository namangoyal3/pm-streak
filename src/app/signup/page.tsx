"use client";

import { Flame, BookOpen, Zap } from "lucide-react";
import Link from "next/link";
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
          <div className="bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-6 mb-8 space-y-4">
            {[
              { icon: <BookOpen size={16} className="text-[var(--blue-primary)]" />, text: "Actionable Lenny Podcast insights" },
              { icon: <Flame size={16} className="text-[var(--orange-primary)]" />, text: "Daily tracking and habit building" },
              { icon: <Zap size={16} className="text-[var(--gold-primary)]" />, text: "XP, gems, and global leaderboards" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-xs font-black text-[var(--text-secondary)] tracking-wide uppercase">{item.text}</span>
              </div>
            ))}
          </div>

          <BrowserLink
            href="/api/auth/google"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl border-2 border-white/5 bg-white text-black hover:bg-white/90 text-base font-black transition-all shadow-xl active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Sign up with Google
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
