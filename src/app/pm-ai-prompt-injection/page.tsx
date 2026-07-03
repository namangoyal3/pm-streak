import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Prompt Injection Defense (2026) — Securing AI Products",
  description:
    "How PMs design defenses against prompt injection. Direct, indirect, and exfiltration attacks — and what mitigations actually work.",
  keywords: [
    "PM prompt injection", "AI security PM 2026",
  ],
  alternates: { canonical: "/pm-ai-prompt-injection" },
  openGraph: {
    title: "PM Prompt Injection Defense 2026 — PM Streak",
    description: "Securing AI products against prompt injection.",
    url: `${SITE_URL}/pm-ai-prompt-injection`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Prompt+Injection+Defense+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Prompt Injection Defense 2026 — PM Streak",
    description: "Securing AI products against prompt injection.",
    images: [`${SITE_URL}/api/og?title=PM+Prompt+Injection+Defense+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const ATTACKS = [
  "Direct injection — user types adversarial prompt",
  "Indirect injection — adversarial content in docs the agent reads",
  "Exfiltration — trick agent into leaking secrets",
  "Tool abuse — convince agent to call dangerous tools",
];

const DEFENSES = [
  "System prompt isolation — separate trusted from untrusted input",
  "Input classifiers — flag adversarial patterns",
  "Output filtering — block sensitive data leakage",
  "Tool-call whitelisting — explicit allow lists",
  "Human approval for high-impact actions",
];

const FAQS = [
  {
    q: "Can prompt injection be fully solved?",
    a: "No — like SQL injection, it&apos;s an architectural challenge that requires defense in depth. Mitigations reduce risk; they don&apos;t eliminate it. PMs designing AI products should treat prompt injection as a permanent risk to manage, not a bug to fix.",
  },
];

export default function PmAiPromptInjectionPage() {
  const dates = pageDates("/pm-ai-prompt-injection");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Prompt Injection", url: `${SITE_URL}/pm-ai-prompt-injection` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Prompt Injection Defense (2026 Edition)",
        description:
          "How PMs design defenses against prompt injection. Direct, indirect, and exfiltration attacks — and what mitigations actually work.",
        image: `${SITE_URL}/api/og?title=PM+Prompt+Injection+Defense+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-ai-prompt-injection`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🛡️</span> Prompt injection is permanent risk — manage it, don&apos;t fix it
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Prompt Injection Defense<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Four attack patterns threaten AI products — direct injection from user prompts, indirect injection buried in documents the agent reads, exfiltration attempts that trick the agent into leaking secrets, and tool abuse that convinces the agent to call dangerous functions — and the defense stack that PMs should require spans system-prompt isolation, input classifiers, output filtering, tool-call whitelisting, and human approval for high-impact actions.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            4 attack types and 5 defense layers.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build AI Security PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Attack Types</h2>
          <div className="space-y-2">
            {ATTACKS.map((a, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Defenses</h2>
            <div className="space-y-2">
              {DEFENSES.map((d, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-ai-prompt-injection" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice AI Security Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
