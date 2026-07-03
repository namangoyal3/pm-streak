import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM to Founder (2026) — Making the Jump from PM to Startup Founder",
  description:
    "How PMs become founders. Skill gaps, distribution, sales, and why PM training is only half the founder skillset.",
  keywords: [
    "PM to founder", "PM founder",
    "startup PM 2026",
  ],
  alternates: { canonical: "/pm-to-founder" },
  openGraph: {
    title: "PM to Founder 2026 — PM Streak",
    description: "Making the jump from PM to startup founder.",
    url: `${SITE_URL}/pm-to-founder`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+to+Founder+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM to Founder 2026 — PM Streak",
    description: "Making the jump from PM to startup founder.",
    images: [`${SITE_URL}/api/og?title=PM+to+Founder+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRENGTHS = [
  "Product sense and discovery muscle",
  "Comfort with ambiguity and cross-functional work",
  "Written communication for fundraising and hiring",
  "User research and customer development",
];

const GAPS = [
  "Distribution and sales — PMs rarely own these",
  "Hiring skills — selecting and recruiting early team",
  "Capital allocation — fundraising, runway, dilution",
  "Crisis management — founder-level reputation risk",
];

const FAQS = [
  {
    q: "Are PMs well-prepared to become founders?",
    a: "Partially. The product and customer development half of being a founder is well-trained by PM work. The distribution, sales, hiring, and capital half is rarely exercised. The PMs who succeed as founders either pair with a co-founder strong in these areas, or deliberately build those skills before jumping.",
  },
];

export default function PmToFounderPage() {
  const dates = pageDates("/pm-to-founder");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM to Founder", url: `${SITE_URL}/pm-to-founder` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM to Founder (2026 Edition)",
        description:
          "How PMs become founders. Skill gaps, distribution, sales, and why PM training is only half the founder skillset.",
        image: `${SITE_URL}/api/og?title=PM+to+Founder+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-to-founder`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> PM training covers half the founder job
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM to Founder<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            PM experience prepares founders on the product side — product sense, comfort with
            ambiguity, written communication, and customer development — but leaves gaps in
            distribution and sales, hiring, capital allocation, and crisis management, since PMs
            rarely own these functions. The PMs who succeed as founders either pair with a
            co-founder strong in the missing half or deliberately build those skills before making
            the jump.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 PM strengths and 4 gaps that founders must close.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Founder PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Strengths PMs Bring</h2>
          <div className="space-y-2">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Gaps to Close</h2>
            <div className="space-y-2">
              {GAPS.map((g, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{g}</p>
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

        <RelatedPages slug="pm-to-founder" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Founder PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
