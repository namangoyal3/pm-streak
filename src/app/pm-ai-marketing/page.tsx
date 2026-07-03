import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Marketing Products (2026) — Jasper, Copy.ai, Typeface PM Lessons",
  description:
    "How PMs build AI marketing products. Brand voice, campaign orchestration, attribution, and why AI is squeezing marketing tool margins.",
  keywords: [
    "PM AI marketing", "Jasper PM",
    "AI marketing 2026",
  ],
  alternates: { canonical: "/pm-ai-marketing" },
  openGraph: {
    title: "PM AI Marketing Products 2026 — PM Streak",
    description: "How PMs build AI marketing products.",
    url: `${SITE_URL}/pm-ai-marketing`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Marketing+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Marketing Products 2026 — PM Streak",
    description: "How PMs build AI marketing products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Marketing+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Brand voice fidelity is the retention lever",
  "Campaign orchestration beats single asset generation for enterprise",
  "Margin pressure from commoditised LLMs is real",
  "Integration with DAM, CMS, ad platforms is the moat",
  "Privacy and brand risk are growing buyer concerns",
];

const METRICS = [
  "Brand voice match score",
  "Assets produced per user per week",
  "Enterprise seat expansion",
  "Campaign-level conversion lift vs baseline",
  "Renewal rate",
];

const FAQS = [
  {
    q: "Can Jasper-style AI marketing tools survive ChatGPT?",
    a: "Only with workflow depth — brand voice training, enterprise governance, DAM/CMS integration, multi-channel orchestration. Generic &apos;write me a blog post&apos; is commoditised. Winners are those who own the end-to-end campaign workflow, not the generation step alone.",
  },
];

export default function PmAiMarketingPage() {
  const dates = pageDates("/pm-ai-marketing");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Marketing", url: `${SITE_URL}/pm-ai-marketing` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Marketing Products (2026 Edition)",
        description:
          "How PMs build AI marketing products. Brand voice, campaign orchestration, attribution, and why AI is squeezing marketing tool margins.",
        image: `${SITE_URL}/api/og?title=PM+AI+Marketing+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-marketing`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📢</span> Own the workflow or commoditise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Marketing Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Generic AI copy generation is already commoditised by ChatGPT, so AI marketing products only earn renewals through workflow depth: brand-voice fidelity, campaign orchestration across channels, and integration with DAM, CMS, and ad platforms. Enterprise buyers pay for owning the end-to-end campaign, not the single-asset generation step, even as margin pressure from cheap LLMs keeps squeezing standalone tools.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI marketing PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Marketing PM Skills — Free →
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

        <RelatedPages slug="pm-ai-marketing" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Marketing PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
