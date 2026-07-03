import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Customer Segmentation Guide (2026) — How to Segment Users Usefully",
  description:
    "How PMs segment customers for product decisions. Beyond demographics — behavioural, needs-based, and JTBD segmentation with examples.",
  keywords: [
    "PM customer segmentation", "user segmentation product manager",
    "behavioural segmentation PM", "JTBD segmentation",
    "user personas vs segments 2026",
  ],
  alternates: { canonical: "/pm-customer-segmentation" },
  openGraph: {
    title: "PM Customer Segmentation Guide 2026 — PM Streak",
    description: "How PMs segment users in ways that actually drive product decisions.",
    url: `${SITE_URL}/pm-customer-segmentation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Customer+Segmentation+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Customer Segmentation Guide 2026 — PM Streak",
    description: "How PMs segment users in ways that actually drive product decisions.",
    images: [`${SITE_URL}/api/og?title=PM+Customer+Segmentation+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  {
    type: "Demographic (weakest)",
    what: "Age, gender, location, income.",
    useful: "Basic targeting, marketing campaigns.",
    limit: "Doesn&apos;t explain behaviour — two 28-year-old Bangalore women can have completely different product needs.",
  },
  {
    type: "Behavioural",
    what: "Segmentation by in-product actions — feature usage, frequency, depth.",
    useful: "Retention work, feature prioritisation, lifecycle marketing.",
    limit: "Describes WHAT users do but not WHY. Still useful for action.",
  },
  {
    type: "Needs-based",
    what: "Segmentation by user goals — what they&apos;re trying to achieve.",
    useful: "Product positioning, onboarding customisation, feature roadmap.",
    limit: "Requires qualitative research to map correctly. Worth the investment.",
  },
  {
    type: "Jobs To Be Done (JTBD)",
    what: "Segmentation by the job users hire the product to do.",
    useful: "Strategic product direction, new market entry, understanding switching behaviour.",
    limit: "Hardest to identify but most strategically powerful. Best-in-class PM segmentation.",
  },
  {
    type: "Value-based (B2B)",
    what: "Segmentation by ARR tier, growth trajectory, or strategic importance.",
    useful: "Customer success prioritisation, feature access, roadmap decisions.",
    limit: "Mostly a B2B tool. Less relevant for consumer products.",
  },
];

const HOW_TO_USE = [
  "Pick segments that would lead to different product decisions — if not, you&apos;re overfitting",
  "Validate segments with data — don&apos;t assume the segments in your head are real",
  "Size each segment — a beautiful segment with 0.5% of users isn&apos;t worth targeting",
  "Design for one segment at a time — trying to serve all loses everyone",
  "Revisit segmentation annually — user base shifts, segments evolve",
  "Share segmentation widely — design, marketing, CS all benefit from shared mental model",
];

const COMMON_MISTAKES = [
  "Creating 10+ personas — no team remembers more than 3",
  "Demographic-only segmentation — &apos;millennials&apos; isn&apos;t a product strategy",
  "Inventing segments without validating them in data",
  "Over-indexing on vocal minority — loudest users ≠ most important segment",
  "Segmentation frozen in time — user base shifts in 12 months",
  "Not linking segments to decisions — segments that don&apos;t change what you build are theatre",
];

const FAQS = [
  {
    q: "What&apos;s the difference between a segment and a persona?",
    a: "A segment is a measurable group in your user base. A persona is a narrative representation of a segment — a name, a story, demographics. Segments are for analysis; personas are for alignment. PMs often confuse them. Use both: segments for the spreadsheet, personas for the PRD.",
  },
  {
    q: "How many customer segments should a PM product team track?",
    a: "3–5 primary segments. Fewer and you&apos;re grouping dissimilar users; more and no one remembers the segments (so they get ignored). Start with 3, add as you genuinely need to differentiate product decisions. If two segments always get the same feature decisions, they&apos;re one segment.",
  },
];

export default function PmCustomerSegmentationPage() {
  const dates = pageDates("/pm-customer-segmentation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Customer Segmentation", url: `${SITE_URL}/pm-customer-segmentation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Customer Segmentation Guide (2026 Edition)",
        description:
          "How PMs segment customers for product decisions. Beyond demographics — behavioural, needs-based, and JTBD segmentation with examples.",
        image: `${SITE_URL}/api/og?title=PM+Customer+Segmentation+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-segmentation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧬</span> Great segmentation changes what you build. Bad segmentation changes a slide.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Customer Segmentation<br />Guide (2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Five approaches exist for segmenting PM customers, ranging from weak demographic splits up through
            behavioural, needs-based, jobs-to-be-done, and B2B value-based tiers — JTBD is hardest to identify but
            most strategically powerful. Segments differ from personas: a segment is the measurable group, a
            persona its narrative face, and most teams should track only three to five segments since more than
            that nobody remembers.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 types of segmentation from demographic to JTBD, 6 rules for using segments well,
            and 6 common segmentation mistakes.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User Segmentation Skills Daily — Free →
          </Link>
        </section>

        {/* Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Types of Segmentation</h2>
          <div className="space-y-5">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {t.type}</p>
                <p className="text-sm text-white/70 mb-2">{t.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400 mb-1">✅ Useful for</p>
                    <p className="text-xs text-white/70">{t.useful}</p>
                  </div>
                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-xs text-yellow-400 mb-1">⚠️ Limitation</p>
                    <p className="text-xs text-white/70">{t.limit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Rules for Segmenting Well</h2>
            <div className="space-y-2">
              {HOW_TO_USE.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Common Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-customer-segmentation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Segmentation Intuition Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that force you to define users specifically — not vaguely.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
