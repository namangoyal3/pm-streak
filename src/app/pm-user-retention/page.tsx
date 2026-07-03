import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM User Retention (2026) — The Ultimate Product Metric",
  description:
    "How PMs build retention — the truest sign of product-market fit. Retention curves, benchmarks, levers, and why every PM should obsess over D30.",
  keywords: [
    "PM retention", "user retention product",
    "D30 retention PM", "retention curve",
    "retention product design 2026",
  ],
  alternates: { canonical: "/pm-user-retention" },
  openGraph: {
    title: "PM User Retention 2026 — PM Streak",
    description: "How PMs build retention — the truest product-market fit signal.",
    url: `${SITE_URL}/pm-user-retention`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+User+Retention+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM User Retention 2026 — PM Streak",
    description: "How PMs build retention — the truest product-market fit signal.",
    images: [`${SITE_URL}/api/og?title=PM+User+Retention+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHY_RETENTION = [
  "Retention is the truest measure of product-market fit — users return only if they get value",
  "High retention means you can invest more in acquisition — unit economics work",
  "Retained users refer others — retention compounds into growth",
  "Retention separates fads from durable products — churners don&apos;t",
  "Retention metrics catch problems before they show in revenue",
];

const BENCHMARKS = [
  { category: "Consumer social (Instagram-tier)", d30: "50–70%" },
  { category: "Messaging (WhatsApp-tier)", d30: "80–90%" },
  { category: "Learning apps (Duolingo-tier)", d30: "20–35%" },
  { category: "E-commerce", d30: "30–50% monthly repeat" },
  { category: "B2B SaaS", d30: "85%+ (logo retention)" },
  { category: "Games", d30: "15–30% (highly variable)" },
];

const LEVERS = [
  "Shorten time-to-value — users who see value fast retain better",
  "Build habit loops — streaks, daily content, notifications",
  "Content/data that compounds — users&apos; own content locks them in",
  "Community / social network effects — presence of others raises value",
  "Reactivation flows — well-timed win-backs recover some churn",
  "Reduce core UX friction — every unnecessary step kills retention",
];

const CURVE_PATTERNS = [
  { pattern: "Smiley curve (drops then climbs)", what: "Users churn then engaged segment retains; healthy if drop isn&apos;t too steep" },
  { pattern: "Flattening curve", what: "Drops initially then stays stable — sign of habit formation" },
  { pattern: "Continuous decay to zero", what: "No sustainable value; product-market fit is not there" },
  { pattern: "Early spike then cliff", what: "Novelty without depth; users tried it but didn&apos;t get real value" },
];

const FAQS = [
  {
    q: "What&apos;s the single most important retention metric?",
    a: "For most products, D7 or D30 retention — whichever matches your natural user rhythm. Daily-habit products (Duolingo, news) care about D7. Weekly/monthly products (e-commerce) care about D30. The absolute number matters less than the trend and the shape of the curve.",
  },
  {
    q: "What&apos;s the biggest PM retention mistake?",
    a: "Focusing on acquisition before retention is solid. New users pouring into a leaky bucket waste marketing spend and obscure real product issues. The rule: if your D30 retention is &lt;20% (consumer apps), fix retention before acquiring more users. Acquisition pushed at a leaky product is both expensive and dishonest.",
  },
];

export default function PmUserRetentionPage() {
  const dates = pageDates("/pm-user-retention");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM User Retention", url: `${SITE_URL}/pm-user-retention` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM User Retention Guide (2026 Edition)",
        description:
          "How PMs build retention — the truest sign of product-market fit. Retention curves, benchmarks, levers, and why every PM should obsess over D30.",
        image: `${SITE_URL}/api/og?title=PM+User+Retention+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-user-retention`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Retention is the truest sign of product-market fit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM User Retention Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            User retention is the clearest evidence of product-market fit because people only return when they get value, and it varies sharply by category — from roughly 20–35% D30 for learning apps like Duolingo to 80–90% for messaging apps like WhatsApp — while PMs raise it through faster time-to-value, habit loops, compounding content, network effects, reactivation flows, and less friction, then track whether the curve flattens or decays to zero.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 reasons retention is the PM north star, 6 category benchmarks, 6 levers to improve,
            and 4 retention curve patterns to recognise.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Retention Skills Daily — Free →
          </Link>
        </section>

        {/* Why retention */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Why Retention Matters Most</h2>
          <div className="space-y-2">
            {WHY_RETENTION.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benchmarks */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">D30 Retention Benchmarks</h2>
            <div className="space-y-3">
              {BENCHMARKS.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-white/70">{b.category}</p>
                  <span className="text-sm text-green-400 font-mono">{b.d30}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Levers */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Levers to Improve Retention</h2>
          <div className="space-y-2">
            {LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Curves */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Retention Curve Patterns</h2>
            <div className="space-y-3">
              {CURVE_PATTERNS.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{c.pattern}</p>
                  <p className="text-xs text-white/60">{c.what}</p>
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

        <RelatedPages slug="pm-user-retention" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Retention Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on retention curves, habit loops, and product-market fit diagnosis.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
