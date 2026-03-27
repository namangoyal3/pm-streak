"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { Trophy, Medal, Flame, Crown, ChevronDown, ChevronUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  xp: number;
  level: number;
  streakCount: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [type, setType] = useState<"alltime" | "weekly">("alltime");
  const [loading, setLoading] = useState(true);
  const [showAllRowsMobile, setShowAllRowsMobile] = useState(false);

  useEffect(() => {
    async function load() {
      const userRes = await fetch("/api/auth/me");
      if (!userRes.ok) {
        router.push("/login");
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);
    }
    load();
  }, [router]);

  useEffect(() => {
    async function loadBoard() {
      setLoading(true);
      const res = await fetch(`/api/leaderboard?type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data.leaderboard);
      }
      setLoading(false);
    }
    loadBoard();
  }, [type]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={20} className="text-[var(--gold-primary)]" />;
    if (rank === 2) return <Medal size={20} className="text-gray-300" />;
    if (rank === 3) return <Medal size={20} className="text-amber-600" />;
    return <span className="text-sm font-bold text-[var(--text-secondary)] w-5 text-center">{rank}</span>;
  };

  const visibleRows =
    showAllRowsMobile || leaderboard.length <= 10 ? leaderboard : leaderboard.slice(0, 10);

  return (
    <div className="min-h-screen">
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} />

      <main className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-8 py-6 pb-28 space-y-6">
        <div className="text-center">
          <Trophy size={40} className="mx-auto text-[var(--gold-primary)] mb-2" />
          <h1 className="text-xl font-bold">Leaderboard</h1>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 bg-[var(--bg-card)] rounded-2xl p-1">
          {(["alltime", "weekly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "flex-1 py-2 rounded-xl text-sm font-bold transition-colors",
                type === t
                  ? "bg-[var(--green-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-white"
              )}
            >
              {t === "alltime" ? "All Time" : "This Week"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8 text-[var(--text-secondary)]">Loading...</div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[var(--text-secondary)]">No data yet. Complete lessons to appear!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleRows.map((entry) => (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-2xl transition-colors",
                  entry.isCurrentUser
                    ? "bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/30"
                    : "bg-[var(--bg-card)]"
                )}
              >
                <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--blue-primary)] to-[var(--purple-primary)] flex items-center justify-center text-sm font-bold">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">
                    {entry.name} {entry.isCurrentUser && "(you)"}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Level {entry.level}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Flame size={14} className="text-[var(--orange-primary)]" />
                    <span>{entry.streakCount}</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--gold-primary)]">{entry.xp} XP</div>
                </div>
              </div>
            ))}
            {leaderboard.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllRowsMobile((prev) => !prev)}
                className="md:hidden w-full mt-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2.5 flex items-center justify-between"
              >
                <span className="text-xs font-black">
                  {showAllRowsMobile ? "Show fewer rows" : `Show all ${leaderboard.length} rows`}
                </span>
                <span className="text-[var(--text-secondary)]">
                  {showAllRowsMobile ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </span>
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
