import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Content Products (2026) — How to Build Products Where Content Is the Product",
  description:
    "How PMs build content products. Creator economy, recommendation algorithms, content moderation, and the dynamics of platforms where content is the product.",
  keywords: [
    "PM content products", "creator economy PM",
    "recommendation algorithm PM", "content moderation PM",
    "content platform 2026",
  ],
  alternates: { canonical: "/pm-content-products" },
  openGraph: {
    title: "PM Content Products 2026 — PM Streak",
    description: "How PMs build content platforms — creators, algorithms, moderation, dynamics.",
    url: `${SITE_URL}/pm-content-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Content+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Content Products 2026 — PM Streak",
    description: "How PMs build content platforms — creators, algorithms, moderation, dynamics.",
    images: [`${SITE_URL}/api/og?title=PM+Content+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTENT_DYNAMICS = [
  "3-sided: creators + consumers + platform — decisions affect all three",
  "Algorithm is the product — what users see is designed, not chosen",
  "Moderation is unavoidable — scale creates abuse; policy matters",
  "Creator economics decide supply — creators go where they earn",
  "Content freshness drives retention — daily/weekly new content required",
];

const KEY_METRICS = [
  "Creators: monthly active creators, % creators earning &gt;X, creator NPS",
  "Content: pieces created per day, reach per piece, engagement per piece",
  "Consumers: DAU, time spent, return rate, content diversity consumed",
  "Health: moderation cost per view, policy violation rate, harm reports",
  "Monetisation: ad rates, creator monetisation, platform take rate",
];

const EXAMPLES = [
  "YouTube — creator-consumer dual economy",
  "Instagram / TikTok — algorithmic feeds",
  "Substack — creator-led monetisation",
  "Reddit / Quora — community-moderated content",
  "Sharechat / Josh — Indian-language content",
  "Medium — editorial-curated content",
];

const CHALLENGES = [
  "Cold start — need both creators and consumers",
  "Algorithm bias — recommending only engagement-maximising content creates harm",
  "Creator churn — creators leave for better monetisation elsewhere",
  "Content moderation costs — scales non-linearly with users",
  "Filter bubbles — users only see what algorithm predicts they like",
  "Monetisation-quality tension — ads vs user experience",
];

const FAQS = [
  {
    q: "What&apos;s different about PM work at content platforms?",
    a: "The product IS the content, which you don&apos;t directly create. You design systems that incentivise creators, match content to consumers, and moderate at scale. The focus shifts from features to policies, algorithms, and creator economics. Different craft, same PM fundamentals.",
  },
  {
    q: "What&apos;s the biggest content PM mistake?",
    a: "Optimising engagement without considering harm. Engagement metrics are easy to move but can compound into problematic content or filter bubbles. Great content PMs measure engagement AND long-term user satisfaction, creator diversity, content quality. Short-term engagement wins that create societal harm are net losses.",
  },
];

export default function PmContentProductsPage() {
  const dates = pageDates("/pm-content-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Content Products", url: `${SITE_URL}/pm-content-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Content Products (2026 Edition)",
        description:
          "How PMs build content products. Creator economy, recommendation algorithms, content moderation, and the dynamics of platforms where content is the product.",
        image: `${SITE_URL}/api/og?title=PM+Content+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-content-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📺</span> The product IS the content — you design systems, not features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Content Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Content platforms are three-sided products — creators, consumers, and the platform itself — where the recommendation algorithm, not a chosen feed, decides what people actually see, and moderation becomes unavoidable the moment the platform scales. PMs here manage creator economics to keep supply flowing, content freshness to keep consumers returning, and the tension between engagement-maximising algorithms and harms like filter bubbles, the way YouTube, Instagram, and Reddit each handle differently.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 content platform dynamics, 5 metric categories, 6 examples, and 6 unique challenges.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Content PM Skills Daily — Free →
          </Link>
        </section>

        {/* Dynamics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Content Platform Dynamics</h2>
          <div className="space-y-2">
            {CONTENT_DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metric Categories</h2>
            <div className="space-y-2">
              {KEY_METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Examples to Study</h2>
          <div className="space-y-2">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{e}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Unique Challenges</h2>
            <div className="space-y-2">
              {CHALLENGES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 flex-shrink-0">⚠️</span>
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

        <RelatedPages slug="pm-content-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Content PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on algorithms, creator economics, and content moderation.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
