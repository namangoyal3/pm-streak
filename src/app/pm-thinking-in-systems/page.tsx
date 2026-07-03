import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Thinking in Systems (2026) — Why Senior PMs Think in Loops, Not Lists",
  description:
    "How senior PMs apply systems thinking. Stocks, flows, feedback loops, and unintended consequences — the mindset shift that separates senior from staff PM.",
  keywords: [
    "PM systems thinking", "feedback loops PM 2026",
  ],
  alternates: { canonical: "/pm-thinking-in-systems" },
  openGraph: {
    title: "PM Thinking in Systems 2026 — PM Streak",
    description: "Why senior PMs think in loops, not lists.",
    url: `${SITE_URL}/pm-thinking-in-systems`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Thinking+in+Systems+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Thinking in Systems 2026 — PM Streak",
    description: "Why senior PMs think in loops, not lists.",
    images: [`${SITE_URL}/api/og?title=PM+Thinking+in+Systems+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONCEPTS = [
  "Stocks and flows — what accumulates over time and at what rate",
  "Reinforcing loops — small change, exponential effect",
  "Balancing loops — system pushes back against change",
  "Delays — time between action and effect distorts learning",
  "Unintended consequences — every solution creates new problems",
];

const APPLICATIONS = [
  "Growth loops vs growth funnels",
  "Habit formation in user behaviour",
  "Network effects and tipping points",
  "Org dynamics — why processes drift over time",
];

const FAQS = [
  {
    q: "Where do PMs go wrong with systems thinking?",
    a: "By over-applying it. Systems thinking helps for strategic decisions and complex feedback loops. It&apos;s overkill for day-to-day PM work. Use it when the problem has loops you don&apos;t see; skip it when the problem is linear and well-bounded.",
  },
];

export default function PmThinkingInSystemsPage() {
  const dates = pageDates("/pm-thinking-in-systems");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Thinking in Systems", url: `${SITE_URL}/pm-thinking-in-systems` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Thinking in Systems (2026 Edition)",
        description: "How senior PMs apply systems thinking. Stocks, flows, feedback loops, and unintended consequences — the mindset shift that separates senior from staff PM.",
        image: `${SITE_URL}/api/og?title=PM+Thinking+in+Systems+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-thinking-in-systems`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>♾️</span> Senior PMs see the loop, not just the next step
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Thinking in Systems<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Why do senior PMs think in loops instead of lists? Because systems thinking surfaces stocks and flows, reinforcing and balancing loops, the delays between action and effect, and the unintended consequences a linear plan misses — showing up in growth loops, habit formation, network effects, and why org processes drift over time. It&apos;s a tool for problems with hidden loops, not for simple, linear, well-bounded work.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 systems-thinking concepts and 4 applications for PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Systems PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Concepts</h2>
          <div className="space-y-2">
            {CONCEPTS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Applications</h2>
            <div className="space-y-2">
              {APPLICATIONS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-thinking-in-systems" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Systems PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
