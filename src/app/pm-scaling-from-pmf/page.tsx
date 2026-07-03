import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Scaling From PMF (2026) — How to Scale a Product After Finding Fit",
  description:
    "How PMs scale products after finding PMF. Widening the user base, expanding geography, protecting core, and the scaling traps that break PMF.",
  keywords: [
    "PM scaling", "scaling after PMF",
    "expanding product", "growth after fit",
    "product scaling 2026",
  ],
  alternates: { canonical: "/pm-scaling-from-pmf" },
  openGraph: {
    title: "PM Scaling From PMF 2026 — PM Streak",
    description: "How PMs scale products after PMF — wider users, geography, protecting core.",
    url: `${SITE_URL}/pm-scaling-from-pmf`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Scaling+From+PMF+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Scaling From PMF 2026 — PM Streak",
    description: "How PMs scale products after PMF — wider users, geography, protecting core.",
    images: [`${SITE_URL}/api/og?title=PM+Scaling+From+PMF+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SCALING_MOVES = [
  "Widen user base — adjacent personas; start with the one closest to core user",
  "Expand geography — same product, new markets (with localisation)",
  "Deepen core use case — do the main thing better before adding new ones",
  "Add adjacent value — features that enhance what&apos;s already working",
  "Build platform / API — let others extend your product",
];

const PROTECT_CORE = [
  "Don&apos;t let new-user features degrade core experience",
  "Monitor core cohort retention — if it drops, you&apos;re breaking what worked",
  "Keep founding user segment happy — they&apos;re your validation",
  "Resist feature requests that don&apos;t fit the core value",
  "Quarterly check: is our core still getting better, not just wider?",
];

const COMMON_TRAPS = [
  "Premature horizontal expansion — widening before PMF is solid loses focus",
  "Pivoting from what worked — chasing new shiny things, losing existing users",
  "Over-engineering for scale — building for 10x users you don&apos;t have yet",
  "Losing founding team voice — new PMs make different calls that dilute",
  "Metrics that hide degradation — aggregate grows, but core cohort is leaving",
  "Entering markets you don&apos;t understand — assuming PMF transfers",
];

const SIGNS_OF_HEALTHY_SCALING = [
  "Core cohort retention maintains or improves",
  "New cohorts retain at healthy rates (not much worse than founding)",
  "Organic growth continues — referrals, word-of-mouth still working",
  "Team can ship new things without breaking old things",
  "NPS stays stable or rises — scaling isn&apos;t hurting quality",
];

const FAQS = [
  {
    q: "How do PMs know it&apos;s safe to scale after PMF?",
    a: "When retention is stable across multiple cohorts, organic growth is meaningful, and the product is consistently shippable without quality regressions. If any of these are shaky, scaling will stress them further. Premature scaling is one of the most common reasons promising products fail.",
  },
  {
    q: "What&apos;s the biggest scaling PM mistake?",
    a: "Expanding horizontally before core is rock-solid. PMs see growth plateau and think &apos;we need a bigger market&apos; — but usually the fix is a deeper core, not a wider one. Great PMs deepen before widening. Bad PMs widen to escape deepening.",
  },
];

export default function PmScalingFromPmfPage() {
  const dates = pageDates("/pm-scaling-from-pmf");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Scaling From PMF", url: `${SITE_URL}/pm-scaling-from-pmf` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Scaling From PMF (2026 Edition)",
        description:
          "How PMs scale products after finding PMF. Widening the user base, expanding geography, protecting core, and the scaling traps that break PMF.",
        image: `${SITE_URL}/api/og?title=PM+Scaling+From+PMF+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-scaling-from-pmf`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Deepen before you widen. Protect the core always.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Scaling From PMF<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-2">
            Scaling safely after PMF hinges on deepening the core use case before widening —
            expanding user base, geography, or platform reach only once core-cohort retention holds
            steady, new cohorts retain nearly as well as founding users, and the team can ship
            without breaking what already works. Premature horizontal expansion before that core is
            solid is the most common way promising products lose the fit they just found.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 scaling moves, 5 core-protection principles, 6 traps, and 5 signs of healthy scaling.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Scaling Skills Daily — Free →
          </Link>
        </section>

        {/* Scaling moves */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Scaling Moves</h2>
          <div className="space-y-2">
            {SCALING_MOVES.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Protect core */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Ways to Protect the Core</h2>
            <div className="space-y-2">
              {PROTECT_CORE.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traps */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Scaling Traps</h2>
          <div className="space-y-2">
            {COMMON_TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Healthy signs */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs of Healthy Scaling</h2>
            <div className="space-y-2">
              {SIGNS_OF_HEALTHY_SCALING.map((s, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-scaling-from-pmf" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Scaling Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on scaling decisions, expansion trade-offs, and protecting core.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
