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
  const [archiveUnlock, setArchiveUnlock] = useState<{
    count: number;
    lessons: { id: string; title: string }[];
  } | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const userRes = await fetch("/api/auth/me");

        if (!userRes.ok) {
          router.push("/login");
          return;
        }

        const userData = await userRes.json();
        setUser(userData.user);
        
        // Do not force logout for transient failures in secondary APIs.
        const [statsRes, lessonsRes] = await Promise.allSettled([
          fetch("/api/user/stats"),
          fetch("/api/lessons"),
        ]);

        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const statsData = await statsRes.value.json();
          setStats(statsData);
        }

        if (lessonsRes.status === "fulfilled" && lessonsRes.value.ok) {
          const lessonsData = await lessonsRes.value.json();
          setCategories(lessonsData.categories);

          const activeCatId = lessonsData.categories.find((c: any) =>
            c.lessons.some((l: any) => !l.completed && !l.isLocked)
          )?.id;
          if (activeCatId) {
            setExpandedCategories([activeCatId]);
          }
        }

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
        // Keep user on dashboard; only /api/auth/me failure should log out.
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

  if (loading || !user) {
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

  const streakMsg = user.streakCount > 0
    ? streakMessages[user.streakCount % streakMessages.length]
    : "Complete a lesson to start your streak!";

  const isPerfect = stats?.streak?.perfectStreak >= 7;
  const completedToday = stats?.completedToday ?? false;
  const streakCalendar = stats?.calendar ?? [];
  const totalCompleted = stats?.completedCount ?? 0;
  const totalLessons = stats?.totalLessons ?? 0;
  const totalArchive = stats?.totalArchive ?? 289;
  const episodesNotYetImported = stats?.episodesNotYetImported ?? 0;
  const coreLessonCount = stats?.coreLessonCount ?? 0;
  const archiveImportDisplay = Math.min(coreLessonCount, totalArchive);
  const archiveUnlockProgress = stats?.archiveUnlockProgress;
  const progressPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  const lockedPreviewCount = categories.flatMap((c) => c.lessons).filter((l) => l.isLocked).length;

  function renderCategoryTrack(category: Category) {
    const isExpanded = expandedCategories.includes(category.id);
    const catCompleted = category.lessons.filter((l) => l.completed).length;
    const catTotal = category.lessons.length;
    const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
    const nextOpenLesson = category.lessons.find((lesson) => !lesson.completed && !lesson.isLocked);
    const nextLockedLesson = category.lessons.find((lesson) => !lesson.completed && lesson.isLocked);
    const categoryExploreHref = `/explore?topic=${encodeURIComponent(category.name)}`;

    const toggleExpand = () => {
      setExpandedCategories((prev) =>
        prev.includes(category.id)
          ? prev.filter((id) => id !== category.id)
          : [...prev, category.id]
      );
    };

    const visibleLessons = (() => {
      const emptyState = { lessons: [] as Category["lessons"], hiddenLockedCount: 0 };
      if (!isExpanded) return emptyState;
      
      const finished = category.lessons.filter(l => l.completed);
      const open = category.lessons.filter(l => !l.completed && !l.isLocked);
      const locked = category.lessons.filter(l => l.isLocked);
      
      const lockedToShow = locked.slice(0, 5);
      const hiddenLockedCount = Math.max(0, locked.length - lockedToShow.length);
      
      return {
        lessons: [...finished, ...open, ...lockedToShow],
        hiddenLockedCount
      };
    })();

    return (
      <div key={category.id} className="-mt-2 border-b border-[var(--border-color)] pb-4 last:border-0">
        <button
          onClick={toggleExpand}
          className="flex w-full items-center gap-2.5 mb-3 text-left transition-opacity hover:opacity-80"
        >
          <div className={cn(ds.iconBox, "h-9 w-9 text-lg")}>
            {category.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black">{category.name}</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
                <span>{catCompleted}/{catTotal}</span>
                <ChevronDown size={14} className={cn("transition-transform", isExpanded && "rotate-180")} />
              </div>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-[var(--surface-1)]">
              <div
                className="h-full bg-[var(--green-primary)] rounded-full progress-fill"
                style={{ width: `${catPct}%` }}
              />
            </div>
          </div>
        </button>

        {isExpanded && (
          <div className="space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {visibleLessons.lessons.map((lesson) => (
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

            {visibleLessons.hiddenLockedCount > 0 && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-2)] border-2 border-[var(--border-color)]">
                  <Anchor size={14} className="text-[var(--text-secondary)]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
                    {visibleLessons.hiddenLockedCount} More {visibleLessons.hiddenLockedCount === 1 ? 'Lesson' : 'Lessons'} Locked
                  </span>
                </div>
              </div>
            )}

            {catCompleted === catTotal && catTotal > 0 && (
              <div className="pt-2">
                <Link
                  href={categoryExploreHref}
                  className="text-xs font-black inline-flex items-center gap-1 hover:underline p-2 rounded-lg bg-[var(--gold-primary)]/10"
                  style={{ color: "var(--gold-primary)" }}
                >
                  <Sparkles size={12} /> Track complete! Create a bonus lesson →
                </Link>
              </div>
            )}
            
            {!nextOpenLesson && nextLockedLesson && (
              <p className="text-[10px] font-bold text-[var(--text-secondary)] p-2 bg-[var(--surface-1)] rounded-lg">
                {nextLockedLesson.lockedReason}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={ds.pageShell}>
      <Navbar 
        streakCount={user.streakCount} 
        xp={user.xp} 
        gems={user.gems} 
        avatarUrl={user.avatarUrl} 
        name={user.name} 
        unreadNotifications={user.unreadNotifications} 
      />

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

        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-6 lg:items-start w-full min-w-0">
          {/* RIGHT SIDEBAR */}
          <div className="space-y-4 min-w-0 order-2 lg:order-2">
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
                  <a
                    href="#lessons"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center gap-1.5 rounded-[var(--ds-radius-md)] bg-[var(--orange-primary)] px-3.5 py-2 text-xs font-black text-white transition-colors hover:bg-[var(--orange-primary)]/80"
                  >
                    <Flame size={13} /> Start Now
                  </a>
                </div>
              </div>
            )}

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: <Zap size={16} className="text-[var(--gold-primary)]" />, value: user.xp, label: "XP", color: "text-[var(--gold-primary)]", bg: "bg-[var(--gold-primary)]/8 border-[var(--gold-primary)]/15" },
                { icon: <Trophy size={16} className="text-[var(--orange-primary)]" />, value: user.longestStreak, label: "Best", color: "text-[var(--orange-primary)]", bg: "bg-[var(--orange-primary)]/8 border-[var(--orange-primary)]/15" },
                { icon: <BookOpen size={16} className="text-[var(--blue-primary)]" />, value: totalCompleted, label: "Done", color: "text-[var(--blue-primary)]", bg: "bg-[var(--blue-primary)]/8 border-[var(--blue-primary)]/15" },
              ].map(({ icon, value, label, color, bg }) => (
                <div key={label} className={cn("rounded-[var(--ds-radius-lg)] border-2 p-3 text-center", bg)}>
                  <div className="flex items-center justify-center mb-1">{icon}</div>
                  <div className={cn("text-xl font-black tabular-nums", color)}>{value}</div>
                  <div className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-tight">{label}</div>
                </div>
              ))}
            </div>

            <Link href="/daily-challenge" className="block">
              <div className="relative overflow-hidden rounded-[var(--ds-radius-lg)] bg-gradient-to-r from-[#ff6b00] via-[var(--orange-primary)] to-[#ff4b4b] p-4 lesson-card">
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
                        <span className="text-sm font-black text-white">Daily Bonus</span>
                      </div>
                      <div className="text-xs text-white/75 mt-0.5 flex items-center gap-1">
                        <Zap size={11} /> Extra XP await
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <XPProgress xp={user.xp} />
            {streakCalendar.length > 0 && (
              <StreakCalendar calendar={streakCalendar} />
            )}

            <div className={ds.panel}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[var(--green-primary)]" />
                  <span className={ds.sectionTitle}>Course Progress</span>
                </div>
                <span className="text-sm font-black text-[var(--green-primary)]">{progressPct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[var(--surface-1)]">
                <div className="h-full rounded-full progress-fill bg-[var(--green-primary)]" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] mt-2 font-bold uppercase tracking-wider">
                {totalCompleted} / {totalLessons} lessons done
              </p>
            </div>

            <div className={cn(ds.panel, "overflow-hidden !p-0")}>
              <div className="flex items-center justify-between border-b-2 border-[var(--border-color)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Gem size={16} className="text-[var(--blue-primary)]" />
                  <span className="text-sm font-black">Shop</span>
                </div>
                <div className="flex items-center gap-1 bg-[var(--blue-primary)]/10 px-2.5 py-1 rounded-full">
                  <Gem size={12} className="text-[var(--blue-primary)]" />
                  <span className="text-xs font-black text-[var(--blue-primary)] tracking-tighter">{user.gems}</span>
                </div>
              </div>
              {shopMsg && <div className="mx-4 mt-3 rounded-lg bg-[var(--green-primary)]/15 p-2 text-center text-[10px] font-bold text-[var(--green-primary)]">{shopMsg}</div>}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border-2 border-[var(--border-color)] p-3 cursor-pointer" onClick={() => handleShopBuy("streak_freeze")}>
                  <Snowflake size={18} className="text-[var(--blue-primary)]" />
                  <div className="flex-1">
                    <div className="text-xs font-black">Streak Freeze</div>
                    <div className="text-[9px] text-[var(--text-secondary)]">Skip a day</div>
                  </div>
                  <div className="text-xs font-black">50 <Gem size={10} className="inline" /></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border-2 border-[var(--border-color)] p-3 cursor-pointer" onClick={() => handleShopBuy("xp_boost")}>
                  <Zap size={18} className="text-[var(--gold-primary)]" />
                  <div className="flex-1">
                    <div className="text-xs font-black">2x XP Boost</div>
                    <div className="text-[9px] text-[var(--text-secondary)]">Double XP</div>
                  </div>
                  <div className="text-xs font-black">75 <Gem size={10} className="inline" /></div>
                </div>
              </div>
            </div>

            <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--border-color)] py-3 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--red-primary)] transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          {/* LEFT CONTENT (CURRICULUM) */}
          <div className="space-y-4 min-w-0 order-1 lg:order-1">
            <div className={cn(
              "relative overflow-hidden rounded-[var(--ds-radius-xl)] p-5",
              isPerfect ? "bg-gradient-to-br from-[#1a1200] to-[#2a1f00] border-2 border-[var(--gold-primary)]/30" : "bg-gradient-to-br from-[#10271a] to-[#153726] border-2 border-[var(--green-primary)]/30"
            )}>
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Flame size={48} className={isPerfect ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]"} />
                  <div>
                    <div className="text-4xl font-black text-white">{user.streakCount}</div>
                    <div className="text-[10px] font-black uppercase text-white/50 tracking-widest">Day Streak</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-[var(--green-primary)] uppercase tracking-wider mb-1">Status</div>
                  <div className="text-xs font-bold text-white">{streakMsg}</div>
                </div>
              </div>
            </div>

            <div id="lessons" className="scroll-mt-24 pt-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className={ds.sectionTitle}>PM Knowledge Map</h2>
                <Link href="/explore" className="text-xs font-black text-[var(--green-primary)] hover:underline flex items-center gap-1">
                  <Sparkles size={12} /> Explore More
                </Link>
              </div>
              <div className="space-y-4">
                {categories.map((c) => renderCategoryTrack(c))}
              </div>
              {lockedPreviewCount > 0 && (
                <div className="mt-4 bg-[var(--surface-1)] p-4 rounded-xl border-2 border-dashed border-[var(--border-color)]">
                  <p className="text-[10px] text-[var(--text-secondary)] font-bold">
                    Complete the open lessons above to unlock the next batch of podcast episodes.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowShare(true)}
              className="w-full py-4 rounded-2xl bg-[var(--green-primary)] text-white font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-[var(--green-primary)]/20 flex items-center justify-center gap-2"
            >
              <Share2 size={18} /> Share My Streak
            </button>
          </div>
        </div>
      </main>

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />
      <StreakCelebration milestone={milestone} streakCount={user.streakCount} perfectStreak={stats?.streak?.perfectStreak ?? 0} onClose={() => setMilestone(null)} />
      {archiveUnlock && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80" onClick={() => setArchiveUnlock(null)}>
          <div className="w-full max-w-sm bg-gradient-to-br from-[#0d2a18] to-[#1a3a25] border-2 border-[var(--green-primary)]/40 rounded-[2rem] p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-white mb-2">Batch Unlocked!</h2>
            <p className="text-white/70 text-sm mb-6">{archiveUnlock.count} new archive lessons are now waiting for you.</p>
            <button onClick={() => setArchiveUnlock(null)} className="w-full py-3 bg-[var(--green-primary)] text-white font-black rounded-xl uppercase tracking-widest">Let&apos;s go</button>
          </div>
        </div>
      )}
    </div>
  );
}
