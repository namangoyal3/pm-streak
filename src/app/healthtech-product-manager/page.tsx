import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Healthtech Product Manager Guide (2026) — How to Become a Healthtech PM in India",
  description:
    "The complete healthtech PM playbook for India. Top companies, unique domain challenges, regulatory context, interview questions, and how to break into healthtech PM.",
  keywords: [
    "healthtech product manager india", "digital health PM",
    "how to become healthtech PM", "PharmEasy PM interview",
    "Practo PM", "healthcare PM india 2026",
  ],
  alternates: { canonical: "/healthtech-product-manager" },
  openGraph: {
    title: "Healthtech PM Guide 2026 — PM Streak",
    description: "Healthtech PM in India — companies, domain challenges, and how to break in.",
    url: `${SITE_URL}/healthtech-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Healthtech+PM+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthtech PM Guide 2026 — PM Streak",
    description: "Healthtech PM in India — companies, domain challenges, and how to break in.",
    images: [`${SITE_URL}/api/og?title=Healthtech+PM+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPANIES = [
  { company: "PharmEasy", focus: "Online pharmacy, lab tests, medicine delivery. B2C + B2B (retailers)." },
  { company: "Tata 1mg", focus: "Pharmacy, diagnostics, teleconsultation. Tata ecosystem backing." },
  { company: "Practo", focus: "Doctor discovery, teleconsult, clinic software, Ray EMR." },
  { company: "Cult.fit / cure.fit", focus: "Fitness, mental wellness, food, doctor consultations. Multi-vertical wellness." },
  { company: "MedPlus", focus: "Pharmacy retail + online. Listed company, strong Tier-2/3 presence." },
  { company: "HealthifyMe", focus: "Weight loss, nutrition, AI-coach products. Heavy on content + community." },
  { company: "HealthKart", focus: "Nutrition supplements e-commerce. Specialised D2C health brand play." },
  { company: "Pristyn Care", focus: "Elective surgery platform — hospital partnerships + patient navigation." },
];

const DOMAIN_CHALLENGES = [
  { challenge: "Trust is everything", detail: "Users are trusting you with their health. Small UX mistakes that would be fine in e-commerce can destroy trust in healthtech — wrong dosage shown, inaccurate lab result display, unclear doctor credentials." },
  { challenge: "Regulatory complexity", detail: "DPDP Act for data, RBI for payments, state-wise pharmacy licenses, drug scheduling rules, digital health regulations (ABDM/NDHM). PMs must work closely with legal from day one." },
  { challenge: "Multi-sided trust", detail: "Patients, doctors, pharmacies, diagnostic labs, hospitals — each with different incentives. PMs must design for all without favouring one." },
  { challenge: "Prescription & regulated drug workflows", detail: "Selling scheduled drugs requires valid prescriptions, pharmacist verification, and audit trails. Product flows are significantly more complex than generic e-commerce." },
  { challenge: "Outcomes vs transactions", detail: "In traditional e-commerce, a delivered order is the outcome. In healthtech, the real outcome is improved health — harder to measure and longer feedback loops." },
];

const INTERVIEW_QUESTIONS = [
  "How would you improve teleconsultation for first-time users in Tier-2 cities?",
  "Design a product to increase chronic medication refill adherence for diabetes patients.",
  "Lab test cart abandonment is high. Diagnose and propose fixes.",
  "How would you think about building a mental health product for India, where stigma is significant?",
  "Design a flow to verify doctor credentials for a teleconsultation platform.",
  "How would you measure success for a health-tracking feature in a wellness app?",
];

const BREAK_IN_TIPS = [
  "Learn the basics of Indian healthcare — ABDM/NDHM, pharmacy licensing, teleconsult regulations, drug scheduling",
  "Follow healthtech-specific newsletters (ET HealthWorld, Inc42 Health vertical) and India healthtech podcasts",
  "Do product teardowns of PharmEasy, 1mg, Practo — what makes each product work or fail",
  "Build domain knowledge in one sub-sector (pharmacy vs teleconsult vs diagnostics) rather than trying to cover all",
  "Talk to patients and doctors — most PMs never do this and the insights are disproportionately valuable",
  "Start with a startup if APM slots are hard — healthtech startups hire more on potential than pedigree",
];

const FAQS = [
  {
    q: "Is healthtech a good PM career path in India?",
    a: "It&apos;s a high-growth, high-impact space but with meaningful trade-offs. Upside: large problem space, meaningful work, growing funding, long runway as healthcare digitises. Trade-offs: slower iteration than pure consumer tech (regulatory + trust make things slower), salary is generally 10–20% below comparable consumer tech roles at mid-levels (though catching up), and domain depth takes longer to build. Best for PMs who care about impact over speed.",
  },
  {
    q: "Do I need a medical background to be a healthtech PM?",
    a: "Not required, but domain learning is mandatory. Many successful healthtech PMs come from consumer tech, engineering, or e-commerce backgrounds. The learning curve is 4–8 months to be credible — you need to understand clinical workflows, regulatory landscape, and the real user personas (patients, caregivers, doctors, pharmacies). Medical background holders (MBBS + MBA is a common path) have an advantage for clinical products specifically.",
  },
  {
    q: "How does healthtech PM salary compare to other Indian tech?",
    a: "Mid-career healthtech PMs at top companies (PharmEasy, Practo, 1mg) earn roughly ₹25L–70L, broadly in line with consumer tech but sometimes 10–15% below top fintech/SaaS. At senior+ levels, healthtech compensation converges with consumer tech. Equity upside varies — listed (MedPlus) vs unlisted (PharmEasy, Practo) creates very different compensation profiles.",
  },
];

export default function HealthtechProductManagerPage() {
  const dates = pageDates("/healthtech-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Healthtech Product Manager", url: `${SITE_URL}/healthtech-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Healthtech Product Manager Guide (2026)",
        description: "The complete healthtech PM playbook for India. Top companies, unique domain challenges, regulatory context, interview questions, and how to break into healthtech PM.",
        image: `${SITE_URL}/api/og?title=Healthtech+PM+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/healthtech-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚕️</span> Trust-first PM work · Regulated · High impact
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Healthtech PM Guide<br />(India 2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Healthtech product management in India centres on companies like PharmEasy, Tata 1mg,
            Practo, Cult.fit, and Pristyn Care, where trust, regulatory complexity (DPDP, RBI,
            ABDM/NDHM), multi-sided incentives, and prescription workflows make the work
            slower-moving than consumer tech — though mid-career PMs at top firms still earn
            roughly ₹25L–70L.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 top healthtech companies, 5 unique domain challenges, 6 interview questions,
            and how to break into healthtech PM roles in India.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Healthtech PM Prep — Free →
          </Link>
        </section>

        {/* Companies */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Healthtech Companies Hiring PMs in India</h2>
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
            <h2 className="text-2xl font-bold text-center mb-10">5 Unique Healthtech PM Challenges</h2>
            <div className="space-y-3">
              {DOMAIN_CHALLENGES.map((c, i) => (
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
          <h2 className="text-2xl font-bold text-center mb-10">Healthtech PM Interview Questions</h2>
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

        {/* Break in tips */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Ways to Break Into Healthtech PM</h2>
            <div className="space-y-2">
              {BREAK_IN_TIPS.map((t, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
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

        <RelatedPages slug="healthtech-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Healthtech PM Domain Depth Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on trust, regulatory, and multi-sided healthtech product decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
