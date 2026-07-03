import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM OKRs Guide (2026) — Writing OKRs That Actually Move Work",
  description:
    "How PMs write OKRs that drive focus without becoming bureaucracy. Objectives, key results, grading, and the common mistakes.",
  keywords: [
    "PM OKRs", "OKRs guide",
    "objectives key results", "OKR 2026",
  ],
  alternates: { canonical: "/pm-okrs-guide" },
  openGraph: {
    title: "PM OKRs Guide 2026 — PM Streak",
    description: "How PMs write OKRs that drive focus.",
    url: `${SITE_URL}/pm-okrs-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+OKRs+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM OKRs Guide 2026 — PM Streak",
    description: "How PMs write OKRs that drive focus.",
    images: [`${SITE_URL}/api/og?title=PM+OKRs+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RULES = [
  "Objectives are qualitative and aspirational — what good looks like",
  "Key results are quantitative and measurable — how we&apos;ll know we got there",
  "3 objectives per team per quarter maximum — focus beats coverage",
  "KRs are outcomes, not outputs — not &apos;ship feature X&apos; but &apos;increase conversion by 20%&apos;",
  "Grade honestly mid-quarter — recalibrate or kill",
];

const TRAPS = [
  "OKRs as a tax — teams writing them to check a box, not to focus",
  "Too many KRs — dilutes the signal of what matters",
  "Sandbagging — setting goals you&apos;re sure to hit; kills stretch",
  "No visibility — OKRs in a doc nobody reads",
  "No review rhythm — set in Q1, forgotten by Q2",
];

const FAQS = [
  {
    q: "Are OKRs still fashionable in 2026?",
    a: "Practical more than fashionable. Many high-performing orgs have simplified from strict quarterly OKRs to lighter semi-annual goals with monthly check-ins. The principle (focus, measurability, honest grading) endures; the ceremony often doesn&apos;t. Adapt to your team&apos;s needs.",
  },
];

export default function PmOkrsGuidePage() {
  const dates = pageDates("/pm-okrs-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM OKRs Guide", url: `${SITE_URL}/pm-okrs-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM OKRs Guide (2026 Edition)",
        description:
          "How PMs write OKRs that drive focus without becoming bureaucracy. Objectives, key results, grading, and the common mistakes.",
        image: `${SITE_URL}/api/og?title=PM+OKRs+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-okrs-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> OKRs work when they force focus. They fail when they become ceremony.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM OKRs Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Writing an OKR here means pairing a qualitative, aspirational Objective with quantitative Key Results that describe outcomes, not outputs — increasing conversion by 20%, not shipping a feature — capped at three Objectives per quarter and graded honestly mid-quarter. Five traps undermine this in practice: treating OKRs as a box-checking tax, piling on too many KRs, sandbagging targets, zero visibility once they&apos;re set, and no rhythm for revisiting them.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 rules and 5 traps for writing OKRs that actually move work.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build OKR PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Rules</h2>
          <div className="space-y-2">
            {RULES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-okrs-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice OKR Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
