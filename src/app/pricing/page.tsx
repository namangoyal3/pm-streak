"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Flame, Check, X, Zap, Star, BookOpen, Brain, Target,
  Users, Sparkles, MessageSquare, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FREE_FEATURES = [
  { text: "22 core curriculum lessons", yes: true },
  { text: "10 archive lessons (batch-unlocked)", yes: true },
  { text: "10 credits / month", yes: true },
  { text: "1 AI Explore lesson / day", yes: true },
  { text: "Streak tracking & gems", yes: true },
  { text: "Daily challenge", yes: true },
  { text: "All 292+ archive lessons", yes: false },
  { text: "50 credits / month", yes: false },
  { text: "Unlimited AI Explore lessons", yes: false },
  { text: "PM Leader lessons (Shreyas, Aakash…)", yes: false },
  { text: "AI Interview prep sessions", yes: false },
  { text: "PM Jobs board", yes: false },
  { text: "WhatsApp PM community", yes: false },
];

const PRO_FEATURES = [
  { text: "Everything in Free", yes: true },
  { text: "All 292+ archive lessons unlocked", yes: true },
  { text: "50 credits / month", yes: true },
  { text: "Unlimited AI Explore lessons", yes: true },
  { text: "PM Leader lessons (Shreyas, Aakash, Marty…)", yes: true },
  { text: "AI Interview prep (unlimited sessions)", yes: true },
  { text: "PM Jobs board with apply links", yes: true },
  { text: "WhatsApp PM community access", yes: true },
  { text: "Priority support", yes: true },
];

const CREDIT_COSTS = [
  { icon: <BookOpen size={14} />, action: "Unlock next lesson batch (5 lessons)", cost: 5 },
  { icon: <Sparkles size={14} />, action: "AI Explore lesson", cost: 2 },
  { icon: <Brain size={14} />, action: "Interview prep session (5 questions)", cost: 5 },
];

