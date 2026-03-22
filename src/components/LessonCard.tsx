"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CheckCircle2, Lock, Zap, PlayCircle, Star } from "lucide-react";

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
  const blue = "#1cb0f6";

  if (locked) {
    return (
      <div className="lesson-card bg-[var(--bg-card)] rounded-2xl p-4 cursor-not-allowed border border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0">
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
          className="lesson-card rounded-2xl p-4 relative overflow-hidden border-2"
          style={{
            background: `linear-gradient(135deg, ${green}14, ${green}08)`,
            borderColor: `${green}44`,
            boxShadow: "none",
          }}
        >
          <div className="absolute right-3 top-3">
            <CheckCircle2 size={20} style={{ color: green }} />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${green}22` }}
            >
              <Star size={20} style={{ color: green }} fill={green} />
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-bold text-sm leading-tight mb-0.5" style={{ color: green }}>
                {title}
              </h3>
              <p className="text-xs truncate" style={{ color: `${green}99` }}>
                {description}
              </p>
            </div>
            <div
              className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl flex-shrink-0"
              style={{ background: `${green}18`, color: green }}
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
                    background: i < difficulty ? `${green}66` : `${green}22`,
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: green }}>
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
          "lesson-card rounded-2xl p-4 relative overflow-hidden border-2 transition-all",
          isPrimaryNext
            ? "border-transparent"
            : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]/30"
        )}
        style={
          isPrimaryNext
            ? {
                background: `linear-gradient(135deg, ${green}, #46a302)`,
                boxShadow: "0 4px 14px rgba(88,204,2,0.35)",
              }
            : {
                borderLeftWidth: 4,
                borderLeftColor: blue,
              }
        }
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0",
              isPrimaryNext ? "bg-white/20" : "bg-[var(--bg-secondary)]"
            )}
          >
            <PlayCircle
              size={22}
              className={isPrimaryNext ? "text-white" : ""}
              style={!isPrimaryNext ? { color: blue } : undefined}
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
              <p className="text-[10px] font-bold mt-1 uppercase tracking-wide" style={{ color: blue }}>
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
                      ? `${blue}80`
                      : "var(--bg-secondary)",
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
