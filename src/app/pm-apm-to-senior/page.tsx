import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM APM to Senior PM (2026) — The 3-Year Leveling Playbook",
  description:
    "How APMs become senior PMs in 3 years. The skill shifts, visibility moves, and scope expansions that matter at each level.",
  keywords: [
    "APM senior PM path", "PM promotion",
    "PM career levels 2026",
  ],
  alternates: { canonical: "/pm-apm-to-senior" },
  openGraph: {
    title: "PM APM to Senior PM 2026 — PM Streak",
    description: "The 3-year leveling playbook.",
    url: `${SITE_URL}/pm-apm-to-senior`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+APM+to+Senior+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM APM to Senior PM 2026 — PM Streak",
    description: "The 3-year leveling playbook.",
    images: [`${SITE_URL}/api/og?title=PM+APM+to+Senior+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVELS = [
  { l: "APM / PM I", w: "Own a feature. Execute defined roadmap. Strong communication." },
  { l: "PM II", w: "Own an area. Shape roadmap. Identify problems independently." },
  { l: "Senior PM", w: "Own a product line. Set direction. Mentor junior PMs." },
];

const SHIFTS = [
  "Shift from execution to discovery over time",
  "Grow from feature-shipping to problem-framing",
  "Build visibility beyond your manager — cross-functional peers matter",
  "Write and present at higher abstraction levels",
  "Handle ambiguity without escalation",
];

const FAQS = [
  {
    q: "What separates a stuck PM II from one who makes senior?",
    a: "Problem-framing and strategic judgment. PM IIs who stay PM II execute well but rarely identify new problems or shape direction. Those who break through bring new opportunities to their org, not just new features. The skill is intellectual, not just operational.",
  },
];

export default function PmApmToSeniorPage() {
  const dates = pageDates("/pm-apm-to-senior");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM APM to Senior", url: `${SITE_URL}/pm-apm-to-senior` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM APM to Senior PM (3-Year Playbook)",
        description:
          "How APMs become senior PMs in 3 years. The skill shifts, visibility moves, and scope expansions that matter at each level.",
        image: `${SITE_URL}/api/og?title=PM+APM+to+Senior+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-apm-to-senior`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Problem-framing separates good PMs from great ones
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM APM to Senior PM<br />(3-Year Playbook)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Becoming a senior PM typically takes three levels — APM/PM I (own a feature, execute a
            defined roadmap), PM II (own an area, shape the roadmap), and Senior PM (own a product
            line, set direction, mentor juniors) — each requiring a shift from execution toward
            discovery and from feature-shipping toward independent problem-framing. The PMs who
            break through bring new opportunities to their org instead of just new features.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            3 levels defined and 5 shifts that unlock promotion.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Senior PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">3 Levels</h2>
          <div className="space-y-3">
            {LEVELS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{l.l}</p>
                <p className="text-xs text-white/60">{l.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Shifts</h2>
            <div className="space-y-2">
              {SHIFTS.map((s, i) => (
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

        <RelatedPages slug="pm-apm-to-senior" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Senior PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
