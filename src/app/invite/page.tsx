"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Flame, Zap, Trophy, BookOpen, Users } from "lucide-react";

function InviteContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <Flame size={56} className="text-[var(--orange-primary)] streak-flame mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-0.5">
          <span className="text-[var(--green-primary)]">PM</span> Streak
        </h1>
        <p className="text-[10px] font-bold text-[var(--text-secondary)] tracking-wide mb-2">by learnanything.pro</p>
        <p className="text-[var(--text-secondary)] text-sm mb-6">
          Your friend invited you to learn product management in 2-3 minutes a day
        </p>

        <div className="bg-[var(--bg-card)] rounded-2xl p-6 mb-6 text-left space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--green-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen size={16} className="text-[var(--green-primary)]" />
            </div>
            <div>
              <div className="text-sm font-bold">Daily Micro-Lessons</div>
              <div className="text-xs text-[var(--text-secondary)]">
                Learn from 300+ Lenny&apos;s Podcast episodes. Frameworks from Shreyas Doshi, Julie Zhuo, Brian Chesky, and more.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--orange-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Flame size={16} className="text-[var(--orange-primary)]" />
            </div>
            <div>
              <div className="text-sm font-bold">Streak System</div>
              <div className="text-xs text-[var(--text-secondary)]">
                Build a daily learning habit with streaks, streak freezes, and loss-aversion mechanics inspired by Duolingo.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap size={16} className="text-[var(--gold-primary)]" />
            </div>
            <div>
              <div className="text-sm font-bold">XP & Levels</div>
              <div className="text-xs text-[var(--text-secondary)]">
                Earn XP for every lesson and quiz. Level up as you master product skills.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--purple-primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Trophy size={16} className="text-[var(--purple-primary)]" />
            </div>
            <div>
              <div className="text-sm font-bold">Compete & Collaborate</div>
              <div className="text-xs text-[var(--text-secondary)]">
                Leaderboards, friend challenges, and social features to learn with your PM community.
              </div>
            </div>
          </div>
        </div>

        <Link
          href={ref ? `/?ref=${encodeURIComponent(ref)}` : "/"}
          className="block w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm transition-colors mb-3 text-center"
        >
          Be a 10x PM Now
        </Link>

        <Link
          href="/login"
          className="block text-sm text-[var(--text-secondary)] hover:text-white"
        >
          Already have an account? Log in
        </Link>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1">
            <Users size={12} /> 100+ PMs learning
          </div>
          <div className="flex items-center gap-1">
            <BookOpen size={12} /> 14+ lessons
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)]">Loading...</div>
      </div>
    }>
      <InviteContent />
    </Suspense>
  );
}
