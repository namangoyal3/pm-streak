import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Job Search in India (2026) — Where to Apply, How to Stand Out",
  description:
    "The complete PM job search guide for India. Where to find PM roles, how to apply, what recruiters look for, and the channels that actually convert — not just job boards.",
  keywords: [
    "PM job search india", "product manager jobs india",
    "where to find PM jobs india", "PM job portals india",
    "how to get PM job india", "product manager hiring 2026",
  ],
  alternates: { canonical: "/pm-job-search-india" },
  openGraph: {
    title: "PM Job Search in India 2026 — PM Streak",
    description: "Where to find PM jobs in India and how to actually stand out in the application pile.",
    url: `${SITE_URL}/pm-job-search-india`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Job+Search+in+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Job Search in India 2026 — PM Streak",
    description: "Where to find PM jobs in India and how to actually stand out in the application pile.",
    images: [`${SITE_URL}/api/og?title=PM+Job+Search+in+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CHANNELS = [
  {
    channel: "LinkedIn",
    hitRate: "High volume, low conversion",
    how: "Use 'Easy Apply' for warm leads only. For competitive roles, find the hiring manager/recruiter and send a personal message referencing why you're a fit. Cold 'Easy Apply' has ~2% response rate; personal outreach hits 20%+.",
  },
  {
    channel: "Company Careers Page",
    hitRate: "Medium conversion, better for senior roles",
    how: "Apply directly through the company website for roles you genuinely want. Follow up with a targeted LinkedIn message to the hiring manager 3–5 days after applying.",
  },
  {
    channel: "Employee Referrals",
    hitRate: "Highest conversion",
    how: "Referrals get interviews at 3–5x the rate of cold applications. Make it easy: send a short message with role link, your 1-para pitch, and your resume attached. Reciprocate when asked.",
  },
  {
    channel: "PM-Specific Job Boards",
    hitRate: "Medium conversion",
    how: "PMJobsIndia, Lenny&apos;s Jobs, PMSchool, Cutshort. Smaller applicant pools mean better odds. Best for mid-size and startup roles.",
  },
  {
    channel: "Direct DM to Hiring Managers",
    hitRate: "Medium-high for senior roles",
    how: "On LinkedIn or Twitter. Short, specific, respectful. 'I noticed you lead [product area]. I built [relevant thing] and have a strong POV on [domain]. Is there a time to chat briefly?' — this works more often than people expect.",
  },
  {
    channel: "Twitter / Public Presence",
    hitRate: "Low volume, high quality",
    how: "If you write/post about PM topics, founders and hiring managers often reach out to you. This is a long-tail strategy but surprisingly effective for senior roles.",
  },
];

const TIMELINE = [
  { stage: "Application Review", typical: "1–3 weeks", notes: "ATS-screened first. Recruiters review flagged applications. Response rate: 5–15% at competitive companies." },
  { stage: "Recruiter Screen", typical: "3–5 days after positive review", notes: "30-minute call. Standard PM questions + salary expectations. Decision: move forward or pass." },
  { stage: "Hiring Manager Screen", typical: "1 week after recruiter", notes: "Typically 45 min. Deep dive on your experience and product thinking. Often decides if you advance." },
  { stage: "Onsite / Loop Interviews", typical: "2–3 weeks after HM screen", notes: "4–6 rounds covering product sense, metrics, strategy, behavioural, technical. Usually scheduled over 1–2 days." },
  { stage: "Debrief & Decision", typical: "3–7 days after onsite", notes: "Hiring committee review. Positive decision triggers offer; negative triggers 'thanks, not moving forward.'" },
  { stage: "Offer & Negotiation", typical: "1 week", notes: "Initial offer → counter → final offer → sign. Window is short — don't sit on it too long." },
];

const FAQS = [
  {
    q: "What's the best time of year to apply for PM jobs in India?",
    a: "Q1 (Jan–Mar) and Q3 (Jul–Sep) are traditional hiring peaks. Q1 is driven by new budget cycles; Q3 covers APM campus hiring season. December is the slowest month. Timing matters less at the senior level — great PMs get hired whenever they appear. For APM programs specifically: applications open Jun–Oct depending on company.",
  },
  {
    q: "How long does a PM job search typically take?",
    a: "3–6 months from first application to signed offer is typical for competitive roles. For first-time PM transitions (from engineer/consulting/MBA), 6–9 months is realistic. For senior PMs with clear track records, 2–4 months. If you're at 6+ months without progress, the bottleneck is usually not volume of applications — it's the quality of your materials, interview prep, or target company fit.",
  },
  {
    q: "Should I apply to every PM role I see or be selective?",
    a: "Be selective. 10 strong, tailored applications beat 100 generic ones. Great PMs treat applications like product launches — they research the company, understand the role, and customise their narrative. Spray-and-pray applications burn your time and your reputation with recruiters (who track patterns). Aim for 5–8 applications per week, each with a compelling why-this-company angle.",
  },
];

export default function PmJobSearchIndiaPage() {
  const dates = pageDates("/pm-job-search-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Job Search in India", url: `${SITE_URL}/pm-job-search-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Job Search in India (2026 Edition)",
        description: "The complete PM job search guide for India. Where to find PM roles, how to apply, what recruiters look for, and the channels that actually convert — not just job boards.",
        image: `${SITE_URL}/api/og?title=PM+Job+Search+in+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-job-search-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔍</span> 10 great applications beat 100 mediocre ones
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Job Search in India<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A PM job search in India runs through six channels — LinkedIn, company career pages,
            referrals, PM-specific job boards, direct outreach to hiring managers, and public
            writing — then moves through five hiring stages from application review to offer
            negotiation. Referrals convert highest; competitive roles typically take three to six
            months from first application to signed offer.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Where to find PM jobs that actually convert, the typical hiring timeline,
            and how to stand out in a competitive application pile.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Prep While You Apply — Free →
          </Link>
        </section>

        {/* Channels */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Channels to Find PM Jobs</h2>
          <div className="space-y-4">
            {CHANNELS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-white">{i + 1}. {c.channel}</p>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{c.hitRate}</span>
                </div>
                <p className="text-xs text-white/60">{c.how}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Typical PM Hiring Timeline</h2>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-white">{i + 1}. {t.stage}</p>
                    <span className="text-xs text-green-400">{t.typical}</span>
                  </div>
                  <p className="text-xs text-white/60">{t.notes}</p>
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

        <RelatedPages slug="pm-job-search-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Be Interview-Ready When the Call Comes</h2>
          <p className="text-white/60 mb-6">Daily PM practice keeps you sharp through a multi-month job search.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
