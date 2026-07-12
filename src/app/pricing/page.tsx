import Link from "next/link";
import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  Flame, Check, Zap, Star, BookOpen, Brain, Target,
  Users, Sparkles, MessageSquare, ChevronRight,
} from "lucide-react";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isProEffective } from "@/lib/entitlements";
import type { BillingInterval } from "@/lib/billing/catalog";

import { serverEvents } from "@/lib/ga4-server";
import { Suspense } from "react";
import PricingBannerModal from "@/components/PricingBannerModal";
import JsonLd, { faqSchema, breadcrumbSchema } from "@/components/JsonLd";
import PricingPageTrialCTA from "@/components/PricingPageTrialCTA";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";
import { getVariant } from "@/lib/ab";
import { calculateMRP } from "@/lib/pricing-display";

export const metadata: Metadata = {
  title: "PM Streak Pro Pricing — Plans & Features",
  description:
    "Compare PM Streak Free vs Pro plans. Pro unlocks all 292+ PM lessons, unlimited AI, interview prep, PM Jobs board, and WhatsApp community. Starting at $6/month or ₹249/month in India.",
  alternates: { canonical: "https://learnanything.pro/pricing" },
  openGraph: {
    title: "PM Streak Pro Pricing — Unlock All 292+ PM Lessons",
    description:
      "Unlock 292+ PM lessons, unlimited AI lessons, PM interview prep, jobs board & WhatsApp community. From $6/month or ₹249/month.",
    url: "https://learnanything.pro/pricing",
    type: "website",
    siteName: "PM Streak",
    images: [{ url: "https://learnanything.pro/api/og?title=PM+Streak+Pricing", width: 1200, height: 630, alt: "PM Streak Pro Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Streak Pro Pricing | Plans & Features",
    description: "Free vs Pro plans. All 292+ PM lessons, unlimited AI, interview prep. From $6/month.",
    images: ["https://learnanything.pro/api/og?title=PM+Streak+Pricing"],
    site: "@pmstreak",
  },
};

// Countries billed in INR (India)
const INR_COUNTRIES = new Set(["IN"]);

type PricingRegion = "INR" | "USD";

function getRegion(country: string | null): PricingRegion {
  if (country && INR_COUNTRIES.has(country)) return "INR";
  return "USD";
}

const FREE_FEATURES = [
  { text: "7 lessons per topic (35+ free lessons)", yes: true },
  { text: "5 archive lessons (batch-unlocked)", yes: true },
  { text: "10 credits / month", yes: true },
  { text: "1 AI Explore lesson / week", yes: true },
  { text: "Streak tracking, XP & leaderboard", yes: true },
];

const PRO_FEATURES = [
  { text: "Everything in Free", yes: true },
  { text: "All 292+ archive lessons unlocked", yes: true },
  { text: "50 credits / month", yes: true },
  { text: "Unlimited AI Explore lessons", yes: true },
  { text: "Unlimited Deeper Dives", yes: true, new: true },
  { text: "Unlimited AI Interview prep sessions", yes: true, new: true },
  { text: "Priority PM Jobs board access", yes: true, new: true },
  { text: "Exclusive WhatsApp PM community", yes: true },
  { text: "Save Notes & Recaps", yes: true },
  { text: "Personalized learning roadmap", yes: true },
  { text: "Certificate of completion", yes: true },
  { text: "Priority email support (Coming Soon)", yes: false, comingSoon: true },
  { text: "30-day money-back guarantee", yes: true },
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
  const params = new URLSearchParams({ plan: opts.plan });
  if (opts.productId) params.set("productId", opts.productId);
  if (opts.email) params.set("email", opts.email);
  if (opts.userId) params.set("metadata_userId", opts.userId);
  if (opts.plan) params.set("metadata_plan", opts.plan);
  
  return `${base}?${params.toString()}`;
}

export default async function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)]" />}>
      <PricingContent />
    </Suspense>
  );
}

