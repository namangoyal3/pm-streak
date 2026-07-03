import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Voice Products (2026) — ElevenLabs, Sarvam, Voice Agents PM Guide",
  description:
    "How PMs build AI voice products. TTS, voice cloning, real-time agents, and why voice is the fastest-moving AI category.",
  keywords: [
    "PM AI voice", "ElevenLabs PM",
    "voice agents PM 2026",
  ],
  alternates: { canonical: "/pm-ai-voice" },
  openGraph: {
    title: "PM AI Voice Products 2026 — PM Streak",
    description: "How PMs build AI voice products.",
    url: `${SITE_URL}/pm-ai-voice`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Voice+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Voice Products 2026 — PM Streak",
    description: "How PMs build AI voice products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Voice+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Latency under 500ms is the bar for agents — anything higher feels broken",
  "Voice cloning needs consent controls — legal landmines otherwise",
  "Multi-lingual support unlocks enterprise value globally",
  "Prosody and emotion — the next quality frontier after intelligibility",
  "Real-time streaming vs batch — different product shapes",
];

const METRICS = [
  "Agent call completion rate",
  "Median turn latency",
  "Intelligibility score (human-rated)",
  "Opt-in rate for voice cloning (consent signal)",
  "Enterprise deal size",
];

const FAQS = [
  {
    q: "Is voice agents market consolidating already?",
    a: "Partly. Foundation model players (ElevenLabs, OpenAI, Sarvam for Indic) dominate TTS. Application-layer voice agent products are still fragmented across customer support, outbound sales, healthcare triage. Expect consolidation over 2026–2027 as winners emerge in each vertical.",
  },
];

export default function PmAiVoicePage() {
  const dates = pageDates("/pm-ai-voice");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Voice", url: `${SITE_URL}/pm-ai-voice` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Voice Products (2026 Edition)",
        description:
          "How PMs build AI voice products. TTS, voice cloning, real-time agents, and why voice is the fastest-moving AI category.",
        image: `${SITE_URL}/api/og?title=PM+AI+Voice+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-voice`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗣️</span> Latency under 500ms is the bar. Everything else is secondary.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Voice Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Five hundred milliseconds is the latency ceiling AI voice agents can&apos;t cross without feeling broken, so PMs measure median turn latency and call completion rate alongside intelligibility scores and opt-in rates for voice cloning, which needs consent controls to avoid legal risk; foundation model players like ElevenLabs and Sarvam already dominate TTS while application-layer agents stay fragmented across support, sales, and healthcare triage until 2026–2027 consolidation.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI voice product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Voice PM Skills — Free →
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

        <RelatedPages slug="pm-ai-voice" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Voice PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
