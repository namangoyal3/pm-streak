import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Distribution (2026) — How AI Products Reach Users",
  description:
    "How PMs distribute AI products. App stores, browser extensions, embedded in workflows, and the channels that work for AI specifically.",
  keywords: [
    "PM AI distribution", "AI go to market 2026",
  ],
  alternates: { canonical: "/pm-ai-distribution" },
  openGraph: {
    title: "PM AI Distribution 2026 — PM Streak",
    description: "How AI products reach users.",
    url: `${SITE_URL}/pm-ai-distribution`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Distribution+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Distribution 2026 — PM Streak",
    description: "How AI products reach users.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Distribution+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CHANNELS = [
  "Web app — easiest to ship, lowest activation friction",
  "Browser extension — meet users in their workflow",
  "API + SDK — distribute via other products",
  "Embedded in incumbent products (Microsoft Copilot, Google Gemini)",
  "Vertical SaaS where AI is integrated into existing workflow",
];

const REALITIES = [
  "Distribution beats model quality at sub-frontier capability",
  "Incumbents have built-in distribution AI startups must work around",
  "Word-of-mouth carries AI products further than ads in early stages",
  "API-first distribution often outlasts direct-app plays",
];

const FAQS = [
  {
    q: "Can a startup distribute AI features against Microsoft and Google?",
    a: "Yes, but on different vectors. Incumbents win on default integration; startups win on speed, depth in narrow workflows, and tooling that incumbents won&apos;t prioritise. Cursor beat Copilot in serious developer workflows by going deeper. Pick wedges where you can outpace; don&apos;t play their game.",
  },
];

export default function PmAiDistributionPage() {
  const dates = pageDates("/pm-ai-distribution");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Distribution", url: `${SITE_URL}/pm-ai-distribution` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Distribution (2026 Edition)",
        description: "How PMs distribute AI products. App stores, browser extensions, embedded in workflows, and the channels that work for AI specifically.",
        image: `${SITE_URL}/api/og?title=PM+AI+Distribution+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-distribution`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📡</span> Distribution beats model quality at the long tail
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Distribution<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Distribution, more than raw model quality, decides which AI products win at sub-frontier capability — through web apps, browser extensions, API and SDK integrations, embedding inside incumbents like Copilot or Gemini, or vertical SaaS workflows. Startups can still compete with Microsoft and Google by going deeper into narrow workflows, the way Cursor outpaced Copilot.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="underline hover:text-[#89e219]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 channels and 4 realities for AI distribution PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Distribution PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Channels</h2>
          <div className="space-y-2">
            {CHANNELS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{c}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Realities</h2>
            <div className="space-y-2">
              {REALITIES.map((r, i) => (
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

        <RelatedPages slug="pm-ai-distribution" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Distribution Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
