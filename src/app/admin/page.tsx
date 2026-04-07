"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Activity, TrendingUp, BookOpen, Zap, Flame, Trophy, Lock,
  RefreshCw, Search, Mail, CheckCircle, MousePointer, AlertCircle,
  ChevronLeft, ChevronRight, ArrowUpDown, Eye, Crown, Ticket
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
  catalogEpisodes: number;
  coreLessonCount: number;
  coreLockedCount: number;
  coreUnlockedCount: number;
  aiLessonCount: number;
  episodesNotYetImported: number;
  activeToday: number;
  newUsersThisWeek: number;
  newUsersToday: number;
  totalLessonsCompleted: number;
  avgXP: number;
  avgStreak: number;
  maxStreak: number;
  usersWithStreakOver7: number;
  streakDistribution: { range: string; count: number }[];
  topLessons: { title: string; completionCount: number }[];
  lessonFunnel: { title: string; dayNumber: number; completedCount: number; completionPct: number }[];
  recentUsers: { name: string; email: string; xp: number; streakCount: number; createdAt: string }[];
  dailySignups: { date: string; count: number }[];
  dailyCompletions: { date: string; count: number }[];
  xpDistribution: { level1: number; level2: number; level3: number; level4: number; level5: number };
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streakCount: number;
  longestStreak: number;
  gems: number;
  onboarded: boolean;
  lessonsCompleted: number;
  lastActiveAt: string | null;
  createdAt: string;
  country: string | null;
}

interface EmailRow {
  id: string;
  from: string;
  to: string[];
  subject: string;
  lastEvent: string;
  createdAt: string;
}

interface CouponRow {
  code: string;
  email: string;
  discountPercent: number;
  maxUses: number;
  usesCount: number;
  expiresAt: string;
  createdAt: string;
}

interface EmailStats {
  total: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  complained: number;
}

interface CleanupPreview {
  scannedLessons: number;
  weakLessonsFound: number;
  affectedUsers: number;
  sampleTitles: string[];
}

