"use client";

import { Sparkles, Zap, Trophy, BookOpen, X, CheckCircle2, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ds } from "@/lib/ds";
import { useState } from "react";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export default function ProModal({ isOpen, onClose, reason }: ProModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    setLoading(true);
    window.location.href = "/pricing";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[var(--bg-card)] rounded-[2rem] border-2 border-[var(--border-color)] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header Visual */}
        <div className="relative h-32 bg-gradient-to-br from-[var(--green-primary)] to-[var(--blue-primary)] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl -translate-y-16 translate-x-16" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-black rounded-full blur-3xl translate-y-16 -translate-x-16" />
          </div>
          <Crown size={48} className="text-white drop-shadow-lg" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black mb-2 tracking-tight">PM Streak Pro</h2>
            {reason ? (
              <p className="text-sm text-[var(--gold-primary)] font-bold">{reason}</p>
            ) : (
              <p className="text-sm text-[var(--text-secondary)] font-bold">The ultimate toolkit for becoming a top 1% PM.</p>
            )}
          </div>

          <div className="space-y-4 mb-10">
            {[
              { icon: <Sparkles size={16} className="text-[var(--gold-primary)]" />, title: "Unlimited Deep Dives", desc: "No daily limits. Master any topic instantly." },
              { icon: <Zap size={16} className="text-[var(--blue-primary)]" />, title: "Interview Sprints", desc: "AI-powered drills for high-stakes interviews." },
              { icon: <Trophy size={16} className="text-[var(--orange-primary)]" />, title: "Premium Analytics", desc: "See your skill gaps across 20+ PM categories." },
            ].map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-[var(--surface-1)] flex items-center justify-center flex-shrink-0 shadow-inner">
                  {f.icon}
                </div>
                <div>
                   <h4 className="text-xs font-black uppercase tracking-wider text-white/90">{f.title}</h4>
                   <p className="text-[11px] text-[var(--text-secondary)] font-bold">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-black text-sm font-black transition-all shadow-xl shadow-[var(--green-primary)]/10 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Loading..." : "See Pro Plans →"}
          </button>
          
          <p className="mt-5 text-[11px] font-bold text-[var(--text-secondary)]">
          Cancel anytime. Unlocks all 292+ lessons.
          <br />
          <span className="opacity-80 font-medium">From ₹249/month · $6/month</span>
        </p>
      </div>
      </div>
    </div>
  );
}
