import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Fintech PM India (2026) — UPI, Lending, Wealth &amp; the Regulatory Maze",
  description:
    "How fintech PMs build in India. Payment rails, lending unit economics, wealth products, and navigating RBI/SEBI regulation while shipping real products.",
  keywords: [
    "fintech PM india", "UPI PM",
    "lending PM india", "SEBI PM products",
    "RBI regulated PM 2026",
  ],
  alternates: { canonical: "/pm-fintech-india" },
  openGraph: {
    title: "Fintech PM India 2026 — PM Streak",
    description: "How fintech PMs build in India — UPI, lending, wealth, and navigating regulation.",
    url: `${SITE_URL}/pm-fintech-india`,
    images: [{ url: `${SITE_URL}/api/og?title=Fintech+PM+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintech PM India 2026 — PM Streak",
    description: "How fintech PMs build in India — UPI, lending, wealth, and navigating regulation.",
    images: [`${SITE_URL}/api/og?title=Fintech+PM+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CATEGORIES = [
  { category: "Payments", examples: "Razorpay, PhonePe, Paytm, Cashfree, Juspay", dynamics: "UPI-dominant, MDR regulated to ~0, merchant-side monetisation" },
  { category: "Consumer lending", examples: "Navi, KreditBee, Moneyview, Slice, Fibe", dynamics: "NBFC partnerships, RBI scrutiny, NPA management, unit-economics-obsessed" },
  { category: "Wealth / Investing", examples: "Groww, Zerodha, INDmoney, Scripbox", dynamics: "SEBI-regulated, broking economics, retail expansion" },
  { category: "Neo-banking", examples: "Jupiter, Fi Money, Niyo", dynamics: "Bank partnerships (cannot hold deposits directly), UX-led differentiation" },
  { category: "Insurance (insurtech)", examples: "Acko, Digit, Policybazaar, Plum", dynamics: "IRDAI-regulated, underwriting-driven, distribution economics" },
  { category: "Crypto / Web3", examples: "CoinDCX, CoinSwitch", dynamics: "Regulatory uncertainty, TDS/taxation, volatility-driven behaviour" },
];

const UNIQUE_CHALLENGES = [
  "Heavy regulation — RBI / SEBI / IRDAI each have scope; legal team is a core collaborator",
  "UPI is essentially free — payments monetise adjacent products (lending, wealth, merchant services)",
  "Trust gap is wider — financial products demand more reassurance than consumer apps",
  "Compliance is a product surface — KYC, risk, fraud are not &apos;someone else&apos;s problem&apos;",
  "Cohort behaviour shifts — new crypto TDS rules, UPI caps, RBI circulars can reshape products overnight",
  "Unit economics must be visible — &apos;this is great for users&apos; fails if ₹-per-transaction doesn&apos;t work",
];

const SKILLS = [
  "Understand NPA, TAT, fill rate, success rate — fintech lexicon",
  "Comfort reading RBI/SEBI circulars — regulatory comprehension",
  "Partner well with compliance — don&apos;t treat them as a blocker",
  "Model unit economics — per-transaction profitability",
  "Balance growth with risk — fraud, default, credit loss are real P&amp;L",
];

const FAQS = [
  {
    q: "Is fintech PM a good career path in India?",
    a: "Excellent. India has arguably the most interesting fintech market globally — UPI scale, lending rails maturing, wealth products democratising. PMs gain deep domain expertise that compounds. Compensation is strong at top fintechs (Razorpay, PhonePe, Jupiter, Groww). Trade-off: regulation makes it slower-paced than pure consumer products.",
  },
  {
    q: "What&apos;s the biggest fintech PM mistake?",
    a: "Treating regulation as someone else&apos;s problem. Fintech PMs who dodge compliance conversations make decisions that legal reverses weeks later. The best fintech PMs partner with compliance early — understand constraints upfront, not after they break. This is the biggest skill delta between fintech PM and consumer PM.",
  },
];

export default function PmFintechIndiaPage() {
  const dates = pageDates("/pm-fintech-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Fintech PM India", url: `${SITE_URL}/pm-fintech-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Fintech PM India (2026 Edition)",
        description:
          "How fintech PMs build in India. Payment rails, lending unit economics, wealth products, and navigating RBI/SEBI regulation while shipping real products.",
        image: `${SITE_URL}/api/og?title=Fintech+PM+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-fintech-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💳</span> Most interesting fintech market globally — with the most regulation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Fintech PM India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Fintech PM in India isn&apos;t one job — it&apos;s six, split across payments, consumer lending, wealth and investing, neo-banking, insurance, and crypto, each answering to a different regulator (RBI, SEBI, or IRDAI) with its own compliance surface. Since UPI itself is essentially free, payments companies monetise through adjacent lending and wealth products instead, and PMs who treat compliance as someone else&apos;s problem watch legal reverse their decisions weeks later.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 fintech categories to understand, 6 unique challenges, and 5 skills that separate fintech PMs from other domains.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Fintech PM Skills Daily — Free →
          </Link>
        </section>

        {/* Categories */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Fintech Categories</h2>
          <div className="space-y-4">
            {CATEGORIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {c.category}</p>
                <p className="text-xs text-[#89e219] mb-1">Examples: {c.examples}</p>
                <p className="text-xs text-white/60">Dynamics: {c.dynamics}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Unique Fintech PM Challenges</h2>
            <div className="space-y-2">
              {UNIQUE_CHALLENGES.map((u, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{u}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Fintech PM Skills</h2>
          <div className="space-y-2">
            {SKILLS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
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

        <RelatedPages slug="pm-fintech-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Fintech PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on payments, lending, wealth, and regulated product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
