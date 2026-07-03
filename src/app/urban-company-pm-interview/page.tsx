import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Urban Company PM Interview Guide (2026) — Services Marketplace PM Questions",
  description:
    "Crack the Urban Company PM interview. Home services marketplace dynamics, partner (professional) product challenges, trust and quality, and real interview questions.",
  keywords: [
    "Urban Company PM interview", "UrbanClap PM",
    "services marketplace PM", "home services PM",
    "partner product PM india 2026",
  ],
  alternates: { canonical: "/urban-company-pm-interview" },
  openGraph: {
    title: "Urban Company PM Interview Guide 2026 — PM Streak",
    description: "Services marketplace PM interview — Urban Company&apos;s dynamics, rounds, and questions.",
    url: `${SITE_URL}/urban-company-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Urban+Company+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urban Company PM Interview Guide 2026 — PM Streak",
    description: "Services marketplace PM interview — Urban Company&apos;s dynamics, rounds, and questions.",
    images: [`${SITE_URL}/api/og?title=Urban+Company+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Core business", value: "Home services marketplace — beauty, cleaning, appliance repair, massage, plumbing, electrical" },
  { label: "PM culture", value: "Ops-heavy, partner-empathetic, quality-obsessed. PMs co-own outcomes with city ops teams." },
  { label: "Users to know", value: "Customers (booking services), partners/professionals (providers), city ops teams, quality assurance" },
  { label: "Key metrics", value: "Booking conversion, partner utilisation, rebook rate, partner earnings, customer rating, job completion %" },
  { label: "Unique challenge", value: "Partner is the product. Unlike pure software, service quality depends on human partners — and product decisions affect partner livelihood directly." },
];

const QUESTIONS = [
  {
    theme: "Marketplace & Matching",
    icon: "🔁",
    items: [
      "Design a matching algorithm that balances customer preference, partner availability, and geography.",
      "How would you reduce partner cancellations without increasing booking friction?",
      "Customers in Gurgaon get lower availability than South Delhi. Diagnose and fix.",
    ],
  },
  {
    theme: "Partner (Professional) Product",
    icon: "🛠️",
    items: [
      "Design the app experience for a partner who&apos;s juggling 3 bookings a day across two cities.",
      "How would you improve earnings visibility for partners — without over-promising?",
      "Partner retention drops sharply after the first 30 days. Investigate.",
    ],
  },
  {
    theme: "Quality & Trust",
    icon: "⭐",
    items: [
      "Design a system to identify and improve underperforming partners fairly.",
      "Customers complain about inconsistent service quality across partners. How do you address?",
      "How would you reduce the &apos;wait for the plumber&apos; anxiety during time slots?",
    ],
  },
  {
    theme: "Monetisation & Unit Economics",
    icon: "💰",
    items: [
      "Urban Company charges partners commission. Design a way to add value that supports higher take rates.",
      "How would you price premium services (luxury beauty, deep cleaning) vs value tier?",
      "Should Urban Company build a subscription / membership product?",
    ],
  },
];

const FAQS = [
  {
    q: "What&apos;s unique about Urban Company PM interviews?",
    a: "The partner dimension. Unlike most marketplaces, Urban Company&apos;s partners are individual service professionals whose livelihoods depend on platform decisions. PMs are expected to design with genuine empathy for partners — not just as &apos;supply.&apos; Answers that optimise purely for customer experience at partner expense fail this round.",
  },
  {
    q: "Does Urban Company hire PMs outside India?",
    a: "Yes — they&apos;ve expanded to UAE, Singapore, and Saudi Arabia. Some PM roles support international growth, which adds localisation and market entry complexity. Most PM roles remain India-based (Gurgaon HQ + Bangalore) with global scope.",
  },
  {
    q: "Is services marketplace PM a good long-term career?",
    a: "Growing space. Services are harder to digitise than products, but the market is massive and under-penetrated (&gt;90% of home services in India are still offline). PMs build skills in marketplace dynamics, two-sided product design, ops-product integration, and local market strategy — all transferable to adjacent roles at food delivery, quick commerce, mobility, and similar companies.",
  },
];

export default function UrbanCompanyPmInterviewPage() {
  const dates = pageDates("/urban-company-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Urban Company PM Interview", url: `${SITE_URL}/urban-company-pm-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Urban Company PM Interview Guide (2026)",
        description: "Crack the Urban Company PM interview. Home services marketplace dynamics, partner (professional) product challenges, trust and quality, and real interview questions.",
        image: `${SITE_URL}/api/og?title=Urban+Company+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/urban-company-pm-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧰</span> Services marketplace · Partner-first · Quality-obsessed
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Urban Company PM<br />Interview Guide (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            If you are prepping for Urban Company, expect four question themes — marketplace and
            matching, partner (professional) product, quality and trust, and monetisation and unit
            economics — all shaped by one constraint competitors rarely share: the partner is the
            product, so every decision affects a real professional&apos;s livelihood, not just a
            customer&apos;s experience.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Home services marketplace context, 4 question themes covering matching, partner product,
            quality, and unit economics. What Urban Company PMs actually build.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Services PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Services Marketplace Context</p>
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
          <h2 className="text-2xl font-bold text-center mb-10">Question Themes You Will Be Tested On</h2>
          <div className="space-y-6">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{q.icon}</span>
                  <h3 className="text-lg font-bold text-white">{q.theme}</h3>
                </div>
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

        <RelatedPages slug="urban-company-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Services Marketplace PM Scale</h2>
          <p className="text-white/60 mb-6">Daily scenarios on matching, partner experience, and service quality.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
