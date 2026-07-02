"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Mic, AlertTriangle, CheckCircle2 } from "lucide-react";

type DrillResponse = {
  dayIndex: number;
  targetTitle: string;
  lessonType: string;
  skillTags: string[];
  lesson: {
    id: string;
    title: string;
    promptText: string;
    skillTags?: string[];
  };
};

type AttemptResponse = {
  attemptId: string;
  scores: {
    user_focus: number;
    structure: number;
    data_thinking: number;
    tradeoffs: number;
  };
  feedbackComments: string[];
  tomorrowFocus: string;
  paywallEligible: boolean;
};

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold text-[var(--text-secondary)]">{label}</p>
        <p className="text-xs font-black text-white tabular-nums">{score}/5</p>
      </div>
      <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
        <div className="h-full bg-[var(--green-primary)]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function InterviewSprintPage() {
  const [drill, setDrill] = useState<DrillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<AttemptResponse | null>(null);

  useEffect(() => {
    async function loadDrill() {
      try {
        const res = await fetch("/api/daily-drill");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Could not load your daily drill.");
          return;
        }
        setDrill(data as DrillResponse);
      } catch {
        setError("Could not load your daily drill.");
      } finally {
        setLoading(false);
      }
    }

    loadDrill();
  }, []);

  async function submitAnswer() {
    if (!drill) return;
    if (answer.trim().length < 30) {
      setError("Write a more complete answer (at least ~30 chars).");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/lesson-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: drill.lesson.id,
          userAnswer: answer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not evaluate your answer.");
        return;
      }
      setResult(data as AttemptResponse);
    } catch {
      setError("Could not evaluate your answer.");
    } finally {
      setSubmitting(false);
    }
  }

  const paywallNotice = useMemo(() => {
    if (!result?.paywallEligible) return null;
    return "You unlocked advanced coaching. Get credits for deep mock interviews.";
  }, [result]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col items-center justify-center px-6 pb-24">
        <Mic size={48} className="text-[var(--green-primary)] mb-4 animate-pulse" />
        <p className="text-sm text-[var(--text-secondary)] font-bold">Loading your daily PM drill...</p>
      </div>
    );
  }

  if (!drill) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col items-center justify-center px-6 pb-24">
        <AlertTriangle size={46} className="text-[var(--red-primary)] mb-3" />
        <p className="text-sm text-[var(--text-secondary)] text-center max-w-md">
          {error ?? "No daily drill yet. Set a target role and timeline first."}
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/jobs" className="px-4 py-2 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white text-xs font-black uppercase tracking-wide transition-all">
            Set target
          </Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-2xl bg-[var(--bg-card)] border-2 border-b-4 border-[var(--border-color)] hover:bg-[var(--bg-secondary)] active:border-b-2 active:translate-y-[2px] text-white text-xs font-black uppercase tracking-wide transition-all">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white px-4 py-8 pb-24">
      <main className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[var(--green-primary)] bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/30 px-2.5 py-1 rounded-full">
            <Mic size={12} />
            Daily case
          </div>
          <h1 className="text-2xl font-black tracking-tight mt-2">Day {drill.dayIndex} of your sprint</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Target role: <span className="text-white font-bold">{drill.targetTitle}</span>
          </p>
        </div>

        <div className="rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-5 mb-5">
          <p className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wide mb-2">{drill.lesson.title}</p>
          <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{drill.lesson.promptText}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(drill.skillTags.length > 0 ? drill.skillTags : drill.lesson.skillTags ?? []).map((tag) => (
              <span key={tag} className="text-[10px] font-black uppercase tracking-wide bg-[var(--bg-secondary)] border border-[var(--border-color)] px-2 py-1 rounded-full text-[var(--text-secondary)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-[var(--border-color)] bg-[var(--bg-card)] p-5">
          <p className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wide mb-2">Your answer</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your response. Most users spend 5-10 minutes."
            className="w-full min-h-48 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] px-3 py-3 text-sm text-white placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--green-primary)] transition-colors"
          />
          {error && <p className="text-xs text-[var(--red-primary)] font-bold mt-2">{error}</p>}
          <p className="text-[10px] text-[var(--text-secondary)] mt-2">
            Uses <strong className="text-white">1 credit</strong> per submitted drill (Pro: no charge).
          </p>
          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="mt-3 w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white text-sm font-black uppercase tracking-wide transition-all disabled:opacity-60"
          >
            {submitting ? "Evaluating..." : "Submit for AI judge"}
          </button>
        </div>

        {result && (
          <div className="mt-5 rounded-2xl border-2 border-[var(--green-primary)]/30 bg-[var(--green-primary)]/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-[var(--green-primary)]" />
              <p className="text-sm font-black text-[var(--green-primary)]">Structured feedback</p>
            </div>

            <div className="space-y-3 mb-4">
              <ScoreBar label="User understanding" score={result.scores.user_focus} />
              <ScoreBar label="Structure" score={result.scores.structure} />
              <ScoreBar label="Data thinking" score={result.scores.data_thinking} />
              <ScoreBar label="Trade-offs" score={result.scores.tradeoffs} />
            </div>

            <div className="space-y-2">
              {result.feedbackComments.map((comment, idx) => (
                <p key={idx} className="text-sm text-white/85">• {comment}</p>
              ))}
            </div>

            <p className="text-xs text-[var(--text-secondary)] mt-3">
              Tomorrow focus: <span className="text-white font-bold">{result.tomorrowFocus}</span>
            </p>

            {paywallNotice && (
              <div className="mt-4 rounded-xl border-2 border-[var(--purple-primary)]/30 bg-[var(--purple-primary)]/15 p-3">
                <p className="text-xs text-[var(--purple-primary)] font-bold mb-2">{paywallNotice}</p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide text-white bg-[var(--purple-primary)] hover:opacity-90 px-3 py-1.5 rounded-xl transition-all"
                >
                  Get credits <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <Link href="/dashboard" className="text-xs text-[var(--text-secondary)] font-bold hover:text-white transition-colors">
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
