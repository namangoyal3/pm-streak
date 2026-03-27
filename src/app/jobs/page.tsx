"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Globe, ExternalLink, Briefcase, Zap, Lock, Sparkles } from "lucide-react";
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

export default function JobsPage() {
  const [user, setUser] = useState<any>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
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
            <Briefcase size={20} className="text-orange-400" />
            <h1 className="text-2xl font-black">PM Jobs</h1>
          </div>
          <p className="text-white/55 text-sm">Curated Product Manager roles, updated weekly.</p>
        </div>

        {/* Mobile filter disclosure */}
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="sm:hidden w-full mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 flex items-center justify-between"
        >
          <span className="text-xs font-black">Search & filters</span>
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
            {showMobileFilters ? "Hide" : "Show"}
          </span>
        </button>

        {/* Filters */}
        <div className={cn("mb-6 flex gap-3", showMobileFilters ? "flex" : "hidden sm:flex")}>
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search jobs or companies..."
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
                className="rounded-2xl border-2 border-[var(--border-color)] bg-[var(--surface-2)] p-4 hover:border-white/10 transition-all"
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

        {/* Mobile upgrade disclosure */}
        <button
          onClick={() => setShowMobileUpgrade((prev) => !prev)}
          className="sm:hidden w-full mt-7 rounded-xl border border-purple-500/30 bg-purple-500/10 px-3 py-2.5 flex items-center justify-between"
        >
          <span className="text-xs font-black text-purple-300">Upgrade options</span>
          <span className="text-[10px] font-bold text-purple-300/80 uppercase tracking-wider">
            {showMobileUpgrade ? "Hide" : "Show"}
          </span>
        </button>

        {/* Pro CTA */}
        <div className={cn("mt-8 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 flex items-center gap-4", showMobileUpgrade ? "flex" : "hidden sm:flex", "sm:flex")}>
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
