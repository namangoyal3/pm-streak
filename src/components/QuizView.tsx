"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap, ArrowRight, Trophy, Flame, Target } from "lucide-react";
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
}

interface QuizViewProps {
  lessonTitle: string;
  content: string;
  questions: Question[];
  xpReward: number;
  youtubeId?: string | null;
  youtubeStart?: number | null;
  youtubeEnd?: number | null;
  guestName?: string | null;
  episodeTitle?: string | null;
  currentStreak?: number;
  streakGoal?: number;
  onComplete: (answers: { questionId: string; selectedIndex: number }[]) => Promise<StreakResult | null>;
}

type Phase = "lesson" | "quiz" | "result";

export default function QuizView({ lessonTitle, content, questions, xpReward, youtubeId, youtubeStart, youtubeEnd, guestName, episodeTitle, currentStreak = 0, streakGoal = 7, onComplete }: QuizViewProps) {
  const [phase, setPhase] = useState<Phase>("lesson");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: string; selectedIndex: number }[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [showXPPop, setShowXPPop] = useState(false);
  const [streakResult, setStreakResult] = useState<StreakResult | null>(null);
  const [milestoneToShow, setMilestoneToShow] = useState<string | null>(null);
  const [newBatchUnlocked, setNewBatchUnlocked] = useState(false);
  const [newBatchCount, setNewBatchCount] = useState(0);

  const question = questions[currentQ];
  const isCorrect = selected === question?.correctIndex;
  const progress = phase === "lesson" ? 0 : ((currentQ + (confirmed ? 1 : 0)) / questions.length) * 100;

  const handleConfirm = useCallback(() => {
    if (selected === null) return;

    setConfirmed(true);
    const newAnswers = [...answers, { questionId: question.id, selectedIndex: selected }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setCorrectCount((c) => c + 1);
      setXpGained((x) => x + question.xpReward);
      setShowXPPop(true);
      setTimeout(() => setShowXPPop(false), 1000);
    }
  }, [selected, answers, question, isCorrect]);

  const handleNext = useCallback(async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setPhase("result");
      const result = await onComplete(answers);
      if (result) {
        setStreakResult(result);
        if (result.milestone) setMilestoneToShow(result.milestone);
        if ((result as any).newBatchUnlocked) {
          setNewBatchUnlocked(true);
          setNewBatchCount((result as any).newBatchCount ?? 5);
          // Signal dashboard to show celebration on return
          try { sessionStorage.setItem("lessonsUnlocked", String((result as any).newBatchCount ?? 5)); } catch { /* ignore */ }
        }
      }
    }
  }, [currentQ, questions.length, answers, onComplete]);

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
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4 py-8 text-center"
        >
          {/* Streak hero */}
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-3 mb-3"
            >
              <Flame
                size={56}
                className={cn("streak-flame", isGoldStreak ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]")}
              />
              <span className={cn("text-6xl font-bold", isGoldStreak ? "text-[var(--gold-primary)]" : "text-[var(--orange-primary)]")}>
                {newStreak}
              </span>
            </motion.div>
            <h1 className="text-2xl font-bold mb-1">
              {newStreak === 1 ? "Streak started!" : `Day ${newStreak} streak!`}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">
              {score >= 80 ? "Crushed it — keep this streak alive." : score >= 50 ? "Good work — come back tomorrow." : "Done for today. See you tomorrow!"}
            </p>
          </div>

          {/* Streak goal progress */}
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
              {goalReached && (
                <p className="text-[10px] text-[var(--gold-primary)] font-bold mt-1 text-center">🏆 Goal reached!</p>
              )}
            </div>
          )}

          {/* XP + Score stats */}
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

          {/* New lessons unlocked celebration */}
          {newBatchUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="bg-gradient-to-r from-[var(--green-primary)]/20 to-[var(--blue-primary)]/20 border border-[var(--green-primary)]/40 rounded-2xl p-4 mb-4 text-center"
            >
              <div className="text-3xl mb-1">🎉</div>
              <div className="text-sm font-black text-[var(--green-primary)]">
                {newBatchCount} new lessons unlocked!
              </div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">
                You completed all available lessons. Fresh content waiting on the dashboard.
              </div>
            </motion.div>
          )}

          <a
            href="/dashboard"
            className="block w-full py-3 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white font-bold text-sm uppercase tracking-wide transition-colors mb-3 flex items-center justify-center gap-2"
          >
            {newBatchUnlocked ? "See New Lessons" : "Keep My Streak Going"} <ArrowRight size={16} />
          </a>

          <button
            onClick={() => {
              const text = `Day ${newStreak} streak on PM Streak! Just finished "${lessonTitle}" — learning PM skills in 2-3 mins/day from Lenny's Podcast.`;
              if (navigator.share) {
                navigator.share({ title: "PM Streak", text, url: window.location.origin });
              } else {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin)}`;
                window.open(twitterUrl, "_blank");
              }
            }}
            className="w-full py-3 rounded-2xl border-2 border-[var(--purple-primary)] text-[var(--purple-primary)] hover:bg-[var(--purple-primary)]/10 font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            Share My Streak
          </button>
        </motion.div>

        <StreakCelebration
          milestone={milestoneToShow}
          streakCount={newStreak}
          perfectStreak={perfectStreak}
          onClose={() => setMilestoneToShow(null)}
        />
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Progress bar */}
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
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all text-sm font-medium",
                  !confirmed && selected === i
                    ? "border-[var(--blue-primary)] bg-[var(--blue-primary)]/10"
                    : !confirmed
                    ? "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]"
                    : confirmed && i === question.correctIndex
                    ? "border-[var(--green-primary)] bg-[var(--green-primary)]/10"
                    : confirmed && selected === i && !isCorrect
                    ? "border-[var(--red-primary)] bg-[var(--red-primary)]/10"
                    : "border-[var(--border-color)] bg-[var(--bg-card)] opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                      !confirmed && selected === i
                        ? "border-[var(--blue-primary)] text-[var(--blue-primary)]"
                        : confirmed && i === question.correctIndex
                        ? "border-[var(--green-primary)] bg-[var(--green-primary)] text-white"
                        : confirmed && selected === i && !isCorrect
                        ? "border-[var(--red-primary)] bg-[var(--red-primary)] text-white"
                        : "border-[var(--border-color)] text-[var(--text-secondary)]"
                    )}
                  >
                    {confirmed && i === question.correctIndex ? (
                      <Check size={14} />
                    ) : confirmed && selected === i && !isCorrect ? (
                      <X size={14} />
                    ) : (
                      String.fromCharCode(65 + i)
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
                  <>
                    <Check size={16} className="text-[var(--green-primary)]" /> Correct!
                  </>
                ) : (
                  <>
                    <X size={16} className="text-[var(--red-primary)]" /> Incorrect
                  </>
                )}
              </div>
              <p className="text-[var(--text-secondary)]">{question.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* XP Pop */}
      <AnimatePresence>
        {showXPPop && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 text-[var(--gold-primary)] font-bold text-xl flex items-center gap-1"
          >
            <Zap size={20} /> +{question.xpReward} XP
          </motion.div>
        )}
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
}
