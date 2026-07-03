import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Security Products (2026) — Building for SOCs, IT, and Compliance",
  description:
    "How PMs build security products. Detection, response, compliance, and the unique buyer dynamics of selling to CISOs.",
  keywords: [
    "PM security products", "security PM",
    "cybersecurity PM", "CISO PM 2026",
  ],
  alternates: { canonical: "/pm-security-products" },
  openGraph: {
    title: "PM Security Products 2026 — PM Streak",
    description: "How PMs build security products — detection, response, compliance.",
    url: `${SITE_URL}/pm-security-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Security+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Security Products 2026 — PM Streak",
    description: "How PMs build security products — detection, response, compliance.",
    images: [`${SITE_URL}/api/og?title=PM+Security+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Noise is the enemy — false positives burn SOC trust faster than missed alerts",
  "CISO buyer, analyst user — two audiences, two sets of priorities",
  "Compliance checkboxes drive deals — SOC 2, ISO 27001, GDPR are the table stakes",
  "Incident response is the moment of truth — the product is judged during crises, not peacetime",
  "Integrations are the product — SIEM, EDR, IAM, cloud platforms — coverage matters",
];

const METRICS = [
  "Mean time to detect (MTTD) and respond (MTTR)",
  "Alert-to-incident conversion rate",
  "False positive rate per rule/detection",
  "Coverage across MITRE ATT&amp;CK tactics",
  "SOC analyst productivity — investigations per analyst per shift",
];

const FAQS = [
  {
    q: "Is security PM a good career?",
    a: "High demand, high technical depth, high stakes. Senior security PMs are well-compensated and career paths branch into CISO advisory, security product leadership, or specialised domains (cloud security, identity, threat intel). Downsides: long enterprise sales cycles and regulatory complexity can feel slow.",
  },
];

export default function PmSecurityProductsPage() {
  const dates = pageDates("/pm-security-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Security Products", url: `${SITE_URL}/pm-security-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Security Products (2026 Edition)",
        description: "How PMs build security products. Detection, response, compliance, and the unique buyer dynamics of selling to CISOs.",
        image: `${SITE_URL}/api/og?title=PM+Security+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-security-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔐</span> Security products earn trust in incidents, not in demos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Security Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Security product PMs sell to a CISO but build for a SOC analyst, which means false positives burn analyst trust faster than missed alerts do, and compliance frameworks like SOC 2, ISO 27001, and GDPR shape the roadmap. The real test is incident response, measured through MTTD, MTTR, alert-to-incident conversion, and coverage across MITRE ATT&amp;CK tactics.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for security product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Security PM Skills — Free →
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

        <RelatedPages slug="pm-security-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Security PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
