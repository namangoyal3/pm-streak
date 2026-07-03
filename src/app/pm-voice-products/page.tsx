import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Voice Products (2026) — Designing for Voice Interfaces",
  description:
    "How PMs design voice products. Conversation design, intent detection, latency budgets, and why voice is harder than it looks.",
  keywords: [
    "PM voice products", "voice UX PM",
    "conversation design", "voice interface 2026",
  ],
  alternates: { canonical: "/pm-voice-products" },
  openGraph: {
    title: "PM Voice Products 2026 — PM Streak",
    description: "How PMs design voice products — conversation, intent, latency.",
    url: `${SITE_URL}/pm-voice-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Voice+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Voice Products 2026 — PM Streak",
    description: "How PMs design voice products — conversation, intent, latency.",
    images: [`${SITE_URL}/api/og?title=PM+Voice+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Latency is UX — anything over 300ms feels broken in conversation",
  "Error recovery is the product — most users hit errors; design for graceful recovery",
  "Context persists — users expect the agent to remember within a session",
  "Voice ≠ text — shorter responses, explicit confirmations, no markdown",
  "Multimodal when possible — pair voice with screen for complex tasks",
];

const METRICS = [
  "Task completion rate — did the user finish what they wanted?",
  "Median turn latency — p95 matters more",
  "Intent recognition accuracy — how often does it misunderstand?",
  "Repair rate — how often does the user have to rephrase?",
  "Session length vs satisfaction — long sessions are not always good",
];

const FAQS = [
  {
    q: "Is voice finally a real product category in 2026?",
    a: "For specific use cases, yes — customer support, in-car, accessibility, hands-busy contexts (cooking, driving, IoT). As a general-purpose interface replacing screens, still no. Voice wins when screens fail, not as a default. Best voice PMs know which category they&apos;re in.",
  },
];

export default function PmVoiceProductsPage() {
  const dates = pageDates("/pm-voice-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Voice Products", url: `${SITE_URL}/pm-voice-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Voice Products (2026 Edition)",
        description:
          "How PMs design voice products. Conversation design, intent detection, latency budgets, and why voice is harder than it looks.",
        image: `${SITE_URL}/api/og?title=PM+Voice+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-voice-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎙️</span> Voice wins where screens fail — not everywhere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Voice Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Voice product design lives or dies on latency — responses beyond roughly 300 milliseconds
            start to feel broken in conversation — plus graceful error recovery, since most users
            eventually trigger one. Responses stay short with explicit confirmations rather than
            markdown, and PMs measure task completion, median and p95 turn latency, intent-recognition
            accuracy, and how often users have to repeat themselves.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 design principles and 5 metrics for voice product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Voice PM Skills — Free →
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

        <RelatedPages slug="pm-voice-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Voice PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
