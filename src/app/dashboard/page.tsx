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
  TrendingUp, BookOpen, ChevronRight, Sparkles, Lock,
  Bot, MessageSquare, Brain, Cpu, Swords, ChevronDown, Anchor,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import ShareCard from "@/components/ShareCard";
import StreakCelebration from "@/components/StreakCelebration";

interface Category {
  id: string;
  name: string;
  slug: string; // e.g. podcast-archive — split out for collapsible long list
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
  const [archiveUnlock, setArchiveUnlock] = useState<{
    count: number;
    lessons: { id: string; title: string }[];
  } | null>(null);
  /** Long-tail archive (podcast-archive category + Coming Up Next) — collapsed by default. */
  const [gradualArchiveOpen, setGradualArchiveOpen] = useState(false);

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

        // Check if a new archive batch was just unlocked (set by QuizView on completion)
        try {
          const unlocked = sessionStorage.getItem("archiveUnlock");
          if (unlocked) {
            setArchiveUnlock(JSON.parse(unlocked));
            sessionStorage.removeItem("archiveUnlock");
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
  const episodesNotYetImported = stats?.episodesNotYetImported ?? 0;
  const coreLessonCount = stats?.coreLessonCount ?? 0;
  const archiveImportDisplay = Math.min(coreLessonCount, totalArchive);
  const archiveUnlockProgress = stats?.archiveUnlockProgress as
    | {
        remainingToNextUnlock: number;
        hasLockedArchiveRemaining: boolean;
        availableLessonTotal: number;
        completedAvailable: number;
      }
    | undefined;
  const progressPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  const coreCategories = categories.filter((c) => c.slug !== "podcast-archive");
  const archiveCategory = categories.find((c) => c.slug === "podcast-archive");
  const lockedPreviewCount = categories.flatMap((c) => c.lessons).filter((l) => l.isLocked).length;
  const showGradualSection =
    Boolean(archiveCategory && archiveCategory.lessons.length > 0) || lockedPreviewCount > 0;

  function renderCategoryTrack(category: Category) {
    const catCompleted = category.lessons.filter((l) => l.completed).length;
    const catTotal = category.lessons.length;
    const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
    const nextOpenLesson = category.lessons.find((lesson) => !lesson.completed && !lesson.isLocked);
    const nextLockedLesson = category.lessons.find((lesson) => !lesson.completed && lesson.isLocked);
    const categoryExploreHref = `/explore?topic=${encodeURIComponent(category.name)}`;

    return (
      <div key={category.id} className="-mt-2">
        <div className="flex items-center gap-2.5 mb-3">
          <div className={cn(ds.iconBox, "h-9 w-9 text-lg")}>
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black">{category.name}</h3>
              <span className="text-xs font-bold text-[var(--text-secondary)]">
                {catCompleted}/{catTotal}
              </span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--surface-1)]">
              <div
                className="h-full bg-[var(--green-primary)] rounded-full progress-fill"
                style={{ width: `${catPct}%` }}
              />
            </div>
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
          {category.lessons.map((lesson) => (
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
              isNext={nextOpenLesson?.id === lesson.id}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={ds.pageShell}>
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} avatarUrl={user.avatarUrl} name={user.name} unreadNotifications={user.unreadNotifications} />

      <main className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28">
        {/* ── Pending challenge alert ── */}
        {pendingChallenges.length > 0 && (
          <Link href="/social" className="block mb-4">
            <div className="flex items-center gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--orange-primary)]/30 bg-[var(--orange-primary)]/10 px-4 py-3 hover:bg-[var(--orange-primary)]/15 transition-colors">
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
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-6 lg:items-start w-full min-w-0">
        <div className="space-y-4 min-w-0 order-2 lg:order-1">

        {/* ── Earn-Back Banner ── */}
        {earnBack && (
          <div className="flex items-start gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--orange-primary)]/40 bg-gradient-to-r from-[var(--orange-primary)]/20 to-[var(--red-primary)]/20 p-4">
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
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  requestAnimationFrame(() =>
                    document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  );
                }}
                className="inline-flex items-center gap-1.5 rounded-[var(--ds-radius-md)] bg-[var(--orange-primary)] px-3.5 py-2 text-xs font-black text-white transition-colors hover:bg-[var(--orange-primary)]/80"
              >
                <Flame size={13} /> Start a Lesson Now
              </button>
            </div>
          </div>
        )}

        {/* ── Streak Broken Banner ── */}
        {stats?.streak?.streakBroken && !earnBack && (
          <div className="rounded-[var(--ds-radius-lg)] border-2 border-[var(--red-primary)]/30 bg-[var(--red-primary)]/10 p-4 text-center">
            <p className="text-[var(--red-primary)] font-black">Your streak was broken!</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Start fresh today — every legend restarts.</p>
          </div>
        )}

        {/* ── HERO: Streak Card ── */}
        <div className={cn(
          "relative overflow-hidden rounded-[var(--ds-radius-xl)] p-5",
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
              "rounded-[var(--ds-radius-lg)] border-2 p-3.5",
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
          <div
            className="relative overflow-hidden rounded-[var(--ds-radius-lg)] border-2 border-[var(--orange-primary)]/35 bg-gradient-to-br from-[var(--orange-primary)]/15 to-[var(--red-primary)]/10 p-4"
          >
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
            <div key={label} className={cn("rounded-[var(--ds-radius-lg)] border-2 p-3.5 text-center", bg)}>
              <div className="flex items-center justify-center mb-1.5">{icon}</div>
              <div className={cn("text-2xl font-black tabular-nums", color)}>{value}</div>
              <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Daily Challenge CTA ── */}
        <Link href="/daily-challenge">
          <div className="relative overflow-hidden rounded-[var(--ds-radius-lg)] bg-gradient-to-r from-[#ff6b00] via-[var(--orange-primary)] to-[#ff4b4b] p-4 lesson-card">
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
        <div className={ds.panel}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--green-primary)]" />
              <span className={ds.sectionTitle}>Course Progress</span>
            </div>
            <span className="text-sm font-black text-[var(--green-primary)]">{progressPct}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-[var(--surface-1)]">
            <div
              className="h-full rounded-full progress-fill bg-[var(--green-primary)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1.5">
            {totalCompleted} of {totalLessons} visible lessons completed
            {archiveUnlockProgress &&
            archiveUnlockProgress.remainingToNextUnlock > 0 &&
            archiveUnlockProgress.hasLockedArchiveRemaining
              ? ` · ${archiveUnlockProgress.remainingToNextUnlock} left to unlock the next podcast batch`
              : archiveUnlockProgress &&
                  !archiveUnlockProgress.hasLockedArchiveRemaining
                ? " · Every podcast lesson in the app is unlocked"
                : ` · ${totalArchive}+ episodes in Lenny's catalog, unlocking batch by batch`}
          </p>
          <p className="text-[10px] text-[var(--text-secondary)] mt-2 leading-relaxed border-t border-[var(--border-color)] pt-2">
            New podcast lessons are added in batches as you progress.
          </p>
        </div>

        {/* ── Podcast archive unlock (core curriculum) ── */}
        {stats?.archiveUnlockProgress?.hasLockedArchiveRemaining && (
          <div className={ds.panel}>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={16} className="text-[var(--blue-primary)]" />
              <span className={ds.sectionTitle}>Podcast lesson unlocks</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-2">
              <span className="text-[var(--text-primary)] font-bold">
                {stats.archiveUnlockProgress.completedAvailable}/
                {stats.archiveUnlockProgress.availableLessonTotal}
              </span>{" "}
              core lessons completed. When you finish{" "}
              <span className="text-[var(--text-primary)] font-bold">every</span>{" "}
              open lesson here, the next{" "}
              {stats.archiveUnlockProgress.batchSize} podcast lessons unlock.
            </p>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-1)]">
              <div
                className="h-full rounded-full bg-[var(--blue-primary)]/80"
                style={{
                  width:
                    stats.archiveUnlockProgress.availableLessonTotal > 0
                      ? `${Math.round(
                          (stats.archiveUnlockProgress.completedAvailable /
                            stats.archiveUnlockProgress.availableLessonTotal) *
                            100
                        )}%`
                      : "0%",
                }}
              />
            </div>
            {stats.archiveUnlockProgress.remainingToNextUnlock > 0 && (
              <p className="text-[10px] text-[var(--text-secondary)] mt-2 font-bold">
                {stats.archiveUnlockProgress.remainingToNextUnlock} lesson
                {stats.archiveUnlockProgress.remainingToNextUnlock === 1
                  ? ""
                  : "s"}{" "}
                left until the next batch unlocks.
              </p>
            )}
          </div>
        )}

        {/* ── Gem Shop ── */}
        <div className={cn(ds.panel, "overflow-hidden !p-0")}>
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] px-4 py-3">
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
            <div className="mx-4 mt-3 rounded-[var(--ds-radius-md)] border-2 border-[var(--green-primary)]/30 bg-[var(--green-primary)]/15 px-3 py-2 text-center text-xs font-bold text-[var(--green-primary)]">
              {shopMsg}
            </div>
          )}

          <div className="p-4 space-y-3">

            {/* Streak Freeze */}
            <div className="flex items-center gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] bg-[var(--surface-1)] p-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--ds-radius-md)] bg-[var(--blue-primary)]/15">
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
                className="flex flex-shrink-0 items-center gap-1 rounded-[var(--ds-radius-md)] bg-[var(--blue-primary)] px-3 py-2 text-xs font-black text-white transition-colors hover:bg-[var(--blue-dark)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Gem size={11} /> 50
              </button>
            </div>

            {/* XP Boost */}
            <div className="flex items-center gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] bg-[var(--surface-1)] p-3">
              <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--ds-radius-md)]", user.xpBoostActive ? "bg-[var(--gold-primary)]/30" : "bg-[var(--gold-primary)]/15")}>
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
                className="flex flex-shrink-0 items-center gap-1 rounded-[var(--ds-radius-md)] bg-[var(--gold-primary)] px-3 py-2 text-xs font-black text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Gem size={11} /> 75
              </button>
            </div>

            {/* Streak Repair — only show if broken within 48h */}
            {user.lostStreakVal > 0 && user.streakLostAt && (
              <div className="flex items-center gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--orange-primary)]/30 bg-[var(--orange-primary)]/10 p-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--ds-radius-md)] bg-[var(--orange-primary)]/20">
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
                  className="flex flex-shrink-0 items-center gap-1 rounded-[var(--ds-radius-md)] bg-[var(--orange-primary)] px-3 py-2 text-xs font-black text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
                <div key={label} className="flex items-center justify-between rounded-[var(--ds-radius-md)] bg-[var(--surface-0)] px-2.5 py-1.5">
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
        <div className="space-y-4 mt-0 lg:mt-0 min-w-0 order-1 lg:order-2">

        {/* ── Activity Calendar (moved to top of main content) ── */}
        {stats?.calendar && <StreakCalendar calendar={stats.calendar} />}

        {/* ── Your Curriculum (first on the page so lessons are visible without scrolling) ── */}
        <div id="lessons" className="scroll-mt-24 pt-2">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--green-primary)]" />
            <h2 className={ds.sectionTitle}>Your Curriculum</h2>
          </div>
          <p className="text-[10px] text-[var(--text-secondary)] font-bold mb-3 leading-relaxed">
            <span className="text-[var(--green-primary)]">Next</span> ·{" "}
            <span className="text-[#1cb0f6]">unlocked</span> · done · locked
          </p>
        </div>

        {coreCategories.map((c) => renderCategoryTrack(c))}

        {showGradualSection && (
          <>
            <div id="gradual-archive" className="scroll-mt-24 pt-4 mt-2 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => setGradualArchiveOpen((o) => !o)}
                className={cn(
                  ds.panelFlat,
                  "flex w-full items-center justify-between gap-3 !p-0 px-4 py-3 text-left transition-colors hover:bg-[var(--surface-1)]/90"
                )}
                aria-expanded={gradualArchiveOpen}
                aria-controls="gradual-archive-panel"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen size={18} className="text-[var(--blue-primary)] flex-shrink-0" />
                  <div className="min-w-0">
                    <h2 className={ds.sectionTitle}>Podcast archive & gradual unlocks</h2>
                    <p className="text-[11px] text-[var(--text-secondary)] font-bold truncate">
                      {archiveCategory ? `${archiveCategory.lessons.length} archive lessons` : "Lenny archive"}
                      {lockedPreviewCount > 0 ? ` · ${lockedPreviewCount} in preview queue` : ""}
                      {!gradualArchiveOpen ? " · Tap arrow to expand" : ""}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  size={22}
                  className={cn(
                    "text-[var(--green-primary)] flex-shrink-0 transition-transform duration-200",
                    gradualArchiveOpen && "rotate-180"
                  )}
                />
              </button>
            </div>

            {gradualArchiveOpen && (
              <div id="gradual-archive-panel" className="space-y-4">
                {archiveCategory ? renderCategoryTrack(archiveCategory) : null}

        {(() => {
          const previewLessons = categories.flatMap((category) =>
            category.lessons.filter((lesson) => lesson.isLocked)
          );

          if (previewLessons.length === 0) {
            return null;
          }

          return (
            <div className="max-h-[min(70vh,520px)] overflow-y-auto rounded-[var(--ds-radius-xl)] border-2 border-[var(--border-color)] bg-[var(--surface-2)]">
              <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">
                      Coming Up Next
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-[var(--green-primary)]/20 text-[var(--green-primary)] text-[9px] font-black uppercase tracking-wide border border-[var(--green-primary)]/30">
                      LENNY&apos;S ARCHIVE
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">
                    {previewLessons.length} lesson
                    {previewLessons.length === 1 ? "" : "s"} queued. Finish your
                    open lessons to unlock this next batch.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[var(--border-color)]">
                {previewLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 px-5 py-3.5 opacity-60"
                  >
                    <div className={cn(ds.iconBox, "h-9 w-9")}>
                      <Lock
                        size={16}
                        className="text-[var(--text-secondary)]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-secondary)] truncate">
                        {lesson.description}
                      </p>
                    </div>
                    <Lock
                      size={13}
                      className="text-[var(--text-secondary)]"
                    />
                  </div>
                ))}

                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[BookOpen, Zap, TrendingUp, Trophy, Sparkles].map((Icon, i) => {
                        return (
                          <div
                            key={i}
                            className="w-7 h-7 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center"
                          >
                            <Icon
                              size={12}
                              className="text-[var(--text-secondary)]"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] font-bold">
                      + {episodesNotYetImported} catalog episode
                      {episodesNotYetImported === 1 ? "" : "s"} not in the app yet
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[var(--green-primary)] font-black">
                    <Sparkles size={12} /> Gradual unlocks
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
              </div>
            )}
          </>
        )}

        {/* ── PM Knowledge Map ── */}
        {categories.length > 0 && (
          <div className={ds.panel}>
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-[var(--green-primary)]" />
              <h2 className={ds.sectionTitle}>PM Knowledge Map</h2>
            </div>
            <div className="space-y-3">
              {categories.map((category) => {
                const catCompleted = category.lessons.filter((l) => l.completed).length;
                const catTotal = category.lessons.length;
                const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
                const catColor = category.color || "#58cc02";
                return (
                  <div key={category.id} className="flex items-center gap-3">
                    <div className={cn(ds.iconBox, "h-8 w-8 text-base")}>
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold truncate">{category.name}</span>
                        <span className="text-xs font-bold ml-2 flex-shrink-0 tabular-nums" style={{ color: catPct > 0 ? catColor : "var(--text-secondary)" }}>
                          {catCompleted}/{catTotal}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-1)]">
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

        <Link href="/explore" className="block">
          <div className="overflow-hidden rounded-[var(--ds-radius-xl)] border-2 border-[var(--border-color)] bg-[var(--surface-2)] shadow-[var(--shadow-ds-card)]">
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
          className={cn(
            ds.btnPrimary,
            "flex w-full items-center justify-center gap-2 py-3.5 text-sm shadow-lg shadow-[var(--green-primary)]/20"
          )}
        >
          <Share2 size={16} /> Invite Friends & Share Streak
        </button>

        {/* ── Logout ── */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] py-3 text-sm font-bold text-[var(--text-secondary)] transition-colors hover:border-[var(--red-primary)]/50 hover:text-[var(--red-primary)]"
        >
          <LogOut size={15} /> Sign Out
        </button>
        </div>{/* end right content */}
        </div>{/* end grid */}
      </main>

      {showGradualSection && !gradualArchiveOpen && (
        <button
          type="button"
          onClick={() => {
            setGradualArchiveOpen(true);
            requestAnimationFrame(() => {
              document.getElementById("gradual-archive")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            });
          }}
          className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-[var(--ds-radius-lg)] border-2 border-[var(--green-primary)]/40 bg-[var(--surface-2)]/95 px-4 py-3 text-sm font-black text-[var(--green-primary)] shadow-lg backdrop-blur-sm transition-colors hover:bg-[var(--surface-1)]"
        >
          <Anchor size={18} className="opacity-90" />
          <span>Archive</span>
          <ChevronDown size={18} />
        </button>
      )}

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />

      {/* Archive unlock overlay */}
      {archiveUnlock && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={() => setArchiveUnlock(null)}>
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative w-full max-w-xs mx-4">
            <div className="rounded-[var(--ds-radius-xl)] border-2 border-[var(--green-primary)]/40 bg-gradient-to-br from-[#0d2a18] to-[#1a3a25] p-6 text-center shadow-2xl">
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
              <h2 className="text-2xl font-black text-white mb-2">New Podcast Lessons Unlocked</h2>
              <p className="text-sm text-white/70 mb-1">
                {archiveUnlock.count} new lesson{archiveUnlock.count === 1 ? "" : "s"} just opened up in your curriculum.
              </p>
              {archiveUnlock.lessons[0] && (
                <p className="text-xs text-white/60 mb-2">
                  Starting with {archiveUnlock.lessons[0].title}
                </p>
              )}
              <p className="text-xs text-[var(--green-primary)] font-bold mb-5">Keep the streak alive and the archive keeps opening.</p>
              <button
                onClick={() => {
                  setArchiveUnlock(null);
                  setGradualArchiveOpen(true);
                  requestAnimationFrame(() =>
                    document.getElementById("gradual-archive")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  );
                }}
                className={cn(
                  ds.btnPrimary,
                  "flex w-full items-center justify-center gap-2 py-3 text-sm"
                )}
              >
                <Sparkles size={16} /> See New Lessons
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
