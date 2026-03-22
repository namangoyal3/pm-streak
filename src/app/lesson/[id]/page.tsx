"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import QuizView from "@/components/QuizView";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LessonData {
  id: string;
  title: string;
  content: string;
  xpReward: number;
  aiGenerated: boolean;
  youtubeId: string | null;
  youtubeStart: number | null;
  youtubeEnd: number | null;
  guestName: string | null;
  episodeTitle: string | null;
  sourceTranscript: string | null;
  goDeeperTopic: string | null;
  goDeeperSourceLessonId: string | null;
  relatedLessons: {
    id: string;
    title: string;
    description: string;
    isLocked: boolean;
    completed: boolean;
  }[];
  category: { name: string; icon: string };
  questions: {
    id: string;
    questionText: string;
    questionType: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    xpReward: number;
  }[];
  completed: boolean;
  previousScore: number | null;
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakGoal, setStreakGoal] = useState(7);

  useEffect(() => {
    async function load() {
      try {
        const [lessonRes, userRes] = await Promise.all([
          fetch(`/api/lessons/${id}`),
          fetch("/api/auth/me"),
        ]);
        if (!lessonRes.ok) {
          router.push("/dashboard");
          return;
        }
        const data = await lessonRes.json();
        setLesson(data.lesson);
        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentStreak(userData.user?.streakCount ?? 0);
          setStreakGoal(userData.user?.streakGoal ?? 7);
        }
      } catch {
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleComplete = useCallback(
    async (answers: { questionId: string; selectedIndex: number }[]) => {
      if (!lesson || completed) return null;
      setCompleted(true);

      try {
        const res = await fetch(`/api/lessons/${id}/complete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            score: answers.filter((a) => {
              const q = lesson.questions.find((q) => q.id === a.questionId);
              return q && q.correctIndex === a.selectedIndex;
            }).length,
            answers,
          }),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.error("Failed to save completion:", err);
      }
      return null;
    },
    [lesson, id, completed]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--green-primary)] text-lg font-bold">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-white p-2 -ml-2 rounded-xl">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[var(--text-secondary)]">
              {lesson.category.icon} {lesson.category.name}
            </div>
            <h1 className="text-sm font-bold truncate">{lesson.title}</h1>
          </div>
        </div>
      </header>

      <QuizView
        lessonTitle={lesson.title}
        content={lesson.content}
        questions={lesson.questions}
        xpReward={lesson.xpReward}
        aiGenerated={lesson.aiGenerated}
        youtubeId={lesson.youtubeId}
        youtubeStart={lesson.youtubeStart}
        youtubeEnd={lesson.youtubeEnd}
        guestName={lesson.guestName}
        episodeTitle={lesson.episodeTitle}
        sourceTranscript={lesson.sourceTranscript}
        relatedLessons={lesson.relatedLessons}
        goDeeperTopic={lesson.goDeeperTopic}
        goDeeperSourceLessonId={lesson.goDeeperSourceLessonId}
        currentStreak={currentStreak}
        streakGoal={streakGoal}
        onComplete={handleComplete}
      />
    </div>
  );
}
