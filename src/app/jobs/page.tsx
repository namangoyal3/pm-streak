"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Search, MapPin, Globe, ExternalLink, Briefcase, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

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
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <Flame size={22} className="text-orange-400" />
            <span className="text-green-400">PM</span>
            <span className="text-white">Streak</span>
          </Link>
          <Link href="/dashboard" className="text-xs font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1">
            Dashboard <ChevronRight size={12} />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={20} className="text-orange-400" />
            <h1 className="text-2xl font-black">PM Jobs</h1>
          </div>
          <p className="text-white/55 text-sm">Curated Product Manager roles, updated weekly.</p>
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
            <p className="text-white/30 text-xs">Run the scraper script to populate jobs, or check back soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-black">{job.title}</h3>
                      {job.remote && (
                        <span className="text-[10px] font-black text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Remote</span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 font-bold mb-1">{job.company}</p>
                    {job.location && (
                      <div className="flex items-center gap-1 text-[11px] text-white/40 mb-2">
                        <MapPin size={10} />
                        {job.location}
                      </div>
                    )}
                    {job.description && (
                      <p className="text-[11px] text-white/50 line-clamp-2">{job.description}</p>
                    )}
                    {job.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {job.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-[10px] font-bold text-white/40 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1.5 bg-green-500 text-white text-xs font-black px-3 py-2 rounded-lg hover:bg-green-400 transition-colors"
                  >
                    Apply <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ))}
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
