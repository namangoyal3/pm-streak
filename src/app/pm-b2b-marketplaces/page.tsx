import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM B2B Marketplaces (2026) — Udaan, IndiaMART, Zetwerk PM Guide",
  description:
    "How PMs build B2B marketplaces. Supplier quality, credit, logistics, and why B2B marketplaces are fundamentally different from consumer ones.",
  keywords: [
    "PM B2B marketplaces", "Udaan PM",
    "IndiaMART PM", "Zetwerk PM 2026",
  ],
  alternates: { canonical: "/pm-b2b-marketplaces" },
  openGraph: {
    title: "PM B2B Marketplaces 2026 — PM Streak",
    description: "How PMs build B2B marketplaces.",
    url: `${SITE_URL}/pm-b2b-marketplaces`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+B2B+Marketplaces+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM B2B Marketplaces 2026 — PM Streak",
    description: "How PMs build B2B marketplaces.",
    images: [`${SITE_URL}/api/og?title=PM+B2B+Marketplaces+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Supplier quality is the moat — bad suppliers kill the marketplace fast",
  "Credit / working capital is often the real product — commerce follows credit",
  "Logistics integration determines margin — own, partner, or stay asset-light",
  "Relationships beat clicks — B2B buyers prefer WhatsApp and phone over apps",
  "Vernacular support unlocks scale beyond metros",
];

const METRICS = [
  "GMV and take rate by category",
  "Repeat buyer rate",
  "Order fulfillment rate",
  "Credit line utilisation and NPA",
  "Supplier retention and active-supplier count",
];

const FAQS = [
  {
    q: "Why is Indian B2B marketplace PM especially hard?",
    a: "Because you&apos;re selling to business owners who prefer phones over apps, credit over cash, and known suppliers over marketplaces. Building trust at scale means blending digital product with offline sales teams, field-agent networks, and phone support. Pure-digital playbooks from consumer marketplaces fail.",
  },
];

export default function PmB2bMarketplacesPage() {
  const dates = pageDates("/pm-b2b-marketplaces");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM B2B Marketplaces", url: `${SITE_URL}/pm-b2b-marketplaces` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM B2B Marketplaces (India Edition)",
        description:
          "How PMs build B2B marketplaces. Supplier quality, credit, logistics, and why B2B marketplaces are fundamentally different from consumer ones.",
        image: `${SITE_URL}/api/og?title=PM+B2B+Marketplaces+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-b2b-marketplaces`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏭</span> B2B marketplaces are built on trust, credit, and logistics
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM B2B Marketplaces<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            B2B marketplace PMs treat supplier quality as the core moat, credit and working capital as the real product beneath the marketplace, and logistics ownership as the lever on margin — because Indian buyers still prefer WhatsApp and phone calls over apps. Success shows up in GMV, take rate, repeat buyer rate, and credit line NPA, and it requires pairing digital product with offline sales and field-agent networks.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2 transition-colors">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for B2B marketplace PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build B2B Marketplace PM Skills — Free →
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

        <RelatedPages slug="pm-b2b-marketplaces" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice B2B Marketplace Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
