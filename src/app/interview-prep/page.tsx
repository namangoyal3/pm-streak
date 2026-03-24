"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame, Brain, ChevronRight, Zap, ChevronDown, CheckCircle2,
  AlertTriangle, Star, Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewQuestion {
  question: string;
  framework: string;
  keyPoints: string[];
  commonMistakes: string[];
}

const TOPICS = ["Product Sense", "Metrics & Analytics", "Execution", "Strategy", "Behavioral", "Estimation"];
const LEVELS = ["APM", "PM", "Senior PM", "Group PM / Director"];

export default function InterviewPrepPage() {
  const [topic, setTopic] = useState("Product Sense");
  const [level, setLevel] = useState("PM");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [credits, setCredits] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const generate = async () => {
    setLoading(true);
    setError(null);
    setQuestions([]);
    setRevealed(new Set());

    const res = await fetch("/api/interview-prep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, level }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error === "insufficient_credits") {
        setError(`Not enough credits. You have ${data.credits} ⚡ but need ${data.needed} ⚡.`);
      } else {
        setError(data.error ?? "Something went wrong");
      }
      setLoading(false);
      return;
    }

    setQuestions(data.questions ?? []);
    if (data.credits !== undefined) setCredits(data.credits);
    setLoading(false);
  };

  const toggleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <Flame size={22} className="text-orange-400" />
            <span className="text-green-400">PM</span>
            <span className="text-white">Streak</span>
          </Link>
          <div className="flex items-center gap-3">
            {credits !== null && (
              <div className="flex items-center gap-1 bg-purple-500/20 px-2.5 py-1 rounded-full">
                <Zap size={12} className="text-purple-400" />
                <span className="text-xs font-black text-purple-400">{credits}</span>
              </div>
            )}
            <Link href="/dashboard" className="text-xs font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1">
              Dashboard <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={20} className="text-blue-400" />
            <h1 className="text-2xl font-black">AI Interview Prep</h1>
          </div>
          <p className="text-white/55 text-sm">
            Get 5 PM interview questions with answer frameworks — grounded in real PM thinking.
            Costs <strong className="text-purple-300">5 ⚡</strong> per session (free for Pro).
          </p>
        </div>

        {/* Config */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs font-black text-white/60 uppercase tracking-wider mb-2 block">Topic</label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-black border transition-colors",
                      topic === t
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-white/60 uppercase tracking-wider mb-2 block">Level</label>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-black border transition-colors",
                      level === l
                        ? "bg-green-500/20 border-green-500/50 text-green-300"
                        : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-3 bg-blue-500 text-white font-black text-sm rounded-xl uppercase tracking-wider hover:bg-blue-400 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Generating…</>
            ) : (
              <><Brain size={16} /> Generate 5 Questions (5 ⚡)</>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-red-300">{error}</p>
              {error.includes("credits") && (
                <Link href="/pricing" className="text-xs text-purple-400 font-black mt-1 block hover:underline flex items-center gap-1">
                  <Star size={10} /> Upgrade to Pro for unlimited sessions
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-black text-white/70 uppercase tracking-wider">
              {topic} · {level} · 5 Questions
            </h2>
            {questions.map((q, i) => {
              const isRevealed = revealed.has(i);
              return (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-black text-white/20 leading-none">{i + 1}</span>
                      <p className="text-sm font-bold text-white leading-relaxed">{q.question}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 px-5 pb-2">
                    <button
                      onClick={() => toggleReveal(i)}
                      className="flex items-center gap-2 py-3 text-xs font-black text-white/50 hover:text-white transition-colors w-full"
                    >
                      <ChevronDown size={14} className={cn("transition-transform", isRevealed && "rotate-180")} />
                      {isRevealed ? "Hide framework" : "Reveal answer framework"}
                    </button>

                    {isRevealed && (
                      <div className="pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3">
                          <p className="text-[11px] font-black text-blue-300 uppercase tracking-wider mb-1">Framework</p>
                          <p className="text-xs text-white/75 leading-relaxed">{q.framework}</p>
                        </div>

                        <div>
                          <p className="text-[11px] font-black text-green-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle2 size={11} /> What great answers cover
                          </p>
                          <ul className="space-y-1.5">
                            {q.keyPoints.map((p, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-white/65">
                                <span className="text-green-400 mt-0.5">•</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-black text-orange-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <AlertTriangle size={11} /> Common mistakes
                          </p>
                          <ul className="space-y-1.5">
                            {q.commonMistakes.map((m, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-white/65">
                                <span className="text-orange-400 mt-0.5">•</span>
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Regenerate */}
            <button
              onClick={generate}
              disabled={loading}
              className="w-full py-3 rounded-xl border border-white/10 text-xs font-black text-white/50 hover:text-white hover:border-white/30 transition-colors"
            >
              Generate new set (5 ⚡)
            </button>
          </div>
        )}

        {/* Pro CTA */}
        {questions.length === 0 && !loading && !error && (
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5 flex items-center gap-4">
            <Star size={20} className="text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-black">Pro: unlimited sessions</p>
              <p className="text-xs text-white/50 mt-0.5">No credit cost, generate as many sets as you want.</p>
            </div>
            <Link href="/pricing" className="flex-shrink-0 bg-purple-500 text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-purple-400 transition-colors">
              Upgrade
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
