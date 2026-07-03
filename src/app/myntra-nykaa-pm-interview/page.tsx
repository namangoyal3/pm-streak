import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Myntra & Nykaa PM Interview Guide (2026) — Fashion &amp; Beauty Commerce PM",
  description:
    "Crack PM interviews at Myntra and Nykaa. Fashion &amp; beauty e-commerce dynamics — discovery, styling, try-on, returns, and the dynamics unique to lifestyle commerce.",
  keywords: [
    "Myntra PM interview", "Nykaa PM interview",
    "fashion e-commerce PM", "beauty PM india",
    "lifestyle commerce PM 2026",
  ],
  alternates: { canonical: "/myntra-nykaa-pm-interview" },
  openGraph: {
    title: "Myntra & Nykaa PM Interview Guide 2026 — PM Streak",
    description: "Fashion &amp; beauty commerce PM interview prep — dynamics, questions, and prep.",
    url: `${SITE_URL}/myntra-nykaa-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Myntra+&+Nykaa+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myntra & Nykaa PM Interview Guide 2026 — PM Streak",
    description: "Fashion &amp; beauty commerce PM interview prep — dynamics, questions, and prep.",
    images: [`${SITE_URL}/api/og?title=Myntra+&+Nykaa+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Myntra", value: "Fashion-first, Flipkart-owned, young urban demographic, strong private labels, visual discovery" },
  { label: "Nykaa", value: "Beauty + wellness + fashion (via Nykaa Fashion), listed company, multi-brand curation + house brands, omnichannel" },
  { label: "Users to know", value: "Style-conscious 18–35 women and men, first-time online fashion buyers, trend-driven repeat buyers" },
  { label: "Key metrics", value: "GMV, average order value, return rate, repeat rate, time-to-discovery, cart adds per session" },
  { label: "Unique challenge", value: "Fashion returns are 25–40% (vs 5% in electronics). Every product decision must consider its return-rate impact." },
];

const QUESTIONS = [
  {
    theme: "Discovery & Styling",
    items: [
      "Improve Myntra&apos;s home screen for a user searching for an outfit for a specific occasion.",
      "Design a feature that helps Nykaa shoppers discover products based on skin type and concerns.",
      "How would you reduce decision paralysis on a 50-product search result page?",
    ],
  },
  {
    theme: "Returns & Quality",
    items: [
      "Return rate in women&apos;s fashion is 35%. Design a product intervention to reduce by 10pp without hurting conversion.",
      "Design a size prediction tool to reduce size-related returns.",
      "Nykaa&apos;s customers complain about product authenticity concerns. Solve.",
    ],
  },
  {
    theme: "Monetisation & Loyalty",
    items: [
      "Design a loyalty product for Myntra Insiders that actually drives repeat purchase behaviour.",
      "Nykaa charges high commissions to smaller brands. Some brands threaten to leave. Strategic response?",
      "How would you grow Nykaa&apos;s subscription / membership product?",
    ],
  },
  {
    theme: "Brand &amp; Content",
    items: [
      "Design Myntra Studio (content + shop) so that content-first users become shoppers.",
      "Nykaa&apos;s content strategy drives discovery but competes with core shopping. Balance.",
      "How would you integrate influencer content meaningfully without turning the app into Instagram?",
    ],
  },
];

const FAQS = [
  {
    q: "What&apos;s unique about fashion and beauty PM work?",
    a: "High returns, emotional purchasing, and taste-driven discovery. Unlike electronics or grocery, fashion PMs must understand style subjectivity — what&apos;s &apos;right&apos; varies by user. Beauty PMs deal with skin-specific concerns and trust issues around authenticity. Both have much higher return rates than most e-commerce, which dominates product decision trade-offs.",
  },
  {
    q: "Do Myntra and Nykaa hire PMs differently?",
    a: "Similar formats (product, metrics, strategy, behavioural) with different domain flavours. Myntra probes more on discovery and personalisation; Nykaa probes more on curation, brand partnerships, and omnichannel. Both value PMs who&apos;ve deeply used the products and can speak to specific UX decisions.",
  },
];

export default function MyntraNykaaPmInterviewPage() {
  const dates = pageDates("/myntra-nykaa-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Myntra &amp; Nykaa PM Interview", url: `${SITE_URL}/myntra-nykaa-pm-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Myntra & Nykaa PM Interview Guide (2026 Edition)",
        description: "Crack PM interviews at Myntra and Nykaa. Fashion &amp; beauty e-commerce dynamics — discovery, styling, try-on, returns, and the dynamics unique to lifestyle commerce.",
        image: `${SITE_URL}/api/og?title=Myntra+&+Nykaa+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/myntra-nykaa-pm-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👗</span> Fashion &amp; beauty commerce · High returns · Taste-driven discovery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Myntra &amp; Nykaa PM Interview<br />Guide (2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Unlike most e-commerce interviews, Myntra and Nykaa loops spend real time on four themes
            — discovery and styling, returns and quality, monetisation and loyalty, and brand and
            content — because fashion returns run 25 to 40%, far above the roughly 5% seen in
            electronics. Expect every product idea to be pressure-tested against its likely effect
            on that return rate.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Lifestyle commerce context, 4 question themes covering discovery, returns, monetisation, and content —
            and what the interviewers are actually listening for.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Lifestyle Commerce PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Context</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Question Themes</h2>
          <div className="space-y-6">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">{q.theme}</h3>
                <ul className="space-y-2">
                  {q.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{j + 1}.</span>
                      <span className="text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
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

        <RelatedPages slug="myntra-nykaa-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Lifestyle Commerce PM Scenarios</h2>
          <p className="text-white/60 mb-6">Daily scenarios on discovery, returns, and taste-driven product design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
