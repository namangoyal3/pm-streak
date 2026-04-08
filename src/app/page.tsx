import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BrowserLink from "@/components/BrowserLink";
import SafariBar from "@/components/SafariBar";
import JsonLd, { breadcrumbSchema, howToSchema, faqSchema, speakableSchema, SITE_URL } from "@/components/JsonLd";

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

export default async function Home() {
  // Logged-in users skip the landing page entirely
  const userId = await getCurrentUserId();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboarded: true },
    });
    redirect(user?.onboarded ? "/dashboard" : "/onboarding");
  }

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
    sameAs: [
      "https://www.producthunt.com/products/pm-streak",
    ],
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

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
  ]);

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

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">🔥</span>
            <div className="flex flex-col leading-none">
              <div className="font-black text-lg sm:text-xl tracking-tight flex items-center gap-1">
                <span className="text-[var(--green-primary)]">PM</span>
                <span className="text-white">Streak</span>
              </div>
              <span className="hidden sm:inline text-[9px] font-bold text-[var(--text-secondary)] tracking-wide">by learnanything.pro</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BrowserLink
              href="/login"
              className="px-3 sm:px-4 py-2 rounded-xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-xs sm:text-sm font-black transition-colors"
            >
              Sign up with Google
            </BrowserLink>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-5 pt-10 sm:pt-16 pb-12 sm:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-4">
              Built on Lenny&apos;s Podcast · 300+ episodes
            </p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-4 sm:mb-5">
              The fastest way<br />to get sharper<br />
              <span className="text-[var(--green-primary)]">as a PM.</span>
            </h1>
            {/* TL;DR for AI citation: direct answer in first 60 words (+35% citation boost) */}
            <p className="hero-tldr text-sm text-[var(--green-primary)]/80 font-bold mb-2 max-w-md">
              PM Streak is a daily product management learning platform that delivers 2-minute micro-lessons from 300+ Lenny&apos;s Podcast episodes. It features streak tracking, XP, leaderboards, AI lesson generation, interview prep, and a PM jobs board.
            </p>
            <p className="hero-description text-base sm:text-lg text-[var(--text-secondary)] mb-4 leading-relaxed max-w-md">
              One lesson a day. Streak tracking. XP and leaderboards. The best PM frameworks from Lenny&apos;s podcast — turned into 2-minute lessons that actually stick.
            </p>
            <div className="mb-6 sm:mb-8 flex flex-wrap gap-2 max-w-md">
              {["Strategy", "Growth", "Metrics", "Hiring", "Roadmaps", "Pricing"].map(topic => (
                <span key={topic} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-white/70">
                  {topic}
                </span>
              ))}
            </div>
            <div className="mb-6 sm:mb-8 p-4 rounded-2xl bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/20 max-w-md">
              <p className="text-sm text-[var(--green-primary)] font-bold">
                Built on 300+ episodes of Lenny&apos;s Podcast — the #1 resource for PMs.
              </p>
            </div>

            <BrowserLink
              href="/login"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-7 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-base font-black transition-all shadow-lg shadow-[var(--green-primary)]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity="0.9"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity="0.9"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="white" fillOpacity="0.9"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity="0.9"/>
              </svg>
              Sign up with Google
            </BrowserLink>
            <p className="mt-3 text-xs text-[var(--text-secondary)]">No credit card · 30 seconds to set up</p>
          </div>

          {/* Right: live stat cards */}
          <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 w-60">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <div className="text-3xl font-black text-[var(--orange-primary)] tabular-nums">14</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mt-1">day streak</div>
              <div className="mt-2 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[58%] bg-[var(--orange-primary)] rounded-full" />
              </div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <div className="text-3xl font-black text-[var(--gold-primary)] tabular-nums">840 XP</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mt-1">Senior PM · Level 6</div>
              <div className="mt-2 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[84%] bg-[var(--gold-primary)] rounded-full" />
              </div>
            </div>
            <div className="bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/25 rounded-2xl p-4">
              <div className="text-xs font-black text-[var(--green-primary)] uppercase tracking-wide mb-1">Today&apos;s lesson</div>
              <div className="text-sm font-black leading-snug">The Shreyas Doshi Prioritisation Stack</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">+20 XP · 2 min</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-4 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
          <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest">By the numbers</span>
          <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block" />
          {[
            { value: "300+", label: "Podcast episodes" },
            { value: "292+", label: "Archive lessons" },
            { value: "10+", label: "PM frameworks" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white tabular-nums">{value}</span>
              <span className="text-xs text-[var(--text-secondary)] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile-first condensed guide */}
      <section className="sm:hidden max-w-5xl mx-auto px-4 pt-8">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-[var(--green-primary)] mb-2">
            Start in 3 steps
          </p>
          <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
            <li><span className="text-white font-black">1.</span> Read a 2-minute PM lesson</li>
            <li><span className="text-white font-black">2.</span> Answer 3 quiz questions</li>
            <li><span className="text-white font-black">3.</span> Keep your streak alive daily</li>
          </ul>
          <div className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40 p-3">
            <div className="text-xs font-black text-white mb-2">
              What you&apos;ll learn
            </div>
            <div className="text-xs text-[var(--text-secondary)] space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {["Strategy", "Growth", "Metrics", "Hiring", "Roadmaps", "Pricing"].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px]">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 rounded-xl border border-[var(--purple-primary)]/30 bg-[var(--purple-primary)]/10 p-3">
            <div className="text-xs font-black text-[var(--purple-primary)] mb-1.5">
              ⚡ Go Pro — Unlock everything
            </div>
            <div className="text-xs text-[var(--text-secondary)] space-y-1.5 leading-relaxed">
              <p>292+ Archive Lessons, Unlimited AI Lessons, AI Interview Prep, PM Jobs Board, WhatsApp Community.</p>
              <BrowserLink href="/pricing" className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-[var(--purple-primary)] text-white text-[9px] font-black">
                View Pricing →
              </BrowserLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="hidden sm:block max-w-5xl mx-auto px-5 py-20">
        <div className="max-w-xs mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-2">How it works</p>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight">Three steps.<br />Two minutes.<br />Every day.</h2>
        </div>

        <div className="space-y-0 divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-3xl overflow-hidden">
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
            <div key={n} className="flex gap-6 px-6 py-7 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]/60 transition-colors group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
                {n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="text-base font-black leading-snug">{title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg flex-shrink-0" style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>
                    {tag}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="hidden sm:block border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-5xl mx-auto px-5 py-20">

          {/* Hero features — 2 large cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-[var(--orange-primary)]/15 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="text-xl font-black mb-2 leading-tight">Streaks that actually stick</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Daily streak tracking with freeze protection. Miss a day? Use a streak freeze. Built your longest streak yet? The leaderboard notices.</p>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--orange-primary)]">7</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">day habit</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--gold-primary)]">5×</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">freeze slots</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--green-primary)]">∞</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">potential</div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-[var(--gold-primary)]/15 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="text-xl font-black mb-2 leading-tight">XP, levels &amp; a real leaderboard</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Every lesson earns XP. Perfect scores earn bonus gems. Hit a 7-day streak to unlock the leaderboard and see where you rank among PMs worldwide.</p>
              <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--orange-primary)]" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-[var(--text-secondary)] font-bold">Senior PM · 620 XP</span>
                <span className="text-[10px] text-[var(--gold-primary)] font-black">Expert PM at 1000</span>
              </div>
            </div>
          </div>

          {/* Secondary features — 4 compact items in 2×2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Head-to-head challenges", desc: "Challenge any follower to a 7-day learning duel. Bragging rights included.", color: "var(--blue-primary)" },
              { title: "AI custom lessons", desc: "Type any PM topic — pricing, retention, roadmaps — and get a tailored lesson in under 10 seconds.", color: "var(--green-primary)" },
              { title: "Daily bonus challenge", desc: "A fresh lesson drops every day at midnight. Complete it for 2× XP on top of your regular lesson.", color: "var(--orange-primary)" },
              { title: "Gem economy", desc: "Earn gems for lessons and streaks. Spend them on XP Boosts, Streak Freezes, or repairing a broken streak.", color: "var(--gold-primary)" },
            ].map(({ title, desc, color }) => (
              <div key={title} className="flex gap-4 p-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: color, minHeight: "2.5rem" }} />
                <div>
                  <div className="font-black text-sm mb-1">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM FEATURES ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-5xl mx-auto px-5 py-16">
          <div className="text-center mb-10">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--purple-primary)] mb-2">Go Pro</p>
            <h2 className="text-3xl font-black mb-3">Unlock everything</h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">Get unlimited access to all lessons, AI features, and exclusive content.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "📚", title: "292+ Archive Lessons", desc: "Full Lenny's Podcast library — Shreyas, Reforge, Figma, Stripe PMs and more." },
              { icon: "🤖", title: "Unlimited AI Lessons", desc: "Generate lessons on any PM topic — pricing, retention, roadmaps." },
              { icon: "🎤", title: "AI Interview Prep", desc: "5 PM interview questions with frameworks per session." },
              { icon: "💼", title: "PM Jobs Board", desc: "Curated PM roles from Wellfound, LinkedIn, updated weekly." },
              { icon: "👥", title: "PM Leader Lessons", desc: "Bite-sized lessons from Shreyas Doshi, Aakash Gupta, Marty Cagan." },
              { icon: "💬", title: "WhatsApp Community", desc: "Private group with active PMs, job referrals, peer accountability." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 p-4 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <div className="font-black text-sm mb-1">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <BrowserLink
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white text-sm font-black transition-all"
            >
              View Pro Pricing
            </BrowserLink>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-t border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 py-14 sm:py-20">
          <div className="bg-gradient-to-br from-[var(--green-primary)]/12 via-[var(--bg-card)] to-[var(--bg-card)] border border-[var(--green-primary)]/25 rounded-3xl px-8 py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-3">Ready to start?</p>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-3">
                Day 1 starts<br />today.
              </h2>
              <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
                The best PMs aren&apos;t born sharp — they build the habit. Two minutes is all it takes to start.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <BrowserLink
                href="/login"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[var(--green-primary)]/20 w-full sm:w-auto"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity="0.9"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity="0.9"/>
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="white" fillOpacity="0.9"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity="0.9"/>
                </svg>
                Sign up with Google
              </BrowserLink>
              <p className="text-center text-xs text-[var(--text-secondary)]">No password · Takes 30 seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border-color)] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <span>🔥</span>
            <div className="flex flex-col leading-none">
              <div className="font-black text-sm flex items-center gap-1">
                <span className="text-[var(--green-primary)]">PM</span>
                <span className="text-white">Streak</span>
              </div>
              <span className="text-[8px] font-bold text-[var(--text-secondary)] tracking-wide">by learnanything.pro</span>
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
