import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Developer Tools (2026) — Building Products for Engineers",
  description:
    "How PMs build for developers. Docs, DX, pricing, community — and why developer tools are the highest-leverage PM role in software.",
  keywords: [
    "PM developer tools", "devtools PM",
    "dev experience PM", "DX 2026",
  ],
  alternates: { canonical: "/pm-developer-tools" },
  openGraph: {
    title: "PM Developer Tools 2026 — PM Streak",
    description: "How PMs build for developers — DX, docs, pricing, community.",
    url: `${SITE_URL}/pm-developer-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Developer+Tools+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Developer Tools 2026 — PM Streak",
    description: "How PMs build for developers — DX, docs, pricing, community.",
    images: [`${SITE_URL}/api/og?title=PM+Developer+Tools+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PRINCIPLES = [
  "Docs are the product — if docs are bad, the product is bad",
  "Time-to-first-call &lt; 5 minutes — from signup to working code",
  "Developers hate marketing fluff — show, don&apos;t tell. Code samples over adjectives",
  "Pricing must be predictable — usage-based is fine; surprise invoices kill trust",
  "Developer community &gt; paid acquisition — peer recommendation is the dominant channel",
  "Changelogs, status pages, uptime — honest communication builds trust",
];

const METRICS = [
  "Time-to-first-successful-API-call (TTFSAC) — leading indicator of activation",
  "Weekly active developers — not just signups",
  "Self-serve conversion rate — can they go from trial to paid without sales?",
  "Support ticket volume per 1000 active devs — inverse DX signal",
  "NPS among power users (top decile by usage)",
];

const FAQS = [
  {
    q: "Do PMs need to be engineers to build devtools?",
    a: "Not strictly required, but you must be able to read code, use the product yourself, and ship a working integration in under an hour. If you can&apos;t dogfood your own product, you cannot PM it well. Engineer-PMs have an edge but are not the only profile that works.",
  },
];

export default function PmDeveloperToolsPage() {
  const dates = pageDates("/pm-developer-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Developer Tools", url: `${SITE_URL}/pm-developer-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Developer Tools (2026 Edition)",
        description:
          "How PMs build for developers. Docs, DX, pricing, community — and why developer tools are the highest-leverage PM role in software.",
        image: `${SITE_URL}/api/og?title=PM+Developer+Tools+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-developer-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⌨️</span> Devtools PMs build leverage — one good API serves millions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Developer Tools<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Docs are the actual product when you&apos;re building developer tools: PMs are judged on getting a new user to a working API call in under five minutes, replacing marketing language with runnable code samples, keeping pricing predictable, and earning trust through peer-driven developer communities rather than paid acquisition — success then shows up in time-to-first-call, weekly active developers, and self-serve conversion, not just signups.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 DX principles and 5 metrics for PMs building products engineers use.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build DevTools PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 DX Principles</h2>
          <div className="space-y-2">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-developer-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice DevTools PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
