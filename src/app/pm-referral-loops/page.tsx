import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Referral Loops (2026) — How PMs Design Viral Growth",
  description:
    "How PMs design referral loops that actually move the needle. K-factor, incentive design, friction reduction, and why most referral programs fail.",
  keywords: [
    "PM referral loops", "viral growth PM",
    "k-factor", "referral program design 2026",
  ],
  alternates: { canonical: "/pm-referral-loops" },
  openGraph: {
    title: "PM Referral Loops 2026 — PM Streak",
    description: "How PMs design referral loops that actually move the needle.",
    url: `${SITE_URL}/pm-referral-loops`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Referral+Loops+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Referral Loops 2026 — PM Streak",
    description: "How PMs design referral loops that actually move the needle.",
    images: [`${SITE_URL}/api/og?title=PM+Referral+Loops+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPONENTS = [
  { c: "Trigger", w: "When does a user think to refer? Post-aha, post-win, or contextual." },
  { c: "Invitation", w: "What does the inviter send? Link, message, or embedded content." },
  { c: "Incentive", w: "Double-sided usually wins. Give-get framing converts best." },
  { c: "Conversion", w: "Invitee lands and activates — landing page must match the invite promise." },
  { c: "Loop-back", w: "New user becomes inviter. The loop only compounds if this closes." },
];

const MATH = [
  "K-factor = invites sent per user × conversion rate of invite",
  "K &gt; 1 = viral growth. K = 0.5 means every 2 users bring 1. Still valuable as a booster.",
  "Cycle time matters — K of 1.2 with 30-day cycle beats K of 1.5 with 90-day cycle",
  "Segment K-factor by cohort — power users often have 3–5x higher K",
  "Don&apos;t confuse invite-sent with invite-accepted — the gap is usually huge",
];

const REASONS_REFERRALS_FAIL = [
  "Weak trigger moment — users aren&apos;t feeling the value when asked",
  "Awkward incentive — discounts feel transactional; credit feels natural",
  "Too much friction in the invite — if it takes &gt;10 seconds, most users quit",
  "Mismatched landing page — invitee expects X, sees generic signup",
  "No loop-back — new users never become inviters, so it&apos;s just paid acquisition",
];

const FAQS = [
  {
    q: "Should every product have a referral program?",
    a: "No. Referral loops only work when your product has inherent network value (social, collaborative, financial benefit to sharing) or emotional advocacy (users genuinely love it). Bolting a referral program onto a product users don&apos;t love produces noise, not growth.",
  },
  {
    q: "Cash or credit for referral incentive?",
    a: "For B2C: cash or gift cards work best. For B2B and SaaS: credit toward the product keeps the loop inside your ecosystem. Double-sided (both inviter and invitee get something) consistently outperforms one-sided in conversion studies.",
  },
];

export default function PmReferralLoopsPage() {
  const dates = pageDates("/pm-referral-loops");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Referral Loops", url: `${SITE_URL}/pm-referral-loops` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Referral Loops (2026 Edition)",
        description: "How PMs design referral loops that actually move the needle. K-factor, incentive design, friction reduction, and why most referral programs fail.",
        image: `${SITE_URL}/api/og?title=PM+Referral+Loops+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-referral-loops`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔁</span> Viral is a math problem, not a marketing problem
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Referral Loops<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Referral loops work when five parts click into place: a trigger moment right after users feel the product&apos;s value, an easy invitation, a double-sided incentive, a conversion page matching what was promised, and invitees who loop back into inviters. A K-factor above 1 means viral growth, and cycle time counts too — 1.2 in 30 days beats 1.5 in 90.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#58cc02] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 loop components, 5 math rules, and 5 reasons referral programs fail.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Growth PM Skills — Free →
          </Link>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Loop Components</h2>
          <div className="space-y-3">
            {COMPONENTS.map((c, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{c.c}</p>
                <p className="text-xs text-white/60">{c.w}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Math Rules</h2>
            <div className="space-y-2">
              {MATH.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Referrals Fail</h2>
          <div className="space-y-2">
            {REASONS_REFERRALS_FAIL.map((r, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{r}</p>
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

        <RelatedPages slug="pm-referral-loops" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Growth PM Scenarios</h2>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
