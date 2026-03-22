"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Activity, TrendingUp, BookOpen, Zap, Flame, Trophy, Lock,
  RefreshCw, Search, Mail, CheckCircle, MousePointer, AlertCircle,
  ChevronLeft, ChevronRight, ArrowUpDown, Eye
} from "lucide-react";

interface AdminStats {
  totalUsers: number;
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
}

interface EmailRow {
  id: string;
  from: string;
  to: string[];
  subject: string;
  lastEvent: string;
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
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "emails">("overview");

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
        <div className="max-w-6xl mx-auto mt-3 flex gap-1">
          {(["overview", "users", "emails"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-xs font-black capitalize transition-all"
              style={{
                background: activeTab === tab ? "#58cc02" : "var(--bg-secondary)",
                color: activeTab === tab ? "white" : "var(--text-secondary)",
                border: "1px solid " + (activeTab === tab ? "#58cc02" : "var(--border-color)"),
              }}
            >
              {tab === "users" ? `Users (${stats.totalUsers})` : tab === "emails" ? "Email Analytics" : "Overview"}
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
                        {["Name", "Email", "XP", "Streak", "Best", "Lessons", "Gems", "Joined", "Last Active"].map((h) => (
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
