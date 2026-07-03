import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM x Customer Success (2026) — Working With CS to Ship the Right Things",
  description:
    "How PMs partner with customer success teams. Feedback loops, escalation handling, and why CS is your richest product-research channel.",
  keywords: [
    "PM customer success", "CS PM partnership",
    "customer success PM 2026",
  ],
  alternates: { canonical: "/pm-customer-success" },
  openGraph: {
    title: "PM x Customer Success 2026 — PM Streak",
    description: "How PMs partner with CS teams to ship the right things.",
    url: `${SITE_URL}/pm-customer-success`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+x+Customer+Success+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM x Customer Success 2026 — PM Streak",
    description: "How PMs partner with CS teams to ship the right things.",
    images: [`${SITE_URL}/api/og?title=PM+x+Customer+Success+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRACTICES = [
  "Weekly CS-PM sync — top themes, top blockers, top wins",
  "Shared escalation doc — PM triages, CS expects response within SLA",
  "Customer advisory group — CS runs, PM attends and listens",
  "Ride-alongs — PM shadows CS on 2 customer calls per month",
  "Feature request triage — PM owns decisions, not CS promises",
];

const SIGNALS = [
  "CSAT / NPS by customer segment",
  "Time-to-value for new customers",
  "Feature-request volume — top requests, trend over time",
  "Escalation rate — issues that hit CS but should have been prevented",
  "Renewal rate and expansion revenue tied to product adoption",
];

const FAQS = [
  {
    q: "Should CS own the roadmap for enterprise customers?",
    a: "No. CS should own advocacy, not ownership. Strong CS teams aggregate feedback, flag urgency, and hold PMs accountable to responses — but the decision on what ships stays with product. When CS owns roadmap, you end up building a frankenstein of one-off customer requests.",
  },
];

export default function PmCustomerSuccessPage() {
  const dates = pageDates("/pm-customer-success");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM x Customer Success", url: `${SITE_URL}/pm-customer-success` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM x Customer Success (2026 Edition)",
        description:
          "How PMs partner with customer success teams. Feedback loops, escalation handling, and why CS is your richest product-research channel.",
        image: `${SITE_URL}/api/og?title=PM+x+Customer+Success+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-customer-success`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> CS is your richest product-research channel. Most PMs underuse it.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM x Customer Success<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Partnering with customer success means running a weekly CS-PM sync, sharing an escalation doc with SLA-bound triage, and sitting in on the customer advisory group CS runs — while tracking signals like CSAT by segment, time-to-value, and escalation rate. CS aggregates feedback and flags urgency; product still decides what ships.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 practices and 5 shared signals for PM-CS partnership.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM-CS Partnership Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Practices</h2>
          <div className="space-y-2">
            {PRACTICES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Shared Signals</h2>
            <div className="space-y-2">
              {SIGNALS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-customer-success" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice PM-CS Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
