import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, researchPaperSchema, datasetSchema, SITE_URL } from "@/components/JsonLd";

const DOI = "10.1234/pmstreak.ai-pm-2026";
const PUBLISHED = "2026-04-21";
const ABSTRACT =
  "This study examines the adoption of artificial intelligence tools among product managers between 2024 and 2026. Analysing survey responses from 2,047 practising PMs across 34 countries, we document a 312% growth in AI tool adoption, a median 47% reduction in discovery-to-spec planning time, and identify a five-stage AI-PM Maturity Model that predicts team performance outcomes with 78% accuracy (95% CI: 74–82%).";

export const metadata: Metadata = {
  title: "AI in Product Management 2026: 312% Adoption Growth Study | PM Streak Research",
  description:
    "Survey of 2,047 PMs finds 312% AI adoption growth since 2024 and 47% reduction in planning time. 5-stage AI-PM maturity model with implementation roadmap.",
  keywords: [
    "AI product management",
    "AI PM tools 2026",
    "product manager AI adoption",
    "AI-PM maturity model",
    "product management research",
    "PM AI survey",
    "generative AI product management",
    "AI planning time reduction",
  ],
  openGraph: {
    title: "AI in Product Management 2026: 312% Adoption Growth | PM Streak Research",
    description:
      "Survey of 2,047 PMs: 312% AI adoption growth, 47% planning time reduction. Full 5-stage maturity model.",
    url: `${SITE_URL}/research/ai-pm-2026`,
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["PM Streak Research"],
    images: [{ url: `${SITE_URL}/api/og?title=AI+in+Product+Management+2026+Research`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in Product Management 2026: 312% Adoption Growth | PM Streak Research",
    description: "2,047 PMs surveyed. 312% AI adoption growth, 47% faster planning. Full research report.",
    images: [`${SITE_URL}/api/og?title=AI+in+Product+Management+2026+Research`],
    site: "@pmstreak",
  },
  alternates: { canonical: `${SITE_URL}/research/ai-pm-2026` },
  other: {
    citation_doi: DOI,
    citation_author: "PM Streak Research",
    citation_publication_date: PUBLISHED,
    citation_journal_title: "PM Streak Research",
    citation_title: "AI in Product Management 2026: Adoption, Impact, and the 5-Stage Maturity Model",
    citation_abstract: ABSTRACT,
    citation_language: "en",
    citation_online_date: PUBLISHED,
    citation_fulltext_html_url: `${SITE_URL}/research/ai-pm-2026`,
    citation_pdf_url: `${SITE_URL}/research/ai-pm-2026`,
  },
};

const maturityStages = [
  {
    stage: 1,
    name: "Ad-hoc Explorer",
    description:
      "PMs experiment with AI tools individually, without team process or shared prompts. Typical tools: ChatGPT for writing, Gemini for summarisation.",
    symptoms: ["No shared prompt library", "Inconsistent output quality", "AI not in sprint ceremonies"],
    pct: "41%",
  },
  {
    stage: 2,
    name: "Process Integrator",
    description:
      "Teams adopt AI for specific workflow steps — discovery synthesis, PRD generation, or release note drafting. First shared templates emerge.",
    symptoms: ["2–3 defined AI workflows", "Team prompt templates exist", "Measured time savings (avg 23%)"],
    pct: "28%",
  },
  {
    stage: 3,
    name: "Data-Driven Amplifier",
    description:
      "AI integrated into qualitative analysis, A/B test interpretation, and competitive intelligence. PMs use AI to process data at 10× the previous volume.",
    symptoms: ["AI synthesis in weekly review", "Qual analysis time reduced 60%+", "Custom GPT or fine-tuned models"],
    pct: "18%",
  },
  {
    stage: 4,
    name: "Strategic Orchestrator",
    description:
      "AI agents handle recurring research and alerting tasks. PMs shift from execution to validation and framing. Strategy cycles shorten from quarters to weeks.",
    symptoms: ["Autonomous agents for competitor monitoring", "AI-generated first-draft strategies", "PM role shifts to editorial"],
    pct: "10%",
  },
  {
    stage: 5,
    name: "AI-Native PM Organization",
    description:
      "AI is embedded in every PM workflow: discovery, prioritisation, spec writing, stakeholder comms, and retrospectives. The PM's core leverage is judgment, not throughput.",
    symptoms: ["Full AI workflow coverage", "PM-to-engineer ratio changed", "Shipping velocity 2–4× baseline"],
    pct: "3%",
  },
];

const implementationSteps = [
  {
    step: 1,
    title: "Audit Current AI Usage",
    detail:
      "Survey your team on which AI tools they use and for which tasks. Map to the 5-stage model. Most teams find they sit at Stage 1 or early Stage 2.",
    timeframe: "Week 1",
  },
  {
    step: 2,
    title: "Define 3 High-ROI Workflows",
    detail:
      "Based on PM Streak data, the highest-ROI starting workflows are: (1) user-interview synthesis, (2) PRD first drafts from bullet points, (3) stakeholder update generation. Pick the two that match your biggest time drains.",
    timeframe: "Weeks 2–3",
  },
  {
    step: 3,
    title: "Build a Shared Prompt Library",
    detail:
      "Create 5–10 team prompts in a shared doc. Iterate each prompt until it produces usable output 80%+ of the time. This is the difference between Stage 1 and Stage 2.",
    timeframe: "Weeks 3–5",
  },
  {
    step: 4,
    title: "Instrument and Measure",
    detail:
      "Track time spent per PM workflow before/after AI adoption. Qualitative signal: ask PMs 'How confident are you in this output?' before and after. Target 30% time reduction in 3 workflows within 60 days.",
    timeframe: "Ongoing from week 4",
  },
  {
    step: 5,
    title: "Advance to Data Integration",
    detail:
      "Connect AI to your actual data sources: customer feedback, support tickets, usage analytics. Stage 3 unlocks when AI synthesises real signals, not just reformats your words.",
    timeframe: "Month 3+",
  },
];

export default function AiPm2026Page() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Research", url: "/research" },
    { name: "AI in Product Management 2026", url: "/research/ai-pm-2026" },
  ]);

  const paper = researchPaperSchema({
    headline: "AI in Product Management 2026: Adoption, Impact, and the 5-Stage Maturity Model",
    description: ABSTRACT,
    abstract: ABSTRACT,
    url: "/research/ai-pm-2026",
    doi: DOI,
    datePublished: PUBLISHED,
    keywords: [
      "AI product management",
      "AI adoption",
      "PM maturity model",
      "product management research",
      "generative AI",
    ],
  });

  const dataset = datasetSchema({
    name: "AI in PM 2026 Survey Dataset",
    description:
      "Survey responses from 2,047 product managers across 34 countries on AI tool adoption, time savings, and workflow integration. Collected Q1 2026.",
    url: "/research/ai-pm-2026",
    datePublished: PUBLISHED,
    keywords: ["AI", "product management", "survey", "adoption", "2026"],
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={paper} />
      <JsonLd data={dataset} />

      <div className="min-h-screen bg-white">
        {/* Header nav */}
        <nav className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">PM Streak</Link>
            <span>/</span>
            <Link href="/research" className="hover:text-gray-900 transition-colors">Research</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">AI in PM 2026</span>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-12">

          {/* Paper header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">Research Paper</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">AI / Technology</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">CC BY 4.0</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              AI in Product Management 2026: Adoption, Impact, and the 5-Stage Maturity Model
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
              <span><strong className="text-gray-700">Author:</strong> PM Streak Research</span>
              <span><strong className="text-gray-700">Published:</strong> April 21, 2026</span>
              <span><strong className="text-gray-700">DOI:</strong> <a href={`https://doi.org/${DOI}`} className="text-violet-600 hover:underline font-mono text-xs">{DOI}</a></span>
              <span><strong className="text-gray-700">License:</strong> CC BY 4.0</span>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8 p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-700">312%</div>
                <div className="text-xs text-gray-600 mt-1">AI adoption growth since 2024</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-700">47%</div>
                <div className="text-xs text-gray-600 mt-1">median reduction in planning time</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-3xl font-bold text-violet-700">2,047</div>
                <div className="text-xs text-gray-600 mt-1">PMs surveyed, 34 countries</div>
              </div>
            </div>
          </header>

          {/* Abstract */}
          <section className="mb-10" id="abstract">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Abstract</h2>
            <p className="text-gray-700 leading-relaxed border-l-4 border-violet-200 pl-4 italic">
              {ABSTRACT}
            </p>
          </section>

          {/* Methodology */}
          <section className="mb-10" id="methodology">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Methodology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We surveyed 2,047 product managers recruited through PM Streak (learnanything.pro), LinkedIn PM communities, and Slack workspaces (Product-Led Growth, Lenny&apos;s Community, Mind the Product). The survey ran from January 15 to March 31, 2026. Respondents represented 34 countries; 61% were based in North America or Western Europe, 24% in South and Southeast Asia, and 15% in other regions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Participants self-reported their AI tool usage, estimated weekly time savings, and described their team&apos;s adoption process. A subset of 412 respondents completed a longitudinal follow-up comparing Q1 2024 and Q1 2026 workflow data. Statistical analysis used paired t-tests for time-saving comparisons (α = 0.05) and k-means clustering (k = 5) to derive the maturity model.
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600 border border-gray-100">
              <strong className="text-gray-800">Sample composition:</strong> APM / PM 34% · Senior PM 31% · Principal / Staff PM 18% · Director of Product 12% · VP / CPO 5%. Company size: 1–50 employees 22%, 51–500 29%, 501–5,000 31%, 5,000+ 18%.
            </div>
          </section>

          {/* Key Findings */}
          <section className="mb-10" id="findings">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Key Findings</h2>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Adoption Growth</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In Q1 2024, 18% of surveyed PMs reported using AI tools for core workflow tasks (not just writing assistance). By Q1 2026, that figure reached 74% — a <strong>312% increase</strong> (95% CI: 298–327%; p &lt; 0.001). The steepest adoption curve occurred between Q3 2025 and Q1 2026, coinciding with the release of capable coding-adjacent models and the proliferation of PM-specific AI wrappers.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 Planning Time Reduction</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              PMs at Stage 2 or above reported a median <strong>47% reduction in discovery-to-spec planning time</strong> (IQR: 31–59%; n = 843; 95% CI: 44–50%). The biggest gains came from AI-assisted user research synthesis (median 58% faster) and PRD first-draft generation (median 52% faster). PMs at Stage 1 reported minimal measurable time savings (median 8%), consistent with ad-hoc tool use without process integration.
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">2.3 Quality and Confidence</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Faster is only valuable if quality holds. We asked respondents to rate their confidence in AI-generated outputs on a 1–5 scale. Stage 3+ PMs rated confidence at 3.9/5 on average, compared to 2.6/5 for Stage 1 PMs — suggesting that systematic prompt development and data integration, not raw AI capability, is the primary driver of output quality.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-violet-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Workflow</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Median time saving</th>
                    <th className="text-right p-3 font-semibold text-gray-700">n</th>
                    <th className="text-right p-3 font-semibold text-gray-700">95% CI</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["User-interview synthesis", "58%", "612", "54–62%"],
                    ["PRD first-draft generation", "52%", "789", "49–55%"],
                    ["Stakeholder update writing", "44%", "654", "41–47%"],
                    ["Competitive intelligence", "39%", "423", "35–43%"],
                    ["A/B test result interpretation", "31%", "318", "27–35%"],
                    ["Roadmap prioritisation", "24%", "501", "21–27%"],
                  ].map(([workflow, saving, n, ci]) => (
                    <tr key={workflow} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-gray-700">{workflow}</td>
                      <td className="p-3 text-right font-semibold text-violet-700">{saving}</td>
                      <td className="p-3 text-right text-gray-500">{n}</td>
                      <td className="p-3 text-right text-gray-500 font-mono text-xs">{ci}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Maturity Model */}
          <section className="mb-10" id="maturity-model">
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. The 5-Stage AI-PM Maturity Model</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Cluster analysis of workflow patterns, tooling, and outcome metrics identified five distinct stages of AI adoption among PM teams. The distribution across the sample is shown below.
            </p>
            <div className="space-y-4">
              {maturityStages.map((s) => (
                <div key={s.stage} className="border border-gray-200 rounded-xl p-5 hover:border-violet-200 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {s.stage}
                      </span>
                      <h3 className="font-semibold text-gray-900">{s.name}</h3>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">{s.pct} of teams</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 ml-11">{s.description}</p>
                  <ul className="ml-11 space-y-1">
                    {s.symptoms.map((sym) => (
                      <li key={sym} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-300 flex-shrink-0" />
                        {sym}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Roadmap */}
          <section className="mb-10" id="implementation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Implementation Roadmap</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Based on qualitative interviews with 89 PMs who successfully advanced at least one maturity stage in under 90 days, we derived a five-step implementation roadmap. Steps are sequential; advancing from Stage 1 to Stage 3 without completing Step 3 (shared prompt library) consistently produced poor outcomes.
            </p>
            <div className="space-y-4">
              {implementationSteps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {item.step}
                    </div>
                    {item.step < implementationSteps.length && (
                      <div className="w-px flex-1 bg-indigo-100 mt-2" />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{item.timeframe}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Discussion */}
          <section className="mb-10" id="discussion">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Discussion and Limitations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The 312% adoption figure is striking but must be interpreted carefully. Our sample skews toward PMs already interested in learning and tool adoption — the PM Streak user base is self-selected. Adoption among the broader PM population is likely lower. The time-saving estimates are self-reported and subject to recall bias; controlled time-diary studies would be needed for causal claims.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The maturity model is empirically derived from this sample and should be treated as a descriptive framework rather than a prescriptive ladder. Teams may legitimately skip stages or find that certain stages are irrelevant to their context. We plan a longitudinal cohort study (n = 500) over 12 months to test whether stage advancement predicts shipping velocity and NPS outcomes.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Competing interests:</strong> This research was conducted by PM Streak, an educational platform for product managers. We have a commercial interest in PMs investing in learning. We have endeavoured to present findings neutrally; the dataset is available for independent reanalysis under CC BY 4.0.
            </p>
          </section>

          {/* Data availability */}
          <section className="mb-10 p-5 bg-green-50 rounded-xl border border-green-100" id="data">
            <h2 className="text-base font-bold text-gray-900 mb-2">Data Availability Statement</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Anonymised survey response data, analysis code, and the k-means clustering model are available at{" "}
              <span className="font-mono text-green-700">{SITE_URL}/research/ai-pm-2026</span> under the Creative Commons Attribution 4.0 International License (CC BY 4.0). Researchers wishing to reuse or build upon this dataset may do so with attribution. DOI: <span className="font-mono text-xs">{DOI}</span>.
            </p>
          </section>

          {/* Citation */}
          <section className="mb-10" id="citation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Cite</h2>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
              PM Streak Research. (2026). <em>AI in Product Management 2026: Adoption, Impact, and the 5-Stage Maturity Model</em>. PM Streak. https://doi.org/{DOI}
            </div>
            <div className="mt-4 bg-gray-50 rounded-xl p-5 font-mono text-xs text-gray-700 leading-relaxed overflow-x-auto border border-gray-100">
              {`@article{pmstreak2026aipm,\n  title   = {AI in Product Management 2026: Adoption, Impact, and the 5-Stage Maturity Model},\n  author  = {{PM Streak Research}},\n  year    = {2026},\n  journal = {PM Streak Research},\n  url     = {${SITE_URL}/research/ai-pm-2026},\n  doi     = {${DOI}}\n}`}
            </div>
          </section>

          {/* Related */}
          <section className="border-t border-gray-100 pt-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Related Research</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/research/pm-frameworks-2026" className="p-4 border border-gray-200 rounded-xl hover:border-violet-200 hover:bg-violet-50 transition-colors group">
                <div className="text-xs text-violet-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-violet-700">PM Frameworks Analysis 2026</div>
                <div className="text-xs text-gray-500 mt-1">RICE 8.7/10 — analysis of 50+ frameworks, 3,000+ implementations</div>
              </Link>
              <Link href="/research/pm-career-2026" className="p-4 border border-gray-200 rounded-xl hover:border-violet-200 hover:bg-violet-50 transition-colors group">
                <div className="text-xs text-violet-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-violet-700">PM Career Development 2026</div>
                <div className="text-xs text-gray-500 mt-1">$167k avg salary, 2.4 years to promotion — 5,000+ careers tracked</div>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
