import Link from "next/link";
import { headers } from "next/headers";
import {
  Flame, Check, X, Zap, Star, BookOpen, Brain, Target,
  Users, Sparkles, MessageSquare, ChevronRight,
} from "lucide-react";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isProEffective } from "@/lib/entitlements";

// Countries billed in INR (India)
const INR_COUNTRIES = new Set(["IN"]);

type PricingRegion = "INR" | "USD";

function getRegion(country: string | null): PricingRegion {
  if (country && INR_COUNTRIES.has(country)) return "INR";
  return "USD";
}

const FREE_FEATURES = [
  { text: "22 core curriculum lessons", yes: true },
  { text: "10 archive lessons (batch-unlocked)", yes: true },
  { text: "10 credits / month", yes: true },
  { text: "1 AI Explore lesson / day", yes: true },
  { text: "Streak tracking & gems", yes: true },

  { text: "All 292+ archive lessons", yes: false },
  { text: "50 credits / month", yes: false },
  { text: "Unlimited AI Explore lessons", yes: false },
  { text: "PM Leader lessons (Shreyas, Aakash…)", yes: false },
  { text: "AI Interview prep sessions", yes: false, new: true },
  { text: "PM Jobs board", yes: false, new: true },
  { text: "WhatsApp PM community", yes: false },
];

const PRO_FEATURES = [
  { text: "Everything in Free", yes: true },
  { text: "All 292+ archive lessons unlocked", yes: true },
  { text: "50 credits / month", yes: true },
  { text: "Unlimited AI Explore lessons", yes: true },
  { text: "Unlimited Deeper Dives", yes: true, new: true },
  { text: "AI Interview prep (unlimited session)", yes: true, new: true },
  { text: "Full PM Jobs board", yes: true, new: true },
  { text: "Save Notes & Recaps", yes: true },
  { text: "Role-specific Roadmaps", yes: true },
  { text: "Priority support", yes: true },
];

const CREDIT_COSTS = [
  { action: "Unlock next lesson batch (5 lessons)", cost: 5 },
  { action: "AI Explore lesson", cost: 2 },
  { action: "AI Deeper Dive", cost: 2 },
  { action: "Interview prep session (5 questions)", cost: 5 },
];

function buildCheckoutUrl(opts: {
  productId: string;
  email?: string;
  userId?: string;
  plan: string;
}) {
  const base = "/api/checkout";
  const params = new URLSearchParams({ productId: opts.productId });
  if (opts.email) params.set("email", opts.email);
  if (opts.userId) params.set("metadata_userId", opts.userId);
  if (opts.plan) params.set("metadata_plan", opts.plan);
  return `${base}?${params.toString()}`;
}

