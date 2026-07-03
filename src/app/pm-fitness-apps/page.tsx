import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Fitness Apps (2026) — Strava, Cult.fit, Apple Fitness+ PM Lessons",
  description:
    "How PMs build fitness apps. Wearable integrations, habit formation, content vs social, and why fitness has the highest seasonal churn in consumer.",
  keywords: [
    "PM fitness apps", "Strava PM",
    "Cult.fit PM 2026",
  ],
  alternates: { canonical: "/pm-fitness-apps" },
  openGraph: {
    title: "PM Fitness Apps 2026 — PM Streak",
    description: "How PMs build fitness apps.",
    url: `${SITE_URL}/pm-fitness-apps`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Fitness+Apps+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Fitness Apps 2026 — PM Streak",
    description: "How PMs build fitness apps.",
    images: [`${SITE_URL}/api/og?title=PM+Fitness+Apps+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Wearable sync is table stakes — Garmin, Apple Watch, Fitbit support",
  "Social features drive retention more than content libraries",
  "New Year&apos;s seasonality is brutal — January signups, March churn",
  "Hybrid offline+online (Cult.fit) compresses offline cost",
  "Outcome tracking (weight, streak, PR) beats vanity metrics",
];

const METRICS = [
  "Weekly active workouts per user",
  "30/60/90 day retention",
  "Social engagement (comments, kudos)",
  "Completed program rate",
  "Subscription renewal",
];

const FAQS = [
  {
    q: "Why do fitness apps churn in March every year?",
    a: "New Year&apos;s resolutions expire around week 6. Users who haven&apos;t built daily habits by February drop off in March. Apps that push hard in the first 21 days on streaks, buddy systems, and early wins keep more users past the cliff.",
  },
];

export default function PmFitnessAppsPage() {
  const dates = pageDates("/pm-fitness-apps");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Fitness Apps", url: `${SITE_URL}/pm-fitness-apps` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Fitness Apps (2026 Edition)",
        description:
          "How PMs build fitness apps. Wearable integrations, habit formation, content vs social, and why fitness has the highest seasonal churn in consumer.",
        image: `${SITE_URL}/api/og?title=PM+Fitness+Apps+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-fitness-apps`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💪</span> First 21 days decide fitness app retention
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Fitness Apps<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto mb-3">
            Fitness app PMs manage a brutal seasonal curve: January sign-ups surge on New Year&apos;s resolutions, then collapse by March once habits haven&apos;t formed by week six. Wearable sync with Garmin, Apple Watch, and Fitbit is table stakes, but social features — kudos, buddy systems, comments — retain users better than content libraries, which is why the first 21 days matter most.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for fitness app PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Fitness App PM Skills — Free →
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

        <RelatedPages slug="pm-fitness-apps" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Fitness PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
