"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Flame, BookOpen, Trophy, Users, Calendar, Sparkles, Gem, Lock, Zap } from "lucide-react";

interface NavbarProps {
  streakCount: number;
  xp: number;
  gems: number;
  avatarUrl?: string | null;
  name?: string;
  unreadNotifications?: number;
}

export default function Navbar({ streakCount, xp, gems, avatarUrl, name, unreadNotifications = 0 }: NavbarProps) {
  const pathname = usePathname();
  const unlocked = streakCount >= 7;

  const navItems = [
    { href: "/dashboard", label: "Learn", icon: BookOpen, locked: false },
    { href: "/daily-challenge", label: "Daily", icon: Calendar, locked: false },
    { href: "/explore", label: "Explore", icon: Sparkles, locked: false },
    { href: "/leaderboard", label: "Ranks", icon: Trophy, locked: !unlocked },
    { href: "/social", label: "Social", icon: Users, locked: !unlocked },
  ];

  return (
    <>
      {/* Top header bar */}
      <header className="sticky top-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <Flame size={22} className="text-[var(--orange-primary)] streak-flame" />
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </Link>

          {/* Stats row */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {avatarUrl ? (
              <img src={avatarUrl} alt={name ?? "User"} className="w-7 h-7 rounded-full object-cover border border-[var(--border-color)]" />
            ) : name ? (
              <div className="w-7 h-7 rounded-full bg-[var(--green-primary)] flex items-center justify-center text-xs font-black text-white">
                {name.charAt(0).toUpperCase()}
              </div>
            ) : null}
            {/* Streak */}
            <div className="flex items-center gap-1">
              <Flame
                size={20}
                className={cn(
                  "streak-flame",
                  streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-500"
                )}
              />
              <span className={cn(
                "font-black text-base tabular-nums",
                streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-500"
              )}>
                {streakCount}
              </span>
            </div>

            {/* Gems */}
            <div className="flex items-center gap-1">
              <Gem size={18} className="text-[var(--blue-primary)]" />
              <span className="font-black text-base tabular-nums text-[var(--blue-primary)]">{gems}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1 bg-[var(--gold-primary)]/10 px-2.5 py-1 rounded-full">
              <Zap size={14} className="text-[var(--gold-primary)]" />
              <span className="font-black text-sm tabular-nums text-[var(--gold-primary)]">{xp}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation - fixed, Duolingo-style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] safe-area-pb">
        <div className="max-w-5xl mx-auto px-2 flex h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            if (item.locked) {
              return (
                <div
                  key={item.href}
                  className="flex-1 flex flex-col items-center justify-center text-[var(--border-color)] cursor-not-allowed relative"
                >
                  <div className="relative mb-0.5">
                    <Icon size={20} />
                    <div className="absolute -top-1 -right-1.5 bg-[var(--bg-secondary)] rounded-full">
                      <Lock size={8} className="text-[var(--border-color)]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold leading-tight">{item.label}</span>
                  <span className="text-[9px] text-[var(--orange-primary)]/70 font-bold leading-tight">7-day streak</span>
                </div>
              );
            }
            const showBadge = item.href === "/social" && unreadNotifications > 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center gap-0.5 transition-all duration-150",
                  active
                    ? "text-[var(--green-primary)]"
                    : "text-[var(--text-secondary)] hover:text-white"
                )}
              >
                <div className={cn(
                  "relative w-10 h-8 flex items-center justify-center rounded-xl transition-all duration-150",
                  active ? "bg-[var(--green-primary)]/15" : ""
                )}>
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  {showBadge && (
                    <span className="absolute top-0 right-0.5 min-w-[16px] h-4 bg-red-500 rounded-full text-[10px] font-black text-white flex items-center justify-center px-1 leading-none">
                      {unreadNotifications > 9 ? "9+" : unreadNotifications}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] font-bold",
                  active ? "text-[var(--green-primary)]" : ""
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer below sticky header so content doesn't start under it */}
    </>
  );
}
