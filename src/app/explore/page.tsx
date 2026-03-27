"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Sparkles,
  Search,
  Loader2,
  ArrowRight,
  Zap,
  Compass,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";

type GeneratedLesson = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  guestName?: string | null;
  generationMode?: string | null;
  category?: { name: string; icon: string } | null;
};

type AiUsage = {
  remainingCredits: number | null;
  unlimited: boolean;
};

function mergeLessons(lessons: GeneratedLesson[]) {
  const seen = new Set<string>();
  return lessons.filter((lesson) => {
    if (seen.has(lesson.id)) return false;
    seen.add(lesson.id);
    return true;
  });
}

function ExplorePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedLessons, setGeneratedLessons] = useState<GeneratedLesson[]>([]);
  const [error, setError] = useState("");
  const [paywallHard, setPaywallHard] = useState(false);
  const [aiUsage, setAiUsage] = useState<AiUsage | null>(null);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);
  const [showTopicLibrary, setShowTopicLibrary] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const sourceLessonId = searchParams.get("sourceLessonId");
  const generationMode =
    searchParams.get("mode") === "deep_dive" ? "deep_dive" : "explore";

  useEffect(() => {
    async function load() {
      const [userRes, generatedRes, topicsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/generated-lessons"),
        fetch("/api/explore/available-topics"),
      ]);

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData.user);

      if (generatedRes.ok) {
        const generatedData = await generatedRes.json();
        setGeneratedLessons(generatedData.lessons ?? []);
      }

      if (topicsRes.ok) {
        const topicsData = await topicsRes.json();
        setAvailableTopics(topicsData.topics ?? []);
      }
    }

    load();
  }, [router]);

  useEffect(() => {
    const prefilledTopic = searchParams.get("topic");
    if (prefilledTopic) {
      setTopic(prefilledTopic);
    }
  }, [searchParams]);

  const handleGenerate = async (selectedTopic?: string) => {
    const nextTopic = selectedTopic || topic;
    if (!nextTopic || nextTopic.length < 2) return;

    setGenerating(true);
    setError("");
    setPaywallHard(false);

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: nextTopic,
          generationMode,
          sourceLessonId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPaywallHard(res.status === 402);
        setError(data.error || "Failed to generate");
        if (data.aiUsage) setAiUsage(data.aiUsage);
        return;
      }

      setPaywallHard(false);
      setGeneratedLessons((prev) => mergeLessons([data.lesson, ...prev]));
      if (data.aiUsage) setAiUsage(data.aiUsage);
      setTopic("");
    } catch {
      setError("Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  if (!user) {
    return (
      <div className={cn(ds.pageShell, "flex items-center justify-center")}>
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={ds.pageShell}>
      <Navbar streakCount={user.streakCount} xp={user.xp} gems={user.gems} />

      <main className="max-w-2xl lg:max-w-3xl mx-auto px-4 lg:px-8 py-5 pb-28 space-y-5">
        <div className="text-center">
          <Sparkles size={34} className="mx-auto text-[var(--green-primary)] mb-2" />
          <h1 className={cn(ds.sectionTitle, "text-xl")}>Explore & Generate</h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Custom lessons are generated live using AI from Lenny&apos;s Podcast transcripts. {user?.plan === "pro" ? "Unlimited for Pro." : "Costs 2 Credits."}
          </p>
        </div>

        {user && user.plan !== "pro" && (
          <div className={cn(ds.panelFlat, "border-[var(--gold-primary)]/30 bg-[var(--gold-primary)]/10")}>
            <div className="text-sm font-black text-[var(--text-primary)]">
              {user.credits} Free Credits left
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              AI Explore lessons cost <strong className="text-white">2 Credits</strong> per session. Pro members get unlimited access.
            </p>
          </div>
        )}

        {user?.plan === "pro" && (
          <div className={cn(ds.panelFlat, "border-[var(--green-primary)]/30 bg-[var(--green-primary)]/10")}>
            <div className="text-sm font-black text-[var(--green-primary)]">
              PM Streak Pro: unlimited AI Explore access
            </div>
          </div>
        )}

        {generationMode === "deep_dive" && (
          <div
            className={cn(
              ds.panelFlat,
              "border-[var(--blue-primary)]/30 bg-[var(--blue-primary)]/10"
            )}
          >
            <div className="text-sm font-black text-[var(--blue-primary)]">
              Deep-dive mode
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              You&apos;re turning a lesson you just viewed into a richer follow-up. It still earns XP and streak credit, but it won&apos;t change which core lesson unlocks next.
            </p>
          </div>
        )}

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
            className={cn(
              ds.inputSearch,
              "w-full pl-10 pr-24 py-3"
            )}
          />
          <button
            onClick={() => handleGenerate()}
            disabled={generating || topic.length < 2}
            className={cn(
              ds.btnPrimary,
              "absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-xs disabled:opacity-50 flex items-center gap-1"
            )}
          >
            {generating ? (
              <>
                <Loader2 size={12} className="animate-spin" /> Generating
              </>
            ) : (
              <>
                <Sparkles size={12} /> Generate {user?.plan === "pro" ? "" : "(2 Credits)"}
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="text-center space-y-2">
            <p
              className={
                paywallHard
                  ? "text-sm text-[var(--gold-primary)] font-bold"
                  : "text-[var(--red-primary)] text-sm"
              }
            >
              {error}
            </p>
            {paywallHard && (
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm font-black text-[var(--green-primary)]"
              >
                View PM Streak Pro <ArrowRight size={14} />
              </Link>
            )}
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowTopicLibrary((prev) => !prev)}
            className="lg:hidden w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2.5 flex items-center justify-between"
          >
            <span className="text-xs font-black">Topic library</span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              {showTopicLibrary ? "Hide" : "Show"}
              {showTopicLibrary ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </span>
          </button>
          <div className={cn("mt-2 lg:mt-0", showTopicLibrary ? "block" : "hidden", "lg:block")}>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Updated Content Library
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableTopics.map((suggestedTopic) => (
                <button
                  key={suggestedTopic}
                  onClick={() => {
                    setTopic(suggestedTopic);
                    handleGenerate(suggestedTopic);
                  }}
                  disabled={generating}
                  className={ds.topicChip}
                >
                  {suggestedTopic}
                </button>
              ))}
              {availableTopics.length === 0 && !generating && (
                <p className="text-[10px] text-[var(--text-secondary)] italic">Loading ready topics...</p>
              )}
            </div>
          </div>
        </div>

        {generatedLessons.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-2">
              Your Custom Lessons
            </h3>
            <div className="space-y-3">
              {generatedLessons.map((lesson) => (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <div
                    className={cn(
                      ds.panelFlat,
                      "lesson-card bg-gradient-to-br from-[var(--green-primary)]/20 to-[var(--blue-primary)]/20 border-[var(--green-primary)]/30"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-[var(--green-primary)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold truncate">{lesson.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                          {lesson.description}
                        </p>
                        <div className="text-[10px] text-[var(--text-secondary)] mt-1">
                          {lesson.generationMode === "deep_dive" ? "Deep dive" : "Explore"} ·{" "}
                          {lesson.category?.icon} {lesson.category?.name}
                        </div>
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

        <button
          type="button"
          onClick={() => setShowGuide((prev) => !prev)}
          className="lg:hidden w-full rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] px-3 py-2.5 flex items-center justify-between"
        >
          <span className="text-xs font-black">Explore guide</span>
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            {showGuide ? "Hide" : "Show"}
            {showGuide ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </span>
        </button>

        <div className={cn("space-y-4", showGuide ? "block" : "hidden", "lg:block")}>
          <div className={ds.panel}>
            <h3 className={cn(ds.sectionTitle, "mb-2")}>How it works</h3>
            <div className="space-y-2 text-xs text-[var(--text-secondary)]">
              <div className="flex items-start gap-2">
                <span className="text-[var(--green-primary)] font-bold">1.</span>
                <span>Choose a PM topic or launch a deeper dive from a lesson page</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--green-primary)] font-bold">2.</span>
                <span>We search Lenny&apos;s Podcast transcripts for the most relevant expert insights</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--green-primary)] font-bold">3.</span>
                <span>A custom lesson is generated and saved to your library for permanent access</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[var(--green-primary)] font-bold">4.</span>
                <span>Custom lessons keep your streak alive, but the main podcast curriculum still unlocks gradually in batches as you finish what&apos;s open</span>
              </div>
            </div>
          </div>

          <div className={ds.panel}>
            <div className="flex items-center gap-2 mb-2">
              <Compass size={16} className="text-[var(--blue-primary)]" />
              <h3 className={ds.sectionTitle}>What this is best for</h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Use Explore when a lesson summary feels too short, when the video made the idea click and you want more depth, or when you finish a category and want extra practice on that theme.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className={cn(ds.pageShell, "flex items-center justify-center")}>
          <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">
            Loading...
          </div>
        </div>
      }
    >
      <ExplorePageContent />
    </Suspense>
  );
}
