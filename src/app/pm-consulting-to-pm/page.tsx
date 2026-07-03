import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Consultant to Product Manager (2026) — How Ex-Consultants Land PM Roles",
  description:
    "How management consultants transition to PM. What your MBB/strategy experience buys you, what it doesn't, and how to reposition to win PM interviews.",
  keywords: [
    "consultant to product manager", "MBB to PM",
    "McKinsey to PM", "BCG to PM", "Bain to PM",
    "strategy consultant to product manager",
    "consulting to PM transition india 2026",
  ],
  alternates: { canonical: "/pm-consulting-to-pm" },
  openGraph: {
    title: "Consultant to PM 2026 — PM Streak",
    description: "How ex-consultants transition to PM — strengths, gaps, and repositioning.",
    url: `${SITE_URL}/pm-consulting-to-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=Consultant+to+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consultant to PM 2026 — PM Streak",
    description: "How ex-consultants transition to PM — strengths, gaps, and repositioning.",
    images: [`${SITE_URL}/api/og?title=Consultant+to+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRENGTHS = [
  { strength: "Structured problem-solving", pmUse: "PMs constantly decompose vague problems. Your MECE muscles give you a head start on case interviews and ambiguous product questions." },
  { strength: "Executive communication", pmUse: "PMs present to leadership regularly. Ex-consultants arrive fluent in executive-ready narratives and slide-worthy thinking." },
  { strength: "Comfort with ambiguity", pmUse: "Every consulting engagement starts vague. PM roles reward the same — figuring out what matters when the problem isn't even well-defined." },
  { strength: "Analytical rigour", pmUse: "Expect case-heavy companies (Flipkart, Razorpay, Microsoft) to reward your comfort with data and frameworks. Play to this strength explicitly." },
  { strength: "Stakeholder management", pmUse: "You've navigated CXOs, client steering committees, and competing agendas. PMs do a lighter version of this every week." },
];

const GAPS = [
  {
    gap: "Advisory vs operator mindset",
    why: "Consultants advise; operators ship. PM interviewers often reject consultants who sound like they'd make recommendations rather than decisions.",
    fix: "Reframe stories actively: 'I advised the client to...' → 'I drove the decision to...' (be accurate, but don't hide your impact behind passive framing). Build shipped evidence — side project, hackathon, product work.",
  },
  {
    gap: "Slow feedback loops",
    why: "Consulting engagements end with a deliverable. PMs stay with the product and feel the daily impact of decisions — both good and bad. This changes how you think about quality and trade-offs.",
    fix: "Join an operator role for 3–6 months before applying to competitive PM roles. An in-house strategy or product-adjacent role beats straight consulting → PM at top tech companies.",
  },
  {
    gap: "Technical fluency",
    why: "You may not have shipped code, designed a database, or evaluated API trade-offs. This hurts in PM interviews where technical credibility is tested.",
    fix: "Build a side project (no-code is fine). Learn SQL. Understand what an API is, how databases work at a high level, what a load balancer does. 4–6 weeks of deliberate learning closes this gap for most candidates.",
  },
  {
    gap: "Over-relying on frameworks",
    why: "Consultants love frameworks. PMs use them invisibly — structure should be felt, not announced. Interviewers penalise candidates who name-drop 'I'll use CIRCLES' in product design rounds.",
    fix: "Practise applying frameworks without naming them. 'Let me think about who the user is and what they need' > 'I'll apply the CIRCLES framework.'",
  },
];

const PATHS = [
  { path: "Direct jump to PM", difficulty: "Hard at top companies", who: "Usually works only for candidates with technical side experience or an exceptional operating background" },
  { path: "Consulting → MBA → PM", difficulty: "Well-trodden", who: "Most common path. Gives you credentials + optionality for APM programs and tech campus placements" },
  { path: "Consulting → Internal Strategy → PM", difficulty: "Medium", who: "Move to a tech company's internal strategy team, then lateral to PM after 6–18 months" },
  { path: "Consulting → Startup Operator → PM", difficulty: "Medium", who: "Join an early-stage startup in a BD/Ops/GM role, get shipped product experience, transition into PM" },
  { path: "Consulting → PM at Adjacent Vertical", difficulty: "Medium-Easy", who: "If you consulted heavily in fintech, retail, or healthcare — companies in those domains will value your domain knowledge" },
];

const FAQS = [
  {
    q: "Are ex-consultants actually good PMs?",
    a: "When they make the mental shift from advising to operating — yes, very often. Ex-consultants bring structured thinking, executive comfort, and analytical rigour that's uncommon in first-time PMs. The failure mode is candidates who stay in 'consultant mode' — over-framework, under-ship, overly abstract. The ones who deliberately rewire into operators (usually 6–12 months in) tend to rise fast.",
  },
  {
    q: "Should I do an MBA first or transition directly?",
    a: "Direct transitions are hardest. An MBA is the most common and predictable path, and for good reason — it gives you APM access, peer network, and 1–2 years to build technical fluency and shipped product artefacts. If you don't want an MBA, the best direct path is: consulting → tech company internal strategy → PM at the same company (internal transfer). Cold-applying direct from consulting to top tech PM roles rarely converts.",
  },
  {
    q: "What consulting experience is most valued in PM roles?",
    a: "Engagements where you had measurable client impact, deep domain specialisation (fintech, retail, health), and hands-on work with product teams or tech clients. Pure strategy decks without operational depth are less transferable. If you led an implementation, a launch, or a customer research sprint inside a consulting engagement — those stories carry disproportionate weight in PM interviews.",
  },
];

export default function PmConsultingToPmPage() {
  const dates = pageDates("/pm-consulting-to-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Consultant to PM", url: `${SITE_URL}/pm-consulting-to-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Consultant to Product Manager (2026 Guide)",
        description: "How management consultants transition to PM. What your MBB/strategy experience buys you, what it doesn't, and how to reposition to win PM interviews.",
        image: `${SITE_URL}/api/og?title=Consultant+to+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-consulting-to-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> Consultants advise. PMs ship. Bridge that gap.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Consultant to Product Manager<br />(2026 Guide)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            Ex-consultants land PM roles by trading an advisory mindset for an operator one — the biggest single gap interviewers flag — while carrying over real strengths in structured problem-solving, executive communication, and comfort with ambiguity. Most take one of five paths, the most common being consulting → MBA → PM, though a lateral move into a tech company&apos;s internal strategy team before pivoting to PM also works.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What your consulting experience buys you, what it doesn&apos;t,
            and the 5 paths ex-consultants take to land PM roles in India.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start PM Transition Prep — Free →
          </Link>
        </section>

        {/* Strengths */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Consulting Strengths to Leverage</h2>
          <div className="space-y-3">
            {STRENGTHS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-green-400 mb-1">✅ {s.strength}</p>
                <p className="text-sm text-white/60">{s.pmUse}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gaps */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Gaps to Close Before PM Interviews</h2>
            <div className="space-y-4">
              {GAPS.map((g, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-white mb-2">⚠️ {g.gap}</p>
                  <p className="text-sm text-white/60 mb-2">{g.why}</p>
                  <p className="text-sm text-green-400">→ {g.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Paths */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Paths From Consulting to PM</h2>
          <div className="space-y-3">
            {PATHS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{p.path}</p>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{p.difficulty}</span>
                </div>
                <p className="text-xs text-white/60">{p.who}</p>
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

        <RelatedPages slug="pm-consulting-to-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Operator Muscle Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that build the shipped-product intuition interviewers reward.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
