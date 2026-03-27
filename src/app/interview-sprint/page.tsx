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
        <p className="text-xs font-bold text-white/75">{label}</p>
        <p className="text-xs font-black text-white">{score}/5</p>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
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
        <p className="text-sm text-white/70 font-bold">Loading your daily PM drill...</p>
      </div>
    );
  }

  if (!drill) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col items-center justify-center px-6 pb-24">
        <AlertTriangle size={46} className="text-red-400 mb-3" />
        <p className="text-sm text-white/80 text-center max-w-md">
          {error ?? "No daily drill yet. Set a target role and timeline first."}
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/jobs" className="px-4 py-2 rounded-xl bg-[var(--green-primary)] text-white text-xs font-black">
            Set target
          </Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-xl border border-white/20 text-white text-xs font-black">
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
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[var(--green-primary)] bg-[var(--green-primary)]/10 px-2.5 py-1 rounded-full">
            <Mic size={12} />
            Daily case
          </div>
          <h1 className="text-2xl font-black mt-2">Day {drill.dayIndex} of your sprint</h1>
          <p className="text-sm text-white/60 mt-1">
            Target role: <span className="text-white/85 font-bold">{drill.targetTitle}</span>
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-5">
          <p className="text-xs font-black text-white/60 uppercase tracking-wider mb-2">{drill.lesson.title}</p>
          <p className="text-sm text-white/85 whitespace-pre-wrap leading-relaxed">{drill.lesson.promptText}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(drill.skillTags.length > 0 ? drill.skillTags : drill.lesson.skillTags ?? []).map((tag) => (
              <span key={tag} className="text-[10px] font-black bg-white/10 px-2 py-1 rounded-full text-white/75">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-black text-white/60 uppercase tracking-wider mb-2">Your answer</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your response. Most users spend 5-10 minutes."
            className="w-full min-h-48 rounded-xl bg-black/20 border border-white/10 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[var(--green-primary)]/40"
          />
          {error && <p className="text-xs text-red-300 font-bold mt-2">{error}</p>}
          <button
            onClick={submitAnswer}
            disabled={submitting}
            className="mt-4 w-full py-3 rounded-xl bg-[var(--green-primary)] text-white text-sm font-black uppercase tracking-wider disabled:opacity-60"
          >
            {submitting ? "Evaluating..." : "Submit for AI judge"}
          </button>
        </div>

        {result && (
          <div className="mt-5 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={16} className="text-green-300" />
              <p className="text-sm font-black text-green-300">Structured feedback</p>
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

            <p className="text-xs text-white/70 mt-3">
              Tomorrow focus: <span className="text-white">{result.tomorrowFocus}</span>
            </p>

            {paywallNotice && (
              <div className="mt-4 rounded-xl border border-purple-500/30 bg-purple-500/15 p-3">
                <p className="text-xs text-purple-200 font-bold mb-2">{paywallNotice}</p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-xs font-black text-white bg-purple-500 px-3 py-1.5 rounded-lg"
                >
                  Get credits <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <Link href="/dashboard" className="text-xs text-[var(--text-secondary)] font-bold hover:text-white">
            ← Back to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
