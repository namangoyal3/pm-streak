import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Search &amp; Discovery (2026) — How PMs Design Product Discovery",
  description:
    "How PMs design search and discovery systems. Ranking signals, relevance, personalisation, and what makes discovery experiences delightful.",
  keywords: [
    "PM search discovery", "search PM",
    "discovery PM", "ranking algorithm PM",
    "personalisation PM 2026",
  ],
  alternates: { canonical: "/pm-search-discovery" },
  openGraph: {
    title: "PM Search &amp; Discovery 2026 — PM Streak",
    description: "How PMs design search and discovery — ranking, relevance, personalisation.",
    url: `${SITE_URL}/pm-search-discovery`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Search+&amp;+Discovery+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Search &amp; Discovery 2026 — PM Streak",
    description: "How PMs design search and discovery — ranking, relevance, personalisation.",
    images: [`${SITE_URL}/api/og?title=PM+Search+&amp;+Discovery+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SEARCH_DYNAMICS = [
  "Query intent matters more than query text — same query means different things in different contexts",
  "Recall (did we find it?) vs precision (is it right?) — trade-off always",
  "Personalisation compounds — the longer a user uses, the better it should feel",
  "Freshness matters — stale results kill trust",
  "Zero-result pages are critical UX — don&apos;t just show &apos;no results&apos;",
];

const DISCOVERY_TYPES = [
  { type: "Search (user-initiated)", what: "User knows what they want; deliver it fast" },
  { type: "Browse (category-based)", what: "User exploring within structure; help them navigate" },
  { type: "Feed / recommendations", what: "Algorithm chooses what to show; bears responsibility for quality" },
  { type: "Collections / curated", what: "Human curation; brand voice and editorial quality" },
  { type: "Related items", what: "Contextual — shown alongside something user is already engaging with" },
];

const KEY_METRICS = [
  "Search conversion — % of searches that lead to the intended action",
  "Zero-result rate — % of searches returning nothing (aim &lt;5%)",
  "Click-through rate by position — how relevant are top results?",
  "Time-to-result — search speed; &lt;1 second is the bar",
  "Personalisation lift — how much better are personalised results?",
  "Diversity of results — don&apos;t just show similar items",
];

const DESIGN_PRINCIPLES = [
  "Autocomplete suggestions — help users form queries",
  "Typo tolerance — don&apos;t punish users for minor mistakes",
  "Filter and refinement — give users control to narrow",
  "Explainability — users trust results more when they understand why",
  "Freshness vs relevance trade-off — tune based on use case",
];

const FAQS = [
  {
    q: "Is search PM a specialised role?",
    a: "At companies with complex catalogs (e-commerce, content platforms, marketplaces), yes. Search PMs work closely with ML engineers, relevance teams, and data scientists. Skills: query understanding, ranking, personalisation, evaluation methods. It&apos;s a specialist role that pays well and has deep career paths.",
  },
  {
    q: "What&apos;s the biggest search PM mistake?",
    a: "Over-indexing on one metric like click-through rate. High CTR can mean shallow engagement or clickbait. The PMs who build sustainable search products measure downstream metrics: did the user find what they wanted? Did they return? Short-term CTR optimisation can hurt long-term trust.",
  },
];

export default function PmSearchDiscoveryPage() {
  const dates = pageDates("/pm-search-discovery");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Search &amp; Discovery", url: `${SITE_URL}/pm-search-discovery` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Search & Discovery (2026 Edition)",
        description:
          "How PMs design search and discovery systems. Ranking signals, relevance, personalisation, and what makes discovery experiences delightful.",
        image: `${SITE_URL}/api/og?title=PM+Search+&amp;+Discovery+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-search-discovery`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Discovery is the magic that makes products feel smart
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Search &amp; Discovery<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            How do PMs make discovery feel smart? By balancing recall against precision, treating personalisation as something that compounds with usage, and routing users through the right mode — search, browse, feed, collections, or related items — while tracking zero-result rate under 5% and sub-second response time as the real signals of quality.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 search dynamics, 5 discovery types, 6 key metrics, and 5 design principles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Search PM Skills Daily — Free →
          </Link>
        </section>

        {/* Dynamics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Search Dynamics</h2>
          <div className="space-y-2">
            {SEARCH_DYNAMICS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Discovery types */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Types of Discovery</h2>
            <div className="space-y-3">
              {DISCOVERY_TYPES.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{t.type}</p>
                  <p className="text-xs text-white/60">{t.what}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Key Metrics</h2>
          <div className="space-y-2">
            {KEY_METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Design principles */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Design Principles</h2>
            <div className="space-y-2">
              {DESIGN_PRINCIPLES.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-search-discovery" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Search PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on ranking, relevance, personalisation, and discovery UX.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
