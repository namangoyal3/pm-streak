import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BrowserLink from "@/components/BrowserLink";
import SafariBar from "@/components/SafariBar";
import JsonLd, { breadcrumbSchema, howToSchema, faqSchema, speakableSchema, SITE_URL } from "@/components/JsonLd";
import HomepageTrialButton from "@/components/HomepageTrialButton";
import { getVariant } from "@/lib/ab";

export const metadata: Metadata = {
  title: "PM Streak — Daily PM Lessons from Lenny's Podcast | Duolingo for Product Managers",
  description:
    "PM Streak is the fastest way to sharpen your product intuition. Daily 2-minute PM lessons from 300+ Lenny's Podcast episodes with streak tracking, XP, leaderboards, and AI-powered practice. Used by product managers at top tech companies.",
  keywords: [
    "product management", "PM lessons", "Lenny's Podcast", "product manager training",
    "PM interview prep", "product sense", "PM streak", "daily PM practice",
    "product management course", "PM frameworks", "duolingo for PMs",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PM Streak — Duolingo for Product Managers",
    description:
      "The fastest way to get sharper as a PM. Daily 2-minute lessons from 300+ Lenny's Podcast episodes with streaks, XP, and leaderboards.",
    url: "/",
    type: "website",
    images: [{ url: "/api/og?title=PM+Streak", width: 1200, height: 630, alt: "PM Streak — Daily PM Lessons" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Streak — Duolingo for Product Managers",
    description:
      "Daily 2-min PM lessons from Lenny's Podcast. Streaks, XP, leaderboards. The fastest way to get sharper as a PM.",
    images: ["/api/og?title=PM+Streak"],
  },
  other: {
    "article:modified_time": new Date().toISOString(),
  },
};

const GOOGLE_ICON = (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity="0.9"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity="0.9"/>
    <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="white" fillOpacity="0.9"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity="0.9"/>
  </svg>
);

export default async function Home() {
  const userId = await getCurrentUserId();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboarded: true },
    });
    redirect(user?.onboarded ? "/dashboard" : "/onboarding");
  }

  const abVariant = await getVariant("pro_trial_cta_v1");

  const siteUrl = SITE_URL;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PM Streak",
    alternateName: "Duolingo for Product Managers",
    url: siteUrl,
    description:
      "PM Streak is a daily product management learning platform that delivers 2-minute micro-lessons from 300+ Lenny's Podcast episodes with streak tracking, XP, leaderboards, and AI-powered content generation.",
    foundingDate: "2024",
    sameAs: ["https://www.producthunt.com/products/pm-streak"],
  };

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PM Streak",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free plan with 22 core lessons and 10 credits/month" },
      { "@type": "Offer", price: "9", priceCurrency: "USD", description: "Pro plan with 292+ lessons, unlimited AI, interview prep" },
    ],
    description:
      "Product management micro-lessons powered by 300+ Lenny's Podcast episodes. Features streak tracking, XP progression, AI lesson generation, PM interview prep, and a curated jobs board.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
      bestRating: "5",
    },
    featureList: [
      "Daily 2-minute PM lessons",
      "300+ Lenny's Podcast episode insights",
      "Streak tracking with freeze protection",
      "XP, levels, and global leaderboard",
      "AI-generated custom lessons",
      "PM Interview prep with frameworks",
      "Curated PM job board",
      "Head-to-head learning challenges",
    ],
  };

  const breadcrumbs = breadcrumbSchema([{ name: "Home", url: "/" }]);

  const howTo = howToSchema({
    name: "How to Use PM Streak to Become a Better Product Manager",
    description: "Three simple steps to build a daily PM learning habit with PM Streak.",
    totalTime: "PT2M",
    steps: [
      { name: "Read a 2-minute lesson", text: "Each lesson pulls one sharp insight from Lenny's 300+ podcast episodes — prioritisation, strategy, growth, hiring. No fluff." },
      { name: "Answer 3 quiz questions", text: "Active recall beats passive reading. Three targeted questions lock the concept in. Perfect score earns bonus gems." },
      { name: "Keep your streak alive", text: "One lesson a day. That's it. Consistency is the whole game — the leaderboard and streak counter make it impossible to ignore." },
    ],
  });

  const homepageFaq = faqSchema([
    { question: "What is PM Streak?", answer: "PM Streak is a daily product management learning platform — like Duolingo for PMs. It delivers 2-minute micro-lessons from 300+ Lenny's Podcast episodes with streak tracking, XP, leaderboards, and AI-powered content generation." },
    { question: "How long does each PM lesson take?", answer: "Each lesson takes approximately 2 minutes to read plus 1 minute for 3 quiz questions. Total daily commitment is under 3 minutes." },
    { question: "Is PM Streak free?", answer: "Yes. PM Streak offers a free plan with 22 core curriculum lessons, 10 archive lessons, 10 credits/month, and full streak tracking. Pro plan ($6/month) unlocks all 292+ lessons, unlimited AI, interview prep, and the jobs board." },
    { question: "What content does PM Streak teach?", answer: "PM Streak lessons cover prioritisation, strategy, growth, hiring, product sense, metrics, execution, and leadership — all sourced from expert interviews on Lenny's Podcast featuring PMs from Stripe, Figma, Reforge, and more." },
  ]);

  const speakable = speakableSchema([".hero-tldr", "h1", ".hero-description"]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <JsonLd data={orgJsonLd} />
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={howTo} />
      <JsonLd data={homepageFaq} />
      <JsonLd data={speakable} />
      <SafariBar />

      {/* Hidden SEO tldr — cited by AI overviews, not shown visually */}
      <p className="hero-tldr sr-only">
        PM Streak is a daily product management learning platform that delivers 2-minute micro-lessons from 300+ Lenny&apos;s Podcast episodes. It features streak tracking, XP, leaderboards, AI lesson generation, interview prep, and a PM jobs board.
      </p>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <div className="flex flex-col leading-none">
              <div className="font-black text-lg sm:text-xl tracking-tight flex items-center gap-1">
                <span className="text-[var(--green-primary)]">PM</span>
                <span className="text-white">Streak</span>
              </div>
              <span className="text-[9px] font-bold text-white/40 tracking-wide">by learnanything.pro</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <BrowserLink
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              Sign in
            </BrowserLink>
            <BrowserLink
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-[var(--green-primary)]/20"
            >
              {GOOGLE_ICON}
              <span className="hidden sm:inline">Sign up free</span>
              <span className="sm:hidden">Get started</span>
            </BrowserLink>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-5 pt-12 sm:pt-20 pb-10 sm:pb-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">

          {/* Left: text */}
          <div className="flex-1 max-w-lg">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/25 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-primary)] animate-pulse" />
              <span className="text-xs font-black text-[var(--green-primary)] tracking-wide">Built on Lenny&apos;s Podcast · 300+ episodes</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-[3.5rem] font-black tracking-tight leading-[1.04] mb-5">
              The fastest way<br />to get sharper<br />
              <span className="text-[var(--green-primary)]">as a PM.</span>
            </h1>

            {/* One-liner */}
            <p className="hero-description text-base sm:text-lg text-[var(--text-secondary)] mb-7 leading-relaxed">
              2-minute daily lessons from 300+ Lenny&apos;s Podcast episodes — with streak tracking, XP, and AI-powered practice.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <BrowserLink
                href="/login"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-sm font-black transition-all shadow-lg shadow-[var(--green-primary)]/25 hover:scale-[1.02] active:scale-[0.98]"
              >
                {GOOGLE_ICON}
                Sign up free
              </BrowserLink>
              {abVariant === "treatment" && <HomepageTrialButton />}
            </div>

            {/* Trust line */}
            <p className="text-xs text-[var(--text-secondary)] mb-8">
              No credit card · 30 seconds · 1000+ PMs building the habit
            </p>

            {/* Topic pills */}
            <div className="flex flex-wrap gap-2">
              {["Strategy", "Growth", "Metrics", "Hiring", "Roadmaps", "Pricing"].map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:text-white/90 hover:border-white/20 transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Right: app preview cards */}
          <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 w-72 mt-2">
            {/* Streak card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--orange-primary)]/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wide">Current streak</span>
                <span className="text-lg">🔥</span>
              </div>
              <div className="text-4xl font-black text-[var(--orange-primary)] tabular-nums mb-1">14</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mb-3">days · keep it going</div>
              <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[58%] bg-gradient-to-r from-[var(--orange-primary)] to-amber-400 rounded-full" />
              </div>
            </div>

            {/* XP + level card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wide">Level progress</span>
                <span className="text-xs font-black text-[var(--gold-primary)] px-2 py-0.5 rounded-full bg-[var(--gold-primary)]/10">Senior PM</span>
              </div>
              <div className="text-4xl font-black text-[var(--gold-primary)] tabular-nums mb-1">840 <span className="text-2xl">XP</span></div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mb-3">160 XP to Expert PM</div>
              <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--orange-primary)]" />
              </div>
            </div>

            {/* Today's lesson card */}
            <div className="rounded-2xl p-5 border border-[var(--green-primary)]/30 bg-gradient-to-br from-[var(--green-primary)]/12 to-[var(--green-primary)]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-primary)] animate-pulse" />
                <span className="text-[10px] font-black text-[var(--green-primary)] uppercase tracking-widest">Today&apos;s lesson</span>
              </div>
              <div className="text-sm font-black leading-snug mb-2">The Shreyas Doshi Prioritisation Stack</div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[var(--text-secondary)]">+20 XP</span>
                <span className="text-[var(--border-color)]">·</span>
                <span className="text-xs text-[var(--text-secondary)]">2 min read</span>
                <span className="ml-auto text-xs font-black text-[var(--green-primary)]">Start →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-8 gap-y-4">
            {[
              { value: "1000+", label: "PMs building the habit", color: "var(--green-primary)" },
              { value: "300+", label: "Podcast episodes", color: "var(--text-secondary)" },
              { value: "292+", label: "Archive lessons", color: "var(--text-secondary)" },
              { value: "2 min", label: "per day, that's it", color: "var(--text-secondary)" },
            ].map(({ value, label, color }) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tabular-nums" style={{ color }}>{value}</span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-2">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-[1.1] tracking-tight">
              Three steps.<br />Two minutes.<br />Every day.
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-xs sm:text-right leading-relaxed">
            No 40-hour courses. No passive YouTube rabbit holes. Just one sharp insight per day.
          </p>
        </div>

        <div className="divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-3xl overflow-hidden">
          {[
            {
              n: "1",
              title: "Read a 2-minute lesson",
              desc: "Each lesson pulls one sharp insight from Lenny's 300+ podcast episodes — prioritisation, strategy, growth, hiring. No fluff.",
              tag: "2 min read",
              color: "var(--green-primary)",
            },
            {
              n: "2",
              title: "Answer 3 quiz questions",
              desc: "Active recall beats passive reading. Three targeted questions lock the concept in. Perfect score earns bonus gems.",
              tag: "+10 XP bonus",
              color: "var(--blue-primary)",
            },
            {
              n: "3",
              title: "Keep your streak alive",
              desc: "One lesson a day. That's it. Consistency is the whole game — the leaderboard and streak counter make it impossible to ignore.",
              tag: "Streak + XP",
              color: "var(--orange-primary)",
            },
          ].map(({ n, title, desc, tag, color }) => (
            <div
              key={n}
              className="flex gap-5 sm:gap-7 px-5 sm:px-7 py-6 sm:py-7 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]/50 transition-colors"
            >
              <div
                className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-black text-xl"
                style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
              >
                {n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="text-sm sm:text-base font-black leading-snug">{title}</h3>
                  <span
                    className="text-[9px] sm:text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg flex-shrink-0"
                    style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
                  >
                    {tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">

          {/* 2 large feature cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {/* Streaks */}
            <div className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-7 border border-[var(--border-color)] relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--orange-primary)]/5 rounded-full translate-y-12 translate-x-12" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--orange-primary)]/15 flex items-center justify-center mb-5 text-xl">
                🔥
              </div>
              <h3 className="text-lg sm:text-xl font-black mb-2 leading-tight">Streaks that actually stick</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                Daily streak tracking with freeze protection. Miss a day? Use a streak freeze. Built your longest streak yet? The leaderboard notices.
              </p>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--orange-primary)]">7</div>
                  <div className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">day habit</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--gold-primary)]">5×</div>
                  <div className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">freeze slots</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--green-primary)]">∞</div>
                  <div className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-wide mt-0.5">potential</div>
                </div>
              </div>
            </div>

            {/* XP / Leaderboard */}
            <div className="bg-[var(--bg-card)] rounded-3xl p-6 sm:p-7 border border-[var(--border-color)] relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[var(--gold-primary)]/5 rounded-full translate-y-12 translate-x-12" />
              <div className="w-10 h-10 rounded-2xl bg-[var(--gold-primary)]/15 flex items-center justify-center mb-5 text-xl">
                ⭐
              </div>
              <h3 className="text-lg sm:text-xl font-black mb-2 leading-tight">XP, levels &amp; a real leaderboard</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                Every lesson earns XP. Perfect scores earn bonus gems. Hit a 7-day streak to unlock the leaderboard and see where you rank among PMs worldwide.
              </p>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--orange-primary)]" />
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-[var(--text-secondary)] font-bold">Senior PM · 620 XP</span>
                  <span className="text-[10px] text-[var(--gold-primary)] font-black">Expert PM at 1000 →</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 compact feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                emoji: "⚔️",
                title: "Head-to-head challenges",
                desc: "Challenge any follower to a 7-day learning duel. Bragging rights included.",
                color: "var(--blue-primary)",
              },
              {
                emoji: "🤖",
                title: "AI custom lessons",
                desc: "Type any PM topic — pricing, retention, roadmaps — and get a tailored lesson in under 10 seconds.",
                color: "var(--green-primary)",
              },
              {
                emoji: "⚡",
                title: "Daily bonus challenge",
                desc: "A fresh lesson drops every day at midnight. Complete it for 2× XP on top of your regular lesson.",
                color: "var(--orange-primary)",
              },
              {
                emoji: "💎",
                title: "Gem economy",
                desc: "Earn gems for lessons and streaks. Spend them on XP Boosts, Streak Freezes, or repairing a broken streak.",
                color: "var(--gold-primary)",
              },
            ].map(({ emoji, title, desc, color }) => (
              <div
                key={title}
                className="flex gap-4 p-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] hover:border-white/15 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                  style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                >
                  {emoji}
                </div>
                <div>
                  <div className="font-black text-sm mb-1">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRO FEATURES ── */}
      <section className="relative overflow-hidden">
        {/* Subtle purple glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)]/30 via-purple-900/5 to-[var(--bg-secondary)]/30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">

          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 mb-4">
              <span className="text-xs font-black text-purple-400 tracking-wide">⚡ Go Pro</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">Unlock everything</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              Get unlimited access to every lesson, AI feature, and exclusive community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {[
              { icon: "📚", title: "292+ Archive Lessons", desc: "Full Lenny's Podcast library — Shreyas, Reforge, Figma, Stripe PMs and more.", highlight: true },
              { icon: "🤖", title: "Unlimited AI Lessons", desc: "Generate lessons on any PM topic — pricing, retention, roadmaps." },
              { icon: "🎤", title: "AI Interview Prep", desc: "5 PM interview questions with expert frameworks per session." },
              { icon: "💼", title: "PM Jobs Board", desc: "Curated PM roles from Wellfound, LinkedIn, updated weekly." },
              { icon: "👥", title: "PM Leader Lessons", desc: "Bite-sized lessons from Shreyas Doshi, Aakash Gupta, Marty Cagan." },
              { icon: "💬", title: "WhatsApp Community", desc: "Private group with active PMs, job referrals, peer accountability." },
            ].map(({ icon, title, desc, highlight }) => (
              <div
                key={title}
                className={`flex gap-4 p-5 rounded-2xl border transition-colors ${
                  highlight
                    ? "bg-purple-500/8 border-purple-500/30 hover:border-purple-500/50"
                    : "bg-[var(--bg-card)] border-[var(--border-color)] hover:border-white/15"
                }`}
              >
                <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{icon}</span>
                <div>
                  <div className={`font-black text-sm mb-1 ${highlight ? "text-purple-200" : ""}`}>{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <BrowserLink
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 w-full sm:w-auto"
            >
              View Pro Pricing →
            </BrowserLink>
            <p className="text-xs text-[var(--text-secondary)]">From $6/month · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-[var(--green-primary)]/10 via-[var(--bg-card)] to-[var(--bg-card)] border border-[var(--green-primary)]/20 rounded-3xl px-6 sm:px-12 py-10 sm:py-14">
            {/* Decorative glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-[var(--green-primary)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[var(--green-primary)]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-3">Ready to start?</p>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-3">
                  Day 1 starts<br />today.
                </h2>
                <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
                  The best PMs aren&apos;t born sharp — they build the habit. Two minutes is all it takes to start.
                </p>
              </div>

              <div className="flex flex-col gap-3 flex-shrink-0 w-full sm:w-auto">
                <BrowserLink
                  href="/login"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--green-primary)]/25 w-full"
                >
                  {GOOGLE_ICON}
                  Sign up with Google
                </BrowserLink>
                {abVariant === "treatment" && <HomepageTrialButton />}
                <p className="text-center text-xs text-[var(--text-secondary)]">No password · Takes 30 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border-color)] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <span>🔥</span>
            <div className="font-black text-sm flex items-center gap-1">
              <span className="text-[var(--green-primary)]">PM</span>
              <span className="text-white">Streak</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p>Powered by insights from Lenny&apos;s Podcast. Not affiliated with Lenny&apos;s Newsletter.</p>
        </div>
      </footer>

    </div>
  );
}
