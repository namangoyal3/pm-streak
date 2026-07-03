import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Accessibility (2026) — How PMs Ship Accessible Products",
  description:
    "How PMs approach accessibility without slowing shipping. WCAG basics, screen reader testing, and the business case for accessible products.",
  keywords: [
    "PM accessibility", "a11y PM",
    "WCAG product manager", "accessible product 2026",
  ],
  alternates: { canonical: "/pm-accessibility" },
  openGraph: {
    title: "PM Accessibility 2026 — PM Streak",
    description: "How PMs ship accessible products — WCAG, testing, business case.",
    url: `${SITE_URL}/pm-accessibility`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Accessibility+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Accessibility 2026 — PM Streak",
    description: "How PMs ship accessible products — WCAG, testing, business case.",
    images: [`${SITE_URL}/api/og?title=PM+Accessibility+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const BASICS = [
  "Keyboard navigation — every interactive element reachable without a mouse",
  "Color contrast — 4.5:1 for text, 3:1 for large text (WCAG AA)",
  "Alt text on images — meaningful, not decorative filler",
  "Semantic HTML — headings, landmarks, ARIA only when needed",
  "Focus indicators — visible and clear on every focusable element",
  "Screen reader labels — test with VoiceOver and TalkBack, not just axe",
];

const BUSINESS_CASE = [
  "15% of the world has a disability — direct addressable market",
  "Accessibility overlaps with SEO — semantic structure helps both",
  "Legal exposure — ADA lawsuits in the US hit $10B+ industry",
  "Quality signal — accessible products are usually well-built products",
];

const FAQS = [
  {
    q: "Should PMs block releases on accessibility issues?",
    a: "Critical a11y bugs (can&apos;t complete core flow with keyboard or screen reader) should block. Minor issues (non-critical contrast, missing labels on secondary elements) can ship with a tracked follow-up. The key is: don&apos;t let a11y pile up as &apos;tech debt&apos; — it compounds faster than regular debt.",
  },
];

export default function PmAccessibilityPage() {
  const dates = pageDates("/pm-accessibility");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Accessibility", url: `${SITE_URL}/pm-accessibility` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Accessibility (2026 Edition)",
        description:
          "How PMs approach accessibility without slowing shipping. WCAG basics, screen reader testing, and the business case for accessible products.",
        image: `${SITE_URL}/api/og?title=PM+Accessibility+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-accessibility`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>♿</span> Accessible by default, not accessible by afterthought
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Accessibility<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Good PM accessibility work covers six basics — keyboard navigation, WCAG AA color contrast, meaningful alt text, semantic HTML, visible focus indicators, and real screen-reader testing — treated as ship-blocking for core flows and tracked debt for minor issues. The business case is concrete: 15% of the world has a disability, accessibility overlaps with SEO, and ADA lawsuits have created a $10B+ legal-exposure industry.
          </p>
          <p className="text-sm text-white/40 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            6 a11y basics and 4 reasons it&apos;s a business priority, not a checkbox.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Accessibility PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">6 A11y Basics</h2>
          <div className="space-y-2">
            {BASICS.map((b, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">4 Business Reasons</h2>
            <div className="space-y-2">
              {BUSINESS_CASE.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{b}</p>
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

        <RelatedPages slug="pm-accessibility" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Accessibility PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
