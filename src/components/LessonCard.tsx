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
  index: number;
}

export default function LessonCard({
  id,
  title,
  description,
  difficulty,
  xpReward,
  completed,
  locked,
  index,
}: LessonCardProps) {
  const palette = [
    { from: "#58cc02", to: "#46a302", shadow: "rgba(88,204,2,0.3)" },
    { from: "#1cb0f6", to: "#1899d6", shadow: "rgba(28,176,246,0.3)" },
    { from: "#ff9600", to: "#e08600", shadow: "rgba(255,150,0,0.3)" },
    { from: "#ce82ff", to: "#b060e0", shadow: "rgba(206,130,255,0.3)" },
    { from: "#ff4b4b", to: "#ea2b2b", shadow: "rgba(255,75,75,0.3)" },
  ];

  const color = palette[index % palette.length];

  if (locked) {
    return (
      <div className="lesson-card bg-[var(--bg-card)] rounded-2xl p-4 opacity-40 cursor-not-allowed border border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0">
            <Lock size={18} className="text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate text-[var(--text-secondary)]">{title}</h3>
            <p className="text-xs text-[var(--text-secondary)]/60 truncate mt-0.5">{description}</p>
          </div>
          <Lock size={16} className="text-gray-600 flex-shrink-0" />
        </div>
      </div>
    );
  }

  return (
    <Link href={`/lesson/${id}`} className="block">
      <div
        className="lesson-card rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: completed
            ? `linear-gradient(135deg, ${color.from}22, ${color.to}11)`
            : `linear-gradient(135deg, ${color.from}, ${color.to})`,
          border: completed ? `2px solid ${color.from}44` : "none",
          boxShadow: completed ? "none" : `0 4px 14px ${color.shadow}`,
        }}
      >
        {/* Completed watermark */}
        {completed && (
          <div className="absolute right-3 top-3">
            <CheckCircle2 size={20} style={{ color: color.from }} />
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Icon circle */}
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: completed ? `${color.from}22` : "rgba(255,255,255,0.2)",
            }}
          >
            {completed ? (
              <Star size={20} style={{ color: color.from }} fill={color.from} />
            ) : (
              <PlayCircle size={22} className="text-white" />
            )}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pr-2">
            <h3
              className={cn("font-bold text-sm leading-tight mb-0.5", completed ? "text-white/60" : "text-white")}
              style={completed ? { color: color.from } : {}}
            >
              {title}
            </h3>
            <p
              className="text-xs truncate"
              style={{ color: completed ? `${color.from}99` : "rgba(255,255,255,0.75)" }}
            >
              {description}
            </p>
          </div>

          {/* XP badge */}
          <div
            className="flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl flex-shrink-0"
            style={{
              background: completed ? `${color.from}22` : "rgba(255,255,255,0.2)",
              color: completed ? color.from : "white",
            }}
          >
            <Zap size={11} />
            {xpReward}
          </div>
        </div>

        {/* Difficulty + status bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1 flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{
                  background: i < difficulty
                    ? (completed ? `${color.from}66` : "rgba(255,255,255,0.7)")
                    : (completed ? `${color.from}22` : "rgba(255,255,255,0.2)"),
                }}
              />
            ))}
          </div>
          {completed && (
            <span
              className="text-[10px] font-bold uppercase tracking-wide"
              style={{ color: color.from }}
            >
              Done ✓
            </span>
          )}
          {!completed && (
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/60">
              {difficulty === 1 ? "Beginner" : difficulty === 2 ? "Intermediate" : "Advanced"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
