import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Feature Flags (2026) — How PMs Use Flags to Ship Safer",
  description:
    "How PMs use feature flags. Rollout strategies, kill switches, segment targeting, and why flags decouple deploy from release.",
  keywords: [
    "PM feature flags", "kill switch PM 2026",
  ],
  alternates: { canonical: "/pm-feature-flags" },
  openGraph: {
    title: "PM Feature Flags 2026 — PM Streak",
    description: "How PMs use feature flags to ship safer.",
    url: `${SITE_URL}/pm-feature-flags`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Feature+Flags+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Feature Flags 2026 — PM Streak",
    description: "How PMs use feature flags to ship safer.",
    images: [`${SITE_URL}/api/og?title=PM+Feature+Flags+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const USES = [
  "Gradual rollout — 1%, 10%, 50%, 100% with kill switches",
  "Kill switches for fast revert without code change",
  "Segment targeting — beta users, geo, plan tier",
  "A/B testing variants in production",
  "Trunk-based development — merge fast, ship slow",
];

const PRACTICES = [
  "Sunset flags after rollout — tech debt accumulates fast",
  "Document who owns each active flag",
  "Use config-only changes for ops controls; code changes for product",
  "Audit flag count quarterly",
];

const FAQS = [
  {
    q: "How many feature flags is too many?",
    a: "Hundreds to low thousands is normal at scale. The problem isn&apos;t count — it&apos;s untracked, unowned flags that linger past their purpose. A flag is a fork in code that increases test surface. Sunset discipline matters more than initial restraint on creating them.",
  },
];

export default function PmFeatureFlagsPage() {
  const dates = pageDates("/pm-feature-flags");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Feature Flags", url: `${SITE_URL}/pm-feature-flags` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Feature Flags (2026 Edition)",
        description: "How PMs use feature flags. Rollout strategies, kill switches, segment targeting, and why flags decouple deploy from release.",
        image: `${SITE_URL}/api/og?title=PM+Feature+Flags+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-feature-flags`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚦</span> Flags decouple deploy from release. Sunset them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Feature Flags<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            How do PMs actually use feature flags? Mainly for five things — gradual rollout with kill switches, fast reverts without code changes, segment targeting, in-production A/B variants, and trunk-based development. Discipline matters more after launch than before: sunset flags, document who owns each one, and audit the count quarterly, since hundreds to low thousands is normal at scale and the real risk is untracked, unowned flags lingering past their purpose.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 uses and 4 practices for feature flag PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Feature Flag PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Uses</h2>
          <div className="space-y-2">
            {USES.map((u, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{u}</p>
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

        <RelatedPages slug="pm-feature-flags" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Feature Flag PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
