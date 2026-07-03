import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Personal OKRs (2026) — Setting Career Goals That Compound",
  description:
    "How PMs set personal OKRs for career growth. Skill, network, brand, and impact — and why writing them down dramatically increases follow-through.",
  keywords: [
    "PM personal OKRs", "PM career goals 2026",
  ],
  alternates: { canonical: "/pm-personal-okrs" },
  openGraph: {
    title: "PM Personal OKRs 2026 — PM Streak",
    description: "Setting career goals that compound.",
    url: `${SITE_URL}/pm-personal-okrs`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Personal+OKRs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Personal OKRs 2026 — PM Streak",
    description: "Setting career goals that compound.",
    images: [`${SITE_URL}/api/og?title=PM+Personal+OKRs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  "Skills — what specific PM skill am I leveling this quarter?",
  "Network — who am I deliberately building relationships with?",
  "Brand — what artifacts am I publishing?",
  "Impact — what specific outcomes did I drive?",
  "Health and balance — non-work goals that sustain career",
];

const RULES = [
  "3 OKRs per quarter, max — not 10",
  "Write them down where you&apos;ll see them weekly",
  "Review honestly mid-quarter; adjust if needed",
  "Share with a trusted peer for accountability",
  "Celebrate hitting them; learn from missing them",
];

const FAQS = [
  {
    q: "Do personal OKRs actually change behaviour?",
    a: "Only if you write them down and review them. Mental goals evaporate within weeks. Written goals you revisit weekly survive months. The PMs who deliberately set and track personal OKRs progress 2x faster than those who don&apos;t. The mechanism is simple: visible commitments compete for your time more effectively.",
  },
];

export default function PmPersonalOkrsPage() {
  const dates = pageDates("/pm-personal-okrs");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Personal OKRs", url: `${SITE_URL}/pm-personal-okrs` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Personal OKRs (2026 Edition)",
        description: "How PMs set personal OKRs for career growth. Skill, network, brand, and impact — and why writing them down dramatically increases follow-through.",
        image: `${SITE_URL}/api/og?title=PM+Personal+OKRs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-personal-okrs`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> Mental goals evaporate. Written ones compound.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Personal OKRs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Personal OKRs for PMs span five categories — skills, network, brand, impact, and health and balance — capped at three per quarter, written somewhere visible weekly, reviewed honestly mid-quarter, and shared with a trusted peer for accountability. Mental goals evaporate within weeks, but written ones that get revisited weekly survive months, which is why PMs who deliberately track them progress 2x faster than those who don&apos;t.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 OKR categories and 5 rules for personal goal-setting.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Goal Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Categories</h2>
          <div className="space-y-2">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-personal-okrs" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Personal OKR Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
