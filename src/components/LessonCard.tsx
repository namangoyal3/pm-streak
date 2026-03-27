"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import { CheckCircle2, Lock, Zap, PlayCircle, Star, Sparkles } from "lucide-react";

const PRO_GATE_REASON = "UPGRADE_TO_PRO";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
  lockedReason?: string | null;
  /** First unlocked, incomplete lesson in this track — strong green CTA */
  isNext?: boolean;
}

export default function LessonCard({
  id,
  title,
  description,
  difficulty,
  xpReward,
  completed,
  locked,
  lockedReason,
  isNext = false,
}: LessonCardProps) {
  const green = "var(--green-primary)";
  const accent = "var(--lesson-accent)";

  if (locked) {
    const isProGate = lockedReason === PRO_GATE_REASON;

    if (isProGate) {
      return (
        <Link href="/pricing" className="block">
          <div className="lesson-card border-2 border-purple-500/30 bg-purple-900/10 p-4 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 rounded-[var(--ds-radius-md)] bg-purple-500/15">
                <Sparkles size={18} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate text-white/60">{title}</h3>
                <p className="text-xs text-white/40 truncate mt-0.5">{description}</p>
                <p className="text-[10px] text-purple-400 font-black mt-2">
                  🔒 Pro — Upgrade to unlock all 292+ lessons
                </p>
              </div>
              <span className="text-[10px] font-black px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 flex-shrink-0 whitespace-nowrap">
                PRO
              </span>
            </div>
          </div>
        </Link>
      );
    }

    return (
      <div className="lesson-card cursor-not-allowed border-2 border-[var(--border-color)] bg-[var(--surface-2)] p-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 flex items-center justify-center flex-shrink-0",
              ds.iconBox
            )}
          >
            <Lock size={18} className="text-[var(--text-secondary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate text-[var(--text-primary)]">{title}</h3>
            <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{description}</p>
            <p className="text-[10px] text-[var(--gold-primary)] font-bold mt-2 line-clamp-2">
              {lockedReason ?? "Finish the previous lesson in this category to unlock this one."}
            </p>
          </div>
          <Lock size={16} className="text-[var(--text-secondary)] flex-shrink-0" />
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <Link href={`/lesson/${id}`} className="block">
        <div
          className="lesson-card p-4 relative overflow-hidden border-2"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--green-primary) 14%, transparent), color-mix(in srgb, var(--green-primary) 6%, transparent))",
            borderColor: "color-mix(in srgb, var(--green-primary) 28%, transparent)",
            boxShadow: "none",
          }}
        >
          <div className="absolute right-3 top-3">
            <CheckCircle2 size={20} className="text-[var(--green-primary)]" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-[var(--ds-radius-md)] flex items-center justify-center flex-shrink-0"
              style={{
                background: "color-mix(in srgb, var(--green-primary) 16%, transparent)",
              }}
            >
              <Star size={20} className="text-[var(--green-primary)]" fill="currentColor" />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-bold text-sm leading-tight mb-0.5 text-[var(--green-primary)]">{title}</h3>
              <p className="text-xs truncate text-[var(--green-primary)]/70">{description}</p>
            </div>
            <div
              className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-[var(--ds-radius-md)] flex-shrink-0 bg-[color-mix(in_srgb,var(--green-primary)_10%,transparent)] text-[var(--green-primary)]"
            >
              <Zap size={11} />
              {xpReward}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full"
                  style={{
                    background:
                      i < difficulty
                        ? "color-mix(in srgb, var(--green-primary) 45%, transparent)"
                        : "color-mix(in srgb, var(--green-primary) 12%, transparent)",
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--green-primary)]">
              Done ✓
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const isPrimaryNext = isNext;

  return (
    <Link href={`/lesson/${id}`} className="block">
      <div
        className={cn(
          "lesson-card p-4 relative overflow-hidden border-2 transition-all",
          isPrimaryNext
            ? "border-transparent"
            : "border-[var(--border-color)] bg-[var(--surface-2)] hover:border-[var(--text-secondary)]/30"
        )}
        style={
          isPrimaryNext
            ? {
                background: `linear-gradient(135deg, ${green}, var(--green-dark))`,
                boxShadow: "var(--shadow-ds-float)",
              }
            : {
                borderLeftWidth: 4,
                borderLeftColor: accent,
              }
        }
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-[var(--ds-radius-md)] flex items-center justify-center flex-shrink-0",
              isPrimaryNext ? "bg-white/20" : "bg-[var(--surface-1)]"
            )}
          >
            <PlayCircle
              size={22}
              className={isPrimaryNext ? "text-white" : ""}
              style={!isPrimaryNext ? { color: accent } : undefined}
            />
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h3
              className={cn(
                "font-bold text-sm leading-tight mb-0.5",
                isPrimaryNext ? "text-white" : "text-[var(--text-primary)]"
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "text-xs truncate",
                isPrimaryNext ? "text-white/80" : "text-[var(--text-secondary)]"
              )}
            >
              {description}
            </p>
            {!isPrimaryNext && (
              <p className="text-[10px] font-bold mt-1 uppercase tracking-wide" style={{ color: accent }}>
                Unlocked — tap to start
              </p>
            )}
            {isPrimaryNext && (
              <p className="text-[10px] font-black mt-1 uppercase tracking-wide text-white/90">
                Next up
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl flex-shrink-0",
              isPrimaryNext ? "bg-white/20 text-white" : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
            )}
          >
            <Zap size={11} />
            {xpReward}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1 flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: isPrimaryNext
                    ? i < difficulty
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.2)"
                    : i < difficulty
                      ? "color-mix(in srgb, var(--blue-primary) 55%, transparent)"
                      : "var(--surface-1)",
                }}
              />
            ))}
          </div>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wide",
              isPrimaryNext ? "text-white/80" : "text-[var(--text-secondary)]"
            )}
          >
            {difficulty === 1 ? "Beginner" : difficulty === 2 ? "Intermediate" : "Advanced"}
          </span>
        </div>
      </div>
    </Link>
  );
}
