import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const APP_TIMEZONE = process.env.NEXT_PUBLIC_APP_TIMEZONE || "Asia/Kolkata";

function getDatePartsInAppTimezone(date: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = Number(parts.find((p) => p.type === "year")?.value ?? "0");
  const month = Number(parts.find((p) => p.type === "month")?.value ?? "0");
  const day = Number(parts.find((p) => p.type === "day")?.value ?? "0");
  return { year, month, day };
}

function toDateKey(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getToday(): string {
  const now = new Date();
  const { year, month, day } = getDatePartsInAppTimezone(now);
  return toDateKey(year, month, day);
}

export function getYesterday(): string {
  const now = new Date();
  const { year, month, day } = getDatePartsInAppTimezone(now);
  const appMidnightUtc = new Date(Date.UTC(year, month - 1, day));
  appMidnightUtc.setUTCDate(appMidnightUtc.getUTCDate() - 1);
  return toDateKey(
    appMidnightUtc.getUTCFullYear(),
    appMidnightUtc.getUTCMonth() + 1,
    appMidnightUtc.getUTCDate()
  );
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPForNextLevel(level: number): number {
  return level * 100;
}

export function getXPProgress(xp: number): { current: number; needed: number; percent: number } {
  const level = getLevelFromXP(xp);
  const xpForCurrentLevel = (level - 1) * 100;
  const current = xp - xpForCurrentLevel;
  const needed = 100;
  return { current, needed, percent: Math.min((current / needed) * 100, 100) };
}
