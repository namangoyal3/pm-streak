"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const GOAL_OPTIONS = [
  { id: "breaking_in", label: "Break into PM", desc: "No PM experience yet", icon: "🚀" },
  { id: "interview_prep", label: "PM Interview Prep", desc: "Preparing for PM interviews", icon: "💼" },
  { id: "staying_sharp", label: "Stay Sharp", desc: "Current PM keeping skills fresh", icon: "🧠" },
  { id: "lead_strategy", label: "Level Up to Senior / Lead", desc: "Grow from PM to leadership", icon: "👑" },
];

const STORAGE_KEY = "pm-streak-goal-modal-dismissed";

interface Props {
  onClose: () => void;
  onSaved: (goalKey: string) => void;
}

export default function GoalSelectionModal({ onClose, onSaved }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/learning-goal", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learningGoal: selected }),
      });
      if (!res.ok) throw new Error("save failed");
      localStorage.setItem(STORAGE_KEY, "1");
      onSaved(selected);
    } catch {
      setSaving(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-sm rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-white">Personalise your path</h2>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                No progress lost — just smarter lesson ordering.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Goal options */}
          <div className="space-y-2.5 mb-5">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={cn(
                  "w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3",
                  selected === opt.id
                    ? "border-[var(--green-primary)] bg-[var(--green-primary)]/10"
                    : "border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-secondary)]"
                )}
              >
                <span className="text-xl flex-shrink-0">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white">{opt.label}</div>
                  <div className="text-[11px] text-[var(--text-secondary)]">{opt.desc}</div>
                </div>
                {selected === opt.id && (
                  <Check size={16} className="flex-shrink-0 text-[var(--green-primary)]" />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 py-2.5 rounded-2xl border border-[var(--border-color)] text-sm font-bold text-[var(--text-secondary)] hover:text-white hover:border-[var(--text-secondary)] transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={handleSave}
              disabled={!selected || saving}
              className="flex-1 py-2.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-sm font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? "Saving…" : "Set my goal"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export { STORAGE_KEY as GOAL_MODAL_STORAGE_KEY };
