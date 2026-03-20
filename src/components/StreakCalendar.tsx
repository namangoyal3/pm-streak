"use client";

import { cn } from "@/lib/utils";
import { Flame, Snowflake } from "lucide-react";

interface CalendarDay {
  date: string;
  completed: boolean;
  frozen: boolean;
}

export default function StreakCalendar({ calendar }: { calendar: CalendarDay[] }) {
  const today = new Date().toISOString().split("T")[0];
  const completedCount = calendar.filter((d) => d.completed).length;

  return (
    <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-color)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-black text-white uppercase tracking-widest">
          Activity
        </h3>
        <span className="text-xs font-bold text-[var(--green-primary)]">
          {completedCount} <span className="text-[var(--text-secondary)] font-normal">days active</span>
        </span>
      </div>
      <div className="grid grid-cols-10 gap-1.5">
        {calendar.map((day) => {
          const isToday = day.date === today;
          return (
            <div
              key={day.date}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center text-xs relative transition-all",
                isToday && "ring-2 ring-[var(--green-primary)] ring-offset-1 ring-offset-[var(--bg-card)]",
                day.completed
                  ? "bg-[var(--green-primary)] shadow-sm shadow-[var(--green-primary)]/40"
                  : day.frozen
                  ? "bg-[var(--blue-primary)]/20 border border-[var(--blue-primary)]/30"
                  : "bg-[var(--bg-secondary)]"
              )}
              title={`${day.date}${day.completed ? " ✓" : day.frozen ? " ❄" : ""}`}
            >
              {day.completed && <Flame size={10} className="text-white" />}
              {day.frozen && <Snowflake size={10} className="text-[var(--blue-primary)]" />}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-3 text-[10px] text-[var(--text-secondary)]">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--green-primary)]" />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--blue-primary)]/20 border border-[var(--blue-primary)]/30" />
          <span>Frozen</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-[var(--bg-secondary)]" />
          <span>Missed</span>
        </div>
      </div>
    </div>
  );
}
