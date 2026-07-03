import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Referral Programs (2026) — When They Work and When They Don&apos;t",
  description:
    "How PMs design referral programs that drive real growth. The math, the psychology, great examples, and why most referral programs fail.",
  keywords: [
    "PM referral programs", "viral referral",
    "refer a friend PM", "K-factor",
    "growth referral 2026",
  ],
  alternates: { canonical: "/pm-referral-programs" },
  openGraph: {
    title: "PM Referral Programs 2026 — PM Streak",
    description: "How PMs design referral programs that actually drive growth — math, psychology, examples.",
    url: `${SITE_URL}/pm-referral-programs`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Referral+Programs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Referral Programs 2026 — PM Streak",
    description: "How PMs design referral programs that actually drive growth — math, psychology, examples.",
    images: [`${SITE_URL}/api/og?title=PM+Referral+Programs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_REFERRALS_WORK = [
  "Product has high intrinsic value — referrals amplify, they don&apos;t create",
  "Users have a natural moment to share — occasion-driven, not forced",
  "Both sides get value — just rewarding referrer can feel spammy to recipient",
  "Reward is proportional and feels earned — not too small, not manipulative",
  "Tracking is reliable — broken tracking kills trust fast",
];

const WHEN_REFERRALS_FAIL = [
  "Product isn&apos;t yet delightful — referring something mediocre feels bad",
  "Users have no natural sharing context — who would I tell about this?",
  "One-sided rewards (only referrer benefits) — feels extractive",
  "Complex redemption — friction kills share rate",
  "Program feels gimmicky — damages brand rather than amplifying it",
];

const DESIGN_PRINCIPLES = [
  "Make the share moment prominent but not pushy — right after a success moment, not during onboarding",
  "Double-sided reward — both referrer and referee get something meaningful",
  "Make sharing easy — pre-written copy, one-tap to WhatsApp/email",
  "Track and show progress — &apos;3 friends away from free month&apos;",
  "Reward quality over quantity — users who convert matter more than users who click",
];

const METRICS = [
  "K-factor (viral coefficient) — invites sent × conversion rate — &gt;0.5 is meaningful, &gt;1 is viral",
  "Share rate — % of eligible users who actually share",
  "Referral-to-signup conversion — % of received referrals who sign up",
  "Referred user retention — are referred users as valuable as organic?",
  "CAC via referral — usually lower than paid, measure it",
];

const EXAMPLES = [
  { product: "Dropbox", what: "Extra storage for both sides — one of the most famous referral programs ever" },
  { product: "PayPal", what: "Paid users $10 each for signup — expensive but drove huge early growth" },
  { product: "Airbnb", what: "Travel credit that brings friends into the travel ecosystem naturally" },
  { product: "Cred", what: "Invite-only onboarding — scarcity as referral mechanism" },
];

const FAQS = [
  {
    q: "Should every product have a referral program?",
    a: "No. Referral programs work when the product is already good; they amplify existing product-market fit. For products still figuring out PMF, referrals feel forced. First make something users love; then design the referral mechanism that lets them share it.",
  },
  {
    q: "What K-factor should PMs target?",
    a: "K &gt; 0.5 is meaningful — meaningfully reduces CAC. K &gt; 1 is viral — self-sustaining growth. Most referral programs achieve K of 0.1–0.3, which helps but isn&apos;t a growth engine. Don&apos;t set expectations of &apos;we&apos;ll go viral&apos; — the math is hard, and most products plateau at modest K.",
  },
];

export default function PmReferralProgramsPage() {
  const dates = pageDates("/pm-referral-programs");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Referral Programs", url: `${SITE_URL}/pm-referral-programs` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Referral Programs (2026 Edition)",
        description:
          "How PMs design referral programs that drive real growth. The math, the psychology, great examples, and why most referral programs fail.",
        image: `${SITE_URL}/api/og?title=PM+Referral+Programs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-referral-programs`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>👥</span> Referrals amplify great products. They don&apos;t create them.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Referral Programs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Referral programs work only when a product already delivers real value and users have a natural moment to share it, rewarding both sides proportionally with reliable tracking; they fail when the product isn&apos;t yet delightful, rewards are one-sided, or redemption is complicated — which is why K-factor above 0.5 is considered meaningful, above 1 viral, even though most programs land closer to 0.1–0.3.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 signals referrals work, 5 failure modes, 5 design principles, 5 metrics to track, and 4 famous examples.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Growth Skills Daily — Free →
          </Link>
        </section>

        {/* When works */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals Referrals Will Work</h2>
          <div className="space-y-2">
            {WHEN_REFERRALS_WORK.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When fails */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Reasons Referrals Fail</h2>
            <div className="space-y-2">
              {WHEN_REFERRALS_FAIL.map((w, i) => (
                <div key={i} className="bg-[#111] border border-red-500/20 rounded-xl p-3 flex gap-3">
                  <span className="text-red-400 flex-shrink-0">❌</span>
                  <p className="text-sm text-white/70">{w}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design principles */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Design Principles</h2>
          <div className="space-y-2">
            {DESIGN_PRINCIPLES.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Metrics to Track</h2>
            <div className="space-y-2">
              {METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">4 Famous Referral Programs</h2>
          <div className="space-y-3">
            {EXAMPLES.map((e, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{e.product}</p>
                <p className="text-sm text-white/70">{e.what}</p>
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

        <RelatedPages slug="pm-referral-programs" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Growth PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on referral design, virality, and sharing mechanics.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
