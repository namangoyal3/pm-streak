import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM AI Personalization (2026) — Per-User Tuning Beyond Recommendations",
  description:
    "How PMs build AI personalization. Per-user prompts, memory, behavioural signals, and where personalisation stops feeling helpful and starts feeling creepy.",
  keywords: [
    "PM AI personalization", "personalised AI 2026",
  ],
  alternates: { canonical: "/pm-ai-personalization" },
  openGraph: {
    title: "PM AI Personalization 2026 — PM Streak",
    description: "Per-user tuning beyond recommendations.",
    url: `${SITE_URL}/pm-ai-personalization`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Personalization+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Personalization 2026 — PM Streak",
    description: "Per-user tuning beyond recommendations.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Personalization+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIGNALS = [
  "Explicit preferences (settings, voice, tone)",
  "Implicit behaviour (clicks, dwell, repeat queries)",
  "Long-term memory across sessions",
  "Demographics where allowed and useful",
  "Real-time context (time, location, device)",
];

const TRAPS = [
  "Personalising too aggressively early — feels creepy",
  "No way for users to inspect or reset",
  "Confusing personalisation with serendipity loss",
  "Personalisation that locks users into filter bubbles",
];

const FAQS = [
  {
    q: "What separates helpful from creepy personalization?",
    a: "Three things: transparency (user knows it&apos;s personalised), control (user can change or reset), and clear value (the user notices the benefit). Without those, personalisation feels surveillance-y. With them, it feels like the product knows me. PMs who internalise this ship better products.",
  },
];

export default function PmAiPersonalizationPage() {
  const dates = pageDates("/pm-ai-personalization");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Personalization", url: `${SITE_URL}/pm-ai-personalization` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Personalization (2026 Edition)",
        description: "How PMs build AI personalization. Per-user prompts, memory, behavioural signals, and where personalisation stops feeling helpful and starts feeling creepy.",
        image: `${SITE_URL}/api/og?title=PM+AI+Personalization+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-personalization`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> Transparency + control + value = helpful, not creepy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Personalization<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Helpful AI personalization comes down to three things: transparency that users know it&apos;s personalised, control to change or reset it, and clear value they can feel — built from signals like explicit preferences, implicit behaviour, long-term memory, demographics, and real-time context. Skip those three, and personalisation reads as surveillance instead of service.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="underline hover:text-[#89e219]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 personalisation signals and 4 traps to avoid.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Personalization PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals</h2>
          <div className="space-y-2">
            {SIGNALS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-ai-personalization" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Personalization Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
