import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Technical Skills (2026) — How Technical Should a PM Be?",
  description:
    "The technical skills every PM should have in 2026. SQL, APIs, systems thinking, and how to talk to engineers without faking it.",
  keywords: [
    "PM technical skills", "technical product manager",
    "SQL for PM", "APIs for PM 2026",
  ],
  alternates: { canonical: "/pm-technical-skills" },
  openGraph: {
    title: "PM Technical Skills 2026 — PM Streak",
    description: "How technical should a PM be? SQL, APIs, systems thinking.",
    url: `${SITE_URL}/pm-technical-skills`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Technical+Skills+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Technical Skills 2026 — PM Streak",
    description: "How technical should a PM be? SQL, APIs, systems thinking.",
    images: [`${SITE_URL}/api/og?title=PM+Technical+Skills+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const BASELINE = [
  "SQL — joins, aggregations, window functions. Enough to self-serve analytics.",
  "APIs — REST basics, reading OpenAPI specs, making a call with curl or Postman",
  "Systems thinking — client/server, caching, queues, databases at a conceptual level",
  "Git basics — reading diffs and PR descriptions; you don&apos;t need to merge",
  "One modern primitive — webhooks, feature flags, or event tracking. Pick one and be fluent.",
];

const DEEP_DIVES = [
  "ML/AI PM — embeddings, evals, prompt engineering, model trade-offs",
  "Infra PM — latency budgets, SLOs, observability, capacity planning",
  "Data PM — pipelines, warehousing, dbt, quality checks",
  "Security PM — authN vs authZ, threat modeling, OWASP top 10",
];

const FAQS = [
  {
    q: "Do PMs need to code?",
    a: "No, but you should be able to read code. Knowing a language well enough to understand a PR diff, read an error stack trace, and build a tiny prototype in Replit or a no-code tool is table-stakes in 2026. Shipping production code is not required.",
  },
];

export default function PmTechnicalSkillsPage() {
  const dates = pageDates("/pm-technical-skills");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Technical Skills", url: `${SITE_URL}/pm-technical-skills` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Technical Skills (2026 Edition)",
        description:
          "The technical skills every PM should have in 2026. SQL, APIs, systems thinking, and how to talk to engineers without faking it.",
        image: `${SITE_URL}/api/og?title=PM+Technical+Skills+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-technical-skills`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧠</span> Technical depth is a force-multiplier, not a prerequisite
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Technical Skills<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM doesn&apos;t need to ship production code, but five baseline skills are treated as table stakes here — SQL joins and aggregations, reading REST APIs and OpenAPI specs, conceptual systems thinking around caching and queues, reading Git diffs, and fluency in one modern primitive like webhooks or feature flags. Four domain deep dives — ML/AI, infra, data, and security — go further for PMs specialising in those areas.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 baseline skills every PM should have and 4 deep dives by domain.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Technical PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Baseline Skills</h2>
          <div className="space-y-2">
            {BASELINE.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Deep Dives by Domain</h2>
            <div className="space-y-2">
              {DEEP_DIVES.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-technical-skills" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Technical PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
