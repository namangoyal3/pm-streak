import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Work-Life Balance (2026) — Actually Protecting Your Time as a PM",
  description:
    "How PMs actually protect time. Calendar hygiene, saying no, avoiding meeting sprawl, and why the myth of 10x output comes at a cost.",
  keywords: [
    "PM work life balance", "PM burnout 2026",
  ],
  alternates: { canonical: "/pm-work-life-balance" },
  openGraph: {
    title: "PM Work-Life Balance 2026 — PM Streak",
    description: "Protecting your time as a PM.",
    url: `${SITE_URL}/pm-work-life-balance`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Work-Life+Balance+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Work-Life Balance 2026 — PM Streak",
    description: "Protecting your time as a PM.",
    images: [`${SITE_URL}/api/og?title=PM+Work-Life+Balance+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TACTICS = [
  "Block 2 hours of deep work daily — no meetings",
  "Decline meetings without agendas",
  "Batch 1:1s — one day, not scattered",
  "Async updates replace status meetings",
  "Schedule vacations in advance — they don&apos;t happen otherwise",
];

const MYTHS = [
  "Busy calendars signal productivity — usually the opposite",
  "Being reachable 24/7 helps your career — rarely true",
  "More meetings = more alignment — diminishing returns fast",
  "Saying no hurts your reputation — selective no builds it",
];

const FAQS = [
  {
    q: "Is PM burnout a real pattern or individual weakness?",
    a: "A real pattern. PMs sit at the intersection of many stakeholders and carry implicit responsibility for outcomes outside their direct control. Without deliberate boundary-setting, burnout is systemic. Orgs that treat balance as individual responsibility burn out more PMs; those that structure it into the job retain better.",
  },
];

export default function PmWorkLifeBalancePage() {
  const dates = pageDates("/pm-work-life-balance");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Work-Life Balance", url: `${SITE_URL}/pm-work-life-balance` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Work-Life Balance (2026 Edition)",
        description:
          "How PMs actually protect time. Calendar hygiene, saying no, avoiding meeting sprawl, and why the myth of 10x output comes at a cost.",
        image: `${SITE_URL}/api/og?title=PM+Work-Life+Balance+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-work-life-balance`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌿</span> Busy calendars usually signal poor prioritisation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Work-Life Balance<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Protecting time as a PM comes down to five deliberate tactics — blocking daily deep work, declining agenda-less meetings, batching one-on-ones, defaulting to async updates, and scheduling vacations in advance — set against myths like the idea that a busy calendar signals productivity. Because PMs sit at the intersection of many stakeholders, burnout is a systemic risk rather than a personal failing unless boundaries are set deliberately.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 tactics and 4 myths about PM balance.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Sustainable PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Tactics</h2>
          <div className="space-y-2">
            {TACTICS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Myths</h2>
            <div className="space-y-2">
              {MYTHS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
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

        <RelatedPages slug="pm-work-life-balance" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Sustainable PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
