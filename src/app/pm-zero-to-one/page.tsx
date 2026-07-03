import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Zero-to-One (2026) — How PMs Launch New Products From Scratch",
  description:
    "How PMs launch 0→1 products. The skills that matter, the traps to avoid, and the mindset shift from growing existing products to creating new ones.",
  keywords: [
    "PM zero to one", "0 to 1 product",
    "new product launch PM", "greenfield product",
    "startup product manager 2026",
  ],
  alternates: { canonical: "/pm-zero-to-one" },
  openGraph: {
    title: "PM Zero-to-One 2026 — PM Streak",
    description: "How PMs launch 0→1 products — the mindset, skills, and traps that matter.",
    url: `${SITE_URL}/pm-zero-to-one`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Zero-to-One+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Zero-to-One 2026 — PM Streak",
    description: "How PMs launch 0→1 products — the mindset, skills, and traps that matter.",
    images: [`${SITE_URL}/api/og?title=PM+Zero-to-One+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MINDSET_SHIFTS = [
  "From optimising to creating — no existing baseline to improve",
  "From data-driven to hypothesis-driven — not enough data for statistical rigour",
  "From scaling what works to finding what works — very different mental model",
  "From segment-level thinking to individual-user thinking — each conversation matters",
  "From team of 20 to team of 5 — scope per PM is different",
];

const SKILLS_THAT_MATTER = [
  "Deep user research — 20+ user conversations before anything is built",
  "Rapid prototyping — paper, Figma, manual MVPs",
  "Comfort with killing — most 0→1 ideas fail; killing is the job",
  "Narrative construction — you&apos;re selling vision to users, team, investors",
  "Scrappy execution — you&apos;re doing sales, support, marketing alongside PM",
];

const TRAPS = [
  "Building before validating — the biggest 0→1 mistake",
  "Trying to solve everyone&apos;s problem — depth with one segment beats breadth",
  "Perfectionism — 0→1 products are ugly by design; polish comes later",
  "Ignoring distribution — great product without go-to-market is invisible",
  "Expecting instant PMF — it takes 12–24 months typically",
  "Giving up at the first failure — most successful products were iteration 3 or 5",
];

const PHASES = [
  { phase: "Problem validation (weeks 1–4)", what: "Is this a real problem? Talk to 20+ users." },
  { phase: "Solution validation (weeks 4–12)", what: "Do users find our solution valuable? Prototype and test." },
  { phase: "MVP (weeks 12–24)", what: "Build minimum functional version; ship to real users." },
  { phase: "Iteration (months 6–18)", what: "Refine based on real usage; approach PMF." },
  { phase: "PMF achieved (months 12–24+)", what: "Retention stable; organic growth begins; ready to scale." },
];

const FAQS = [
  {
    q: "What&apos;s different about 0→1 PM work compared to scaling existing products?",
    a: "Almost everything. Scaling is iterative improvement on known user needs with data-driven decisions. 0→1 is hypothesis-driven, comfort with ambiguity, lots of manual validation before building. PMs who excel at scaling often struggle at 0→1 (and vice versa). The skills overlap only partially.",
  },
  {
    q: "What&apos;s the biggest 0→1 PM mistake?",
    a: "Building before validating. PMs who&apos;ve been at big tech assume &apos;shipping is the answer&apos; and build MVPs quickly. But at 0→1, validation happens through conversations, not code. 10 user interviews before any feature is built saves months of wasted engineering. The discipline of saying &apos;not yet&apos; to building is the hardest skill.",
  },
];

export default function PmZeroToOnePage() {
  const dates = pageDates("/pm-zero-to-one");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Zero-to-One", url: `${SITE_URL}/pm-zero-to-one` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Zero-to-One (2026 Edition)",
        description: "How PMs launch 0→1 products. The skills that matter, the traps to avoid, and the mindset shift from growing existing products to creating new ones.",
        image: `${SITE_URL}/api/og?title=PM+Zero-to-One+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-zero-to-one`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🚀</span> 0→1 PM work is a completely different craft from scaling
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Zero-to-One<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Zero-to-one product work replaces data-driven optimization with hypothesis-driven bets,
            since there&apos;s no existing baseline and not enough data for statistical rigor —
            success depends on deep user research, rapid prototyping, and a comfort with killing
            most ideas, since most 0→1 ideas fail. The biggest trap is building before validating;
            conversations, not code, are what actually de-risk a new product before engineering
            time is spent.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 mindset shifts, 5 skills that matter, 6 traps to avoid, and 5 phases from validation to PMF.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build 0→1 PM Skills Daily — Free →
          </Link>
        </section>

        {/* Mindset shifts */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Mindset Shifts</h2>
          <div className="space-y-2">
            {MINDSET_SHIFTS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Skills That Matter</h2>
            <div className="space-y-2">
              {SKILLS_THAT_MATTER.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traps */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Traps to Avoid</h2>
          <div className="space-y-2">
            {TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Phases */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Phases of 0→1</h2>
            <div className="space-y-3">
              {PHASES.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {p.phase}</p>
                  <p className="text-xs text-white/60">{p.what}</p>
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

        <RelatedPages slug="pm-zero-to-one" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build 0→1 PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on validation, hypothesis-testing, and early-stage product work.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
