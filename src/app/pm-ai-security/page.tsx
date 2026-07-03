import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM AI Security (2026) — SOC AI, Threat Detection, AI Red Teams",
  description:
    "How PMs build AI security products. Autonomous SOC, threat detection, and how security PM is adapting to AI-powered adversaries.",
  keywords: [
    "PM AI security", "SOC AI",
    "autonomous security 2026",
  ],
  alternates: { canonical: "/pm-ai-security" },
  openGraph: {
    title: "PM AI Security 2026 — PM Streak",
    description: "How PMs build AI security products.",
    url: `${SITE_URL}/pm-ai-security`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+AI+Security+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM AI Security 2026 — PM Streak",
    description: "How PMs build AI security products.",
    images: [`${SITE_URL}/api/og?title=PM+AI+Security+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const DYNAMICS = [
  "Adversaries use AI too — offensive capability is rising fast",
  "Alert triage is the biggest SOC win — AI reduces noise dramatically",
  "Autonomous response is controversial — humans still gate high-impact actions",
  "AI red-teaming is a new category — probing model and prompt vulnerabilities",
  "Model supply chain security is a new concern — adversarial fine-tuning, data poisoning",
];

const METRICS = [
  "Alert reduction percentage",
  "Mean time to detect / respond",
  "False positive rate",
  "Coverage across MITRE ATT&amp;CK tactics",
  "Analyst satisfaction with AI triage",
];

const FAQS = [
  {
    q: "Is the SOC headed toward autonomy or AI-assisted?",
    a: "AI-assisted for another 3–5 years, then selective autonomy on low-risk actions. Full SOC autonomy requires too much trust in probabilistic systems to be acceptable soon. The most defensible product bet: AI handling the 80% of routine triage, humans handling the 20% requiring judgment.",
  },
];

export default function PmAiSecurityPage() {
  const dates = pageDates("/pm-ai-security");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM AI Security", url: `${SITE_URL}/pm-ai-security` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM AI Security (2026 Edition)",
        description:
          "How PMs build AI security products. Autonomous SOC, threat detection, and how security PM is adapting to AI-powered adversaries.",
        image: `${SITE_URL}/api/og?title=PM+AI+Security+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-security`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> AI is on both sides of the firewall now
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM AI Security<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            AI security products mostly assist analysts rather than replace them: alert triage is the clearest win, autonomous response stays human-gated, and adversaries are now using AI too. Full SOC autonomy is unlikely for another three to five years, so the safer product bet lets AI absorb routine triage while humans keep judgment over false positives, detection speed, and ATT&amp;CK coverage.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 dynamics and 5 metrics for AI security PMs.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Security PM Skills — Free →
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
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
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

        <RelatedPages slug="pm-ai-security" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Security PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
