import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Influence Without Authority (2026) — The Core PM Skill",
  description:
    "How PMs influence engineers, designers, execs, and partners without formal authority. Trust, narrative, and the quiet tactics that work.",
  keywords: [
    "PM influence", "influence without authority",
    "PM soft skills", "PM leadership 2026",
  ],
  alternates: { canonical: "/pm-influence" },
  openGraph: {
    title: "PM Influence 2026 — PM Streak",
    description: "How PMs influence without formal authority.",
    url: `${SITE_URL}/pm-influence`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Influence+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Influence 2026 — PM Streak",
    description: "How PMs influence without formal authority.",
    images: [`${SITE_URL}/api/og?title=PM+Influence+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVERS = [
  "Trust — built in small interactions over months, lost in one",
  "Clarity — the clearest thinker in the room often wins",
  "Data — arguments backed by evidence beat arguments backed by rank",
  "Narrative — turn bullet points into a story people can repeat",
  "Reciprocity — help others before you need their help",
  "Patience — most &apos;no&apos;s become &apos;yes&apos; with time and better context",
];

const ANTI_PATTERNS = [
  "Escalation-first — using authority before persuasion destroys future trust",
  "Blame — teammates stop collaborating with PMs who assign blame",
  "Over-pitching — repeating the same argument harder doesn&apos;t win over skeptics",
  "Covert lobbying — backroom alignment feels clever until it unravels",
];

const FAQS = [
  {
    q: "Why do PMs have no formal authority?",
    a: "Because PMs span many functions without owning any. Engineers report to engineering managers; designers to design managers; and so on. PMs need influence to drive alignment across the entire team. This is the feature, not the bug — it forces PMs to build trust and reasoning rather than ordering people around.",
  },
];

export default function PmInfluencePage() {
  const dates = pageDates("/pm-influence");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Influence", url: `${SITE_URL}/pm-influence` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Influence Without Authority (2026 Edition)",
        description:
          "How PMs influence engineers, designers, execs, and partners without formal authority. Trust, narrative, and the quiet tactics that work.",
        image: `${SITE_URL}/api/og?title=PM+Influence+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-influence`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> The PM job is influence. The title is a rounding error.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Influence Without Authority<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Without formal authority over engineers, designers, or executives, PMs move work forward through six levers — trust built over months, clarity of thinking, evidence-backed arguments, repeatable narrative, reciprocity, and patience — while avoiding shortcuts like escalation-first tactics, blame, over-pitching, and covert lobbying that unravel trust instead of building it.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 influence levers and 4 anti-patterns to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Influence PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Levers</h2>
          <div className="space-y-2">
            {LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Anti-Patterns</h2>
            <div className="space-y-2">
              {ANTI_PATTERNS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{a}</p>
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

        <RelatedPages slug="pm-influence" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Influence Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
