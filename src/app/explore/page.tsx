"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Sparkles, Search, Loader2, ArrowRight, BookOpen, Zap } from "lucide-react";
import Link from "next/link";

const SUGGESTED_TOPICS = [
  "Product-market fit",
  "User onboarding",
  "A/B testing",
  "Hiring PMs",
  "AI product strategy",
  "Building culture",
  "Roadmap planning",
  "OKRs and metrics",
  "B2B vs B2C",
  "Remote team management",
  "Feature prioritization",
  "Customer interviews",
];

export default function ExplorePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedLessons, setGeneratedLessons] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setUser(data.user);
    }
    load();
  }, [router]);

  const handleGenerate = async (selectedTopic?: string) => {
    const t = selectedTopic || topic;
    if (!t || t.length < 2) return;

    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: t }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to generate");
        return;
      }

      const data = await res.json();
      setGeneratedLessons((prev) => [data.lesson, ...prev]);
      setTopic("");
    } catch {
      setError("Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} />

      <main className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-8 py-6 pb-28 space-y-6">
        <div className="text-center">
          <Sparkles size={40} className="mx-auto text-[var(--green-primary)] mb-2" />
          <h1 className="text-xl font-bold">Explore & Generate</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Generate custom lessons from Lenny&apos;s Podcast on any PM topic
          </p>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            placeholder="Enter a PM topic (e.g., 'user retention')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            disabled={generating}
            className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] text-white placeholder:text-[var(--text-secondary)] focus:border-[var(--green-primary)] focus:outline-none text-sm"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={generating || topic.length < 2}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-[var(--green-primary)] text-white text-xs font-bold disabled:opacity-50 flex items-center gap-1"
          >
            {generating ? (
              <>
                <Loader2 size={12} className="animate-spin" /> Generating
              </>
            ) : (
              <>
                <Sparkles size={12} /> Generate
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="text-[var(--red-primary)] text-sm text-center">{error}</p>
        )}

        {/* Suggested topics */}
        <div>
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
            Suggested Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTopic(t);
                  handleGenerate(t);
                }}
                disabled={generating}
                className="px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:text-white hover:border-[var(--green-primary)] transition-colors disabled:opacity-50"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Generated lessons */}
        {generatedLessons.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Generated Lessons
            </h3>
            <div className="space-y-3">
              {generatedLessons.map((lesson) => (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <div className="bg-gradient-to-br from-[var(--green-primary)]/20 to-[var(--blue-primary)]/20 border border-[var(--green-primary)]/30 rounded-2xl p-4 lesson-card">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-[var(--green-primary)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold truncate">{lesson.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] truncate">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-[var(--gold-primary)]">
                        <Zap size={12} /> {lesson.xpReward}
                      </div>
                      <ArrowRight size={16} className="text-[var(--text-secondary)]" />
                    </div>
                    {lesson.guestName && (
                      <div className="mt-2 text-xs text-[var(--text-secondary)]">
                        Featuring: {lesson.guestName}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-4">
          <h3 className="text-sm font-bold mb-2">How it works</h3>
          <div className="space-y-2 text-xs text-[var(--text-secondary)]">
            <div className="flex items-start gap-2">
              <span className="text-[var(--green-primary)] font-bold">1.</span>
              <span>Enter any PM topic you want to learn about</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--green-primary)] font-bold">2.</span>
              <span>We search Lenny&apos;s 300+ podcast transcripts for relevant insights</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--green-primary)] font-bold">3.</span>
              <span>A micro-lesson with quiz is generated from real podcast content</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[var(--green-primary)] font-bold">4.</span>
              <span>Complete it to earn XP and keep your streak alive</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
