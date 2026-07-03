import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Cover Letter Guide (2026) — Template, Examples & What Hiring Managers Want",
  description:
    "Write a PM cover letter that actually gets read. The structure that works, real examples, what to include, what to cut, and when to skip the cover letter entirely.",
  keywords: [
    "PM cover letter", "product manager cover letter",
    "PM cover letter template", "PM cover letter examples",
    "product manager cover letter india", "how to write PM cover letter 2026",
  ],
  alternates: { canonical: "/pm-cover-letter" },
  openGraph: {
    title: "PM Cover Letter Guide 2026 — PM Streak",
    description: "PM cover letter template, examples, and the structure that actually gets interviews.",
    url: `${SITE_URL}/pm-cover-letter`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Cover+Letter+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Cover Letter Guide 2026 — PM Streak",
    description: "PM cover letter template, examples, and the structure that actually gets interviews.",
    images: [`${SITE_URL}/api/og?title=PM+Cover+Letter+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const STRUCTURE = [
  {
    paragraph: "Paragraph 1: The Hook",
    goal: "Show you've done the homework. Reference something specific about the company or their product.",
    words: "2–3 sentences",
    example: "I've been using [Product] daily for the past year, and I wrote a teardown about the onboarding experience recently. Your recent launch of [Feature X] is exactly the kind of product bet I want to work on. I'm applying for the [Role] position.",
    avoid: "Generic openers like 'I'm writing to apply for...' or 'I came across your job post.'",
  },
  {
    paragraph: "Paragraph 2: The Proof",
    goal: "One specific story that demonstrates the PM skills they're hiring for. Lead with outcome.",
    words: "3–5 sentences",
    example: "At [Previous Company], I led the redesign of the checkout flow for first-time buyers. After 5 user interviews revealed trust as the main barrier, I shipped a 3-step flow with inline security signals. Result: 23% lift in first-purchase conversion and ₹2.4Cr ARR impact.",
    avoid: "Listing multiple projects superficially. One strong story beats three weak ones.",
  },
  {
    paragraph: "Paragraph 3: The Fit",
    goal: "Connect your skills/experience to something specific the company is building.",
    words: "2–3 sentences",
    example: "Your focus on Bharat users is why I'm specifically excited — I've spent a year learning vernacular product design at [Company] and I think the framework I developed for trust in low-literacy UX would apply directly to [specific Meesho initiative].",
    avoid: "Generic 'I love your mission' sentences. Specificity proves you actually understand what they do.",
  },
  {
    paragraph: "Paragraph 4: The Close",
    goal: "Express clear interest. Name your availability. One line.",
    words: "1–2 sentences",
    example: "I'd love to discuss how my experience maps to your team's priorities. I'm available for a call at your convenience and can join within 4 weeks.",
    avoid: "'I look forward to hearing from you.' It's fine but adds nothing.",
  },
];

const EXAMPLES = [
  {
    title: "Example: Transition from Engineer to APM at Flipkart",
    text: `I've been shipping features at [Company] for 3 years, but what I enjoy most is the PRD-writing phase — understanding the user problem and deciding what to build. I'm applying for the Associate PM role at the Flipkart Product Accelerator Program.

Last quarter, I proposed and led a seller-facing feature for tracking ad performance. I wrote the spec, ran 4 user interviews with sellers, and partnered with design on the UX. We shipped in 6 weeks. Seller ad adoption increased 34%, and we retained ₹12L in monthly ad spend that was churning.

Flipkart's scale — especially the seller ecosystem — is why I'm specifically interested. I've been studying how Flipkart has structured the seller experience vs Amazon's, and I have a strong point of view on where Flipkart could differentiate further.

I'm available to interview on evenings/weekends and can join the next APM cohort.`,
  },
  {
    title: "Example: PM with 4 years experience applying to a fintech",
    text: `Three years ago I shipped my first payments feature. Two years ago I led a re-architecture of checkout at [Company] that lifted conversion 9%. Today I want to work on payments that touch Bharat — which is why I'm applying for the Senior PM role at [Fintech].

My most proud project: partnering with compliance to ship an RBI-sandbox payment product. The hardest part wasn't the code — it was aligning 4 stakeholders on risk trade-offs. I wrote a decision memo that led to our Legal team rewriting their internal approvals playbook. Product shipped 6 weeks ahead of target with zero compliance incidents in the first year.

Your recent move into [specific product area] is exactly where my skills are strongest. I'd be excited to discuss how our frameworks for balancing user experience and regulatory constraints might apply to your roadmap.

Happy to chat this week or next. I can start within 60 days of offer.`,
  },
];

