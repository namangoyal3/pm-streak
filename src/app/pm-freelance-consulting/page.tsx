import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Freelance &amp; Consulting (2026) — Going Independent as a PM",
  description:
    "How PMs go independent. Pricing, finding clients, legal setup, and what fractional PM work actually looks like.",
  keywords: [
    "PM freelance", "fractional PM",
    "PM consulting 2026",
  ],
  alternates: { canonical: "/pm-freelance-consulting" },
  openGraph: {
    title: "PM Freelance &amp; Consulting 2026 — PM Streak",
    description: "Going independent as a PM.",
    url: `${SITE_URL}/pm-freelance-consulting`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Freelance+&amp;+Consulting+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Freelance &amp; Consulting 2026 — PM Streak",
    description: "Going independent as a PM.",
    images: [`${SITE_URL}/api/og?title=PM+Freelance+&amp;+Consulting+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WORK_TYPES = [
  "Fractional PM — part-time leadership for early startups",
  "Advisory — hours-based guidance on strategy, metrics, hiring",
  "Specific-project consulting — discovery, launch, research sprints",
  "Interim PM leadership — 3–6 month coverage while hiring",
];

const ECONOMICS = [
  "Hourly rates range USD 150–400 for experienced PMs",
  "Fractional engagements typically 20–40 hours per month per client",
  "2–3 clients is manageable; 4+ becomes a staffing firm",
  "Factor 20% of time in business development and admin",
  "First year is slow; referrals compound year 2+",
];

const FAQS = [
  {
    q: "Is freelance PM sustainable long-term?",
    a: "Yes, for senior PMs with a strong network. It&apos;s unstable year 1–2 but becomes steady once referrals kick in. Common exits: back to full-time at a client, joining one as a co-founder, or growing into an advisory practice. Not for junior or mid-level PMs — you need pattern recognition clients pay for.",
  },
];

export default function PmFreelanceConsultingPage() {
  const dates = pageDates("/pm-freelance-consulting");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Freelance", url: `${SITE_URL}/pm-freelance-consulting` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Freelance & Consulting (2026 Edition)",
        description: "How PMs go independent. Pricing, finding clients, legal setup, and what fractional PM work actually looks like.",
        image: `${SITE_URL}/api/og?title=PM+Freelance+&amp;+Consulting+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-freelance-consulting`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧑‍💻</span> Freelance PM works when pattern recognition is for sale
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Freelance &amp; Consulting<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Freelance and consulting PM work spans four shapes — fractional leadership, hourly advisory, project-based consulting, and interim coverage — and pays USD 150–400 per hour once a PM has the network to land 2–3 clients. It sustains long-term for senior PMs, though the first year is typically slow before referrals compound.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:text-[#58cc02]">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 work types and 5 economic realities for freelance PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Freelance PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Work Types</h2>
          <div className="space-y-2">
            {WORK_TYPES.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Economic Realities</h2>
            <div className="space-y-2">
              {ECONOMICS.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="pm-freelance-consulting" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Freelance PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
