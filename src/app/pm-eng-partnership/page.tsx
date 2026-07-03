import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Engineering Partnership (2026) — Working With Engineers Well",
  description:
    "How PMs partner with engineering. Estimates, tech debt, tradeoffs, and why your TL is your most valuable product ally.",
  keywords: [
    "PM engineering partnership", "PM engineer collaboration",
    "PM tech lead 2026",
  ],
  alternates: { canonical: "/pm-eng-partnership" },
  openGraph: {
    title: "PM Engineering Partnership 2026 — PM Streak",
    description: "How PMs partner with engineering.",
    url: `${SITE_URL}/pm-eng-partnership`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Engineering+Partnership+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Engineering Partnership 2026 — PM Streak",
    description: "How PMs partner with engineering.",
    images: [`${SITE_URL}/api/og?title=PM+Engineering+Partnership+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Bring problems, not specs — let engineers shape the solution",
  "Respect tech debt as a real priority — it&apos;s not optional cleanup",
  "Estimate with ranges, not dates — 2–4 weeks beats &apos;Feb 15&apos;",
  "Protect focus time — meetings cost engineers more than PMs",
  "Share context early — engineers make better decisions with business context",
  "Celebrate eng wins publicly — tech excellence should be visible",
];

const ANTI_PATTERNS = [
  "Asking for faster estimates without trading scope",
  "Ignoring tech debt until it breaks",
  "Hiding business constraints from engineers",
  "Escalating to eng managers instead of talking to the TL",
];

const FAQS = [
  {
    q: "Who owns technical decisions — PM or TL?",
    a: "TL owns technical implementation. PM owns product outcomes. When they intersect (architecture that affects time-to-market, build-vs-buy), decide together. PMs who try to own implementation erode trust; TLs who ignore product constraints build the wrong thing. Peer discipline wins.",
  },
];

export default function PmEngPartnershipPage() {
  const dates = pageDates("/pm-eng-partnership");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Engineering Partnership", url: `${SITE_URL}/pm-eng-partnership` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Engineering Partnership (2026 Edition)",
        description:
          "How PMs partner with engineering. Estimates, tech debt, tradeoffs, and why your TL is your most valuable product ally.",
        image: `${SITE_URL}/api/og?title=PM+Engineering+Partnership+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-eng-partnership`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> Your TL is your most important product ally
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Engineering Partnership<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Good PM-engineering partnerships bring problems instead of specs, estimate in ranges rather than fixed dates, and protect focus time instead of stacking meetings — with the TL owning technical implementation and the PM owning product outcomes, deciding together only where the two intersect, like architecture that shifts time-to-market.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 practices and 4 anti-patterns for PM-engineering partnership.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM-Eng Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Practices</h2>
          <div className="space-y-2">
            {PRACTICES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-eng-partnership" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM-Eng Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
