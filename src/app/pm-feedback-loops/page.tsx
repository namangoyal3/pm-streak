import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Feedback Loops (2026) — How PMs Turn User Signal Into Decisions",
  description:
    "How PMs build feedback loops that actually inform decisions. Channels, triage, synthesis, and why most feedback systems are graveyards.",
  keywords: [
    "PM feedback loops", "user feedback PM",
    "voice of customer", "feedback triage 2026",
  ],
  alternates: { canonical: "/pm-feedback-loops" },
  openGraph: {
    title: "PM Feedback Loops 2026 — PM Streak",
    description: "How PMs turn user signal into decisions — channels, triage, synthesis.",
    url: `${SITE_URL}/pm-feedback-loops`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Feedback+Loops+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Feedback Loops 2026 — PM Streak",
    description: "How PMs turn user signal into decisions — channels, triage, synthesis.",
    images: [`${SITE_URL}/api/og?title=PM+Feedback+Loops+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CHANNELS = [
  "Support tickets — unfiltered voice of frustrated users",
  "In-app feedback widgets — low-friction, low-signal",
  "NPS surveys — comparable over time, shallow reasoning",
  "User interviews — highest depth, highest cost",
  "Sales call recordings — prospects tell you what you don&apos;t do yet",
  "Community / social — vocal minority; weight with care",
];

const WORKFLOW = [
  "Tag everything — every piece of feedback gets a category at intake",
  "Quantify pain — rank by frequency × severity × segment",
  "Synthesise weekly — one document, top themes, linked examples",
  "Close the loop — tell users when you shipped something they asked for",
  "Guard against the loudest voice — one angry enterprise ≠ the market",
];

const FAQS = [
  {
    q: "How often should PMs read raw support tickets?",
    a: "Weekly, minimum. Read 20 tickets yourself before looking at summaries. Raw tickets carry signal that tagging and dashboards flatten. PMs who skip this develop a polished but wrong model of what users actually struggle with.",
  },
];

export default function PmFeedbackLoopsPage() {
  const dates = pageDates("/pm-feedback-loops");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Feedback Loops", url: `${SITE_URL}/pm-feedback-loops` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Feedback Loops (2026 Edition)",
        description: "How PMs build feedback loops that actually inform decisions. Channels, triage, synthesis, and why most feedback systems are graveyards.",
        image: `${SITE_URL}/api/og?title=PM+Feedback+Loops+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-feedback-loops`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📬</span> Feedback is worthless until it becomes a decision
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Feedback Loops<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM feedback loops turn raw signal into shipped decisions by running six channels — tickets, widgets, NPS, interviews, sales calls, and community chatter — through a five-step process: tag every item at intake, rank it by frequency times severity times segment, synthesize the themes weekly, and close the loop by telling users what shipped. The hardest discipline is not letting one angry enterprise account outweigh what the broader market is telling you.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 channels and a 5-step workflow for turning feedback into decisions.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Feedback PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Channels</h2>
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
            <h2 className="text-2xl font-bold text-center mb-10">5-Step Workflow</h2>
            <div className="space-y-2">
              {WORKFLOW.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-feedback-loops" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Feedback PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
