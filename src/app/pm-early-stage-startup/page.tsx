import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM at Early-Stage Startup (2026) — What It&apos;s Actually Like",
  description:
    "What PM work is really like at an early-stage startup. Scope, chaos, hats worn, and whether it&apos;s right for you.",
  keywords: [
    "PM early stage startup", "seed stage PM",
    "PM at startup", "first PM hire",
    "startup PM role 2026",
  ],
  alternates: { canonical: "/pm-early-stage-startup" },
  openGraph: {
    title: "PM Early-Stage Startup 2026 — PM Streak",
    description: "What early-stage PM work is actually like — scope, chaos, hats worn, real trade-offs.",
    url: `${SITE_URL}/pm-early-stage-startup`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Early-Stage+Startup+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Early-Stage Startup 2026 — PM Streak",
    description: "What early-stage PM work is actually like — scope, chaos, hats worn, real trade-offs.",
    images: [`${SITE_URL}/api/og?title=PM+Early-Stage+Startup+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHAT_YOU_DO = [
  "Product decisions, alongside the founder — you&apos;re a thought partner, not subordinate",
  "User research — talk to 10+ users per week personally",
  "Writing specs and docs — there&apos;s no one else to do this",
  "Light project management — keep eng and design moving",
  "GTM work — sometimes sales calls, demos, onboarding customers",
  "Analytics and reporting — you&apos;re often the one building dashboards",
  "Hiring — interviewing candidates across functions",
];

const REALITIES = [
  "Ambiguity is constant — no playbook, no predecessor&apos;s docs",
  "Every decision matters — team is small enough that you can feel the impact",
  "Compensation is lower cash, higher equity — equity might be worth 0 or a lot",
  "No mentorship — you figure things out yourself or through external community",
  "Fast feedback loops — decisions show consequences within days",
];

const WHO_SHOULD = [
  "Self-directed learners — you&apos;ll figure things out alone",
  "High tolerance for risk — company might fail",
  "People who want breadth over depth — you&apos;ll do many things",
  "Those who thrive in chaos — no one else will organise for you",
  "Career stage where you can afford risk — usually 25–35",
];

const WHO_SHOULDNT = [
  "People who want structured growth — big tech has clearer paths",
  "Those who need mentorship — early startups rarely have it",
  "Risk-averse in compensation — early startup comp is variable",
  "People who want specialisation — you&apos;ll generalise",
  "Those uncomfortable with ambiguity — early startups run on it",
];

const FAQS = [
  {
    q: "Is early-stage startup PM worth it over big tech?",
    a: "If you&apos;ll learn a lot faster and tolerate the risk — yes. Early-stage PM is an immersion course in product work. You see every decision, every trade-off, every customer conversation. Big tech offers structure and comp; startup offers speed and scope. Trade-off depends on career stage and personality.",
  },
  {
    q: "What&apos;s the biggest early-stage PM mistake?",
    a: "Trying to operate like big tech PM. Early-stage doesn&apos;t need 20-page PRDs, week-long planning cycles, or elaborate prioritisation frameworks. It needs conversation, speed, scrappy shipping. Big-tech transplants who impose process on early-stage teams often slow them down.",
  },
];

export default function PmEarlyStageStartupPage() {
  const dates = pageDates("/pm-early-stage-startup");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Early-Stage Startup", url: `${SITE_URL}/pm-early-stage-startup` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM at Early-Stage Startup (2026 Edition)",
        description:
          "What PM work is really like at an early-stage startup. Scope, chaos, hats worn, and whether it&apos;s right for you.",
        image: `${SITE_URL}/api/og?title=PM+Early-Stage+Startup+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-early-stage-startup`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> Early-stage PM is immersion, not specialisation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM at Early-Stage Startup<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Early-stage startup PM work means doing product decisions alongside the founder, running user research yourself, writing every spec, and picking up GTM and hiring tasks nobody else covers — set against constant ambiguity, no mentorship, and equity-heavy compensation that might land at zero. It suits self-directed, risk-tolerant generalists more than PMs who want structured career paths or specialisation.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 things you&apos;ll actually do, 5 realities, 5 who should, 5 who shouldn&apos;t.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Early-Stage PM Skills Daily — Free →
          </Link>
        </section>

        {/* What you do */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Things You&apos;ll Actually Do</h2>
          <div className="space-y-2">
            {WHAT_YOU_DO.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Realities */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Realities</h2>
            <div className="space-y-2">
              {REALITIES.map((r, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-yellow-400 flex-shrink-0">⚠️</span>
                  <p className="text-sm text-white/70">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who should */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 People Who Should Do This</h2>
          <div className="space-y-2">
            {WHO_SHOULD.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who shouldn't */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 People Who Shouldn&apos;t</h2>
            <div className="space-y-2">
              {WHO_SHOULDNT.map((w, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
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

        <RelatedPages slug="pm-early-stage-startup" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Early-Stage PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on scrappy product work, ambiguity, and founder collaboration.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
