import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM LinkedIn Branding (2026) — Building a PM Brand That Gets Inbound",
  description:
    "How PMs build a LinkedIn brand. Content cadence, signal-to-noise, and why a well-kept LinkedIn drives better opportunities than applications.",
  keywords: [
    "PM LinkedIn", "PM personal brand",
    "LinkedIn PM 2026",
  ],
  alternates: { canonical: "/pm-linkedin-branding" },
  openGraph: {
    title: "PM LinkedIn Branding 2026 — PM Streak",
    description: "Building a PM brand that drives inbound.",
    url: `${SITE_URL}/pm-linkedin-branding`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+LinkedIn+Branding+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM LinkedIn Branding 2026 — PM Streak",
    description: "Building a PM brand that drives inbound.",
    images: [`${SITE_URL}/api/og?title=PM+LinkedIn+Branding+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Consistency beats virality — post weekly, not occasionally",
  "Specific expertise beats generic wisdom",
  "Share learnings, not wins — vulnerability earns trust",
  "Engage genuinely with others&apos; posts — one comment &gt; ten likes",
  "Profile headline: what you do, who you help, how",
];

const ANTI_PATTERNS = [
  "Humblebrags and motivational poster content",
  "Vague generalities (&apos;hustle&apos;, &apos;grit&apos;) with no specificity",
  "Engagement-bait posts (&apos;comment YES if you agree&apos;)",
  "Borrowed wisdom without attribution",
];

const FAQS = [
  {
    q: "Is LinkedIn worth the time for PMs?",
    a: "Yes, selectively. A well-maintained LinkedIn brings inbound opportunities (recruiters, podcasts, advisory work) that cold applications don&apos;t. Post weekly for a year and results compound. Post sporadically and you get nothing. Like investing, consistency matters more than individual post quality.",
  },
];

export default function PmLinkedinBrandingPage() {
  const dates = pageDates("/pm-linkedin-branding");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM LinkedIn Branding", url: `${SITE_URL}/pm-linkedin-branding` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM LinkedIn Branding (2026 Edition)",
        description:
          "How PMs build a LinkedIn brand. Content cadence, signal-to-noise, and why a well-kept LinkedIn drives better opportunities than applications.",
        image: `${SITE_URL}/api/og?title=PM+LinkedIn+Branding+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-linkedin-branding`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💼</span> Consistency compounds. Posting weekly for a year beats 10 viral posts.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM LinkedIn Branding<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Building a PM brand on LinkedIn comes down to consistency over virality: post weekly rather than occasionally, share specific expertise and honest learnings instead of humblebrags, and engage genuinely on others&apos; posts, since one thoughtful comment outweighs ten likes. The anti-patterns to avoid are engagement-bait, vague generalities, and borrowed wisdom without attribution.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 principles and 4 anti-patterns for PM LinkedIn presence.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Brand Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
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

        <RelatedPages slug="pm-linkedin-branding" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM Branding Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
