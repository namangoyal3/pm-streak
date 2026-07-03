import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "PM Freemium Strategy (2026) — When It Works and When It Kills Conversion",
  description:
    "How PMs design freemium products that convert. What to put in free tier, what to gate, and the mistakes that make freemium a revenue trap.",
  keywords: [
    "PM freemium", "freemium strategy",
    "free tier design", "PLG freemium",
    "free to paid conversion 2026",
  ],
  alternates: { canonical: "/pm-freemium" },
  openGraph: {
    title: "PM Freemium Strategy 2026 — PM Streak",
    description: "How PMs design freemium that converts — what to give away, what to gate.",
    url: `${SITE_URL}/pm-freemium`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Freemium+Strategy+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Freemium Strategy 2026 — PM Streak",
    description: "How PMs design freemium that converts — what to give away, what to gate.",
    images: [`${SITE_URL}/api/og?title=PM+Freemium+Strategy+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const WHEN_FREEMIUM_WORKS = [
  "Low marginal cost to serve free users (SaaS, mobile apps)",
  "Clear value tier users would upgrade to — not just &apos;more of the same&apos;",
  "Natural upgrade moment — users hit a limit that matters",
  "Strong viral or referral component — free users bring other free users",
  "Product-led growth motion — product sells itself through usage",
];

const WHEN_FREEMIUM_FAILS = [
  "Expensive infrastructure — storage, compute, bandwidth make free users costly",
  "Free tier is too generous — users never need to upgrade",
  "Free tier is too limited — users bounce before seeing value",
  "No clear upgrade driver — users stuck in free forever",
  "Enterprise audience — free distribution doesn&apos;t reach them",
];

const DESIGN_PRINCIPLES = [
  "Free tier must deliver standalone value — not demo-ware",
  "Gate what scales with value, not arbitrary limits (e.g., number of teammates, not &apos;advanced&apos; features)",
  "Make upgrade moment natural — users hit a wall when they&apos;re ready",
  "Show, don&apos;t hide, premium features — teach users what they&apos;re missing",
  "Friction-less upgrade path — once they decide, don&apos;t make them click 10 times",
];

const BENCHMARKS = [
  "Free-to-paid conversion: 2–5% (consumer), 10–20% (SMB SaaS), 30%+ (enterprise)",
  "Free tier size: should be &lt;80% of free users; &gt;20% should upgrade eventually",
  "Time to upgrade: typically 30–90 days; longer = weak upgrade triggers",
  "LTV:CAC of paid: should be &gt;3:1 despite free tier cost",
  "Free-tier cost per user: should be &lt;5% of LTV of converted users",
];

const FAQS = [
  {
    q: "Should every SaaS product have a freemium tier?",
    a: "No. Freemium works for PLG products with low cost-to-serve. Enterprise SaaS with high-touch sales often works better with free trials (time-limited) than freemium (permanent). Pick based on: can free users discover value alone? If yes, freemium. If they need sales help, free trial or pilot.",
  },
  {
    q: "What&apos;s the biggest freemium PM mistake?",
    a: "Making the free tier too generous. Freemium that serves all user needs for free has no conversion path. Conversely, too limited a free tier prevents users from experiencing value. The calibration — generous enough to attract, limited enough to convert — is one of the hardest PM skills.",
  },
];

export default function PmFreemiumPage() {
  const dates = pageDates("/pm-freemium");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Freemium", url: `${SITE_URL}/pm-freemium` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Freemium Strategy (2026 Edition)",
        description:
          "How PMs design freemium products that convert. What to put in free tier, what to gate, and the mistakes that make freemium a revenue trap.",
        image: `${SITE_URL}/api/og?title=PM+Freemium+Strategy+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-freemium`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎁</span> Generous enough to attract. Limited enough to convert.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Freemium Strategy<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Freemium works when free users cost little to serve, have a clear paid tier to grow into, and
            hit a natural limit that triggers upgrade — amplified by virality or product-led growth — but
            fails under expensive infrastructure, an enterprise audience free distribution can&apos;t reach,
            or a free tier so generous users never need to pay, which is why PMs calibrate it generous
            enough to attract and limited enough to convert.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            5 signs freemium works, 5 when it fails, 5 design principles, and 5 benchmark numbers.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Pricing Skills Daily — Free →
          </Link>
        </section>

        {/* Works */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Signs Freemium Works</h2>
          <div className="space-y-2">
            {WHEN_FREEMIUM_WORKS.map((w, i) => (
              <div key={i} className="bg-[#111] border border-green-500/20 rounded-xl p-3 flex gap-3">
                <span className="text-green-400 flex-shrink-0">✓</span>
                <p className="text-sm text-white/70">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fails */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Signs Freemium Fails</h2>
            <div className="space-y-2">
              {WHEN_FREEMIUM_FAILS.map((w, i) => (
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

        {/* Benchmarks */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Benchmark Numbers</h2>
            <div className="space-y-2">
              {BENCHMARKS.map((b, i) => (
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

        <RelatedPages slug="pm-freemium" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Pricing Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on pricing, free tiers, and conversion design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
