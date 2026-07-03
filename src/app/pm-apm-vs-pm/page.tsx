import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "APM vs PM (2026) — How They Differ &amp; Which to Target",
  description:
    "APM vs PM — the real differences in scope, expectations, compensation, and promotion timeline. Which should you target based on your background?",
  keywords: [
    "APM vs PM", "APM product manager",
    "associate product manager vs pm",
    "APM career path", "PM I vs PM II 2026",
  ],
  alternates: { canonical: "/pm-apm-vs-pm" },
  openGraph: {
    title: "APM vs PM 2026 — PM Streak",
    description: "Real differences between APM and PM roles — scope, compensation, career path.",
    url: `${SITE_URL}/pm-apm-vs-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=APM+vs+PM+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "APM vs PM 2026 — PM Streak",
    description: "Real differences between APM and PM roles — scope, compensation, career path.",
    images: [`${SITE_URL}/api/og?title=APM+vs+PM+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISON = [
  { dim: "Typical experience", apm: "0–2 years (often fresh grad or new to PM)", pm: "2–4 years across PM or adjacent roles" },
  { dim: "Scope", apm: "One feature area under guidance", pm: "A product area or squad, own OKRs" },
  { dim: "Autonomy", apm: "Guided — manager reviews key decisions", pm: "Independent — you own the call within your area" },
  { dim: "Mentorship", apm: "Heavy mentorship expected from manager", pm: "Coaching when needed; not continuous" },
  { dim: "Compensation (India)", apm: "₹18–40L total", pm: "₹28–70L total" },
  { dim: "Promotion pace", apm: "APM → PM in 18–24 months (structured programs)", pm: "PM → Senior PM in 2–3 years" },
  { dim: "What&apos;s being assessed", apm: "Raw potential, thinking quality, intellectual curiosity", pm: "Demonstrated impact, judgment, cross-functional leadership" },
];

const APM_PATHS = [
  "Fresh graduate from IIT/IIM/BITS or top engineering colleges",
  "Engineering grad with 1–2 years of SWE experience transitioning to PM",
  "MBA graduate targeting PM as first role (common via APM programs)",
  "Consulting analyst or associate pivoting to tech PM",
  "Designer or researcher ready to move into product decisions",
];

const PM_PATHS = [
  "APM who&apos;s ready for independent ownership after 18–24 months",
  "Engineer with 3–5 years who&apos;s consistently done PM-adjacent work",
  "Consultant at MBB/tier-1 firm after 2–3 years who can point to operator-style work",
  "PM at a smaller company moving to a larger one (often a level calibration down)",
  "Product designer or researcher at senior level moving to PM track",
];

const FAQS = [
  {
    q: "Should I target APM or PM for my first PM role?",
    a: "Depends on your experience. Fresh grads and career switchers should target APM — structured programs give mentorship, peer cohort, and calibrated expectations. 3+ years of adjacent experience (engineering, consulting) should target PM directly. Trying to get a direct PM role with no PM experience often fails at top companies; APM is the easier path in.",
  },
  {
    q: "Is APM compensation significantly lower than PM?",
    a: "Yes — often 30–50% lower in total compensation. But APM roles offer structured development, rotation opportunities, and faster promotion paths. The 18–24 month APM period accelerates career capital more than being &apos;underlevelled&apos; as a PM at a company that won&apos;t invest in your development. Short-term comp sacrifice often produces long-term comp gain.",
  },
  {
    q: "Is APM stigmatised later in a PM career?",
    a: "Opposite — APM program alumni from Google, Flipkart, Razorpay, Microsoft are highly valued. It&apos;s a credential that signals structured PM training. Hiring managers often prefer APM alumni over self-taught PMs for mid-level roles because the training rigour shows.",
  },
];

export default function PmApmVsPmPage() {
  const dates = pageDates("/pm-apm-vs-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "APM vs PM", url: `${SITE_URL}/pm-apm-vs-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "APM vs PM (2026 Edition)",
        description: "APM vs PM — the real differences in scope, expectations, compensation, and promotion timeline. Which should you target based on your background?",
        image: `${SITE_URL}/api/og?title=APM+vs+PM+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-apm-vs-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📊</span> APM is a training ground. PM is the real job.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            APM vs PM<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Side by side, APM and PM differ in scope, autonomy, and pay: an APM typically has
            0–2 years of experience, owns one feature area under guidance, and earns ₹18–40L,
            while a PM has 2–4 years, owns a product area independently, and earns ₹28–70L. Most
            APMs promote to PM within 18–24 months in structured programs.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start PM Prep Daily — Free →
          </Link>
        </section>

        {/* Comparison */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">APM vs PM Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">APM</th>
                  <th className="text-left py-3 px-4 text-[#89e219] font-medium">PM</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/50 text-xs">{row.dim}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.apm}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.pm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Who targets APM */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Who Should Target APM</h2>
            <div className="space-y-2">
              {APM_PATHS.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-blue-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who targets PM */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">Who Should Target PM Directly</h2>
          <div className="space-y-2">
            {PM_PATHS.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{p}</p>
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

        <RelatedPages slug="pm-apm-vs-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Prep for Either Path Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios sharpen the thinking both APM and PM interviews test.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
