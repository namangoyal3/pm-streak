import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM User Personas Guide (2026) — How to Build Personas That Actually Change Product Decisions",
  description:
    "How PMs create useful user personas. Beyond demographics — behaviours, jobs, pain points, and the structure that keeps personas useful instead of wall art.",
  keywords: [
    "PM user personas", "product manager personas",
    "user persona template", "how to create personas PM",
    "JTBD personas 2026",
  ],
  alternates: { canonical: "/pm-user-personas" },
  openGraph: {
    title: "PM User Personas Guide 2026 — PM Streak",
    description: "How PMs create personas that drive product decisions — behaviours, jobs, and structure.",
    url: `${SITE_URL}/pm-user-personas`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+User+Personas+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM User Personas Guide 2026 — PM Streak",
    description: "How PMs create personas that drive product decisions — behaviours, jobs, and structure.",
    images: [`${SITE_URL}/api/og?title=PM+User+Personas+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  { part: "Name and photo", what: "Give them a specific name and photo (even AI-generated). Makes the persona real, not an abstraction." },
  { part: "One-line summary", what: "&apos;Priya, 32, delivery partner in Pune trying to smooth out her monthly cash flow.&apos;" },
  { part: "Core job-to-be-done", what: "What they&apos;re hiring the product to do. &apos;Get paid quickly without paperwork.&apos;" },
  { part: "Top 3 pain points", what: "Specific, observed pains — not imagined. From user research." },
  { part: "Current workarounds", what: "What they do today without your product. Often the real competitor." },
  { part: "What they value", what: "Functional (speed, cost) AND emotional (trust, pride, dignity)." },
  { part: "What they&apos;d reject", what: "Explicit. What solutions/features would push them away?" },
  { part: "How they discover products like yours", what: "Helps inform acquisition strategy." },
];

const GOOD_EXAMPLE = {
  name: "Priya, 32, Delivery Partner, Pune",
  summary: "Delivers 20 Swiggy orders/day, earns ₹22-30K/month, supports family of 4.",
  job: "&apos;I want to smooth out my cash flow so I don&apos;t stress about mid-month bills.&apos;",
  pains: ["Income is unpredictable day-to-day", "Bills are predictable — mismatch creates stress", "No savings buffer"],
  workarounds: ["Borrows from family at month-end", "Uses credit from local kirana store", "Delays school fee payment"],
  values: "Dignity (doesn&apos;t want to ask family), speed (can&apos;t wait days), simplicity (distrusts complex forms)",
  rejects: "Anything that feels like a loan with paperwork. Anything that charges her fees she can&apos;t clearly see.",
};

const MISTAKES = [
  "Personas based on demographics only — &apos;millennial women&apos; isn&apos;t a product strategy",
  "Too many personas — most teams can&apos;t design for more than 3 in active use",
  "Personas that never change — refresh annually as user base shifts",
  "Personas that don&apos;t drive decisions — if two personas get identical product answers, they&apos;re one persona",
  "Inventing personas without validation — must come from real user research",
  "Treating personas as marketing artefacts, not product decision tools",
];

const FAQS = [
  {
    q: "How many personas should a PM team have?",
    a: "3 primary personas for most products. Add 1–2 if you truly serve distinct segments (e.g. buyer vs seller in a marketplace). More than 5 and no one remembers the personas — they stop being useful. Start with 3, add deliberately when decisions diverge.",
  },
  {
    q: "What&apos;s the difference between a persona and a segment?",
    a: "A segment is a measurable group in your user base (e.g. &apos;users who opened 3+ sessions last week&apos;). A persona is a narrative representation that makes a segment feel human (a name, story, context). Segments are for analysis; personas are for alignment. Great PMs use both: segments for the dashboard, personas for the PRD.",
  },
];

export default function PmUserPersonasPage() {
  const dates = pageDates("/pm-user-personas");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM User Personas", url: `${SITE_URL}/pm-user-personas` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM User Personas Guide (2026 Edition)",
        description: "How PMs create useful user personas. Beyond demographics — behaviours, jobs, pain points, and the structure that keeps personas useful instead of wall art.",
        image: `${SITE_URL}/api/og?title=PM+User+Personas+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-user-personas`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👥</span> Great personas change what you build. Bad ones decorate your docs.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM User Personas Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-2">
            Useful personas go beyond a name and photo: an 8-part structure adds a core
            job-to-be-done, top pain points, current workarounds, and what a user would
            explicitly reject, all pulled from real research rather than assumptions. Most
            product teams should cap it at three primary personas, since personas that
            produce identical product decisions have effectively merged into one and stop
            earning their keep.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/70 hover:text-[#89e219] underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 8-part persona structure, a fully worked example, and 6 mistakes
            that turn personas into wall art nobody uses.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build User Empathy Daily — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8-Part Persona Structure</h2>
          <div className="space-y-3">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white text-sm mb-1">{i + 1}. {s.part}</p>
                <p className="text-xs text-white/60">{s.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Fully Worked Example</h2>
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <p className="font-bold text-white mb-2">{GOOD_EXAMPLE.name}</p>
              <p className="text-sm text-white/60 mb-4">{GOOD_EXAMPLE.summary}</p>
              <div className="space-y-3">
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219] mb-1">Job to be done</p>
                  <p className="text-sm text-white/70 italic">{GOOD_EXAMPLE.job}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Pain points</p>
                  <ul className="space-y-1">
                    {GOOD_EXAMPLE.pains.map((p, i) => (
                      <li key={i} className="text-xs text-white/60">• {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Current workarounds</p>
                  <ul className="space-y-1">
                    {GOOD_EXAMPLE.workarounds.map((w, i) => (
                      <li key={i} className="text-xs text-white/60">• {w}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0e1113] rounded-lg p-3">
                  <p className="text-xs text-white/40 mb-1">Values</p>
                  <p className="text-xs text-white/70">{GOOD_EXAMPLE.values}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <p className="text-xs text-red-400 mb-1">Would reject</p>
                  <p className="text-xs text-white/70">{GOOD_EXAMPLE.rejects}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Persona Mistakes</h2>
          <div className="space-y-2">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-user-personas" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build User Empathy Daily</h2>
          <p className="text-white/60 mb-6">Scenarios that force you to design for specific personas, not generic users.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
