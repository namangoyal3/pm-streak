import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "How to Handle Multiple PM Offers (2026) — Deciding Between Companies",
  description:
    "How to evaluate multiple PM offers. Beyond comp: manager quality, scope, growth trajectory, and the decision framework that stops you from choosing on instinct alone.",
  keywords: [
    "multiple PM offers", "how to choose PM offer",
    "PM offer comparison", "evaluating PM jobs",
    "PM job decision 2026",
  ],
  alternates: { canonical: "/pm-offers-multiple" },
  openGraph: {
    title: "Handling Multiple PM Offers 2026 — PM Streak",
    description: "How to decide between PM offers beyond compensation — scope, manager, growth.",
    url: `${SITE_URL}/pm-offers-multiple`,
    images: [{ url: `${SITE_URL}/api/og?title=Handling+Multiple+PM+Offers+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handling Multiple PM Offers 2026 — PM Streak",
    description: "How to decide between PM offers beyond compensation — scope, manager, growth.",
    images: [`${SITE_URL}/api/og?title=Handling+Multiple+PM+Offers+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const FACTORS = [
  {
    factor: "Manager quality",
    why: "Your manager affects career growth more than any other factor. Good managers develop you; bad ones stall careers regardless of brand.",
    howToAssess: "Ask for 2–3 references from their current/former direct reports. What do they say unprompted? Do direct reports get promoted?",
  },
  {
    factor: "Scope of the role",
    why: "Scope determines what you&apos;ll learn and what career capital you&apos;ll build. Bigger company, smaller scope often = slower growth.",
    howToAssess: "Clarify: how many engineers/designers will you work with? What&apos;s the P&amp;L or metric you own? What decisions can you make autonomously?",
  },
  {
    factor: "Company trajectory",
    why: "A rising company opens opportunities; a stalled one closes them. Growth > brand at early-mid career.",
    howToAssess: "Latest revenue growth, funding trajectory, headcount trend, press cadence. Talk to 2 current employees candidly." ,
  },
  {
    factor: "Compensation (total, not just base)",
    why: "Cash + equity + sign-on + benefits vary widely. Don&apos;t anchor on one component.",
    howToAssess: "Model 4-year total comp for each offer. Factor in equity dilution and realistic value (not peak value)." ,
  },
  {
    factor: "Product you care about",
    why: "Caring compounds into better work over 2+ years. Working on something you don&apos;t care about burns out faster.",
    howToAssess: "Would you use this product? Would you spend time reading about this industry? Honest test — no rationalising." ,
  },
  {
    factor: "Learning velocity",
    why: "Your next job&apos;s options depend on what you learn in this one. Pick the role that stretches you most.",
    howToAssess: "What&apos;s the biggest thing you&apos;ll learn? Who are the peers you&apos;ll learn from? Are the problems you&apos;ll solve unfamiliar or familiar?" ,
  },
];

const RED_FLAGS = [
  "Pressure to sign same-day — good companies give 5–7 days to decide",
  "Manager avoids connecting you with their direct reports",
  "Vague answers about the scope or team size",
  "Compensation details change between conversations",
  "Glassdoor shows a pattern (not isolated cases) of bad reviews",
  "You leave the interview loop feeling drained, not energised",
];

const DECISION_FRAMEWORK = [
  "Rank each offer on the 6 factors on a 1–5 scale",
  "Weight the factors by what matters MOST to you right now (not in general)",
  "Identify the 2 factors where the offers differ most — decide based on those",
  "Sleep on it. Fresh eyes next morning catch rationalisation",
  "Call 1 mentor who knows you well — not for their opinion, for their questions",
  "Trust your gut ONLY as a tiebreaker — not as the primary criterion",
];

const FAQS = [
  {
    q: "Is compensation the most important factor in choosing between PM offers?",
    a: "Rarely. Over a 5-year horizon, manager quality and scope usually matter more than a 20% comp difference. A ₹10L/year more from the wrong manager or role can cost you a promotion cycle — which is worth far more than the salary delta. That said, don&apos;t ignore comp either — meaningful gaps (&gt;30%) are hard to dismiss.",
  },
  {
    q: "How long should it take to decide between offers?",
    a: "3–7 days is typical. Less than 2 days and you&apos;re likely rationalising; more than 10 and you&apos;re avoiding the decision. Use the time for reference calls, follow-up questions with the hiring manager, and honest reflection. Don&apos;t decide on day 1 even if it feels obvious.",
  },
  {
    q: "What&apos;s the biggest regret PMs have about choosing offers?",
    a: "Optimising for brand over scope. &apos;I joined for the brand, spent 2 years on tiny scope, fell behind peers who took stretch roles at smaller companies.&apos; The second biggest: ignoring manager red flags. PMs who heard warnings about a manager but joined anyway regret it disproportionately often.",
  },
];

export default function PmOffersMultiplePage() {
  const dates = pageDates("/pm-offers-multiple");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Handling Multiple PM Offers", url: `${SITE_URL}/pm-offers-multiple` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Multiple PM Offers Guide (2026 Edition)",
        description: "How to evaluate multiple PM offers. Beyond comp: manager quality, scope, growth trajectory, and the decision framework that stops you from choosing on instinct alone.",
        image: `${SITE_URL}/api/og?title=Handling+Multiple+PM+Offers+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-offers-multiple`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> The right PM role 5 years from now depends on today&apos;s decision
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Multiple PM Offers Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Choosing between multiple PM offers comes down to six factors beyond pay — manager quality,
            role scope, company trajectory, total compensation, how much you care about the product, and
            learning velocity — worked through a six-step framework: rank each offer, weight what matters
            most right now, isolate where the offers differ most, sleep on it, call a mentor, and treat
            your gut as a tiebreaker only.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 factors to evaluate beyond compensation, 6 red flags to watch for,
            and a 6-step decision framework that stops you from choosing on instinct alone.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Get the Offers First — Free →
          </Link>
        </section>

        {/* Factors */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Factors Beyond Compensation</h2>
          <div className="space-y-5">
            {FACTORS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {f.factor}</p>
                <p className="text-sm text-white/70 mb-3">{f.why}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219]">🔍 How to assess: <span className="text-white/70">{f.howToAssess}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Red flags */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Red Flags to Watch For</h2>
            <div className="space-y-2">
              {RED_FLAGS.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">🚩</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decision framework */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6-Step Decision Framework</h2>
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

        <RelatedPages slug="pm-offers-multiple" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Land Multiple Offers with Daily Practice</h2>
          <p className="text-white/60 mb-6">Multiple offers require multiple interviews — start the prep that gets you there.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
