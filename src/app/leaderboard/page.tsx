"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
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
        <div role="status" className="animate-pulse text-[var(--green-primary)] text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <><Crown size={20} aria-hidden className="text-[var(--gold-primary)]" /><span className="sr-only">Rank 1</span></>;
    if (rank === 2) return <><Medal size={20} aria-hidden className="text-gray-300" /><span className="sr-only">Rank 2</span></>;
    if (rank === 3) return <><Medal size={20} aria-hidden className="text-amber-600" /><span className="sr-only">Rank 3</span></>;
    return <span className="text-sm font-bold text-[var(--text-secondary)] w-5 text-center">{rank}</span>;
  };

  const visibleRows =
    showAllRowsMobile || leaderboard.length <= 10 ? leaderboard : leaderboard.slice(0, 10);

  return (
    <div className="min-h-screen">
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} credits={user.credits} avatarUrl={user.avatarUrl} name={user.name} plan={user.plan} />

      <main className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-8 py-6 pb-28 space-y-6">
        <div className="text-center">
          <Trophy size={40} className="mx-auto text-[var(--gold-primary)] mb-2" />
          <h1 className="text-2xl font-black tracking-tight">Leaderboard</h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Earn XP from lessons to climb the ranks
          </p>
        </div>

        {/* Toggle */}
        <ToggleGroup.Root
          type="single"
          value={type}
          onValueChange={(v) => { if (v) setType(v as "alltime" | "weekly"); }}
          aria-label="Leaderboard period"
          className="flex gap-1 bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-color)] p-1"
        >
          {(["alltime", "weekly"] as const).map((t) => (
            <ToggleGroup.Item
              key={t}
              value={t}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-colors",
                type === t
                  ? "bg-[var(--green-primary)] text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              )}
            >
              {t === "alltime" ? "All Time" : "This Week"}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>

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
                  "flex items-center gap-3 p-3 rounded-2xl border-2 transition-colors",
                  entry.isCurrentUser
                    ? "bg-[var(--green-primary)]/10 border-[var(--green-primary)]/40"
                    : entry.rank <= 3
                      ? "bg-[var(--bg-card)] border-[var(--gold-primary)]/25"
                      : "bg-[var(--bg-card)] border-[var(--border-color)]"
                )}
              >
                <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>
                <div className="w-9 h-9 rounded-xl bg-[var(--green-primary)] flex items-center justify-center text-sm font-black text-black">
                  {entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">
                    {entry.name}{" "}
                    {entry.isCurrentUser && (
                      <span className="text-[var(--green-primary)] font-black">(you)</span>
                    )}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                    Level {entry.level}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm font-bold tabular-nums">
                    <Flame size={14} className="text-[var(--orange-primary)]" />
                    <span>{entry.streakCount}</span>
                  </div>
                  <div className="text-sm font-black tabular-nums text-[var(--gold-primary)]">
                    {entry.xp} XP
                  </div>
                </div>
              </div>
            ))}
            {leaderboard.length > 10 && (
              <button
                type="button"
                onClick={() => setShowAllRowsMobile((prev) => !prev)}
                className="md:hidden w-full mt-2 rounded-xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2.5 flex items-center justify-between active:border-b-2 active:translate-y-[2px] transition-all"
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
