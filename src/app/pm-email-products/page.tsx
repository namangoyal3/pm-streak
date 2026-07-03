import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Email Products (2026) — Gmail, Superhuman, Hey PM Lessons",
  description:
    "How PMs build email products. Triage, speed, spam signals, and why email has survived every &apos;email killer&apos; since 2005.",
  keywords: [
    "PM email products", "Superhuman PM",
    "email client PM 2026",
  ],
  alternates: { canonical: "/pm-email-products" },
  openGraph: {
    title: "PM Email Products 2026 — PM Streak",
    description: "How PMs build email products.",
    url: `${SITE_URL}/pm-email-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Email+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Email Products 2026 — PM Streak",
    description: "How PMs build email products.",
    images: [`${SITE_URL}/api/og?title=PM+Email+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Speed is the feature — latency &gt; features in daily use",
  "Triage dominates time spent — design for inbox zero or curated flow",
  "AI now shapes email — summary, reply drafting, priority scoring",
  "Email is a protocol, not a product — interop with everyone, always",
  "Mobile-first for consumer, desktop-first for work",
];

const METRICS = [
  "Time-to-first-triage in the morning",
  "Emails sent per active user",
  "Keyboard shortcut adoption (power-user signal)",
  "Smart-reply / AI-assisted reply acceptance",
  "Session count per day (high = habit)",
];

const FAQS = [
  {
    q: "Why does email persist despite newer tools?",
    a: "Because it&apos;s the only universal async communication protocol. Slack, WhatsApp, Teams all work within walled gardens. Email works across every organisation, country, and decade. Every &apos;email killer&apos; for 20 years has failed at this. The winning email products accept persistence and build on top rather than trying to replace.",
  },
];

export default function PmEmailProductsPage() {
  const dates = pageDates("/pm-email-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Email Products", url: `${SITE_URL}/pm-email-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Email Products (2026 Edition)",
        description: "How PMs build email products. Triage, speed, spam signals, and why email has survived every 'email killer' since 2005.",
        image: `${SITE_URL}/api/og?title=PM+Email+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-email-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📧</span> Email won by being everywhere. Build on top, not against.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Email Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Unlike most software categories, email product decisions are dominated by speed and triage — not new features — because the protocol itself, not any single client, is what makes email universal across companies, countries, and the twenty years of failed &apos;email killers&apos; that tried to replace it. PMs in this space track time-to-first-triage, keyboard shortcut adoption, and AI-assisted reply acceptance, building on top of the protocol rather than trying to fight it.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for email product PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Email PM Skills — Free →
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

        <RelatedPages slug="pm-email-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Email PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
