"use client";

import { getXPProgress, getLevelFromXP } from "@/lib/utils";
import { ds } from "@/lib/ds";
import { Zap } from "lucide-react";

export default function XPProgress({ xp }: { xp: number }) {
  const level = getLevelFromXP(xp);
  const progress = getXPProgress(xp);

  const levelTitles: Record<number, string> = {
    1: "Newcomer",
    2: "Explorer",
    3: "Thinker",
    4: "Strategist",
    5: "Visionary",
    6: "Product Lead",
    7: "PM Expert",
    8: "Principal",
    9: "Director",
    10: "Legend",
  };

  const title = levelTitles[level] ?? "Legend";

  return (
    <div className={ds.panelFlat}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--gold-primary)] to-[#e6a800] flex items-center justify-center font-black text-black text-base shadow-lg shadow-[var(--gold-primary)]/20">
            {level}
          </div>
          <div>
            <div className="font-black text-sm text-white">Level {level}</div>
            <div className="text-[10px] text-[var(--gold-primary)] font-bold uppercase tracking-wider">{title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-[var(--text-secondary)]">
            {progress.current} <span className="text-[var(--gold-primary)]">/ {progress.needed} XP</span>
          </div>
          <div className="text-[10px] text-[var(--text-secondary)]">to level {level + 1}</div>
        </div>
      </div>
      <div className="relative h-3 bg-[var(--surface-1)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full progress-fill relative"
          style={{
            width: `${progress.percent}%`,
            background: "linear-gradient(90deg, var(--gold-primary), #ffdb4d)",
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1.5">
        <Zap size={10} className="text-[var(--gold-primary)]" />
        <span className="text-[10px] text-[var(--text-secondary)]">
          {progress.needed - progress.current} XP until level {level + 1}
        </span>
      </div>
    </div>
  );
}
