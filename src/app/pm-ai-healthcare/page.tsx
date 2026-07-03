import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Healthcare (2026) — Ambient Scribes, Diagnostics, Clinical PM Lessons",
  description:
    "How PMs build AI healthcare products. Ambient scribes, clinical decision support, and why healthcare is AI&apos;s highest-stakes testing ground.",
  keywords: [
    "PM AI healthcare", "ambient scribe PM",
    "clinical AI 2026",
  ],
  alternates: { canonical: "/pm-ai-healthcare" },
  openGraph: {
    title: "PM AI Healthcare 2026 — PM Streak",
    description: "How PMs build AI healthcare products.",
    url: `${SITE_URL}/pm-ai-healthcare`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Healthcare+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Healthcare 2026 — PM Streak",
    description: "How PMs build AI healthcare products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Healthcare+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Ambient scribes are the killer app — Abridge, DeepScribe, Suki",
  "Clinician trust earned minute by minute — one wrong note ends the pilot",
  "Regulatory clearance (FDA, CDSCO) is required for diagnostic claims",
  "Data privacy (HIPAA, DPDP) shapes architecture from day zero",
  "EHR integration is gate — Epic, Cerner, athenahealth relationships matter",
];

const METRICS = [
  "Documentation time saved per clinician per shift",
  "Note accuracy (human-compared)",
  "Clinician daily active usage",
  "Burnout and satisfaction improvement",
  "Enterprise deal size",
];

const FAQS = [
  {
    q: "Is AI healthcare a real growing category or still hype?",
    a: "Real and growing in narrow wedges. Ambient scribes have crossed product-market fit — hospitals see 2+ hours per clinician per day saved. Diagnostic AI is clearing regulatory bars selectively (radiology, pathology). General &apos;medical LLMs&apos; are still in pilot. Pick a narrow use case with regulatory clarity.",
  },
];

export default function PmAiHealthcarePage() {
  const dates = pageDates("/pm-ai-healthcare");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Healthcare", url: `${SITE_URL}/pm-ai-healthcare` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Healthcare (2026 Edition)",
        description:
          "How PMs build AI healthcare products. Ambient scribes, clinical decision support, and why healthcare is AI&apos;s highest-stakes testing ground.",
        image: `${SITE_URL}/api/og?title=PM+AI+Healthcare+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-healthcare`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🩺</span> AI healthcare earns trust minute by minute
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Healthcare<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            AI healthcare product work centers on ambient scribes — the category leaders being Abridge, DeepScribe, and Suki — which are already saving clinicians 2+ hours per day on documentation, but success further depends on regulatory clearance (FDA, CDSCO), HIPAA/DPDP-compliant data architecture, and EHR integration with Epic, Cerner, or athenahealth before any note is trusted.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI healthcare PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Healthcare PM Skills — Free →
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

        <RelatedPages slug="pm-ai-healthcare" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Healthcare PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
