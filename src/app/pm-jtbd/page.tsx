import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Jobs-to-be-Done (2026) — JTBD Framework for Product Managers",
  description:
    "How PMs apply Jobs-to-be-Done. Functional, emotional, and social jobs, and why JTBD beats personas for decision-making.",
  keywords: [
    "PM jobs to be done", "JTBD framework",
    "Clayton Christensen JTBD", "jobs PM 2026",
  ],
  alternates: { canonical: "/pm-jtbd" },
  openGraph: {
    title: "PM Jobs-to-be-Done 2026 — PM Streak",
    description: "JTBD framework for product managers.",
    url: `${SITE_URL}/pm-jtbd`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Jobs-to-be-Done+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Jobs-to-be-Done 2026 — PM Streak",
    description: "JTBD framework for product managers.",
    images: [`${SITE_URL}/api/og?title=PM+Jobs-to-be-Done+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DIMENSIONS = [
  "Functional job — the practical thing the user is trying to get done",
  "Emotional job — how they want to feel (or avoid feeling) while doing it",
  "Social job — how they want to be perceived by others",
];

const USES = [
  "Framing opportunities — what job is underserved in this market?",
  "Evaluating competitors — what job are they doing better or worse?",
  "Scoping features — which job does this feature serve, and is it the priority one?",
  "Sharpening messaging — speak to the job, not the feature",
];

const FAQS = [
  {
    q: "JTBD or personas — which is better?",
    a: "Use both, for different purposes. Personas describe who users are; JTBD describes what they&apos;re trying to achieve. Personas help with empathy and design; JTBD helps with opportunity framing and prioritisation. The classic mistake is using personas alone, which leads to demographic stereotyping and missed user motivations.",
  },
];

export default function PmJtbdPage() {
  const dates = pageDates("/pm-jtbd");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM JTBD", url: `${SITE_URL}/pm-jtbd` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Jobs-to-be-Done (2026 Edition)",
        description: "How PMs apply Jobs-to-be-Done. Functional, emotional, and social jobs, and why JTBD beats personas for decision-making.",
        image: `${SITE_URL}/api/og?title=PM+Jobs-to-be-Done+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-jtbd`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛠️</span> People hire products to do jobs. Build for the job.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Jobs-to-be-Done<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Jobs-to-be-done splits user motivation into three parts — functional (the practical
            task), emotional (how they want to feel), and social (how they want to be perceived)
            — and PMs use it to scope features, evaluate competitors, and sharpen messaging around
            the job, not the feature. Unlike personas, which describe who users are, JTBD
            describes what they&apos;re trying to achieve.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            3 JTBD dimensions and 4 practical uses for PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build JTBD PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">3 Dimensions</h2>
          <div className="space-y-2">
            {DIMENSIONS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Practical Uses</h2>
            <div className="space-y-2">
              {USES.map((u, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{u}</p>
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

        <RelatedPages slug="pm-jtbd" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice JTBD Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
