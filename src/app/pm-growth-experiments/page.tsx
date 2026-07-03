import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Growth Experiments (2026) — A Playbook of Experiments That Move Metrics",
  description:
    "A playbook of growth experiments PMs can run across acquisition, activation, and retention. High-leverage bets with templates.",
  keywords: [
    "PM growth experiments", "growth playbook",
    "growth PM bets 2026",
  ],
  alternates: { canonical: "/pm-growth-experiments" },
  openGraph: {
    title: "PM Growth Experiments 2026 — PM Streak",
    description: "Growth experiment playbook for PMs.",
    url: `${SITE_URL}/pm-growth-experiments`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Growth+Experiments+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Growth Experiments 2026 — PM Streak",
    description: "Growth experiment playbook for PMs.",
    images: [`${SITE_URL}/api/og?title=PM+Growth+Experiments+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ACQUISITION = [
  "Landing page personalisation by traffic source",
  "Signup friction reduction — remove one field, test conversion",
  "Social proof above the fold — logos, review counts, numbers",
  "Referral incentive redesign — double-sided vs one-sided",
];

const ACTIVATION = [
  "Aha moment shortcut — skip to the one action that predicts retention",
  "Personalised first-run content based on signup context",
  "Empty-state upgrade — turn blank screens into guided tours",
  "Time-to-first-value reduction — every second counts",
];

const RETENTION = [
  "Re-engagement push at churn-risk windows",
  "Weekly summary email — personalised, not generic",
  "Habit trigger — streak, daily goal, scheduled nudge",
  "Save flow — intercept cancellation with tailored offers",
];

const FAQS = [
  {
    q: "Where should new growth PMs start?",
    a: "Activation. It&apos;s the highest-leverage stage — cheap to test, fast to learn, and improves every downstream metric. Acquisition experiments require more budget and marketing coordination; retention experiments have long feedback loops. Activation gives the fastest cycle of ship → measure → learn.",
  },
];

export default function PmGrowthExperimentsPage() {
  const dates = pageDates("/pm-growth-experiments");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Growth Experiments", url: `${SITE_URL}/pm-growth-experiments` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Growth Experiments (2026 Edition)",
        description: "A playbook of growth experiments PMs can run across acquisition, activation, and retention. High-leverage bets with templates.",
        image: `${SITE_URL}/api/og?title=PM+Growth+Experiments+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-growth-experiments`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Experiments beat opinions. Every time.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Growth Experiments<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            This playbook covers 12 growth experiments across three stages — four in acquisition (landing page personalisation, signup friction cuts, social proof, referral incentive redesign), four in activation (aha-moment shortcuts, personalised first-run content, empty-state upgrades, faster time-to-first-value), and four in retention (churn-risk re-engagement, personalised weekly summaries, habit triggers, tailored save flows). New growth PMs should start with activation: cheap to test, fast to learn, and it lifts every downstream metric.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            12 experiments across acquisition, activation, and retention.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Growth PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-6">Acquisition (4)</h2>
          <div className="space-y-2">
            {ACQUISITION.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">Activation (4)</h2>
            <div className="space-y-2">
              {ACTIVATION.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-6">Retention (4)</h2>
          <div className="space-y-2">
            {RETENTION.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-growth-experiments" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Growth Experiments</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
