import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Activation Guide (2026) — How to Define &amp; Improve Activation",
  description:
    "How PMs define activation — the moment users get real value — and improve it. The &apos;aha moment&apos;, activation metrics, and the 5 levers PMs use to raise activation.",
  keywords: [
    "PM activation", "aha moment PM",
    "activation rate PM", "first session value",
    "improving activation 2026",
  ],
  alternates: { canonical: "/pm-activation" },
  openGraph: {
    title: "PM Activation Guide 2026 — PM Streak",
    description: "How PMs define and improve activation — the aha moment, metrics, and 5 levers.",
    url: `${SITE_URL}/pm-activation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Activation+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Activation Guide 2026 — PM Streak",
    description: "How PMs define and improve activation — the aha moment, metrics, and 5 levers.",
    images: [`${SITE_URL}/api/og?title=PM+Activation+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DEFINING_ACTIVATION = [
  "The moment users get the value your product promised — not signup",
  "Usually a specific in-product action, not a status — &apos;completed first lesson&apos; not &apos;signed up&apos;",
  "Measurable as a binary: did they reach this action or not?",
  "Correlates strongly with long-term retention — activated users retain &gt;3x non-activated",
  "Typically happens in the first session — the longer it takes, the lower retention",
];

const FAMOUS_EXAMPLES = [
  { product: "Facebook", aha: "Adding 7 friends in 10 days" },
  { product: "Dropbox", aha: "Uploading 1 file to 1 folder across 2 devices" },
  { product: "Slack", aha: "Team sends 2,000 messages" },
  { product: "Twitter", aha: "Following 30 accounts" },
  { product: "Duolingo", aha: "Completing a lesson + opting into daily reminder" },
];

const FINDING_YOUR_AHA = [
  "Analyse retention curves — split activated vs non-activated by specific first-session actions",
  "Look for a sharp difference — &apos;users who did X retain 40%, who didn&apos;t retain 8%&apos;",
  "Test multiple hypotheses — the aha isn&apos;t always the obvious action",
  "Confirm through user interviews — activated users describe value differently than non-activated",
  "Check across cohorts — the aha should hold across segments, not just one",
];

const LEVERS_TO_RAISE_ACTIVATION = [
  "Reduce steps between signup and aha — shorter path = higher activation",
  "Prompt toward aha action — make it the obvious next step",
  "Prefill where possible — remove blank-page friction",
  "Pre-populate with sample content — users see value even before they contribute",
  "Show progress toward aha — &apos;3 of 5 steps complete&apos; drives completion",
];

const FAQS = [
  {
    q: "How do PMs define activation for their product?",
    a: "Start by analysing retention. Look for in-product actions (in first session or first week) that strongly correlate with users still being active at Day 30. The action with the sharpest separation between retained and churned users is likely your aha moment. Confirm through user interviews — ask what finally made the product &apos;click&apos; for them.",
  },
  {
    q: "How high should activation rate be?",
    a: "Depends on product. B2B SaaS often 20–40% from signup. Consumer apps 30–60%. Games often 70%+. Low activation (&lt;15%) usually signals onboarding friction or signup intent mismatch. The target isn&apos;t an absolute number — it&apos;s improvement over your baseline. Raising from 20% to 30% is massive.",
  },
];

export default function PmActivationPage() {
  const dates = pageDates("/pm-activation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Activation", url: `${SITE_URL}/pm-activation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Activation Guide (2026 Edition)",
        description:
          "How PMs define activation — the moment users get real value — and improve it. The &apos;aha moment&apos;, activation metrics, and the 5 levers PMs use to raise activation.",
        image: `${SITE_URL}/api/og?title=PM+Activation+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-activation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💡</span> Activation is where retention begins — not signup
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Activation Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Facebook&apos;s aha moment was seven friends in ten days; Dropbox&apos;s was one file uploaded
            to one folder across two devices — concrete, binary actions that predict Day-30 retention far
            better than signup itself. This guide covers five traits of a strong activation definition,
            five steps to find your own product&apos;s aha moment, and five levers PMs pull to raise the
            activation rate once it&apos;s defined.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 traits of good activation definitions, 5 famous &apos;aha moments&apos;, 5 steps to find yours,
            and 5 levers to raise activation rate.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Activation Skills Daily — Free →
          </Link>
        </section>

        {/* Defining */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Traits of Good Activation Definitions</h2>
          <div className="space-y-2">
            {DEFINING_ACTIVATION.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Famous examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Famous &apos;Aha Moments&apos;</h2>
            <div className="space-y-3">
              {FAMOUS_EXAMPLES.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{e.product}</p>
                  <p className="text-sm text-white/70">{e.aha}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Finding */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Steps to Find Your Aha Moment</h2>
          <div className="space-y-2">
            {FINDING_YOUR_AHA.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Levers */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Levers to Raise Activation</h2>
            <div className="space-y-2">
              {LEVERS_TO_RAISE_ACTIVATION.map((l, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{l}</p>
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

        <RelatedPages slug="pm-activation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Activation Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on onboarding, activation, and early retention design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
