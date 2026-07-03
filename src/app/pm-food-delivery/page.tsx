import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Food Delivery (2026) — Swiggy, Zomato, Eatsure PM Guide",
  description:
    "How PMs build food delivery products in India. Restaurant discovery, delivery ETAs, rider economics, and the brutal unit economics.",
  keywords: [
    "PM food delivery", "Swiggy PM",
    "Zomato PM", "food delivery india 2026",
  ],
  alternates: { canonical: "/pm-food-delivery" },
  openGraph: {
    title: "PM Food Delivery 2026 — PM Streak",
    description: "How PMs build food delivery products.",
    url: `${SITE_URL}/pm-food-delivery`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Food+Delivery+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Food Delivery 2026 — PM Streak",
    description: "How PMs build food delivery products.",
    images: [`${SITE_URL}/api/og?title=PM+Food+Delivery+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Three sides: user, restaurant, rider — each with conflicting incentives",
  "Hyper-local liquidity — marketplace health is measured by pin code, not nationally",
  "Delivery time variance kills trust more than slow averages",
  "Meal times are peaks — infra and ops live and die on 8pm reliability",
  "Commission pressure on restaurants — too high drives them off-platform",
];

const METRICS = [
  "Order completion rate",
  "Median delivery time and p95",
  "Rider earnings per hour",
  "Repeat rate and order frequency",
  "Restaurant churn / new listings rate",
];

const QUESTIONS = [
  "Design a feature that reduces 8pm delivery-time spikes",
  "A high-rated restaurant is losing orders — diagnose",
  "How would you improve first-order experience for Tier-3 users?",
  "Design a pricing model that works for both users and restaurants",
];

const FAQS = [
  {
    q: "Is food delivery PM a good long-term career path?",
    a: "Solid but demanding. You&apos;ll learn marketplaces, logistics, and consumer behaviour at scale few other industries match. Career paths lead to VP Product at marketplaces, quick commerce, or cross-over into travel and mobility PM roles. Compensation is competitive; pace is punishing.",
  },
];

export default function PmFoodDeliveryPage() {
  const dates = pageDates("/pm-food-delivery");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Food Delivery", url: `${SITE_URL}/pm-food-delivery` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Food Delivery (India Edition)",
        description: "How PMs build food delivery products in India. Restaurant discovery, delivery ETAs, rider economics, and the brutal unit economics.",
        image: `${SITE_URL}/api/og?title=PM+Food+Delivery+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-food-delivery`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🍛</span> Three-sided marketplace, local liquidity, punishing peaks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Food Delivery<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Because food delivery in India is a three-sided marketplace balancing users, restaurants, and riders with conflicting incentives, PMs there focus on hyper-local marketplace health rather than national metrics — order completion rate, p95 delivery time, rider earnings per hour, and repeat order frequency are the numbers that matter, with 8pm reliability separating strong products from weak ones.
          </p>
          <p className="text-xs text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics, 5 metrics, and 4 interview-style questions for food delivery PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Food Delivery PM Skills — Free →
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
          <h2 className="text-2xl font-bold text-center mb-10">4 Interview Questions</h2>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{q}</p>
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

        <RelatedPages slug="pm-food-delivery" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Food Delivery Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
