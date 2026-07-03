import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Healthtech (2026) — Practo, Pharmeasy, Cult.fit PM Guide",
  description:
    "How PMs build healthtech products in India. Regulatory constraints, clinician workflows, patient trust, and the peculiar dynamics of health products.",
  keywords: [
    "PM healthtech", "Practo PM",
    "Pharmeasy PM", "Cult.fit PM", "healthtech india 2026",
  ],
  alternates: { canonical: "/pm-healthtech" },
  openGraph: {
    title: "PM Healthtech 2026 — PM Streak",
    description: "How PMs build healthtech products in India — regulatory, trust, clinicians.",
    url: `${SITE_URL}/pm-healthtech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Healthtech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Healthtech 2026 — PM Streak",
    description: "How PMs build healthtech products in India — regulatory, trust, clinicians.",
    images: [`${SITE_URL}/api/og?title=PM+Healthtech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Two users, always — patient and clinician have different needs and conflicting workflows",
  "Trust beats convenience — users will wait longer for a doctor they trust",
  "Regulatory environment shifts — telemedicine rules, data rules, pharmacy rules all evolve",
  "Reimbursement complexity — insurance, corporate tie-ups, and out-of-pocket mix",
  "Outcomes, not just engagement — a healthtech product that drives DAU but not health is a failure",
];

const COMPANIES = [
  "Practo — doctor discovery and telemedicine",
  "Pharmeasy / 1mg / Netmeds — online pharmacy",
  "Cult.fit — fitness and lifestyle health",
  "HealthifyMe — nutrition and coaching",
  "Apollo 24/7 / Tata 1mg — hospital-led platforms",
];

const QUESTIONS = [
  "Design a telemedicine flow for a first-time user in Tier-2 India",
  "How would you increase adherence to a 3-month medication regime?",
  "A doctor on your platform is getting bad reviews. Diagnose and design",
  "Design a feature that reduces diagnostic turnaround time by 50%",
];

const FAQS = [
  {
    q: "Is healthtech a good PM domain?",
    a: "High mission, high complexity, moderate pay. You&apos;ll work with regulations, clinical workflows, and life-impact decisions that most consumer PMs never encounter. Career paths branch into hospital systems, insurance, pharma tech, and health AI. Not for PMs who want to ship a feature a week with minimal oversight.",
  },
];

export default function PmHealthtechPage() {
  const dates = pageDates("/pm-healthtech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Healthtech", url: `${SITE_URL}/pm-healthtech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Healthtech (India Edition)",
        description:
          "How PMs build healthtech products in India. Regulatory constraints, clinician workflows, patient trust, and the peculiar dynamics of health products.",
        image: `${SITE_URL}/api/og?title=PM+Healthtech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-healthtech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏥</span> Two users, conflicting workflows, life-impact decisions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Healthtech<br />(India Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            A healthtech PM designs for two users with conflicting workflows at once — the patient and the clinician — while shifting telemedicine, data, and pharmacy regulations reshape what&apos;s even permitted; trust outweighs convenience, reimbursement blends insurance with out-of-pocket payment, and the real success signal is patient outcomes rather than engagement, across platforms like Practo, Pharmeasy, and HealthifyMe.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics, 5 companies, 4 interview-style questions for healthtech PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Healthtech PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Dynamics</h2>
          <div className="space-y-2">
            {DYNAMICS.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Companies to Know</h2>
            <div className="space-y-2">
              {COMPANIES.map((c, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Interview Questions</h2>
          <div className="space-y-2">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-white/30 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{q}</p>
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

        <RelatedPages slug="pm-healthtech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Healthtech PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
