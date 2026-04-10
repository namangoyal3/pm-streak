import Link from "next/link";
import { headers } from "next/headers";
import type { Metadata } from "next";
import {
  Flame, Check, X, Zap, Star, BookOpen, Brain, Target,
  Users, Sparkles, MessageSquare, ChevronRight,
} from "lucide-react";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isProEffective } from "@/lib/entitlements";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import PricingBannerModal from "@/components/PricingBannerModal";
import JsonLd, { faqSchema, breadcrumbSchema } from "@/components/JsonLd";
import PricingBenefits from "@/components/PricingBenefits";

const PRICE_INCREASE_PERCENT = 70;

function calculateMRP(discountedPrice: string, isIndia: boolean): string {
  const numMatch = discountedPrice.match(/[\d,.]+/);
  if (!numMatch) return discountedPrice;
  
  const num = parseFloat(numMatch[0].replace(/,/g, ""));
  // Increase by 70% as requested (num * 1.7)
  const mrp = Math.round(num * 1.7);
  
  if (isIndia) {
    return `₹${mrp.toLocaleString("en-IN")}`;
  }
  return `$${mrp}`;
}

export const metadata: Metadata = {
  title: "PM Streak Pro Pricing — Plans & Features | PM Streak",
  description:
    "Compare PM Streak Free vs Pro plans. Pro unlocks all 292+ Lenny's Podcast lessons, unlimited AI Explore, interview prep, PM Jobs board, and WhatsApp community. Starting at $6/month or ₹249/month in India.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "PM Streak Pro Pricing | Plans & Features",
    description:
      "Unlock 292+ PM lessons, unlimited AI, interview prep & jobs board. From $6/month.",
    url: "/pricing",
    images: [{ url: "/api/og?title=PM+Streak+Pricing", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Streak Pro Pricing | PM Streak",
    description: "Free vs Pro plans. Full Lenny's Podcast library, AI lessons, interview prep. From $6/month.",
    images: ["/api/og?title=PM+Streak+Pricing"],
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
    { question: "What payment methods are accepted?", answer: "UPI, credit/debit cards, net banking (India), PayPal (international) — via Dodo Payments secure checkout." },
    { question: "What's the difference between Free and Pro?", answer: "Free includes 22 core lessons, 10 archive lessons, and 10 credits/month. Pro unlocks all 292+ lessons, unlimited AI Explore, interview prep, PM jobs board, and WhatsApp community." },
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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-24">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1.5 text-xs font-black text-purple-300 uppercase tracking-wider mb-4">
            <Star size={12} /> Pro Plan
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            Learn PM like a{" "}
            <span className="text-green-400">pro</span>
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-4">
            Unlock all 292+ Lenny&apos;s Podcast lessons, unlimited AI lessons, PM leader content, interview prep, and the job board.
          </p>
          <a
            href={
              userPlan === "pro"
                ? "/dashboard"
                : plans.find((p) => p.key === "quarterly" && p.productId)
                  ? buildCheckoutUrl({
                      productId: plans.find((p) => p.key === "quarterly")!.productId,
                      email: userEmail,
                      userId: userId ?? undefined,
                      plan: "quarterly",
                    })
                  : "#comparison"
            }
            className={cn(
              "sm:hidden inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black",
              userPlan === "pro"
                ? "bg-[var(--surface-1)] border border-[var(--border-color)] text-white"
                : "bg-purple-500 text-white"
            )}
          >
            {userPlan === "pro" ? "Manage Pro" : "Start Pro"}
          </a>
        </div>

        {/* Free vs Pro Comparison */}
        <div id="comparison" className="grid md:grid-cols-2 gap-6 mb-10 sm:mb-12">
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
              <div className="flex items-baseline gap-2">
                <span className="text-white/40 line-through text-2xl whitespace-nowrap">{calculateMRP(isIndia ? "₹249" : "$6", isIndia)}</span>
                <span className="text-3xl font-black text-green-400 whitespace-nowrap">{isIndia ? "₹249" : "$6"} <span className="text-[10px] align-top opacity-80">(SPECIAL PRICE)</span></span>
                <span className="text-white/50 text-sm whitespace-nowrap">/ month</span>
              </div>
              <p className="text-xs text-purple-300/70 mt-1">
                {isIndia
                  ? <><span className="line-through text-white/30 whitespace-nowrap">{calculateMRP("₹669", true)}</span> <span className="text-green-400 font-black whitespace-nowrap">₹669 <span className="text-[8px] opacity-70">(70% OFF)</span></span> / 3 months · <span className="line-through text-white/30 whitespace-nowrap">{calculateMRP("₹1,249", true)}</span> <span className="text-green-400 font-black whitespace-nowrap">₹1,249 <span className="text-[8px] opacity-70">(70% OFF)</span></span> / year</>
                  : <><span className="line-through text-white/30 whitespace-nowrap">{calculateMRP("$11", false)}</span> <span className="text-green-400 font-black whitespace-nowrap">$11 <span className="text-[8px] opacity-70">(70% OFF)</span></span> / 3 months · <span className="line-through text-white/30 whitespace-nowrap">{calculateMRP("$32", false)}</span> <span className="text-green-400 font-black whitespace-nowrap">$32 <span className="text-[8px] opacity-70">(70% OFF)</span></span> / year</>
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
                    <span className="flex flex-col items-start gap-0.5">
                      <span className="flex items-center gap-2">
                        {plan.badge && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-white/20">
                            {plan.badge}
                          </span>
                        )}
                        Subscribe {plan.title}
                      </span>
                      {(plan as any).desc && <span className="text-[10px] text-white/50 font-bold block leading-tight">{(plan as any).desc}</span>}
                    </span>
                    <span className="text-right flex flex-col items-end shrink-0 ml-2">
                      <span className="flex items-center gap-1 flex-nowrap">
                        <span className="text-white/40 line-through text-xs whitespace-nowrap">{plan.original}</span>
                        <span className="font-black text-green-400 whitespace-nowrap">{plan.discounted} <span className="text-[9px] opacity-80">(70% OFF)</span></span>
                      </span>
                      <span className="text-white/60 text-[10px] whitespace-nowrap">{plan.period}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Community */}
        <div className="rounded-2xl border-2 border-green-500/30 p-4 sm:p-5 mb-10 sm:mb-12 bg-green-900/10">
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
        <div className="rounded-2xl border-2 border-white/10 p-4 sm:p-6 mb-10 sm:mb-12 bg-white/5">
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

        {/* Pricing Benefits Section */}
        <PricingBenefits />

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
            { q: "What payment methods are accepted?", a: isIndia ? "UPI, credit/debit cards, net banking, and more — via Dodo Payments secure checkout." : "Credit/debit cards, PayPal, and more — via Dodo Payments secure checkout." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <h3 className="text-xs font-black mb-1.5">{item.q}</h3>
              <p className="text-[11px] text-white/55">{item.a}</p>
            </div>
          ))}
        </div>
      </main>
      <PricingBannerModal />
    </div>
  );
}
