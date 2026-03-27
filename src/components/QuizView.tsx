"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Zap,
  ArrowRight,
  Trophy,
  Flame,
  Target,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import YouTubeEmbed from "./YouTubeEmbed";
import StreakCelebration from "./StreakCelebration";

interface Question {
  id: string;
  questionText: string;
  questionType: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
}

interface StreakResult {
  newStreak: number;
  milestone: string | null;
  perfectStreak: number;
  xpEarned: number;
  newBatchUnlocked?: boolean;
  newBatchCount?: number;
  unlockedLessons?: {
    id: string;
    title: string;
  }[];
}

interface QuizViewProps {
  lessonTitle: string;
  content: string;
  questions: Question[];
  xpReward: number;
  aiGenerated?: boolean;
  youtubeId?: string | null;
  youtubeStart?: number | null;
  youtubeEnd?: number | null;
  guestName?: string | null;
  episodeTitle?: string | null;
  sourceTranscript?: string | null;
  relatedLessons?: {
    id: string;
    title: string;
    description: string;
    isLocked: boolean;
    completed: boolean;
  }[];
  goDeeperTopic?: string | null;
  goDeeperSourceLessonId?: string | null;
  currentStreak?: number;
  streakGoal?: number;
  onComplete: (
    answers: { questionId: string; selectedIndex: number }[]
  ) => Promise<StreakResult | null>;
}

type Phase = "lesson" | "quiz" | "result";

