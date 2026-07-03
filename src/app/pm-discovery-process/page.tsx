import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Discovery Process (2026) — Continuous Discovery for Product Managers",
  description:
    "How PMs run continuous discovery. Interviews, opportunity trees, assumption testing — Teresa Torres&apos; framework applied.",
  keywords: [
    "PM discovery", "continuous discovery",
    "opportunity solution tree", "discovery 2026",
  ],
  alternates: { canonical: "/pm-discovery-process" },
  openGraph: {
    title: "PM Discovery Process 2026 — PM Streak",
    description: "Continuous discovery for product managers.",
    url: `${SITE_URL}/pm-discovery-process`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Discovery+Process+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Discovery Process 2026 — PM Streak",
    description: "Continuous discovery for product managers.",
    images: [`${SITE_URL}/api/og?title=PM+Discovery+Process+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const RITUALS = [
  "Weekly user interview — minimum cadence for discovery muscle",
  "Opportunity solution tree — visualise outcome → opportunities → solutions",
  "Assumption tests before build — cheaper to falsify assumptions than to undo bad builds",
  "Story mapping — connect solutions to user journey, find gaps",
  "Discovery retro — every 6 weeks: what did we learn? What changed?",
];

const OUTCOMES = [
  "Clearer opportunity backlog — not feature backlog",
  "Lower rate of shipping wrong things",
  "Faster kill decisions — bad bets die in discovery, not in production",
  "Better roadmap defensibility — decisions backed by evidence",
];

const FAQS = [
  {
    q: "How do PMs find time for discovery when shipping pressure is constant?",
    a: "Protect a recurring slot. 2 hours per week is the minimum — 1 hour interview + 1 hour synthesis. PMs who don&apos;t make this time ship more features and learn less. Over a year, the discovery-light PM looks busier; the discovery-disciplined PM ships things that actually work.",
  },
];

export default function PmDiscoveryProcessPage() {
  const dates = pageDates("/pm-discovery-process");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Discovery Process", url: `${SITE_URL}/pm-discovery-process` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Discovery Process (2026 Edition)",
        description: "How PMs run continuous discovery. Interviews, opportunity trees, assumption testing — Teresa Torres&apos; framework applied.",
        image: `${SITE_URL}/api/og?title=PM+Discovery+Process+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-discovery-process`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> Discovery is not a phase — it&apos;s a weekly habit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Discovery Process<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Continuous discovery runs on a weekly cadence: a user interview, an opportunity
            solution tree connecting outcomes to opportunities to solutions, and assumption tests
            before anything gets built, since falsifying an assumption is cheaper than undoing a
            bad build. Protecting two hours a week — one for interviewing, one for synthesis — is
            what separates PMs who ship a clearer, evidence-backed roadmap from those who just
            look busier.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 discovery rituals and 4 outcomes of doing it well.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Discovery PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Discovery Rituals</h2>
          <div className="space-y-2">
            {RITUALS.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Outcomes</h2>
            <div className="space-y-2">
              {OUTCOMES.map((o, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{o}</p>
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

        <RelatedPages slug="pm-discovery-process" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Discovery Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
