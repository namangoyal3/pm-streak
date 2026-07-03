import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Growth Hacking (2026) — What Works and What&apos;s Just Buzzwords",
  description:
    "Real growth hacking for PMs — experiments that compound growth without burning trust. Tactics that work, ones that don&apos;t, and the math behind each.",
  keywords: [
    "PM growth hacking", "growth hacks",
    "viral PM tactics", "growth experiments",
    "product growth 2026",
  ],
  alternates: { canonical: "/pm-growth-hacking" },
  openGraph: {
    title: "PM Growth Hacking 2026 — PM Streak",
    description: "What growth hacking really means — tactics that work, ones that don&apos;t, and the math.",
    url: `${SITE_URL}/pm-growth-hacking`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Growth+Hacking+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Growth Hacking 2026 — PM Streak",
    description: "What growth hacking really means — tactics that work, ones that don&apos;t, and the math.",
    images: [`${SITE_URL}/api/og?title=PM+Growth+Hacking+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_WORKS = [
  "Onboarding reduction — shorter paths to value compound hard",
  "Double-sided referrals — give both sides value; K-factor increases",
  "Product-led viral loops — sharing is natural consequence of using the product",
  "Friction removal at checkout / paywall / signup — every step killed = meaningful conversion lift",
  "Cohort personalisation — users see what works for their segment, not generic",
  "Email / notification re-engagement — for lapsed users who have real affinity",
];

const WHAT_DOESNT = [
  "Aggressive popups — boost short-term metric, hurt long-term trust",
  "Fake urgency — &apos;Only 2 left!&apos; when there isn&apos;t — destroys trust on discovery",
  "Growth hacks that ignore product quality — amplifying bad product accelerates churn",
  "Paid acquisition without retention fix — pouring into leaky bucket",
  "Bait-and-switch — promising X, delivering Y — creates worst possible ratings",
  "Dark patterns around cancellation — short wins, long reputation damage",
];

const MATH = [
  "Viral coefficient K = invites sent × conversion rate — &gt;0.5 meaningful, &gt;1 viral",
  "LTV:CAC ratio — &gt;3:1 healthy, &lt;1:1 burning money",
  "Payback period — months to recover CAC; &lt;12 months ideal",
  "Net Revenue Retention — &gt;100% grows from existing base alone",
  "Conversion funnel — compounding: 80% × 60% × 50% = 24% end-to-end",
];

const ETHICAL_LINE = [
  "Would you be happy if a journalist wrote about this tactic?",
  "Would users still use the product if they understood the mechanics?",
  "Does this create genuine value for users or just for metrics?",
  "Is the short-term win worth the long-term brand cost?",
  "Could this harm vulnerable users (less savvy, less attention)?",
];

const FAQS = [
  {
    q: "Is &apos;growth hacking&apos; still a real discipline in 2026?",
    a: "Yes, but the term is tired. What works: systematic experimentation on conversion, retention, referral loops, and onboarding. What doesn&apos;t: clever one-off tricks. Modern growth is less about hacks and more about disciplined product experimentation with compounding mechanisms. The name is buzzwords; the underlying work is real.",
  },
  {
    q: "What&apos;s the biggest growth hacking mistake?",
    a: "Optimising for short-term metrics that don&apos;t compound. Aggressive popups lift signups, then hurt retention. Fake urgency drives conversion, then kills NPS. The PMs who build sustainable growth measure both — short-term lifts AND long-term retention impact. Anything that moves one but hurts the other is a loss, not a win.",
  },
];

export default function PmGrowthHackingPage() {
  const dates = pageDates("/pm-growth-hacking");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Growth Hacking", url: `${SITE_URL}/pm-growth-hacking` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Growth Hacking (2026 Edition)",
        description:
          "Real growth hacking for PMs — experiments that compound growth without burning trust. Tactics that work, ones that don&apos;t, and the math behind each.",
        image: `${SITE_URL}/api/og?title=PM+Growth+Hacking+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-growth-hacking`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> Growth hacking = disciplined experimentation, not clever tricks
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Growth Hacking<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Growth hacking for PMs isn&apos;t clever one-off tricks — it&apos;s disciplined experimentation across onboarding reduction, double-sided referrals, product-led virality, and friction removal at checkout, measured against numbers like viral coefficient, LTV:CAC, and net revenue retention. Tactics like fake urgency and dark patterns lift short-term metrics but destroy trust once discovered, so PMs weigh every hack against that ethical line.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 tactics that work, 6 that don&apos;t, 5 growth math formulas, and the ethical line every PM should respect.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Growth PM Skills Daily — Free →
          </Link>
        </section>

        {/* Works */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Tactics That Work</h2>
          <div className="space-y-2">
            {WHAT_WORKS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Doesn't */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Tactics That Don&apos;t Work</h2>
            <div className="space-y-2">
              {WHAT_DOESNT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Math */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Growth Math Formulas</h2>
          <div className="space-y-2">
            {MATH.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70 font-mono">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ethical */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Ethical Line Questions</h2>
            <div className="space-y-2">
              {ETHICAL_LINE.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{e}</p>
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

        <RelatedPages slug="pm-growth-hacking" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Growth PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on viral loops, conversion, and sustainable growth experiments.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
