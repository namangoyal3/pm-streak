import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Uber & Ola PM Interview Guide (2026) — Mobility Product Manager Questions",
  description:
    "Crack PM interviews at Uber and Ola. Marketplace dynamics, pricing, supply-demand balancing, and the operations-heavy product thinking mobility companies test for.",
  keywords: [
    "Uber PM interview", "Ola PM interview",
    "mobility PM interview", "ride hailing PM india",
    "Uber product manager interview questions", "Ola APM 2026",
  ],
  alternates: { canonical: "/uber-ola-pm-interview" },
  openGraph: {
    title: "Uber & Ola PM Interview Guide 2026 — PM Streak",
    description: "PM interview guide for mobility companies — marketplace, pricing, supply-demand questions.",
    url: `${SITE_URL}/uber-ola-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Uber+&+Ola+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uber & Ola PM Interview Guide 2026 — PM Streak",
    description: "PM interview guide for mobility companies — marketplace, pricing, supply-demand questions.",
    images: [`${SITE_URL}/api/og?title=Uber+&+Ola+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MOBILITY_CONTEXT = [
  { label: "Core dynamic", value: "3-sided marketplace: riders, drivers, the platform. Every product decision affects all three." },
  { label: "Key challenges", value: "Surge pricing, supply-demand balance, ETA accuracy, driver retention, rider safety, unit economics" },
  { label: "India-specific", value: "Auto rickshaws, bike taxis, shared rides, outstation trips, airport transfers, corporate accounts, UPI payments" },
  { label: "Unit economics", value: "Take rate (15–25%), driver incentives, rider subsidies, fuel cost pass-through, compliance costs" },
  { label: "Regulatory context", value: "State transport rules, driver union dynamics, safety mandates, pricing caps, ride-hailing licenses" },
];

const QUESTION_THEMES = [
  {
    theme: "Marketplace & Pricing",
    icon: "💱",
    questions: [
      "Rider demand in Bangalore peaks from 8–10 PM but driver supply drops. Design a solution.",
      "Surge pricing during rain creates rider backlash. How do you redesign the experience?",
      "How would you price an 'Ola Prime' subscription product for regular commuters?",
      "Drivers are cancelling 15% of rides in Pune. Diagnose and propose fixes.",
    ],
    tip: "Always consider both sides of the marketplace. A rider-friendly change that hurts driver earnings is not a win.",
  },
  {
    theme: "Supply (Driver) Product",
    icon: "🚗",
    questions: [
      "Design a driver earnings dashboard that helps drivers maximise income.",
      "How would you improve driver retention for Uber in Tier-2 cities?",
      "Drivers complain about cancellation penalties. How do you balance fairness vs platform reliability?",
      "Design a driver training product for new-to-platform drivers.",
    ],
    tip: "Drivers are your supply. Their earnings, experience, and retention are PM metrics — not just HR metrics.",
  },
  {
    theme: "Rider Experience",
    icon: "👤",
    questions: [
      "Rider ETAs are accurate 80% of the time. How do you get to 95%?",
      "Design a safety product for women riders taking late-night rides.",
      "How would you improve the experience for infrequent/occasional riders?",
      "Riders abandon at the fare estimate screen. Diagnose.",
    ],
    tip: "Rider trust is earned through consistency, safety, and transparency. Products that solve an urgent trust gap have outsized impact.",
  },
  {
    theme: "Operations & Scale",
    icon: "⚙️",
    questions: [
      "Launch a new product category (bike taxi) in a city. Walk through your plan.",
      "How would you reduce ETA variance during monsoon in Mumbai?",
      "A city launches a 10% price cap on ride-hailing. Product response?",
      "Design a product to reduce driver downtime between rides.",
    ],
    tip: "Mobility is an ops-heavy product. PMs who ignore fleet operations, city-level constraints, and real-time dynamics miss the plot.",
  },
];

const FAQS = [
  {
    q: "What makes mobility PM interviews uniquely challenging?",
    a: "Two things: marketplace complexity and ops intensity. Every decision has ripple effects across riders, drivers, and the platform. And the product is inseparable from operations — a surge pricing algorithm change affects driver earnings, rider willingness to pay, and city-level supply-demand dynamics within hours. PMs who think only in terms of 'user experience' without understanding the ops and economics don't last.",
  },
  {
    q: "Do I need mobility domain experience to interview at Uber or Ola?",
    a: "Not required but helpful. You must demonstrate the ability to think about 3-sided marketplaces — this is testable even without mobility experience. Candidates from food delivery, quick commerce, or hospitality marketplaces transition well. Pure consumer tech candidates (without marketplace exposure) often struggle in metric rounds because the dynamics are unintuitive.",
  },
  {
    q: "How are Uber and Ola PM interviews different?",
    a: "Both test marketplace thinking. Uber interviews tend to be more structured with heavier emphasis on analytical frameworks and global product lens. Ola is more India-specific — deeper probing on Bharat user needs, regulatory context, and local market dynamics (auto rickshaws, outstation, bike taxis). Prep for both similarly but know each company's product ecosystem specifically before your interviews.",
  },
];

export default function UberOlaPmInterviewPage() {
  const dates = pageDates("/uber-ola-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Uber & Ola PM Interview", url: `${SITE_URL}/uber-ola-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Uber & Ola PM Interview Guide (2026 Edition)",
        description:
          "Crack PM interviews at Uber and Ola. Marketplace dynamics, pricing, supply-demand balancing, and the operations-heavy product thinking mobility companies test for.",
        image: `${SITE_URL}/api/og?title=Uber+&+Ola+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/uber-ola-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚕</span> 3-sided marketplace · Real-time ops · Pricing every minute
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Uber &amp; Ola PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Uber and Ola interviews are built around four question themes rather than fixed rounds:
            marketplace and pricing trade-offs, driver-supply product decisions, rider experience and trust,
            and operations at city scale. Because riders, drivers, and the platform form a three-sided
            marketplace, answers that improve one side while harming another — such as a rider win that cuts driver earnings — get marked down immediately.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The marketplace, pricing, and operations questions that define mobility PM interviews —
            plus everything you need to know about the India ride-hailing context.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Mobility PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Mobility Context You Must Know</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOBILITY_CONTEXT.map((item, i) => (
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
            {QUESTION_THEMES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{t.icon}</span>
                  <h3 className="text-lg font-bold text-white">{t.theme}</h3>
                </div>
                <ul className="space-y-2 mb-4">
                  {t.questions.map((q, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-white/30 flex-shrink-0">{j + 1}.</span>
                      <span className="text-white/70">{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">💡 {t.tip}</p>
                </div>
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

        <RelatedPages slug="uber-ola-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Marketplace PM Scenarios Daily</h2>
          <p className="text-white/60 mb-6">Supply-demand, pricing, and operations questions — calibrated to mobility PM standards.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
