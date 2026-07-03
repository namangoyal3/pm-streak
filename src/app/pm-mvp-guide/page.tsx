import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM MVP Guide (2026) — How to Build an MVP Without It Becoming a Mess",
  description:
    "How PMs define and build MVPs correctly. What the M in MVP really means, how to scope, testing vs shipping, and when to skip the MVP entirely.",
  keywords: [
    "PM MVP", "minimum viable product",
    "MVP scoping PM", "building MVP right",
    "MVP design 2026",
  ],
  alternates: { canonical: "/pm-mvp-guide" },
  openGraph: {
    title: "PM MVP Guide 2026 — PM Streak",
    description: "How PMs build MVPs without them becoming messes — scoping, testing, shipping.",
    url: `${SITE_URL}/pm-mvp-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+MVP+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM MVP Guide 2026 — PM Streak",
    description: "How PMs build MVPs without them becoming messes — scoping, testing, shipping.",
    images: [`${SITE_URL}/api/og?title=PM+MVP+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_MVP_IS = [
  "Smallest version that tests your core hypothesis with real users",
  "Functional end-to-end — users can complete the core job, not a screenshot",
  "Learning-oriented — primary output is signal, not scale",
  "Ugly is fine, broken is not — polish can wait, correctness can&apos;t",
  "Scoped ruthlessly — 1 core flow, not 5 &apos;starter&apos; features",
];

const WHAT_MVP_ISNT = [
  "A prototype — prototypes don&apos;t ship to real users",
  "A beta — betas are fuller versions; MVPs are thinner",
  "A launch — MVPs test; launches scale",
  "&apos;Everything we eventually want, but worse&apos; — that&apos;s underbuilt, not minimal",
  "Meant to be scalable — expect to rebuild post-learning",
];

const SCOPING_QUESTIONS = [
  "What&apos;s the ONE hypothesis we&apos;re testing?",
  "What&apos;s the minimum user flow that tests it end-to-end?",
  "What can we fake (Wizard-of-Oz, manual backend, mocks) for now?",
  "What would we learn in 4 weeks that we can&apos;t learn from a 12-week MVP?",
  "What MUST we get right for the signal to be valid?",
];

const WHEN_SKIP_MVP = [
  "Well-understood problem space with clear solution — just build",
  "Existing product adding a well-understood feature — not an experiment",
  "High-stakes launch where &apos;broken MVP&apos; damages brand more than delay",
  "Regulatory/compliance-heavy products — can&apos;t ship partial",
  "Platforms or infrastructure — usually iterative, not MVP-oriented",
];

const FAQS = [
  {
    q: "What&apos;s the biggest MVP mistake PMs make?",
    a: "Including too much. &apos;Minimum&apos; gets compromised to avoid user complaints, edge cases, or stakeholder asks. The discipline: if your MVP takes more than 6 weeks to build, it&apos;s probably not an MVP — it&apos;s a v1 with optimistic labeling. Cut scope ruthlessly; you&apos;ll be surprised what users tolerate for genuine new value.",
  },
  {
    q: "How do PMs decide if an MVP was successful?",
    a: "Pre-commit to learning criteria before building. &apos;If 40% of users complete the flow and 25% come back within 7 days, we&apos;ll invest further.&apos; Without pre-committed criteria, you&apos;ll rationalise any outcome into &apos;validation.&apos; PMs who pre-commit make sharper kill/invest decisions and learn faster.",
  },
];

export default function PmMvpGuidePage() {
  const dates = pageDates("/pm-mvp-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM MVP Guide", url: `${SITE_URL}/pm-mvp-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM MVP Guide (2026 Edition)",
        description: "How PMs define and build MVPs correctly. What the M in MVP really means, how to scope, testing vs shipping, and when to skip the MVP entirely.",
        image: `${SITE_URL}/api/og?title=PM+MVP+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mvp-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🪐</span> MVP = smallest test of a real hypothesis, not &apos;v1 but worse&apos;
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM MVP Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            An MVP is the smallest version of a product that tests one real hypothesis with
            actual users — functional end-to-end, not a screenshot, and scoped to one core flow
            rather than five starter features. It&apos;s not a prototype, beta, or scaled-down launch;
            if it takes more than six weeks to build, it probably isn&apos;t minimal anymore.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 things MVPs actually are, 5 things they aren&apos;t, 5 scoping questions,
            and 5 situations where skipping the MVP is the right call.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Scoping Skills Daily — Free →
          </Link>
        </section>

        {/* What MVP is */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">What an MVP Actually Is</h2>
          <div className="space-y-2">
            {WHAT_MVP_IS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What MVP isn't */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">What It Isn&apos;t</h2>
            <div className="space-y-2">
              {WHAT_MVP_ISNT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scoping */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Questions for Scoping an MVP</h2>
          <div className="space-y-2">
            {SCOPING_QUESTIONS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When skip */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Situations to Skip the MVP</h2>
            <div className="space-y-2">
              {WHEN_SKIP_MVP.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-mvp-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Scoping Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on MVP scoping, hypothesis-testing, and minimum-viable-learning.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
