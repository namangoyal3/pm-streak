import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "PM Mental Models (2026) — 12 Thinking Tools Every Product Manager Should Know",
  description:
    "The 12 mental models that sharpen PM thinking. Second-order effects, opportunity cost, Pareto, inversion, and more — with product examples for each.",
  keywords: [
    "PM mental models", "product manager mental models",
    "thinking tools PM", "frameworks PM career",
    "PM decision models 2026",
  ],
  alternates: { canonical: "/pm-mental-models" },
  openGraph: {
    title: "PM Mental Models 2026 — PM Streak",
    description: "12 mental models that sharpen PM thinking, with product examples for each.",
    url: `${SITE_URL}/pm-mental-models`,
    images: [{ url: `${SITE_URL}/api/og?title=PM+Mental+Models+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Mental Models 2026 — PM Streak",
    description: "12 mental models that sharpen PM thinking, with product examples for each.",
    images: [`${SITE_URL}/api/og?title=PM+Mental+Models+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const MODELS = [
  { model: "Second-order effects", what: "Every decision has downstream consequences the first look misses.", pm: "A free tier that boosts signups (first-order) but trains users never to pay (second-order)." },
  { model: "Opportunity cost", what: "What are you NOT doing because you&apos;re doing this?", pm: "Every feature you build blocks another feature. &apos;Adding one thing&apos; is never really free." },
  { model: "Pareto principle (80/20)", what: "80% of outcomes come from 20% of causes.", pm: "Find the 20% of users whose feedback drives 80% of insight. Spend your time there, not on edge cases." },
  { model: "Inversion", what: "Solve problems backwards — what would cause failure?", pm: "Instead of &apos;how do we launch well?&apos; ask &apos;what would make this launch fail?&apos; Then prevent that." },
  { model: "Expected value", what: "Outcome × probability, summed across possibilities.", pm: "A 20% chance of ₹10Cr impact beats a 70% chance of ₹1Cr impact. Expected value: 2Cr vs 0.7Cr." },
  { model: "Regression to the mean", what: "Extreme outcomes tend to be followed by less extreme ones.", pm: "A spike in signups after a viral tweet will revert. Don&apos;t confuse variance for trend." },
  { model: "Confirmation bias", what: "We seek evidence that confirms what we already believe.", pm: "If you&apos;re convinced a feature will win, you&apos;ll notice positive feedback and dismiss negative. Deliberately seek disconfirming data." },
  { model: "Goodhart&apos;s Law", what: "When a measure becomes a target, it ceases to be a good measure.", pm: "Set DAU as the goal, and your team will find ways to inflate DAU without real value creation. Guardrails prevent this." },
  { model: "Sunk cost fallacy", what: "Past investment shouldn&apos;t influence future decisions.", pm: "If a feature isn&apos;t working after 3 months, killing it is a new decision. &apos;We&apos;ve spent so much time&apos; is irrelevant to future EV." },
  { model: "Chesterton&apos;s fence", what: "Don&apos;t remove a fence until you understand why it was put up.", pm: "Before deleting &apos;weird&apos; features or flows, find out why they exist. Often there&apos;s a real reason that isn&apos;t obvious." },
  { model: "Circle of competence", what: "Know what you know, and be honest about what you don&apos;t.", pm: "A consumer PM pivoting to B2B should admit the domain gap and partner with experts — not fake expertise." },
  { model: "Leverage", what: "Small inputs that produce outsized outputs.", pm: "Fixing onboarding (high leverage) beats shipping 10 new features (low leverage). PMs should hunt leverage continuously." },
];

const FAQS = [
  {
    q: "Why do mental models matter for PMs?",
    a: "Mental models are pre-compiled thinking patterns. Instead of reasoning from scratch every time, you recognise patterns and apply the right model. PMs who internalise a dozen models make faster, higher-quality decisions than PMs who don&apos;t — especially under time pressure. Think of them as the mental equivalent of well-named functions: they let you think in bigger chunks.",
  },
  {
    q: "How do you actually learn to use mental models?",
    a: "Reading about them isn&apos;t enough. Three steps: (1) pick ONE model per week, (2) look for situations where it applies and explicitly name it — even in your own head, (3) after 2 months, you&apos;ll use the model automatically. Rotating through 12 models takes ~3 months and changes how you think permanently.",
  },
];

export default function PmMentalModelsPage() {
  const dates = pageDates("/pm-mental-models");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Mental Models", url: `${SITE_URL}/pm-mental-models` },
      ])} />
      <JsonLd data={articleSchema({
        headline: "12 Mental Models Every PM Should Know (2026)",
        description:
          "The 12 mental models that sharpen PM thinking. Second-order effects, opportunity cost, Pareto, inversion, and more — with product examples for each.",
        image: `${SITE_URL}/api/og?title=PM+Mental+Models+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-mental-models`,
      })} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧠</span> Better thinking tools = better product decisions
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            12 Mental Models Every PM<br />Should Know (2026)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            This guide breaks down twelve mental models PMs lean on for sharper decisions —
            second-order effects, opportunity cost, the Pareto principle, inversion, expected value,
            regression to the mean, confirmation bias, Goodhart&apos;s Law, sunk cost fallacy,
            Chesterton&apos;s fence, circle of competence, and leverage — each paired with a concrete
            product example.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-8">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The thinking tools that compound over a PM career — second-order effects,
            inversion, Pareto, Goodhart&apos;s Law, and more. With product examples for each.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Mental Models Daily — Free →
          </Link>
        </section>

        {/* Models */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODELS.map((m, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {m.model}</p>
                <p className="text-sm text-white/60 mb-2">{m.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219] mb-1">💡 PM example</p>
                  <p className="text-xs text-white/70">{m.pm}</p>
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

        <RelatedPages slug="pm-mental-models" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Build PM Thinking in 2 Minutes a Day</h2>
          <p className="text-white/60 mb-6">Daily scenarios that force you to apply mental models — not just read about them.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
