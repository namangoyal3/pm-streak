import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Insurtech (2026) — Policybazaar, Acko, Digit PM Guide",
  description:
    "How PMs build insurance products in India. Underwriting, claims, regulatory, and the slow shift from agent-led to digital-first insurance.",
  keywords: [
    "PM insurtech", "Policybazaar PM",
    "Acko PM", "Digit PM", "insurtech india 2026",
  ],
  alternates: { canonical: "/pm-insurtech" },
  openGraph: {
    title: "PM Insurtech 2026 — PM Streak",
    description: "How PMs build insurance products in India.",
    url: `${SITE_URL}/pm-insurtech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Insurtech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Insurtech 2026 — PM Streak",
    description: "How PMs build insurance products in India.",
    images: [`${SITE_URL}/api/og?title=PM+Insurtech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Trust is the product — users buy protection, not software",
  "Claims experience is everything — one bad claim kills 100 referrals",
  "Underwriting data beats UX at margin — pricing precision wins",
  "Regulatory constraints shape every flow — IRDAI rules aren&apos;t optional",
  "Distribution remains partly offline — agents still drive a huge share",
];

const METRICS = [
  "Conversion at quote-to-purchase — the real funnel step",
  "Claims settlement ratio and turnaround time",
  "Persistency (renewal) rate — LTV is 80% about renewal",
  "NPS post-claim — the only NPS that matters",
  "Cost per acquisition vs LTV — insurance CAC is high",
];

const FAQS = [
  {
    q: "Is insurtech a good PM domain?",
    a: "Slow-moving but large and resilient. You&apos;ll work with actuaries, underwriters, and regulators in ways no consumer PM does. Career paths branch into banking tech, wealth management, and fintech broadly. Compensation is solid; impact compounds over years as policies accumulate.",
  },
];

export default function PmInsurtechPage() {
  const dates = pageDates("/pm-insurtech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Insurtech", url: `${SITE_URL}/pm-insurtech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Insurtech (India Edition)",
        description:
          "How PMs build insurance products in India. Underwriting, claims, regulatory, and the slow shift from agent-led to digital-first insurance.",
        image: `${SITE_URL}/api/og?title=PM+Insurtech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-insurtech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> Trust and claims. Everything else is detail.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Insurtech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Insurtech users buy protection, not software, which is why claims experience becomes the make-or-break moment — one bad claim kills 100 referrals — while underwriting data precision often outweighs interface polish and IRDAI regulatory constraints shape every flow; persistency, the renewal rate, drives roughly 80% of LTV.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for insurtech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Insurtech PM Skills — Free →
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

        <RelatedPages slug="pm-insurtech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Insurtech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
