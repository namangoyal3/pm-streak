import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";
import RelatedPages from "@/components/RelatedPages";

export const metadata: Metadata = {
  title: "Critical Thinking for PMs (2026) — The Habit of Mind That Separates Great PMs",
  description:
    "How PMs think critically. Question assumptions, distinguish signal from noise, avoid cognitive biases, and develop the intellectual discipline great PMs share.",
  keywords: [
    "PM critical thinking", "product manager thinking",
    "cognitive biases PM", "questioning assumptions PM",
    "intellectual discipline PM 2026",
  ],
  alternates: { canonical: "/pm-critical-thinking" },
  openGraph: {
    title: "Critical Thinking for PMs 2026 — PM Streak",
    description: "The habits of mind that separate great PMs — questioning assumptions, spotting bias, disciplined inquiry.",
    url: `${SITE_URL}/pm-critical-thinking`,
    images: [{ url: `${SITE_URL}/api/og?title=Critical+Thinking+for+PMs+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Critical Thinking for PMs 2026 — PM Streak",
    description: "The habits of mind that separate great PMs — questioning assumptions, spotting bias, disciplined inquiry.",
    images: [`${SITE_URL}/api/og?title=Critical+Thinking+for+PMs+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const HABITS = [
  {
    habit: "Question the premise",
    what: "Before accepting &apos;we need to X,&apos; ask &apos;why do we think we need X?&apos; Often the premise itself is shaky.",
    example: "Leadership: &apos;We need a referral program.&apos; You: &apos;What user behaviour are we trying to change, and have we confirmed referrals are the blocker?&apos;",
  },
  {
    habit: "Distinguish evidence from opinion",
    what: "&apos;Users want X&apos; is often an opinion dressed as evidence. Push for data or specific user quotes.",
    example: "PM: &apos;Users love this feature.&apos; Ask: what&apos;s the adoption rate? What did the 5 users we interviewed say specifically?",
  },
  {
    habit: "Spot cognitive biases in yourself",
    what: "Confirmation bias, sunk cost, availability — these affect YOU, not just others. Look for them in your own thinking first.",
    example: "You&apos;re resisting killing a feature because you championed it. That&apos;s sunk cost, not judgment. Name it, then decide.",
  },
  {
    habit: "Consider second-order effects",
    what: "Every decision has downstream consequences. &apos;What happens next&apos; is often more important than &apos;what happens now.&apos;",
    example: "Free tier increases signups. Second-order: does it train users to expect free forever and kill conversion?",
  },
  {
    habit: "Steelman opposing views",
    what: "Before committing to your position, articulate the strongest version of the opposite. If you can&apos;t, you don&apos;t understand the problem.",
    example: "If you disagree with an engineer on scope, argue their side as well as they would. If you can, you&apos;ll often find a middle path.",
  },
  {
    habit: "Be specifically wrong",
    what: "Vague positions can&apos;t be tested. Specific positions can be falsified — which is how you learn.",
    example: "&apos;This will improve retention&apos; is untestable. &apos;This will lift D7 retention from 22% to 27% within 4 weeks&apos; is testable.",
  },
  {
    habit: "Follow the chain of causality",
    what: "When something happens, don&apos;t stop at the first cause. Ask &apos;why?&apos; 3–5 times to find the root.",
    example: "Retention dropped. Why? Onboarding change. Why did that hurt? It added friction. Why did we add friction? Business asked for profile data.",
  },
];

const COGNITIVE_BIASES = [
  { bias: "Confirmation bias", description: "Seeking evidence that confirms existing beliefs" },
  { bias: "Sunk cost fallacy", description: "Continuing because of past investment, not future value" },
  { bias: "Availability bias", description: "Weighing recent or memorable data over representative data" },
  { bias: "Anchoring", description: "First number or frame unduly influences your conclusion" },
  { bias: "Groupthink", description: "Team converges on an answer to avoid conflict, not to find truth" },
  { bias: "Dunning-Kruger", description: "Low knowledge + high confidence (yourself, often)" },
  { bias: "Hindsight bias", description: "&apos;I knew it all along&apos; — rewriting history after outcomes" },
];

const FAQS = [
  {
    q: "How do PMs develop critical thinking deliberately?",
    a: "Three habits compound: (1) write out your reasoning in decisions — forces you to see gaps, (2) ask &apos;what would change my mind?&apos; before committing — pre-commits you to intellectual honesty, (3) seek out disagreement — peers who challenge you improve your thinking more than peers who validate you. Skip any of these and your thinking drifts toward comfortable conclusions rather than correct ones.",
  },
  {
    q: "What&apos;s the single biggest thinking mistake PMs make?",
    a: "Accepting the frame of a question without examining it. When leadership asks &apos;should we build X?&apos;, strong PMs ask &apos;should we? What assumption is underneath that question?&apos; first. Accepting the frame as given makes you a diligent executor; questioning the frame makes you a strategic PM. Most PMs over-execute on weakly-framed problems.",
  },
];

export default function PmCriticalThinkingPage() {
  const dates = pageDates("/pm-critical-thinking");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "PM Critical Thinking", url: `${SITE_URL}/pm-critical-thinking` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "Critical Thinking for PMs (2026 Edition)",
        description:
          "How PMs think critically. Question assumptions, distinguish signal from noise, avoid cognitive biases, and develop the intellectual discipline great PMs share.",
        image: `${SITE_URL}/api/og?title=Critical+Thinking+for+PMs+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/pm-critical-thinking`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🧠</span> Great PMs aren&apos;t smarter. They think more deliberately.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Critical Thinking for PMs<br />(2026 Edition)
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-3">
            Great PMs aren&apos;t smarter than everyone else—they practice seven deliberate habits: questioning premises, separating evidence from opinion, catching their own cognitive biases, weighing second-order effects, steelmanning opposing views, staying specifically (falsifiably) wrong, and tracing causality back to root causes. Recognising biases like confirmation bias, sunk cost, and anchoring sharpens every one of these habits.
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-[#89e219] hover:underline">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            7 habits of critical PM thinking with concrete examples, 7 cognitive biases to spot in yourself,
            and how to develop intellectual discipline deliberately.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Practice Structured Thinking Daily — Free →
          </Link>
        </section>

        {/* Habits */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">7 Habits of Critical PM Thinking</h2>
          <div className="space-y-5">
            {HABITS.map((h, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5">
                <p className="font-bold text-white mb-1">{i + 1}. {h.habit}</p>
                <p className="text-sm text-white/70 mb-3">{h.what}</p>
                <div className="bg-[#58cc02]/5 border border-[#58cc02]/20 rounded-lg p-3">
                  <p className="text-xs text-[#89e219] mb-1">💡 Example</p>
                  <p className="text-xs text-white/70 italic">{h.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Biases */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">7 Cognitive Biases to Catch in Yourself</h2>
            <div className="space-y-3">
              {COGNITIVE_BIASES.map((b, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                  <p className="font-semibold text-[#89e219] text-sm mb-1">{b.bias}</p>
                  <p className="text-xs text-white/60">{b.description}</p>
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

        <RelatedPages slug="pm-critical-thinking" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Practice Structured Thinking Daily</h2>
          <p className="text-white/60 mb-6">Daily PM scenarios that force the discipline of questioning assumptions and seeking evidence.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