const FAQS = [
  {
    q: "Do PM job applications actually need a cover letter?",
    a: "In India, increasingly no — most PM applications are processed through ATS systems and recruiters often skip the cover letter entirely. BUT: cover letters are read when (1) you're applying directly via email to a recruiter or hiring manager, (2) the company is small enough that one person reviews applications, (3) you're making a non-obvious career transition and need to explain the story. In those cases, a great cover letter materially improves your odds. For large company ATS-first applications, focus on resume quality instead.",
  },
  {
    q: "How long should a PM cover letter be?",
    a: "300–400 words. Hiring managers spend ~60 seconds on a cover letter if they read it at all. Longer is not better — it's worse, because it signals you don't know what to cut. Four paragraphs, each with a specific job, each tight.",
  },
  {
    q: "Should I customise the cover letter for every company?",
    a: "The first and third paragraphs should be customised for every company. Paragraphs 2 and 4 can be templated — your proof story and your close don't need to change. This is a 10-minute investment per application that can significantly improve conversion when the cover letter is actually read.",
  },
];

export default function PmCoverLetterPage() {
  const dates = pageDates("/pm-cover-letter");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Cover Letter", url: `${SITE_URL}/pm-cover-letter` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Cover Letter Guide (2026 Edition)",
        description: "Write a PM cover letter that actually gets read. The structure that works, real examples, what to include, what to cut, and when to skip the cover letter entirely.",
        image: `${SITE_URL}/api/og?title=PM+Cover+Letter+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-cover-letter`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>✉️</span> 4 paragraphs · 400 words · 1 shot to get read
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Cover Letter Guide<br />(2026 Edition)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            A PM cover letter follows four paragraphs — a specific hook, one proof story with a measurable outcome, a fit paragraph tied to the company&apos;s actual work, and a short close — kept to 300–400 words total. Skip it for ATS-heavy applications at large companies; write it when applying directly, at small companies, or for a non-obvious career pivot.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The 4-paragraph structure that works, two complete examples,
            and when to skip the cover letter entirely.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Your PM Resume Next — Free →
          </Link>
        </section>

        {/* Structure */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 4-Paragraph Structure</h2>
          <div className="space-y-5">
            {STRUCTURE.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-white">{s.paragraph}</h3>
                  <span className="text-xs bg-[#1f2228] border border-white/10 rounded-full px-2 py-1 text-white/60">{s.words}</span>
                </div>
                <p className="text-sm text-[#89e219] mb-3">🎯 Goal: {s.goal}</p>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-2">
                  <p className="text-xs text-green-400 mb-1">✅ Example</p>
                  <p className="text-sm text-white/70 italic">{s.example}</p>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
                  <p className="text-xs text-red-400 mb-1">❌ Avoid</p>
                  <p className="text-xs text-white/60">{s.avoid}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Complete Cover Letter Examples</h2>
            <div className="space-y-6">
              {EXAMPLES.map((ex, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <p className="text-xs text-[#89e219] uppercase tracking-wider mb-4">{ex.title}</p>
                  <p className="text-sm text-white/70 whitespace-pre-line italic">{ex.text}</p>
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

        <RelatedPages slug="pm-cover-letter" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Great Cover Letter. Now Ace the Interview.</h2>
          <p className="text-white/60 mb-6">Daily PM interview practice with AI feedback — ready when the call comes.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
