import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Safety (2026) — Building Safe AI Products",
  description:
    "How PMs build AI safety into product. Refusals, jailbreaks, content filters, and how to balance safety with usefulness.",
  keywords: [
    "PM AI safety", "AI guardrails 2026",
  ],
  alternates: { canonical: "/pm-ai-safety" },
  openGraph: {
    title: "PM AI Safety 2026 — PM Streak",
    description: "Building safe AI products.",
    url: `${SITE_URL}/pm-ai-safety`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Safety+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Safety 2026 — PM Streak",
    description: "Building safe AI products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Safety+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LAYERS = [
  "System prompt guardrails",
  "Pre-generation classifier (filter inputs)",
  "Post-generation classifier (filter outputs)",
  "Adversarial red-teaming and probing",
  "Human review queue for edge cases",
];

const TRAPS = [
  "Over-refusal — too cautious models become useless",
  "Under-refusal — brand and legal risk",
  "Static safety thresholds that don&apos;t evolve with attacks",
  "Treating safety as launch checklist not ongoing work",
];

const FAQS = [
  {
    q: "How do PMs balance AI safety and usefulness?",
    a: "Through measured refusal rates and user feedback loops. Track when the model refuses; track when users complain about over-refusal vs under-refusal. The goal isn&apos;t maximum safety — it&apos;s appropriate safety for the audience and use case. Customer support AI needs different guardrails than developer tooling AI.",
  },
];

export default function PmAiSafetyPage() {
  const dates = pageDates("/pm-ai-safety");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Safety", url: `${SITE_URL}/pm-ai-safety` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Safety (2026 Edition)",
        description: "How PMs build AI safety into product. Refusals, jailbreaks, content filters, and how to balance safety with usefulness.",
        image: `${SITE_URL}/api/og?title=PM+AI+Safety+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-safety`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> Appropriate safety beats maximum safety
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Safety<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-4">
            Good AI safety design layers several defenses rather than relying on one filter: system-prompt guardrails, input and output classifiers, adversarial red-teaming, and a human review queue for edge cases. The aim is appropriate safety rather than maximum safety, tuned against measured refusal rates, since customer support AI and developer tooling AI call for different guardrails.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 safety layers and 4 traps for AI safety PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Safety PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Layers</h2>
          <div className="space-y-2">
            {LAYERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Traps</h2>
            <div className="space-y-2">
              {TRAPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-ai-safety" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Safety Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
