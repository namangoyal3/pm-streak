import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Platform Product Manager Guide (2026) — How to Excel as a Platform PM",
  description:
    "The complete platform PM playbook. What platform PMs do, how they differ from feature PMs, API design, internal tools, developer experience, and how to break into platform PM.",
  keywords: [
    "platform product manager", "platform PM",
    "infra PM india", "API product manager",
    "developer experience PM", "internal tools PM 2026",
  ],
  alternates: { canonical: "/platform-product-manager" },
  openGraph: {
    title: "Platform PM Guide 2026 — PM Streak",
    description: "What platform PMs do, how to excel, and how to break into platform PM roles.",
    url: `${SITE_URL}/platform-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=Platform+PM+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform PM Guide 2026 — PM Streak",
    description: "What platform PMs do, how to excel, and how to break into platform PM roles.",
    images: [`${SITE_URL}/api/og?title=Platform+PM+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const PLATFORM_VS_FEATURE = [
  { dim: "Primary user", feature: "End users (consumers or B2B customers)", platform: "Other engineering teams, internal developers, or external developers" },
  { dim: "Core output", feature: "Features people can see", platform: "APIs, libraries, infrastructure, internal tools" },
  { dim: "Success metric", feature: "Adoption, retention, revenue", platform: "Adoption by other teams, velocity gains, reliability, cost per unit" },
  { dim: "Time horizon", feature: "Weeks to quarters", platform: "Quarters to years (platform investments compound slowly)" },
  { dim: "Failure mode", feature: "Users don't adopt the feature", platform: "Teams route around your platform because it's painful to use" },
  { dim: "Marketing mindset", feature: "Growth and acquisition", platform: "Developer evangelism, internal adoption, DX" },
];

const PLATFORM_AREAS = [
  { area: "API Products", what: "External APIs (like Stripe, Twilio, Razorpay APIs). Developers are your customers, docs are your UI.", examples: "Razorpay Payment Gateway API, Twilio SMS, Stripe Checkout" },
  { area: "Internal Dev Platforms", what: "CI/CD, observability, deployment tools, feature flags. You serve engineers inside your company.", examples: "Spotify Backstage, internal deploy platforms, feature flag systems" },
  { area: "Data Platforms", what: "Data warehouses, ETL pipelines, analytics platforms. You serve analysts, ML engineers, and other PMs.", examples: "Snowflake-like internal platforms, Segment-like event pipelines" },
  { area: "ML / AI Platforms", what: "Model serving, feature stores, evaluation infrastructure. You serve ML engineers and AI product PMs.", examples: "Internal model registry, inference pipelines, A/B test platforms" },
  { area: "Identity / Auth Platforms", what: "SSO, OAuth, permissions. Every product in the company depends on your reliability.", examples: "Okta-like internal auth, permission systems" },
];

const SUCCESS_SIGNALS = [
  { signal: "Teams choose your platform when they have alternatives", why: "Means you've built something genuinely better than rolling their own." },
  { signal: "Engineers talk about your platform positively unprompted", why: "Organic NPS from your primary user. The highest-signal metric." },
  { signal: "Documentation and quickstarts are good enough to enable self-serve", why: "If teams can adopt without 1:1 support, you've built a real platform, not a consultancy." },
  { signal: "You can measure velocity gains from your platform", why: "'Teams ship 30% faster after adopting' is a concrete case for future platform investment." },
  { signal: "Reliability is boring", why: "Users don't notice the platform until it breaks. Perpetual invisibility is the goal." },
];

const FAQS = [
  {
    q: "Is platform PM a good career path?",
    a: "Excellent for PMs with technical depth and long-horizon patience. Platform PM is under-hyped but highly leveraged — you enable other teams to ship faster, which compounds across the company. Salaries are comparable to feature PMs at most companies, sometimes higher at infra-heavy companies (GitHub, AWS, Hasura, Postman, Razorpay). Career ceiling extends to Staff, Principal, and Distinguished PM, with IC tracks often deeper than feature PM tracks.",
  },
  {
    q: "What's unique about platform PM interviews?",
    a: "Technical depth is tested more rigorously. Expect questions about API design, system architecture, rate limiting, versioning, and observability. Behavioural questions often probe for 'how do you think about developers as customers?' — platform PMs who treat internal teams like annoying stakeholders instead of users fail this lens. Prepare concrete stories about platforms you've built or adopted, and be comfortable discussing trade-offs like consistency vs availability or flexibility vs simplicity.",
  },
  {
    q: "How do you transition into platform PM?",
    a: "Strong paths: (1) engineer on the platform team → lateral to PM on same team (most common), (2) senior feature PM who consistently asks 'why are we building this ourselves' and advocates for platform-first thinking, (3) TPM or solutions engineer who knows the customer deeply. Harder path: consumer PM with no infra context — you'd need to build obvious technical fluency (SQL, APIs, basic architecture) before credibly interviewing for platform roles.",
  },
];

export default function PlatformProductManagerPage() {
  const dates = pageDates("/platform-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Platform Product Manager", url: `${SITE_URL}/platform-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Platform Product Manager Guide (2026 Edition)",
        description: "The complete platform PM playbook. What platform PMs do, how they differ from feature PMs, API design, internal tools, developer experience, and how to break into platform PM.",
        image: `${SITE_URL}/api/og?title=Platform+PM+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/platform-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏗️</span> Platform PMs build the rails every other PM ships on
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Platform Product Manager<br />Guide (2026 Edition)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            Platform PMs build for other engineering teams and developers rather than end users, shipping APIs, internal tools, and infrastructure across five areas: API products, internal dev platforms, data platforms, ML/AI platforms, and identity/auth. Success looks different too — teams voluntarily choosing the platform over rolling their own, self-serve documentation, and measurable velocity gains matter more than the adoption or revenue metrics a feature PM would track.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How platform PMs differ from feature PMs, the 5 kinds of platforms you can own,
            the success signals that matter, and how to break in.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Platform PM Prep — Free →
          </Link>
        </section>

        {/* Comparison */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">Platform PM vs Feature PM</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-white/40 font-medium">Dimension</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">Feature PM</th>
                  <th className="text-left py-3 px-4 text-[#89e219] font-medium">Platform PM</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_VS_FEATURE.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 px-4 text-white/50 text-xs">{row.dim}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.feature}</td>
                    <td className="py-3 px-4 text-white/70 text-xs">{row.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Platform areas */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Platform PM Areas</h2>
            <div className="space-y-4">
              {PLATFORM_AREAS.map((a, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-bold text-white mb-1">{i + 1}. {a.area}</p>
                  <p className="text-sm text-white/60 mb-2">{a.what}</p>
                  <p className="text-xs text-[#89e219]">💡 Examples: <span className="text-white/70">{a.examples}</span></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success signals */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signals You&apos;re Doing Platform PM Well</h2>
          <div className="space-y-3">
            {SUCCESS_SIGNALS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-green-400 mb-1">✅ {s.signal}</p>
                <p className="text-xs text-white/60">{s.why}</p>
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

        <RelatedPages slug="platform-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Platform PM Intuition Daily</h2>
          <p className="text-white/60 mb-6">Scenarios on APIs, developer experience, and platform trade-offs.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
