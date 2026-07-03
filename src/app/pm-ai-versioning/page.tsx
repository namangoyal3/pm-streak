import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Versioning (2026) — Managing Model and Prompt Versions",
  description:
    "How PMs version models and prompts. Pinning, migration, deprecation, and why model upgrades are silent product changes.",
  keywords: [
    "PM AI versioning", "model migration PM 2026",
  ],
  alternates: { canonical: "/pm-ai-versioning" },
  openGraph: {
    title: "PM AI Versioning 2026 — PM Streak",
    description: "Managing model and prompt versions.",
    url: `${SITE_URL}/pm-ai-versioning`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Versioning+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Versioning 2026 — PM Streak",
    description: "Managing model and prompt versions.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Versioning+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Pin model versions in production — automatic upgrades break things",
  "Run new models in shadow before promoting",
  "Eval suite is the gate for any version change",
  "Communicate model upgrades to enterprise customers",
  "Plan for model deprecation by vendors",
];

const TRAPS = [
  "Auto-upgrading to latest model — breaks behavior",
  "No prompt version control",
  "Skipping shadow tests because &apos;evals look fine&apos;",
  "No rollback path when a model regresses",
];

const FAQS = [
  {
    q: "How often do silent model changes break products?",
    a: "More often than vendors admit. OpenAI, Anthropic, Google all update underlying models periodically. Production AI products that don&apos;t pin or shadow-test see silent regressions monthly. PMs who treat models as code dependencies — versioned, tested, deprecated deliberately — ship more reliably.",
  },
];

export default function PmAiVersioningPage() {
  const dates = pageDates("/pm-ai-versioning");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Versioning", url: `${SITE_URL}/pm-ai-versioning` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Versioning (2026 Edition)",
        description:
          "How PMs version models and prompts. Pinning, migration, deprecation, and why model upgrades are silent product changes.",
        image: `${SITE_URL}/api/og?title=PM+AI+Versioning+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-versioning`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔢</span> Treat models like code dependencies — version them
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Versioning<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Managing AI versioning starts with pinning production model versions instead of auto-upgrading, running any new model in shadow before promoting it, and gating every version change behind the eval suite, since vendors like OpenAI, Anthropic, and Google update underlying models periodically and products that skip pinning or shadow tests see silent regressions on a monthly basis.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 practices and 4 traps for AI versioning.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Versioning PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
          <div className="space-y-2">
            {PRACTICES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-ai-versioning" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Versioning Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
