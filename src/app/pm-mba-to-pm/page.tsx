import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM MBA to PM (2026) — Breaking In From Top Indian and Global B-Schools",
  description:
    "How MBAs transition into PM roles. APM programs, company fit, and why the MBA-to-PM path has gotten more competitive in 2026.",
  keywords: [
    "MBA to PM", "APM program",
    "PM recruiting 2026",
  ],
  alternates: { canonical: "/pm-mba-to-pm" },
  openGraph: {
    title: "PM MBA to PM 2026 — PM Streak",
    description: "Breaking into PM from top MBA programs.",
    url: `${SITE_URL}/pm-mba-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+MBA+to+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM MBA to PM 2026 — PM Streak",
    description: "Breaking into PM from top MBA programs.",
    images: [`${SITE_URL}/api/og?title=PM+MBA+to+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PROGRAMS = [
  "Google APM — the gold standard",
  "Meta Rotational PM",
  "Microsoft PM",
  "Atlassian APM",
  "Flipkart, Myntra, PhonePe APM programs in India",
];

const PREP = [
  "Build product portfolio outside coursework",
  "Case-prep with recent PM interview format",
  "Network with current PMs at target companies",
  "Ship something before you apply",
  "Get sharp on metrics and prioritisation",
];

const FAQS = [
  {
    q: "Is an MBA still required for PM in 2026?",
    a: "No, and in many cases it&apos;s a disadvantage. Tech PMs hire from engineering, design, and analyst backgrounds more than MBA pipelines. MBAs remain a valid path into APM programs at FAANG and top Indian tech, but the signal weight has decreased. Shipping a product matters more than the degree in most hiring loops.",
  },
];

export default function PmMbaToPmPage() {
  const dates = pageDates("/pm-mba-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM MBA to PM", url: `${SITE_URL}/pm-mba-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM MBA to PM (2026 Edition)",
        description: "How MBAs transition into PM roles. APM programs, company fit, and why the MBA-to-PM path has gotten more competitive in 2026.",
        image: `${SITE_URL}/api/og?title=PM+MBA+to+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mba-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎓</span> MBA helps at APM programs. Shipping helps everywhere.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM MBA to PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Is an MBA still the way into product management in 2026? It helps at APM programs — Google, Meta, Microsoft, Atlassian, and Indian pipelines like Flipkart, Myntra, and PhonePe — but the degree carries less signal than before, since tech PM hiring now favors engineering, design, and analyst backgrounds who have already shipped something.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 APM programs to know and 5 prep moves for MBA-PM candidates.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build MBA-PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 APM Programs</h2>
          <div className="space-y-2">
            {PROGRAMS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Prep Moves</h2>
            <div className="space-y-2">
              {PREP.map((p, i) => (
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

        <RelatedPages slug="pm-mba-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice MBA-PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
