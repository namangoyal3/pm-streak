import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM at Startup vs Big Tech (2026) — Which Should You Choose?",
  description:
    "PM at startup vs big tech — real differences in scope, speed, compensation, career trajectory, and when each is the right choice.",
  keywords: [
    "startup PM vs big tech", "PM career choice",
    "FAANG vs startup PM", "early stage PM",
    "PM job choice 2026",
  ],
  alternates: { canonical: "/pm-startup-vs-big-tech" },
  openGraph: {
    title: "PM at Startup vs Big Tech 2026 — PM Streak",
    description: "Real differences between startup PM and big tech PM — scope, speed, comp, career.",
    url: `${SITE_URL}/pm-startup-vs-big-tech`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+at+Startup+vs+Big+Tech+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM at Startup vs Big Tech 2026 — PM Streak",
    description: "Real differences between startup PM and big tech PM — scope, speed, comp, career.",
    images: [`${SITE_URL}/api/og?title=PM+at+Startup+vs+Big+Tech+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISON = [
  { dim: "Scope per PM", startup: "Broad — entire product area or more", bigtech: "Narrow — specific surface or feature" },
  { dim: "Speed", startup: "Fast iteration; decisions in days", bigtech: "Slower; cross-team alignment takes weeks" },
  { dim: "Mentorship", startup: "Limited — often self-directed learning", bigtech: "Rich — senior PM peers everywhere" },
  { dim: "Compensation", startup: "Lower cash, higher equity upside (+risk)", bigtech: "Higher cash, vested equity, more stable" },
  { dim: "Learning rate", startup: "Faster — more scope, more context switching", bigtech: "Deeper — more resources, specialised expertise" },
  { dim: "Job security", startup: "Low — companies fail", bigtech: "Higher but not immune to layoffs" },
  { dim: "Brand value", startup: "Depends on company success", bigtech: "Strong resume credential regardless" },
];

const WHEN_STARTUP = [
  "You want maximum scope and responsibility fast",
  "You can tolerate risk — company might fail, comp might disappoint",
  "You thrive on ambiguity and no playbook",
  "You want to see your decisions directly affect business outcomes",
  "You&apos;re earlier in career and can take the risk",
];

const WHEN_BIG_TECH = [
  "You want to learn craft from senior PMs around you",
  "You value stable, predictable compensation",
  "You want brand credential on your resume",
  "You want to work on scale problems (100M+ users)",
  "You value work-life balance and clear career paths",
];

const HYBRID_STRATEGIES = [
  "Early career at big tech, then startup — build foundation first, then take risks",
  "Startup → big tech — if startup doesn&apos;t work out, big tech is often receptive",
  "Big tech → startup (founder) — scale experience helps you avoid startup mistakes",
  "Alternating — some PMs do 2 years big tech, 2 years startup, repeatedly",
  "Big tech full career — some PMs stay in big tech and do great work at scale",
];

const FAQS = [
  {
    q: "Should early-career PMs start at startups or big tech?",
    a: "Most benefit from big tech first. You learn craft, see good PM patterns, get mentorship, and build a resume. Then at 4–6 years experience, startups offer bigger scope. The reverse path (startup → big tech) is harder because big tech processes can feel bureaucratic after startup chaos.",
  },
  {
    q: "Is compensation really that different?",
    a: "Yes. Top big tech PM comp in India is ₹60L–1.5Cr+; startup PM cash comp is often ₹30–80L with equity upside. Startup equity can be worth much more IF the company succeeds. Most startups fail; most big tech comp is real cash. Expected value calculation depends on your risk tolerance.",
  },
];

export default function PmStartupVsBigTechPage() {
  const dates = pageDates("/pm-startup-vs-big-tech");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Startup vs Big Tech", url: `${SITE_URL}/pm-startup-vs-big-tech` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM at Startup vs Big Tech (2026 Edition)",
        description:
          "PM at startup vs big tech — real differences in scope, speed, compensation, career trajectory, and when each is the right choice.",
        image: `${SITE_URL}/api/og?title=PM+at+Startup+vs+Big+Tech+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-startup-vs-big-tech`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Different trade-offs. Neither is universally better.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM at Startup vs Big Tech<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Startup PMs get broad scope, fast iteration, and equity upside with lower cash and job
            security, while big-tech PMs get narrower scope, richer mentorship, and higher stable
            cash — pick startup if you want ambiguity and outsized responsibility early, or big tech
            if you want craft mentorship and brand credential. Many PMs blend both, starting at big
            tech before taking startup risk once the foundation is built.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7-dimension comparison, 5 signs to choose startup, 5 signs to choose big tech, and 5 hybrid career paths.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Skills for Both — Free →
          </Link>
        </section>

        {/* Comparison */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-orange-400 font-medium">Startup</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">Big Tech</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/50 text-xs">{row.dim}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.startup}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.bigtech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* When startup */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs to Choose Startup</h2>
            <div className="space-y-2">
              {WHEN_STARTUP.map((w, i) => (
                <div key={i} className="bg-[#111] border border-orange-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-orange-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When big tech */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signs to Choose Big Tech</h2>
          <div className="space-y-2">
            {WHEN_BIG_TECH.map((w, i) => (
              <div key={i} className="bg-[#111] border border-blue-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-blue-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hybrid */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Hybrid Career Paths</h2>
            <div className="space-y-2">
              {HYBRID_STRATEGIES.map((h, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{h}</p>
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

        <RelatedPages slug="pm-startup-vs-big-tech" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Skills for Any Company</h2>
          <p className="text-white/60 mb-6">Daily scenarios that work for startup-speed or big-tech-scale decisions.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
