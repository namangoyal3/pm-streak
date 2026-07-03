import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Feedback Loops (2026) — How AI Products Get Smarter From Users",
  description:
    "How PMs design feedback loops in AI products. Thumbs, edits, RLHF, and how to capture signal without breaking the experience.",
  keywords: [
    "PM AI feedback", "RLHF PM 2026",
  ],
  alternates: { canonical: "/pm-ai-feedback-loops" },
  openGraph: {
    title: "PM AI Feedback Loops 2026 — PM Streak",
    description: "How AI products get smarter from users.",
    url: `${SITE_URL}/pm-ai-feedback-loops`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Feedback+Loops+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Feedback Loops 2026 — PM Streak",
    description: "How AI products get smarter from users.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Feedback+Loops+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SIGNALS = [
  "Thumbs up/down — easy but shallow",
  "Edits to AI output — high signal, low friction",
  "Acceptance rate of suggestions — implicit signal",
  "Re-rolls and retries — what didn&apos;t work",
  "Long-form feedback for power users",
];

const PRACTICES = [
  "Capture but don&apos;t over-prompt — feedback fatigue is real",
  "Aggregate before acting — single user feedback is noise",
  "Close the loop — show users their feedback was heard",
  "Use feedback for evals first, fine-tuning second",
];

const FAQS = [
  {
    q: "How important is RLHF for AI products?",
    a: "Important for big foundation labs. Less critical for application-layer products that can use prompt engineering, fine-tuning, and eval-driven iteration. Most PMs don&apos;t need to do RLHF; they need solid feedback capture and an eval suite that improves with feedback.",
  },
];

export default function PmAiFeedbackLoopsPage() {
  const dates = pageDates("/pm-ai-feedback-loops");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Feedback Loops", url: `${SITE_URL}/pm-ai-feedback-loops` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Feedback Loops (2026 Edition)",
        description:
          "How PMs design feedback loops in AI products. Thumbs, edits, RLHF, and how to capture signal without breaking the experience.",
        image: `${SITE_URL}/api/og?title=PM+AI+Feedback+Loops+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-feedback-loops`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> Feedback fuels evals first, fine-tuning second
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Feedback Loops<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            AI feedback loops capture signals like thumbs, edits, acceptance rates, and re-rolls, then route them through evals first and fine-tuning second. Most application-layer PMs don&apos;t need RLHF — they need reliable capture that avoids feedback fatigue, aggregates before acting on noise, and closes the loop so users know their input mattered.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 feedback signals and 4 practices for AI product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Feedback PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">4 Practices</h2>
            <div className="space-y-2">
              {PRACTICES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-ai-feedback-loops" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Feedback Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
