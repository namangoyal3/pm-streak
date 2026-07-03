import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Platform Products (2026) — Building Products Other Products Are Built On",
  description:
    "How PMs build platform products — APIs, SDKs, developer tools. Why platform PM is harder and what makes it rewarding.",
  keywords: [
    "PM platform products", "developer platform PM",
    "API product PM", "SDK product",
    "platform PM role 2026",
  ],
  alternates: { canonical: "/pm-platform-products" },
  openGraph: {
    title: "PM Platform Products 2026 — PM Streak",
    description: "How PMs build platform products — APIs, SDKs, developer tools, and why it&apos;s different.",
    url: `${SITE_URL}/pm-platform-products`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Platform+Products+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Platform Products 2026 — PM Streak",
    description: "How PMs build platform products — APIs, SDKs, developer tools, and why it&apos;s different.",
    images: [`${SITE_URL}/api/og?title=PM+Platform+Products+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PLATFORM_DYNAMICS = [
  "Developers are your users — technical empathy matters more than consumer empathy",
  "Docs are the product — 50% of adoption depends on developer documentation",
  "API design is UX — poorly designed APIs kill adoption regardless of power",
  "Backwards compatibility — once devs depend on you, breaking changes are catastrophic",
  "Long time-to-value — platform products take 12–24 months to show ROI",
];

const KEY_METRICS = [
  "API call volume — activity signal",
  "Active developers — how many are building with you",
  "Time-to-first-API-call — onboarding friction",
  "SDK adoption — which languages / frameworks matter",
  "Developer NPS — hard-won metric but critical",
  "Integration depth — shallow vs deep use of your platform",
];

const UNIQUE_SKILLS = [
  "Reading/writing some code — you must be able to try the API yourself",
  "Thinking in SDKs and APIs — not just UX flows",
  "Developer marketing — hackathons, conferences, docs, DevRel",
  "Long-term strategic patience — platforms compound slowly",
  "Standards awareness — OAuth, REST, GraphQL, webhooks — industry norms matter",
];

const EXAMPLES = [
  "Stripe — payments APIs, famous for developer experience",
  "Twilio — SMS / voice APIs",
  "Razorpay — India payments APIs",
  "Plaid — financial data APIs",
  "OpenAI / Anthropic — LLM APIs",
  "Segment — customer data platform APIs",
];

const COMMON_TRAPS = [
  "Shipping APIs nobody uses — skip developer research at your peril",
  "Poor docs — best API in the world fails if docs are bad",
  "Breaking changes without versioning — loses developer trust forever",
  "Pricing punishes success — developers scale to huge usage, then pricing squeezes them",
  "Ignoring community — developers talk to each other; bad word-of-mouth is fatal",
];

const FAQS = [
  {
    q: "Is platform PM career-limiting or career-enhancing?",
    a: "Enhancing at specialist tech companies. Platform PMs at Stripe, Twilio, Razorpay are deeply valued. The skills (API design, developer empathy, long-term thinking) are rare and transferable. At pure consumer companies, platform PM roles are scarcer, but still respected.",
  },
  {
    q: "What&apos;s the biggest platform PM mistake?",
    a: "Treating platform like consumer product. Consumer PMs optimise for weekly ship velocity; platform PMs must optimise for stability and backwards compatibility. Moving fast and breaking things destroys platform trust. The discipline shift — stability and craft over speed — is the hardest platform PM lesson.",
  },
];

export default function PmPlatformProductsPage() {
  const dates = pageDates("/pm-platform-products");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Platform Products", url: `${SITE_URL}/pm-platform-products` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Platform Products (2026 Edition)",
        description:
          "How PMs build platform products — APIs, SDKs, developer tools. Why platform PM is harder and what makes it rewarding.",
        image: `${SITE_URL}/api/og?title=PM+Platform+Products+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-platform-products`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🔌</span> Platform PM is a long game — but durable and deeply rewarding
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Platform Products<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-3">
            Building a platform product means treating developers as the primary user: documentation carries roughly half of adoption, API design functions as the user experience, and backwards compatibility becomes non-negotiable once other teams&apos; code depends on your endpoints. Platform PM trades weekly ship velocity for stability, with results taking 12–24 months to show up — why Stripe, Twilio, and Razorpay are studied as the benchmark.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 unique dynamics, 6 key metrics, 5 skills, 6 companies to study, and 5 common traps.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Platform PM Skills Daily — Free →
          </Link>
        </section>

        {/* Dynamics */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Unique Platform Dynamics</h2>
          <div className="space-y-2">
            {PLATFORM_DYNAMICS.map((d, i) => (
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
            <h2 className="text-2xl font-bold text-center mb-10">6 Key Metrics</h2>
            <div className="space-y-2">
              {KEY_METRICS.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-green-400 font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Unique Platform PM Skills</h2>
          <div className="space-y-2">
            {UNIQUE_SKILLS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-white/70">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Examples */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">6 Platform Companies to Study</h2>
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

        {/* Traps */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Common Traps</h2>
          <div className="space-y-2">
            {COMMON_TRAPS.map((t, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-red-400 flex-shrink-0">❌</span>
                <p className="text-sm text-white/70">{t}</p>
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

        <RelatedPages slug="pm-platform-products" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Platform PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on API design, developer empathy, and platform trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