async function PricingContent() {
  const [userId, headersList, abVariant] = await Promise.all([
    getCurrentUserId(),
    headers(),
    getVariant("pro_trial_cta_v1"),
  ]);

  // Track pricing page view (fire for anonymous visitors too — they're the
  // top of the funnel and we need to see them in GA4 Realtime).
  serverEvents.pricingPageView(userId);

  // Detect country from Vercel geo header (set automatically in production)
  const country = headersList.get("x-vercel-ip-country") ?? null;
  const region = getRegion(country);
  const isIndia = region === "INR";

  let userEmail: string | undefined;
  let userPlan: string = "free";
  let dodoCustomerId: string | null | undefined;
  const razorpayEnabled = Boolean(
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() &&
      process.env.RAZORPAY_KEY_SECRET?.trim()
  );
  const canUseRazorpay = isIndia && Boolean(userId) && razorpayEnabled;

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

  // INR product IDs (Native Indian Tier)
  const inrMonthlyId = process.env.NEXT_PUBLIC_DODO_MONTHLY_PRODUCT_ID ?? "";
  const inrQuarterlyId = process.env.NEXT_PUBLIC_DODO_QUARTERLY_PRODUCT_ID ?? "";
  const inrYearlyId = process.env.NEXT_PUBLIC_DODO_YEARLY_PRODUCT_ID ?? "";

  // USD product IDs (Native International Tier)
  const usdMonthlyId = process.env.NEXT_PUBLIC_DODO_USD_MONTHLY_PRODUCT_ID ?? "";
  const usdQuarterlyId = process.env.NEXT_PUBLIC_DODO_USD_QUARTERLY_PRODUCT_ID ?? "";
  const usdYearlyId = process.env.NEXT_PUBLIC_DODO_USD_YEARLY_PRODUCT_ID ?? "";

  const plans = isIndia
    ? [
        // India gets the LOWER tier ($3 -> ~₹249, $8 -> ~₹669, $15 -> ~₹1249)
        { key: "monthly",   title: "Monthly",   original: calculateMRP("₹249", true),   discounted: "₹249",   period: "/ month",     productId: inrMonthlyId },
        { 
          key: "quarterly", 
          title: "Quarterly", 
          original: calculateMRP("₹669", true),   
          discounted: "₹669",   
          period: "/ 3 months",  
          badge: "Best Value", 
          savings: `Save ₹${(Math.round(669/0.3) - 669).toLocaleString("en-IN")}`,  
          productId: inrQuarterlyId 
        },
        { 
          key: "yearly",    
          title: "Yearly",    
          original: calculateMRP("₹1,249", true), 
          discounted: "₹1,249", 
          period: "/ year",       
          savings: `Save ₹${(Math.round(1249/0.3) - 1249).toLocaleString("en-IN")}`, 
          desc: "All features + interview prep included",
          productId: inrYearlyId 
        },
      ]
    : [
        // International gets the HIGHER tier (₹499 -> ~$6, ₹899 -> ~$11, ₹2699 -> ~$32)
        { key: "monthly",   title: "Monthly",   original: calculateMRP("$6", false),     discounted: "$6",      period: "/ month",     productId: usdMonthlyId },
        { 
          key: "quarterly", 
          title: "Quarterly", 
          original: calculateMRP("$11", false),     
          discounted: "$11",      
          period: "/ 3 months",  
          badge: "Best Value", 
          savings: `Save $${Math.round(11/0.3) - 11}`,     
          productId: usdQuarterlyId 
        },
        { 
          key: "yearly",    
          title: "Yearly",    
          original: calculateMRP("$32", false),    
          discounted: "$32",     
          period: "/ year",       
          savings: `Save $${Math.round(32/0.3) - 32}`, 
          desc: "All features + interview prep included",
          productId: usdYearlyId 
        },
      ];
  const pricingFaq = faqSchema([
    { question: "When will my Pro access activate?", answer: "Instantly after payment — Dodo Payments processes your subscription and your Pro access is activated automatically." },
    { question: "Are credits cumulative?", answer: "No — credits reset on the 1st of each month. Unused credits don't roll over." },
    { question: "Can I cancel anytime?", answer: "Yes. Cancel through the customer portal and you keep Pro access until your current period ends." },
    { question: "What payment methods are accepted?", answer: "India buyers can use Razorpay for UPI, credit/debit cards, and net banking. International buyers can use Dodo Payments for cards and PayPal." },
    { question: "What's the difference between Free and Pro?", answer: "Free includes 7 lessons per topic (35+ lessons total) and 10 credits/month. Pro unlocks all 292+ lessons, 50 credits/month, unlimited AI Explore, interview prep, PM jobs board, and WhatsApp community." },
  ]);

  const pricingBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" },
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <JsonLd data={pricingFaq} />
      <JsonLd data={pricingBreadcrumbs} />
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[var(--border-color)] bg-[var(--bg-primary)]/92 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href={userId ? "/dashboard" : "/"} className="flex items-center gap-1.5">
            <Flame size={20} className="text-[var(--orange-primary)]" />
            <div className="font-black text-xl tracking-tight flex items-center gap-1 leading-none">
              <span className="text-[var(--green-primary)]">PM</span>
              <span className="text-white">Streak</span>
            </div>
          </Link>
          {userId ? (
            <Link href="/dashboard" className="text-xs font-black text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1">
              Back to dashboard <ChevronRight size={12} />
            </Link>
          ) : (
            <Link href="/login" className="text-xs font-black text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-1">
              Sign in <ChevronRight size={12} />
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-24">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--purple-primary)]/15 border border-[var(--purple-primary)]/30 rounded-full px-4 py-1.5 text-xs font-black text-[var(--purple-primary)] uppercase tracking-wider mb-4">
            <Star size={12} /> Pro Plan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.05] mb-3">
            Learn PM like a{" "}
            <span className="text-[var(--green-primary)]">pro</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm max-w-md mx-auto mb-4">
            Unlock all 292+ Lenny&apos;s Podcast lessons, unlimited AI lessons, PM leader content, interview prep, and the job board.
          </p>

          {userPlan !== "pro" && <PricingPageTrialCTA variant={abVariant} />}

          <p className="text-xs text-[var(--text-secondary)] mb-6">
            Join 200+ PMs learning · 30-day money-back guarantee
          </p>
          {userPlan === "pro" ? (
            <Link
              href="/dashboard"
              className="sm:hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black bg-[var(--surface-1)] border border-[var(--border-color)] text-white"
            >
              Manage Pro
            </Link>
          ) : canUseRazorpay ? (
            <RazorpayCheckoutButton
              plan={"quarterly" as BillingInterval}
              className="sm:hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black bg-[var(--green-primary)] text-black"
            >
              Start Pro
            </RazorpayCheckoutButton>
          ) : (() => {
            const quarterlyPlan = plans.find((p) => p.key === "quarterly" && p.productId);
            if (!quarterlyPlan) {
              console.error("[pricing] missing Dodo product ID for plan", "quarterly");
              return (
                <button
                  disabled
                  className="sm:hidden inline-flex flex-col items-center justify-center gap-0.5 rounded-xl px-5 py-3 text-sm font-black bg-[var(--purple-primary)]/40 text-black/50 cursor-not-allowed"
                >
                  <span>Start Pro</span>
                  <span className="text-[10px] font-normal text-black/40">Checkout temporarily unavailable</span>
                </button>
              );
            }
            return (
              <a
                href={buildCheckoutUrl({
                  productId: quarterlyPlan.productId,
                  email: userEmail,
                  userId: userId ?? undefined,
                  plan: "quarterly",
                })}
                className="sm:hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black bg-[var(--purple-primary)] text-black"
              >
                Start Pro
              </a>
            );
          })()}
        </div>

        {/* Value Proposition */}
        <div className="mb-8 p-6 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-color)] shadow-[0_2px_0_0_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--green-primary)]/15">
              <Zap size={24} className="text-[var(--green-primary)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black mb-3">Why PMs choose Pro</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { title: "10× more content", desc: "292+ lessons vs 12 free" },
                  { title: "Interview ready", desc: "Unlimited AI mock interviews" },
                  { title: "Career boost", desc: "Priority job board + community" },
                ].map((v) => (
                  <div key={v.title} className="flex items-start gap-2">
                    <Check size={14} className="text-[var(--green-primary)] mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-black">{v.title}</div>
                      <div className="text-[var(--text-secondary)] text-xs">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Free vs Pro Comparison */}
        <div id="comparison" className="grid md:grid-cols-2 gap-6 mb-10 sm:mb-12">
          {/* Free */}
          <div className="rounded-2xl border-2 border-[var(--border-color)] p-6 bg-[var(--bg-card)] flex flex-col">
            <div className="mb-4">
              <h2 className="text-lg font-black mb-1">Free</h2>
              <div className="text-3xl font-black">{isIndia ? "₹0" : "$0"}</div>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Forever free, no credit card</p>
            </div>
            <ul className="space-y-3 mb-6">
              {FREE_FEATURES.map((f) => (
                <li key={f.text} className="flex items-start gap-2 text-sm text-white/85">
                  <Check size={15} className="text-[var(--green-primary)] mt-0.5 flex-shrink-0" />
                  <span className="flex-1">{f.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              Everything you need to build the daily habit. Upgrade whenever you
              want the full library, unlimited AI, and the community.
            </p>
            <Link href="/dashboard" className="mt-auto block w-full py-3 text-center text-sm font-black rounded-xl border-2 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-white hover:border-white/40 transition-colors">
              Continue Free
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border-2 border-[var(--purple-primary)]/50 p-6 bg-[var(--bg-card)] relative shadow-[0_4px_0_0_rgba(0,0,0,0.35)]">
            <div className="absolute -top-3.5 left-6 inline-flex items-center gap-1 rounded-full bg-[var(--purple-primary)] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1">
              <Star size={10} /> Most popular
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-black">Pro</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/50">
                  {isIndia ? "🇮🇳 India pricing" : "🌍 International pricing"}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white whitespace-nowrap">{isIndia ? "₹249" : "$6"}</span>
                <span className="text-[var(--text-secondary)] line-through text-base whitespace-nowrap">{calculateMRP(isIndia ? "₹249" : "$6", isIndia)}</span>
                <span className="text-[var(--text-secondary)] text-sm whitespace-nowrap">/ month</span>
              </div>
              <p className="text-xs font-black text-[var(--green-primary)] mt-1.5">
                70% off launch pricing — billed monthly, quarterly, or yearly
              </p>
            </div>
            <ul className="space-y-2.5 mb-6">
              {PRO_FEATURES.map((f: any) => (
                <li key={f.text} className="flex items-start gap-2 text-xs text-white/85">
                  {f.comingSoon ? (
                    <span className="text-[var(--gold-primary)] mt-0.5 flex-shrink-0 text-xs">⏳</span>
                  ) : (
                    <Check size={14} className="text-[var(--purple-primary)] mt-0.5 flex-shrink-0" />
                  )}
                  <span className="flex-1">{f.text}</span>
                  {f.new && (
                    <span className="bg-[var(--purple-primary)]/20 text-[var(--purple-primary)] text-[8px] font-black px-1.5 py-0.5 rounded-sm flex-shrink-0">NEW</span>
                  )}
                  {f.comingSoon && (
                    <span className="bg-[var(--gold-primary)]/15 text-[var(--gold-primary)] text-[8px] font-black px-1.5 py-0.5 rounded-sm flex-shrink-0">COMING SOON</span>
                  )}
                </li>
              ))}
            </ul>

            {userPlan === "pro" ? (
              <div className="rounded-xl bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/30 p-4 text-center">
                <p className="text-sm font-black text-[var(--green-primary)]">✓ You&apos;re already Pro!</p>
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
                {plans.map((plan) => {
                  const dodoHref = plan.productId
                    ? buildCheckoutUrl({
                        productId: plan.productId,
                        email: userEmail,
                        userId: userId ?? undefined,
                        plan: plan.key,
                      })
                    : null;

                  return (
                    <div key={plan.key} className="space-y-2">
                      <a
                        href={dodoHref ?? "#"}
                        aria-disabled={!dodoHref}
                        className={`flex items-center justify-between w-full py-3 px-4 rounded-xl font-black text-sm transition-all ${
                          plan.key === "quarterly"
                            ? "bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-black"
                            : "bg-transparent hover:bg-white/5 text-white border-2 border-[var(--border-color)] hover:border-white/30"
                        } ${!dodoHref ? "opacity-50 pointer-events-none" : ""}`}
                      >
                        <span className="flex flex-col items-start gap-0.5">
                          <span className="flex items-center gap-2">
                            {plan.badge && (
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-white/20">
                                {plan.badge}
                              </span>
                            )}
                            Subscribe {plan.title}
                          </span>
                          {(plan as any).desc && <span className={`text-[10px] font-bold block leading-tight ${plan.key === "quarterly" ? "text-white/70" : "text-white/50"}`}>{(plan as any).desc}</span>}
                        </span>
                        <span className="text-right flex flex-col items-end shrink-0 ml-2">
                          <span className="font-black whitespace-nowrap">{plan.discounted}</span>
                          <span className={`text-[10px] whitespace-nowrap ${plan.key === "quarterly" ? "text-white/70" : "text-[var(--text-secondary)]"}`}>{plan.period}</span>
                        </span>
                      </a>
                      {canUseRazorpay && (
                        <RazorpayCheckoutButton
                          plan={plan.key as BillingInterval}
                          className="flex items-center justify-between w-full py-3 px-4 rounded-xl font-black text-sm transition-all bg-[var(--green-primary)]/10 hover:bg-[var(--green-primary)]/20 text-white border-2 border-[var(--green-primary)]/30"
                        >
                          <span className="flex flex-col items-start gap-0.5">
                            <span className="flex items-center gap-2">
                              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[var(--green-primary)]/20 text-[var(--green-primary)]">
                                Razorpay
                              </span>
                              Pay with Razorpay
                            </span>
                            <span className="text-[10px] text-white/50 font-bold block leading-tight">
                              UPI, cards, and net banking
                            </span>
                          </span>
                          <span className="text-right flex flex-col items-end shrink-0 ml-2">
                            <span className="font-black text-[var(--green-primary)] whitespace-nowrap">Live checkout</span>
                            <span className="text-[var(--text-secondary)] text-[10px] whitespace-nowrap">Secure Indian gateway</span>
                          </span>
                        </RazorpayCheckoutButton>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Community */}
        <div className="rounded-2xl border-2 border-[var(--green-primary)]/30 p-4 sm:p-5 mb-10 sm:mb-12 bg-[var(--green-primary)]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--green-primary)]/15 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={20} className="text-[var(--green-primary)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-black text-[var(--green-primary)]">WhatsApp PM Community</h3>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                Private group with active PMs — job referrals, case study discussions, peer accountability. Pro members only.
              </p>
            </div>
            <span className="text-[10px] font-black px-2 py-1 rounded-full bg-[var(--purple-primary)]/15 text-[var(--purple-primary)] flex-shrink-0">
              PRO
            </span>
          </div>
          <p className="text-[10px] text-white/40 mt-3">
            WhatsApp link shared after Pro activation via email.
          </p>
        </div>

        {/* Credits Explainer */}
        <div className="rounded-2xl border-2 border-[var(--border-color)] p-4 sm:p-6 mb-10 sm:mb-12 bg-[var(--bg-card)]">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-[var(--purple-primary)]" />
            <h2 className="text-base font-black">How Credits Work</h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mb-4">
            Credits reset monthly and gate premium features.
            Free users get <strong className="text-white">10 credits/month</strong>. Pro users get <strong className="text-white">50 credits/month</strong> (plus all lessons already unlocked).
          </p>
          <div className="space-y-2">
            {CREDIT_COSTS.map((c) => (
              <div key={c.action} className="flex items-center gap-3 text-xs">
                <span className="flex-1 text-white/70">{c.action}</span>
                <span className="font-black text-[var(--purple-primary)] flex items-center gap-1">
                  <Zap size={10} /> {c.cost}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {[
            { icon: <BookOpen size={20} className="text-[var(--green-primary)]" />, title: "292+ Archive Lessons", desc: "Full Lenny's Podcast library — Shreyas, Reforge, Figma, Stripe PMs and more." },
            { icon: <Brain size={20} className="text-[var(--blue-primary)]" />, title: "AI Interview Prep", desc: "5 PM interview questions with frameworks per session — strategy, metrics, execution." },
            { icon: <Target size={20} className="text-[var(--orange-primary)]" />, title: "PM Jobs Board", desc: "Curated PM roles from Wellfound, LinkedIn and Himalayas, updated weekly." },
            { icon: <Sparkles size={20} className="text-[var(--purple-primary)]" />, title: "Unlimited AI Lessons", desc: "Generate lessons on any PM topic — grounded in real podcast transcripts." },
            { icon: <Users size={20} className="text-[var(--purple-primary)]" />, title: "PM Leader Lessons", desc: "Bite-sized lessons from Shreyas Doshi, Aakash Gupta, Marty Cagan and more." },
            { icon: <MessageSquare size={20} className="text-[var(--blue-primary)]" />, title: "WhatsApp Community", desc: "Private group with active PMs, job referrals, and peer accountability." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border-2 border-[var(--border-color)] p-4 bg-[var(--bg-card)]">
              <div className="mb-2">{f.icon}</div>
              <h3 className="text-sm font-black mb-1">{f.title}</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">{f.desc}</p>
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
              ? { q: "What's the quarterly plan?", a: `${calculateMRP("₹669", true)} for 3 months — results in ₹669 with the applied discount.` }
              : { q: "What's the quarterly plan?", a: `${calculateMRP("$11", false)} for 3 months — results in $11 with the applied discount.` },
            isIndia
              ? { q: "What's the yearly plan?", a: `${calculateMRP("₹1,249", true)}/year — results in ₹1,249 with the applied discount.` }
              : { q: "What's the yearly plan?", a: `${calculateMRP("$32", false)}/year — results in $32 with the applied discount.` },
            { q: "What payment methods are accepted?", a: isIndia ? "UPI, credit/debit cards, and net banking — via Razorpay live checkout. Dodo Payments remains available as a fallback." : "Credit/debit cards, PayPal, and more — via Dodo Payments secure checkout." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border-2 border-[var(--border-color)] p-4 bg-[var(--bg-card)]">
              <h3 className="text-xs font-black mb-1.5">{item.q}</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">{item.a}</p>
            </div>
          ))}
        </div>
      </main>
      <PricingBannerModal />
    </div>
  );
}
