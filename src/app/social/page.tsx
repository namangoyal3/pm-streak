"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ShareCard from "@/components/ShareCard";
import { cn } from "@/lib/utils";
import {
  Users,
  Search,
  UserPlus,
  Share2,
  UserCheck,
  Swords,
  Flame,
  Zap,
  Clock,
  Check,
  X,
  Send,
} from "lucide-react";

interface FriendUser {
  id: string;
  name: string;
  xp: number;
  level: number;
  streakCount: number;
  isFollowing?: boolean;
}

interface Activity {
  id: string;
  userName: string;
  lessonTitle: string;
  xpEarned: number;
  completedAt: string;
}

export default function SocialPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState<"friends" | "find" | "challenges">("friends");
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [activity, setActivity] = useState<Activity[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FriendUser[]>([]);
  const [challenges, setChallenges] = useState<{ received: any[]; sent: any[] }>({
    received: [],
    sent: [],
  });
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    async function load() {
      const userRes = await fetch("/api/auth/me");
      if (!userRes.ok) {
        router.push("/login");
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      const [feedRes, challengeRes] = await Promise.all([
        fetch("/api/social/feed"),
        fetch("/api/social/challenges"),
      ]);

      if (feedRes.ok) {
        const feedData = await feedRes.json();
        setFriends(feedData.friends);
        setActivity(feedData.recentActivity);
        setFollowerCount(feedData.followerCount);
        setFollowingCount(feedData.followingCount);
      }
      if (challengeRes.ok) {
        const challengeData = await challengeRes.json();
        setChallenges(challengeData);
      }
      setLoading(false);
    }
    load();
  }, [router]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`/api/social/search?q=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      setSearchResults(data.users);
    }
  };

  const handleFollow = async (targetId: string) => {
    const res = await fetch("/api/social/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetId }),
    });
    if (res.ok) {
      const data = await res.json();
      setSearchResults((prev) =>
        prev.map((u) => (u.id === targetId ? { ...u, isFollowing: data.following } : u))
      );
      // Refresh feed
      const feedRes = await fetch("/api/social/feed");
      if (feedRes.ok) {
        const feedData = await feedRes.json();
        setFriends(feedData.friends);
        setFollowingCount(feedData.followingCount);
      }
    }
  };

  const handleChallenge = async (targetId: string) => {
    await fetch("/api/social/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeeId: targetId }),
    });
    const challengeRes = await fetch("/api/social/challenges");
    if (challengeRes.ok) setChallenges(await challengeRes.json());
  };

  const handleChallengeAction = async (challengeId: string, action: string) => {
    await fetch("/api/social/challenges", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ challengeId, action }),
    });
    const challengeRes = await fetch("/api/social/challenges");
    if (challengeRes.ok) setChallenges(await challengeRes.json());
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} />

      <main className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-6">
        <div className="text-center">
          <Users size={40} className="mx-auto text-[var(--purple-primary)] mb-2" />
          <h1 className="text-xl font-bold">Social</h1>
          <div className="flex justify-center gap-4 mt-2 text-sm text-[var(--text-secondary)]">
            <span><strong className="text-white">{followerCount}</strong> followers</span>
            <span><strong className="text-white">{followingCount}</strong> following</span>
          </div>
        </div>

        {/* Invite Friends CTA */}
        <button
          onClick={() => setShowShare(true)}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[var(--purple-primary)] to-[var(--blue-primary)] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
        >
          <Share2 size={16} /> Invite Friends via Link, Email, or Social
        </button>

        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--bg-card)] rounded-2xl p-1">
          {(["friends", "find", "challenges"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-colors capitalize",
                tab === t
                  ? "bg-[var(--purple-primary)] text-white"
                  : "text-[var(--text-secondary)] hover:text-white"
              )}
            >
              {t === "find" ? "Find Friends" : t}
            </button>
          ))}
        </div>

        {tab === "friends" && (
          <div className="space-y-4">
            {friends.length === 0 ? (
              <div className="text-center py-8">
                <Users size={32} className="mx-auto text-[var(--text-secondary)] mb-2" />
                <p className="text-[var(--text-secondary)] text-sm">
                  No friends yet. Find people to follow!
                </p>
                <button
                  onClick={() => setTab("find")}
                  className="mt-3 px-4 py-2 rounded-full bg-[var(--purple-primary)] text-white text-xs font-bold"
                >
                  Find Friends
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {friends.map((f) => (
                    <div key={f.id} className="bg-[var(--bg-card)] rounded-2xl p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--purple-primary)] to-[var(--blue-primary)] flex items-center justify-center font-bold text-sm">
                        {f.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">{f.name}</div>
                        <div className="text-xs text-[var(--text-secondary)]">Level {f.level}</div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Flame size={12} className="text-[var(--orange-primary)]" /> {f.streakCount}
                        </span>
                        <span className="text-[var(--gold-primary)] font-bold">{f.xp} XP</span>
                      </div>
                      <button
                        onClick={() => handleChallenge(f.id)}
                        className="p-2 rounded-full bg-[var(--orange-primary)]/10 text-[var(--orange-primary)] hover:bg-[var(--orange-primary)]/20"
                        title="Challenge"
                      >
                        <Swords size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {activity.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                      Recent Activity
                    </h3>
                    <div className="space-y-2">
                      {activity.map((a) => (
                        <div key={a.id} className="bg-[var(--bg-card)] rounded-xl p-3 text-xs">
                          <div className="flex items-center justify-between">
                            <span>
                              <strong>{a.userName}</strong> completed{" "}
                              <span className="text-[var(--blue-primary)]">{a.lessonTitle}</span>
                            </span>
                            <span className="text-[var(--text-secondary)] flex items-center gap-1">
                              <Clock size={10} /> {timeAgo(a.completedAt)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-[var(--gold-primary)]">
                            <Zap size={10} /> +{a.xpEarned} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "find" && (
          <div className="space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--purple-primary)] focus:outline-none text-sm"
              />
            </div>

            <div className="space-y-2">
              {searchResults.map((u) => (
                <div key={u.id} className="bg-[var(--bg-card)] rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--blue-primary)] to-[var(--green-primary)] flex items-center justify-center font-bold text-sm">
                    {u.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{u.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      Level {u.level} - {u.xp} XP
                    </div>
                  </div>
                  <button
                    onClick={() => handleFollow(u.id)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors",
                      u.isFollowing
                        ? "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                        : "bg-[var(--purple-primary)] text-white"
                    )}
                  >
                    {u.isFollowing ? (
                      <><UserCheck size={12} /> Following</>
                    ) : (
                      <><UserPlus size={12} /> Follow</>
                    )}
                  </button>
                </div>
              ))}
              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <p className="text-center text-[var(--text-secondary)] text-sm py-4">
                  No users found
                </p>
              )}
            </div>
          </div>
        )}

        {tab === "challenges" && (
          <div className="space-y-4">
            {challenges.received.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                  Received Challenges
                </h3>
                <div className="space-y-2">
                  {challenges.received.map((c: any) => (
                    <div key={c.id} className="bg-[var(--bg-card)] rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Swords size={16} className="text-[var(--orange-primary)]" />
                        <span className="text-sm font-bold">{c.challenger.name}</span>
                        <span className="text-xs text-[var(--text-secondary)]">Level {c.challenger.level}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mb-3">{c.message}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleChallengeAction(c.id, "accept")}
                          className="flex-1 py-2 rounded-xl bg-[var(--green-primary)] text-white text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <Check size={14} /> Accept
                        </button>
                        <button
                          onClick={() => handleChallengeAction(c.id, "decline")}
                          className="flex-1 py-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <X size={14} /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {challenges.sent.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
                  Sent Challenges
                </h3>
                <div className="space-y-2">
                  {challenges.sent.map((c: any) => (
                    <div key={c.id} className="bg-[var(--bg-card)] rounded-xl p-3 flex items-center gap-3">
                      <Send size={14} className="text-[var(--blue-primary)]" />
                      <div className="flex-1">
                        <span className="text-sm">{c.challengee.name}</span>
                      </div>
                      <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        c.status === "pending" ? "bg-[var(--orange-primary)]/10 text-[var(--orange-primary)]" :
                        c.status === "accepted" ? "bg-[var(--green-primary)]/10 text-[var(--green-primary)]" :
                        "bg-[var(--red-primary)]/10 text-[var(--red-primary)]"
                      )}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {challenges.received.length === 0 && challenges.sent.length === 0 && (
              <div className="text-center py-8">
                <Swords size={32} className="mx-auto text-[var(--text-secondary)] mb-2" />
                <p className="text-[var(--text-secondary)] text-sm">
                  No challenges yet. Challenge a friend to compete!
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <ShareCard isOpen={showShare} onClose={() => setShowShare(false)} />
    </div>
  );
}
