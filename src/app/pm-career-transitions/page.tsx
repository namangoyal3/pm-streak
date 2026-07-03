import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Career Transitions (2026) — Changing Domain, Scale, or Level",
  description:
    "How PMs navigate career transitions — switching domain, moving from startup to enterprise (or vice versa), going from IC to manager. What&apos;s hard about each, what works.",
  keywords: [
    "PM career transitions", "PM domain switch",
    "startup to enterprise PM", "IC to manager PM",
    "PM career move 2026",
  ],
  alternates: { canonical: "/pm-career-transitions" },
  openGraph: {
    title: "PM Career Transitions 2026 — PM Streak",
    description: "How PMs navigate changing domain, scale, or level — what&apos;s hard, what works.",
    url: `${SITE_URL}/pm-career-transitions`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Career+Transitions+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Career Transitions 2026 — PM Streak",
    description: "How PMs navigate changing domain, scale, or level — what&apos;s hard, what works.",
    images: [`${SITE_URL}/api/og?title=PM+Career+Transitions+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TRANSITIONS = [
  {
    move: "Consumer PM → B2B SaaS PM",
    hardPart: "Shift from pattern-matching user behaviour at scale to understanding complex buyer-user dynamics and slower sales cycles.",
    what_helps: "Focus on metric fluency (ARR, NRR), learn enterprise sales concepts, spend time with customer success and sales teams early.",
  },
  {
    move: "B2B → Consumer PM",
    hardPart: "Shift from account-level thinking to behavioural scale. You won&apos;t have named customers; you&apos;ll have cohorts.",
    what_helps: "Build analytics fluency (Amplitude, retention curves), get comfortable with A/B testing at scale, internalise the psychology of mass-market UX." ,
  },
  {
    move: "Startup PM → Enterprise PM",
    hardPart: "Pace slows dramatically. You&apos;ll spend more time in meetings, more time aligning, less time shipping. Many startup PMs chafe at this.",
    what_helps: "Reframe: you&apos;re now moving bigger numbers slower. Measure yourself on scope, not velocity. Build patience with political complexity." ,
  },
  {
    move: "Enterprise PM → Startup PM",
    hardPart: "Ambiguity everywhere. No clear processes, no documented systems, fewer peers, do-it-yourself everything.",
    what_helps: "Embrace scrappy. Ship imperfect, iterate fast. Your ability to create structure (not follow it) determines success." ,
  },
  {
    move: "IC PM → PM Manager",
    hardPart: "Your output shifts from what YOU ship to what your team ships. This is the hardest transition — most IC skills don&apos;t transfer directly.",
    what_helps: "Coaching mindset over directing, delegation muscle, giving feedback that develops rather than corrects, managing up as much as down." ,
  },
  {
    move: "Domain switch (fintech → edtech, etc.)",
    hardPart: "Domain knowledge doesn&apos;t transfer. You&apos;ll feel like a junior PM for 3–6 months even at senior level.",
    what_helps: "Accept the learning curve. Talk to users obsessively. Read the domain&apos;s canon. Don&apos;t fake expertise; build it." ,
  },
];

const COMMON_PATTERNS = [
  "Lateral moves often require level step-down at new company — accept it for learning velocity",
  "Domain switches are easier at senior levels (you have transferable skills) or junior levels (you have low expectations)",
  "Manager transitions fail most often for PMs who love shipping — if that&apos;s you, stay IC" ,
  "Startup-to-enterprise transitions often succeed; enterprise-to-startup often fail (scrappy-ness is harder to acquire)",
  "Moving for brand usually disappoints; moving for scope usually rewards",
];

const DECISION_FRAMEWORK = [
  "Why this move, honestly? (Money, growth, prestige, burnout, bored, stretch?)",
  "What skill will I develop in this move that I can&apos;t develop in my current role?",
  "What skill will I lose access to that I&apos;ll regret?",
  "Who will I learn from? Will my next manager develop me?",
  "Is this move reversible? Can I come back to my current domain/scale later?",
  "3-year test: does this move make my next-next role easier to get?",
];

const FAQS = [
  {
    q: "Is switching PM domains late in your career risky?",
    a: "Less than it feels. At senior levels, transferable skills (strategic thinking, stakeholder management, metric intuition) often outweigh domain expertise for the right role. The 3–6 month ramp-up is real, but after that, senior PMs typically land where they can add value. The bigger risk is NOT switching when you&apos;ve plateaued — staying too long in one domain caps career ceiling at most companies.",
  },
  {
    q: "Is the IC-to-manager PM transition always a promotion?",
    a: "Organisationally yes, career-wise not always. Some PMs love the IC track (Staff PM, Principal PM) and compensation/ceiling can be comparable. Moving to management means your ceiling changes — you become dependent on your team&apos;s success, and you ship through others. If you deeply love the craft of shipping, stay IC. If you&apos;re energised by developing people and shaping systems, move to management.",
  },
];

export default function PmCareerTransitionsPage() {
  const dates = pageDates("/pm-career-transitions");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Career Transitions", url: `${SITE_URL}/pm-career-transitions` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Career Transitions (2026 Edition)",
        description: "How PMs navigate career transitions — switching domain, moving from startup to enterprise (or vice versa), going from IC to manager. What's hard about each, what works.",
        image: `${SITE_URL}/api/og?title=PM+Career+Transitions+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-career-transitions`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔄</span> The right PM career isn&apos;t linear — it&apos;s deliberate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Career Transitions<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM career transitions fall into six recurring patterns — consumer to B2B, startup to
            enterprise (and back), IC to manager, and domain switches like fintech to edtech —
            each with its own hard part and what actually helps. Startup-to-enterprise moves tend
            to succeed more often than the reverse, and IC-to-manager is widely considered the
            hardest transition of all.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Skills Daily — Free →
          </Link>
        </section>

        {/* Transitions */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Major PM Transitions</h2>
          <div className="space-y-5">
            {TRANSITIONS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-3">{i + 1}. {t.move}</p>
                <div className="space-y-2">
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400 mb-1">⚠️ What&apos;s hard</p>
                    <p className="text-xs text-white/70">{t.hardPart}</p>
                  </div>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ What helps</p>
                    <p className="text-xs text-white/70">{t.what_helps}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Patterns */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Common PM Transition Patterns</h2>
            <div className="space-y-3">
              {COMMON_PATTERNS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decision framework */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Question Decision Framework</h2>
          <div className="space-y-3">
            {DECISION_FRAMEWORK.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
          <div className="space-y-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-white/10 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-white/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedPages slug="pm-career-transitions" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills That Transfer Across Transitions</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios keep your thinking flexible for whatever role comes next.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
