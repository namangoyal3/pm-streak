import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Funnel Analysis Guide (2026) — How to Diagnose Any Funnel",
  description:
    "How PMs do funnel analysis that leads to action. Defining funnels correctly, spotting the real drop-off, segmentation, and what to do about it.",
  keywords: [
    "PM funnel analysis", "product funnel diagnosis",
    "conversion funnel PM", "funnel drop-off PM",
    "funnel optimisation 2026",
  ],
  alternates: { canonical: "/pm-funnel-analysis" },
  openGraph: {
    title: "PM Funnel Analysis Guide 2026 — PM Streak",
    description: "How PMs diagnose funnels that lead to action — define, segment, fix.",
    url: `${SITE_URL}/pm-funnel-analysis`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Funnel+Analysis+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Funnel Analysis Guide 2026 — PM Streak",
    description: "How PMs diagnose funnels that lead to action — define, segment, fix.",
    images: [`${SITE_URL}/api/og?title=PM+Funnel+Analysis+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DEFINE_FUNNEL = [
  "Start with the outcome — &apos;completed first purchase&apos; not &apos;engaged user&apos;",
  "Identify 4–7 meaningful steps — more than 7 gets noisy",
  "Each step should be an observable event — instrumented, timestamped",
  "Pick time windows that match user intent (session, 24h, 7d)",
  "Document the funnel definition — different PMs will define &apos;signed up&apos; differently",
];

const FIND_DROP_OFF = [
  "Look at step-to-step conversion, not just end-to-end",
  "Find the step with largest absolute drop AND largest % drop",
  "Compare conversion vs industry benchmarks if available",
  "Look at cohorts — which signup cohorts perform best/worst?",
  "Segment by channel, device, geography — drop-off may be concentrated",
];

const WHY_DROP_OFF = [
  "UX friction — too many fields, confusing buttons, slow loads",
  "Unclear value — user doesn&apos;t understand why next step matters",
  "Trust gap — especially at payment/data-sharing steps",
  "Technical issue — bugs, errors, slow APIs",
  "Wrong expectation — users thought they were getting X, found Y",
  "Missing context — user needs info they don&apos;t have yet",
];

const FIXES = [
  "Remove steps — fewest always beats improvements to existing",
  "Reduce required fields — defer non-essential to later",
  "Add trust signals at key conversion points",
  "Improve copy — clear benefit statement &gt; polished design",
  "A/B test reductions — what&apos;s essential vs what feels essential?",
  "Fix bugs first — never optimise a broken step",
];

const FAQS = [
  {
    q: "How do PMs pick which funnel step to improve first?",
    a: "Biggest absolute impact, not biggest % drop. A step that loses 20% of 10,000 users (2,000) is bigger than a step that loses 60% of 100 users (60). Focus on where the volume × % drop product is largest. This is the &apos;right size of lever&apos; — small steps further down the funnel often matter less than bigger steps up top.",
  },
  {
    q: "What&apos;s the biggest funnel analysis mistake?",
    a: "Treating it as a single number instead of a shape. &apos;Our signup conversion is 30%&apos; tells you nothing actionable. The shape — which steps convert poorly vs well, how it varies by segment — tells you where to invest. PMs who quote the aggregate number without segmenting miss 80% of the signal.",
  },
];

export default function PmFunnelAnalysisPage() {
  const dates = pageDates("/pm-funnel-analysis");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Funnel Analysis", url: `${SITE_URL}/pm-funnel-analysis` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Funnel Analysis Guide (2026 Edition)",
        description:
          "How PMs do funnel analysis that leads to action. Defining funnels correctly, spotting the real drop-off, segmentation, and what to do about it.",
        image: `${SITE_URL}/api/og?title=PM+Funnel+Analysis+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-funnel-analysis`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔻</span> Every PM problem has a funnel hiding inside it
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Funnel Analysis Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Funnel analysis means defining 4–7 observable steps toward one real outcome, then comparing step-to-step conversion — not the aggregate rate — to find where the largest absolute drop happens. The real diagnosis work is asking why: UX friction, unclear value, trust gaps, technical bugs, or mismatched expectations, then testing whether removing steps or adding trust signals moves the number.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 steps to define funnels correctly, 5 moves to find the real drop-off,
            6 reasons users drop off, and 6 ways to fix it.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Funnel Intuition Daily — Free →
          </Link>
        </section>

        {/* Define */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Steps to Define Your Funnel Correctly</h2>
          <div className="space-y-2">
            {DEFINE_FUNNEL.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Find drop-off */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Moves to Find the Real Drop-Off</h2>
            <div className="space-y-2">
              {FIND_DROP_OFF.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why drop-off */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Reasons Users Drop Off</h2>
          <div className="space-y-2">
            {WHY_DROP_OFF.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fixes */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Fixes That Work</h2>
            <div className="space-y-2">
              {FIXES.map((f, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
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

        <RelatedPages slug="pm-funnel-analysis" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Funnel Intuition Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on funnel diagnosis, segmentation, and conversion fixes.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
