import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "10 PM Career Mistakes (2026) — How to Avoid the Traps That Stall PMs",
  description:
    "The 10 most common PM career mistakes. What kills PM careers, what compounds slowly into stagnation, and the deliberate choices that separate fast-growing PMs from stuck ones.",
  keywords: [
    "PM career mistakes", "product manager career traps",
    "how to avoid PM career mistakes", "stuck as PM",
    "PM promotion mistakes", "PM career stagnation 2026",
  ],
  alternates: { canonical: "/pm-career-mistakes" },
  openGraph: {
    title: "10 PM Career Mistakes 2026 — PM Streak",
    description: "The 10 career mistakes that stall PMs and how to avoid them.",
    url: `${SITE_URL}/pm-career-mistakes`,
    images: [{ url: `${SITE_URL}/api/og?title=10+PM+Career+Mistakes+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "10 PM Career Mistakes 2026 — PM Streak",
    description: "The 10 career mistakes that stall PMs and how to avoid them.",
    images: [`${SITE_URL}/api/og?title=10+PM+Career+Mistakes+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MISTAKES = [
  {
    mistake: "Staying too long on a single product area",
    why: "3+ years on the same product without a level change means you&apos;ve hit a plateau — either the role doesn&apos;t stretch you anymore or the company doesn&apos;t see your next level.",
    fix: "After 2 years, actively audit: am I still learning? Am I being considered for stretch? If neither, change product area internally or change company.",
  },
  {
    mistake: "Confusing activity with impact",
    why: "Shipping many features ≠ moving many metrics. PMs who optimise for &apos;number of things shipped&apos; plateau faster than PMs who optimise for business outcomes.",
    fix: "At every review, present what you MOVED (metrics, revenue, user behaviour), not what you shipped. If you can&apos;t name it, your work isn&apos;t impactful yet.",
  },
  {
    mistake: "Ignoring your manager relationship",
    why: "Your manager writes your review, champions your promotion, and gates your stretch opportunities. Treating this relationship reactively is a career mistake.",
    fix: "Invest 30 min/month deliberately building alignment — what&apos;s important to them, what you can help with, where you need air cover. Never let 1:1s be status updates.",
  },
  {
    mistake: "Avoiding the hard org-political conversations",
    why: "PMs who only do &apos;nice PM work&apos; (user research, PRD writing) while ducking uncomfortable alignment conversations stay mid-level forever.",
    fix: "The senior PM job IS the uncomfortable conversation. Practise giving tough feedback, pushing back on exec asks, and owning unpopular decisions. This is the work.",
  },
  {
    mistake: "Under-investing in visibility",
    why: "Great work that leadership doesn&apos;t know about rarely gets rewarded. Many excellent PMs get passed over because they didn&apos;t make their work visible.",
    fix: "Weekly written updates. Quarterly strategy docs shared broadly. Volunteer for visible cross-team projects. Visibility isn&apos;t politics — it&apos;s communication.",
  },
  {
    mistake: "Not developing a point of view",
    why: "Junior PMs execute. Senior PMs have opinions — grounded in data and experience — about where the product should go. PMs without strong POVs stay junior-coded.",
    fix: "Write. Speak. Argue positions in design reviews. Develop strong takes on your domain. Be comfortable being specifically wrong, which is how you learn to be specifically right.",
  },
  {
    mistake: "Staying in your comfort zone on skills",
    why: "If your technical fluency, writing, or analytical skills are the same as they were 2 years ago, you&apos;re drifting. PM skills decay without deliberate upkeep.",
    fix: "Every 6 months, pick one skill to deliberately improve. Learn SQL if you can&apos;t query. Take a writing course. Build something technical. Deliberate growth beats passive experience.",
  },
  {
    mistake: "Taking the wrong next job",
    why: "A lateral move to a more-prestigious-but-wrong-fit company is a common trap. So is a step-up to a role where the manager doesn&apos;t have time to develop you.",
    fix: "Interview the manager as much as they interview you. Ask their last 3 direct reports where they&apos;re now — good managers develop people who advance. Run from managers whose direct reports stagnate.",
  },
  {
    mistake: "Ignoring compensation until review time",
    why: "PMs often accept below-market comp for years before noticing. Market rates move faster than annual raises, especially in India&apos;s hot PM market.",
    fix: "Benchmark your total comp against market every 12 months (Levels.fyi, AmbitionBox, peer conversations). If you&apos;re 20%+ below market, have the conversation — internally first, externally if needed.",
  },
  {
    mistake: "Optimising for title over learning",
    why: "A Senior PM title at a small company that doesn&apos;t stretch you is worth less than a PM title at a great company where you&apos;ll grow dramatically. Titles are sticky; learning compounds.",
    fix: "At every career decision, ask: who will I learn from, what will I ship, and will my next role after this be easier to get? Learning velocity beats title velocity.",
  },
];

const FAQS = [
  {
    q: "What&apos;s the biggest career mistake PMs make in their first 5 years?",
    a: "Mistaking activity for impact. Junior PMs are often rewarded for shipping, so they over-index on throughput. But after 2–3 years, growth comes from moving metrics, owning outcomes, and influencing beyond their team. PMs who keep optimising for &apos;features shipped&apos; hit a plateau they don&apos;t understand, while peers who shifted to metric-driven impact start pulling away.",
  },
  {
    q: "How often should a PM change jobs or teams?",
    a: "Every 2–3 years is a healthy signal of growth — whether it&apos;s an internal team change, promotion, or external move. Less than 18 months too often suggests instability or poor judgment. More than 4 years in the same role signals stagnation unless you&apos;re actively being promoted. The middle range is where most strong PM careers happen.",
  },
  {
    q: "Is changing companies the only way to grow as a PM?",
    a: "No — internal growth at a strong company is often faster than external moves. But it requires (1) a manager who actively advocates for your development, (2) a company that has open senior/stretch roles to grow into, (3) visibility into promotion criteria. If any of these is missing at your current company, external moves become necessary for continued growth.",
  },
];

export default function PmCareerMistakesPage() {
  const dates = pageDates("/pm-career-mistakes");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Career Mistakes", url: `${SITE_URL}/pm-career-mistakes` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "10 PM Career Mistakes (2026)",
        description: "The 10 most common PM career mistakes. What kills PM careers, what compounds slowly into stagnation, and the deliberate choices that separate fast-growing PMs from stuck ones.",
        image: `${SITE_URL}/api/og?title=10+PM+Career+Mistakes+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-career-mistakes`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚠️</span> Most PM careers don&apos;t fail loudly. They stall quietly.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            10 PM Career Mistakes<br />(and How to Avoid Them)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            PM careers usually don&apos;t fail with a dramatic event — they stall quietly through ten
            compounding mistakes, from staying too long in one product area and confusing shipped
            features with real impact, to under-investing in visibility and ignoring compensation
            until review time. The single biggest one in the first five years: optimising for
            activity over metrics moved.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 10 mistakes that compound slowly into career stagnation,
            why each one happens, and the deliberate moves to avoid them.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Your PM Career Intentionally — Free →
          </Link>
        </section>

        {/* Mistakes */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-red-500/20 text-red-400 font-bold text-sm flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <h2 className="text-lg font-bold text-white">{m.mistake}</h2>
                </div>
                <p className="text-sm text-white/60 mb-3 ml-10">{m.why}</p>
                <div className="ml-10 bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-green-400 mb-1">✅ How to avoid it</p>
                  <p className="text-sm text-white/70">{m.fix}</p>
                </div>
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

        <RelatedPages slug="pm-career-mistakes" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Invest in the PM Skills That Compound</h2>
          <p className="text-white/60 mb-6">Daily practice on product sense, metrics, strategy — 2 minutes a day over 2 years changes careers.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
