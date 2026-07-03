import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Salary Negotiation India (2026) — Getting Paid Fairly as a PM",
  description:
    "How PMs in India negotiate offers. Base, ESOPs, joining bonus, and the levers most candidates leave on the table.",
  keywords: [
    "PM salary negotiation india", "PM compensation",
    "ESOPs PM 2026",
  ],
  alternates: { canonical: "/pm-salary-negotiation-india" },
  openGraph: {
    title: "PM Salary Negotiation India 2026 — PM Streak",
    description: "Getting paid fairly as a PM in India.",
    url: `${SITE_URL}/pm-salary-negotiation-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Salary+Negotiation+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Salary Negotiation India 2026 — PM Streak",
    description: "Getting paid fairly as a PM in India.",
    images: [`${SITE_URL}/api/og?title=PM+Salary+Negotiation+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVERS = [
  "Base salary — the sticky number; negotiate hardest here",
  "ESOPs / RSUs — material in growth-stage and listed companies",
  "Joining bonus — unlocks if you&apos;re leaving bonus or stock on table",
  "Relocation allowance — often flexible",
  "Review cycle timing — ask for early review if joining between cycles",
];

const TACTICS = [
  "Always get competing offers — even just to benchmark",
  "Share target expectations, not just current package",
  "Time your negotiation for Friday — decisions happen over weekends",
  "Push for written offers — verbal promises evaporate",
  "Have a walk-away number — anchors your negotiation energy",
];

const FAQS = [
  {
    q: "How much negotiation room do Indian tech companies typically have?",
    a: "Typically 10–25% above the initial offer, more for senior roles and in-demand skills (AI, infra, growth). ESOPs are often more flexible than base. The mistake candidates make is accepting too quickly — companies expect negotiation and rarely penalise it. The few that do were never worth joining.",
  },
];

export default function PmSalaryNegotiationIndiaPage() {
  const dates = pageDates("/pm-salary-negotiation-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Salary Negotiation India", url: `${SITE_URL}/pm-salary-negotiation-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Salary Negotiation (India Edition)",
        description: "How PMs in India negotiate offers. Base, ESOPs, joining bonus, and the levers most candidates leave on the table.",
        image: `${SITE_URL}/api/og?title=PM+Salary+Negotiation+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-salary-negotiation-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💰</span> Companies expect negotiation. Candidates leave money on the table.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Salary Negotiation<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Most Indian tech companies leave 10–25% of headroom above their initial PM offer, more for
            senior or in-demand roles, and rarely penalise candidates who ask. Negotiate beyond base
            salary — ESOPs, joining bonus, relocation allowance, and review-cycle timing are all levers —
            while using competing offers, a Friday negotiating window, written confirmations, and a clear
            walk-away number to hold your ground.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 negotiation levers and 5 tactics for Indian PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Negotiation PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Levers</h2>
          <div className="space-y-2">
            {LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Tactics</h2>
            <div className="space-y-2">
              {TACTICS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-salary-negotiation-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Negotiation Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
