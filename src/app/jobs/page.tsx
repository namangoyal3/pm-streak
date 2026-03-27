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

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={20} className="text-orange-400" />
            <h1 className="text-2xl font-black">PM Jobs</h1>
          </div>
          <p className="text-white/55 text-sm">Curated Product Manager roles, updated weekly.</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs font-black text-white/60 uppercase tracking-wider mb-3">
            <CalendarDays size={14} />
            Build interview plan
          </div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("browse")}
              className={cn(
                "px-3 py-2 text-xs font-black rounded-lg border transition-colors",
                tab === "browse"
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              )}
            >
              Browse roles
            </button>
            <button
              onClick={() => setTab("paste")}
              className={cn(
                "px-3 py-2 text-xs font-black rounded-lg border transition-colors",
                tab === "paste"
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
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
              className="w-full min-h-40 rounded-xl bg-black/20 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-purple-500/40"
            />
          )}

          <div className="mt-4">
            <p className="text-[11px] text-white/55 font-bold mb-2 uppercase tracking-wider">Target timeframe</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {(["15", "30", "60", "custom"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTargetMode(mode)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-black rounded-lg border transition-colors",
                    targetMode === mode
                      ? "bg-green-500/20 border-green-500/50 text-green-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
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
                className="rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500/40"
              />
            )}
          </div>

          {planError && <p className="mt-3 text-xs font-bold text-red-300">{planError}</p>}

          <button
            onClick={handleGeneratePlan}
            disabled={creatingPlan}
            className="mt-4 w-full py-3 rounded-xl bg-[var(--green-primary)] text-white text-sm font-black uppercase tracking-wider hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {creatingPlan ? "Generating plan..." : "Generate my plan"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search jobs or companies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/40"
            />
          </div>
          <button
            onClick={() => setRemoteOnly((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-black transition-colors",
              remoteOnly
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white"
            )}
          >
            <Globe size={12} /> Remote
          </button>
        </div>

        {/* Job List */}
        {loading ? (
          <div className="text-center py-20 text-white/40 text-sm">Loading jobs…</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={40} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-sm mb-2">No jobs yet</p>
            <p className="text-white/30 text-xs">Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.slice(0, user?.plan === "pro" ? 999 : 3).map((job) => (
              <div
                key={job.id}
                className={cn(
                  "rounded-2xl border-2 bg-[var(--surface-2)] p-4 transition-all",
                  selectedJobId === job.id
                    ? "border-green-500/60 shadow-lg shadow-green-500/10"
                    : "border-[var(--border-color)] hover:border-white/10"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-black">{job.title}</h3>
                      {job.remote && (
                        <span className="text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">Remote</span>
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
                        "mt-3 inline-flex items-center gap-1.5 text-[11px] font-black px-2.5 py-1.5 rounded-lg border transition-colors",
                        selectedJobId === job.id
                          ? "bg-green-500/20 border-green-500/40 text-green-300"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white"
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
                    className="flex-shrink-0 flex items-center gap-1.5 bg-[var(--green-primary)] text-white text-xs font-black px-4 py-2.5 rounded-xl hover:opacity-90 transition-all active:scale-95"
                  >
                    Apply <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}

            {user?.plan !== "pro" && jobs.length > 3 && (
              <div className="pt-2">
                <Link href="/pricing" className="block relative overflow-hidden rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-950/40 to-indigo-950/20 p-6 text-center group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Lock size={120} />
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                      <Lock size={20} className="text-purple-400" />
                    </div>
                    <h3 className="text-base font-black text-white mb-1">
                      {jobs.length - 3} more jobs locked
                    </h3>
                    <p className="text-xs text-purple-400 font-bold mb-6">
                      Unlock the full PM Jobs board with Pro
                    </p>
                    <div className="inline-flex items-center gap-2 bg-purple-500 text-white text-xs font-black px-6 py-3 rounded-xl hover:bg-purple-400 transition-all uppercase tracking-widest shadow-lg shadow-purple-500/20">
                      <Sparkles size={14} /> Upgrade to Unlock
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}

        {planPreview && (
          <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
            <h3 className="text-sm font-black text-green-300 mb-2">Plan generated</h3>
            <p className="text-xs text-white/75 mb-4">
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
                  <div key={weekIndex} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs font-black text-white/80 mb-1">Week {weekIndex}</p>
                    <p className="text-[11px] text-white/65">
                      {Object.entries(mix)
                        .map(([k, v]) => `${lessonTypeLabel(k)} x${v}`)
                        .join(", ")}
                    </p>
                    <p className="text-[10px] text-white/45 mt-1">
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
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white text-black text-xs font-black px-3 py-2"
              >
                Start daily drill
              </Link>
            )}
          </div>
        )}

        {/* Pro CTA */}
        <div className="mt-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 flex items-center gap-4">
          <Zap size={24} className="text-purple-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-black">Want direct apply links and PM leader job alerts?</p>
            <p className="text-xs text-white/50 mt-0.5">Upgrade to Pro to unlock the full job board experience.</p>
          </div>
          <Link href="/pricing" className="flex-shrink-0 bg-purple-500 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-purple-400 transition-colors">
            Upgrade
          </Link>
        </div>
      </main>
    </div>
  );
}
