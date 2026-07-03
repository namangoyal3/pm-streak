import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "How to Become a Product Manager in India (2026 Roadmap) — PM Streak",
  description:
    "The complete 2026 roadmap for becoming a product manager in India. From zero to APM to Senior PM — skills, certifications, APM programs, portfolio, and how to crack your first PM interview.",
  keywords: [
    "how to become a product manager", "become a PM india", "product manager career path",
    "how to get into product management", "PM career switch", "APM program india",
    "product manager skills", "product management roadmap india 2026",
  ],
  alternates: { canonical: "/how-to-become-a-product-manager" },
  openGraph: {
    title: "How to Become a Product Manager in India (2026) — PM Streak",
    description: "The complete roadmap from zero to PM — skills, APM programs, portfolio, and interview prep.",
    url: `${SITE_URL}/how-to-become-a-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=How+to+Become+a+Product+Manager+in+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Become a Product Manager in India (2026) — PM Streak",
    description: "The complete roadmap from zero to PM — skills, APM programs, portfolio, and interview prep.",
    images: [`${SITE_URL}/api/og?title=How+to+Become+a+Product+Manager+in+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "Build the Foundation (Weeks 1–4)",
    icon: "🧱",
    steps: [
      "Read 'Inspired' by Marty Cagan — understand what a PM actually does",
      "Learn the core PM frameworks: RICE, Jobs To Be Done, north star metrics",
      "Start a product journal: every day, critique one app you use and suggest one improvement",
      "Follow 10 PMs on LinkedIn and read their posts actively",
    ],
  },
  {
    phase: "Phase 2",
    title: "Develop Product Thinking (Weeks 5–10)",
    icon: "🧠",
    steps: [
      "Do 3 product teardowns per week (write them up, share on LinkedIn)",
      "Complete a free PM course: Product School, Reforge free content, or Google PM certification",
      "Learn basic SQL — enough to write simple queries and understand funnels",
      "Start daily PM Streak lessons to build consistent product intuition",
    ],
  },
  {
    phase: "Phase 3",
    title: "Build Your Portfolio (Weeks 11–16)",
    icon: "📁",
    steps: [
      "Create 2–3 case studies: pick real products, diagnose a problem, propose a solution with metrics",
      "Build a simple product (no-code tool, landing page, or feature spec) and launch it",
      "Document your work: PRDs, user research notes, prioritisation decisions",
      "Get feedback from a practising PM — PM Streak's community connects you with mentors",
    ],
  },
  {
    phase: "Phase 4",
    title: "Crack the Interview (Weeks 17–24)",
    icon: "🎯",
    steps: [
      "Apply to APM programs (Flipkart, Razorpay, Google, Meesho, Swiggy, Zepto)",
      "Practice product sense, metrics, and execution questions daily",
      "Do 10+ mock interviews — get feedback on structure, user empathy, and decision-making",
      "Negotiate your offer: get competing offers, anchor on total comp, demonstrate your prep",
    ],
  },
];

const SKILLS = [
  { skill: "Product Thinking", description: "Identify user needs, frame problems, and design solutions from first principles.", importance: "Critical" },
  { skill: "Data Analysis", description: "Read dashboards, debug metric drops, design experiments, and make data-driven decisions.", importance: "Critical" },
  { skill: "Communication", description: "Write clear PRDs, give sharp presentations, and influence without authority.", importance: "Critical" },
  { skill: "Technical Literacy", description: "Understand APIs, databases, system design basics — enough to work with engineering.", importance: "High" },
  { skill: "User Research", description: "Run user interviews, synthesise insights, and validate assumptions cheaply.", importance: "High" },
  { skill: "Prioritisation", description: "RICE, ICE, MoSCoW — know when to use each and how to defend your stack-rank.", importance: "High" },
];

