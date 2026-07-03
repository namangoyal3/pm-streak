import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Cross-Functional Leadership (2026) — Leading Without Authority",
  description:
    "How PMs lead cross-functional teams without authority. Working with engineering, design, sales, marketing, support — and building trust with each.",
  keywords: [
    "PM cross-functional", "leading without authority PM",
    "PM team leadership", "cross-functional PM",
    "PM stakeholder leadership 2026",
  ],
  alternates: { canonical: "/pm-cross-functional" },
  openGraph: {
    title: "PM Cross-Functional Leadership 2026 — PM Streak",
    description: "How PMs lead cross-functional teams without authority — building trust across every function.",
    url: `${SITE_URL}/pm-cross-functional`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Cross-Functional+Leadership+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Cross-Functional Leadership 2026 — PM Streak",
    description: "How PMs lead cross-functional teams without authority — building trust across every function.",
    images: [`${SITE_URL}/api/og?title=PM+Cross-Functional+Leadership+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PARTNERS = [
  { partner: "Engineering", priority: "Highest", earn_trust: "Respect estimates, share context on why, cut scope not time, credit them for wins" },
  { partner: "Design", priority: "Very high", earn_trust: "Collaborate on discovery (not just delivery), respect craft, bring user data" },
  { partner: "Data / Analytics", priority: "High", earn_trust: "Ask good questions, do self-serve basics, never interrupt deep work" },
  { partner: "Sales / CS", priority: "High (B2B)", earn_trust: "Visible intake process, transparent roadmap, structured no" },
  { partner: "Marketing", priority: "High for launches", earn_trust: "Involve early (not just for launch), share positioning context, plan GTM together" },
  { partner: "Support", priority: "Underrated — hugely valuable", earn_trust: "Regular time in their queue, brief them on launches, share roadmap for top issues" },
  { partner: "Legal / Compliance", priority: "Depends on domain", earn_trust: "Engage early, frame as risk-informed decisions, don&apos;t treat as blocker" },
];

const PRINCIPLES = [
  "Influence beats authority — PMs who can&apos;t rely on rank must rely on clarity, trust, evidence",
  "Context beats instruction — &apos;here&apos;s why this matters&apos; beats &apos;just do X&apos;",
  "Transparency beats politics — share context widely, decisions openly",
  "Celebrate together — wins are team wins, not PM wins",
  "Absorb blame generously — when things go wrong, protect the team; when things go right, spotlight them",
];

const BUILDING_TRUST = [
  "Follow through on every commitment, no matter how small",
  "Surface bad news early, specifically, with a plan",
  "Give credit publicly, critique privately",
  "Be reliable with your own deliverables — late docs erode trust fast",
  "Learn the craft basics of your partners — enough to respect but not second-guess",
  "Respect their deep work — don&apos;t interrupt unless needed",
];

const FAQS = [
  {
    q: "What&apos;s the hardest cross-functional relationship for PMs?",
    a: "Usually engineering, because the asymmetry of expertise is largest — you often know less than they do about how to build. The relationship works when PMs earn credibility through clear problem framing + respect for their craft + willingness to cut scope. It fails when PMs second-guess estimates or pressure without cutting.",
  },
  {
    q: "What&apos;s the biggest PM cross-functional mistake?",
    a: "Being transactional. PMs who only reach out when they need something — a design, a query, a review — build weak relationships. The PMs with the strongest cross-functional influence invest in partners before they need anything: understanding their goals, celebrating their wins, asking about their work. Long-term trust beats short-term favours.",
  },
];

export default function PmCrossFunctionalPage() {
  const dates = pageDates("/pm-cross-functional");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Cross-Functional Leadership", url: `${SITE_URL}/pm-cross-functional` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Cross-Functional Leadership (2026 Edition)",
        description: "How PMs lead cross-functional teams without authority. Working with engineering, design, sales, marketing, support — and building trust with each.",
        image: `${SITE_URL}/api/og?title=PM+Cross-Functional+Leadership+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cross-functional`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🤝</span> PMs have no authority. Great ones have trust instead.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Cross-Functional Leadership<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Because PMs rarely hold formal authority over engineering, design, sales, marketing, support, or legal, influence has to substitute for rank — earned by respecting each partner&apos;s craft, sharing context instead of instructions, following through on every commitment, and giving credit publicly while absorbing blame when things go wrong.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-4">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 cross-functional partners with how to earn trust with each, 5 leadership principles, and 6 trust-building behaviours.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Leadership Daily — Free →
          </Link>
        </section>

        {/* Partners */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Cross-Functional Partners</h2>
          <div className="space-y-4">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{i + 1}. {p.partner}</p>
                  <span className="text-xs bg-[#58cc02]/20 text-[#89e219] px-2 py-0.5 rounded-full">{p.priority}</span>
                </div>
                <p className="text-xs text-white/60">How to earn trust: {p.earn_trust}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Leadership Principles</h2>
            <div className="space-y-2">
              {PRINCIPLES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Building trust */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Trust-Building Behaviours</h2>
          <div className="space-y-2">
            {BUILDING_TRUST.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{b}</p>
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

        <RelatedPages slug="pm-cross-functional" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Leadership Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on stakeholder management, trust-building, and cross-functional coordination.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
