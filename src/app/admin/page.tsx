"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users, Activity, TrendingUp, BookOpen, Zap, Flame, Trophy, Lock,
  RefreshCw, ChevronRight
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

function isAdminEmail(email: string): boolean {
  return email === "namangoyal21197@gmail.com";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function shortDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[month - 1]} ${day}`;
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

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

  useEffect(() => {
    async function init() {
      const meRes = await fetch("/api/auth/me");
      if (!meRes.ok) {
        router.push("/login");
        return;
      }
      const { user } = await meRes.json();
      if (!isAdminEmail(user.email)) {
        router.push("/dashboard");
        return;
      }
      await fetchStats();
    }
    init();
  }, [router, fetchStats]);

  useEffect(() => {
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div style={{ color: "var(--green-primary)" }} className="text-lg font-black animate-pulse">
          Loading Admin Portal...
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const maxStreakCount = Math.max(...stats.streakDistribution.map((s) => s.count), 1);
  const maxDailySignup = Math.max(...stats.dailySignups.map((d) => d.count), 1);
  const maxDailyCompletion = Math.max(...stats.dailyCompletions.map((d) => d.count), 1);
  const maxDailyBar = Math.max(maxDailySignup, maxDailyCompletion, 1);

  const xpTotal =
    stats.xpDistribution.level1 +
    stats.xpDistribution.level2 +
    stats.xpDistribution.level3 +
    stats.xpDistribution.level4 +
    stats.xpDistribution.level5 || 1;

  const maxLessonCompletion = Math.max(...stats.topLessons.map((l) => l.completionCount), 1);

  return (
    <div
      className="min-h-screen pb-16"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "inherit" }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border-color)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
        className="px-6 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black">Admin Portal</h1>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(88,204,2,0.15)", border: "1px solid rgba(88,204,2,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-[#58cc02] animate-pulse inline-block" />
              <span className="text-xs font-black" style={{ color: "#58cc02" }}>LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-opacity disabled:opacity-50"
              style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6 space-y-6">

        {/* ── Row 1: 4 stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Users size={20} style={{ color: "#1cb0f6" }} />}
            label="Total Users"
            value={stats.totalUsers}
            color="#1cb0f6"
          />
          <StatCard
            icon={<Activity size={20} style={{ color: "#58cc02" }} />}
            label="Active Today"
            value={stats.activeToday}
            color="#58cc02"
            sub={`of ${stats.totalUsers} total`}
          />
          <StatCard
            icon={<TrendingUp size={20} style={{ color: "#ff9600" }} />}
            label="New This Week"
            value={stats.newUsersThisWeek}
            color="#ff9600"
            sub={`${stats.newUsersToday} today`}
          />
          <StatCard
            icon={<BookOpen size={20} style={{ color: "#a855f7" }} />}
            label="Lessons Completed"
            value={stats.totalLessonsCompleted}
            color="#a855f7"
          />
        </div>

        {/* ── Row 2: 4 stat cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Zap size={20} style={{ color: "#ffc800" }} />}
            label="Avg XP / User"
            value={stats.avgXP}
            color="#ffc800"
          />
          <StatCard
            icon={<Flame size={20} style={{ color: "#ff9600" }} />}
            label="Avg Streak"
            value={`${stats.avgStreak}d`}
            color="#ff9600"
          />
          <StatCard
            icon={<Trophy size={20} style={{ color: "#ffc800" }} />}
            label="Max Streak Ever"
            value={`${stats.maxStreak}d`}
            color="#ffc800"
          />
          <StatCard
            icon={<Lock size={20} style={{ color: "#58cc02" }} />}
            label="7+ Day Streaks"
            value={stats.usersWithStreakOver7}
            color="#58cc02"
            sub="Loss aversion locked in 🔒"
          />
        </div>

        {/* ── Streak Distribution ── */}
        <Section title="Streak Distribution">
          <div className="space-y-3">
            {stats.streakDistribution.map((item) => {
              const pct = stats.totalUsers > 0 ? Math.round((item.count / stats.totalUsers) * 100) : 0;
              const barWidth = maxStreakCount > 0 ? Math.round((item.count / maxStreakCount) * 100) : 0;
              const color = item.range === "0" ? "#6b7280"
                : item.range === "1-3" ? "#ff9600"
                : item.range === "4-6" ? "#ffc800"
                : item.range === "7-14" ? "#58cc02"
                : item.range === "15-30" ? "#1cb0f6"
                : "#a855f7";
              return (
                <div key={item.range} className="flex items-center gap-3">
                  <div className="w-14 text-right text-xs font-black" style={{ color: "var(--text-secondary)" }}>
                    {item.range === "0" ? "0 days" : `${item.range}d`}
                  </div>
                  <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
                    <div
                      className="h-full rounded-lg flex items-center px-2 transition-all duration-500"
                      style={{ width: `${barWidth}%`, background: color, minWidth: item.count > 0 ? "2rem" : "0" }}
                    >
                      {item.count > 0 && (
                        <span className="text-white text-xs font-black whitespace-nowrap">
                          {item.count}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-10 text-xs font-bold" style={{ color: "var(--text-secondary)" }}>
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Daily Activity ── */}
        <Section title="Daily Activity (Last 14 Days)">
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {stats.dailySignups.map((day, i) => {
              const comp = stats.dailyCompletions[i];
              const signupH = Math.round((day.count / maxDailyBar) * 96);
              const compH = comp ? Math.round((comp.count / maxDailyBar) * 96) : 0;
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-0.5" style={{ minWidth: 0 }}>
                  <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: 96 }}>
                    <div
                      className="rounded-t flex-1 transition-all duration-500"
                      style={{
                        height: signupH || 2,
                        background: "#1cb0f6",
                        opacity: 0.85,
                        minHeight: 2,
                        maxWidth: 12,
                      }}
                      title={`Signups: ${day.count}`}
                    />
                    <div
                      className="rounded-t flex-1 transition-all duration-500"
                      style={{
                        height: compH || 2,
                        background: "#58cc02",
                        opacity: 0.85,
                        minHeight: 2,
                        maxWidth: 12,
                      }}
                      title={`Completions: ${comp?.count ?? 0}`}
                    />
                  </div>
                  <div className="text-[8px] font-bold text-center" style={{ color: "var(--text-secondary)", fontSize: "7px" }}>
                    {shortDate(day.date)}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "#1cb0f6" }} />
              <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Signups</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: "#58cc02" }} />
              <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Completions</span>
            </div>
          </div>
        </Section>

        {/* ── Top 5 Lessons ── */}
        <Section title="Top 5 Lessons by Completions">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="text-left py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Rank</th>
                  <th className="text-left py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Lesson</th>
                  <th className="text-right py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Completions</th>
                  <th className="text-right py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>% of Users</th>
                </tr>
              </thead>
              <tbody>
                {stats.topLessons.map((lesson, i) => {
                  const pct = stats.totalUsers > 0 ? Math.round((lesson.completionCount / stats.totalUsers) * 100) : 0;
                  const rowColor = pct < 30 ? "rgba(255,75,75,0.08)" : pct < 60 ? "rgba(255,150,0,0.08)" : "rgba(88,204,2,0.08)";
                  const textColor = pct < 30 ? "#ff4b4b" : pct < 60 ? "#ff9600" : "#58cc02";
                  const barWidth = maxLessonCompletion > 0 ? Math.round((lesson.completionCount / maxLessonCompletion) * 100) : 0;
                  return (
                    <tr key={i} style={{ background: rowColor, borderBottom: "1px solid var(--border-color)" }}>
                      <td className="py-2.5 px-3 font-black text-sm" style={{ color: "var(--text-secondary)" }}>#{i + 1}</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-xs mb-1">{lesson.title}</div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-secondary)", width: "80%" }}>
                          <div className="h-full rounded-full" style={{ width: `${barWidth}%`, background: textColor }} />
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-black tabular-nums">{lesson.completionCount}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ color: textColor, background: `${textColor}20` }}>
                          {pct}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Lesson Funnel ── */}
        <Section title="Lesson Funnel (Drop-off Analysis)">
          <div className="space-y-2">
            {stats.lessonFunnel.map((lesson, i) => {
              const color = lesson.completionPct < 20 ? "#ff4b4b"
                : lesson.completionPct < 40 ? "#ff9600"
                : lesson.completionPct < 70 ? "#ffc800"
                : "#58cc02";
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-[10px] font-black w-6 text-center shrink-0" style={{ color: "var(--text-secondary)" }}>
                    {lesson.dayNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold mb-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                      {lesson.title}
                    </div>
                    <div className="h-4 rounded-lg overflow-hidden flex items-center" style={{ background: "var(--bg-secondary)" }}>
                      <div
                        className="h-full rounded-lg flex items-center px-1.5 transition-all duration-500"
                        style={{
                          width: `${lesson.completionPct}%`,
                          background: color,
                          minWidth: lesson.completionPct > 0 ? "2rem" : "0",
                        }}
                      >
                        {lesson.completionPct > 5 && (
                          <span className="text-white text-[9px] font-black whitespace-nowrap">{lesson.completionPct}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-black w-8 text-right shrink-0" style={{ color }}>
                    {lesson.completedCount}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* ── Recent Users ── */}
        <Section title="Recent Users (Last 10)">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <th className="text-left py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Name</th>
                  <th className="text-left py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Email</th>
                  <th className="text-right py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>XP</th>
                  <th className="text-right py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Streak</th>
                  <th className="text-right py-2 px-3 text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers.map((u, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td className="py-2.5 px-3 font-bold text-xs">{u.name}</td>
                    <td className="py-2.5 px-3 text-xs" style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                    <td className="py-2.5 px-3 text-right font-black text-xs tabular-nums" style={{ color: "#ffc800" }}>{u.xp}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="font-black text-xs tabular-nums" style={{ color: u.streakCount > 0 ? "#ff9600" : "var(--text-secondary)" }}>
                        {u.streakCount > 0 ? `🔥 ${u.streakCount}` : "—"}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-xs" style={{ color: "var(--text-secondary)" }}>
                      {formatDate(u.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── XP Distribution ── */}
        <Section title="XP Distribution">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Beginner", range: "0–99 XP", count: stats.xpDistribution.level1, color: "#6b7280" },
              { label: "Learner", range: "100–299 XP", count: stats.xpDistribution.level2, color: "#1cb0f6" },
              { label: "Practitioner", range: "300–599 XP", count: stats.xpDistribution.level3, color: "#58cc02" },
              { label: "Expert", range: "600–999 XP", count: stats.xpDistribution.level4, color: "#ff9600" },
              { label: "Master", range: "1000+ XP", count: stats.xpDistribution.level5, color: "#ffc800" },
            ].map((tier) => {
              const pct = Math.round((tier.count / xpTotal) * 100);
              return (
                <div
                  key={tier.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}
                >
                  <div className="text-2xl font-black tabular-nums" style={{ color: tier.color }}>{tier.count}</div>
                  <div className="text-xs font-black mt-1" style={{ color: tier.color }}>{tier.label}</div>
                  <div className="text-[10px] font-bold mt-0.5" style={{ color: "var(--text-secondary)" }}>{tier.range}</div>
                  <div className="text-[10px] font-black mt-1.5 px-2 py-0.5 rounded-full inline-block" style={{ background: `${tier.color}25`, color: tier.color }}>
                    {pct}%
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  sub?: string;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          {icon}
        </div>
        <span className="text-xs font-black uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>
          {label}
        </span>
      </div>
      <div className="text-3xl font-black tabular-nums" style={{ color }}>
        {value}
      </div>
      {sub && (
        <div className="text-[10px] font-bold mt-1" style={{ color: "var(--text-secondary)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)" }}
    >
      <h2 className="text-sm font-black uppercase tracking-wide mb-4" style={{ color: "var(--text-secondary)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