export default function QuizView({
  lessonTitle,
  content,
  questions,
  xpReward,
  aiGenerated = false,
  youtubeId,
  youtubeStart,
  youtubeEnd,
  guestName,
  episodeTitle,
  sourceTranscript,
  relatedLessons = [],
  goDeeperTopic,
  goDeeperSourceLessonId,
  currentStreak = 0,
  streakGoal = 7,
  onComplete,
}: QuizViewProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("lesson");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; selectedIndex: number }[]
  >([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [showXPPop, setShowXPPop] = useState(false);
  const [streakResult, setStreakResult] = useState<StreakResult | null>(null);
  const [milestoneToShow, setMilestoneToShow] = useState<string | null>(null);
  const [archiveUnlock, setArchiveUnlock] = useState<{
    count: number;
    lessons: {
      id: string;
      title: string;
    }[];
  } | null>(null);
  const [generatingDeepDive, setGeneratingDeepDive] = useState(false);
  const [deepDiveError, setDeepDiveError] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setUser(data.user); });
  }, []);

  const question = questions[currentQ];
  const isCorrect = selected === question?.correctIndex;
  const progress =
    phase === "lesson"
      ? 0
      : ((currentQ + (confirmed ? 1 : 0)) / questions.length) * 100;

  const handleConfirm = useCallback(() => {
    if (selected === null) return;

    setConfirmed(true);
    const newAnswers = [
      ...answers,
      { questionId: question.id, selectedIndex: selected },
    ];
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((count) => count + 1);
      setXpGained((xp) => xp + question.xpReward);
      setShowXPPop(true);
      setTimeout(() => setShowXPPop(false), 1000);
    }
  }, [selected, answers, question, isCorrect]);

  const handleNext = useCallback(async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((index) => index + 1);
      setSelected(null);
      setConfirmed(false);
      return;
    }

    setPhase("result");
    const result = await onComplete(answers);
    if (!result) return;

    setStreakResult(result);
    if (result.milestone) setMilestoneToShow(result.milestone);
    if (result.newBatchUnlocked) {
      const lessons = result.unlockedLessons ?? [];
      const unlockSummary = {
        count: result.newBatchCount ?? lessons.length,
        lessons,
      };

      if (unlockSummary.count > 0 || lessons.length > 0) {
        setArchiveUnlock(unlockSummary);
        try {
          sessionStorage.setItem(
            "archiveUnlock",
            JSON.stringify(unlockSummary)
          );
        } catch {
          /* ignore */
        }
      }
    }
  }, [answers, currentQ, onComplete, questions.length]);

  const handleDeepDive = useCallback(async () => {
    if (!goDeeperTopic || !goDeeperSourceLessonId) return;

    setGeneratingDeepDive(true);
    setDeepDiveError("");

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: goDeeperTopic,
          sourceLessonId: goDeeperSourceLessonId,
          generationMode: "deep_dive",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setDeepDiveError(data.error ?? "Failed to create deep dive");
        return;
      }

      router.push(`/lesson/${data.lesson.id}`);
    } catch {
      setDeepDiveError("Failed to create deep dive");
    } finally {
      setGeneratingDeepDive(false);
    }
  }, [goDeeperSourceLessonId, goDeeperTopic, router]);

  const renderPhase = () => {
    if (phase === "lesson") {
      return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <h1 className="text-xl font-bold">{lessonTitle}</h1>

          {youtubeId && (
            <YouTubeEmbed
              videoId={youtubeId}
              startTime={youtubeStart ?? undefined}
              endTime={youtubeEnd ?? undefined}
              guestName={guestName ?? undefined}
              episodeTitle={episodeTitle ?? undefined}
            />
          )}

          <div className="bg-[var(--bg-card)] rounded-2xl p-6 text-sm leading-relaxed whitespace-pre-line text-[var(--text-secondary)]">
            {content}
          </div>

          {(sourceTranscript || relatedLessons.length > 0 || goDeeperTopic) && (
            <div className="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] space-y-4">
              <div>
                <div className="text-sm font-black flex items-center gap-2">
                  <Sparkles size={16} className="text-[var(--blue-primary)]" />
                  Go Deeper
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Use this panel when the summary gave you the gist but you want more context.
                </p>
              </div>

              {sourceTranscript && (
                <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                  <div className="text-xs font-black uppercase tracking-wide text-[var(--text-secondary)] mb-2">
                    Transcript Highlights
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] whitespace-pre-line line-clamp-6">
                    {sourceTranscript}
                  </p>
                </div>
              )}

              {relatedLessons.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-black uppercase tracking-wide text-[var(--text-secondary)]">
                    Related Lessons
                  </div>
                  {relatedLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={lesson.isLocked ? "#" : `/lesson/${lesson.id}`}
                      className={cn(
                        "block rounded-2xl border p-3 transition-colors",
                        lesson.isLocked
                          ? "border-[var(--border-color)] bg-[var(--bg-secondary)] opacity-60 cursor-not-allowed"
                          : "border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--green-primary)]/40"
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-bold truncate">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
                            {lesson.description}
                          </div>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-wide text-[var(--text-secondary)]">
                          {lesson.completed
                            ? "Done"
                            : lesson.isLocked
                              ? "Locked"
                              : "Open"}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row">
                {goDeeperTopic && goDeeperSourceLessonId && (
                  <button
                    onClick={handleDeepDive}
                    disabled={generatingDeepDive}
                    className="flex-1 py-3 rounded-2xl bg-[var(--blue-primary)] hover:opacity-90 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {generatingDeepDive ? (
                      <>
                        <Zap size={14} /> Building Deep Dive
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} /> Generate Deeper Dive {user?.plan === "pro" ? "" : "(2 Credits)"}
                      </>
                    )}
                  </button>
                )}

                <Link
                  href={
                    goDeeperTopic
                      ? `/explore?topic=${encodeURIComponent(goDeeperTopic)}&mode=deep_dive&sourceLessonId=${encodeURIComponent(goDeeperSourceLessonId ?? "")}`
                      : "/explore"
                  }
                  className="flex-1 py-3 rounded-2xl border border-[var(--border-color)] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 hover:border-[var(--green-primary)]/40"
                >
                  <ExternalLink size={14} /> Open in Explore
                </Link>
              </div>

              {deepDiveError && (
                <p className="text-xs text-[var(--red-primary)]">{deepDiveError}</p>
              )}
            </div>
          )}

          <button
            onClick={() => setPhase("quiz")}
            className="w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            Test My Knowledge <ArrowRight size={16} />
          </button>
        </div>
      );
    }

    if (phase === "result") {
      const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
      const totalXP = xpGained + xpReward;
      const newStreak = streakResult?.newStreak ?? currentStreak + 1;
      const perfectStreak = streakResult?.perfectStreak ?? 0;
      const isGoldStreak = perfectStreak >= 7;
      const goalProgress = Math.min((newStreak / streakGoal) * 100, 100);
      const goalReached = newStreak >= streakGoal;

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4 py-8 text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <Flame
                size={56}
                className={cn(
                  "streak-flame",
                  isGoldStreak ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]"
                )}
              />
              <span className={cn("text-6xl font-bold", isGoldStreak ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]")}>
                {newStreak}
              </span>
            </motion.div>
            <h1 className="text-2xl font-bold mb-1">
              {newStreak === 1 ? "Streak started!" : `Day ${newStreak} streak!`}
            </h1>
          </div>

          {streakGoal > 0 && (
            <div className="bg-[var(--bg-card)] rounded-2xl p-4 mb-4 text-left">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                  <Target size={12} /> Streak goal
                </span>
                <span className={cn("font-bold", goalReached ? "text-[var(--gold-primary)]" : "text-[var(--text-secondary)]")}>
                  {Math.min(newStreak, streakGoal)}/{streakGoal} days
                </span>
              </div>
              <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goalProgress}%` }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={cn("h-full rounded-full", goalReached ? "bg-[var(--gold-primary)]" : "bg-[var(--orange-primary)]")}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-[var(--bg-card)] rounded-2xl p-4">
              <div className="text-3xl font-bold text-[var(--gold-primary)] flex items-center justify-center gap-1">
                <Zap size={22} /> {totalXP}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">XP Earned</div>
            </div>
            <div className="bg-[var(--bg-card)] rounded-2xl p-4">
              <div className="text-3xl font-bold text-[var(--green-primary)]">{score}%</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">{correctCount}/{questions.length} Correct</div>
            </div>
          </div>

          <a
            href="/dashboard"
            className="block w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm uppercase tracking-wide transition-colors mb-3 flex items-center justify-center gap-2"
          >
            {archiveUnlock ? "See New Lessons" : "Keep My Streak Going"} <ArrowRight size={16} />
          </a>
        </motion.div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-[var(--green-primary)] rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="text-xs text-[var(--text-secondary)] mb-4">
          Question {currentQ + 1} of {questions.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-bold mb-6">{question.questionText}</h2>

            <div className="space-y-3">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => !confirmed && setSelected(optionIndex)}
                  disabled={confirmed}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border-2 transition-all text-sm font-medium",
                    !confirmed && selected === optionIndex
                      ? "border-[var(--blue-primary)] bg-[var(--blue-primary)]/10"
                      : !confirmed
                        ? "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]"
                        : confirmed && optionIndex === question.correctIndex
                          ? "border-[var(--green-primary)] bg-[var(--green-primary)]/10"
                          : confirmed && selected === optionIndex && !isCorrect
                            ? "border-[var(--red-primary)] bg-[var(--red-primary)]/10"
                            : "border-[var(--border-color)] bg-[var(--bg-card)] opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                        !confirmed && selected === optionIndex
                          ? "border-[var(--blue-primary)] text-[var(--blue-primary)]"
                          : confirmed && optionIndex === question.correctIndex
                            ? "border-[var(--green-primary)] bg-[var(--green-primary)] text-white"
                            : confirmed && selected === optionIndex && !isCorrect
                              ? "border-[var(--red-primary)] bg-[var(--red-primary)] text-white"
                              : "border-[var(--border-color)] text-[var(--text-secondary)]"
                      )}
                    >
                      {confirmed && optionIndex === question.correctIndex ? (
                        <Check size={14} />
                      ) : confirmed && selected === optionIndex && !isCorrect ? (
                        <X size={14} />
                      ) : (
                        String.fromCharCode(65 + optionIndex)
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {confirmed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 p-4 rounded-2xl text-sm",
                  isCorrect
                    ? "bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/30"
                    : "bg-[var(--red-primary)]/10 border border-[var(--red-primary)]/30"
                )}
              >
                <div className="font-bold mb-1 flex items-center gap-2">
                  {isCorrect ? (
                    <><Check size={16} className="text-[var(--green-primary)]" /> Correct!</>
                  ) : (
                    <><X size={16} className="text-[var(--red-primary)]" /> Incorrect</>
                  )}
                </div>
                <p className="text-[var(--text-secondary)]">{question.explanation}</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className={cn(
                "w-full py-3 rounded-2xl font-bold text-sm uppercase tracking-wide transition-colors",
                selected !== null
                  ? "bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-not-allowed"
              )}
            >
              Check
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              {currentQ < questions.length - 1 ? (
                <>Continue <ArrowRight size={16} /></>
              ) : (
                <>Finish <Trophy size={16} /></>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderPhase()}
      
      <StreakCelebration
        milestone={milestoneToShow}
        streakCount={streakResult?.newStreak ?? currentStreak + 1}
        perfectStreak={streakResult?.perfectStreak ?? 0}
        onClose={() => setMilestoneToShow(null)}
      />
    </>
  );
}
