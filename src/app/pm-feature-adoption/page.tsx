import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Feature Adoption (2026) — Why Your Feature Isn&apos;t Being Used and How to Fix It",
  description:
    "Why shipped features often get low adoption and how PMs fix it. Discovery, education, habit, and the adoption levers that actually move metrics.",
  keywords: [
    "PM feature adoption", "low feature adoption",
    "feature discovery PM", "feature usage",
    "driving adoption 2026",
  ],
  alternates: { canonical: "/pm-feature-adoption" },
  openGraph: {
    title: "PM Feature Adoption 2026 — PM Streak",
    description: "Why features get low adoption and how PMs fix it — discovery, education, habit.",
    url: `${SITE_URL}/pm-feature-adoption`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Feature+Adoption+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Feature Adoption 2026 — PM Streak",
    description: "Why features get low adoption and how PMs fix it — discovery, education, habit.",
    images: [`${SITE_URL}/api/og?title=PM+Feature+Adoption+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REASONS_LOW_ADOPTION = [
  "Users don&apos;t know the feature exists — discovery problem",
  "Users know but don&apos;t understand value — education problem",
  "Users understand but don&apos;t need it — real product problem",
  "Users need it but it&apos;s too hard to use — UX problem",
  "Users try once but don&apos;t return — habit problem",
  "Users actively dislike it — retention risk",
];

const DIAGNOSIS_STEPS = [
  "Look at discovery rate — what % of users even see the feature?",
  "Look at trial rate — what % who see it try it?",
  "Look at repeat rate — what % who try return?",
  "Run 5 user interviews — ask them about the feature unprompted",
  "Check support tickets — are users confused or complaining?",
];

const ADOPTION_LEVERS = [
  "Discovery: in-product announcements, email, notification — one-time signal",
  "Contextual onboarding: feature tours, tooltips, empty states that teach",
  "Use the jobs-to-be-done to decide placement — where users are already trying to do the thing",
  "Incentivise trial — limited-time, free-for-a-month, other nudges",
  "Make first experience great — users get one try; make it count",
  "Remove friction — every step between discovery and value matters",
];

const WHEN_TO_KILL = [
  "Feature has &lt;5% adoption after 3 months of discovery pushes",
  "Users who try once don&apos;t return (no retention)",
  "Support tickets about the feature indicate confusion or dislike",
  "Maintenance cost exceeds the value delivered",
  "Core feature retention is actually hurt by the new feature",
];

const FAQS = [
  {
    q: "How much adoption should a new feature get?",
    a: "Depends on how core to the experience it is. A checkout improvement should get &gt;80% adoption (hard to avoid). An advanced feature for power users might be 5–10%. Benchmark against the specific user segment it targets, not total users. Low overall adoption isn&apos;t necessarily bad if the target segment is using it.",
  },
  {
    q: "What&apos;s the biggest feature adoption mistake?",
    a: "Shipping and hoping. PMs ship features, announce once, then wait. Real adoption requires 3–5 discovery nudges over 2–3 months, contextual in-product education, and iteration based on early user behaviour. Hope is not a strategy.",
  },
];

export default function PmFeatureAdoptionPage() {
  const dates = pageDates("/pm-feature-adoption");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Feature Adoption", url: `${SITE_URL}/pm-feature-adoption` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Feature Adoption (2026 Edition)",
        description:
          "Why shipped features often get low adoption and how PMs fix it. Discovery, education, habit, and the adoption levers that actually move metrics.",
        image: `${SITE_URL}/api/og?title=PM+Feature+Adoption+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-feature-adoption`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📉</span> Low adoption? Diagnose before you add more features.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Feature Adoption<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            When a shipped feature sees low usage, the cause is usually one of six things: users don&apos;t know it exists, don&apos;t understand its value, don&apos;t need it, find it too hard to use, try once without returning, or actively dislike it — diagnosed by checking discovery rate, trial rate, and repeat rate before reaching for levers like contextual onboarding and friction removal.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 reasons features fail to adopt, 5 diagnosis steps, 6 adoption levers, and 5 signs to kill a feature.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Adoption Skills Daily — Free →
          </Link>
        </section>

        {/* Reasons */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Reasons Features Fail to Adopt</h2>
          <div className="space-y-2">
            {REASONS_LOW_ADOPTION.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Diagnosis */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Diagnosis Steps</h2>
            <div className="space-y-2">
              {DIAGNOSIS_STEPS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Levers */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Adoption Levers</h2>
          <div className="space-y-2">
            {ADOPTION_LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to kill */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs to Kill the Feature</h2>
            <div className="space-y-2">
              {WHEN_TO_KILL.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">⚠️</span>
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

        <RelatedPages slug="pm-feature-adoption" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Adoption Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on adoption diagnosis, discovery, and feature learning curves.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
