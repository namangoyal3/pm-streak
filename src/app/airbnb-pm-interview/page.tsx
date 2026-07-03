import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Airbnb PM Interview Guide (2026) — Marketplace, Trust & Host PM Questions",
  description:
    "Crack the Airbnb PM interview. Marketplace dynamics, trust and safety, host and guest experience, and the story-driven product culture Airbnb is famous for.",
  keywords: [
    "Airbnb PM interview", "Airbnb product manager interview questions",
    "Airbnb marketplace PM", "trust and safety PM",
    "Airbnb PM prep 2026",
  ],
  alternates: { canonical: "/airbnb-pm-interview" },
  openGraph: {
    title: "Airbnb PM Interview Guide 2026 — PM Streak",
    description: "Marketplace, trust, and host/guest experience — Airbnb PM interview prep.",
    url: `${SITE_URL}/airbnb-pm-interview`,
    images: [{ url: `${SITE_URL}/api/og?title=Airbnb+PM+Interview+Guide+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airbnb PM Interview Guide 2026 — PM Streak",
    description: "Marketplace, trust, and host/guest experience — Airbnb PM interview prep.",
    images: [`${SITE_URL}/api/og?title=Airbnb+PM+Interview+Guide+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const CONTEXT = [
  { label: "Core business", value: "Home-sharing marketplace, Experiences, long-term stays, increasingly hotels-adjacent" },
  { label: "PM culture", value: "Design-obsessed, story-driven, marketplace-thinking, emphasis on belonging and host community" },
  { label: "Users to know", value: "Guests (trip planners, business travellers, digital nomads), hosts (hobbyist, professional, portfolio), co-hosts" },
  { label: "Key metrics", value: "Nights booked, host supply, search-to-book conversion, host earnings, trust incidents per million nights" },
  { label: "Unique challenge", value: "Trust between strangers is the entire product. Every feature affects trust, even if indirectly." },
];

const ROUNDS = [
  {
    name: "Product Sense / Design",
    what: "Design a new Airbnb product or improve an existing one. Airbnb&apos;s bar for taste and user empathy is famously high.",
    sample: [
      "Design a product to help first-time Airbnb hosts get their first booking.",
      "How would you reduce cancellation rates by hosts without angering them?",
      "Improve the Airbnb experience for users travelling with family vs solo.",
    ],
    tip: "Airbnb rewards answers that consider both sides of the marketplace. A feature that delights guests but makes hosting harder fails at Airbnb. Always address both sides explicitly.",
  },
  {
    name: "Analytical / Metrics",
    what: "Define and diagnose marketplace metrics. Airbnb is deeply quant — candidates must show metric fluency.",
    sample: [
      "Nights booked is up but host NPS is down. Diagnose.",
      "Define the north star metric for Airbnb Experiences.",
      "How would you measure the success of a new trust and safety feature?",
    ],
    tip: "Marketplaces have notoriously tricky metrics (cross-side effects, long trip lifecycle, seasonality). Show you can reason about leading vs lagging indicators and two-sided health.",
  },
  {
    name: "Strategy",
    what: "How does Airbnb enter a market, respond to competition, or make a platform bet?",
    sample: [
      "Should Airbnb build a long-term rentals product as a separate app?",
      "How should Airbnb respond to regulatory pressure in key cities?",
      "Airbnb Experiences has been re-launched multiple times. Should we keep trying?",
    ],
    tip: "Airbnb thinks in decades and cares about mission. Strategy answers that optimise purely for short-term revenue without addressing community trust or long-term platform health tend to feel off-brand.",
  },
  {
    name: "Trust & Safety",
    what: "Specifically tested because T&S is existential to Airbnb. Design a flow, diagnose an incident, or improve trust broadly.",
    sample: [
      "A host is being falsely reported by guests. How do you design a fair resolution system?",
      "Design a verification system that balances trust with friction.",
      "How would you measure and reduce fraudulent listings?",
    ],
    tip: "T&S is always an adversarial design problem. Consider: what happens when bad actors try to game your system? Good T&S PM answers show awareness of abuse patterns, not just happy paths.",
  },
  {
    name: "Behavioural / Culture",
    what: "Airbnb&apos;s culture emphasises storytelling, mission alignment, and host/guest empathy. Stories should demonstrate these.",
    sample: [
      "Tell me about a time you advocated for a user whose voice wasn&apos;t in the room.",
      "Describe a product decision you made that conflicted with business metrics.",
      "Share a time you shipped something that deepened user trust.",
    ],
    tip: "Airbnb specifically looks for candidates who lead with story and empathy. Candidates who answer only with frameworks and metrics often feel culturally mismatched — even if technically correct.",
  },
];

const FAQS = [
  {
    q: "Does Airbnb hire PMs in India?",
    a: "Limited historically, but growing. Most Airbnb PM roles are based in San Francisco, Dublin, or Singapore. India-specific PM roles occasionally open for growth or market expansion. For Indian candidates, remote/global Airbnb PM roles are more accessible than India-based ones. Check levels.fyi and LinkedIn for current openings.",
  },
  {
    q: "What makes Airbnb PM interviews uniquely hard?",
    a: "Design bar and marketplace complexity. Airbnb&apos;s design quality is near-best-in-class globally, and interviewers probe for taste and craft that most PM interviews don&apos;t test. Marketplace dynamics also catch candidates off-guard — every decision affects both hosts and guests, and ignoring one side is an automatic strike.",
  },
  {
    q: "What should I study before an Airbnb PM interview?",
    a: "Airbnb&apos;s design system (read their design blog), marketplace theory (Sangeet Paul Choudary&apos;s writing), trust and safety concepts, and recent Airbnb strategy moves (Summer Release, hosts-focused initiatives, co-hosting launch). Bonus: read Brian Chesky&apos;s interviews — his product philosophy shows up in how interviewers frame questions.",
  },
];

export default function AirbnbPmInterviewPage() {
  const dates = pageDates("/airbnb-pm-interview");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Airbnb PM Interview", url: `${SITE_URL}/airbnb-pm-interview` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "Airbnb PM Interview Guide (2026 Edition)",
        description: "Crack the Airbnb PM interview. Marketplace dynamics, trust and safety, host and guest experience, and the story-driven product culture Airbnb is famous for.",
        image: `${SITE_URL}/api/og?title=Airbnb+PM+Interview+Guide+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/airbnb-pm-interview`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🏡</span> Marketplace + trust + design craft · One of tech&apos;s highest PM bars
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Airbnb PM Interview Guide<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Marketplace two-sidedness runs through every one of Airbnb&apos;s five interview rounds —
            product sense and design, analytical and metrics, strategy, trust and safety, and
            behavioural — because trust between strangers is the entire product. Interviewers score
            high on design taste and story-driven answers, and solutions that favor guests while
            ignoring hosts (or vice versa) are treated as automatic misses.
          </p>
          <p className="text-sm text-white/50 mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Marketplace dynamics, trust and safety, design craft, and the story-driven product culture
            Airbnb is famous for — all 5 rounds and real questions.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Start Airbnb PM Prep — Free →
          </Link>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-10">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Know Before You Interview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CONTEXT.map((item, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="text-[#89e219] font-medium flex-shrink-0">{item.label}:</span>
                  <span className="text-white/60">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">The Airbnb PM Interview Rounds</h2>
          <div className="space-y-6">
            {ROUNDS.map((round, i) => (
              <div key={round.name} className="bg-[#111] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#58cc02]/20 text-[#89e219] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                  <h3 className="text-lg font-bold text-white">{round.name}</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">{round.what}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Sample Questions</p>
                    <ul className="space-y-1.5">
                      {round.sample.map((q, j) => (
                        <li key={j} className="flex gap-2 text-sm">
                          <span className="text-white/30">•</span>
                          <span className="text-white/70">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-xl p-3">
                    <p className="text-xs text-[#89e219] mb-1">💡 Prep tip</p>
                    <p className="text-sm text-white/60">{round.tip}</p>
                  </div>
                </div>
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

        <RelatedPages slug="airbnb-pm-interview" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Train for Airbnb-Level Design and Marketplace PM</h2>
          <p className="text-white/60 mb-6">Daily scenarios on trust, host/guest balance, and design taste.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
