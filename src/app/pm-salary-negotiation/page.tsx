import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Salary Negotiation Guide (2026) — How Product Managers Negotiate Offers",
  description:
    "Negotiate your PM offer like a senior PM. What to ask for, how to respond to recruiters, scripts that work, and the salary levers most candidates leave on the table.",
  keywords: [
    "PM salary negotiation", "product manager offer negotiation",
    "how to negotiate PM salary india", "PM compensation negotiation",
    "product manager offer scripts", "PM salary negotiation 2026",
  ],
  alternates: { canonical: "/pm-salary-negotiation" },
  openGraph: {
    title: "PM Salary Negotiation Guide 2026 — PM Streak",
    description: "How to negotiate your PM offer — scripts, levers, and tactics most candidates miss.",
    url: `${SITE_URL}/pm-salary-negotiation`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Salary+Negotiation+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Salary Negotiation Guide 2026 — PM Streak",
    description: "How to negotiate your PM offer — scripts, levers, and tactics most candidates miss.",
    images: [`${SITE_URL}/api/og?title=PM+Salary+Negotiation+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVERS = [
  { lever: "Base Salary", note: "Most commonly negotiated. 5–15% increase is typical.", tactic: "Anchor with market data (Levels.fyi, AmbitionBox). Don't volunteer your current salary first." },
  { lever: "Sign-on Bonus", note: "Often easier to negotiate than base — doesn't affect internal comp bands.", tactic: "Use when the base salary offer is capped. Ask: 'Is there flexibility in the sign-on?'" },
  { lever: "ESOPs / RSUs", note: "Largest upside lever at growth-stage companies. Often forgotten in negotiations.", tactic: "Ask for the full grant details: vesting schedule, cliff, strike price (ESOPs), latest 409A or last round valuation." },
  { lever: "Annual Performance Bonus", note: "Target % of base. Can range from 10% (startups) to 25% (large tech).", tactic: "Ask what the target bonus is at the level and whether it's typically paid out." },
  { lever: "Joining Date", note: "Overlooked lever. Later joining = more notice pay, more leverage for another offer.", tactic: "Ask for 6–8 weeks instead of standard 4. Easier to negotiate than salary." },
  { lever: "Relocation / Remote Setup", note: "Especially relevant for India → remote-for-US-company or inter-city moves.", tactic: "Ask for lump-sum relocation, broker fees covered, or home office stipend." },
  { lever: "Title / Level", note: "Can be worth 20–40% more in comp band. Often more negotiable than salary directly.", tactic: "If offered Sr PM, ask: 'What would it take to be considered for Staff PM?' Opens a different band." },
  { lever: "Learning & Development Budget", note: "Often $1K–3K/year. Not huge but free money.", tactic: "Ask what the L&D policy is. Can be used for courses, books, coaching." },
];

const SCRIPTS = [
  {
    scenario: "When recruiter asks your current salary",
    bad: "My current base is ₹32L.",
    good: "I'd rather focus on the level the role is calibrated for and the range you have for it. What's the band for this position?",
    why: "Anchoring on your current salary limits your upside. Anchoring on the role's market rate opens higher ceilings.",
  },
  {
    scenario: "When recruiter asks your expectations",
    bad: "I'm looking for ₹45L.",
    good: "Based on my research and the level this role is calibrated for, I'm expecting something in the ₹50–60L range. What's the budget for this role?",
    why: "A range (not a single number) and a reference to the role level signals you've done homework. Always ask for their range back.",
  },
  {
    scenario: "When you receive the initial offer",
    bad: "Yes, I'll accept.",
    good: "Thank you — I'm excited about the opportunity. Let me review the full package over the weekend and come back with a thoughtful response.",
    why: "Never accept immediately, even for a great offer. 48 hours signals you're thoughtful and opens the negotiation door.",
  },
  {
    scenario: "When asking for more after the initial offer",
    bad: "Can you increase the base?",
    good: "I'm really excited about this role. Based on my interviews at [Company B] and market data from [source], I was expecting ₹X. Is there flexibility to get closer to that? I'd be ready to sign today if we can.",
    why: "Tie the ask to market data and a competing signal. Offer a clear close — 'I'd sign today' gives the recruiter an easy win to take to their manager.",
  },
  {
    scenario: "When the company says 'this is our final offer'",
    bad: "Okay, I'll accept.",
    good: "I understand. Can you help me understand the typical growth path from here — what does a promotion timeline look like, and what kind of comp increase comes with it? That would help me make the decision.",
    why: "Not every 'final' is truly final. And if it is, you're still collecting information about growth — often more valuable than a small salary bump.",
  },
];

const MISTAKES = [
  { mistake: "Accepting the first offer", fix: "Always take 24–48 hours and come back with at least one counter." },
  { mistake: "Negotiating base salary only", fix: "Negotiate 3+ levers in parallel: base, signing, ESOPs, joining date." },
  { mistake: "Anchoring with your current salary", fix: "Anchor with market data and the role's level — not your personal history." },
  { mistake: "Negotiating via email only", fix: "Key negotiations happen on calls. Recruiters have more flexibility when not creating a paper trail." },
  { mistake: "Bluffing about competing offers", fix: "Never lie. But absolutely share real competing interviews and offers — they're powerful signals." },
  { mistake: "Negotiating after you've said 'yes'", fix: "Negotiate before you accept. After acceptance, your leverage is gone." },
];

const FAQS = [
  {
    q: "When is the right time to negotiate a PM offer?",
    a: "After you have a written offer in hand, but before you verbally accept. The window between offer letter received and written acceptance is your maximum leverage period. Once you've said 'yes,' even conditionally, the window closes. If you have competing offers or interviews in progress, mention them proactively during the negotiation window.",
  },
  {
    q: "Is it okay to negotiate an offer from a company you really want to join?",
    a: "Yes — and it's expected. Companies that retract offers over respectful negotiation are showing you a red flag. A reasonable counter-offer (not a 50% ask, but a thoughtful 10–20% range) is well within norms at every serious tech company. Recruiters negotiate all day — they expect it and often respect candidates more for doing it well.",
  },
  {
    q: "What's the biggest mistake PMs make in salary negotiation?",
    a: "Negotiating base salary only and ignoring the larger levers: ESOPs (often the biggest upside at growth-stage startups), signing bonus (easiest to move), and title/level (opens a completely different comp band). A ₹5L base increase is meaningful, but a level bump to Senior PM can mean ₹15L+ in total comp at the same company.",
  },
];

export default function PmSalaryNegotiationPage() {
  const dates = pageDates("/pm-salary-negotiation");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Salary Negotiation", url: `${SITE_URL}/pm-salary-negotiation` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Salary Negotiation Guide (2026 Edition)",
        description: "Negotiate your PM offer like a senior PM. What to ask for, how to respond to recruiters, scripts that work, and the salary levers most candidates leave on the table.",
        image: `${SITE_URL}/api/og?title=PM+Salary+Negotiation+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-salary-negotiation`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💰</span> 30 minutes of negotiation = ₹5–20L over your tenure
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Salary Negotiation Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A PM salary negotiation is strongest between receiving a written offer and accepting it,
            and it should touch more than base pay — sign-on bonus, ESOPs, annual bonus, joining date,
            relocation, title, and learning budget all move independently. Anchor with market data, not
            your current salary, and always take 24–48 hours before responding to a first offer.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 8 levers every PM should negotiate, scripts that actually work with recruiters,
            and the mistakes that leave lakhs on the table.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Prep for the Interview First — Free →
          </Link>
        </section>

        {/* Levers */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 8 PM Offer Levers to Negotiate</h2>
          <div className="space-y-3">
            {LEVERS.map((l, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white">{i + 1}. {l.lever}</h3>
                </div>
                <p className="text-sm text-white/60 mb-2">{l.note}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">🎯 Tactic: <span className="text-white/70">{l.tactic}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scripts */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Scripts That Work</h2>
            <div className="space-y-5">
              {SCRIPTS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-3">Scenario: {s.scenario}</p>
                  <div className="space-y-2 mb-3">
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                      <p className="text-xs text-red-400 mb-1">❌ Don&apos;t say</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.bad}&rdquo;</p>
                    </div>
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
                      <p className="text-xs text-green-400 mb-1">✅ Say instead</p>
                      <p className="text-sm text-white/70 italic">&ldquo;{s.good}&rdquo;</p>
                    </div>
                  </div>
                  <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                    <p className="text-xs text-white/50">💡 Why: {s.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Mistakes That Cost PMs Lakhs</h2>
          <div className="space-y-3">
            {MISTAKES.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex gap-3 items-start">
                  <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">❌</span>
                  <div>
                    <p className="text-sm text-white/70 mb-1">{m.mistake}</p>
                    <p className="text-sm text-green-400">→ {m.fix}</p>
                  </div>
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

        <RelatedPages slug="pm-salary-negotiation" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">First Land the Offer. Then Negotiate.</h2>
          <p className="text-white/60 mb-6">Daily PM interview practice — so you have multiple offers to negotiate from.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
