import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Customer Support Tech (2026) — Intercom, Zendesk, Freshdesk PM Guide",
  description:
    "How PMs build customer support tech. AI deflection, omnichannel, agent productivity, and why support is the best AI testing ground.",
  keywords: [
    "PM customer support", "Intercom PM",
    "Zendesk PM", "Freshdesk PM 2026",
  ],
  alternates: { canonical: "/pm-customer-support-tech" },
  openGraph: {
    title: "PM Customer Support Tech 2026 — PM Streak",
    description: "How PMs build customer support tech.",
    url: `${SITE_URL}/pm-customer-support-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Customer+Support+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Customer Support Tech 2026 — PM Streak",
    description: "How PMs build customer support tech.",
    images: [`${SITE_URL}/api/og?title=PM+Customer+Support+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "AI deflection is the new baseline — 40–60% ticket automation is table stakes",
  "Omnichannel matters — web, email, WhatsApp, phone routed into one queue",
  "Agent productivity metrics shape buyer decisions — time-to-resolve, CSAT",
  "Knowledge base quality drives deflection — stale docs kill automation",
  "Integrations with CRM, billing, product telemetry are the moat",
];

const METRICS = [
  "AI deflection rate (resolved without human)",
  "Median and p95 time-to-resolve",
  "CSAT per channel",
  "Agent handle time trend",
  "First-contact resolution rate",
];

const FAQS = [
  {
    q: "Will AI replace customer support agents?",
    a: "Agents will shift to complex, emotional, or high-value cases. Volume-routine tickets go to AI. The net headcount in support for most orgs will drop 20–50% over 2025–2028, but the remaining roles will be more skilled and better paid. Support PMs who embrace this shift win; those who fight it lose.",
  },
];

export default function PmCustomerSupportTechPage() {
  const dates = pageDates("/pm-customer-support-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Customer Support Tech", url: `${SITE_URL}/pm-customer-support-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Customer Support Tech (2026 Edition)",
        description: "How PMs build customer support tech. AI deflection, omnichannel, agent productivity, and why support is the best AI testing ground.",
        image: `${SITE_URL}/api/og?title=PM+Customer+Support+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-support-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎧</span> Support is the best AI testing ground in SaaS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Customer Support Tech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            With 40–60% of tickets now deflected by AI as the industry baseline, customer support PMs compete less on ticket volume and more on how fast the remaining cases resolve — tracked through median and p95 time-to-resolve, CSAT per channel, and first-contact resolution — while stale knowledge bases quietly cap how much automation is even possible.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for support tech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Support Tech PM Skills — Free →
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

        <RelatedPages slug="pm-customer-support-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Support Tech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
