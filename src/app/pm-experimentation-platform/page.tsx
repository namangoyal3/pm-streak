import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Experimentation Platform (2026) — LaunchDarkly, Statsig, Eppo PM Lessons",
  description:
    "How PMs build experimentation platforms. Feature flags, statistical engines, governance, and why exp platforms are the unsexy infra winners.",
  keywords: [
    "PM experimentation platform", "Statsig PM",
    "LaunchDarkly 2026",
  ],
  alternates: { canonical: "/pm-experimentation-platform" },
  openGraph: {
    title: "PM Experimentation Platform 2026 — PM Streak",
    description: "How PMs build experimentation platforms.",
    url: `${SITE_URL}/pm-experimentation-platform`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Experimentation+Platform+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Experimentation Platform 2026 — PM Streak",
    description: "How PMs build experimentation platforms.",
    images: [`${SITE_URL}/api/og?title=PM+Experimentation+Platform+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Statistical engine quality is the moat — peeking, sequential testing, CUPED",
  "Feature flag UX is table stakes",
  "Governance for hundreds of concurrent experiments matters at scale",
  "Integration with data warehouse decides whether teams adopt",
  "Free tiers (Statsig, GrowthBook) commoditise the lower end",
];

const METRICS = [
  "Active experiments per org per week",
  "Time-to-first-experiment for new users",
  "Coverage of services with flags",
  "Stat-significance accuracy on test conclusions",
  "Engineer:PM ratio of platform users",
];

const FAQS = [
  {
    q: "Is the experimentation platform market consolidating?",
    a: "Yes — Statsig, Optimizely, LaunchDarkly, Eppo dominate at scale. The flag-only end is commoditising. Differentiation has shifted to statistical rigour, warehouse integration, and AI-assisted analysis. Build vs buy is increasingly buy for most companies under 500 engineers.",
  },
];

export default function PmExperimentationPlatformPage() {
  const dates = pageDates("/pm-experimentation-platform");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Experimentation Platform", url: `${SITE_URL}/pm-experimentation-platform` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Experimentation Platform (2026 Edition)",
        description:
          "How PMs build experimentation platforms. Feature flags, statistical engines, governance, and why exp platforms are the unsexy infra winners.",
        image: `${SITE_URL}/api/og?title=PM+Experimentation+Platform+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-experimentation-platform`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧪</span> Statistical engine is the moat. Flags are commoditised.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Experimentation Platform<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            As feature-flag-only tools commoditize, the real moat for a PM building an experimentation platform is statistical engine quality — CUPED, sequential testing, and honest handling of peeking — plus governance across hundreds of concurrent experiments and integration with the data warehouse, tracked through metrics like active experiments per week, time-to-first-experiment for new users, and the engineer-to-PM ratio of platform users.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for experimentation platform PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Exp Platform PM Skills — Free →
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

        <RelatedPages slug="pm-experimentation-platform" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Exp Platform PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
