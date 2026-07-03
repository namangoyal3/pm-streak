import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Meditation &amp; Wellness Apps (2026) — Calm, Headspace, Art of Living PM Lessons",
  description:
    "How PMs build meditation and wellness apps. Habit formation, content vs community, measurable outcomes, and why wellness apps churn fast.",
  keywords: [
    "PM meditation apps", "Calm PM",
    "Headspace PM 2026",
  ],
  alternates: { canonical: "/pm-meditation-apps" },
  openGraph: {
    title: "PM Meditation &amp; Wellness 2026 — PM Streak",
    description: "How PMs build meditation and wellness apps.",
    url: `${SITE_URL}/pm-meditation-apps`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Meditation+&amp;+Wellness+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Meditation &amp; Wellness 2026 — PM Streak",
    description: "How PMs build meditation and wellness apps.",
    images: [`${SITE_URL}/api/og?title=PM+Meditation+&amp;+Wellness+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Habit formation is the product — daily use, not session quality, drives retention",
  "Content library drives initial subscription; community drives renewal",
  "Wellness apps churn fast — 60–80% in first 6 months is normal",
  "Outcome measurement (sleep, stress score) is the next frontier",
  "Indian wellness (yoga, meditation from traditional sources) has cultural resonance",
];

const METRICS = [
  "Daily streak length",
  "% of subscribers who complete 30 days",
  "Sleep/mood outcome reporting",
  "Subscription renewal at 6/12 months",
  "Content completion rate",
];

const FAQS = [
  {
    q: "Why do wellness apps churn so fast?",
    a: "Because users overestimate their own commitment at signup. Calm and Headspace convert huge top-of-funnel but only 20–30% of subscribers renew past 6 months. The apps that retain best build daily habits early (streaks, morning nudges, content bite-sized enough to fit a busy day). Wellness that feels aspirational but takes 20 minutes dies.",
  },
];

export default function PmMeditationAppsPage() {
  const dates = pageDates("/pm-meditation-apps");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Meditation & Wellness", url: `${SITE_URL}/pm-meditation-apps` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Meditation & Wellness Apps (2026 Edition)",
        description:
          "How PMs build meditation and wellness apps. Habit formation, content vs community, measurable outcomes, and why wellness apps churn fast.",
        image: `${SITE_URL}/api/og?title=PM+Meditation+&amp;+Wellness+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-meditation-apps`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧘</span> Daily habit beats session quality in wellness
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Meditation &amp; Wellness Apps<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Because users chronically overestimate their own commitment at signup, wellness apps churn 60–80% within six months, and even category leaders like Calm and Headspace only retain 20–30% of subscribers past that point. PM work here is really habit-formation work — daily streaks, morning nudges, and bite-sized content — with content libraries driving initial subscription and community driving renewal.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for wellness app PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Wellness PM Skills — Free →
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

        <RelatedPages slug="pm-meditation-apps" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Wellness PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
