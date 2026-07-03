import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM MarTech (2026) — Segment, Braze, MoEngage PM Guide",
  description:
    "How PMs build MarTech products. CDP, engagement, attribution, and why MarTech is consolidating around data + activation.",
  keywords: [
    "PM MarTech", "Braze PM",
    "MoEngage PM", "CDP 2026",
  ],
  alternates: { canonical: "/pm-martech" },
  openGraph: {
    title: "PM MarTech 2026 — PM Streak",
    description: "How PMs build MarTech products.",
    url: `${SITE_URL}/pm-martech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+MarTech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM MarTech 2026 — PM Streak",
    description: "How PMs build MarTech products.",
    images: [`${SITE_URL}/api/og?title=PM+MarTech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "CDP + engagement is the stack — data pipes to activation",
  "Attribution is the hard problem — multi-touch, post-iOS14, post-cookie",
  "Deliverability owns trust — one bad campaign tanks domain reputation",
  "AI rewriting segmentation and content — natural language replaces rule builders",
  "Compliance (DPDP, GDPR) is a product requirement, not a feature",
];

const METRICS = [
  "Campaign delivery rate (email, push, SMS)",
  "Conversion lift from triggered vs broadcast",
  "Active daily campaigns per account (depth of usage)",
  "Attribution accuracy (when checked against conversions)",
  "Latency of real-time triggers",
];

const FAQS = [
  {
    q: "Will MarTech consolidate further in 2026?",
    a: "Yes. Point tools (analytics, CDP, engagement, attribution) are merging into suites. Braze, MoEngage, and Segment/Twilio lead in the consolidated space. Stand-alone tools on a single category struggle unless they&apos;re absolute best-in-class and easily integrated into existing stacks.",
  },
];

export default function PmMarTechPage() {
  const dates = pageDates("/pm-martech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM MarTech", url: `${SITE_URL}/pm-martech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM MarTech (2026 Edition)",
        description: "How PMs build MarTech products. CDP, engagement, attribution, and why MarTech is consolidating around data + activation.",
        image: `${SITE_URL}/api/og?title=PM+MarTech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-martech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📣</span> Data without activation is a museum
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM MarTech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Data alone doesn&apos;t make a MarTech product — it&apos;s the pipeline from a CDP into activation that matters, and a single bad campaign can tank a sender&apos;s domain reputation, so MarTech PMs are measured on delivery rate across email, push, and SMS, conversion lift from triggered versus broadcast sends, and how accurately attribution holds up in a post-cookie, post-iOS14 world.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for MarTech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build MarTech PM Skills — Free →
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

        <RelatedPages slug="pm-martech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice MarTech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