export default function PricingPage() {
  const [upiCopied, setUpiCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("pmstreak@upi").catch(() => {});
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <Flame size={22} className="text-orange-400" />
            <span className="text-green-400">PM</span>
            <span className="text-white">Streak</span>
          </Link>
          <Link href="/dashboard" className="text-xs font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1">
            Back to dashboard <ChevronRight size={12} />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 pb-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-black text-purple-300 uppercase tracking-wider mb-4">
            <Star size={12} /> Pro Plan
          </div>
          <h1 className="text-4xl font-black mb-3">
            Learn PM like a{" "}
            <span className="text-green-400">pro</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Unlock all 292+ Lenny&apos;s Podcast lessons, unlimited AI lessons, PM leader content, interview prep, and the job board.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free */}
          <div className="rounded-2xl border-2 border-white/10 p-6 bg-white/5">
            <div className="mb-4">
              <h2 className="text-lg font-black mb-1">Free</h2>
              <div className="text-3xl font-black">₹0</div>
              <p className="text-xs text-white/50 mt-1">Forever free, no credit card</p>
            </div>
            <ul className="space-y-2.5 mb-6">
              {FREE_FEATURES.map((f) => (
                <li key={f.text} className={cn("flex items-start gap-2 text-xs", f.yes ? "text-white/80" : "text-white/30 line-through")}>
                  {f.yes
                    ? <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    : <X size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  }
                  {f.text}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="block w-full py-3 text-center text-sm font-black rounded-xl border-2 border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">
              Continue Free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-purple-500/50 p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/20 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-purple-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                Best Value
              </span>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-black mb-1">Pro</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">₹499</span>
                <span className="text-white/50 text-sm">/ month</span>
              </div>
              <p className="text-xs text-purple-300/70 mt-1">Or ₹1,899 / year (save 68%)</p>
            </div>
            <ul className="space-y-2.5 mb-6">
              {PRO_FEATURES.map((f) => (
                <li key={f.text} className="flex items-start gap-2 text-xs text-white/85">
                  <Check size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  {f.text}
                </li>
              ))}
            </ul>

            {/* UPI Payment */}
            <div className="bg-black/30 rounded-xl p-4 border border-purple-500/20">
              <p className="text-xs font-black text-purple-300 mb-2 text-center">Pay via UPI / Scan QR</p>
              <div className="flex items-center justify-center mb-3">
                {/* QR placeholder — replace with actual QR image */}
                <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center text-[10px] text-black font-bold">
                  <img src="/india-upi-monthly.png" alt="UPI QR" className="w-full h-full object-contain rounded-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              </div>
              <div className="flex items-center gap-2 bg-black/30 rounded-lg px-3 py-2 mb-2">
                <span className="text-xs text-white/60 flex-1 font-mono">pmstreak@upi</span>
                <button onClick={handleCopy} className="text-[10px] font-black text-purple-400 hover:text-purple-300 transition-colors">
                  {upiCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-[10px] text-white/40 text-center">
                After payment, message us on WhatsApp or email to activate your account.
              </p>
            </div>
          </div>
        </div>

        {/* Credits Explainer */}
        <div className="rounded-2xl border-2 border-white/10 p-6 mb-12 bg-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-purple-400" />
            <h2 className="text-base font-black">How Credits Work</h2>
          </div>
          <p className="text-xs text-white/60 mb-4">
            Credits are separate from gems. They reset monthly and are used to access premium features.
            Free users get <strong className="text-white">10 credits/month</strong>. Pro users get <strong className="text-white">50 credits/month</strong> (plus all lessons already unlocked).
          </p>
          <div className="space-y-2">
            {CREDIT_COSTS.map((c) => (
              <div key={c.action} className="flex items-center gap-3 text-xs">
                <span className="text-purple-400">{c.icon}</span>
                <span className="flex-1 text-white/70">{c.action}</span>
                <span className="font-black text-purple-300 flex items-center gap-1">
                  <Zap size={10} /> {c.cost}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <BookOpen size={20} className="text-green-400" />, title: "292+ Archive Lessons", desc: "Full Lenny's Podcast library — Shreyas, Reforge, Figma, Stripe PMs and more." },
            { icon: <Brain size={20} className="text-blue-400" />, title: "AI Interview Prep", desc: "5 PM interview questions with frameworks per session — strategy, metrics, execution." },
            { icon: <Target size={20} className="text-orange-400" />, title: "PM Jobs Board", desc: "Curated PM roles from Wellfound, LinkedIn and Himalayas, updated weekly." },
            { icon: <Sparkles size={20} className="text-purple-400" />, title: "Unlimited AI Lessons", desc: "Generate lessons on any PM topic — grounded in real podcast transcripts." },
            { icon: <Users size={20} className="text-pink-400" />, title: "PM Leader Lessons", desc: "Bite-sized lessons from Shreyas Doshi, Aakash Gupta, Marty Cagan and more." },
            { icon: <MessageSquare size={20} className="text-cyan-400" />, title: "WhatsApp Community", desc: "Private group with active PMs, job referrals, and peer accountability." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <div className="mb-2">{f.icon}</div>
              <h3 className="text-sm font-black mb-1">{f.title}</h3>
              <p className="text-[11px] text-white/55">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          <h2 className="text-base font-black mb-4">FAQ</h2>
          {[
            { q: "When will my Pro access activate?", a: "Within a few hours of payment confirmation. Message us on WhatsApp or email with your UPI reference number." },
            { q: "Are credits cumulative?", a: "No — they reset on the 1st of each month. Unused credits don't roll over." },
            { q: "Can I cancel anytime?", a: "Yes. Monthly plans are not auto-renewed — you pay each month manually." },
            { q: "What's the yearly plan?", a: "₹1,899/year (vs ₹5,988 yearly at monthly rate) — pay once, stay Pro for 12 months." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <h3 className="text-xs font-black mb-1.5">{item.q}</h3>
              <p className="text-[11px] text-white/55">{item.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
