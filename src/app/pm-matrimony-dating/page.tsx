import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Matrimony &amp; Dating (2026) — Shaadi, Bumble, Aisle PM Lessons",
  description:
    "How PMs build matrimony and dating products. Intent signals, trust and safety, cultural context, and why India is its own category.",
  keywords: [
    "PM matrimony", "dating PM",
    "Shaadi PM", "Bumble PM India 2026",
  ],
  alternates: { canonical: "/pm-matrimony-dating" },
  openGraph: {
    title: "PM Matrimony &amp; Dating 2026 — PM Streak",
    description: "How PMs build matrimony and dating products.",
    url: `${SITE_URL}/pm-matrimony-dating`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Matrimony+&amp;+Dating+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Matrimony &amp; Dating 2026 — PM Streak",
    description: "How PMs build matrimony and dating products.",
    images: [`${SITE_URL}/api/og?title=PM+Matrimony+&amp;+Dating+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Intent varies — marriage, relationship, casual — products should signal which",
  "Trust and safety is existential — one incident can kill the brand",
  "Family involvement in matrimony — parents and relatives are real users",
  "Cultural context shapes UX — community, caste, religion filters are sensitive but real",
  "Paid conversion higher than most consumer categories — users pay for serious intent",
];

const METRICS = [
  "Quality matches per active user per week",
  "Message-to-meeting conversion rate",
  "Profile completeness score",
  "Report/block rate as T&amp;S signal",
  "Churn after first serious match (success or fatigue)",
];

const FAQS = [
  {
    q: "Why is Indian matrimony/dating its own category?",
    a: "Because intent, family involvement, and cultural context differ fundamentally from Western dating norms. Western dating apps (Tinder, Bumble) work for urban, casual segments. Matrimony platforms (Shaadi, BharatMatrimony, Jeevansathi) serve intent-to-marry audiences. Products that understand this divide win; products that blur them confuse users and burn trust.",
  },
];

export default function PmMatrimonyDatingPage() {
  const dates = pageDates("/pm-matrimony-dating");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Matrimony & Dating", url: `${SITE_URL}/pm-matrimony-dating` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Matrimony & Dating (India Edition)",
        description: "How PMs build matrimony and dating products. Intent signals, trust and safety, cultural context, and why India is its own category.",
        image: `${SITE_URL}/api/og?title=PM+Matrimony+&amp;+Dating+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-matrimony-dating`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💞</span> India is its own category. Design for intent and context.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Matrimony &amp; Dating<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Matrimony and dating are treated as one category everywhere except India, where intent — marriage, relationship, or casual — has to be signalled explicitly, family members act as real users alongside the primary user, and trust and safety failures can end a brand overnight. Because of this, PMs track quality matches per active user, message-to-meeting conversion, profile completeness, and report/block rate rather than swipe volume alone.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for matrimony and dating PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Matrimony/Dating PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-matrimony-dating" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Matrimony/Dating PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
