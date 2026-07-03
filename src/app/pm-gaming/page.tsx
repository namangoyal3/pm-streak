import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Gaming (2026) — Dream11, MPL, Games24x7 PM Guide",
  description:
    "How PMs build gaming products in India. Retention loops, monetisation, real-money gaming regulation, and the unique PM challenges of games.",
  keywords: [
    "PM gaming", "Dream11 PM",
    "MPL PM", "gaming india 2026",
  ],
  alternates: { canonical: "/pm-gaming" },
  openGraph: {
    title: "PM Gaming 2026 — PM Streak",
    description: "How PMs build gaming products in India — retention, monetisation, regulation.",
    url: `${SITE_URL}/pm-gaming`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Gaming+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Gaming 2026 — PM Streak",
    description: "How PMs build gaming products in India — retention, monetisation, regulation.",
    images: [`${SITE_URL}/api/og?title=PM+Gaming+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Daily engagement is the product — no session, no revenue",
  "Whales pay the bills — top 1% of players generate 40–60% of revenue",
  "Live ops beats launch — weekly events and meta shifts retain users",
  "Regulation shifts the playing field — fantasy sports, rummy, poker rules evolve",
  "Social beats single-player — friends in-game lift D30 retention dramatically",
];

const METRICS = [
  "DAU and session count per DAU",
  "D1/D7/D30 retention curves",
  "ARPDAU — average revenue per daily active user",
  "Paying-user conversion rate and % of whales",
  "Match completion rate — drop-off mid-game is churn risk",
];

const QUESTIONS = [
  "Design a feature to convert free-to-play users to paying users without feeling pay-to-win",
  "DAU is flat but revenue is up — diagnose",
  "Design a seasonal event that drives 7-day re-engagement",
  "How would you reduce match-abandonment rate by 20%?",
];

const FAQS = [
  {
    q: "Is gaming PM niche or mainstream in India?",
    a: "Mainstream and growing. Dream11, MPL, Games24x7, WinZO, and NODWIN collectively employ hundreds of PMs. Skills transfer well to any engagement-driven consumer product — but the domain knowledge (live ops, economy design, meta balancing) is specialised and earned over years.",
  },
];

export default function PmGamingPage() {
  const dates = pageDates("/pm-gaming");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Gaming", url: `${SITE_URL}/pm-gaming` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Gaming (India Edition)",
        description:
          "How PMs build gaming products in India. Retention loops, monetisation, real-money gaming regulation, and the unique PM challenges of games.",
        image: `${SITE_URL}/api/og?title=PM+Gaming+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-gaming`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎮</span> Games are the purest form of engagement-as-product
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Gaming<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Gaming product management in India centers on daily engagement as the core loop, live-ops
            events that retain players between launches, and monetisation concentrated among whale
            players — dynamics shared by Dream11, MPL, and Games24x7. PMs track DAU, D1/D7/D30
            retention, ARPDAU, and match-abandonment rate while navigating shifting regulation across
            fantasy sports, rummy, and poker.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics, 5 metrics, and 4 interview-style questions for gaming PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Gaming PM Skills — Free →
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

        <RelatedPages slug="pm-gaming" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Gaming PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
