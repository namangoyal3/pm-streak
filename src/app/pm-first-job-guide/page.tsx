import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How to Land Your First PM Job (2026) — Complete India Guide",
  description:
    "The complete guide to landing your first PM job in India. Paths in, portfolio to build, interview prep, and how to differentiate when you have no PM experience.",
  keywords: [
    "first PM job india", "break into PM",
    "how to get first PM job", "no experience PM role",
    "first PM role 2026",
  ],
  alternates: { canonical: "/pm-first-job-guide" },
  openGraph: {
    title: "First PM Job Guide 2026 — PM Streak",
    description: "Complete guide to landing your first PM role — paths, portfolio, interview prep.",
    url: `${SITE_URL}/pm-first-job-guide`,
    images: [{ url: `${SITE_URL}/api/og?title=First+PM+Job+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "First PM Job Guide 2026 — PM Streak",
    description: "Complete guide to landing your first PM role — paths, portfolio, interview prep.",
    images: [`${SITE_URL}/api/og?title=First+PM+Job+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PATHS = [
  { path: "APM Programs", timeline: "Annual recruiting cycle (Jun–Oct)", fit: "Fresh grads, MBAs, early-career switchers", companies: "Flipkart, Google, Razorpay, Microsoft, Meesho, Swiggy" },
  { path: "Internal Transfer", timeline: "6–12 months from initiation", fit: "Engineers, designers, analysts at a company with PM openings", companies: "Any tech company you already work at" },
  { path: "Startup PM (Series A–B)", timeline: "1–3 months, less structured", fit: "People who want scope fast, comfort with ambiguity", companies: "Early-stage startups hiring their first/second PM" },
  { path: "Consulting-to-PM", timeline: "After 2–3 years of consulting", fit: "MBB analysts/associates with tech-adjacent clients", companies: "Razorpay, Flipkart, Indian tech at senior-adjacent levels" },
  { path: "Side project → Referral", timeline: "Months to years, non-linear", fit: "Self-starters who build + share their work publicly", companies: "Early-stage startups, product-first companies" },
];

const PORTFOLIO = [
  "1 strong product teardown (2–3 pages) — pick a product you genuinely use",
  "1 mock PRD — a feature you wish existed, well-scoped",
  "1 user research brief — 5 real user interviews documented",
  "1 side project — built something, ideally shipped publicly",
  "Public writing — 2–3 posts on PM topics with a clear POV",
];

const INTERVIEW_FOCUS = [
  "Structured thinking — show you can decompose any problem cleanly",
  "User empathy — always start from users, not features",
  "Metric fluency — understand basic KPIs even if you haven&apos;t owned them",
  "Behavioural stories — prepare 8 strong STAR stories with specific numbers",
  "Company-specific prep — know their product, their recent moves, their user base",
  "Ability to say &apos;I don&apos;t know&apos; — calibrated confidence &gt; faking",
];

const TIMELINE = [
  "Month 1–2: Build portfolio artefacts in parallel with daily PM learning",
  "Month 3: Start applying to APM programs + lateral transfers + targeted startups",
  "Month 4–5: Interview loops, mock interviews, company research",
  "Month 6: Offer negotiation, decide, sign",
  "Ongoing: Keep publishing, building, and staying sharp even after signing",
];

const FAQS = [
  {
    q: "How long does it take to land a first PM job with no PM experience?",
    a: "Realistically 4–9 months from deliberate start to signed offer. Fresh grads targeting APM programs can do it in 3–4 months during peak recruiting season (Jun–Oct). Career switchers from engineering/consulting typically take 6–9 months because they&apos;re building portfolio alongside day jobs. Saying &apos;it&apos;ll take 2 months&apos; is usually under-estimation; &apos;18 months&apos; usually means the effort isn&apos;t focused enough.",
  },
  {
    q: "Do I need an MBA to get my first PM job?",
    a: "No — APM programs at Flipkart, Razorpay, and most Indian tech companies hire from engineering and other backgrounds without MBAs. But MBAs from top schools have structural advantages: campus placements, peer cohort, recruiter access. If you don&apos;t have an MBA, compensate with: a strong public portfolio, direct outreach to hiring managers, and internal transfer pathways. Neither is strictly easier — they&apos;re different paths.",
  },
];

export default function PmFirstJobGuidePage() {
  const dates = pageDates("/pm-first-job-guide");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "First PM Job Guide", url: `${SITE_URL}/pm-first-job-guide` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Land Your First PM Job (India 2026 Edition)",
        description: "The complete guide to landing your first PM job in India. Paths in, portfolio to build, interview prep, and how to differentiate when you have no PM experience.",
        image: `${SITE_URL}/api/og?title=First+PM+Job+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-first-job-guide`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎯</span> The first PM job is the hardest to get — but it&apos;s also the one that unlocks everything else
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Land Your First PM Job<br />(India 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            There are five realistic paths into a first PM job — APM programs, internal transfer,
            startup PM roles, consulting-to-PM, and a side-project-driven referral — and building
            a portfolio (teardown, mock PRD, user research brief) matters as much as picking the
            right path. Most candidates need four to nine months from a deliberate start to a
            signed offer.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Daily PM Prep — Free →
          </Link>
        </section>

        {/* Paths */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Paths Into Your First PM Job</h2>
          <div className="space-y-4">
            {PATHS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {p.path}</p>
                <p className="text-xs text-[#89e219] mb-1">Timeline: {p.timeline}</p>
                <p className="text-xs text-white/60 mb-1">Best for: {p.fit}</p>
                <p className="text-xs text-white/50">Companies: {p.companies}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Portfolio Artefacts to Build</h2>
            <div className="space-y-2">
              {PORTFOLIO.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview focus */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 Interview Focus Areas</h2>
          <div className="space-y-2">
            {INTERVIEW_FOCUS.map((f, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6-Month Timeline</h2>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-first-job-guide" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Make Daily PM Practice Your First Habit</h2>
          <p className="text-white/60 mb-6">2 minutes a day of PM scenarios — the easiest way to build fluency before interviews.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
