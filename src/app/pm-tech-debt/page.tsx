import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Tech Debt (2026) — How PMs Should Think About Technical Debt",
  description:
    "How PMs reason about tech debt. When to pay it down, when to accept it, and how to make debt visible in roadmap discussions.",
  keywords: [
    "PM tech debt", "technical debt PM",
    "refactoring PM 2026",
  ],
  alternates: { canonical: "/pm-tech-debt" },
  openGraph: {
    title: "PM Tech Debt 2026 — PM Streak",
    description: "How PMs think about technical debt.",
    url: `${SITE_URL}/pm-tech-debt`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Tech+Debt+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Tech Debt 2026 — PM Streak",
    description: "How PMs think about technical debt.",
    images: [`${SITE_URL}/api/og?title=PM+Tech+Debt+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  { t: "Deliberate debt", w: "Taken knowingly to ship faster. Document and repay." },
  { t: "Accidental debt", w: "Emerged from learning — the code aged past the assumptions." },
  { t: "Bit-rot", w: "Dependencies, APIs, platforms evolved; your code didn&apos;t." },
  { t: "Design debt", w: "Structural — architecture no longer fits use cases." },
];

const PRACTICES = [
  "Reserve 15–20% of capacity for debt every cycle",
  "Tie debt paydown to user impact — &apos;we reduce p95 latency by 40%&apos; beats &apos;refactor&apos;",
  "Distinguish &apos;important and blocking&apos; from &apos;annoying&apos; — not all debt matters",
  "Visualise debt — a dashboard beats a Google doc nobody reads",
  "Trust eng judgment on what&apos;s urgent — they feel the pain you don&apos;t",
];

const FAQS = [
  {
    q: "How do PMs negotiate eng time for debt paydown?",
    a: "Reframe it as risk reduction and velocity protection, not cleanup. &apos;If we don&apos;t fix this, every future feature in this area takes 2x longer.&apos; Tie to business outcomes: incident rate, launch velocity, on-call pain. Debt is a first-class priority when framed as future-cost, not sunk-cost.",
  },
];

export default function PmTechDebtPage() {
  const dates = pageDates("/pm-tech-debt");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Tech Debt", url: `${SITE_URL}/pm-tech-debt` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Tech Debt (2026 Edition)",
        description:
          "How PMs reason about tech debt. When to pay it down, when to accept it, and how to make debt visible in roadmap discussions.",
        image: `${SITE_URL}/api/og?title=PM+Tech+Debt+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-tech-debt`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏚️</span> Debt compounds. So does the cost of ignoring it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Tech Debt<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Technical debt shows up as four distinct types — deliberate trade-offs made to ship faster, accidental drift as assumptions age, bit-rot from evolving dependencies, and structural design debt — and PMs manage it by reserving 15–20% of each cycle for paydown, tying that work to measurable user impact, and trusting engineering&apos;s judgment on urgency.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 types of debt and 5 practices for PMs who take it seriously.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Tech Debt PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Types of Debt</h2>
          <div className="space-y-3">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{t.t}</p>
                <p className="text-xs text-white/60">{t.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
            <div className="space-y-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-tech-debt" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Tech Debt Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
