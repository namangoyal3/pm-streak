import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Web3 (2026) — Building Crypto Products After the Hype Cycle",
  description:
    "How PMs build web3 products in 2026. Wallets, gas UX, token design, and why the surviving crypto products look a lot like regular consumer apps.",
  keywords: [
    "PM web3", "crypto PM",
    "web3 PM 2026",
  ],
  alternates: { canonical: "/pm-web3" },
  openGraph: {
    title: "PM Web3 2026 — PM Streak",
    description: "Building crypto products after the hype cycle.",
    url: `${SITE_URL}/pm-web3`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Web3+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Web3 2026 — PM Streak",
    description: "Building crypto products after the hype cycle.",
    images: [`${SITE_URL}/api/og?title=PM+Web3+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "UX parity is the bar — users won&apos;t tolerate worse UX just because it&apos;s on-chain",
  "Wallet friction is the single biggest churn source — abstract it away",
  "Gas fees must be predictable — surprise gas kills activation",
  "Token design is product design — the economy IS the product",
  "Regulation shapes the roadmap — compliance is not an afterthought",
];

const CATEGORIES = [
  "Stablecoin payments and cross-border remittance",
  "On-chain identity and credentials",
  "Tokenised real-world assets (RWA)",
  "Decentralised finance (DeFi) with improved UX",
  "Creator and community tokens for fan economies",
];

const FAQS = [
  {
    q: "Is web3 PM a real career in 2026?",
    a: "Smaller than during the 2021 peak but real. Survivors are working on stablecoin payments, on-chain identity, tokenised assets, and DeFi with better UX. Compensation is competitive; risk profile is higher (regulatory, market volatility). Best for PMs who can tolerate uncertainty and genuinely understand the tech.",
  },
];

export default function PmWeb3Page() {
  const dates = pageDates("/pm-web3");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Web3", url: `${SITE_URL}/pm-web3` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Web3 (2026 Edition)",
        description: "How PMs build web3 products in 2026. Wallets, gas UX, token design, and why the surviving crypto products look a lot like regular consumer apps.",
        image: `${SITE_URL}/api/og?title=PM+Web3+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-web3`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔗</span> Crypto products that survived all look like regular apps — with an on-chain engine
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Web3<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            The web3 products that survived the 2021 hype cycle hold to the same bar as any consumer app: UX parity, wallet friction abstracted away, and predictable gas fees. They treat token design and regulation as core product work, not afterthoughts, and cluster into categories like stablecoin payments, on-chain identity, tokenised real-world assets, and DeFi with better UX.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 categories shaping web3 PM roles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Web3 PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">5 Categories</h2>
            <div className="space-y-2">
              {CATEGORIES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-web3" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Web3 PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
