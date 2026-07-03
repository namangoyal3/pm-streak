import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM at Traditional Enterprises (2026) — Digital SBUs, Legacy, Transformation",
  description:
    "How PMs work inside legacy enterprises. Digital SBUs at Tata, Reliance, HDFC, and why PM-ing in enterprise is not the same as startup PM.",
  keywords: [
    "PM enterprise", "digital SBU",
    "legacy PM", "transformation PM 2026",
  ],
  alternates: { canonical: "/pm-digital-sbu" },
  openGraph: {
    title: "PM at Traditional Enterprises 2026 — PM Streak",
    description: "How PMs work inside legacy enterprises.",
    url: `${SITE_URL}/pm-digital-sbu`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+at+Traditional+Enterprises+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM at Traditional Enterprises 2026 — PM Streak",
    description: "How PMs work inside legacy enterprises.",
    images: [`${SITE_URL}/api/og?title=PM+at+Traditional+Enterprises+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const REALITIES = [
  "Procurement and vendor cycles stretch timelines — plan for them",
  "Legacy systems dictate architecture — greenfield is rare",
  "Internal stakeholders outnumber external users — politics is real work",
  "Budget cycles are annual, not quarterly — plan accordingly",
  "Impact can be massive — enterprise PM often ships to millions",
];

const SURVIVAL = [
  "Build relationships before you need them",
  "Pick your battles — reforming processes is slow and expensive",
  "Document everything — decisions must survive leadership turnover",
  "Ship small wins quickly — trust compounds",
  "Know when to leave — not every enterprise embraces digital PM",
];

const FAQS = [
  {
    q: "Can startup PMs succeed in large traditional enterprises?",
    a: "Some do. Those who learn to navigate procurement, legal, and internal politics without losing product instinct thrive. Those who try to apply startup speed verbatim bounce out within a year. The skill is adapting pace to environment while keeping product judgment intact.",
  },
];

export default function PmDigitalSbuPage() {
  const dates = pageDates("/pm-digital-sbu");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Digital SBU", url: `${SITE_URL}/pm-digital-sbu` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM at Traditional Enterprises (2026 Edition)",
        description:
          "How PMs work inside legacy enterprises. Digital SBUs at Tata, Reliance, HDFC, and why PM-ing in enterprise is not the same as startup PM.",
        image: `${SITE_URL}/api/og?title=PM+at+Traditional+Enterprises+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-digital-sbu`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏢</span> Enterprise PM is a different pace, same craft
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM at Traditional Enterprises<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM work inside traditional enterprises runs on procurement cycles, legacy architecture, and annual budgets rather than startup speed, with internal stakeholders often outnumbering external users — though the impact can reach millions. Survival depends on building relationships early, picking battles carefully, documenting decisions so they survive leadership turnover, and shipping small wins first; PMs who adapt their pace without losing product instinct are the ones who last.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 realities and 5 survival tactics for enterprise PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Enterprise PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Realities</h2>
          <div className="space-y-2">
            {REALITIES.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Survival Tactics</h2>
            <div className="space-y-2">
              {SURVIVAL.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
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

        <RelatedPages slug="pm-digital-sbu" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Enterprise PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
