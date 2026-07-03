import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Viral Features (2026) — Designing Features That Users Naturally Share",
  description:
    "How PMs design features that users naturally share. What makes virality work, the math, and examples from Instagram, Dropbox, Notion, and others.",
  keywords: [
    "PM viral features", "viral product design",
    "viral loop features", "natural sharing",
    "viral coefficient 2026",
  ],
  alternates: { canonical: "/pm-viral-features" },
  openGraph: {
    title: "PM Viral Features 2026 — PM Streak",
    description: "Designing features that users naturally share — what makes virality work.",
    url: `${SITE_URL}/pm-viral-features`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Viral+Features+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Viral Features 2026 — PM Streak",
    description: "Designing features that users naturally share — what makes virality work.",
    images: [`${SITE_URL}/api/og?title=PM+Viral+Features+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const VIRAL_PATTERNS = [
  "Artefact sharing — users create something they want to show off (designs, docs, photos)",
  "Collaboration invites — product is better with others; users invite colleagues",
  "Status / identity — sharing signals something about the user (fitness achievements, music taste)",
  "Utility sharing — users send X to recipients who need it (Calendly links, Venmo requests)",
  "Incentivised referral — explicit reward for inviting (discounts, credits)",
];

const WHAT_MAKES_IT_WORK = [
  "The share is natural — not forced, matches normal user behaviour",
  "Recipient gets value immediately — not asked to sign up first",
  "Low friction — one tap, not an email form",
  "Delightful moment — users feel good about sharing",
  "Double-sided reward (or pure utility) — both sender and recipient benefit",
];

const VIRAL_MATH = [
  "K = invites sent per user × conversion rate of invites",
  "K &gt; 1 = viral (self-sustaining)",
  "Most products: K = 0.1–0.3 (helps but isn&apos;t a growth engine)",
  "Strong viral products: K = 0.5–0.9",
  "Example: 100 users × 3 invites × 30% conversion = 90 new users per cycle",
];

const EXAMPLES = [
  "Instagram — photos are inherently shareable",
  "Dropbox — share-a-folder naturally invites collaborators",
  "Notion — share-a-doc brings recipients into the tool",
  "Calendly — every booking link signs up a new user",
  "Figma — design files are shared for review",
  "Google Docs — shared editing is the core use case",
];

const COMMON_MISTAKES = [
  "Forcing sharing — &apos;share to continue&apos; feels spammy",
  "Low-quality sharing UX — broken share flows kill virality",
  "Single-sided incentives — only referrer gets rewarded, recipient feels used",
  "Gating value behind signup — recipients bounce before seeing value",
  "Over-optimising K-factor — organic virality beats engineered virality",
];

const FAQS = [
  {
    q: "Can every product be viral?",
    a: "No. Some products have natural share moments; others don&apos;t. B2B accounting software isn&apos;t going to be viral no matter what you do. Rather than forcing virality, PMs should identify whether their product naturally invites sharing. Those that do can amplify; those that don&apos;t should invest in other growth channels.",
  },
  {
    q: "What&apos;s the biggest viral feature mistake?",
    a: "Designing for the referrer, not the recipient. Viral mechanics focus on &apos;how do we get users to share?&apos; but should focus on &apos;does the recipient get value?&apos; A share that bounces at signup wastes everyone&apos;s time. Great viral features are good for the person receiving, first; the spread is a natural consequence.",
  },
];

export default function PmViralFeaturesPage() {
  const dates = pageDates("/pm-viral-features");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Viral Features", url: `${SITE_URL}/pm-viral-features` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Viral Features (2026 Edition)",
        description:
          "How PMs design features that users naturally share. What makes virality work, the math, and examples from Instagram, Dropbox, Notion, and others.",
        image: `${SITE_URL}/api/og?title=PM+Viral+Features+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-viral-features`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🦠</span> Great viral features feel natural, not engineered
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Viral Features<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Instagram, Dropbox, Notion, and Calendly all grew through features that share naturally rather than force sharing — artefact creation, collaboration invites, status signals, and pure utility links that give recipients value before any signup ask. The underlying math is a viral coefficient K, where most products land at 0.1–0.3 and only K above 1 becomes truly self-sustaining.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 viral patterns, 5 things that make them work, viral math, 6 examples, 5 common mistakes.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Viral Skills Daily — Free →
          </Link>
        </section>

        {/* Patterns */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Viral Patterns</h2>
          <div className="space-y-2">
            {VIRAL_PATTERNS.map((v, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What works */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Things That Make Virality Work</h2>
            <div className="space-y-2">
              {WHAT_MAKES_IT_WORK.map((w, i) => (
                <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Math */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Viral Math Facts</h2>
          <div className="space-y-2">
            {VIRAL_MATH.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70 font-mono">{m}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Examples</h2>
            <div className="space-y-2">
              {EXAMPLES.map((e, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{e}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mistakes */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Common Mistakes</h2>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{c}</p>
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

        <RelatedPages slug="pm-viral-features" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Viral Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on viral loops, share mechanics, and growth design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
