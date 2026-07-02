"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StreakCalendar from "@/components/StreakCalendar";
import XPProgress from "@/components/XPProgress";
import LessonCard from "@/components/LessonCard";
import {
  Flame, LogOut, Snowflake, Gem, Zap,
  ArrowRight, Share2, Target, RotateCcw, Trophy, Star,
  TrendingUp, BookOpen, ChevronRight, Sparkles, Lock,
  MessageSquare, Brain, Swords, ChevronDown, ChevronUp, Anchor,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import { conversionFunnel } from "@/lib/ga4-events";
import ShareCard from "@/components/ShareCard";
import StreakCelebration from "@/components/StreakCelebration";
import GoalSelectionModal from "@/components/GoalSelectionModal";
import {
  INTERVIEW_PREP_PRICING,
  interviewPrepSessionCreditTotal,
} from "@/lib/interview-prep-pricing";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  proGatedCount: number;
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

type ReadinessResponse = {
  overallReadiness: number;
  skillScores: {
    userFocus: number;
    structure: number;
    dataThinking: number;
    tradeoffs: number;
  };
  summary: string;
  sampleSize: number;
  paywallEligible: boolean;
};

type JobPrepInsights = {
  frameworks?: { name: string; summary: string; whenToUse: string }[];
  companySignals?: { theme: string; whyItMatters: string }[];
  archetypeQuestions?: { question: string; whatToDemo: string }[];
};

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [readiness, setReadiness] = useState<ReadinessResponse | null>(null);
  const [showMobileCategoryRail, setShowMobileCategoryRail] = useState(false);
  const [showMobileProgressDetails, setShowMobileProgressDetails] = useState(false);
  const [showMobileUtilities, setShowMobileUtilities] = useState(false);
  const [jobPrepInsights, setJobPrepInsights] = useState<JobPrepInsights | null>(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
 const [showTrialBanner, setShowTrialBanner] = useState(false);
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!user?.onboarded) return;
    if (user.learningGoal != null && user.learningGoal !== "") return;
    try {
      if (typeof window !== "undefined" && localStorage.getItem("pm-streak-goal-modal-dismissed")) {
        return;
      }
    } catch {
      /* ignore */
    }
    setShowGoalModal(true);
  }, [user]);

  // Show trial banner when user is on an active trial
  useEffect(() => {
    if (!user) return;
    if (user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) {
      setShowTrialBanner(true);
    }
  }, [user]);

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

        try {
          const readinessRes = await fetch("/api/readiness");
          if (readinessRes.ok) {
            const readinessData = (await readinessRes.json()) as ReadinessResponse;
            setReadiness(readinessData);
          }
        } catch {
          // best effort
        }

        try {
          const jtRes = await fetch("/api/job-targets");
          if (jtRes.ok) {
            const jt = await jtRes.json();
            const raw = jt.target?.interviewPrepContext;
            if (raw && typeof raw === "object") {
              setJobPrepInsights(raw as JobPrepInsights);
            }
          }
        } catch {
          /* ignore */
        }

        if (lessonsRes.status === "fulfilled" && lessonsRes.value.ok) {
          const lessonsData = await lessonsRes.value.json();
          setCategories(lessonsData.categories);

          const activeCatId = lessonsData.categories.find((c: any) =>
            c.lessons.some((l: any) => !l.completed && !l.isLocked)
          )?.id;
          if (activeCatId) {
            setExpandedCategory(activeCatId);
            setActiveCategoryId(activeCatId);
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

  useEffect(() => {
    if (categories.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          const id = intersecting[0].target.getAttribute("data-category-id");
          if (id) setActiveCategoryId(id);
        }
      },
      { threshold: 0.15, rootMargin: "-56px 0px -40% 0px" }
    );

    const refs = categoryRefs.current;
    refs.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = useCallback((categoryId: string) => {
    setExpandedCategory(categoryId);
    setShowMobileCategoryRail(false);
    setShowMobileProgressDetails(false);
    setTimeout(() => {
      const el = categoryRefs.current.get(categoryId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

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
  const coreLessonCount = stats?.coreLessonCount ?? 0;
  const archiveImportDisplay = Math.min(coreLessonCount, totalArchive);
  const progressPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const activeMobileCategory = categories.find((cat) => cat.id === activeCategoryId) ?? categories[0] ?? null;

  const lockedPreviewCount = categories.flatMap((c) => c.lessons).filter((l) => l.isLocked).length +
    categories.reduce((sum, c) => sum + c.proGatedCount, 0);

  function renderProGatedBanner(category: Category) {
    const count = category.proGatedCount;
    return (
      <Link href="/pricing" className="block mt-2.5">
        <div className="rounded-2xl border-2 border-purple-500/40 bg-[var(--bg-card)] p-4 hover:border-[var(--purple-primary)]/60 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--purple-primary)]/15 flex items-center justify-center flex-shrink-0 border border-[var(--purple-primary)]/25">
              <Lock size={18} className="text-[var(--purple-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-black text-white">
                  {count} Premium Lesson{count !== 1 ? "s" : ""}
                </p>
                <span className="text-[8px] font-black bg-[var(--purple-primary)]/20 text-[var(--purple-primary)] px-1.5 py-0.5 rounded-full">PRO</span>
              </div>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                Expert content from PM leaders like Shreyas Doshi & Marty Cagan
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[8px] text-[var(--text-secondary)]">Interview frameworks</span>
                <span className="text-[8px] text-[var(--text-secondary)]">·</span>
                <span className="text-[8px] text-[var(--text-secondary)]">Case studies</span>
                <span className="text-[8px] text-[var(--text-secondary)]">·</span>
                <span className="text-[8px] text-[var(--text-secondary)]">Real PM scenarios</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-[var(--purple-primary)] text-black text-[10px] font-black uppercase tracking-wider flex-shrink-0">
              <Sparkles size={10} />
              <span>Unlock</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  function renderCategoryTrack(category: Category) {
    const isExpanded = expandedCategory === category.id;
    const catCompleted = category.lessons.filter((l) => l.completed).length;
    const catTotal = category.lessons.length + category.proGatedCount;
    const catFreeLessons = category.lessons.length;
    const catPct = catTotal > 0 ? Math.round((catCompleted / catTotal) * 100) : 0;
    const nextOpenLesson = category.lessons.find((lesson) => !lesson.completed && !lesson.isLocked);
    const nextLockedLesson = category.lessons.find((lesson) => !lesson.completed && lesson.isLocked);
    const categoryExploreHref = `/explore?topic=${encodeURIComponent(category.name)}`;
    const isFullyGated = category.lessons.length === 0 && category.proGatedCount > 0;

    const toggleExpand = () => {
      setExpandedCategory((prev) => (prev === category.id ? null : category.id));
    };

    // Fully premium-gated category: no free lessons at all
    if (isFullyGated) {
      return (
        <div
          key={category.id}
          ref={(el) => {
            if (el) categoryRefs.current.set(category.id, el);
            else categoryRefs.current.delete(category.id);
          }}
          data-category-id={category.id}
          className="-mt-2 border-b border-[var(--border-color)] pb-4 last:border-0"
        >
          <Link href="/pricing" className="block">
            <div className="rounded-2xl border-2 border-purple-500/35 bg-[var(--bg-card)] p-4 hover:border-[var(--purple-primary)]/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[var(--purple-primary)]/15 flex items-center justify-center flex-shrink-0 border border-[var(--purple-primary)]/25 text-xl">
                  {category.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white/70 truncate">{category.name}</h3>
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[var(--purple-primary)]/20 text-[var(--purple-primary)] uppercase tracking-wider flex-shrink-0">PRO</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] mt-1 font-bold">
                    {category.proGatedCount} lessons — Upgrade to unlock
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--purple-primary)] text-black text-[10px] font-black flex-shrink-0">
                  <Sparkles size={10} /> Unlock
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    }

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
      <div
        key={category.id}
        ref={(el) => {
          if (el) categoryRefs.current.set(category.id, el);
          else categoryRefs.current.delete(category.id);
        }}
        data-category-id={category.id}
        className="-mt-2 border-b border-[var(--border-color)] pb-4 last:border-0"
      >
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
                <span>
                  {catCompleted}/{catFreeLessons}
                  {category.proGatedCount > 0 && (
                    <span className="text-purple-400 ml-1">+{category.proGatedCount}🔒</span>
                  )}
                </span>
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

            {/* Pro-gated lessons banner */}
            {category.proGatedCount > 0 && renderProGatedBanner(category)}

            {catCompleted === catFreeLessons && catFreeLessons > 0 && category.proGatedCount === 0 && (
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
        credits={user.credits}
        avatarUrl={user.avatarUrl}
        name={user.name}
        plan={user.plan}
        unreadNotifications={user.unreadNotifications}
      />

     
 {/* Trial Active Banner with countdown */}
 {user.plan !== 'pro' && user.trialEndsAt && new Date(user.trialEndsAt) > new Date() && (() => {
 const now = new Date();
 const end = new Date(user.trialEndsAt);
 const daysLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
 const hoursLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60) % 24));
 return (
 <div className="bg-[var(--bg-card)] border border-[var(--green-primary)]/30 mx-4 mt-4 rounded-2xl px-4 py-3">
 <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 rounded-xl bg-[var(--green-primary)]/15 flex items-center justify-center border border-[var(--green-primary)]/25">
 <Sparkles size={16} className="text-[var(--green-primary)]" />
 </div>
 <div>
 <p className="text-sm font-black text-white">Your Pro Trial is Active!</p>
 <p className="text-xs text-[var(--text-secondary)]">
 {daysLeft > 0
 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''}${hoursLeft > 0 ? ` ${hoursLeft}h` : ''} remaining — Full Pro access`
 : `${hoursLeft}h remaining — Full Pro access`}
 </p>
 </div>
 </div>
 <div className="flex items-center gap-3">
 <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--orange-primary)]/10 border border-[var(--orange-primary)]/25">
 <span className="text-xs font-black text-[var(--orange-primary)] tabular-nums">{daysLeft}</span>
 <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase">days</span>
 </div>
 <Link href="/pricing" className="px-4 py-2 rounded-xl bg-[var(--green-primary)] hover:bg-[var(--green-primary)]/90 text-black text-sm font-black transition-colors active:scale-95 whitespace-nowrap">
 Start Subscription
 </Link>
 </div>
 </div>
 </div>
 );
 })()}
      {/* Mobile sticky category bar */}
      {categories.length > 0 && (
        <div className="lg:hidden sticky top-14 z-40 bg-[var(--bg-primary)] border-b-2 border-[var(--border-color)] px-4 py-2">
          <button
            onClick={() => setShowMobileCategoryRail((prev) => !prev)}
            className="w-full flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2.5 text-left"
          >
            <div className="flex-1 min-w-0 flex items-center gap-2">
              <span className="text-base leading-none">{activeMobileCategory?.icon ?? "🧭"}</span>
              <span className="text-xs font-black truncate">
                {activeMobileCategory ? `Continue in ${activeMobileCategory.name}` : "Jump to a topic"}
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              {showMobileCategoryRail ? "Hide" : "Jump"}
            </span>
            <ChevronDown
              size={14}
              className={cn("text-[var(--text-secondary)] transition-transform", showMobileCategoryRail && "rotate-180")}
            />
          </button>
          {showMobileCategoryRail && (
            <div className="mt-2 flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0",
                    activeCategoryId === cat.id
                      ? "bg-[var(--green-primary)] text-white"
                      : cat.lessons.length === 0 && cat.proGatedCount > 0
                        ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                        : "bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                  )}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <main className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-28">
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
              <div className="flex items-start gap-3 rounded-[var(--ds-radius-lg)] border-2 border-[var(--orange-primary)]/40 bg-[var(--bg-card)] p-4">
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
                    onClick={() =>
                      requestAnimationFrame(() =>
                        document.getElementById("lessons")?.scrollIntoView({ behavior: "smooth", block: "start" })
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-[var(--ds-radius-md)] bg-[var(--orange-primary)] px-3.5 py-2 text-xs font-black text-white transition-colors hover:bg-[var(--orange-primary)]/80"
                  >
                    <Flame size={13} /> Start Now
                  </button>
                </div>
              </div>
            )}

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Zap size={16} className="text-[var(--gold-primary)]" />, value: user.xp, label: "XP", color: "text-[var(--gold-primary)]" },
                { icon: <Trophy size={16} className="text-[var(--orange-primary)]" />, value: user.longestStreak, label: "Best", color: "text-[var(--orange-primary)]" },
                { icon: <BookOpen size={16} className="text-[var(--blue-primary)]" />, value: totalCompleted, label: "Done", color: "text-[var(--blue-primary)]" },
              ].map(({ icon, value, label, color }) => (
                <div key={label} className="rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-ds-card)] p-2.5 sm:p-3 text-center">
                  <div className="flex items-center justify-center mb-1">{icon}</div>
                  <div className={cn("text-lg sm:text-xl font-black tabular-nums", color)}>{value}</div>
                  <div className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-tight">{label}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowMobileProgressDetails((prev) => !prev)}
              className="lg:hidden w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2.5 flex items-center justify-between"
            >
              <span className="text-xs font-black">Learning details</span>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {showMobileProgressDetails ? "Hide" : "Show"}
                {showMobileProgressDetails ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </span>
            </button>

            <div className={cn("space-y-4", showMobileProgressDetails ? "block" : "hidden", "lg:block")}>
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
                <div className="mt-3 grid grid-cols-1 gap-2">
                  <div className="rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] px-2.5 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wide text-[var(--text-secondary)]">Today</p>
                    <p className={cn("text-[11px] font-black mt-1", completedToday ? "text-[var(--green-primary)]" : "text-[var(--orange-primary)]")}>
                      {completedToday ? "Goal complete" : "1 lesson to go"}
                    </p>
                  </div>
                </div>
              </div>

              {readiness && (
                <div className="rounded-[var(--ds-radius-lg)] border-2 border-blue-500/30 bg-blue-500/10 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain size={16} className="text-blue-300" />
                      <span className="text-sm font-black text-white">Interview Readiness</span>
                    </div>
                    <span className="text-sm font-black text-blue-300">{readiness.overallReadiness}/100</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-black/20 mb-3">
                    <div
                      className="h-full rounded-full bg-blue-400"
                      style={{ width: `${Math.max(0, Math.min(100, readiness.overallReadiness))}%` }}
                    />
                  </div>
                  <div className="space-y-2 mb-2">
                    {[
                      ["User focus", readiness.skillScores.userFocus],
                      ["Structure", readiness.skillScores.structure],
                      ["Data thinking", readiness.skillScores.dataThinking],
                      ["Trade-offs", readiness.skillScores.tradeoffs],
                    ].map(([label, value]) => (
                      <div key={String(label)}>
                        <div className="flex items-center justify-between text-[10px] font-bold text-white/70 mb-1">
                          <span>{label}</span>
                          <span>{Number(value)}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-300"
                            style={{ width: `${Math.max(0, Math.min(100, Number(value)))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/65">{readiness.summary}</p>
                  {readiness.paywallEligible && user.plan !== "pro" && (
                    <Link
                      href="/pricing"
                      className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-purple-500 text-white px-3 py-1.5 rounded-lg"
                    >
                      Unlock advanced coaching
                    </Link>
                  )}
                </div>
              )}

              {jobPrepInsights &&
              ((jobPrepInsights.frameworks?.length ?? 0) > 0 ||
                (jobPrepInsights.companySignals?.length ?? 0) > 0) ? (
                <div className="rounded-[var(--ds-radius-lg)] border-2 border-indigo-500/30 bg-indigo-950/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-indigo-300" />
                    <span className="text-xs font-black text-white uppercase tracking-wider">Target role prep</span>
                  </div>
                  <p className="text-[10px] text-white/55 mb-3">
                    From your JD: frameworks, what teams often look for, and example question themes.
                  </p>
                  {jobPrepInsights.frameworks && jobPrepInsights.frameworks.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-1">Frameworks</p>
                      <ul className="space-y-1.5">
                        {jobPrepInsights.frameworks.slice(0, 4).map((f, i) => (
                          <li key={i} className="text-[10px] text-white/75">
                            <span className="font-black text-white/90">{f.name}</span>
                            {" — "}
                            {f.summary}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {jobPrepInsights.companySignals && jobPrepInsights.companySignals.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-1">Company signals</p>
                      <ul className="space-y-1">
                        {jobPrepInsights.companySignals.slice(0, 4).map((s, i) => (
                          <li key={i} className="text-[10px] text-white/70">
                            <span className="font-bold">{s.theme}:</span> {s.whyItMatters}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {jobPrepInsights.archetypeQuestions && jobPrepInsights.archetypeQuestions.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-1">Question themes</p>
                      <ul className="space-y-1">
                        {jobPrepInsights.archetypeQuestions.slice(0, 3).map((q, i) => (
                          <li key={i} className="text-[10px] text-white/65">• {q.question}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link
                    href="/interview-prep"
                    className="mt-3 inline-flex text-[10px] font-black text-indigo-200 hover:underline"
                  >
                    Open AI Interview Prep →
                  </Link>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setShowMobileUtilities((prev) => !prev)}
              className="lg:hidden w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2.5 flex items-center justify-between"
            >
              <span className="text-xs font-black">Tools & account</span>
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                {showMobileUtilities ? "Hide" : "Show"}
                {showMobileUtilities ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </span>
            </button>

            <div className={cn("space-y-4", showMobileUtilities ? "block" : "hidden", "lg:block")}>
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

              {/* Credits & Upgrade */}
              {user.plan !== "pro" ? (
                <div className="rounded-[var(--ds-radius-lg)] border-2 border-purple-500/30 bg-[var(--bg-card)] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap size={16} className="text-[var(--purple-primary)]" />
                      <span className="text-sm font-black text-white">Level Up to Pro</span>
                    </div>
                    <div className="flex items-center gap-1 bg-[var(--purple-primary)]/15 px-2.5 py-1 rounded-full">
                      <span className="text-[10px] font-black text-[var(--purple-primary)]">70% OFF</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-white/40 line-through text-xs">₹830</span>
                      <span className="text-lg font-black text-[var(--green-primary)]">₹249</span>
                      <span className="text-white/50 text-xs">/month</span>
                    </div>
                    
                    <div className="space-y-1.5 text-[10px] text-white/70">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-primary)]"></div>
                        <span>Unlock <span className="font-bold text-white">292+</span> archive lessons</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-primary)]"></div>
                        <span><span className="font-bold text-white">100</span> credits/month (vs 5 free)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-primary)]"></div>
                        <span>Unlimited AI interview prep</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    href="/pricing"
                    onClick={() => conversionFunnel.dashboardUpgradeCtaClicked("dashboard_card")}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-[var(--purple-primary)] text-white text-xs font-black uppercase tracking-wider hover:opacity-90 transition-colors"
                  >
                    <Star size={12} /> Upgrade Now - Limited Time
                  </Link>
                  
                  <div className="mt-2 text-center">
                    <span className="text-[8px] text-white/40">Join 200+ PMs already learning with Pro</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-[var(--ds-radius-lg)] border-2 border-purple-500/30 bg-purple-500/10 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-purple-400" />
                    <span className="text-xs font-black text-purple-300">Pro</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={12} className="text-purple-400" />
                    <span className="text-xs font-black text-purple-400">{user.credits ?? 50} credits</span>
                  </div>
                </div>
              )}

              {/* WhatsApp Pro Community — Pro only */}
              {user.plan === "pro" && (
                <a
                  href="https://chat.whatsapp.com/pmstreak-community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-[var(--ds-radius-lg)] border-2 border-green-500/30 bg-green-500/10 p-3.5 hover:bg-green-500/15 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={15} className="text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-green-300">Pro Community</div>
                    <div className="text-[10px] text-white/50">WhatsApp · PMs only</div>
                  </div>
                  <ArrowRight size={13} className="text-green-400 flex-shrink-0" />
                </a>
              )}

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-2">
                <Link href="/jobs" className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-color)] p-3 hover:border-[var(--green-primary)]/40 transition-colors">
                  <Target size={14} className="text-[var(--green-primary)]" />
                  <div>
                    <div className="text-[10px] font-black">PM Jobs</div>
                    <div className="text-[9px] text-[var(--text-secondary)]">Find roles</div>
                  </div>
                </Link>
                <Link href="/interview-prep" className="flex items-center gap-2 rounded-xl border-2 border-[var(--border-color)] p-3 hover:border-[var(--blue-primary)]/40 transition-colors">
                  <Brain size={14} className="text-[var(--blue-primary)]" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-black">Interview</span>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-500/25 text-blue-200">AI</span>
                    </div>
                    <div className="text-[9px] text-[var(--text-secondary)] leading-tight">
                      {interviewPrepSessionCreditTotal()} credits / session ·{" "}
                      {INTERVIEW_PREP_PRICING.creditsPerQuestion} / question
                    </div>
                  </div>
                </Link>
              </div>

              <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--border-color)] py-3 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--red-primary)] transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* LEFT CONTENT (CURRICULUM) */}
          <div className="space-y-4 min-w-0 order-1 lg:order-1">
            <div className={cn(
              "relative overflow-hidden rounded-[var(--ds-radius-xl)] p-4 sm:p-5",
              isPerfect ? "bg-[var(--bg-card)] border-2 border-[var(--gold-primary)]/30" : "bg-[var(--bg-card)] border-2 border-[var(--green-primary)]/30"
            )}>
              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Flame size={42} className={isPerfect ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]"} />
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white">{user.streakCount}</div>
                    <div className="text-[10px] font-black uppercase text-white/50 tracking-widest">Day Streak</div>
                  </div>
                </div>
                <div className="rounded-xl bg-black/15 px-3 py-2 sm:bg-transparent sm:px-0 sm:py-0 sm:text-right">
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
              <div className="flex gap-4 items-start">
                {/* Desktop sticky category nav */}
                {categories.length > 0 && (
                  <nav className="hidden lg:flex flex-col gap-1 sticky top-20 w-36 xl:w-44 shrink-0">
                    {categories.map((cat) => {
                      const done = cat.lessons.filter((l) => l.completed).length;
                      const total = cat.lessons.length + cat.proGatedCount;
                      const isActive = activeCategoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => scrollToCategory(cat.id)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors",
                            isActive
                              ? "bg-[var(--green-primary)]/15 text-[var(--green-primary)]"
                              : cat.lessons.length === 0 && cat.proGatedCount > 0
                                ? "text-purple-400/70 hover:bg-purple-500/10"
                                : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
                          )}
                        >
                          <span className="text-base leading-none">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className={cn("truncate text-xs leading-tight", isActive ? "font-black" : "font-bold")}>
                              {cat.name}
                            </div>
                            <div className="text-[9px] opacity-60 mt-0.5">
                              {cat.lessons.length === 0 && cat.proGatedCount > 0
                                ? `🔒 ${cat.proGatedCount} lessons`
                                : `${done}/${total}`}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                )}
                {/* Lesson tracks */}
                <div className="flex-1 min-w-0 space-y-4">
                  {categories.map((c) => renderCategoryTrack(c))}
                  {lockedPreviewCount > 0 && (
                    <div className="mt-4 bg-[var(--surface-1)] p-4 rounded-xl border-2 border-dashed border-[var(--border-color)]">
                      <p className="text-[10px] text-[var(--text-secondary)] font-bold">
                        Complete the open lessons above to unlock the next batch of podcast episodes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
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

      {showGoalModal && (
        <GoalSelectionModal
          onClose={() => setShowGoalModal(false)}
          onSaved={(goalKey) => {
            setShowGoalModal(false);
            setUser((u: any) => (u ? { ...u, learningGoal: goalKey } : u));
          }}
        />
      )}

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />
      <StreakCelebration milestone={milestone} streakCount={user.streakCount} perfectStreak={stats?.streak?.perfectStreak ?? 0} onClose={() => setMilestone(null)} />
      {archiveUnlock && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80" onClick={() => setArchiveUnlock(null)}>
          <div className="w-full max-w-sm bg-[var(--bg-card)] border-2 border-[var(--green-primary)]/40 rounded-[2rem] p-8 text-center" onClick={(e) => e.stopPropagation()}>
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
