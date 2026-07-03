import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Manager Career Path (2026) — APM to CPO Roadmap",
  description:
    "The complete PM career path from APM to CPO. What each level requires, how to get promoted, salaries at every stage, and how to accelerate your PM career in India.",
  keywords: [
    "product manager career path", "PM career progression", "APM to CPO",
    "product manager levels", "how to get promoted as PM",
    "PM career roadmap india", "product manager career growth 2026",
  ],
  alternates: { canonical: "/product-manager-career-path" },
  openGraph: {
    title: "Product Manager Career Path 2026 — APM to CPO | PM Streak",
    description: "What each PM level requires, promotion criteria, and salaries from APM to CPO.",
    url: `${SITE_URL}/product-manager-career-path`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+Career+Path+2026++APM+to+CPO++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Career Path 2026 — APM to CPO | PM Streak",
    description: "What each PM level requires, promotion criteria, and salaries from APM to CPO.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+Career+Path+2026++APM+to+CPO++PM+Streak`],
    site: "@pmstreak",
  },
};

const LEVELS = [
  {
    title: "Associate Product Manager (APM)",
    years: "0–2 years",
    salary: "₹18–32L",
    scope: "One feature area, one squad",
    owns: ["Feature backlog", "Sprint planning", "User stories", "Basic analytics"],
    promoted: "Consistent delivery, proactive user research, handles execution without hand-holding",
    typical: "Fresh grad from IIT/IIM/BITS, or engineer/consultant transitioning into PM",
  },
  {
    title: "Product Manager (PM)",
    years: "2–5 years",
    salary: "₹28–55L",
    scope: "One product or product area, cross-functional team",
    owns: ["Quarterly roadmap", "OKRs for the area", "Stakeholder alignment", "Launch strategy"],
    promoted: "Ships high-impact features, moves metrics, develops opinions and defends them with data",
    typical: "APM promotion or lateral hire from adjacent domain",
  },
  {
    title: "Senior Product Manager (Sr. PM)",
    years: "4–8 years",
    salary: "₹50–90L",
    scope: "Large product area or multiple squads",
    owns: ["12-month vision", "Multi-team coordination", "Mentoring junior PMs", "Cross-org influence"],
    promoted: "Sets direction beyond their immediate team, grows other PMs, solves ambiguous problems",
    typical: "Strong PM with clear strategic thinking and leadership signals",
  },
  {
    title: "Group Product Manager / Principal PM",
    years: "7–12 years",
    salary: "₹80–140L",
    scope: "Full product line or major business unit",
    owns: ["Multi-year strategy", "PM team hiring and development", "Executive stakeholder management"],
    promoted: "Defines the product vision, builds and scales a PM team, measurably impacts company strategy",
    typical: "Senior PM with proven track record of growing other PMs and shipping multi-team initiatives",
  },
  {
    title: "Director of Product / VP of Product",
    years: "10–15 years",
    salary: "₹1.2–2.5Cr",
    scope: "Multiple product lines or an entire domain (e.g., Payments, Consumer)",
    owns: ["Business unit P&L", "Org design", "C-suite product strategy", "M&A inputs"],
    promoted: "Organisation-building, business outcomes, company-level influence",
    typical: "Senior GPM or Principal PM at a high-growth company",
  },
  {
    title: "Chief Product Officer (CPO)",
    years: "15+ years",
    salary: "₹2–6Cr+ (often equity-heavy)",
    scope: "All product at the company",
    owns: ["Company product strategy", "Product org culture", "Board-level product narrative"],
    promoted: "N/A — CPO is typically a hire or founder",
    typical: "VP of Product from a scaled company, or founder with product DNA",
  },
];

const ACCELERATORS = [
  { action: "Ship something that moves a north star metric", why: "Proves business impact, not just feature delivery" },
  { action: "Get visibility with senior leadership through a well-written strategy doc", why: "Promotion decisions happen above your direct manager" },
  { action: "Mentor a junior PM or intern", why: "Leadership signal that separates PM from Senior PM" },
  { action: "Volunteer for the ambiguous, cross-functional problem no one owns", why: "Shows you can operate above your level" },
  { action: "Build a habit of user research — not just data", why: "The best PMs develop instinct from qualitative insight, not just dashboards" },
  { action: "Develop a public point of view (write, speak, post)", why: "External credibility accelerates internal credibility" },
];

