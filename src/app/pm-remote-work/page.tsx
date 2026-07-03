import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Remote PM Jobs Guide (2026) — How to Find & Excel as a Remote Product Manager",
  description:
    "The complete remote PM guide. Where to find remote PM jobs from India, how to interview for global roles, async communication skills, and remote PM compensation benchmarks.",
  keywords: [
    "remote PM jobs", "remote product manager india",
    "remote PM jobs from india", "how to get remote PM job",
    "async PM work", "remote product manager salary 2026",
  ],
  alternates: { canonical: "/pm-remote-work" },
  openGraph: {
    title: "Remote PM Jobs Guide 2026 — PM Streak",
    description: "Where to find remote PM jobs, how to interview from India, and excel async.",
    url: `${SITE_URL}/pm-remote-work`,
    images: [{ url: `${SITE_URL}/api/og?title=Remote+PM+Jobs+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote PM Jobs Guide 2026 — PM Streak",
    description: "Where to find remote PM jobs, how to interview from India, and excel async.",
    images: [`${SITE_URL}/api/og?title=Remote+PM+Jobs+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHERE_TO_FIND = [
  { source: "Remote OK / We Work Remotely", what: "Job boards with PM-specific filters. Quality varies — skew toward mid-stage startups." },
  { source: "HimalayasJobs / Working Nomads", what: "Focused on fully remote roles. Stronger signal on 'remote-first' vs 'remote-tolerated.'" },
  { source: "LinkedIn (Remote filter + Global)", what: "Best for established companies with India entities. Set job alerts for 'Remote - Global' PM roles." },
  { source: "AngelList / Wellfound", what: "Startups that hire globally. Strong for fintech, SaaS, AI companies." },
  { source: "Y Combinator Work at a Startup", what: "Curated YC-backed startups, many remote-friendly. High signal, high bar." },
  { source: "Direct outreach to founders", what: "Cold DMs on LinkedIn/Twitter to founders of companies you want to work at. Works better than applying cold." },
];

const REMOTE_SKILLS = [
  {
    skill: "Written communication",
    why: "In remote PM roles, your writing IS your leadership. Bad writers struggle; excellent writers thrive.",
    practice: "Write one long-form async update per week. Get feedback. Study exceptional writers (Packy McCormick, Lenny Rachitsky).",
  },
  {
    skill: "Timezone-aware scheduling",
    why: "Working with US/EU teams from India means thoughtful scheduling. Constant early mornings or late nights kill sustainability.",
    practice: "Batch sync time into 2–3 windows per week. Protect deep work blocks aggressively. Make async your default.",
  },
  {
    skill: "Clarity in written PRDs and decisions",
    why: "In-person PMs get away with fuzzy specs. Remote PMs don't — ambiguity multiplies across timezones.",
    practice: "Every decision doc should answer: what, why, who owns, what's explicitly out of scope, what's next. No vague 'we'll figure it out.'",
  },
  {
    skill: "Proactive over-communication",
    why: "Remote isolation means status anxiety. Leadership can't see you working — you have to show it.",
    practice: "Weekly async update: 3 bullets on progress, 1 on blockers, 1 on priorities. Send even when there's 'nothing to report.'",
  },
  {
    skill: "Video presence and async video",
    why: "Loom, async videos, and occasional sync meetings are how you build presence without being physically there.",
    practice: "Record short Looms (<3 min) for demos and decisions. Invest in decent lighting and audio — video quality signals professionalism.",
  },
];

const COMPENSATION = [
  { role: "Remote PM (US company, India-based)", range: "$80K–$150K (₹66L–1.2Cr)", notes: "Varies by company maturity. Many US companies pay India PMs 40–60% of US comp." },
  { role: "Remote PM (EU / UK company)", range: "$70K–$120K", notes: "Lower than US but often better work-life balance. Some pay location-adjusted, some don't." },
  { role: "Remote PM (Global Indian SaaS — Freshworks, Zoho)", range: "₹25L–1.2Cr", notes: "Indian SaaS companies often have remote + hybrid roles. Pay matches Indian tech comp." },
  { role: "Senior Remote PM (Staff/Principal level)", range: "$150K–$300K+", notes: "Remote compensation at senior levels approaches global benchmarks — especially at public US SaaS companies." },
];

const FAQS = [
  {
    q: "Can I realistically get a remote PM job from India?",
    a: "Yes — the market has grown significantly since 2020. Remote PM roles from US, EU, and UK companies are accessible to India-based candidates, especially for mid-level and senior roles. APM-level remote roles are rarer — most companies still want APMs in-office for mentorship and culture reasons. Best hit rate: senior PM, growth PM, AI PM, or specialist PM roles at companies that have a meaningful remote hiring track record.",
  },
  {
    q: "Will remote PMs from India always be paid less than US-based peers?",
    a: "Generally yes, but the gap is narrowing. Tier-1 US companies (GitLab, Automattic, Zapier) increasingly pay close to US comp globally. Most mid-size US startups pay 50–70% of US comp for India-based hires. Location-adjusted compensation is still the norm — but the absolute numbers (₹60L–₹1.5Cr for senior remote PMs) are strong vs Indian market benchmarks.",
  },
  {
    q: "What's the biggest challenge of being a remote PM from India?",
    a: "Timezone overlap. Most US-based teams have only 2–3 hours of real-time overlap with India (either early mornings IST for US East, or late nights IST for US West). Strong async culture helps but sustained late-night or very-early-morning meetings burn PMs out within 12 months. Companies that have genuine async-first cultures (GitLab, Automattic, Deel, Doist) are far better employers from India than companies that claim remote but default sync.",
  },
];

export default function PmRemoteWorkPage() {
  const dates = pageDates("/pm-remote-work");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Remote PM Jobs", url: `${SITE_URL}/pm-remote-work` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Remote PM Jobs Guide (India Edition 2026)",
        description:
          "The complete remote PM guide. Where to find remote PM jobs from India, how to interview for global roles, async communication skills, and remote PM compensation benchmarks.",
        image: `${SITE_URL}/api/og?title=Remote+PM+Jobs+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-remote-work`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌍</span> Remote PM from India is possible. Doing it well is a skill.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Remote PM Jobs Guide<br />(India Edition 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Remote PM roles from India are realistic, especially at mid and senior levels, and can be found through remote-specific boards like Remote OK and Himalayas, LinkedIn&apos;s global remote filter, Wellfound, and YC&apos;s Work at a Startup — success then depends on five skills (written communication, timezone-aware scheduling, clear PRDs, proactive updates, async video) plus accepting that most mid-size US startups still pay only 50–70% of US comp for India-based hires.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Where to find remote PM roles from India, the 5 skills that separate great remote PMs from average ones,
            compensation benchmarks, and how to interview for global roles.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Remote PM Muscle — Free →
          </Link>
        </section>

        {/* Where to find */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Where to Find Remote PM Jobs</h2>
          <div className="space-y-3">
            {WHERE_TO_FIND.map((w, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{w.source}</p>
                <p className="text-xs text-white/60">{w.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Remote skills */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Skills Every Remote PM Needs</h2>
            <div className="space-y-4">
              {REMOTE_SKILLS.map((s, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-2">{i + 1}. {s.skill}</p>
                  <p className="text-sm text-white/60 mb-2">{s.why}</p>
                  <p className="text-xs text-[#89e219]">💪 Practice: <span className="text-white/70">{s.practice}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compensation */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Remote PM Compensation (2026)</h2>
          <div className="space-y-3">
            {COMPENSATION.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">{c.role}</p>
                  <span className="text-xs text-green-400">{c.range}</span>
                </div>
                <p className="text-xs text-white/60">{c.notes}</p>
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

        <RelatedPages slug="pm-remote-work" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Interview for Remote PM Roles Daily</h2>
          <p className="text-white/60 mb-6">Daily PM practice — no scheduling, no meetings, no timezone issues.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
