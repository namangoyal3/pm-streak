"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Globe,
  ExternalLink,
  Briefcase,
  Zap,
  Lock,
  Sparkles,
  CalendarDays,
  ClipboardPaste,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { previewJobs } from "@/lib/jobs-preview";
import Navbar from "@/components/Navbar";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string | null;
  remote: boolean;
  applyUrl: string;
  description: string | null;
  tags: string[];
  source: string;
  postedAt: string | null;
  scrapedAt: string;
}

type PlanPreview = {
  learningPlan: {
    id: string;
    planConfig: { days?: number; sessionsPerWeek?: number } | null;
    planLessons: Array<{ dayIndex: number; lessonType: string; skillTags: unknown }>;
  } | null;
  reused?: boolean;
};

export default function JobsPage() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [tab, setTab] = useState<"browse" | "paste">("browse");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [jdText, setJdText] = useState("");
  const [targetMode, setTargetMode] = useState<"15" | "30" | "60" | "custom">("30");
  const [customDate, setCustomDate] = useState("");
  const [creatingPlan, setCreatingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planPreview, setPlanPreview] = useState<PlanPreview["learningPlan"]>(null);
  const [createdTargetId, setCreatedTargetId] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMobileUpgrade, setShowMobileUpgrade] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => {
        if (!r.ok) {
          window.location.href = "/login";
          return;
        }
        return r.json();
      })
      .then(data => { if (data) setUser(data.user); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (remoteOnly) params.set("remote", "true");
    fetch(`/api/jobs?${params}`)
      .then((r) => r.json())
      .then((data) => setJobs(data.jobs ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, remoteOnly]);

  function resolveTargetDate() {
    if (targetMode === "custom") return customDate;
    const days = Number(targetMode);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0] ?? "";
  }

  async function handleGeneratePlan() {
    setPlanError(null);
    setCreatingPlan(true);
    try {
      const targetDate = resolveTargetDate();
      if (!targetDate) {
        setPlanError("Please choose a valid target date.");
        return;
      }
      if (tab === "browse" && !selectedJobId) {
        setPlanError("Select a role from Browse Roles first.");
        return;
      }
      if (tab === "paste" && jdText.trim().length < 120) {
        setPlanError("Paste a fuller JD (at least ~120 characters).");
        return;
      }

      const targetRes = await fetch("/api/job-targets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: tab === "browse" ? selectedJobId : undefined,
          customJdText: tab === "paste" ? jdText : undefined,
          targetDate,
        }),
      });
      const targetData = await targetRes.json();
      if (!targetRes.ok) {
        setPlanError(targetData.error ?? "Failed to create target");
        return;
      }

      const targetId = targetData.target?.id as string | undefined;
      if (!targetId) {
        setPlanError("Target creation failed unexpectedly.");
        return;
      }
      setCreatedTargetId(targetId);

      const planRes = await fetch("/api/learning-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userJobTargetId: targetId }),
      });
      const planData = (await planRes.json()) as PlanPreview;
      if (!planRes.ok) {
        setPlanError((planData as any).error ?? "Failed to generate plan");
        return;
      }
      setPlanPreview(planData.learningPlan);
    } catch {
      setPlanError("Could not generate your plan right now. Please try again.");
    } finally {
      setCreatingPlan(false);
    }
  }

  function getSkillTags(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((v): v is string => typeof v === "string");
  }

  function lessonTypeLabel(raw: string) {
    return raw
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="min-h-screen bg-[var(--surface-0)] text-white">
      {user && (
        <Navbar 
          streakCount={user.streakCount}
          xp={user.xp}
          gems={user.gems}
          credits={user.credits}
          avatarUrl={user.avatarUrl}
          name={user.name}
          plan={user.plan}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 pb-24">
        {/* Hero */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={20} className="text-[var(--orange-primary)]" />
            <h1 className="text-2xl font-black tracking-tight">PM Jobs</h1>
          </div>
          <p className="text-[var(--text-secondary)] text-sm">Curated Product Manager roles, updated weekly.</p>
        </div>

        <div className="mb-6 rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-4">
          <div className="flex items-center gap-2 text-xs font-black text-[var(--green-primary)] uppercase tracking-widest mb-3">
            <CalendarDays size={14} />
            Build interview plan
          </div>
          <div className="flex gap-1 w-fit bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-1 mb-4">
            <button
              onClick={() => setTab("browse")}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wide rounded-xl transition-colors",
                tab === "browse"
                  ? "bg-[var(--green-primary)] text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              )}
            >
              Browse roles
            </button>
            <button
              onClick={() => setTab("paste")}
              className={cn(
                "px-4 py-2 text-xs font-black uppercase tracking-wide rounded-xl transition-colors",
                tab === "paste"
                  ? "bg-[var(--green-primary)] text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              )}
            >
              <span className="inline-flex items-center gap-1">
                <ClipboardPaste size={12} />
                Paste JD
              </span>
            </button>
          </div>

          {tab === "paste" && (
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste full job description here..."
              className="w-full min-h-40 rounded-xl bg-[var(--surface-1)] border-2 border-[var(--border-color)] px-3 py-3 text-sm text-white placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--blue-primary)]"
            />
          )}

          <div className="mt-4">
            <p className="text-[11px] text-[var(--text-secondary)] font-black mb-2 uppercase tracking-widest">Target timeframe</p>
            <div className="flex flex-wrap gap-1 w-fit bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-1 mb-2">
              {(["15", "30", "60", "custom"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTargetMode(mode)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-black uppercase tracking-wide rounded-xl transition-colors",
                    targetMode === mode
                      ? "bg-[var(--green-primary)] text-black"
                      : "text-[var(--text-secondary)] hover:text-white"
                  )}
                >
                  {mode === "custom" ? "Custom date" : `${mode} days`}
                </button>
              ))}
            </div>
            {targetMode === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="rounded-xl bg-[var(--surface-1)] border-2 border-[var(--border-color)] px-3 py-2 text-sm text-white focus:outline-none focus:border-[var(--green-primary)]"
              />
            )}
          </div>

          {planError && <p className="mt-3 text-xs font-bold text-[var(--red-primary)]">{planError}</p>}

          <button
            onClick={handleGeneratePlan}
            disabled={creatingPlan}
            className="mt-4 w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-black text-sm font-black uppercase tracking-wide disabled:opacity-60 transition-all"
          >
            {creatingPlan ? "Generating plan..." : "Generate my plan"}
          </button>
        </div>

        {/* Mobile filter disclosure */}
        <button
          type="button"
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="sm:hidden w-full mb-3 rounded-xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2.5 flex items-center justify-between active:border-b-2 active:translate-y-[2px] transition-all"
        >
          <span className="text-xs font-black">Search & filters</span>
          <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider">
            {showMobileFilters ? "Hide" : "Show"}
          </span>
        </button>

        {/* Filters */}
        <div className={cn("mb-6 flex gap-3", showMobileFilters ? "flex" : "hidden sm:flex")}>
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--green-primary)]"
            />
          </div>
          <button
            onClick={() => setRemoteOnly((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] text-xs font-black uppercase tracking-wide transition-all",
              remoteOnly
                ? "bg-[var(--green-primary)] border-[var(--green-dark)] text-black"
                : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white"
            )}
          >
            <Globe size={12} /> Remote
          </button>
        </div>

        {/* Job List */}
        {loading ? (
          <div className="text-center py-20 text-[var(--text-secondary)] text-sm">Loading jobs…</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={40} className="text-[var(--text-secondary)]/30 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)] text-sm mb-2">No jobs yet</p>
            <p className="text-[var(--text-secondary)]/60 text-xs">Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {previewJobs(jobs, user?.plan === "pro").map((job) => (
              <div
                key={job.id}
                className={cn(
                  "rounded-2xl border-2 bg-[var(--bg-card)] p-4 transition-all",
                  selectedJobId === job.id
                    ? "border-[var(--green-primary)]/60 shadow-lg shadow-[var(--green-primary)]/10"
                    : "border-[var(--border-color)] hover:border-[var(--text-secondary)]/40"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-black">{job.title}</h3>
                      {job.remote && (
                        <span className="text-[10px] font-black text-[var(--green-primary)] bg-[var(--green-primary)]/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">Remote</span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-bold mb-1">{job.company}</p>
                    {job.location && (
                      <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]/70 mb-2">
                        <MapPin size={10} />
                        {job.location}
                      </div>
                    )}
                    {job.description && (
                      <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{job.description}</p>
                    )}

                    <button
                      onClick={() => {
                        setTab("browse");
                        setSelectedJobId(job.id);
                      }}
                      className={cn(
                        "mt-3 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide px-2.5 py-1.5 rounded-xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] transition-all",
                        selectedJobId === job.id
                          ? "bg-[var(--green-primary)]/15 border-[var(--green-primary)]/50 text-[var(--green-primary)]"
                          : "bg-[var(--surface-1)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white"
                      )}
                    >
                      {selectedJobId === job.id ? <CheckCircle2 size={12} /> : null}
                      {selectedJobId === job.id ? "Selected for plan" : "Use for my plan"}
                    </button>
                  </div>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-black text-xs font-black uppercase tracking-wide px-4 py-2.5 rounded-xl transition-all"
                  >
                    Apply <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}

            {user?.plan !== "pro" && jobs.length > 3 && (
              <div className="pt-2">
                <Link href="/pricing" className="block relative overflow-hidden rounded-2xl border-2 border-[var(--purple-primary)]/40 bg-[var(--bg-card)] p-6 text-center group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Lock size={120} />
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--purple-primary)]/15 flex items-center justify-center mx-auto mb-3 border-2 border-[var(--purple-primary)]/40">
                      <Lock size={20} className="text-[var(--purple-primary)]" />
                    </div>
                    <h3 className="text-base font-black text-white mb-1">
                      {jobs.length - 3} more jobs locked
                    </h3>
                    <p className="text-xs text-[var(--purple-primary)] font-bold mb-6">
                      Unlock the full PM Jobs board with Pro
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[var(--purple-primary)] text-black text-xs font-black px-6 py-3 rounded-xl border-b-4 border-black/30 group-hover:opacity-90 transition-all uppercase tracking-widest">
                      <Sparkles size={14} /> Upgrade to Unlock
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}

        {planPreview && (
          <div className="mt-8 rounded-2xl border-2 border-[var(--green-primary)]/40 bg-[var(--green-primary)]/10 p-5">
            <h3 className="text-sm font-black text-[var(--green-primary)] mb-2">Plan generated</h3>
            <p className="text-xs text-[var(--text-secondary)] tabular-nums mb-4">
              {planPreview.planConfig?.days ?? planPreview.planLessons.length} days ·{" "}
              {planPreview.planConfig?.sessionsPerWeek ?? "?"} sessions/week
            </p>
            <div className="space-y-2">
              {Array.from({ length: Math.min(3, Math.ceil(planPreview.planLessons.length / 7)) }, (_, i) => i + 1).map((weekIndex) => {
                const start = (weekIndex - 1) * 7 + 1;
                const end = Math.min(weekIndex * 7, planPreview.planLessons.length);
                const weekLessons = planPreview.planLessons.filter(
                  (p) => p.dayIndex >= start && p.dayIndex <= end
                );
                const mix = weekLessons.reduce<Record<string, number>>((acc, item) => {
                  acc[item.lessonType] = (acc[item.lessonType] ?? 0) + 1;
                  return acc;
                }, {});
                return (
                  <div key={weekIndex} className="rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-3">
                    <p className="text-xs font-black text-white mb-1">Week {weekIndex}</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {Object.entries(mix)
                        .map(([k, v]) => `${lessonTypeLabel(k)} x${v}`)
                        .join(", ")}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)]/70 mt-1">
                      Skills:{" "}
                      {Array.from(
                        new Set(
                          weekLessons.flatMap((item) => getSkillTags(item.skillTags)).slice(0, 6)
                        )
                      ).join(", ")}
                    </p>
                  </div>
                );
              })}
            </div>
            {createdTargetId && (
              <Link
                href={`/interview-sprint?targetId=${encodeURIComponent(createdTargetId)}`}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-black text-xs font-black uppercase tracking-wide px-3 py-2 transition-all"
              >
                Start daily drill
              </Link>
            )}
          </div>
        )}

        {/* Mobile upgrade disclosure */}
        <button
          type="button"
          onClick={() => setShowMobileUpgrade((prev) => !prev)}
          className="sm:hidden w-full mt-7 rounded-xl border-2 border-b-4 border-[var(--purple-primary)]/40 bg-[var(--purple-primary)]/10 px-3 py-2.5 flex items-center justify-between active:border-b-2 active:translate-y-[2px] transition-all"
        >
          <span className="text-xs font-black text-[var(--purple-primary)]">Upgrade options</span>
          <span className="text-[10px] font-black text-[var(--purple-primary)]/80 uppercase tracking-wider">
            {showMobileUpgrade ? "Hide" : "Show"}
          </span>
        </button>

        {/* Pro CTA */}
        <div className={cn("mt-8 rounded-2xl border-2 border-[var(--purple-primary)]/40 bg-[var(--purple-primary)]/10 p-5 flex items-center gap-4", showMobileUpgrade ? "flex" : "hidden sm:flex", "sm:flex")}>
          <Zap size={24} className="text-[var(--purple-primary)] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-black">Want direct apply links and PM leader job alerts?</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Upgrade to Pro to unlock the full job board experience.</p>
          </div>
          <Link href="/pricing" className="flex-shrink-0 bg-[var(--purple-primary)] text-black text-xs font-black uppercase tracking-wide px-4 py-2 rounded-xl border-b-4 border-black/30 active:border-b-2 active:translate-y-[2px] hover:opacity-90 transition-all">
            Upgrade
          </Link>
        </div>
      </main>
    </div>
  );
}
