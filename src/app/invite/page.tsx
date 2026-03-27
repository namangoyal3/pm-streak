"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Flame, Zap, Trophy, BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

function InviteContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  const inviteFeatures = [
    {
      icon: <BookOpen size={16} className="text-[var(--green-primary)]" />,
      iconBg: "bg-[var(--green-primary)]/10",
      title: "Daily Micro-Lessons",
      desc: "Learn from 300+ Lenny&apos;s Podcast episodes. Frameworks from Shreyas Doshi, Julie Zhuo, Brian Chesky, and more.",
    },
    {
      icon: <Flame size={16} className="text-[var(--orange-primary)]" />,
      iconBg: "bg-[var(--orange-primary)]/10",
      title: "Streak System",
      desc: "Build a daily learning habit with streaks, streak freezes, and loss-aversion mechanics inspired by Duolingo.",
    },
    {
      icon: <Zap size={16} className="text-[var(--gold-primary)]" />,
      iconBg: "bg-[var(--gold-primary)]/10",
      title: "XP & Levels",
      desc: "Earn XP for every lesson and quiz. Level up as you master product skills.",
    },
    {
      icon: <Trophy size={16} className="text-[var(--purple-primary)]" />,
      iconBg: "bg-[var(--purple-primary)]/10",
      title: "Compete & Collaborate",
      desc: "Leaderboards, friend challenges, and social features to learn with your PM community.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-sm text-center">
        <Flame size={52} className="text-[var(--orange-primary)] streak-flame mx-auto mb-3" />
        <h1 className="text-3xl font-bold mb-0.5">
          <span className="text-[var(--green-primary)]">PM</span> Streak
        </h1>
        <p className="text-[10px] font-bold text-[var(--text-secondary)] tracking-wide mb-2">by learnanything.pro</p>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Your friend invited you to learn product management in 2-3 minutes a day
        </p>

        <div className="bg-[var(--bg-card)] rounded-2xl p-4 mb-5 text-left space-y-3">
          {inviteFeatures.slice(0, 2).map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", feature.iconBg)}>
                {feature.icon}
              </div>
              <div>
                <div className="text-sm font-bold">{feature.title}</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {feature.desc}
                </div>
              </div>
            </div>
          ))}
          <details className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40 p-3">
            <summary className="cursor-pointer text-xs font-black text-[var(--text-secondary)] list-none">
              Show more features
            </summary>
            <div className="mt-3 space-y-3">
              {inviteFeatures.slice(2).map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", feature.iconBg)}>
                    {feature.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{feature.title}</div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      {feature.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
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
