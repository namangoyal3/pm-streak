import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Manager Resume Guide (2026) — Templates, Examples & Tips",
  description:
    "Write a PM resume that gets interviews. Templates, real examples, bullet formulas, and what hiring managers actually look for at Google, Flipkart, Razorpay, and top startups.",
  keywords: [
    "product manager resume", "PM resume template", "product manager resume examples",
    "how to write PM resume", "product manager resume india", "APM resume",
    "senior PM resume", "product manager CV 2026",
  ],
  alternates: { canonical: "/product-manager-resume" },
  openGraph: {
    title: "Product Manager Resume Guide 2026 — PM Streak",
    description: "PM resume templates, bullet formulas, and what hiring managers look for at top companies.",
    url: `${SITE_URL}/product-manager-resume`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+Resume+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Resume Guide 2026 — PM Streak",
    description: "PM resume templates, bullet formulas, and what hiring managers look for at top companies.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+Resume+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const BULLET_EXAMPLES = [
  {
    weak: "Worked on improving the onboarding flow",
    strong: "Redesigned onboarding flow (3 steps → 1) — lifted day-7 retention by 18% and reduced support tickets by 34%",
    principle: "Lead with the action, end with the metric",
  },
  {
    weak: "Led a cross-functional team to ship a new feature",
    strong: "Shipped real-time inventory sync across 3 engineering teams in 6 weeks — reduced out-of-stock errors by 40% for 200K daily users",
    principle: "Name the scope, the constraint, and the outcome",
  },
  {
    weak: "Ran A/B tests to improve conversion",
    strong: "Ran 12 A/B experiments on checkout — identified friction in address entry that, when fixed, drove a 9% conversion lift worth ₹2.4Cr ARR",
    principle: "Show the experiment count, the insight, and the business impact",
  },
  {
    weak: "Collaborated with design to improve UX",
    strong: "Partnered with design on 3 usability studies (14 users) — surfaced confusion in navigation that was causing 23% of users to abandon before activation",
    principle: "Quantify the research and name the specific finding",
  },
];

const SECTIONS = [
  { title: "Header", must: ["Name + city", "LinkedIn URL (clean, not default)", "GitHub/portfolio if relevant", "Email only (no photo, DOB, marital status)"], avoid: ["Objective statement", "Full mailing address", "Phone in some markets"] },
  { title: "Summary (3 lines max)", must: ["Years of PM experience", "Domain specialty (fintech, consumer, B2B)", "1 signature achievement with a number"], avoid: ["Generic phrases ('passionate', 'results-driven')", "More than 3 sentences"] },
  { title: "Experience", must: ["Company + role + dates + location", "3–5 bullets per role (impact-led)", "Metrics in every bullet where possible", "Show scope: team size, users affected, revenue touched"], avoid: ["Responsibilities lists", "Vague verbs ('helped', 'assisted', 'supported')", "Bullets without outcomes"] },
  { title: "Skills", must: ["Product tools (Jira, Figma, Amplitude, Mixpanel)", "Technical (SQL, basic coding, APIs)", "Methodologies (Agile, OKRs, A/B testing)"], avoid: ["Soft skills section", "Proficiency bars/ratings", "MS Office"] },
];

const FAQS = [
  {
    q: "How long should a product manager resume be?",
    a: "One page for under 5 years experience. Two pages is acceptable for senior PMs with 8+ years, but only if every line earns its place. Hiring managers spend 15–30 seconds on a first pass — make the top third of page one impossible to skip.",
  },
  {
    q: "What metrics should I include in my PM resume?",
    a: "Lead with the metric that matters most to the business: retention %, revenue impact (₹ or $), conversion lift, cost reduction, time saved, or user volume affected. If you can't name a number, name a directional outcome and the scale ('improved onboarding for 500K users').",
  },
  {
    q: "Should a PM resume include technical skills?",
    a: "Yes — but selectively. Include SQL if you've actually used it, API/webhook experience if relevant, and tools you use weekly (Amplitude, Figma, Jira). Don't list Python if you haven't touched it in 3 years. Technical fluency signals credibility with engineering partners.",
  },
  {
    q: "How do I write a PM resume with no PM experience?",
    a: "Translate adjacent experience: software engineer (deep technical context), consultant (structured problem-solving, client management), designer (user empathy, prototyping). Show PM-adjacent projects: product teardowns, side products you built, research you conducted. APM programs specifically look for potential over experience.",
  },
];

export default function ProductManagerResumePage() {
  const dates = pageDates("/product-manager-resume");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Manager Resume", url: `${SITE_URL}/product-manager-resume` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager Resume Guide (2026 Edition)",
        description:
          "Write a PM resume that gets interviews. Templates, real examples, bullet formulas, and what hiring managers actually look for at Google, Flipkart, Razorpay, and top startups.",
        image: `${SITE_URL}/api/og?title=Product+Manager+Resume+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-resume`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📄</span> 15–30 seconds — that&apos;s how long hiring managers spend on a first pass
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager Resume Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            A strong product manager resume earns its interview in the 15–30 seconds a hiring manager spends on
            the first pass. Keep it to one page under 5 years of experience, write every bullet as
            Action → Scope → Outcome with a number, and cut vague verbs like &ldquo;helped&rdquo; and
            &ldquo;supported&rdquo;. This guide covers the before/after bullets, section checklist, and metrics
            that get PM resumes shortlisted.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What hiring managers at Google, Flipkart, and Razorpay actually look for — with real before/after bullets,
            section templates, and the mistakes that get PMs rejected before the phone screen.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Prep for the Interview After the Resume →
          </Link>
        </section>

        {/* The Bullet Formula */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-3">The PM Bullet Formula</h2>
          <p className="text-white/60 text-center mb-8 max-w-xl mx-auto">
            Every PM resume bullet should follow: <span className="text-white font-medium">Action → Scope → Outcome (with a number)</span>.
            Here&apos;s how weak bullets become strong ones.
          </p>
          <div className="space-y-5">
            {BULLET_EXAMPLES.map((ex, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-red-400 font-medium mb-1.5">❌ Weak</p>
                    <p className="text-sm text-white/50 italic">&ldquo;{ex.weak}&rdquo;</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400 font-medium mb-1.5">✅ Strong</p>
                    <p className="text-sm text-white/80 italic">&ldquo;{ex.strong}&rdquo;</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-xs text-[#89e219]">💡 Principle: {ex.principle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Guide */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Resume Section Checklist</h2>
            <div className="space-y-5">
              {SECTIONS.map(sec => (
                <div key={sec.title} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <h3 className="font-semibold text-white mb-3">{sec.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-400 font-medium mb-2">✅ Include</p>
                      <ul className="space-y-1">
                        {sec.must.map((m, i) => <li key={i} className="text-xs text-white/60">• {m}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-red-400 font-medium mb-2">❌ Avoid</p>
                      <ul className="space-y-1">
                        {sec.avoid.map((a, i) => <li key={i} className="text-xs text-white/60">• {a}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="product-manager-resume" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Great Resume. Now Ace the Interview.</h2>
          <p className="text-white/60 mb-6">Daily PM practice with AI feedback — so you&apos;re ready when the call comes.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
