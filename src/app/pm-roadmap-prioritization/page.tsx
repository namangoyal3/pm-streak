import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Roadmap Prioritization (2026) — How PMs Choose What to Build Next",
  description:
    "How PMs prioritise roadmaps when every ask looks urgent. Signals, bets, explicit killed work, and making prioritisation defensible.",
  keywords: [
    "PM roadmap prioritization", "prioritise roadmap",
    "PM priorities", "what to build next 2026",
  ],
  alternates: { canonical: "/pm-roadmap-prioritization" },
  openGraph: {
    title: "PM Roadmap Prioritization 2026 — PM Streak",
    description: "How PMs choose what to build next.",
    url: `${SITE_URL}/pm-roadmap-prioritization`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Roadmap+Prioritization+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Roadmap Prioritization 2026 — PM Streak",
    description: "How PMs choose what to build next.",
    images: [`${SITE_URL}/api/og?title=PM+Roadmap+Prioritization+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const INPUTS = [
  "Strategy — does this advance the bet we&apos;re making?",
  "Customer pain — how painful, how widespread, how willing to pay/stay",
  "Revenue impact — direct or leading indicator",
  "Effort and risk — not just engineering weeks; opportunity cost",
  "Strategic optionality — does this open or close future moves?",
];

const RULES = [
  "Every yes is three nos — make the nos explicit",
  "Kill publicly — stopping work is honest, not weakness",
  "Segment by horizon — Horizon 1 (quarter), H2 (year), H3 (speculative)",
  "Rebalance monthly — reality changes faster than quarterly reviews",
  "Don&apos;t let loud stakeholders set priorities — they&apos;re one voice, not the mandate",
];

const FAQS = [
  {
    q: "How does a PM say no to exec requests?",
    a: "Not with &apos;no&apos; — with &apos;yes, and here&apos;s what won&apos;t happen as a result.&apos; Show the tradeoff: if we build X, we don&apos;t build Y. Let the exec choose. Most requests die when their true cost is visible. The few that survive deserve to be on the roadmap.",
  },
];

export default function PmRoadmapPrioritizationPage() {
  const dates = pageDates("/pm-roadmap-prioritization");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Roadmap Prioritization", url: `${SITE_URL}/pm-roadmap-prioritization` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Roadmap Prioritization (2026 Edition)",
        description: "How PMs prioritise roadmaps when every ask looks urgent. Signals, bets, explicit killed work, and making prioritisation defensible.",
        image: `${SITE_URL}/api/og?title=PM+Roadmap+Prioritization+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-roadmap-prioritization`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Every yes is three nos. Make the nos visible.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Roadmap Prioritization<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Prioritizing a PM roadmap means weighing five signals — strategic fit, customer pain, revenue impact, effort and risk, and strategic optionality — then segmenting survivors into quarter, year, and speculative horizons. Every yes accepted is three nos made explicit, work gets killed publicly rather than quietly, and priorities get rebalanced monthly because reality outpaces quarterly planning cycles.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 input signals and 5 rules for prioritising with rigour.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Prioritisation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Input Signals</h2>
          <div className="space-y-2">
            {INPUTS.map((i, idx) => (
              <div key={idx} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{idx + 1}.</span>
                <p className="text-sm text-white/70">{i}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Rules</h2>
            <div className="space-y-2">
              {RULES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-roadmap-prioritization" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Prioritisation Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