export default async function PricingPage() {
  const [userId, headersList] = await Promise.all([
    getCurrentUserId(),
    headers(),
  ]);

  // Detect country from Vercel geo header (set automatically in production)
  const country = headersList.get("x-vercel-ip-country") ?? null;
  const region = getRegion(country);
  const isIndia = region === "INR";

  let userEmail: string | undefined;
  let userPlan: string = "free";
  let dodoCustomerId: string | null | undefined;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, plan: true, trialEndsAt: true, renewsAt: true, paddleCustomerId: true },
    });
    userEmail = user?.email;
    userPlan = user?.plan ?? "free";
    dodoCustomerId = user?.paddleCustomerId ?? undefined;
    if (user && isProEffective(user)) userPlan = "pro";
  }

  // INR product IDs (India)
  const inrMonthlyId = process.env.NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID ?? "";
  const inrQuarterlyId = process.env.NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID ?? "";
  const inrYearlyId = process.env.NEXT_PUBLIC_DODO_YEARLY_PRODUCT_ID ?? "";

  // USD product IDs (International)
  const usdMonthlyId = process.env.NEXT_PUBLIC_DODO_USD_MONTHLY_PRODUCT_ID ?? "";
  const usdQuarterlyId = process.env.NEXT_PUBLIC_DODO_USD_QUARTERLY_PRODUCT_ID ?? "";
  const usdYearlyId = process.env.NEXT_PUBLIC_DODO_USD_YEARLY_PRODUCT_ID ?? "";

  const plans = isIndia
    ? [
        { key: "monthly",   title: "Monthly",   amount: "₹499",   period: "/ month",     productId: inrMonthlyId },
        { key: "quarterly", title: "Quarterly", amount: "₹1,699", period: "/ 3 months",  badge: "Best Value", savings: "Save ₹298 vs monthly",  productId: inrQuarterlyId },
        { key: "yearly",    title: "Yearly",    amount: "₹2,499", period: "/ year",       savings: "Save 58% vs monthly", productId: inrYearlyId },
      ]
    : [
        { key: "monthly",   title: "Monthly",   amount: "$9",     period: "/ month",     productId: usdMonthlyId },
        { key: "quarterly", title: "Quarterly", amount: "$24",    period: "/ 3 months",  badge: "Best Value", savings: "Save $3 vs monthly",     productId: usdQuarterlyId },
        { key: "yearly",    title: "Yearly",    amount: "$49",    period: "/ year",       savings: "Save 55% vs monthly", productId: usdYearlyId },
      ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--bg-primary)]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-1.5">
            <Flame size={22} className="text-orange-400" />
            <div className="flex flex-col leading-none">
              <div className="font-black text-xl tracking-tight flex items-center gap-1">
                <span className="text-green-400">PM</span>
                <span className="text-white">Streak</span>
              </div>
              <span className="text-[9px] font-bold text-white/40 tracking-wide">by learnanything.pro</span>
            </div>
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

        {/* Free vs Pro Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free */}
          <div className="rounded-2xl border-2 border-white/10 p-6 bg-white/5">
            <div className="mb-4">
              <h2 className="text-lg font-black mb-1">Free</h2>
              <div className="text-3xl font-black">₹0</div>
              <p className="text-xs text-white/50 mt-1">Forever free, no credit card</p>
            </div>
            <ul className="space-y-2.5 mb-6">
              {FREE_FEATURES.map((f: any) => (
                <li
                  key={f.text}
                  className={`flex items-start gap-2 text-xs ${f.yes ? "text-white/80" : "text-white/30 line-through"}`}
                >
                  {f.yes
                    ? <Check size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                    : <X size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  }
                  <span className="flex-1">{f.text}</span>
                  {f.new && (
                    <span className="bg-green-500 text-[8px] font-black text-white px-1 py-0.5 rounded-sm flex-shrink-0 animate-pulse">NEW</span>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" className="block w-full py-3 text-center text-sm font-black rounded-xl border-2 border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors">
              Continue Free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-purple-500/50 p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/20">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-black">Pro</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  {isIndia ? "🇮🇳 India pricing" : "🌍 International pricing"}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black">{isIndia ? "₹499" : "$9"}</span>
                <span className="text-white/50 text-sm">/ month</span>
              </div>
              <p className="text-xs text-purple-300/70 mt-1">
                {isIndia
                  ? "Or ₹1,699 / 3 months · Or ₹2,499 / year (save 58%)"
                  : "Or $24 / 3 months · Or $49 / year (save 55%)"
                }
              </p>
            </div>
            <ul className="space-y-2.5 mb-6">
              {PRO_FEATURES.map((f: any) => (
                <li key={f.text} className="flex items-start gap-2 text-xs text-white/85">
                  <Check size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="flex-1">{f.text}</span>
                  {f.new && (
                    <span className="bg-purple-500 text-[8px] font-black text-white px-1 py-0.5 rounded-sm flex-shrink-0 animate-pulse">NEW</span>
                  )}
                </li>
              ))}
            </ul>

            {userPlan === "pro" ? (
              <div className="rounded-xl bg-green-900/20 border border-green-500/30 p-4 text-center">
                <p className="text-sm font-black text-green-400">✓ You&apos;re already Pro!</p>
                {dodoCustomerId && (
                  <Link
                    href={`/api/customer-portal?customer_id=${dodoCustomerId}`}
                    className="mt-2 block text-xs text-white/50 hover:text-white transition-colors"
                  >
                    Manage subscription →
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {plans.map((plan) => (
                  <a
                    key={plan.key}
                    href={plan.productId
                      ? buildCheckoutUrl({ productId: plan.productId, email: userEmail, userId: userId ?? undefined, plan: plan.key })
                      : "#"
                    }
                    aria-disabled={!plan.productId}
                    className={`flex items-center justify-between w-full py-3 px-4 rounded-xl font-black text-sm transition-all ${
                      plan.key === "quarterly"
                        ? "bg-purple-500 hover:bg-purple-400 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    } ${!plan.productId ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      {plan.badge && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-white/20">
                          {plan.badge}
                        </span>
                      )}
                      Subscribe {plan.title}
                    </span>
                    <span className="text-right">
                      <span className="font-black">{plan.amount}</span>
                      <span className="text-white/60 text-xs ml-1">{plan.period}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Community */}
        <div className="rounded-2xl border-2 border-green-500/30 p-5 mb-12 bg-green-900/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={20} className="text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-green-400">WhatsApp PM Community</h3>
              <p className="text-[11px] text-white/55 mt-0.5">
                Private group with active PMs — job referrals, case study discussions, peer accountability. Pro members only.
              </p>
            </div>
            <span className="text-[10px] font-black px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 flex-shrink-0">
              PRO
            </span>
          </div>
          <p className="text-[10px] text-white/40 mt-3">
            WhatsApp link shared after Pro activation via email.
          </p>
        </div>

        {/* Credits Explainer */}
        <div className="rounded-2xl border-2 border-white/10 p-6 mb-12 bg-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-purple-400" />
            <h2 className="text-base font-black">How Credits Work</h2>
          </div>
          <p className="text-xs text-white/60 mb-4">
            Credits reset monthly and gate premium features.
            Free users get <strong className="text-white">10 credits/month</strong>. Pro users get <strong className="text-white">50 credits/month</strong> (plus all lessons already unlocked).
          </p>
          <div className="space-y-2">
            {CREDIT_COSTS.map((c) => (
              <div key={c.action} className="flex items-center gap-3 text-xs">
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
            { q: "When will my Pro access activate?", a: "Instantly after payment — Dodo Payments processes your subscription and your Pro access is activated automatically." },
            { q: "Are credits cumulative?", a: "No — they reset on the 1st of each month. Unused credits don't roll over." },
            { q: "Can I cancel anytime?", a: "Yes. Cancel through the customer portal and you keep Pro access until your current period ends." },
            isIndia
              ? { q: "What's the quarterly plan?", a: "₹1,699 for 3 months — saves ₹298 vs paying monthly and no hassle of manual payments." }
              : { q: "What's the quarterly plan?", a: "$24 for 3 months — saves $3 vs monthly and no hassle of monthly payments." },
            isIndia
              ? { q: "What's the yearly plan?", a: "₹2,499/year (vs ₹5,988 at monthly rate) — pay once, stay Pro for 12 months. Save 58%." }
              : { q: "What's the yearly plan?", a: "$49/year (vs $108 at monthly rate) — pay once, stay Pro for 12 months. Save 55%." },
            { q: "What payment methods are accepted?", a: isIndia ? "UPI, credit/debit cards, net banking, and more — via Dodo Payments secure checkout." : "Credit/debit cards, PayPal, and more — via Dodo Payments secure checkout." },
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
