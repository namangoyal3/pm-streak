import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Intuit &amp; Adobe PM Interview Guide (2026) — Enterprise SaaS PM Prep",
  description:
    "Crack PM interviews at Intuit, Adobe, Salesforce, and enterprise SaaS. The unique dynamics of large enterprise products, creative tools, and the slow-but-steady PM work.",
  keywords: [
    "Intuit PM interview", "Adobe PM interview",
    "Salesforce PM interview", "enterprise SaaS PM india",
    "creative tools PM 2026",
  ],
  alternates: { canonical: "/intuit-adobe-pm-interview" },
  openGraph: {
    title: "Intuit &amp; Adobe PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for Intuit, Adobe, Salesforce, and enterprise SaaS PM roles.",
    url: `${SITE_URL}/intuit-adobe-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Intuit+&amp;+Adobe+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intuit &amp; Adobe PM Interview Guide 2026 — PM Streak",
    description: "PM interview prep for Intuit, Adobe, Salesforce, and enterprise SaaS PM roles.",
    images: [`${SITE_URL}/api/og?title=Intuit+&amp;+Adobe+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPANIES = [
  { company: "Intuit", focus: "TurboTax, QuickBooks, Mailchimp, Credit Karma — SMB and consumer finance products" },
  { company: "Adobe", focus: "Creative Cloud (Photoshop, Illustrator, Premiere), Experience Cloud, Document Cloud (PDF)" },
  { company: "Salesforce", focus: "CRM, Marketing Cloud, Service Cloud, Slack (owned), MuleSoft (owned)" },
  { company: "Workday / ServiceNow", focus: "HR, finance, ITSM enterprise platforms — highly configurable, long sales cycles" },
  { company: "Oracle / SAP", focus: "ERP, HCM, large-enterprise business software" },
];

const PM_DYNAMICS = [
  {
    dynamic: "Slow iteration, high stakes",
    detail: "Enterprise software changes affect millions of professional users. A bad release can break entire businesses. Iteration is slower but more deliberate than consumer tech.",
  },
  {
    dynamic: "Customer = buyer ≠ user",
    detail: "IT admin buys Salesforce; sales reps use it. Finance buys Workday; HR uses it. PMs must design for both, which often want different things.",
  },
  {
    dynamic: "Long sales cycles change PM priorities",
    detail: "3–12 month enterprise sales cycles mean PM decisions affect revenue 2–3 quarters later. Short-term experimentation is harder; long-horizon bets matter more.",
  },
  {
    dynamic: "Extensibility matters enormously",
    detail: "Enterprise customers customise heavily — APIs, integrations, custom fields. PMs must think about the product AND the platform simultaneously.",
  },
  {
    dynamic: "Backwards compatibility is sacred",
    detail: "Enterprise customers rely on stability. Breaking changes cost you customers. PMs must plan migrations, deprecations, and feature sunsets carefully.",
  },
];

const INTERVIEW_QUESTIONS = [
  "How would you improve Intuit&apos;s QuickBooks for first-time small business owners?",
  "Adobe Photoshop is complex. How would you onboard a new user without scaring them away?",
  "Salesforce customers complain about clutter. Simplify without losing power user functionality.",
  "Design a feature that helps TurboTax users understand why their refund changed year-over-year.",
  "Adobe&apos;s Creative Cloud has high churn among casual users. Diagnose and propose.",
  "How would you balance enterprise customer requests with long-term product strategy?",
];

const FAQS = [
  {
    q: "Is enterprise SaaS PM a good career path?",
    a: "Excellent for PMs who want deep domain expertise, long-horizon product work, and compensation that scales well at senior levels. Less exciting for PMs who want fast iteration and consumer scale. Trade-off: slower pace, more sales-driven, but higher stability and deeper relationships with customers over years. Career ceiling at top enterprise SaaS companies (Salesforce, Adobe) is very high.",
  },
  {
    q: "What&apos;s unique about enterprise SaaS PM interviews?",
    a: "Interviewers probe depth more than breadth. Expect questions about: customer vs user distinctions, backwards compatibility, extensibility and APIs, long sales cycle implications, and how you balance enterprise requests with strategic direction. Candidates from pure consumer backgrounds often underprepare for these dimensions.",
  },
  {
    q: "Do Intuit and Adobe hire PMs in India?",
    a: "Yes — Adobe has a large Noida and Bangalore presence. Intuit has an India engineering hub. Both hire PMs for roles spanning India-specific initiatives and global products. Compensation is competitive with top India tech (often higher than startups, comparable to FAANG India). Interview processes mirror global standards with some India-specific flavour.",
  },
];

export default function IntuitAdobePmInterviewPage() {
  const dates = pageDates("/intuit-adobe-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Enterprise SaaS PM Interview", url: `${SITE_URL}/intuit-adobe-pm-interview` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Enterprise SaaS PM Interview (Intuit, Adobe, Salesforce 2026)",
        description:
          "Crack PM interviews at Intuit, Adobe, Salesforce, and enterprise SaaS. The unique dynamics of large enterprise products, creative tools, and the slow-but-steady PM work.",
        image: `${SITE_URL}/api/og?title=Intuit+&amp;+Adobe+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/intuit-adobe-pm-interview`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏢</span> Slow iteration · High stakes · Deep domain expertise
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Enterprise SaaS PM Interview<br />(Intuit, Adobe, Salesforce 2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Enterprise SaaS PM interviews at Intuit, Adobe, and Salesforce probe depth over
            breadth: expect questions on customer-versus-user distinctions, backwards
            compatibility, extensibility and APIs, and how long sales cycles change
            prioritisation. The five dynamics tested — slow but deliberate iteration, buyer/user
            splits, multi-quarter sales cycles, platform thinking, and sacred backwards
            compatibility — separate consumer-tech candidates from those ready for enterprise depth.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Top enterprise SaaS companies hiring PMs, 5 unique dynamics of enterprise PM work,
            and 6 interview questions that test depth, not breadth.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Enterprise PM Prep — Free →
          </Link>
        </section>

        {/* Companies */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Top Enterprise SaaS PM Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPANIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{c.company}</p>
                <p className="text-xs text-white/60">{c.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Unique Dynamics of Enterprise SaaS PM</h2>
            <div className="space-y-4">
              {PM_DYNAMICS.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {d.dynamic}</p>
                  <p className="text-xs text-white/60">{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Enterprise SaaS PM Interview Questions</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3">
              {INTERVIEW_QUESTIONS.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-[#89e219] flex-shrink-0 font-bold">{i + 1}.</span>
                  <span className="text-white/70">{q}</span>
                </li>
              ))}
            </ul>
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

        <RelatedPages slug="intuit-adobe-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Enterprise PM Depth</h2>
          <p className="text-white/60 mb-6">Daily scenarios on buyer-user dynamics, extensibility, and long-horizon trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
