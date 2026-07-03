import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Travel Tech PM Interview Guide (2026) — MakeMyTrip, ixigo, Cleartrip",
  description:
    "Crack PM interviews at MakeMyTrip, ixigo, Cleartrip, and Goibibo. Travel marketplace dynamics, inventory/pricing, loyalty, and the peculiar PM problems of OTA products.",
  keywords: [
    "MakeMyTrip PM interview", "ixigo PM",
    "Cleartrip PM", "travel tech PM india",
    "OTA PM interview 2026",
  ],
  alternates: { canonical: "/ixigo-makemytrip-pm-interview" },
  openGraph: {
    title: "Travel Tech PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for MakeMyTrip, ixigo, Cleartrip — travel tech dynamics and rounds.",
    url: `${SITE_URL}/ixigo-makemytrip-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Travel+Tech+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Tech PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for MakeMyTrip, ixigo, Cleartrip — travel tech dynamics and rounds.",
    images: [`${SITE_URL}/api/og?title=Travel+Tech+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Companies to know", value: "MakeMyTrip, ixigo, Cleartrip (Flipkart), Goibibo (MMT), EaseMyTrip, Yatra, Booking.com India, Agoda" },
  { label: "Core business", value: "Flights, hotels, buses, trains, holiday packages, travel insurance, visa services" },
  { label: "PM culture", value: "Low-margin, high-complexity, seasonally driven. PMs balance supply partnerships, pricing, and user UX simultaneously." },
  { label: "Users to know", value: "Leisure travellers, business travellers, first-time flyers, Bharat users using rail/bus more than air" },
  { label: "Key metrics", value: "Gross Bookings Value (GBV), take rate (1–3% flights, 15–25% hotels), repeat rate, cancellation rate, NPS" },
  { label: "Unique challenge", value: "Low switching costs between OTAs — users compare 3+ sites per booking. Trust, price, and UX must all work simultaneously." },
];

const QUESTIONS = [
  {
    theme: "Search & Discovery",
    items: [
      "How would you redesign flight search for someone booking a last-minute business trip?",
      "Users often abandon at hotel search. Diagnose.",
      "Design a feature that helps first-time Bharat travellers trust the booking process.",
    ],
  },
  {
    theme: "Pricing & Conversion",
    items: [
      "Airlines&apos; dynamic pricing confuses users — they see different prices on different visits. Design a solution.",
      "How would you reduce cart abandonment at the payment step?",
      "Design a &apos;price prediction&apos; feature to help users decide when to book.",
    ],
  },
  {
    theme: "Post-Booking & Trust",
    items: [
      "A user&apos;s flight is cancelled by the airline. Design their end-to-end experience on your platform.",
      "Design a refund and reschedule flow that reduces support tickets.",
      "Users don&apos;t trust &apos;free cancellation&apos; promises. Design to build this trust.",
    ],
  },
  {
    theme: "Loyalty & Repeat",
    items: [
      "Design a loyalty product that genuinely changes booking behaviour — not just points.",
      "Business travellers book frequently but have low emotional loyalty. How do you increase retention?",
      "How would you grow repeat rate in Tier-2/3 cities where users treat OTAs as one-time utilities?",
    ],
  },
];

const FAQS = [
  {
    q: "What&apos;s unique about travel tech PM?",
    a: "Three things: low switching costs between OTAs, thin margins, and complex partner integrations (airlines, hotels, IRCTC, buses). PMs must design for users who&apos;ll compare 3 sites before booking, while managing supplier APIs that change unpredictably and margin pressure that punishes any UX misstep. It&apos;s one of the most multi-constraint PM domains in consumer tech.",
  },
  {
    q: "Do travel tech companies hire PMs year-round?",
    a: "Yes, though peak hiring is Jan–Mar and Jul–Sep (before peak travel seasons). Companies often ramp up PM teams before their biggest seasonal pushes (summer holidays, Diwali travel). Roles span consumer-facing products, B2B (corporate travel), supply (hotel/airline integrations), and growth.",
  },
  {
    q: "Is travel tech a good PM career path?",
    a: "Specialised but solid. The market is large and recurring, but margins are thin and competition is intense. PMs build deep skills in marketplace dynamics, pricing/inventory, partner integrations, and user trust — highly transferable to e-commerce, fintech payments, and other marketplace roles. Compensation is generally in line with other consumer tech in India, sometimes slightly lower for pure-play OTAs vs fintech/SaaS.",
  },
];

export default function IxigoMakemytripPmInterviewPage() {
  const dates = pageDates("/ixigo-makemytrip-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Travel Tech PM Interview", url: `${SITE_URL}/ixigo-makemytrip-pm-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Travel Tech PM Interview (MakeMyTrip, ixigo, Cleartrip)",
        description: "Crack PM interviews at MakeMyTrip, ixigo, Cleartrip, and Goibibo. Travel marketplace dynamics, inventory/pricing, loyalty, and the peculiar PM problems of OTA products.",
        image: `${SITE_URL}/api/og?title=Travel+Tech+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/ixigo-makemytrip-pm-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>✈️</span> Low margins · Seasonal spikes · 3-way race between OTAs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Travel Tech PM Interview<br />(MakeMyTrip, ixigo, Cleartrip)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because switching costs between OTAs are low — users routinely compare three or more
            sites before booking — MakeMyTrip, ixigo, and Cleartrip interviews cluster around four
            themes: search and discovery, pricing and conversion, post-booking and trust, and
            loyalty and repeat. Expect questions that force you to balance thin margins, seasonal
            demand swings, and unpredictable supplier APIs at once.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The travel tech context Indian PMs need to know, 4 question themes covering search,
            pricing, post-booking, and loyalty — with real questions from OTA interviews.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Travel Tech PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Travel Tech Context</p>
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

        <RelatedPages slug="ixigo-makemytrip-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Travel Marketplace PM Scenarios</h2>
          <p className="text-white/60 mb-6">Daily scenarios on pricing, inventory, partner integrations, and user trust.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
