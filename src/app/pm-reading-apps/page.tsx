import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Reading Apps (2026) — Kindle, Pratilipi, Readwise PM Lessons",
  description:
    "How PMs build reading apps. Long-form vs short-form, vernacular, subscription, and why Pratilipi rewrote the reading-for-Bharat playbook.",
  keywords: [
    "PM reading apps", "Kindle PM",
    "Pratilipi PM 2026",
  ],
  alternates: { canonical: "/pm-reading-apps" },
  openGraph: {
    title: "PM Reading Apps 2026 — PM Streak",
    description: "How PMs build reading apps.",
    url: `${SITE_URL}/pm-reading-apps`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Reading+Apps+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Reading Apps 2026 — PM Streak",
    description: "How PMs build reading apps.",
    images: [`${SITE_URL}/api/og?title=PM+Reading+Apps+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Reading habit is formed in small daily chunks — not long sessions",
  "Vernacular unlocks massive latent demand in India",
  "Short-form serial fiction (Pratilipi, Pocket FM) found a huge audience",
  "Subscription beats per-book pricing for retention at scale",
  "Social reading features (highlights, notes) drive engagement depth",
];

const METRICS = [
  "Daily reading minutes per active user",
  "Completion rate (books/stories finished)",
  "Subscription conversion",
  "Social engagement per reader",
  "Creator earnings on the platform",
];

const FAQS = [
  {
    q: "Why did Pratilipi succeed where other Indian reading apps didn&apos;t?",
    a: "By betting entirely on vernacular creator-driven short-form fiction. They rejected the Kindle model (buy full books) and went with daily serialised reading that fits Indian reading habits. Short chapters, vernacular languages, creator revenue shares — a completely different product shape that worked.",
  },
];

export default function PmReadingAppsPage() {
  const dates = pageDates("/pm-reading-apps");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Reading Apps", url: `${SITE_URL}/pm-reading-apps` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Reading Apps (2026 Edition)",
        description:
          "How PMs build reading apps. Long-form vs short-form, vernacular, subscription, and why Pratilipi rewrote the reading-for-Bharat playbook.",
        image: `${SITE_URL}/api/og?title=PM+Reading+Apps+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-reading-apps`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> Reading habits form in small daily chunks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Reading Apps<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Success in PM reading apps hinges on treating reading as a small daily habit rather than a long session, which is why vernacular short-form serial fiction — the model Pratilipi and Pocket FM used to reject Kindle&apos;s buy-the-whole-book approach — unlocked such large audiences. Subscription pricing and social features like highlights then convert that habit into retained, paying readers.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for reading app PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Reading App PM Skills — Free →
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

        <RelatedPages slug="pm-reading-apps" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Reading App Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
