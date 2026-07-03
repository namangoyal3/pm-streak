import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Global vs India PM Roles (2026) — Which Should You Target?",
  description:
    "The real differences between global (US/EU) and India-based PM roles. Compensation, scope, career trajectory, and how to decide which path fits you.",
  keywords: [
    "global vs india PM", "US PM job from india",
    "remote PM india", "FAANG PM india",
    "PM compensation india vs US 2026",
  ],
  alternates: { canonical: "/pm-global-vs-india" },
  openGraph: {
    title: "Global vs India PM Roles 2026 — PM Streak",
    description: "Compensation, scope, trajectory — the real differences between global and India-based PM roles.",
    url: `${SITE_URL}/pm-global-vs-india`,
    images: [{ url: `${SITE_URL}/api/og?title=Global+vs+India+PM+Roles+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global vs India PM Roles 2026 — PM Streak",
    description: "Compensation, scope, trajectory — the real differences between global and India-based PM roles.",
    images: [`${SITE_URL}/api/og?title=Global+vs+India+PM+Roles+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISON = [
  { dim: "Compensation (senior level)", india: "₹50L–2Cr total", global: "$180K–$500K+ total (2–4x India at comparable level)" },
  { dim: "Scope per PM", india: "Often broader — you own more surface area", global: "Often narrower at large companies, deeper specialisation" },
  { dim: "Pace", india: "Faster iteration at startups and growth-stage companies", global: "More process-heavy at big companies, often slower ship cadence" },
  { dim: "User proximity", india: "Close to Indian users — huge if you care about this market", global: "Further from Indian users, often serving global/US markets" },
  { dim: "Learning from peers", india: "Growing rapidly but still smaller PM community", global: "Larger, more specialised PM talent pool, deeper mentorship" },
  { dim: "Work-life balance", india: "Varies — can be intense at Indian startups", global: "Generally better at US tech; EU is strongest" },
  { dim: "Career velocity", india: "Faster promotion cycles (2–3 years to senior)", global: "Slower promotion cycles (3–5 years to senior) but bigger scope at each level" },
];

const WHEN_TO_CHOOSE_INDIA = [
  "You care deeply about Indian users and the India market",
  "You want faster promotion cycles and more scope per year",
  "You value proximity to family, local community, and Indian founder ecosystem",
  "You want exposure to ambitious, fast-moving Indian startups",
  "You want cost-of-living advantages (save more even at lower absolute comp)",
];

const WHEN_TO_CHOOSE_GLOBAL = [
  "You want significantly higher absolute compensation (2–4x)",
  "You want deeper specialisation at larger scale",
  "You want exposure to global product thinking and mentorship",
  "You want work-life balance (especially at US/EU companies)",
  "You&apos;re interested in long-term moves to US/EU",
];

const HYBRID_PATHS = [
  "Remote US PM role from India — grows each year, 60–80% US comp",
  "India office of US tech company — 40–60% US comp, in-person PM community",
  "Indian tech with global ambitions (Razorpay, Freshworks) — India comp, global products",
  "Global consulting → PM at global company — 5-year path",
  "India tenure first → move to US — builds capital for later international move",
];

const FAQS = [
  {
    q: "Is it worth taking India comp over global comp if the role is otherwise similar?",
    a: "At mid-career, yes often. India comp at top Indian companies (₹50L–₹1Cr) is excellent for Indian cost of living and enables ambitious savings. Global comp is 2–4x higher but taxes + cost of living eat a large chunk. The real question is: where do you want to live? If the answer is India, Indian comp is competitive enough. If global, global comp wins.",
  },
  {
    q: "Can you get global PM experience without leaving India?",
    a: "Increasingly yes. Remote US roles from India are growing. India offices of global companies (Google India, Microsoft India, Adobe India) offer meaningful global scope. Indian companies with global ambitions (Freshworks, Razorpay, BrowserStack) ship products globally. You don&apos;t have to physically relocate to work on global products anymore — though the ceiling for US-equivalent comp is still higher for in-person US roles.",
  },
];

export default function PmGlobalVsIndiaPage() {
  const dates = pageDates("/pm-global-vs-india");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Global vs India PM", url: `${SITE_URL}/pm-global-vs-india` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Global vs India PM Roles (2026 Edition)",
        description: "The real differences between global (US/EU) and India-based PM roles. Compensation, scope, career trajectory, and how to decide which path fits you.",
        image: `${SITE_URL}/api/og?title=Global+vs+India+PM+Roles+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-global-vs-india`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🌏</span> Different paths. Different trade-offs. Honest comparison.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Global vs India PM Roles<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Global PM roles pay roughly 2–4x India roles at senior level ($180K–$500K+ versus
            ₹50L–2Cr) but come with narrower scope, slower promotion cycles (3–5 years to senior
            versus 2–3 in India), and more process. Neither wins outright — five hybrid paths
            exist, from remote US roles worked from India to Indian companies with global
            ambitions, letting PMs blend both trade-offs.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Prep for Both Paths Daily — Free →
          </Link>
        </section>

        {/* Comparison */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">India</th>
                  <th className="text-left py-3 px-4 text-[#89e219] font-medium">Global</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/50 text-xs">{row.dim}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.india}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.global}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When to choose each */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">When to Choose Each Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
                <p className="font-bold text-blue-400 mb-4">Choose India if...</p>
                <ul className="space-y-2">
                  {WHEN_TO_CHOOSE_INDIA.map((w, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-blue-400">→</span>
                      <span className="text-white/70">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-2xl p-6">
                <p className="font-bold text-[#89e219] mb-4">Choose Global if...</p>
                <ul className="space-y-2">
                  {WHEN_TO_CHOOSE_GLOBAL.map((w, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <span className="text-[#89e219]">→</span>
                      <span className="text-white/70">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hybrid paths */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Hybrid Paths</h2>
          <div className="space-y-2">
            {HYBRID_PATHS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-global-vs-india" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills That Work Anywhere</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios transfer across India and global roles — same craft, different contexts.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
