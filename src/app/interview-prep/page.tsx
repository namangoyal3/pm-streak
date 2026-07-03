"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Star, Loader2, Brain, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {
  INTERVIEW_PREP_PRICING,
  interviewPrepSessionCreditTotal,
} from "@/lib/interview-prep-pricing";

interface InterviewQuestion {
  question: string;
  framework: string;
  keyPoints: string[];
  commonMistakes: string[];
}

const TOPICS = ["Product Sense", "Metrics & Analytics", "Execution", "Strategy", "Behavioral", "Estimation"];
const LEVELS = ["APM", "PM", "Senior PM", "Group PM / Director"];

export default function InterviewPrepPage() {
  const [user, setUser] = useState<any>(null);
  const [topic, setTopic] = useState("Product Sense");
  const [level, setLevel] = useState("PM");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

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
        setError(
          `Not enough credits. You have ${data.credits} but need ${data.needed} (one full session is ${interviewPrepSessionCreditTotal()} credits).`
        );
      } else {
        setError(data.error ?? "Something went wrong");
      }
      setLoading(false);
      return;
    }

    setQuestions(data.questions ?? []);
    if (data.credits !== undefined) setUser((u: any) => ({ ...u, credits: data.credits }));
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

      <main className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Hero */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Brain size={20} className="text-[var(--blue-primary)]" />
            <h1 className="text-2xl font-black tracking-tight">Interview Prep</h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--blue-primary)]/20 text-[var(--blue-primary)] border border-[var(--blue-primary)]/40">
              AI
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
            This helps you keep your prep relevant to a role you want to apply for — pair it with a job target from{" "}
            <Link href="/jobs" className="text-[var(--green-primary)] font-black hover:underline">
              PM Jobs
            </Link>{" "}
            (build a plan) so questions and frameworks align with your JD.
          </p>
          <p className="text-[var(--text-secondary)] text-sm mt-3">Five PM questions + answer frameworks per session.</p>
          <p className="text-[11px] text-[var(--text-secondary)]/70 mt-1">
            <strong className="text-[var(--purple-primary)]">
              {INTERVIEW_PREP_PRICING.creditsPerQuestion} credit per question
            </strong>{" "}
            ({INTERVIEW_PREP_PRICING.questionsPerSession} questions = {interviewPrepSessionCreditTotal()} credits per
            session). Pro: unlimited.
          </p>
        </div>

        {/* Config */}
        <div className="rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-5 mb-6">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="sm:hidden mb-4 w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--surface-1)] text-xs font-black active:border-b-2 active:translate-y-[2px] transition-all"
          >
            <span>Topic & level</span>
            <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-wider">{showFilters ? "Hide" : "Show"}</span>
          </button>
          <div className={cn("grid sm:grid-cols-2 gap-4 mb-5", showFilters ? "grid" : "hidden sm:grid")}>
            <div>
              <label className="text-xs font-black text-[var(--green-primary)] uppercase tracking-widest mb-2 block">Topic</label>
              <div className="flex flex-wrap gap-1 w-fit bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-1">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide transition-colors",
                      topic === t
                        ? "bg-[var(--green-primary)] text-black"
                        : "text-[var(--text-secondary)] hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-[var(--green-primary)] uppercase tracking-widest mb-2 block">Level</label>
              <div className="flex flex-wrap gap-1 w-fit bg-[var(--surface-1)] rounded-2xl border-2 border-[var(--border-color)] p-1">
                {LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wide transition-colors",
                      level === l
                        ? "bg-[var(--green-primary)] text-black"
                        : "text-[var(--text-secondary)] hover:text-white"
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
            className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-black font-black text-sm uppercase tracking-wide transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Generating…</>
            ) : (
              <><Brain size={16} /> Generate {INTERVIEW_PREP_PRICING.questionsPerSession} questions (
              {interviewPrepSessionCreditTotal()} credits)</>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-2xl border-2 border-[var(--red-primary)]/40 bg-[var(--red-primary)]/10 p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-[var(--red-primary)] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-[var(--red-primary)]">{error}</p>
              {error.includes("credits") && (
                <Link href="/pricing" className="text-xs text-[var(--purple-primary)] font-black mt-1 block hover:underline flex items-center gap-1">
                  <Star size={10} /> Upgrade to Pro for unlimited sessions
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Questions */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-black text-[var(--green-primary)] uppercase tracking-widest">
              {topic} · {level} · 5 Questions
            </h2>
            {questions.map((q, i) => {
              const isRevealed = revealed.has(i);
              return (
                <div key={i} className="rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-black text-[var(--text-secondary)]/40 leading-none tabular-nums">{i + 1}</span>
                      <p className="text-sm font-bold text-white leading-relaxed">{q.question}</p>
                    </div>
                  </div>

                  <div className="border-t-2 border-[var(--border-color)] px-5 pb-2">
                    <button
                      onClick={() => toggleReveal(i)}
                      className="flex items-center gap-2 py-3 text-xs font-black uppercase tracking-wide text-[var(--text-secondary)] hover:text-white transition-colors w-full"
                    >
                      <ChevronDown size={14} className={cn("transition-transform", isRevealed && "rotate-180")} />
                      {isRevealed ? "Hide framework" : "Reveal answer framework"}
                    </button>

                    {isRevealed && (
                      <div className="pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="rounded-xl bg-[var(--blue-primary)]/10 border-2 border-[var(--blue-primary)]/25 p-3">
                          <p className="text-[11px] font-black text-[var(--blue-primary)] uppercase tracking-wider mb-1">Framework</p>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{q.framework}</p>
                        </div>

                        <div>
                          <p className="text-[11px] font-black text-[var(--green-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle2 size={11} /> What great answers cover
                          </p>
                          <ul className="space-y-1.5">
                            {q.keyPoints.map((p, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                                <span className="text-[var(--green-primary)] mt-0.5">•</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-black text-[var(--orange-primary)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <AlertTriangle size={11} /> Common mistakes
                          </p>
                          <ul className="space-y-1.5">
                            {q.commonMistakes.map((m, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                                <span className="text-[var(--orange-primary)] mt-0.5">•</span>
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
              className="w-full py-4 rounded-2xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-black text-[var(--text-secondary)] hover:text-white active:border-b-2 active:translate-y-[2px] transition-all uppercase tracking-widest"
            >
              Generate new set ({interviewPrepSessionCreditTotal()} credits)
            </button>
          </div>
        )}

        {/* Pro CTA */}
        {questions.length === 0 && !loading && !error && (
          <div className="rounded-2xl border-2 border-[var(--purple-primary)]/40 bg-[var(--purple-primary)]/10 p-5 flex items-center gap-4">
            <Star size={20} className="text-[var(--purple-primary)] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-black">Pro: unlimited sessions</p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">No credit cost, generate as many sets as you want.</p>
            </div>
            <Link href="/pricing" className="flex-shrink-0 bg-[var(--purple-primary)] text-black text-xs font-black uppercase tracking-wide px-4 py-2 rounded-xl border-b-4 border-black/30 active:border-b-2 active:translate-y-[2px] hover:opacity-90 transition-all">
              Upgrade
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