function isAdminEmail(email: string): boolean {
  return email === "namangoyal21197@gmail.com";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function shortDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month - 1]} ${day}`;
}

const EVENT_COLORS: Record<string, string> = {
  sent: "#1cb0f6",
  delivered: "#58cc02",
  opened: "#a855f7",
  clicked: "#ff9600",
  bounced: "#ff4b4b",
  complained: "#ff4b4b",
  unknown: "#6b7280",
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "emails" | "pro-grants" | "coupons" | "ai-company">("overview");

  const [coupons, setCoupons] = useState<CouponRow[]>([]);
  const [couponsLoading, setCouponsLoading] = useState(false);
  const [deletingCode, setDeletingCode] = useState<string | null>(null);

  // Pro grants state
  const [grantEmail, setGrantEmail] = useState("");
  const [grantInterval, setGrantInterval] = useState<"month" | "quarter" | "year">("month");
  const [grantLoading, setGrantLoading] = useState(false);
  const [grantResult, setGrantResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Coupon state
  const [couponEmail, setCouponEmail] = useState("");
  const [couponGlobal, setCouponGlobal] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(70);
  const [couponExpiry, setCouponExpiry] = useState(60 * 24); // 1 day
  const [couponLimit, setCouponLimit] = useState(1);
  const [couponCustomCode, setCouponCustomCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponResult, setCouponResult] = useState<{ ok: boolean; message: string; code?: string } | null>(null);

  // AI Swarm state
  const [aiDirective, setAiDirective] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ ok: boolean; message: string } | null>(null);

  const triggerAISwarm = useCallback(async () => {
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/admin/ai-company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ directive: aiDirective }),
      });
      const data = await res.json();
      setAiResult({ ok: res.ok, message: data.message || data.error });
      if (res.ok) setAiDirective("");
    } catch (e: any) {
      setAiResult({ ok: false, message: e.message || "Request failed" });
    } finally {
      setAiLoading(false);
    }
  }, [aiDirective]);

  // Users table state
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const [usersPages, setUsersPages] = useState(1);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersSort, setUsersSort] = useState("createdAt");
  const [usersSortDir, setUsersSortDir] = useState("desc");
  const [usersLoading, setUsersLoading] = useState(false);

  // Email analytics state
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null);
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [emailPage, setEmailPage] = useState(1);
  const [emailHasMore, setEmailHasMore] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupPreview, setCleanupPreview] = useState<CleanupPreview | null>(null);
  const [cleanupMsg, setCleanupMsg] = useState("");
  const [cleanupRegenN, setCleanupRegenN] = useState(20);

  const fetchStats = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setLastUpdated(new Date());
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async (page: number, search: string, sort: string, dir: string) => {
    setUsersLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50", sort, dir });
      if (search) params.set("q", search);
      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setUsersTotal(data.total);
        setUsersPages(data.pages);
      }
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchEmails = useCallback(async (page: number) => {
    setEmailLoading(true);
    setEmailError("");
    try {
      const res = await fetch(`/api/admin/email-analytics?page=${page}`);
      if (res.ok) {
        const data = await res.json();
        setEmailStats(data.stats);
        setEmails(data.emails);
        setEmailHasMore(data.hasMore);
      } else {
        const data = await res.json();
        setEmailError(data.error || "Failed to load email analytics");
      }
    } finally {
      setEmailLoading(false);
    }
  }, []);

  const fetchCoupons = useCallback(async () => {
    setCouponsLoading(true);
    try {
      const res = await fetch("/api/admin/coupon");
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons);
      }
    } finally {
      setCouponsLoading(false);
    }
  }, []);

  const disableCoupon = useCallback(async (code: string) => {
    if (!confirm(`Are you sure you want to delete ${code}? It will no longer work on checkout.`)) return;
    setDeletingCode(code);
    try {
      const res = await fetch(`/api/admin/coupon?code=${encodeURIComponent(code)}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCoupons();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete coupon.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting coupon.");
    } finally {
      setDeletingCode(null);
    }
  }, [fetchCoupons]);

  const runCleanupPreview = useCallback(async () => {
    setCleanupLoading(true);
    setCleanupMsg("");
    try {
      const res = await fetch("/api/admin/cleanup-weak-ai-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apply: false }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCleanupMsg(data.error || "Could not run cleanup preview.");
        return;
      }
      setCleanupPreview(data.preview);
      setCleanupMsg("Preview ready.");
    } finally {
      setCleanupLoading(false);
    }
  }, []);

  const runCleanupApply = useCallback(async () => {
    setCleanupLoading(true);
    setCleanupMsg("");
    try {
      const res = await fetch("/api/admin/cleanup-weak-ai-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apply: true, regenerateTopN: 0 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCleanupMsg(data.error || "Could not apply cleanup.");
        return;
      }
      setCleanupPreview(data.preview);
      const deletedLessons = data?.deleted?.deletedLessons ?? 0;
      setCleanupMsg(`Cleanup applied. Deleted ${deletedLessons} weak AI lessons.`);
      await fetchStats();
    } finally {
      setCleanupLoading(false);
    }
  }, [fetchStats]);

  const runCleanupApplyWithRegen = useCallback(async () => {
    setCleanupLoading(true);
    setCleanupMsg("");
    try {
      const res = await fetch("/api/admin/cleanup-weak-ai-lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apply: true, regenerateTopN: cleanupRegenN }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCleanupMsg(data.error || "Could not apply cleanup + regenerate.");
        return;
      }
      setCleanupPreview(data.preview);
      const deletedLessons = data?.deleted?.deletedLessons ?? 0;
      const regenerated = data?.regeneration?.regenerated ?? 0;
      const failed = data?.regeneration?.failed ?? 0;
      setCleanupMsg(
        `Cleanup applied. Deleted ${deletedLessons} weak lessons. Regenerated ${regenerated} topic replacements (${failed} failed).`
      );
      await fetchStats();
    } finally {
      setCleanupLoading(false);
    }
  }, [cleanupRegenN, fetchStats]);

  const grantPro = useCallback(async () => {
    if (!grantEmail.trim()) return;
    setGrantLoading(true);
    setGrantResult(null);
    try {
      const res = await fetch("/api/admin/grant-upi-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: grantEmail.trim().toLowerCase(), interval: grantInterval }),
      });
      const data = await res.json();
      if (res.ok) {
        const expiry = new Date(data.currentPeriodEnd).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
        setGrantResult({ ok: true, message: `✅ Pro activated! Expires: ${expiry}` });
        setGrantEmail("");
      } else {
        setGrantResult({ ok: false, message: data.error || "Grant failed" });
      }
    } finally {
      setGrantLoading(false);
    }
  }, [grantEmail, grantInterval]);

  const generateCoupon = useCallback(async () => {
    if (!couponGlobal && !couponEmail.trim()) return;
    setCouponLoading(true);
    setCouponResult(null);
    try {
      const res = await fetch("/api/admin/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: couponGlobal ? "*" : couponEmail.trim().toLowerCase(),
          isGlobal: couponGlobal,
          discountPercent: couponDiscount,
          expiresInMinutes: couponExpiry,
          maxUses: couponLimit,
          customCode: couponCustomCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCouponResult({ ok: true, message: "Coupon created!", code: data.code });
        setCouponEmail("");
        setCouponCustomCode("");
      } else {
        setCouponResult({ ok: false, message: data.error || "Generation failed" });
      }
    } catch (err) {
      setCouponResult({ ok: false, message: "Network error" });
    } finally {
      setCouponLoading(false);
    }
  }, [couponEmail, couponGlobal, couponDiscount, couponExpiry, couponLimit, couponCustomCode]);

  useEffect(() => {
    async function init() {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) { router.push("/login"); return; }
      const { user } = await meRes.json();
      if (!isAdminEmail(user.email)) { router.push("/dashboard"); return; }
      await fetchStats();
    }
    init();
  }, [router, fetchStats]);

  useEffect(() => {
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  useEffect(() => {
    if (activeTab === "users") fetchUsers(usersPage, usersSearch, usersSort, usersSortDir);
  }, [activeTab, usersPage, usersSearch, usersSort, usersSortDir, fetchUsers]);

  useEffect(() => {
    if (activeTab === "emails") fetchEmails(emailPage);
  }, [activeTab, emailPage, fetchEmails]);

  useEffect(() => {
    if (activeTab === "coupons") fetchCoupons();
  }, [activeTab, fetchCoupons]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div style={{ color: "var(--green-primary)" }} className="text-lg font-black animate-pulse">Loading Admin Portal...</div>
      </div>
    );
  }

  if (!stats) return null;

  const maxStreakCount = Math.max(...stats.streakDistribution.map((s) => s.count), 1);
  const maxDailyBar = Math.max(...stats.dailySignups.map((d) => d.count), ...stats.dailyCompletions.map((d) => d.count), 1);
  const xpTotal = stats.xpDistribution.level1 + stats.xpDistribution.level2 + stats.xpDistribution.level3 + stats.xpDistribution.level4 + stats.xpDistribution.level5 || 1;
  const maxLessonCompletion = Math.max(...stats.topLessons.map((l) => l.completionCount), 1);

  const openRate = emailStats && emailStats.delivered > 0 ? Math.round((emailStats.opened / emailStats.delivered) * 100) : 0;
  const clickRate = emailStats && emailStats.opened > 0 ? Math.round((emailStats.clicked / emailStats.opened) * 100) : 0;
  const deliverRate = emailStats && emailStats.sent > 0 ? Math.round((emailStats.delivered / emailStats.sent) * 100) : 0;

  return (
    <div className="min-h-screen pb-16" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <div style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border-color)", position: "sticky", top: 0, zIndex: 50 }} className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black">Admin Portal</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(88,204,2,0.15)", border: "1px solid rgba(88,204,2,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-pulse inline-block" />
              <span className="text-xs font-black" style={{ color: "#58cc02" }}>LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Updated {lastUpdated.toLocaleTimeString()}</span>}
            <button onClick={fetchStats} disabled={refreshing} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-opacity disabled:opacity-50" style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}>
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="max-w-6xl mx-auto mt-3 flex gap-1 flex-wrap">
          {(["overview", "users", "emails", "pro-grants", "coupons", "ai-company"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-xs font-black capitalize transition-all"
              style={{
                background: activeTab === tab ? (tab === "pro-grants" || tab === "coupons" ? "#a855f7" : tab === "ai-company" ? "#1cb0f6" : "#58cc02") : "var(--bg-secondary)",
                color: activeTab === tab ? "white" : "var(--text-secondary)",
                border: "1px solid " + (activeTab === tab ? (tab === "pro-grants" || tab === "coupons" ? "#a855f7" : tab === "ai-company" ? "#1cb0f6" : "#58cc02") : "var(--border-color)"),
              }}
            >
              {tab === "users" ? `Users (${stats.totalUsers})` : tab === "emails" ? "Email Analytics" : tab === "pro-grants" ? "Pro Grants" : tab === "coupons" ? "Coupons" : tab === "ai-company" ? "Virtual C-Suite" : "Overview"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 space-y-6">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Users size={20} style={{ color: "#1cb0f6" }} />} label="Total Users" value={stats.totalUsers} color="#1cb0f6" />
              <StatCard icon={<Activity size={20} style={{ color: "#58cc02" }} />} label="Active Today" value={stats.activeToday} color="#58cc02" sub={`of ${stats.totalUsers} total`} />
              <StatCard icon={<TrendingUp size={20} style={{ color: "#ff9600" }} />} label="New This Week" value={stats.newUsersThisWeek} color="#ff9600" sub={`${stats.newUsersToday} today`} />
              <StatCard icon={<BookOpen size={20} style={{ color: "#a855f7" }} />} label="Lessons Completed" value={stats.totalLessonsCompleted} color="#a855f7" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Zap size={20} style={{ color: "#ffc800" }} />} label="Avg XP / User" value={stats.avgXP} color="#ffc800" />
              <StatCard icon={<Flame size={20} style={{ color: "#ff9600" }} />} label="Avg Streak" value={`${stats.avgStreak}d`} color="#ff9600" />
              <StatCard icon={<Trophy size={20} style={{ color: "#ffc800" }} />} label="Max Streak Ever" value={`${stats.maxStreak}d`} color="#ffc800" />
              <StatCard icon={<Lock size={20} style={{ color: "#58cc02" }} />} label="7+ Day Streaks" value={stats.usersWithStreakOver7} color="#58cc02" sub="Loss aversion locked in 🔒" />
            </div>

            <Section title="Archive Coverage">
              <div
                className="rounded-2xl p-4 space-y-2 text-sm"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <p style={{ color: "var(--text-secondary)" }}>
                  <span className="font-black" style={{ color: "var(--text-primary)" }}>
                    {stats.coreLessonCount} / {stats.catalogEpisodes}
                  </span>{" "}
                  archive lessons are currently available in the app.
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  Breakdown:{" "}
                  <span className="font-bold text-[var(--green-primary)]">
                    {stats.coreUnlockedCount}
                  </span>{" "}
                  always-unlocked core ·{" "}
                  <span className="font-bold text-[var(--orange-primary)]">
                    {stats.coreLockedCount}
                  </span>{" "}
                  gated (batch unlock) ·{" "}
                  <span className="font-bold text-[var(--purple-primary)]">
                    {stats.aiLessonCount}
                  </span>{" "}
                  AI / Explore lessons.
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  Remaining lessons being prepared:{" "}
                  <span className="font-black" style={{ color: stats.episodesNotYetImported > 0 ? "#ff9600" : "var(--green-primary)" }}>
                    {stats.episodesNotYetImported}
                  </span>
                  .
                </p>
              </div>
            </Section>

            <Section title="AI Lesson Quality Cleanup">
              <div className="rounded-2xl p-4 space-y-3 text-sm" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                <p style={{ color: "var(--text-secondary)" }}>
                  Remove previously generated weak/generic AI lessons permanently.
                </p>
                <p style={{ color: "var(--text-secondary)" }}>
                  Deleted lessons are not rewritten in place. Users get improved replacements when they generate fresh custom lessons.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={runCleanupPreview}
                    disabled={cleanupLoading}
                    className="px-3 py-2 rounded-xl text-xs font-black disabled:opacity-50"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
                  >
                    {cleanupLoading ? "Running..." : "Preview Cleanup"}
                  </button>
                  <button
                    onClick={runCleanupApply}
                    disabled={cleanupLoading}
                    className="px-3 py-2 rounded-xl text-xs font-black text-white disabled:opacity-50"
                    style={{ background: "#ff4b4b", border: "1px solid #ff4b4b" }}
                  >
                    {cleanupLoading ? "Running..." : "Apply Cleanup"}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
                    Auto-regenerate top
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={cleanupRegenN}
                    onChange={(e) => setCleanupRegenN(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
                    className="w-20 px-2 py-1 rounded-lg text-xs"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                  <label className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
                    topics
                  </label>
                  <button
                    onClick={runCleanupApplyWithRegen}
                    disabled={cleanupLoading}
                    className="px-3 py-2 rounded-xl text-xs font-black text-white disabled:opacity-50"
                    style={{ background: "#58cc02", border: "1px solid #58cc02" }}
                  >
                    {cleanupLoading ? "Running..." : "Apply + Regenerate"}
                  </button>
                </div>
                {cleanupPreview && (
                  <div className="text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
                    <p>
                      Scanned: <span className="font-black text-[var(--text-primary)]">{cleanupPreview.scannedLessons}</span> · Weak found:{" "}
                      <span className="font-black text-[#ff9600]">{cleanupPreview.weakLessonsFound}</span> · Affected users:{" "}
                      <span className="font-black text-[var(--text-primary)]">{cleanupPreview.affectedUsers}</span>
                    </p>
                    {cleanupPreview.sampleTitles.length > 0 && (
                      <p className="truncate">Examples: {cleanupPreview.sampleTitles.slice(0, 3).join(" | ")}</p>
                    )}
                  </div>
                )}
                {cleanupMsg && (
                  <p className="text-xs font-bold" style={{ color: cleanupMsg.includes("Deleted") ? "#58cc02" : "#ff9600" }}>
                    {cleanupMsg}
                  </p>
                )}
              </div>
            </Section>

            <Section title="Streak Distribution">
              <div className="space-y-3">
                {stats.streakDistribution.map((item) => {
                  const pct = stats.totalUsers > 0 ? Math.round((item.count / stats.totalUsers) * 100) : 0;
                  const barWidth = maxStreakCount > 0 ? Math.round((item.count / maxStreakCount) * 100) : 0;
                  const color = item.range === "0" ? "#6b7280" : item.range === "1-3" ? "#ff9600" : item.range === "4-6" ? "#ffc800" : item.range === "7-14" ? "#58cc02" : item.range === "15-30" ? "#1cb0f6" : "#a855f7";
                  return (
                    <div key={item.range} className="flex items-center gap-3">
                      <div className="w-14 text-right text-xs font-black" style={{ color: "var(--text-secondary)" }}>{item.range === "0" ? "0 days" : `${item.range}d`}</div>
                      <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                        <div className="h-full rounded-lg flex items-center px-2 transition-all duration-500" style={{ width: `${barWidth}%`, background: color, minWidth: item.count > 0 ? "2rem" : "0" }}>
                          {item.count > 0 && <span className="text-white text-xs font-black whitespace-nowrap">{item.count}</span>}
                        </div>
                      </div>
                      <div className="w-10 text-xs font-bold" style={{ color: "var(--text-secondary)" }}>{pct}%</div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Daily Activity (Last 14 Days)">
              <div className="flex items-end gap-2" style={{ height: 120 }}>
                {stats.dailySignups.map((day, i) => {
                  const comp = stats.dailyCompletions[i];
                  const signupH = Math.round((day.count / maxDailyBar) * 96);
                  const compH = comp ? Math.round((comp.count / maxDailyBar) * 96) : 0;
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-0.5" style={{ minWidth: 0 }}>
                      <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: 96 }}>
                        <div className="rounded-t flex-1 transition-all duration-500" style={{ height: signupH || 2, background: "#1cb0f6", opacity: 0.85, minHeight: 2, maxWidth: 12 }} title={`Signups: ${day.count}`} />
                        <div className="rounded-t flex-1 transition-all duration-500" style={{ height: compH || 2, background: "#58cc02", opacity: 0.85, minHeight: 2, maxWidth: 12 }} title={`Completions: ${comp?.count ?? 0}`} />
                      </div>
                      <div className="text-[8px] font-bold text-center" style={{ color: "var(--text-secondary)", fontSize: "7px" }}>{shortDate(day.date)}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#1cb0f6" }} /><span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Signups</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: "#58cc02" }} /><span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Completions</span></div>
              </div>
            </Section>

            <Section title="Top 5 Lessons by Completions">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                      {["Rank", "Lesson", "Completions", "% of Users"].map((h, i) => (
                        <th key={h} className={`py-2 px-3 text-xs font-black uppercase tracking-wide ${i > 1 ? "text-right" : "text-left"}`} style={{ color: "var(--text-secondary)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topLessons.map((lesson, i) => {
                      const pct = stats.totalUsers > 0 ? Math.round((lesson.completionCount / stats.totalUsers) * 100) : 0;
                      const color = pct < 30 ? "#ff4b4b" : pct < 60 ? "#ff9600" : "#58cc02";
                      const barWidth = maxLessonCompletion > 0 ? Math.round((lesson.completionCount / maxLessonCompletion) * 100) : 0;
                      return (
                        <tr key={i} style={{ background: `${color}08`, borderBottom: "1px solid var(--border-color)" }}>
                          <td className="py-2.5 px-3 font-black text-sm" style={{ color: "var(--text-secondary)" }}>#{i + 1}</td>
                          <td className="py-2.5 px-3">
                            <div className="font-bold text-xs mb-1">{lesson.title}</div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)", width: "80%" }}>
                              <div className="h-full rounded-full" style={{ width: `${barWidth}%`, background: color }} />
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-right font-black tabular-nums">{lesson.completionCount}</td>
                          <td className="py-2.5 px-3 text-right"><span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ color, background: `${color}20` }}>{pct}%</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Lesson Funnel (Drop-off Analysis)">
              <div className="space-y-2">
                {stats.lessonFunnel.map((lesson, i) => {
                  const color = lesson.completionPct < 20 ? "#ff4b4b" : lesson.completionPct < 40 ? "#ff9600" : lesson.completionPct < 70 ? "#ffc800" : "#58cc02";
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-[10px] font-black w-6 text-center shrink-0" style={{ color: "var(--text-secondary)" }}>{lesson.dayNumber}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-bold mb-0.5 truncate" style={{ color: "var(--text-secondary)" }}>{lesson.title}</div>
                        <div className="h-4 rounded-lg overflow-hidden flex items-center" style={{ background: "var(--bg-secondary)" }}>
                          <div className="h-full rounded-lg flex items-center px-1.5 transition-all duration-500" style={{ width: `${lesson.completionPct}%`, background: color, minWidth: lesson.completionPct > 0 ? "2rem" : "0" }}>
                            {lesson.completionPct > 5 && <span className="text-white text-[9px] font-black whitespace-nowrap">{lesson.completionPct}%</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-black w-8 text-right shrink-0" style={{ color }}>{lesson.completedCount}</div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="XP Distribution">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: "Beginner", range: "0–99 XP", count: stats.xpDistribution.level1, color: "#6b7280" },
                  { label: "Learner", range: "100–299 XP", count: stats.xpDistribution.level2, color: "#1cb0f6" },
                  { label: "Practitioner", range: "300–599 XP", count: stats.xpDistribution.level3, color: "#58cc02" },
                  { label: "Expert", range: "600–999 XP", count: stats.xpDistribution.level4, color: "#ff9600" },
                  { label: "Master", range: "1000+ XP", count: stats.xpDistribution.level5, color: "#ffc800" },
                ].map((tier) => (
                  <div key={tier.label} className="rounded-2xl p-4 text-center" style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}>
                    <div className="text-2xl font-black tabular-nums" style={{ color: tier.color }}>{tier.count}</div>
                    <div className="text-xs font-black mt-1" style={{ color: tier.color }}>{tier.label}</div>
                    <div className="text-[10px] font-bold mt-0.5" style={{ color: "var(--text-secondary)" }}>{tier.range}</div>
                    <div className="text-[10px] font-black mt-1.5 px-2 py-0.5 rounded-full inline-block" style={{ background: `${tier.color}25`, color: tier.color }}>{Math.round((tier.count / xpTotal) * 100)}%</div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === "users" && (
          <Section title={`All Users — ${usersTotal} total`}>
            {/* Search + sort controls */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
                <input
                  type="text"
                  placeholder="Search by name or email…"
                  value={usersSearch}
                  onChange={(e) => { setUsersSearch(e.target.value); setUsersPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-sm"
                  style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                />
              </div>
              <select
                value={`${usersSort}-${usersSortDir}`}
                onChange={(e) => { const [s, d] = e.target.value.split("-"); setUsersSort(s); setUsersSortDir(d); setUsersPage(1); }}
                className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
              >
                <option value="createdAt-desc">Newest first</option>
                <option value="createdAt-asc">Oldest first</option>
                <option value="xp-desc">Most XP</option>
                <option value="streakCount-desc">Longest streak</option>
                <option value="lastActiveAt-desc">Recently active</option>
                <option value="name-asc">Name A–Z</option>
              </select>
            </div>

            {usersLoading ? (
              <div className="text-center py-8 text-xs" style={{ color: "var(--text-secondary)" }}>Loading users…</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                        {["Name", "Email", "Country", "XP", "Streak", "Best", "Lessons", "Gems", "Joined", "Last Active"].map((h) => (
                          <th key={h} className="py-2 px-2 text-left font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} style={{ borderBottom: "1px solid var(--border-color)" }} className="hover:bg-white/3 transition-colors">
                          <td className="py-2 px-2 font-bold whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0" style={{ background: "#58cc0220", color: "#58cc02" }}>
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="truncate max-w-[100px]">{u.name}</span>
                              {!u.onboarded && <span className="text-[8px] px-1 rounded" style={{ background: "#ff9600", color: "white" }}>NEW</span>}
                            </div>
                          </td>
                          <td className="py-2 px-2 font-mono" style={{ color: "var(--text-secondary)" }}>
                            <a href={`mailto:${u.email}`} className="hover:underline" style={{ color: "#1cb0f6" }}>{u.email}</a>
                          </td>
                          <td className="py-2 px-2 font-bold whitespace-nowrap" style={{ color: u.country === "IN" ? "#a855f7" : "#58cc02" }}>
                            {u.country || "—"}
                          </td>
                          <td className="py-2 px-2 font-black tabular-nums" style={{ color: "#ffc800" }}>{u.xp}</td>
                          <td className="py-2 px-2 font-black tabular-nums" style={{ color: u.streakCount > 0 ? "#ff9600" : "var(--text-secondary)" }}>
                            {u.streakCount > 0 ? `🔥${u.streakCount}` : "—"}
                          </td>
                          <td className="py-2 px-2 tabular-nums" style={{ color: "var(--text-secondary)" }}>{u.longestStreak}d</td>
                          <td className="py-2 px-2 tabular-nums font-bold" style={{ color: "#a855f7" }}>{u.lessonsCompleted}</td>
                          <td className="py-2 px-2 tabular-nums" style={{ color: "#1cb0f6" }}>{u.gems}💎</td>
                          <td className="py-2 px-2 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>{formatDate(u.createdAt)}</td>
                          <td className="py-2 px-2 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                            {u.lastActiveAt ? formatDate(u.lastActiveAt) : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {usersPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Page {usersPage} of {usersPages} · {usersTotal} users
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                        disabled={usersPage === 1}
                        className="p-2 rounded-lg disabled:opacity-40 transition-opacity"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => setUsersPage((p) => Math.min(usersPages, p + 1))}
                        disabled={usersPage === usersPages}
                        className="p-2 rounded-lg disabled:opacity-40 transition-opacity"
                        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Section>
        )}

        {/* ── EMAILS TAB ── */}
        {activeTab === "emails" && (
          <>
            {emailError ? (
              <div className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,75,75,0.1)", border: "1px solid rgba(255,75,75,0.3)" }}>
                <AlertCircle size={24} className="mx-auto mb-2" style={{ color: "#ff4b4b" }} />
                <p className="text-sm font-bold" style={{ color: "#ff4b4b" }}>{emailError}</p>
              </div>
            ) : emailLoading && !emailStats ? (
              <div className="text-center py-12 text-xs" style={{ color: "var(--text-secondary)" }}>Loading email analytics…</div>
            ) : emailStats ? (
              <>
                {/* Email stat cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard icon={<Mail size={20} style={{ color: "#1cb0f6" }} />} label="Emails Sent" value={emailStats.sent} color="#1cb0f6" />
                  <StatCard icon={<CheckCircle size={20} style={{ color: "#58cc02" }} />} label="Delivered" value={`${deliverRate}%`} color="#58cc02" sub={`${emailStats.delivered} emails`} />
                  <StatCard icon={<Eye size={20} style={{ color: "#a855f7" }} />} label="Open Rate" value={`${openRate}%`} color="#a855f7" sub={`${emailStats.opened} opened`} />
                  <StatCard icon={<MousePointer size={20} style={{ color: "#ff9600" }} />} label="Click Rate" value={`${clickRate}%`} color="#ff9600" sub={`${emailStats.clicked} clicked`} />
                </div>

                {emailStats.bounced > 0 && (
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ background: "rgba(255,75,75,0.08)", border: "1px solid rgba(255,75,75,0.25)" }}>
                    <AlertCircle size={16} style={{ color: "#ff4b4b" }} />
                    <span className="text-sm font-bold" style={{ color: "#ff4b4b" }}>{emailStats.bounced} bounce{emailStats.bounced > 1 ? "s" : ""} detected — check your Resend dashboard for details.</span>
                  </div>
                )}

                {/* Email log table */}
                <Section title={`Email Log — ${emailStats.total} emails (this page)`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                          {["Recipient", "Subject", "Status", "Sent At"].map((h) => (
                            <th key={h} className="py-2 px-3 text-left font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {emails.map((e) => {
                          const color = EVENT_COLORS[e.lastEvent] || EVENT_COLORS.unknown;
                          return (
                            <tr key={e.id} style={{ borderBottom: "1px solid var(--border-color)" }} className="hover:bg-white/3 transition-colors">
                              <td className="py-2.5 px-3">
                                {e.to.map((addr) => (
                                  <div key={addr}>
                                    <a href={`mailto:${addr}`} className="hover:underline font-mono" style={{ color: "#1cb0f6" }}>{addr}</a>
                                  </div>
                                ))}
                              </td>
                              <td className="py-2.5 px-3 font-bold max-w-xs truncate">{e.subject}</td>
                              <td className="py-2.5 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase" style={{ background: `${color}20`, color }}>
                                  {e.lastEvent}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                                {formatDateTime(e.createdAt)}
                              </td>
                            </tr>
                          );
                        })}
                        {emails.length === 0 && (
                          <tr><td colSpan={4} className="py-8 text-center" style={{ color: "var(--text-secondary)" }}>No emails found</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Email pagination */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Page {emailPage}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEmailPage((p) => Math.max(1, p - 1))} disabled={emailPage === 1} className="p-2 rounded-lg disabled:opacity-40" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                        <ChevronLeft size={14} />
                      </button>
                      <button onClick={() => setEmailPage((p) => p + 1)} disabled={!emailHasMore} className="p-2 rounded-lg disabled:opacity-40" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </Section>
              </>
            ) : null}
          </>
        )}

        {/* ── PRO GRANTS TAB ── */}
        {activeTab === "pro-grants" && (
          <Section title="Grant Pro Subscription">
            <div className="space-y-4">
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                After confirming a UPI payment (via email/screenshot), enter the user&apos;s email and select the plan period to activate Pro immediately.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                    User Email
                  </label>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={grantEmail}
                      onChange={(e) => { setGrantEmail(e.target.value); setGrantResult(null); }}
                      onKeyDown={(e) => e.key === "Enter" && grantPro()}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
                      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-wide block mb-2" style={{ color: "var(--text-secondary)" }}>
                    Plan Period
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { key: "month", label: "Monthly", amount: "₹249" },
                      { key: "quarter", label: "Quarterly", amount: "₹1,699" },
                      { key: "year", label: "Yearly", amount: "₹1,899" },
                    ] as const).map((plan) => (
                      <button
                        key={plan.key}
                        onClick={() => setGrantInterval(plan.key)}
                        className="rounded-xl p-3 border-2 text-center transition-all"
                        style={{
                          background: grantInterval === plan.key ? "rgba(168,85,247,0.15)" : "var(--bg-secondary)",
                          borderColor: grantInterval === plan.key ? "#a855f7" : "var(--border-color)",
                          color: grantInterval === plan.key ? "#a855f7" : "var(--text-secondary)",
                        }}
                      >
                        <div className="text-sm font-black">{plan.amount}</div>
                        <div className="text-[10px] font-bold mt-0.5">{plan.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={grantPro}
                  disabled={grantLoading || !grantEmail.trim()}
                  className="w-full py-3 rounded-xl text-sm font-black text-white transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#a855f7" }}
                >
                  <Crown size={16} />
                  {grantLoading ? "Activating…" : "Activate Pro"}
                </button>

                {grantResult && (
                  <div
                    className="rounded-xl px-4 py-3 text-sm font-bold"
                    style={{
                      background: grantResult.ok ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.1)",
                      border: `1px solid ${grantResult.ok ? "rgba(88,204,2,0.3)" : "rgba(255,75,75,0.3)"}`,
                      color: grantResult.ok ? "#58cc02" : "#ff4b4b",
                    }}
                  >
                    {grantResult.message}
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

        {/* ── COUPONS TAB ── */}
        {activeTab === "coupons" && (
          <Section title="Manage Coupons">
            <div className="space-y-4">
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Generate discount codes valid on checkout. Enable &quot;Global&quot; to allow anyone to use it up to the selected limit.
              </p>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 text-xs">
                <p className="font-bold text-purple-300 mb-2">Current Base Checkout Prices (Before New Coupons)</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-white mb-1">🇮🇳 India (INR)</p>
                    <ul className="text-white/60 space-y-1 font-mono">
                      <li>Monthly: ₹249</li>
                      <li>Quarterly: ₹669</li>
                      <li>Yearly: ₹1,249</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-bold text-white mb-1">🌍 International (USD)</p>
                    <ul className="text-white/60 space-y-1 font-mono">
                      <li>Monthly: $6</li>
                      <li>Quarterly: $11</li>
                      <li>Yearly: $32</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4 p-4 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="couponGlobal"
                    checked={couponGlobal}
                    onChange={(e) => setCouponGlobal(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="couponGlobal" className="text-sm font-bold text-[var(--text-primary)]">
                    Make Global (Works for any email)
                  </label>
                </div>

                {!couponGlobal && (
                  <div>
                    <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                      Target User Email
                    </label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={couponEmail}
                      onChange={(e) => setCouponEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                      Personalized Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. WELCOME70"
                      value={couponCustomCode}
                      onChange={(e) => setCouponCustomCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-sm font-mono uppercase"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={couponDiscount}
                      onChange={(e) => setCouponDiscount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl text-sm"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                      Usage Limit
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={couponLimit}
                      onChange={(e) => setCouponLimit(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl text-sm"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: "var(--text-secondary)" }}>
                      Time Expiry
                    </label>
                    <select
                      value={couponExpiry}
                      onChange={(e) => setCouponExpiry(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl text-sm"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                    >
                      <option value={60 * 1}>1 Hour</option>
                      <option value={60 * 24}>24 Hours</option>
                      <option value={60 * 24 * 7}>7 Days</option>
                      <option value={60 * 24 * 30}>30 Days</option>
                      <option value={60 * 24 * 365}>1 Year</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateCoupon}
                  disabled={couponLoading || (!couponGlobal && !couponEmail.trim())}
                  className="w-full py-3 rounded-xl text-sm font-black text-white transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#a855f7" }}
                >
                  <Ticket size={16} />
                  {couponLoading ? "Generating..." : "Generate Coupon"}
                </button>
              </div>

              {couponResult && (
                <div
                  className="rounded-xl px-5 py-4 flex flex-col gap-2"
                  style={{
                    background: couponResult.ok ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.1)",
                    border: `1px solid ${couponResult.ok ? "rgba(88,204,2,0.3)" : "rgba(255,75,75,0.3)"}`,
                  }}
                >
                  <div className="font-bold text-sm" style={{ color: couponResult.ok ? "#58cc02" : "#ff4b4b" }}>
                    {couponResult.message}
                  </div>
                  {couponResult.code && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--bg-card)" }}>
                      <span className="font-mono text-lg font-black tracking-widest">{couponResult.code}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(couponResult.code!)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{ background: "#58cc02", color: "white" }}
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Existing Coupons List */}
              <div className="mt-8 border-t border-white/10 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Existing Coupons</h3>
                  <button onClick={fetchCoupons} className="text-xs p-1 hover:rotate-180 transition-all duration-500">
                    <RefreshCw size={14} style={{ color: "var(--text-secondary)" }} />
                  </button>
                </div>
                
                {couponsLoading ? (
                  <div className="text-center py-8 text-xs italic" style={{ color: "var(--text-secondary)" }}>Loading coupons...</div>
                ) : coupons.length === 0 ? (
                  <div className="text-center py-8 text-xs italic" style={{ color: "var(--text-secondary)" }}>No coupons found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                          {["Code", "Type / Email", "Disc", "Used", "Expires", "Action"].map((h) => (
                            <th key={h} className="py-2 px-2 text-left font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((c) => (
                          <tr key={c.code} style={{ borderBottom: "1px solid var(--border-color)" }} className="hover:bg-white/3">
                            <td className="py-3 px-2 font-black tracking-wider text-sm">{c.code}</td>
                            <td className="py-3 px-2">
                              {c.email === "*" ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-bold">GLOBAL</span>
                              ) : (
                                <div className="max-w-[150px] truncate" title={c.email}>{c.email}</div>
                              )}
                            </td>
                            <td className="py-3 px-2 font-bold text-green-400">{c.discountPercent}%</td>
                            <td className="py-3 px-2 tabular-nums">
                              <span className={c.usesCount >= c.maxUses ? "text-red-400" : "text-[var(--text-primary)]"}>
                                {c.usesCount} / {c.maxUses}
                              </span>
                            </td>
                            <td className="py-3 px-2 whitespace-nowrap" style={{ color: new Date(c.expiresAt) < new Date() ? "#ff4b4b" : "var(--text-secondary)" }}>
                              {formatDateTime(c.expiresAt)}
                            </td>
                            <td className="py-3 px-2">
                              <button 
                                onClick={() => disableCoupon(c.code)}
                                disabled={deletingCode === c.code}
                                className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold transition-opacity disabled:opacity-50"
                              >
                                {deletingCode === c.code ? "..." : "Delete"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

        {/* ── AI COMPANY TAB ── */}
        {activeTab === "ai-company" && (
          <Section title="Autonomous AI Swarm (Board Meeting)">
            <div className="max-w-2xl">
              <div className="p-4 rounded-xl mb-6 text-sm" style={{ background: "rgba(28,176,246,0.1)", border: "1px solid rgba(28,176,246,0.3)", color: "var(--text-primary)" }}>
                <p className="font-bold mb-2" style={{ color: "#1cb0f6" }}>How this works:</p>
                <ul className="list-disc pl-5 space-y-1" style={{ color: "var(--text-secondary)" }}>
                  <li>This triggers the 8-agent AI C-suite currently living inside your PM Streak GitHub repo.</li>
                  <li>The CEO analyzes the directive and passes it to the CDO for GA4 data analysis.</li>
                  <li>The CTO writes code and autonomously opens a GitHub Pull Request with A/B testing variations.</li>
                  <li>The CQO verifies the PR and testing methodology.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black uppercase tracking-wide block mb-2" style={{ color: "var(--text-secondary)" }}>
                    Board Directive
                  </label>
                  <textarea
                    placeholder="e.g. Review our recent metrics and deploy a new A/B test to improve Pro conversion rates by 5%..."
                    value={aiDirective}
                    onChange={(e) => setAiDirective(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm min-h-[120px]"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                  />
                </div>
                <button
                  onClick={triggerAISwarm}
                  disabled={aiLoading}
                  className="w-full py-3 rounded-xl text-sm font-black text-white transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: "#1cb0f6" }}
                >
                  {aiLoading ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
                  {aiLoading ? "Spawning Agents..." : "Initiate Board Meeting"}
                </button>
                {aiResult && (
                  <div
                    className="rounded-xl px-4 py-3 text-sm font-bold mt-4"
                    style={{
                      background: aiResult.ok ? "rgba(88,204,2,0.1)" : "rgba(255,75,75,0.1)",
                      border: `1px solid ${aiResult.ok ? "rgba(88,204,2,0.3)" : "rgba(255,75,75,0.3)"}`,
                      color: aiResult.ok ? "#58cc02" : "#ff4b4b",
                    }}
                  >
                    {aiResult.message}
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, sub }: { icon: React.ReactNode; label: string; value: number | string; color: string; sub?: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>{icon}</div>
        <span className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>{label}</span>
      </div>
      <div className="text-3xl font-black tabular-nums" style={{ color }}>{value}</div>
      {sub && <div className="text-[10px] font-bold mt-1" style={{ color: "var(--text-secondary)" }}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}>
      <h2 className="text-sm font-black uppercase tracking-wide mb-4" style={{ color: "var(--text-secondary)" }}>{title}</h2>
      {children}
    </div>
  );
}
