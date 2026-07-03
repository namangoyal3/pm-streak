import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Edtech Product Manager Guide (2026) — How to Become an Edtech PM in India",
  description:
    "The complete edtech PM guide for India. Top companies, unique learning product challenges, interview questions, and how engagement vs outcomes shapes edtech PM decisions.",
  keywords: [
    "edtech product manager india", "Byju's PM",
    "Unacademy PM interview", "Vedantu PM",
    "learning product manager", "edtech PM career 2026",
  ],
  alternates: { canonical: "/edtech-product-manager" },
  openGraph: {
    title: "Edtech PM Guide 2026 — PM Streak",
    description: "Edtech PM in India — companies, learning product challenges, and breaking in.",
    url: `${SITE_URL}/edtech-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Edtech+PM+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edtech PM Guide 2026 — PM Streak",
    description: "Edtech PM in India — companies, learning product challenges, and breaking in.",
    images: [`${SITE_URL}/api/og?title=Edtech+PM+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPANIES = [
  { company: "Byju's", focus: "K-12 learning, test prep (AKASH, Aakash acquisition), WhiteHat Jr, Toppr" },
  { company: "Unacademy", focus: "Test prep (UPSC, NEET, JEE), K-12, competitive exams, live classes" },
  { company: "PhysicsWallah (PW)", focus: "JEE/NEET/UPSC test prep — disrupted incumbents with lower pricing and teacher-first model" },
  { company: "Vedantu", focus: "K-12 live tutoring, with pivots across business models over the years" },
  { company: "UpGrad", focus: "Working professionals, online master's programs, executive learning" },
  { company: "Coursera / Simplilearn / Great Learning", focus: "Online courses, certifications, skill-based learning for adults" },
  { company: "Duolingo", focus: "Language learning — India-specific Hindi English courses and growing presence" },
  { company: "PM Streak", focus: "PM career learning — the &apos;Duolingo for product managers&apos;" },
];

const EDTECH_CHALLENGES = [
  { challenge: "Engagement vs outcomes", detail: "You can make a product addictive (engagement) but not actually improve learning (outcomes). The best edtech PMs optimise for outcomes and trust that engagement follows." },
  { challenge: "Long feedback loops", detail: "Learning outcomes take months to measure. PMs must design proxy metrics (practice completion, retention, NPS) that correlate with the true outcome." },
  { challenge: "Parent vs student dynamics", detail: "In K-12, parents pay but students use the product. Their incentives diverge — parents want evidence of learning, students want engagement. Multi-persona product design is the norm." },
  { challenge: "High CAC, delayed monetisation", detail: "Acquiring students/parents is expensive; revenue often lags. Unit economics in edtech are unforgiving — PMs must understand LTV:CAC obsessively." },
  { challenge: "Content is 80% of the product", detail: "Unlike pure SaaS, the content quality (videos, curriculum, teachers) determines product success more than UX. PMs must collaborate tightly with content/academic teams." },
  { challenge: "Chronic retention problem", detail: "Learning is hard; people quit. Retention in edtech is among the toughest in consumer tech. Streaks, habits, social accountability all help — but none perfectly." },
];

const INTERVIEW_QUESTIONS = [
  "How would you improve Day-30 retention for a test prep app targeting JEE aspirants?",
  "Design a product to help working professionals complete online courses they&apos;ve started but abandoned.",
  "How would you measure learning outcomes in a K-12 app without standardised test access?",
  "A PhysicsWallah-style competitor undercuts your pricing by 50%. Strategic response?",
  "Design a feature that keeps students motivated during JEE prep (an 18-month journey).",
  "How would you balance ad-funded free tier vs paid tier for an edtech product in Bharat?",
];

const FAQS = [
  {
    q: "Is edtech a good PM career path in India right now?",
    a: "Mixed signal for 2026. Byju&apos;s collapse, Unacademy layoffs, and the broader edtech correction have made the sector more pragmatic but smaller. Upside: genuine learning problems still exist, PhysicsWallah-style lean models are winning, and adult learning/upskilling is growing fast. Trade-off: compensation has softened from the 2021 peaks, and career stability is lower than fintech or SaaS. Best for PMs who care about education as a mission, not as a compensation play.",
  },
  {
    q: "What&apos;s unique about edtech PM interviews?",
    a: "Interviewers probe for genuine understanding of learning science — how people actually learn, what drives retention, how to measure outcomes. Candidates who only talk about engagement (DAU, time-on-app) tend to underwhelm. Bonus if you can articulate the difference between knowledge, skill, and habit — and how product decisions affect each.",
  },
  {
    q: "Can consumer PMs transition to edtech easily?",
    a: "Yes — consumer PM skills transfer well. The harder pivot is understanding the content+product operating model. Edtech PMs work tightly with academic/curriculum teams, and decisions are often bottlenecked on teacher or content production capacity. Consumer PMs who join edtech and expect pure &apos;software velocity&apos; can get frustrated. Those who adapt to the content-first rhythm thrive.",
  },
];

export default function EdtechProductManagerPage() {
  const dates = pageDates("/edtech-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Edtech Product Manager", url: `${SITE_URL}/edtech-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Edtech Product Manager Guide (2026)",
        description: "The complete edtech PM guide for India. Top companies, unique learning product challenges, interview questions, and how engagement vs outcomes shapes edtech PM decisions.",
        image: `${SITE_URL}/api/og?title=Edtech+PM+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/edtech-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📚</span> Outcome-first PM work · Long feedback loops · Content-heavy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Edtech Product Manager Guide<br />(India 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Edtech product management is defined by one central tension: engagement versus
            outcomes, where a product can look addictive without actually improving learning —
            compounded by long feedback loops, diverging parent-versus-student incentives in K-12,
            and content that determines success more than UX. Byju&apos;s collapse and Unacademy
            layoffs cooled the 2021-era boom, but PhysicsWallah-style lean models and adult
            upskilling are still growing.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 top edtech companies, 6 unique learning product challenges,
            6 interview questions, and what makes edtech PM different from consumer tech.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Edtech PM Prep — Free →
          </Link>
        </section>

        {/* Companies */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Edtech Companies Hiring PMs in India</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPANIES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{c.company}</p>
                <p className="text-xs text-white/60">{c.focus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Unique Edtech PM Challenges</h2>
            <div className="space-y-3">
              {EDTECH_CHALLENGES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-white text-sm mb-1">{i + 1}. {c.challenge}</p>
                  <p className="text-xs text-white/60">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interview questions */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Edtech PM Interview Questions</h2>
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

        <RelatedPages slug="edtech-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Edtech PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on retention, learning outcomes, and content-product trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
