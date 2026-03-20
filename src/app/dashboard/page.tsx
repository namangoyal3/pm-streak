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
  TrendingUp, BookOpen, ChevronRight, Sparkles, Lock, MapPin
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

        try {
          const ebRes = await fetch("/api/earn-back");
          if (ebRes.ok) {
            const ebData = await ebRes.json();
            if (ebData.eligible) setEarnBack(ebData);
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

  const handleBuyFreeze = async () => {
    const res = await fetch("/api/user/streak-freeze", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setUser((u: any) => ({ ...u, streakFreezes: data.streakFreezes, gems: data.gems }));
    }
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
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} avatarUrl={user.avatarUrl} name={user.name} />

      <main className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-8 pt-4 pb-28 space-y-4">

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
            : "bg-[var(--bg-card)] border border-[var(--border-color)]"
        )}>
          {/* Background glow */}
          {user.streakCount > 0 && (
            <div className={cn(
              "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-30",
              isPerfect ? "bg-[var(--gold-primary)]" : "bg-[var(--orange-primary)]"
            )} />
          )}

          <div className="relative">
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[var(--text-secondary)] text-xs font-bold uppercase tracking-wider mb-1">
                  Welcome back
                </p>
                <h1 className="text-xl font-black text-white leading-tight">
                  {user.name?.split(" ")[0] ?? "PM"}
                </h1>
                <p className={cn(
                  "text-sm mt-0.5 font-semibold",
                  isPerfect ? "text-[var(--gold-primary)]" : user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-[var(--text-secondary)]"
                )}>
                  {streakMsg}
                </p>
              </div>

              {/* Big streak number */}
              <div className="flex flex-col items-center">
                <Flame
                  size={44}
                  className={cn(
                    "streak-flame",
                    isPerfect ? "text-[var(--gold-primary)]" :
                    user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-600"
                  )}
                />
                <span className={cn(
                  "text-4xl font-black tabular-nums leading-none -mt-1",
                  isPerfect ? "text-[var(--gold-primary)]" :
                  user.streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-600"
                )}>
                  {user.streakCount}
                </span>
                <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">
                  day streak
                </span>
              </div>
            </div>

            {/* Today's goal progress */}
            <div className={cn(
              "rounded-2xl p-3",
              completedToday ? "bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/20" : "bg-black/20"
            )}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Target size={13} className={completedToday ? "text-[var(--green-primary)]" : "text-[var(--text-secondary)]"} />
                  <span className="text-xs font-bold text-[var(--text-secondary)]">Today&apos;s Goal</span>
                </div>
                {completedToday ? (
                  <span className="text-[10px] font-black text-[var(--green-primary)] uppercase tracking-wide">
                    ✓ Complete!
                  </span>
                ) : (
                  <span className="text-[10px] text-[var(--text-secondary)]">1 lesson needed</span>
                )}
              </div>
              <div className="h-2.5 bg-black/30 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full progress-fill", completedToday ? "bg-[var(--green-primary)]" : "bg-[var(--orange-primary)]/50")}
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
                <span className="text-[10px] font-black text-[var(--gold-primary)] uppercase tracking-wide">
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
                  Duolingo&apos;s data shows day 7 is when your streak becomes unstoppable.
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
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[var(--bg-card)] rounded-2xl p-3.5 text-center border border-[var(--border-color)]">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap size={14} className="text-[var(--gold-primary)]" />
            </div>
            <div className="text-2xl font-black text-[var(--gold-primary)] tabular-nums">{user.xp}</div>
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">Total XP</div>
          </div>
          <div className="bg-[var(--bg-card)] rounded-2xl p-3.5 text-center border border-[var(--border-color)]">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy size={14} className="text-[var(--orange-primary)]" />
            </div>
            <div className="text-2xl font-black text-[var(--orange-primary)] tabular-nums">{user.longestStreak}</div>
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">Best Streak</div>
          </div>
          <div className="bg-[var(--bg-card)] rounded-2xl p-3.5 text-center border border-[var(--border-color)]">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BookOpen size={14} className="text-[var(--blue-primary)]" />
            </div>
            <div className="text-2xl font-black text-[var(--blue-primary)] tabular-nums">
              {totalCompleted}<span className="text-sm text-[var(--text-secondary)]">/{totalArchive}+</span>
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">Lessons</div>
          </div>
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
            {totalCompleted} of {totalLessons} active lessons · {totalArchive}+ in archive
          </p>
        </div>

        {/* ── Streak Freeze ── */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-color)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--blue-primary)]/10 border border-[var(--blue-primary)]/20 flex items-center justify-center">
                <Snowflake size={20} className="text-[var(--blue-primary)]" />
              </div>
              <div>
                <div className="text-sm font-black flex items-center gap-2">
                  Streak Freeze
                  <span className="text-xs font-bold text-[var(--blue-primary)] bg-[var(--blue-primary)]/10 px-1.5 py-0.5 rounded-lg">
                    {user.streakFreezes}/5
                  </span>
                </div>
                <div className="text-xs text-[var(--text-secondary)]">Skip a day, keep your streak</div>
              </div>
            </div>
            <button
              onClick={handleBuyFreeze}
              disabled={user.gems < 50 || user.streakFreezes >= 5}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--blue-primary)] hover:bg-[var(--blue-dark)] text-white text-xs font-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Gem size={12} /> 50
            </button>
          </div>
          {/* Freeze slots */}
          <div className="flex gap-1.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 h-1.5 rounded-full transition-all",
                  i < user.streakFreezes ? "bg-[var(--blue-primary)]" : "bg-[var(--bg-secondary)]"
                )}
              />
            ))}
          </div>
        </div>

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
                const catTotal = category.lessons.filter((l) => !l.isLocked).length;
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
          const catTotal = category.lessons.filter((l) => !l.isLocked).length;
          const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;

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
                    <p className="text-[10px] font-black mt-1" style={{ color: "var(--gold-primary)" }}>
                      ✓ Track complete!
                    </p>
                  ) : catCompleted > 0 && catCompleted < catTotal ? (
                    <a
                      href="#lessons"
                      className="text-[10px] font-bold mt-1 inline-flex items-center gap-0.5 hover:underline"
                      style={{ color: category.color || "var(--green-primary)" }}
                    >
                      {catTotal - catCompleted} more lesson{catTotal - catCompleted !== 1 ? "s" : ""} to complete this track →
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2.5">
                {category.lessons.map((lesson, i) => {
                  const prevCompleted = i === 0 || category.lessons[i - 1].completed;
                  const seqLocked = !prevCompleted && !lesson.completed;
                  return (
                    <LessonCard
                      key={lesson.id}
                      id={lesson.id}
                      title={lesson.title}
                      description={lesson.description}
                      difficulty={lesson.difficulty}
                      xpReward={lesson.xpReward}
                      completed={lesson.completed}
                      locked={lesson.isLocked || seqLocked}
                      index={i}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── 200+ More Lessons Teaser ── */}
        <div className="rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card)]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">200+ More Lessons Coming</span>
                <span className="px-1.5 py-0.5 rounded-md bg-[var(--green-primary)]/20 text-[var(--green-primary)] text-[9px] font-black uppercase tracking-wide border border-[var(--green-primary)]/30">
                  LENNY&apos;S ARCHIVE
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">289 podcast episodes · New lessons added weekly</p>
            </div>
          </div>

          {/* Upcoming previews */}
          <div className="divide-y divide-[var(--border-color)]">
            {[
              { title: "Marc Andreessen on the AI Boom", guest: "Marc Andreessen (a16z)", icon: "🤖", cat: "Product Strategy" },
              { title: "Ben Horowitz: Why Founders Fail", guest: "Ben Horowitz (a16z)", icon: "💡", cat: "Leadership & Execution" },
              { title: "Stewart Butterfield: Building Slack", guest: "Stewart Butterfield (Slack founder)", icon: "💬", cat: "Product Strategy" },
              { title: "Dr. Fei-Fei Li on AI & Jobs", guest: "Dr. Fei-Fei Li (Stanford)", icon: "🧬", cat: "User Psychology" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 opacity-60">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center text-base flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">{item.title}</p>
                  <p className="text-[10px] text-[var(--text-secondary)] truncate">{item.guest}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Lock size={13} className="text-[var(--text-secondary)]" />
                </div>
              </div>
            ))}

            {/* "and 285 more" row */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["🎙️", "📊", "🚀", "💰", "🧠"].map((emoji, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-xs">
                      {emoji}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-[var(--text-secondary)] font-bold">+ 285 more episodes</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--green-primary)] font-black">
                <Sparkles size={12} /> Coming soon
              </div>
            </div>
          </div>
        </div>

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
      </main>

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />
      <StreakCelebration
        milestone={milestone}
        streakCount={user.streakCount}
        perfectStreak={stats?.streak?.perfectStreak ?? 0}
        onClose={() => setMilestone(null)}
      />
    </div>
  );
}
