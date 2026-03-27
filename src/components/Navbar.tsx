"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProBanner from "./ProBanner";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import { Flame, BookOpen, Trophy, Users, Calendar, Sparkles, Gem, Lock, Zap } from "lucide-react";

interface NavbarProps {
  streakCount: number;
  xp: number;
  gems: number;
  credits?: number;
  avatarUrl?: string | null;
  name?: string;
  plan?: string;
  unreadNotifications?: number;
}

export default function Navbar({ streakCount, xp, gems, credits, avatarUrl, name, plan, unreadNotifications: propUnread }: NavbarProps) {
  const pathname = usePathname();
  const [unreadNotifications, setUnreadNotifications] = useState(propUnread ?? 0);

  // Keep in sync with prop (dashboard passes it directly)
  useEffect(() => {
    if (propUnread !== undefined) setUnreadNotifications(propUnread);
  }, [propUnread]);

  // On pages that don't pass the prop, fetch it ourselves
  useEffect(() => {
    if (propUnread !== undefined) return; // already provided by parent
    if (pathname === "/social") {
      setUnreadNotifications(0);
      return;
    }
    fetch("/api/notifications")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data) setUnreadNotifications(data.unreadCount ?? 0); })
      .catch(() => {});
  }, [pathname, propUnread]);

  const navItems = [
    { href: "/dashboard", label: "Learn", icon: BookOpen, locked: false },
    { href: "/explore", label: "Explore", icon: Sparkles, locked: false },
    { href: "/social", label: "Social", icon: Users, locked: false },
    { href: "/leaderboard", label: "Ranks", icon: Trophy, locked: false },
  ];

  return (
    <>
      <ProBanner plan={plan} />
      {/* Top header bar */}
      <header className={ds.headerShell}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 h-14 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-1.5 min-w-0">
            <Flame size={20} className="text-[var(--orange-primary)] streak-flame shrink-0" />
            <div className="flex flex-col leading-none">
              <div className="font-black text-lg sm:text-xl tracking-tight flex items-center gap-1">
                <span className="text-[var(--green-primary)]">PM</span>
                <span className="text-white">Streak</span>
              </div>
              <span className="hidden sm:inline text-[9px] font-bold text-[var(--text-secondary)] tracking-wide">by learnanything.pro</span>
            </div>
          </Link>

          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2 group shrink-0">
              <div className="relative">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={name ?? "User"}
                    width={26}
                    height={26}
                    unoptimized
                    className="h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full object-cover transition-all border border-[var(--border-color)]"
                  />
                ) : (
                  <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black text-white bg-[var(--green-primary)]">
                    {name?.charAt(0).toUpperCase() || "P"}
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <span className="text-xs font-black text-white group-hover:text-[var(--green-primary)] transition-colors">
                  {name?.split(" ")[0] || "Learner"}
                </span>
              </div>
            </Link>

            {/* Streak */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Flame
                size={16}
                className={cn(
                  "streak-flame",
                  streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-500"
                )}
              />
              <span className={cn(
                "font-black text-xs sm:text-sm tabular-nums",
                streakCount > 0 ? "text-[var(--orange-primary)]" : "text-gray-500"
              )}>
                {streakCount}
              </span>
            </div>

            {/* Gems */}
            <div className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
              <Gem size={16} className="text-[var(--blue-primary)]" />
              <span className="font-black text-sm tabular-nums text-[var(--blue-primary)]">{gems}</span>
            </div>

            {/* Credits */}
            {credits !== undefined && (
              <Link href="/pricing" className="hidden lg:flex items-center gap-1.5 bg-purple-500/10 px-3 py-1 rounded-full flex-shrink-0 hover:bg-purple-500/20 transition-colors border border-purple-500/20">
                <span className="font-black text-xs tabular-nums text-purple-400">
                  {credits} {plan === "pro" ? "Credits" : "Free Credits"}
                </span>
              </Link>
            )}

            {/* XP */}
            <div className="flex items-center gap-1 bg-[var(--gold-primary)]/10 px-2 py-1 rounded-full flex-shrink-0">
              <Zap size={13} className="text-[var(--gold-primary)]" />
              <span className="font-black text-xs tabular-nums text-[var(--gold-primary)]">{xp}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation - fixed */}
      <nav className={ds.bottomNav}>
        <div className="max-w-5xl mx-auto px-2 flex h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            if (item.locked) {
              return (
                <div
                  key={item.href}
                  className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[var(--border-color)] cursor-not-allowed relative"
                >
                  <div className="relative w-10 h-8 flex items-center justify-center rounded-xl">
                    <Icon size={22} strokeWidth={2} />
                    <div className="absolute top-0 right-0.5 bg-[var(--bg-secondary)] rounded-full p-0.5">
                      <Lock size={8} className="text-[var(--border-color)]" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold">{item.label}</span>
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
    </>
  );
}
