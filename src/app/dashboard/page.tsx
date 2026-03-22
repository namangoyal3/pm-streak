"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StreakCalendar from "@/components/StreakCalendar";
import XPProgress from "@/components/XPProgress";
import LessonCard from "@/components/LessonCard";
import {
  Flame, Shield, LogOut, Snowflake, Gem, Calendar, Zap,
  ArrowRight, Share2, Target, RotateCcw, Trophy, Star,
  TrendingUp, BookOpen, ChevronRight, Sparkles, Lock, MapPin,
  Bot, MessageSquare, Brain, Cpu, Swords
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ShareCard from "@/components/ShareCard";
import StreakCelebration from "@/components/StreakCelebration";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  lessons: {
    id: string;
    title: string;
    slug: string;
    description: string;
    xpReward: number;
    difficulty: number;
    dayNumber: number;
    completed: boolean;
    isLocked: boolean;
    lockedReason: string | null;
    prerequisiteLessonTitle: string | null;
  }[];
}

const streakMessages = [
  "You're on fire.",
  "Unstoppable. Keep it up.",
  "Consistency is building.",
  "Consistency is your superpower.",
  "You're crushing it.",
  "Product mastery in progress.",
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [earnBack, setEarnBack] = useState<any>(null);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [pendingChallenges, setPendingChallenges] = useState<any[]>([]);
  const [lessonUnlocked, setLessonUnlocked] = useState<{ title: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [userRes, statsRes, lessonsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/user/stats"),
          fetch("/api/lessons"),
        ]);

        if (!userRes.ok) {
          router.push("/login");
          return;
        }

        const userData = await userRes.json();
        const statsData = await statsRes.json();
        const lessonsData = await lessonsRes.json();

        setUser(userData.user);
        setStats(statsData);
        setCategories(lessonsData.categories);

        // Check if a next lesson was just unlocked (set by QuizView on completion)
        try {
          const unlocked = sessionStorage.getItem("lessonUnlocked");
          if (unlocked) {
            setLessonUnlocked(JSON.parse(unlocked));
            sessionStorage.removeItem("lessonUnlocked");
          }
        } catch { /* ignore */ }

        try {
          const [ebRes, challengeRes] = await Promise.all([
            fetch("/api/earn-back"),
            fetch("/api/social/challenges"),
          ]);
          if (ebRes.ok) {
            const ebData = await ebRes.json();
            if (ebData.eligible) setEarnBack(ebData);
          }
          if (challengeRes.ok) {
            const cData = await challengeRes.json();
            setPendingChallenges(cData.received || []);
          }
        } catch { /* ignore */ }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "DELETE" });
    router.push("/login");
  };

  const [shopMsg, setShopMsg] = useState<string | null>(null);

  const handleShopBuy = async (itemId: string) => {
    const res = await fetch("/api/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setShopMsg(data.error ?? "Purchase failed");
      setTimeout(() => setShopMsg(null), 3000);
      return;
    }
    setUser((u: any) => ({ ...u, ...data }));
    const labels: Record<string, string> = {
      streak_freeze: "Streak Freeze added!",
      xp_boost: "2× XP Boost active for your next lesson!",
      streak_repair: `Streak restored to ${data.streakCount} days!`,
    };
    setShopMsg(labels[itemId] ?? "Purchased!");
    setTimeout(() => setShopMsg(null), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Flame size={48} className="text-[var(--orange-primary)] streak-flame" />
        <div className="text-[var(--green-primary)] text-lg font-black animate-pulse tracking-wide">
          Loading your streak…
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--green-primary)]/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  const streakMsg = user.streakCount > 0
    ? streakMessages[user.streakCount % streakMessages.length]
    : "Complete a lesson to start your streak!";

  const isPerfect = stats?.streak?.perfectStreak >= 7;
  const completedToday = stats?.completedToday ?? false;
  const totalCompleted = stats?.completedCount ?? 0;
  const totalLessons = stats?.totalLessons ?? 0;
  const totalArchive = stats?.totalArchive ?? 289;
  const progressPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} avatarUrl={user.avatarUrl} name={user.name} unreadNotifications={user.unreadNotifications} />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 pb-28">
        {/* ── Pending challenge alert ── */}
        {pendingChallenges.length > 0 && (
          <Link href="/social" className="block mb-4">
            <div className="flex items-center gap-3 bg-[var(--orange-primary)]/10 border border-[var(--orange-primary)]/30 rounded-2xl px-4 py-3 hover:bg-[var(--orange-primary)]/15 transition-colors">
              <div className="w-8 h-8 rounded-full bg-[var(--orange-primary)]/20 flex items-center justify-center flex-shrink-0">
                <Swords size={16} className="text-[var(--orange-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black">
                  {pendingChallenges.length === 1
                    ? `${pendingChallenges[0].challenger.name} challenged you!`
                    : `${pendingChallenges.length} challenges waiting for you`}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Tap to accept or decline</div>
              </div>
              <ChevronRight size={16} className="text-[var(--text-secondary)]" />
            </div>
          </Link>
        )}
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-6 lg:items-start">
        <div className="space-y-4">

        {/* ── Earn-Back Banner ── */}
        {earnBack && (
          <div className="bg-gradient-to-r from-[var(--orange-primary)]/20 to-[var(--red-primary)]/20 border border-[var(--orange-primary)]/40 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--orange-primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <RotateCcw size={18} className="text-[var(--orange-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-[var(--orange-primary)]">
                Earn back your {earnBack.lostStreak}-day streak!
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 mb-2.5">
                Complete 2 lessons within {earnBack.hoursRemaining}h to restore it.
                {earnBack.completedToday ? " (1 done — 1 more to go!)" : ""}
              </p>
              <a
                href="#lessons"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--orange-primary)] hover:bg-[var(--orange-primary)]/80 text-white text-xs font-black transition-colors"
              >
                <Flame size={13} /> Start a Lesson Now
              </a>
            </div>
          </div>
        )}

        {/* ── Streak Broken Banner ── */}
        {stats?.streak?.streakBroken && !earnBack && (
          <div className="bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30 rounded-2xl p-4 text-center">
            <p className="text-[var(--red-primary)] font-black">Your streak was broken!</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Start fresh today — every legend restarts.</p>
          </div>
        )}

        {/* ── HERO: Streak Card ── */}
        <div className={cn(
          "rounded-3xl p-5 relative overflow-hidden",
          isPerfect
            ? "bg-gradient-to-br from-[#1a1200] to-[#2a1f00] border border-[var(--gold-primary)]/30"
            : user.streakCount > 0
            ? "bg-gradient-to-br from-[#1a0c00] to-[#2a1500] border border-[var(--orange-primary)]/30"
            : "bg-gradient-to-br from-[#0a1f10] to-[#0d2a18] border border-[var(--green-primary)]/30"
        )}>
          {/* Background glow */}
          <div className={cn(
            "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-25",
            isPerfect ? "bg-[var(--gold-primary)]" : user.streakCount > 0 ? "bg-[var(--orange-primary)]" : "bg-[var(--green-primary)]"
          )} />

          <div className="relative">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4 gap-3">
              {/* Big streak number — left */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <Flame
                  size={40}
                  className={cn(
                    "streak-flame",
                    isPerfect ? "text-[var(--gold-primary)]" :
                    user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-[var(--green-primary)]"
                  )}
                />
                <div>
                  <span className={cn(
                    "text-4xl font-black tabular-nums leading-none block",
                    isPerfect ? "text-[var(--gold-primary)]" :
                    user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-[var(--green-primary)]"
                  )}>
                    {user.streakCount}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-bold">day streak</span>
                </div>
              </div>

              {/* Name + message — right */}
              <div className="flex-1 min-w-0 text-right">
                <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-wider">
                  Welcome back
                </p>
                <h1 className="text-xl font-black text-white leading-tight truncate">
                  {user.name?.split(" ")[0] ?? "PM"}
                </h1>
                <p className={cn(
                  "text-xs mt-0.5 font-semibold leading-snug",
                  isPerfect ? "text-[var(--gold-primary)]" : user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-[var(--green-primary)]"
                )}>
                  {streakMsg}
                </p>
              </div>
            </div>

            {/* Today's goal progress */}
            <div className={cn(
              "rounded-2xl p-3.5 border",
              completedToday
                ? "bg-[var(--green-primary)]/10 border-[var(--green-primary)]/25"
                : user.streakCount > 0
                ? "bg-black/20 border-white/5"
                : "bg-[var(--green-primary)]/8 border-[var(--green-primary)]/20"
            )}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Target size={13} className={completedToday ? "text-[var(--green-primary)]" : user.streakCount > 0 ? "text-[var(--text-secondary)]" : "text-[var(--green-primary)]"} />
                  <span className="text-xs font-bold text-white">Today&apos;s Goal</span>
                </div>
                {completedToday ? (
                  <span className="text-xs font-black text-[var(--green-primary)]">✓ Done!</span>
                ) : (
                  <span className="text-xs font-bold text-[var(--text-secondary)]">1 lesson</span>
                )}
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full progress-fill", completedToday ? "bg-[var(--green-primary)]" : "bg-[var(--green-primary)]/30")}
                  style={{ width: completedToday ? "100%" : "0%" }}
                />
              </div>
            </div>

            {/* Streak goal sub-bar */}
            {user.streakGoal > 0 && user.streakCount > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">
                  Goal {Math.min(user.streakCount, user.streakGoal)}/{user.streakGoal}d
                </span>
                <div className="flex-1 h-1.5 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full progress-fill", user.streakCount >= user.streakGoal ? "bg-[var(--gold-primary)]" : "bg-[var(--orange-primary)]")}
                    style={{ width: `${Math.min((user.streakCount / user.streakGoal) * 100, 100)}%` }}
                  />
                </div>
                {user.streakCount >= user.streakGoal && (
                  <Trophy size={12} className="text-[var(--gold-primary)]" />
                )}
              </div>
            )}

            {/* Perfect streak badge */}
            {isPerfect && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/30">
                <Flame size={11} className="text-[var(--gold-primary)]" />
                <span className="text-xs font-black text-[var(--gold-primary)]">
                  Perfect streak: {stats.streak.perfectStreak} days
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── 2A: Streak Threshold Motivator ── */}
        {user.streakCount >= 1 && user.streakCount <= 6 && (
          <div className="rounded-2xl p-4 overflow-hidden relative" style={{
            background: "linear-gradient(135deg, rgba(255,150,0,0.15) 0%, rgba(255,75,0,0.1) 100%)",
            border: "1px solid rgba(255,150,0,0.35)",
          }}>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10" style={{ background: "var(--orange-primary)" }} />
            <div className="relative flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(255,150,0,0.2)" }}>
                <Flame size={18} style={{ color: "var(--orange-primary)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black" style={{ color: "var(--orange-primary)" }}>
                  {7 - user.streakCount} day{7 - user.streakCount !== 1 ? "s" : ""} away from locking in your learning habit!
                </p>
                <p className="text-[11px] mt-0.5 mb-2.5" style={{ color: "var(--text-secondary)" }}>
                  Research shows 7 consecutive days is when a learning habit becomes automatic.
                </p>
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1" style={{ color: "var(--text-secondary)" }}>
                    <span>Day {user.streakCount}</span>
                    <span>Day 7 🔒</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.3)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round((user.streakCount / 7) * 100)}%`,
                        background: "linear-gradient(90deg, var(--orange-primary), #ff4b4b)",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { icon: <Zap size={16} className="text-[var(--gold-primary)]" />, value: user.xp, label: "Total XP", color: "text-[var(--gold-primary)]", bg: "bg-[var(--gold-primary)]/8 border-[var(--gold-primary)]/15" },
            { icon: <Trophy size={16} className="text-[var(--orange-primary)]" />, value: user.longestStreak, label: "Best Streak", color: "text-[var(--orange-primary)]", bg: "bg-[var(--orange-primary)]/8 border-[var(--orange-primary)]/15" },
            { icon: <BookOpen size={16} className="text-[var(--blue-primary)]" />, value: totalCompleted, label: "Lessons", color: "text-[var(--blue-primary)]", bg: "bg-[var(--blue-primary)]/8 border-[var(--blue-primary)]/15" },
          ].map(({ icon, value, label, color, bg }) => (
            <div key={label} className={cn("rounded-2xl p-3.5 text-center border", bg)}>
              <div className="flex items-center justify-center mb-1.5">{icon}</div>
              <div className={cn("text-2xl font-black tabular-nums", color)}>{value}</div>
              <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Daily Challenge CTA ── */}
        <Link href="/daily-challenge">
          <div className="relative bg-gradient-to-r from-[#ff6b00] via-[var(--orange-primary)] to-[#ff4b4b] rounded-2xl p-4 lesson-card overflow-hidden">
            {/* Background pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center opacity-10">
              <Calendar size={80} />
            </div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Calendar size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">Daily Challenge</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-white/25 text-white text-[9px] font-black uppercase tracking-wide">
                      BONUS XP
                    </span>
                  </div>
                  <div className="text-xs text-white/75 mt-0.5 flex items-center gap-1">
                    <Zap size={11} /> Extra XP · Refreshes daily
                  </div>
                </div>
              </div>
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
                <ArrowRight size={18} className="text-white" />
              </div>
            </div>
          </div>
        </Link>

        {/* ── XP Level ── */}
        <XPProgress xp={user.xp} />

        {/* ── Overall Progress ── */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--green-primary)]" />
              <span className="text-sm font-black">Course Progress</span>
            </div>
            <span className="text-sm font-black text-[var(--green-primary)]">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full progress-fill bg-[var(--green-primary)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5">
            {totalCompleted} of {totalLessons} core lessons completed · {totalArchive}+ transcript episodes available for bonus practice
          </p>
        </div>

        {/* ── Gem Shop ── */}
        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gem size={16} className="text-[var(--blue-primary)]" />
              <span className="text-sm font-black">Gem Shop</span>
            </div>
            <div className="flex items-center gap-1 bg-[var(--blue-primary)]/10 px-2.5 py-1 rounded-full">
              <Gem size={12} className="text-[var(--blue-primary)]" />
              <span className="text-xs font-black text-[var(--blue-primary)] tabular-nums">{user.gems}</span>
            </div>
          </div>

          {/* Toast message */}
          {shopMsg && (
            <div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-[var(--green-primary)]/15 border border-[var(--green-primary)]/30 text-xs font-bold text-[var(--green-primary)] text-center">
              {shopMsg}
            </div>
          )}

          <div className="p-4 space-y-3">

            {/* Streak Freeze */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-xl bg-[var(--blue-primary)]/15 flex items-center justify-center flex-shrink-0">
                <Snowflake size={20} className="text-[var(--blue-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black flex items-center gap-1.5">
                  Streak Freeze
                  <span className="text-[10px] font-bold text-[var(--text-secondary)] bg-[var(--border-color)] px-1.5 py-0.5 rounded-md">
                    {user.streakFreezes}/5
                  </span>
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">Skip a day without losing your streak</p>
                <div className="flex gap-1 mt-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={cn("flex-1 h-1 rounded-full", i < user.streakFreezes ? "bg-[var(--blue-primary)]" : "bg-[var(--border-color)]")} />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleShopBuy("streak_freeze")}
                disabled={user.gems < 50 || user.streakFreezes >= 5}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--blue-primary)] hover:bg-[var(--blue-dark)] text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Gem size={11} /> 50
              </button>
            </div>

            {/* XP Boost */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", user.xpBoostActive ? "bg-[var(--gold-primary)]/30" : "bg-[var(--gold-primary)]/15")}>
                <Zap size={20} className="text-[var(--gold-primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black flex items-center gap-1.5">
                  2× XP Boost
                  {user.xpBoostActive && (
                    <span className="text-[10px] font-black text-[var(--gold-primary)] bg-[var(--gold-primary)]/15 px-1.5 py-0.5 rounded-md border border-[var(--gold-primary)]/30">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                  {user.xpBoostActive ? "Your next lesson earns double XP!" : "Double XP on your next lesson"}
                </p>
              </div>
              <button
                onClick={() => handleShopBuy("xp_boost")}
                disabled={user.gems < 75 || user.xpBoostActive}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--gold-primary)] hover:opacity-90 text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              >
                <Gem size={11} /> 75
              </button>
            </div>

            {/* Streak Repair — only show if broken within 48h */}
            {user.lostStreakVal > 0 && user.streakLostAt && (
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--orange-primary)]/10 border border-[var(--orange-primary)]/30">
                <div className="w-10 h-10 rounded-xl bg-[var(--orange-primary)]/20 flex items-center justify-center flex-shrink-0">
                  <RotateCcw size={20} className="text-[var(--orange-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-[var(--orange-primary)]">Streak Repair</div>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                    Restore your {user.lostStreakVal}-day streak instantly
                  </p>
                </div>
                <button
                  onClick={() => handleShopBuy("streak_repair")}
                  disabled={user.gems < 150}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--orange-primary)] hover:opacity-90 text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <Gem size={11} /> 150
                </button>
              </div>
            )}

          </div>

          {/* How to earn */}
          <div className="px-4 pb-4">
            <div className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2 flex items-center gap-1">
              <Gem size={10} className="text-[var(--gold-primary)]" /> How to earn gems
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "Complete a lesson", gems: "+5" },
                { label: "Perfect score", gems: "+10" },
                { label: "3-day streak", gems: "+10" },
                { label: "7-day streak", gems: "+25" },
                { label: "30-day streak", gems: "+50" },
                { label: "100-day streak", gems: "+100" },
              ].map(({ label, gems }) => (
                <div key={label} className="flex items-center justify-between bg-[var(--bg-primary)] rounded-xl px-2.5 py-1.5">
                  <span className="text-[10px] text-[var(--text-secondary)]">{label}</span>
                  <span className="text-[10px] font-black text-[var(--gold-primary)] flex items-center gap-0.5">
                    <Gem size={9} /> {gems}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        </div>{/* end left sidebar */}
        <div className="space-y-4 mt-4 lg:mt-0">

        {/* ── Activity Calendar ── */}
        {stats?.calendar && <StreakCalendar calendar={stats.calendar} />}

        {/* ── PM Knowledge Map ── */}
        {categories.length > 0 && (
          <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-color)]">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[var(--green-primary)]" />
              <h2 className="text-base font-black">PM Knowledge Map</h2>
            </div>
            <div className="space-y-3">
              {categories.map((category) => {
                const catCompleted = category.lessons.filter((l) => l.completed).length;
                const catTotal = category.lessons.length;
                const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
                const catColor = category.color || "#58cc02";
                return (
                  <div key={category.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-base flex-shrink-0">
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold truncate">{category.name}</span>
                        <span className="text-xs font-bold ml-2 flex-shrink-0 tabular-nums" style={{ color: catPct > 0 ? catColor : "var(--text-secondary)" }}>
                          {catCompleted}/{catTotal}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${catPct}%`, background: catColor }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Lesson Categories ── */}
        <div id="lessons" className="pt-2">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-[var(--green-primary)]" />
            <h2 className="text-base font-black">Your Curriculum</h2>
          </div>
        </div>

        {categories.map((category) => {
          const catCompleted = category.lessons.filter((l) => l.completed).length;
          const catTotal = category.lessons.length;
          const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
          const nextOpenLesson = category.lessons.find((lesson) => !lesson.completed && !lesson.isLocked);
          const nextLockedLesson = category.lessons.find((lesson) => !lesson.completed && lesson.isLocked);
          const categoryExploreHref = `/explore?topic=${encodeURIComponent(category.name)}`;

          return (
            <div key={category.id} className="-mt-2">
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-lg">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black">{category.name}</h3>
                    <span className="text-xs font-bold text-[var(--text-secondary)]">
                      {catCompleted}/{catTotal}
                    </span>
                  </div>
                  <div className="h-1 bg-[var(--bg-secondary)] rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-[var(--green-primary)] rounded-full progress-fill"
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                  {/* 2B: Category Completion CTA */}
                  {catCompleted === catTotal && catTotal > 0 ? (
                    <Link
                      href={categoryExploreHref}
                      className="text-xs font-black mt-1 inline-flex items-center gap-1 hover:underline"
                      style={{ color: "var(--gold-primary)" }}
                    >
                      ✓ Track complete! Create a bonus lesson →
                    </Link>
                  ) : nextOpenLesson ? (
                    <p className="text-xs font-bold mt-1" style={{ color: category.color || "var(--green-primary)" }}>
                      Next up: {nextOpenLesson.title}
                    </p>
                  ) : nextLockedLesson ? (
                    <p className="text-xs font-bold mt-1 text-[var(--text-secondary)]">
                      {nextLockedLesson.lockedReason}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2.5">
                {category.lessons.map((lesson, i) => (
                  <LessonCard
                    key={lesson.id}
                    id={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    difficulty={lesson.difficulty}
                    xpReward={lesson.xpReward}
                    completed={lesson.completed}
                    locked={lesson.isLocked}
                    lockedReason={lesson.lockedReason}
                    index={i}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <Link href="/explore" className="block">
          <div className="rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="bg-gradient-to-r from-[#10271a] to-[#153726] px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-white">Need more depth on a concept?</div>
                <p className="text-xs text-white/65 mt-0.5">
                  Generate bonus lessons from the transcript archive without affecting which core lesson unlocks next.
                </p>
              </div>
              <ArrowRight size={16} className="text-white/70" />
            </div>
          </div>
        </Link>

        {/* ── Share CTA ── */}
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-black text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[var(--green-primary)]/20"
        >
          <Share2 size={16} /> Invite Friends & Share Streak
        </button>

        {/* ── Logout ── */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--red-primary)] hover:border-[var(--red-primary)]/50 transition-colors text-sm font-bold flex items-center justify-center gap-2"
        >
          <LogOut size={15} /> Sign Out
        </button>
        </div>{/* end right content */}
        </div>{/* end grid */}
      </main>

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />

      {/* Next lesson unlocked overlay */}
      {lessonUnlocked && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setLessonUnlocked(null)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative w-full max-w-xs mx-4">
            <div className="bg-gradient-to-br from-[#0d2a18] to-[#1a3a25] border border-[var(--green-primary)]/40 rounded-3xl p-6 text-center shadow-2xl">
              {/* Confetti particles */}
              {[...Array(16)].map((_, i) => {
                const emojis = ["🎉", "⭐", "🏆", "✨", "🔥", "💡", "📚", "🎯"];
                return (
                  <div
                    key={i}
                    className="absolute text-xl pointer-events-none animate-bounce"
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${5 + Math.random() * 90}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: `${0.6 + Math.random() * 0.8}s`,
                      opacity: 0.7,
                    }}
                  >
                    {emojis[i % emojis.length]}
                  </div>
                );
              })}
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-black text-white mb-2">Next Lesson Ready</h2>
              <p className="text-sm text-white/70 mb-1">
                {lessonUnlocked.title}
              </p>
              <p className="text-xs text-[var(--green-primary)] font-bold mb-5">Your category progression just moved forward.</p>
              <button
                onClick={() => {
                  setLessonUnlocked(null);
                  document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-black text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> See My Curriculum
              </button>
            </div>
          </div>
        </div>
      )}

      <StreakCelebration
        milestone={milestone}
        streakCount={user.streakCount}
        perfectStreak={stats?.streak?.perfectStreak ?? 0}
        onClose={() => setMilestone(null)}
      />
    </div>
  );
}
