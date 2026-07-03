import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Product Manager Salary in India (2026) — By Level, Company & City",
  description:
    "Complete guide to PM salaries in India for 2026. Breakdown by level (APM to CPO), company (Google, Flipkart, Razorpay, startups), city (Bangalore, Mumbai, Delhi), and how to negotiate.",
  keywords: [
    "product manager salary india", "PM salary india 2026", "APM salary india",
    "senior PM salary india", "product manager salary bangalore", "PM salary flipkart",
    "product manager salary startups india", "how to negotiate PM salary india",
  ],
  alternates: { canonical: "/product-manager-salary-india" },
  openGraph: {
    title: "Product Manager Salary in India 2026 — PM Streak",
    description: "PM salary breakdown by level, company, and city in India for 2026. With negotiation tips.",
    url: `${SITE_URL}/product-manager-salary-india`,
    images: [{ url: `${SITE_URL}/api/og?title=Product+Manager+Salary+in+India+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Manager Salary in India 2026 — PM Streak",
    description: "PM salary breakdown by level, company, and city in India for 2026. With negotiation tips.",
    images: [`${SITE_URL}/api/og?title=Product+Manager+Salary+in+India+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const SALARY_DATA = [
  { level: "APM (0–2 yrs)", bangalore: "₹18–30L", mumbai: "₹16–26L", delhi: "₹15–24L", remote: "₹15–22L" },
  { level: "PM (2–5 yrs)", bangalore: "₹28–55L", mumbai: "₹24–48L", delhi: "₹22–44L", remote: "₹22–40L" },
  { level: "Senior PM (5–8 yrs)", bangalore: "₹50–90L", mumbai: "₹44–80L", delhi: "₹40–75L", remote: "₹40–70L" },
  { level: "Group PM / Director (8+ yrs)", bangalore: "₹90–150L", mumbai: "₹80–130L", delhi: "₹75–120L", remote: "₹70–110L" },
  { level: "VP / CPO", bangalore: "₹1.5–3Cr+", mumbai: "₹1.2–2.5Cr+", delhi: "₹1.2–2.2Cr+", remote: "₹1Cr+" },
];

const COMPANY_DATA = [
  { company: "Google India", apm: "₹28–35L", pm: "₹55–90L", spm: "₹1–1.5Cr" },
  { company: "Flipkart", apm: "₹25–32L", pm: "₹45–75L", spm: "₹80L–1.2Cr" },
  { company: "Razorpay", apm: "₹22–28L", pm: "₹40–65L", spm: "₹70L–1Cr" },
  { company: "Swiggy / Zomato", apm: "₹20–28L", pm: "₹38–60L", spm: "₹65–95L" },
  { company: "PhonePe / Paytm", apm: "₹18–25L", pm: "₹35–58L", spm: "₹60–90L" },
  { company: "Series A–B Startups", apm: "₹15–22L", pm: "₹28–50L", spm: "₹50–80L" },
  { company: "MNCs (non-FAANG)", apm: "₹16–24L", pm: "₹30–52L", spm: "₹55–85L" },
];

const FAQS = [
  {
    q: "What is the average product manager salary in India in 2026?",
    a: "The average PM salary in India in 2026 ranges from ₹18–55L depending on level and company. APMs at top companies earn ₹18–35L. Mid-level PMs (2–5 years) at product-led companies earn ₹28–55L. Senior PMs at unicorns and FAANG typically earn ₹50–90L+ all-in.",
  },
  {
    q: "Which city pays product managers the most in India?",
    a: "Bangalore consistently pays 15–20% more than Mumbai and Delhi for PM roles, driven by a higher concentration of product-first companies (Flipkart, Razorpay, Swiggy, Google India). However, remote roles from Delhi/Mumbai companies have narrowed this gap significantly post-2023.",
  },
  {
    q: "How do I negotiate a higher PM salary in India?",
    a: "Three levers work best: (1) Compete your offer — get at least two competing offers before negotiating. (2) Anchor on total comp, not base — ESOPs at growth-stage companies can 3–5x your base salary. (3) Demonstrate interview performance — PMs who can articulate clear product wins get 15–25% higher offers. PM Streak helps you sharpen exactly the signals that drive higher compensation.",
  },
  {
    q: "Do APM programs at Indian companies pay well?",
    a: "Yes — APM programs at top Indian product companies (Flipkart Accelerator, Razorpay APM, Google APMM India, Meesho PM) pay ₹20–35L as a starting package. They're competitive (100–1000+ applicants per role) but offer the fastest track to a PM career. PM Streak's structured prep is designed specifically for APM program candidates.",
  },
];

export default function ProductManagerSalaryIndiaPage() {
  const dates = pageDates("/product-manager-salary-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Salary India", url: `${SITE_URL}/product-manager-salary-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Product Manager Salary in India (2026 Guide)",
        description: "Complete guide to PM salaries in India for 2026. Breakdown by level (APM to CPO), company (Google, Flipkart, Razorpay, startups), city (Bangalore, Mumbai, Delhi), and how to negotiate.",
        image: `${SITE_URL}/api/og?title=Product+Manager+Salary+in+India+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/product-manager-salary-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>💰</span> Updated April 2026 · Based on 500+ offer data points
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Product Manager Salary in India<br />(2026 Guide)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            In 2026, product managers in India earn ₹18–55L on average depending on level:
            APMs at top companies take home ₹18–35L, mid-level PMs ₹28–55L, and Senior PMs at
            unicorns and FAANG ₹50–90L+ in total compensation. Bangalore pays 15–20% more than
            Mumbai or Delhi. The tables below break down ranges by level, company, and city.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Complete breakdown of PM salaries by level, company, and city — plus how to negotiate
            and what skills actually move the needle on your compensation.
          </p>
        </section>

        {/* Salary by Level & City */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold mb-6">Salary by Level & City</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-5 bg-[#16181c] border-b border-white/10 text-xs font-semibold text-white/50 uppercase tracking-wider">
              <div className="p-4">Level</div>
              <div className="p-4 text-center">Bangalore</div>
              <div className="p-4 text-center">Mumbai</div>
              <div className="p-4 text-center">Delhi NCR</div>
              <div className="p-4 text-center">Remote</div>
            </div>
            {SALARY_DATA.map((row, i) => (
              <div key={i} className={`grid grid-cols-5 text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? "" : "bg-[#16181c]"}`}>
                <div className="p-4 font-medium text-white">{row.level}</div>
                <div className="p-4 text-center text-green-400">{row.bangalore}</div>
                <div className="p-4 text-center text-white/70">{row.mumbai}</div>
                <div className="p-4 text-center text-white/70">{row.delhi}</div>
                <div className="p-4 text-center text-white/60">{row.remote}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3">All figures are total compensation (base + bonus + ESOPs annualised). Ranges represent 25th–75th percentile.</p>
        </section>

        {/* By Company */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold mb-6">Salary by Company (Bangalore)</h2>
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-[#16181c] border-b border-white/10 text-xs font-semibold text-white/50 uppercase tracking-wider">
              <div className="p-4">Company</div>
              <div className="p-4 text-center">APM</div>
              <div className="p-4 text-center">PM</div>
              <div className="p-4 text-center">Senior PM</div>
            </div>
            {COMPANY_DATA.map((row, i) => (
              <div key={i} className={`grid grid-cols-4 text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? "" : "bg-[#16181c]"}`}>
                <div className="p-4 font-medium text-white">{row.company}</div>
                <div className="p-4 text-center text-white/70">{row.apm}</div>
                <div className="p-4 text-center text-white/70">{row.pm}</div>
                <div className="p-4 text-center text-white/70">{row.spm}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
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

        <RelatedPages slug="product-manager-salary-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Land the PM Role. Negotiate the Salary.</h2>
          <p className="text-white/60 mb-6">PM Streak prepares you for interviews at every level — APM to Director.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
