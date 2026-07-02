"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Zap, Target, Trophy, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "welcome" | "why" | "goal" | "streak" | "ready";

const WHY_OPTIONS = [
  { id: "career", label: "Level up my PM career", icon: "🚀" },
  { id: "interview", label: "Prepare for PM interviews", icon: "💼" },
  { id: "curiosity", label: "Stay sharp with daily learning", icon: "🧠" },
  { id: "leadership", label: "Become a better product leader", icon: "👑" },
];

const STREAK_GOALS = [
  { days: 7, label: "7 days", desc: "Great for getting started", badge: "🔥" },
  { days: 14, label: "14 days", desc: "Build a real habit", badge: "⚡" },
  { days: 30, label: "30 days", desc: "PMs who hit 30 days master 3x more frameworks", badge: "💎" },
];

const DAILY_GOALS = [
  { count: 1, label: "Casual", desc: "1 lesson/day — 2 min", tagline: "Perfect start" },
  { count: 2, label: "Regular", desc: "2 lessons/day — 5 min", tagline: "Most popular" },
  { count: 3, label: "Intense", desc: "3 lessons/day — 8 min", tagline: "Fast learner" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [selectedWhy, setSelectedWhy] = useState<string | null>(null);
  const [streakGoal, setStreakGoal] = useState<number | null>(null);
  const [dailyGoal, setDailyGoal] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showReadyDetails, setShowReadyDetails] = useState(false);

  const learningGoalFromWhy = (why: string | null) => {
    switch (why) {
      case "career":
        return "breaking_in";
      case "interview":
        return "interview_prep";
      case "curiosity":
        return "staying_sharp";
      case "leadership":
        return "lead_strategy";
      default:
        return "staying_sharp";
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dailyGoal: dailyGoal ?? 1,
        streakGoal: streakGoal ?? 7,
        learningGoal: learningGoalFromWhy(selectedWhy),
      }),
    });
    router.push("/dashboard");
  };

  const steps: Step[] = ["welcome", "why", "goal", "streak", "ready"];
  const currentIdx = steps.indexOf(step);
  const progress = ((currentIdx + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--bg-secondary)]">
        <motion.div
          className="h-full bg-[var(--green-primary)] rounded-r-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6 sm:py-8">
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {step === "welcome" && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <Flame size={56} className="mx-auto text-[var(--orange-primary)] streak-flame mb-5" />
                <h1 className="text-2xl font-black tracking-tight mb-0.5">
                  Welcome to <span className="text-[var(--green-primary)]">PM</span> Streak
                </h1>
                <p className="text-[10px] font-bold text-[var(--text-secondary)] tracking-wide mb-2">by learnanything.pro</p>
                <p className="text-[var(--text-secondary)] text-sm mb-1.5">
                  Learn product management in 2-3 minutes a day.
                </p>
                <p className="text-[var(--text-secondary)] text-xs mb-6">
                  Complete one lesson a day. Miss a day, lose your streak.
                </p>
                <button
                  onClick={() => setStep("why")}
                  className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  Let&apos;s Go <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {step === "why" && (
              <motion.div
                key="why"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-xl font-black tracking-tight mb-1">Why are you here?</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-5">Pick one main goal</p>
                <div className="space-y-2.5 mb-7">
                  {WHY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedWhy(opt.id)}
                      className={cn(
                        "w-full p-3.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] text-left text-sm font-bold transition-all flex items-center gap-3",
                        selectedWhy === opt.id
                          ? "border-[var(--green-primary)] bg-[var(--green-primary)]/10"
                          : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]/50"
                      )}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>{opt.label}</span>
                      {selectedWhy === opt.id && <Check size={16} className="ml-auto text-[var(--green-primary)]" />}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("streak")}
                  disabled={!selectedWhy}
                  className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black text-sm uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === "streak" && (
              <motion.div
                key="streak"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Target size={20} className="text-[var(--orange-primary)]" />
                  <h2 className="text-xl font-black tracking-tight">Set your streak goal</h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-5">
                  How many consecutive days do you want to learn?
                </p>
                <div className="space-y-2.5 mb-7">
                  {STREAK_GOALS.map((g) => (
                    <button
                      key={g.days}
                      onClick={() => setStreakGoal(g.days)}
                      className={cn(
                        "w-full p-3.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] text-left transition-all",
                        streakGoal === g.days
                          ? "border-[var(--orange-primary)] bg-[var(--orange-primary)]/10"
                          : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{g.badge}</span>
                            <span className="font-bold text-sm">{g.label}</span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{g.desc}</p>
                        </div>
                        {streakGoal === g.days && <Check size={16} className="text-[var(--orange-primary)]" />}
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("goal")}
                  disabled={!streakGoal}
                  className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black text-sm uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === "goal" && (
              <motion.div
                key="goal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={20} className="text-[var(--gold-primary)]" />
                  <h2 className="text-xl font-black tracking-tight">Daily pace</h2>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-5">
                  How much do you want to learn each day?
                </p>
                <div className="space-y-2.5 mb-7">
                  {DAILY_GOALS.map((g) => (
                    <button
                      key={g.count}
                      onClick={() => setDailyGoal(g.count)}
                      className={cn(
                        "w-full p-3.5 rounded-2xl border-2 border-b-4 active:border-b-2 active:translate-y-[2px] text-left transition-all relative overflow-hidden",
                        dailyGoal === g.count
                          ? "border-[var(--gold-primary)] bg-[var(--gold-primary)]/10"
                          : "border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--text-secondary)]/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm">{g.label}</div>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{g.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {g.tagline === "Most popular" && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--green-primary)]/20 text-[var(--green-primary)] font-black uppercase tracking-wide">
                              Popular
                            </span>
                          )}
                          {dailyGoal === g.count && <Check size={16} className="text-[var(--gold-primary)]" />}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("ready")}
                  disabled={!dailyGoal}
                  className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black text-sm uppercase tracking-wide transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Trophy size={64} className="mx-auto text-[var(--gold-primary)] mb-4" />
                </motion.div>
                <h2 className="text-2xl font-black tracking-tight mb-2">You&apos;re all set!</h2>
                <p className="text-sm text-[var(--text-secondary)] mb-5">
                  Your goal: <strong className="text-white">{streakGoal}-day streak</strong>,{" "}
                  <strong className="text-white">{dailyGoal} lesson{(dailyGoal ?? 1) > 1 ? "s" : ""}/day</strong>
                </p>

                <button
                  type="button"
                  onClick={() => setShowReadyDetails((prev) => !prev)}
                  className="w-full mb-4 rounded-xl border-2 border-b-4 border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-2.5 flex items-center justify-between active:border-b-2 active:translate-y-[2px] transition-all"
                >
                  <span className="text-xs font-black">How PM Streak works</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                    {showReadyDetails ? "Hide" : "Show"}
                  </span>
                </button>

                {showReadyDetails && (
                  <div className="bg-[var(--bg-card)] rounded-2xl border-2 border-[var(--border-color)] p-4 mb-6 space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Flame size={18} className="text-[var(--orange-primary)] flex-shrink-0" />
                      <div>
                        <span className="font-bold">Complete a lesson, extend your streak.</span>
                        <span className="text-[var(--text-secondary)]"> Miss a day, it resets.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-lg flex-shrink-0">❄️</span>
                      <div>
                        <span className="font-bold">You have 2 free streak freezes.</span>
                        <span className="text-[var(--text-secondary)]"> They protect you when you miss a day.</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Zap size={18} className="text-[var(--gold-primary)] flex-shrink-0" />
                      <div>
                        <span className="font-bold">Earn XP with every lesson.</span>
                        <span className="text-[var(--text-secondary)]"> Level up and climb the leaderboard.</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleFinish}
                  disabled={saving}
                  className="w-full py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white font-black text-sm uppercase tracking-wide transition-all disabled:opacity-50"
                >
                  {saving ? "Starting..." : "Commit to My Goal"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
