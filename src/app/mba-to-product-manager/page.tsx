import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { SITE_URL, faqSchema, breadcrumbSchema, articleSchema } from "@/components/JsonLd";
import RelatedPages from "@/components/RelatedPages";
import { AUTHOR_NAME, AUTHOR_URL, AUTHOR_CREDENTIAL } from "@/lib/seo/byline";
import { pageDates, formatPageDate } from "@/lib/seo/page-dates";

export const metadata: Metadata = {
  title: "MBA to Product Manager (2026) — IIM, ISB & Top B-School to PM Career",
  description:
    "The complete guide to landing a PM role from an MBA. How to position your MBA, APM programs that recruit from campus, what hiring managers actually look for from MBAs.",
  keywords: [
    "MBA to product manager", "MBA PM india",
    "IIM to PM", "ISB to product manager",
    "MBA product management career", "PM placement IIM",
    "how to become PM after MBA 2026",
  ],
  alternates: { canonical: "/mba-to-product-manager" },
  openGraph: {
    title: "MBA to Product Manager 2026 — PM Streak",
    description: "How to land PM roles from an MBA — APM programs, positioning, and what hiring managers want.",
    url: `${SITE_URL}/mba-to-product-manager`,
    images: [{ url: `${SITE_URL}/api/og?title=MBA+to+Product+Manager+2026++PM+Streak`, width: 1200, height: 630 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBA to Product Manager 2026 — PM Streak",
    description: "How to land PM roles from an MBA — APM programs, positioning, and what hiring managers want.",
    images: [`${SITE_URL}/api/og?title=MBA+to+Product+Manager+2026++PM+Streak`],
    site: "@pmstreak",
  },
};

const TOP_SCHOOLS = [
  { school: "IIM Ahmedabad", pmScene: "Strong PM placements across Flipkart, Razorpay, CRED, PhonePe. Product Club active." },
  { school: "IIM Bangalore", pmScene: "Tech PM placements heavy — Google, Microsoft, Flipkart. Strong alumni network in Bangalore tech." },
  { school: "IIM Calcutta", pmScene: "PM hiring growing — fintech and consumer tech focus. Known for analytics-strong PM candidates." },
  { school: "ISB Hyderabad", pmScene: "High-volume PM placements across fintech, SaaS, and consumer. Younger cohort (2–5y exp) advantage." },
  { school: "FMS Delhi", pmScene: "PM placements growing. Strong at traditional tech + conglomerate product roles." },
  { school: "XLRI", pmScene: "Fewer but quality PM placements, often through APM programs." },
];

const APM_FROM_MBA = [
  { program: "Google APMM", eligibility: "MBA grads from top schools, India-based roles", notes: "Very competitive. Focus on strategic product thinking and Google-specific products." },
  { program: "Flipkart Product Accelerator", eligibility: "MBA + engineering or relevant experience", notes: "Heavy on execution and metrics. Tests domain fit with e-commerce." },
  { program: "Razorpay APM", eligibility: "MBA or equivalent, values first-principles thinking", notes: "First-principles over frameworks. Fintech domain bonus." },
  { program: "Microsoft PM", eligibility: "MBA grads typically enter via Product Marketing or Senior APM track", notes: "Growth mindset stories resonate. Enterprise product domain." },
  { program: "PayPal / Amazon PM", eligibility: "MBA grads often fill lateral PM roles after internships", notes: "Converting from internship is the most common path." },
];

const POSITIONING = [
  { gap: "No 'shipped product' in portfolio", fix: "Do a PM internship or consulting project. Ship something — even a simple side product counts. Document the PM decisions behind it." },
  { gap: "Seen as strategic but not tactical", fix: "Volunteer on an MBA tech project where you execute, not just analyse. Write a PRD for a product you actually built." },
  { gap: "Weak technical fluency", fix: "Learn SQL basics, take a CS-adjacent elective, build a side project with no-code tools. Ask ML/engineering MBAs to coffee chat." },
  { gap: "Pre-MBA experience in non-tech", fix: "Reframe: 'At [consulting firm], I led a client project to design the rollout of [product-like thing].' Focus on the decisions made, not the org structure." },
  { gap: "Competing against pre-MBA PMs", fix: "Your advantage is business framing + strategic ambition. Don't try to out-technical the engineers — out-strategise them." },
];

const FAQS = [
  {
    q: "Is an MBA a good path to becoming a product manager in India?",
    a: "It's one valid path — especially for people transitioning from non-tech backgrounds (consulting, finance, operations). For people already in tech, an MBA is often unnecessary and even a detour. The MBA-to-PM path works best when (1) you target APM programs at top tech companies, (2) you supplement the MBA with real product work (internships, side projects, case competitions), and (3) you graduate from a school with strong tech placements (IIM A/B/C, ISB, or top global schools).",
  },
  {
    q: "Which is better for a PM career — IIM or ISB?",
    a: "IIM A/B/C have the strongest overall placements but are 2-year programs with younger cohorts (less pre-MBA experience). ISB is 1 year with a cohort averaging 4–5 years of experience, making it more attractive for senior PM pivots. For pure PM outcomes: IIM A/B have slight edges in Google/Flipkart placements; ISB has strong fintech and SaaS placements. Both are excellent. Choose based on cohort fit and what you want to do pre-MBA.",
  },
  {
    q: "What's the biggest mistake MBAs make in PM interviews?",
    a: "Sounding too strategic and not enough operational. PM interviewers want to see execution muscle, not just frameworks. Candidates who answer product case questions with only TAM/SAM/SOM and Porter's 5 Forces fail. The winning answer combines strategy with specific tactical execution: 'Here's the strategy, here's the first 3 features I'd ship, here's how I'd measure success week 1.' Strategy without shipping sounds consulting-ish — which is the fastest way to be de-prioritised.",
  },
];

export default function MbaToProductManagerPage() {
  const dates = pageDates("/mba-to-product-manager");
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "MBA to Product Manager", url: `${SITE_URL}/mba-to-product-manager` },
      ])} />
      <JsonLd data={faqSchema(FAQS.map(f => ({ question: f.q, answer: f.a })))} />
      <JsonLd data={articleSchema({
        headline: "MBA to Product Manager (2026 Guide)",
        description: "The complete guide to landing a PM role from an MBA. How to position your MBA, APM programs that recruit from campus, what hiring managers actually look for from MBAs.",
        image: `${SITE_URL}/api/og?title=MBA+to+Product+Manager+2026++PM+Streak`,
        datePublished: dates.published,
        dateModified: dates.modified,
        author: { name: AUTHOR_NAME, url: AUTHOR_URL.startsWith("http") ? AUTHOR_URL : `${SITE_URL}${AUTHOR_URL}` },
        publisher: { name: "PM Streak", url: SITE_URL },
        url: `${SITE_URL}/mba-to-product-manager`,
      })} />

      <main className="min-h-screen bg-[#0e1113] text-white">
        <section className="max-w-4xl mx-auto px-4 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1f2228] border border-[#58cc02]/30 rounded-full px-4 py-1.5 text-sm text-[#89e219] mb-6">
            <span>🎓</span> The MBA gets you in the room. Product shipped gets you hired.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            MBA to Product Manager<br />(2026 Guide)
          </h1>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-2">
            MBA graduates break into PM roles mainly through APM programs — Google APMM, Flipkart&apos;s Product Accelerator, Razorpay APM, or Microsoft&apos;s PM track — sourced heavily from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and ISB. Landing one usually means closing five common gaps first: a thin shipped-product portfolio, weak tactical execution, and limited technical fluency chief among them.
          </p>
          <p className="text-xs text-white/40 max-w-2xl mx-auto mb-6">
            By <a href={AUTHOR_URL} className="text-white/60 hover:text-[#89e219] underline underline-offset-2">{AUTHOR_NAME}</a> · {AUTHOR_CREDENTIAL} · Updated {formatPageDate(dates.modified)}
          </p>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            How MBA grads land PM roles — top B-school PM scenes, APM programs that recruit from MBA,
            and how to position your MBA so hiring managers take you seriously.
          </p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#46a302] active:border-b-2 active:translate-y-[2px] text-black font-black px-8 py-3 rounded-2xl transition-all">
            Build PM Muscle Daily — Free →
          </Link>
        </section>

        {/* Top schools */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-center mb-10">PM Placement Scene at Top Indian B-Schools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOP_SCHOOLS.map((s, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-4">
                <p className="font-semibold text-white mb-1">{s.school}</p>
                <p className="text-xs text-white/60">{s.pmScene}</p>
              </div>
            ))}
          </div>
        </section>

        {/* APM programs */}
        <section className="bg-[#16181c] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-10">APM Programs That Recruit From MBAs</h2>
            <div className="space-y-3">
              {APM_FROM_MBA.map((p, i) => (
                <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                  <p className="font-semibold text-white mb-1">{p.program}</p>
                  <p className="text-xs text-[#89e219] mb-2">{p.eligibility}</p>
                  <p className="text-xs text-white/60">{p.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Positioning */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-10">5 Gaps MBAs Need to Close</h2>
          <div className="space-y-3">
            {POSITIONING.map((p, i) => (
              <div key={i} className="bg-[#111] border border-white/10 rounded-xl p-5">
                <div className="flex gap-3 items-start">
                  <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <p className="text-sm text-white/70 mb-1">{p.gap}</p>
                    <p className="text-sm text-green-400">→ {p.fix}</p>
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

        <RelatedPages slug="mba-to-product-manager" />

        <section className="max-w-2xl mx-auto px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold mb-3">Prep for PM During Your MBA</h2>
          <p className="text-white/60 mb-6">Daily PM practice alongside your coursework — 2 minutes a day, ready by placement season.</p>
          <Link href="/signup" className="inline-block bg-[#58cc02] hover:bg-[#46a302] text-black font-semibold px-10 py-3 rounded-xl transition-colors">
            Start Free Trial →
          </Link>
        </section>
      </main>
    </>
  );
}
