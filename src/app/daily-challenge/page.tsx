"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import QuizView from "@/components/QuizView";
import { ArrowLeft, Zap, Calendar, Trophy } from "lucide-react";
import Link from "next/link";

export default function DailyChallengePage() {
  const router = useRouter();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/daily-challenge");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      setChallenge(data.challenge);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleComplete = useCallback(
    async (answers: { questionId: string; selectedIndex: number }[]) => {
      if (!challenge) return null;

      const correctCount = answers.filter((a) => {
        const q = challenge.lesson.questions.find(
          (q: any) => q.id === a.questionId
        );
        return q && q.correctIndex === a.selectedIndex;
      }).length;

      const xpEarned =
        challenge.lesson.xpReward +
        answers.reduce((sum: number, a: any) => {
          const q = challenge.lesson.questions.find(
            (q: any) => q.id === a.questionId
          );
          return sum + (q && q.correctIndex === a.selectedIndex ? q.xpReward : 0);
        }, 0);

      const lessonRes = await fetch(`/api/lessons/${challenge.lesson.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: correctCount, answers }),
      });

      await fetch("/api/daily-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId: challenge.id,
          score: correctCount,
          xpEarned,
        }),
      });

      if (lessonRes.ok) return await lessonRes.json();
      return null;
    },
    [challenge]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">
          Loading daily challenge...
        </div>
      </div>
    );
  }

  if (!challenge) return null;

  if (challenge.completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <Trophy size={64} className="text-[var(--gold-primary)] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Daily Challenge Complete!</h1>
        <p className="text-[var(--text-secondary)] mb-2">
          You earned {challenge.xpEarned} XP today.
        </p>
        <p className="text-[var(--text-secondary)] text-sm mb-6">
          Come back tomorrow for a new challenge.
        </p>
        <Link
          href="/dashboard"
          className="px-6 py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[var(--orange-primary)]" />
              <span className="text-xs text-[var(--orange-primary)] font-bold uppercase">
                Daily Challenge
              </span>
            </div>
            <h1 className="text-sm font-bold truncate">{challenge.lesson.title}</h1>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-[var(--gold-primary)] bg-[var(--gold-primary)]/10 px-2 py-1 rounded-full">
            <Zap size={12} /> 2x XP
          </div>
        </div>
      </header>

      <QuizView
        lessonTitle={challenge.lesson.title}
        content={challenge.lesson.content}
        questions={challenge.lesson.questions}
        xpReward={challenge.lesson.xpReward}
        onComplete={handleComplete}
      />
    </div>
  );
}
