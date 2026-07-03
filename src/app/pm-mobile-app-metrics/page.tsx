import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Mobile App Metrics (2026) — What to Track for Mobile Products",
  description:
    "The mobile app metrics every PM should track. Installs, DAU, session length, crash rate, and the signals unique to mobile products.",
  keywords: [
    "PM mobile app metrics", "mobile app analytics",
    "DAU mobile", "crash rate PM",
    "mobile retention metrics 2026",
  ],
  alternates: { canonical: "/pm-mobile-app-metrics" },
  openGraph: {
    title: "PM Mobile App Metrics 2026 — PM Streak",
    description: "Mobile metrics every PM should track — installs, DAU, sessions, crashes, and more.",
    url: `${SITE_URL}/pm-mobile-app-metrics`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Mobile+App+Metrics+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Mobile App Metrics 2026 — PM Streak",
    description: "Mobile metrics every PM should track — installs, DAU, sessions, crashes, and more.",
    images: [`${SITE_URL}/api/og?title=PM+Mobile+App+Metrics+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const METRICS = [
  { metric: "Installs", what: "Total installs — top of funnel, driven by store listings and marketing" },
  { metric: "Install-to-open rate", what: "% of installs who open the app. 60–80% is normal; below signals onboarding issue" },
  { metric: "DAU / MAU", what: "Daily / monthly active users. DAU:MAU ratio &gt;20% is healthy for consumer apps" },
  { metric: "Session length", what: "How long users spend per session. Depends on product; not always &apos;more is better&apos;" },
  { metric: "Sessions per day", what: "How many times users open the app. High-frequency products live or die on this" },
  { metric: "Crash rate", what: "% of sessions that crash. &lt;1% is standard bar; &gt;2% drives uninstalls" },
  { metric: "Uninstall rate", what: "% of installs that uninstall within 30 days. High is a sign of bad first experience" },
  { metric: "Push notification opt-in", what: "% who accept push. Drops if you ask too early or too aggressively" },
];

const MOBILE_SPECIFIC = [
  "App update adoption lag — users take weeks to update; plan for old versions in production",
  "Crashes correlate with device — specific Android models often disproportionately crash",
  "Time-to-first-value on mobile is 30–60 seconds — much tighter than web",
  "Store ratings matter — &lt;4.0 star rating kills organic installs",
  "App size affects installs — every 10MB adds friction on slow connections",
];

const DIAGNOSING = [
  "High installs, low opens — store listing problem (misleading or confusing)",
  "High opens, low D1 return — onboarding problem",
  "High D1, low D7 — early value problem",
  "Flat session length — product novelty wearing off",
  "Crash rate spike — recent deploy issue; roll back or patch fast",
];

const FAQS = [
  {
    q: "What DAU:MAU ratio is good?",
    a: "For daily-use consumer apps (messaging, news, social): &gt;30% is good, &gt;50% is excellent. For weekly-use apps (e-commerce, banking): &gt;15% is good. For monthly-use apps (travel, special-purpose): &gt;8% is good. Match the ratio to your expected usage frequency.",
  },
  {
    q: "What&apos;s the biggest mobile metric PMs ignore?",
    a: "Crash rate. PMs often fixate on DAU and retention while ignoring a 2% crash rate that&apos;s secretly driving uninstalls. A single persistent crash on popular devices can destroy retention for an entire segment. Monitor crash rate as aggressively as DAU; prioritise fixes above new features when crashes exceed 1.5%.",
  },
];

export default function PmMobileAppMetricsPage() {
  const dates = pageDates("/pm-mobile-app-metrics");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Mobile App Metrics", url: `${SITE_URL}/pm-mobile-app-metrics` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "PM Mobile App Metrics (2026 Edition)",
        description:
          "The mobile app metrics every PM should track. Installs, DAU, session length, crash rate, and the signals unique to mobile products.",
        image: `${SITE_URL}/api/og?title=PM+Mobile+App+Metrics+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mobile-app-metrics`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>📱</span> Mobile has unique metrics — not just &apos;web metrics on a phone&apos;
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            PM Mobile App Metrics<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Mobile products need their own metric set — installs, install-to-open rate, DAU:MAU, session length, sessions per day, crash rate, uninstall rate, and push opt-in — because patterns like high installs with low opens point to a store-listing problem, while high opens with low Day-1 return point to onboarding, and a spike in crash rate (above roughly 2%) tends to drive uninstalls if it isn&apos;t caught fast.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            8 core mobile metrics, 5 mobile-specific considerations, and 5 diagnostic patterns.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Mobile PM Skills Daily — Free →
          </Link>
        </section>

        {/* Metrics */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">8 Core Mobile Metrics</h2>
          <div className="space-y-3">
            {METRICS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-[#89e219] text-sm mb-1">{m.metric}</p>
                <p className="text-xs text-white/60">{m.what}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile specific */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">5 Mobile-Specific Considerations</h2>
            <div className="space-y-2">
              {MOBILE_SPECIFIC.map((m, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                  <span className="text-[#89e219] font-bold flex-shrink-0">{i + 1}.</span>
                  <p className="text-sm text-white/70">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagnosing */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Diagnostic Patterns</h2>
          <div className="space-y-2">
            {DIAGNOSING.map((d, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-3 flex gap-3">
                <span className="text-yellow-400 flex-shrink-0">🔍</span>
                <p className="text-sm text-white/70">{d}</p>
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

        <RelatedPages slug="pm-mobile-app-metrics" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build Mobile PM Skills Daily</h2>
          <p className="text-white/60 mb-6">Daily scenarios on mobile metrics, diagnosis, and mobile product design.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
