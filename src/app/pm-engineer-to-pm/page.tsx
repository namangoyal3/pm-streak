import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Engineer to PM (2026) — The Most Common PM Transition",
  description:
    "How engineers become PMs. Strengths they bring, habits to unlearn, and why ex-engineers often make the best technical PMs.",
  keywords: [
    "engineer to PM", "software engineer PM transition 2026",
  ],
  alternates: { canonical: "/pm-engineer-to-pm" },
  openGraph: {
    title: "PM Engineer to PM 2026 — PM Streak",
    description: "How engineers become PMs.",
    url: `${SITE_URL}/pm-engineer-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Engineer+to+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Engineer to PM 2026 — PM Streak",
    description: "How engineers become PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Engineer+to+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRENGTHS = [
  "Technical depth earns engineer trust",
  "Ability to evaluate feasibility quickly",
  "Reading code and PRs for context",
  "Empathy for implementation complexity",
];

const GAPS = [
  "Over-indexing on technical elegance vs user value",
  "Weakness on stakeholder management",
  "Difficulty writing for non-technical audiences",
  "Comfort with ambiguity in roadmap and strategy",
];

const FAQS = [
  {
    q: "Should every engineer consider becoming a PM?",
    a: "No. Engineers who love the craft of building should stay engineers — IC paths have huge ceilings and better work-life balance. Engineers who find themselves drawn to problem framing, user research, and cross-functional work are better PM candidates. If you&apos;re bored of code review, PM probably isn&apos;t the answer.",
  },
];

export default function PmEngineerToPmPage() {
  const dates = pageDates("/pm-engineer-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Engineer to PM", url: `${SITE_URL}/pm-engineer-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Engineer to PM (2026 Edition)",
        description:
          "How engineers become PMs. Strengths they bring, habits to unlearn, and why ex-engineers often make the best technical PMs.",
        image: `${SITE_URL}/api/og?title=PM+Engineer+to+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-engineer-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⌨️</span> Technical trust is earned. PM craft is learned.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Engineer to PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Engineers who become PMs bring technical depth that earns engineer trust, the ability to evaluate feasibility quickly, and empathy for implementation complexity built from reading code and PRs — what most need to unlearn is over-indexing on technical elegance over user value, weak stakeholder management, and writing that assumes a technical reader.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 strengths engineers bring and 4 habits to unlearn.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Transition Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Strengths</h2>
          <div className="space-y-2">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Gaps</h2>
            <div className="space-y-2">
              {GAPS.map((g, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{g}</p>
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

        <RelatedPages slug="pm-engineer-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Engineer-to-PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