const FAQS = [
  {
    q: "How fast can you become a Senior PM in India?",
    a: "4–6 years is typical. APM programs (Flipkart, Razorpay, Google) fast-track exceptional candidates to PM level in 18–24 months, and some reach Senior PM in 4 years. The main accelerators: consistent metric impact, visible leadership, and a track record of growing other PMs.",
  },
  {
    q: "Is an MBA required for a PM career in India?",
    a: "No — but it helps at certain companies and levels. IIM/ISB MBAs get strong hiring signals at traditional tech companies and conglomerates. Product-first companies (Razorpay, CRED, Zepto) care more about product sense and analytical skill than pedigree. An MBA is more useful for breaking into PM from a non-tech role than for accelerating from PM to CPO.",
  },
  {
    q: "What's the difference between a PM at a startup vs a large company?",
    a: "At a startup (Series A–C): you own more surface area, move faster, and build more from scratch — but metrics are noisier and processes are ad hoc. At a large company (Flipkart, Google, Swiggy): deeper specialisation, clearer career ladder, better benchmarking — but slower decisions and more stakeholder complexity. Early-career PMs often learn more at mid-stage startups (Series B–C) where there's enough structure to learn from, but enough chaos to develop judgment.",
  },
];

export default function ProductManagerCareerPathPage() {
  const dates = pageDates("/product-manager-career-path");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Product Manager Career Path", url: `${SITE_URL}/product-manager-career-path` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager Career Path (2026 Edition)",
        description:
          "The complete PM career path from APM to CPO. What each level requires, how to get promoted, salaries at every stage, and how to accelerate your PM career in India.",
        image: `${SITE_URL}/api/og?title=Product+Manager+Career+Path+2026++APM+to+CPO++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-career-path`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📈</span> APM to CPO — every level, every milestone
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager Career Path<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            The PM career path runs through six levels: Associate Product Manager (0–2 years, ₹18–32L in India),
            Product Manager, Senior PM, Group/Principal PM, Director or VP of Product, and Chief Product Officer
            (15+ years, ₹2–6Cr+). Reaching Senior PM typically takes 4–6 years, and promotions hinge on metric
            impact, visible leadership, and growing other PMs — not tenure alone.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            What each PM level requires, how to get promoted, salaries at every stage,
            and the moves that accelerate your career faster than tenure alone.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Building Your PM Career — Free →
          </Link>
        </section>

        {/* Career ladder */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The PM Career Ladder</h2>
          <div className="space-y-5">
            {LEVELS.map((level, i) => (
              <div key={level.title} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#58cc02]/20 text-[#89e219] text-xs flex items-center justify-center font-bold">{i + 1}</span>
                      <h3 className="text-lg font-bold text-white">{level.title}</h3>
                    </div>
                    <p className="text-sm text-white/40">{level.typical}</p>
                  </div>
                  <div className="flex gap-3 text-xs flex-shrink-0">
                    <span className="bg-[#1f2228] border border-white/10 rounded-full px-3 py-1 text-white/60">{level.years}</span>
                    <span className="bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400">{level.salary}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Scope</p>
                    <p className="text-white/70">{level.scope}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-1.5">Owns</p>
                    <ul className="space-y-0.5">
                      {level.owns.map((o, j) => <li key={j} className="text-white/60 text-xs">• {o}</li>)}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                    <p className="text-xs text-[#89e219] mb-1">🚀 Promoted when</p>
                    <p className="text-white/60 text-xs">{level.promoted}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career accelerators */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-3">6 Moves That Accelerate PM Promotions</h2>
            <p className="text-white/60 text-center mb-8">Tenure matters less than visibility, impact, and operating above your level.</p>
            <div className="space-y-4">
              {ACCELERATORS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4 flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-medium text-white text-sm mb-1">{a.action}</p>
                    <p className="text-xs text-white/50">{a.why}</p>
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

        <RelatedPages slug="product-manager-career-path" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Level Up Your PM Career Daily</h2>
          <p className="text-white/60 mb-6">2-minute lessons calibrated to your current level and the skills you need for the next one.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