const FAQS = [
  {
    q: "Can I become a product manager without a tech background?",
    a: "Yes — and many of the best PMs come from non-technical backgrounds (consulting, design, operations, marketing). What matters is product thinking, user empathy, and data fluency — not whether you can code. Technical literacy (understanding how software works) helps, but is learnable.",
  },
  {
    q: "How long does it take to become a product manager?",
    a: "With focused effort, most people transition into their first PM role in 6–12 months. APM programs can accelerate this to 4–6 months with a strong portfolio and interview preparation. The key variable is consistency — PM Streak is built around daily practice for exactly this reason.",
  },
  {
    q: "What APM programs are available in India?",
    a: "Top APM programs in India include: Flipkart Product Accelerator, Razorpay APM, Google APMM India, Meesho PM program, Swiggy PM, and Zepto APM. Most recruit 2–3 times a year and require strong product sense, analytical thinking, and leadership examples. Competition is high (100–1000+ applicants per role).",
  },
  {
    q: "Do I need an MBA to become a product manager in India?",
    a: "No — many PMs at top Indian companies don't have MBAs. An MBA from IIM/ISB helps for senior roles and opens doors at consulting-heavy companies, but product-first companies (Razorpay, Swiggy, Flipkart) care more about portfolio and interview performance than pedigree.",
  },
];

export default function HowToBecomeAProductManagerPage() {
  const dates = pageDates("/how-to-become-a-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "How to Become a Product Manager", url: `${SITE_URL}/how-to-become-a-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Become a Product Manager in India",
        "description": "A 24-week roadmap for breaking into product management.",
        "totalTime": "P24W",
        "step": ROADMAP.map(r => ({
          "@type": "HowToSection",
          "name": r.title,
          "itemListElement": r.steps.map((s, i) => ({ "@type": "HowToStep", "position": i + 1, "text": s })),
        })),
      }} />
      <JsonLd data={articleSchema({
        headline: "How to Become a Product Manager in India (2026 Roadmap)",
        description: "The complete 2026 roadmap for becoming a product manager in India. From zero to APM to Senior PM — skills, certifications, APM programs, portfolio, and how to crack your first PM interview.",
        image: `${SITE_URL}/api/og?title=How+to+Become+a+Product+Manager+in+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/how-to-become-a-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🗺️</span> The most practical PM roadmap for India
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            How to Become a Product Manager<br />in India (2026 Roadmap)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Becoming a product manager in India takes roughly 6–12 months of focused effort —
            no MBA or tech background required. The path splits into four phases over 24 weeks:
            build foundations, develop product thinking through teardowns and courses, assemble
            a portfolio of case studies, then crack interviews via APM programs at companies
            like Flipkart, Razorpay, Google, and Swiggy.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            A concrete, week-by-week plan from zero to your first PM role — or from PM to Senior PM.
            No fluff. No expensive bootcamps required.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Daily PM Practice — Free →
          </Link>
        </section>

        {/* Roadmap */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The 24-Week PM Roadmap</h2>
          <div className="space-y-6">
            {ROADMAP.map((phase) => (
              <div key={phase.phase} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{phase.icon}</span>
                  <div>
                    <p className="text-xs text-[#89e219] font-medium uppercase tracking-wider">{phase.phase}</p>
                    <h3 className="font-bold text-white">{phase.title}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-[#58cc02] mt-0.5">→</span>
                      <span className="text-white/70">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Table */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Core PM Skills to Build</h2>
            <div className="space-y-4">
              {SKILLS.map(s => (
                <div key={s.skill} className="flex gap-4 bg-[#111] border border-white/10 rounded-xl p-4 items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">{s.skill}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${s.importance === "Critical" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                        {s.importance}
                      </span>
                    </div>
                    <p className="text-sm text-white/60">{s.description}</p>
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

        <RelatedPages slug="how-to-become-a-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">The Daily Habit That Gets You There</h2>
          <p className="text-white/60 mb-6">2 minutes every day. PM Streak builds the product instinct that gets you hired.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Your PM Journey — Free →
          </Link>
        </section>
      </main>
    </>
  );
}
