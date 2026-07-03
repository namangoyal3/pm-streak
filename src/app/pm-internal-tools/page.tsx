import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Internal Tools PM (2026) — PM Work Serving Your Own Company",
  description:
    "Internal tools PM — what it is, what&apos;s hard about it, career trade-offs, and why great internal tools PMs are increasingly valuable at scaled companies.",
  keywords: [
    "internal tools PM", "internal product manager",
    "ops tools PM", "back-office PM",
    "employee-facing product PM 2026",
  ],
  alternates: { canonical: "/pm-internal-tools" },
  openGraph: {
    title: "Internal Tools PM 2026 — PM Streak",
    description: "What internal tools PM is, what&apos;s hard about it, and why it&apos;s increasingly valuable.",
    url: `${SITE_URL}/pm-internal-tools`,
    images: [{ url: `${SITE_URL}/api/og?title=Internal+Tools+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internal Tools PM 2026 — PM Streak",
    description: "What internal tools PM is, what&apos;s hard about it, and why it&apos;s increasingly valuable.",
    images: [`${SITE_URL}/api/og?title=Internal+Tools+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TYPES = [
  { type: "Ops tools", what: "Tools for customer support, city ops, delivery dispatch, risk review — improving front-line productivity" },
  { type: "Seller / merchant tools", what: "Admin panels for sellers, merchants, creators — improving their experience on your platform" },
  { type: "Analyst tools", what: "Self-serve BI, experimentation platforms, data discovery — improving data team productivity" },
  { type: "Internal developer tools", what: "CI/CD, deployment, feature flags — improving engineering velocity" },
  { type: "Finance / admin tools", what: "Billing, reconciliation, compliance — reducing manual work and errors" },
];

const WHATS_HARD = [
  "Users don&apos;t choose your product — they&apos;re assigned to use it. Feedback is direct.",
  "Metrics are different: productivity gain, error reduction, time saved — not DAU/retention",
  "User base is small but critical — one frustrated analyst can wreck data quality for the whole company",
  "Stakeholder complexity is high — IT, legal, operations, and end users all have input",
  "Success is often invisible — &apos;things broke less&apos; is harder to celebrate than consumer wins",
];

const WHY_VALUABLE = [
  "At scaled companies, internal tools drive real P&amp;L — 10% productivity gain × 1000 users = massive savings",
  "You work closely with power users who give brutally honest feedback",
  "Technical depth opportunity — internal tools often push PMs into deeper engineering collaboration",
  "Career capital: senior leaders know who builds the tools everyone relies on",
  "Less external pressure (no consumer PR, no growth hacking) — focus on substance",
];

const CAREER_CONSIDERATIONS = [
  "Less glamorous — harder to explain to non-tech friends what you do",
  "Senior PM paths at scaled companies reward internal tools PMs similarly to consumer PMs",
  "Compensation is comparable — sometimes slightly higher for infra/platform internal tools",
  "Can be a stepping stone to platform PM, operations leadership, or specific domains",
  "Trade-off: fewer roles, but internal tools PMs are harder to replace once hired",
];

const FAQS = [
  {
    q: "Is internal tools PM career-limiting?",
    a: "Not at scaled companies. At Flipkart, Swiggy, Razorpay, etc., internal tools PMs are on the same career ladder as consumer PMs. Senior PM / Group PM roles exist and are often well-compensated. At early-stage startups with 50 people, dedicated internal tools PMs are rare. Match the role to the company stage.",
  },
  {
    q: "What&apos;s the biggest misconception about internal tools PM?",
    a: "That it&apos;s &apos;less creative.&apos; Building tools that genuinely solve complex ops workflows requires deep problem understanding, sharp design thinking, and technical rigour. Many internal tools PMs ship more substantive work than consumer PMs who ship flashy features with no real impact. The creativity is different — not less.",
  },
];

export default function PmInternalToolsPage() {
  const dates = pageDates("/pm-internal-tools");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Internal Tools PM", url: `${SITE_URL}/pm-internal-tools` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Internal Tools PM Guide (2026 Edition)",
        description:
          "Internal tools PM — what it is, what&apos;s hard about it, career trade-offs, and why great internal tools PMs are increasingly valuable at scaled companies.",
        image: `${SITE_URL}/api/og?title=Internal+Tools+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-internal-tools`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔧</span> Less glamorous. High impact. Often undervalued.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Internal Tools PM Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Internal tools PM means building for ops, seller/merchant, analyst, developer, or finance
            audiences who don&apos;t choose the product — they&apos;re assigned to it, so feedback is blunt
            and metrics shift to productivity gained or errors reduced rather than DAU. It&apos;s less
            glamorous and success is often invisible, but at scaled companies it sits on the same career
            ladder as consumer PM and drives real P&amp;L impact.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 types of internal tools PM work, what&apos;s hard about it,
            why it&apos;s increasingly valuable, and career trade-offs to consider.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Internal Tools PM Skills Daily — Free →
          </Link>
        </section>

        {/* Types */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Types of Internal Tools PM Work</h2>
          <div className="space-y-3">
            {TYPES.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {t.type}</p>
                <p className="text-xs text-white/60">{t.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's hard */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things That Are Hard About Internal Tools PM</h2>
            <div className="space-y-2">
              {WHATS_HARD.map((w, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why valuable */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Internal Tools PM Is Valuable</h2>
          <div className="space-y-2">
            {WHY_VALUABLE.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Career */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Career Considerations</h2>
            <div className="space-y-2">
              {CAREER_CONSIDERATIONS.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-internal-tools" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills That Transfer Everywhere</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios cover internal, B2B, and consumer — same craft, different contexts.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
