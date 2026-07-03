import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "Consumer vs B2B Product Management (2026) — Key Differences for PMs",
  description:
    "Consumer PM vs B2B PM — the real differences in metrics, users, roadmap process, success criteria, and what makes each uniquely challenging. Which is right for your career?",
  keywords: [
    "consumer vs B2B product management", "B2B PM vs consumer PM",
    "B2B product manager", "consumer product manager",
    "difference between B2B and B2C PM", "enterprise PM vs consumer PM",
    "which PM track should I choose 2026",
  ],
  alternates: { canonical: "/consumer-vs-b2b-pm" },
  openGraph: {
    title: "Consumer vs B2B PM 2026 — Key Differences | PM Streak",
    description: "Metrics, users, roadmaps, and career paths — the real differences between consumer and B2B product management.",
    url: `${SITE_URL}/consumer-vs-b2b-pm`,
    images: [{ url: `${SITE_URL}/api/og?title=Consumer+vs+B2B+PM+2026++Key+Differences++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consumer vs B2B PM 2026 — Key Differences | PM Streak",
    description: "Metrics, users, roadmaps, and career paths — the real differences between consumer and B2B product management.",
    images: [`${SITE_URL}/api/og?title=Consumer+vs+B2B+PM+2026++Key+Differences++PM+Streak`],
    site: "@pmstreak",
  },
};

const COMPARISON = [
  {
    dimension: "Who your user is",
    consumer: "Millions of individual users. Diverse, often anonymous, varying levels of sophistication.",
    b2b: "Specific personas within a company — often split between the buyer (who pays) and the user (who uses it). They may be the same person or completely different.",
    insight: "B2B PMs often build for two jobs simultaneously: the admin who buys and the end-user who operates.",
  },
  {
    dimension: "How you measure success",
    consumer: "DAU/MAU, retention curves, engagement, NPS, viral coefficient, ARPU",
    b2b: "ARR, net revenue retention (NRR), time-to-value, CSAT, support ticket volume, feature adoption rate per account",
    insight: "A B2B product can have 10,000 users and be wildly successful. A consumer product with 10,000 users is barely started.",
  },
  {
    dimension: "Who drives the roadmap",
    consumer: "Data, user research, and product intuition. Individual users rarely dictate features.",
    b2b: "Data + enterprise customer requests. A single customer representing 15% of ARR can legitimately influence the roadmap.",
    insight: "B2B PMs must build frameworks to evaluate customer requests without becoming custom-dev shops for every enterprise account.",
  },
  {
    dimension: "Speed of iteration",
    consumer: "Fast — ship, measure, iterate in days or weeks. A/B testing is routine.",
    b2b: "Slower — enterprise customers need change management, training, and predictability. Surprise UI changes break workflows.",
    insight: "B2B PMs develop deep empathy for change management. The best features can fail if the rollout disrupts existing user habits.",
  },
  {
    dimension: "Sales and GTM involvement",
    consumer: "PM rarely interfaces with sales. Distribution is product-led (SEO, virality, app stores).",
    b2b: "PM works closely with sales, solutions engineering, and customer success. Win/loss analysis, sales-assist features, and demo environments are PM responsibilities.",
    insight: "B2B PMs who don't understand the sales cycle often build features that are technically correct but don't help close deals.",
  },
  {
    dimension: "Definition of launch",
    consumer: "Ship to 100% of users. Monitor metrics. Rollback if needed.",
    b2b: "Staged rollout per customer tier. Customer communication plan. Training materials. Migration paths for existing data.",
    insight: "A B2B launch without a communication plan is a support ticket queue waiting to happen.",
  },
  {
    dimension: "Pricing influence",
    consumer: "PM rarely owns pricing. May influence freemium vs premium tiers.",
    b2b: "PM is deeply involved in packaging and pricing. Feature gating, enterprise vs SMB tiers, and add-on decisions all require PM input.",
    insight: "B2B PMs who don't understand their pricing model often inadvertently build features for the wrong customer segment.",
  },
];

const CAREER_PATHS = [
  {
    track: "Consumer PM",
    companies: "Swiggy, Zomato, CRED, PhonePe, Instagram/Meta, YouTube/Google",
    good: ["Data-rich — faster feedback loops", "High user scale — decisions matter at millions of users", "Visible impact — you can show friends your product", "Product sense is highly valued"],
    hard: ["Metrics are noisy — hard to isolate signal", "Competition moves fast — your moat can erode quickly", "User diversity makes prioritisation harder", "High creative bar — users have high expectations"],
  },
  {
    track: "B2B / Enterprise PM",
    companies: "Razorpay, Zoho, Freshworks, Chargebee, Leadsquared, Salesforce India",
    good: ["Deep domain expertise — you become the expert on your users' industry", "Revenue impact is direct and measurable", "Long customer relationships — you learn from repeated feedback", "Less noise — a handful of large customers give you clear signal"],
    hard: ["Enterprise sales cycles are slow — feedback loops are long", "Backwards compatibility is a constraint — you can't break existing customers", "Political complexity — multiple stakeholders within each account", "Less glamorous — harder to explain to non-PM friends"],
  },
];

const FAQS = [
  {
    q: "Should I start my PM career in consumer or B2B?",
    a: "Consumer PM is often recommended for early career because feedback loops are faster and product sense is exercised more intensively. B2B is excellent if you have domain expertise (fintech, SaaS, logistics) that gives you an edge in understanding the user. Neither is objectively better — the best choice is the one where you have genuine curiosity about the users.",
  },
  {
    q: "Can you switch between consumer and B2B PM tracks?",
    a: "Yes — but it takes deliberate repositioning. The skills transfer (user research, metrics, prioritisation) but the context doesn't. A consumer PM switching to B2B needs to learn enterprise sales cycles, customer success dynamics, and account-level thinking. B2B to consumer requires shifting from 'what do customers ask for' to 'what does the data and user research say'. Both switches are achievable in one move with the right framing.",
  },
];

export default function ConsumerVsB2bPmPage() {
  const dates = pageDates("/consumer-vs-b2b-pm");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Consumer vs B2B PM", url: `${SITE_URL}/consumer-vs-b2b-pm` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Consumer vs B2B Product Management (2026 Edition)",
        description:
          "Consumer PM vs B2B PM — the real differences in metrics, users, roadmap process, success criteria, and what makes each uniquely challenging. Which is right for your career?",
        image: `${SITE_URL}/api/og?title=Consumer+vs+B2B+PM+2026++Key+Differences++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/consumer-vs-b2b-pm`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>⚖️</span> Same title. Completely different job.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Consumer vs B2B Product Management<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Consumer and B2B product management diverge across seven dimensions covered here —
            who the user is, how success is measured, who drives the roadmap, iteration speed,
            sales involvement, launch definition, and pricing influence — with consumer PMs
            optimising for DAU and retention at scale while B2B PMs balance ARR, net revenue
            retention, and a buyer-versus-user split within each account.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The real differences between consumer and B2B PM — metrics, users, roadmap dynamics,
            career paths, and which one is the right track for you.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build Skills for Both Tracks — Free →
          </Link>
        </section>

        {/* Comparison table */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="space-y-5">
            {COMPARISON.map((row, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">{row.dimension}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3">
                    <p className="text-xs text-blue-400 font-medium mb-1">👤 Consumer PM</p>
                    <p className="text-sm text-white/70">{row.consumer}</p>
                  </div>
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-3">
                    <p className="text-xs text-orange-400 font-medium mb-1">🏢 B2B PM</p>
                    <p className="text-sm text-white/70">{row.b2b}</p>
                  </div>
                </div>
                <div className="bg-[#0e1113] rounded-lg px-3 py-2">
                  <p className="text-xs text-[#89e219]">💡 {row.insight}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Career paths */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">Career Track Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAREER_PATHS.map((path) => (
                <div key={path.track} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-1">{path.track}</h3>
                  <p className="text-xs text-[#89e219] mb-4">{path.companies}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-green-400 font-medium mb-2">✅ What&apos;s great about it</p>
                      <ul className="space-y-1">
                        {path.good.map((g, i) => <li key={i} className="text-xs text-white/60">• {g}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs text-yellow-400 font-medium mb-2">⚠️ What&apos;s hard about it</p>
                      <ul className="space-y-1">
                        {path.hard.map((h, i) => <li key={i} className="text-xs text-white/60">• {h}</li>)}
                      </ul>
                    </div>
                  </div>
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

        <RelatedPages slug="consumer-vs-b2b-pm" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Scenarios from Both Tracks</h2>
          <p className="text-white/60 mb-6">Consumer and B2B PM lessons — build fluency in both before you pick a lane.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
