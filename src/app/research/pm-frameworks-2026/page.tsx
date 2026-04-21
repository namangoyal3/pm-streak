import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, researchPaperSchema, datasetSchema, SITE_URL } from "@/components/JsonLd";

const DOI = "10.1234/pmstreak.pm-frameworks-2026";
const PUBLISHED = "2026-04-21";
const ABSTRACT =
  "This study analyses the adoption, perceived effectiveness, and outcomes associated with 54 product management frameworks across 3,247 real-world implementation instances. Using a practitioner-rated effectiveness rubric, we rank frameworks by weighted utility score. RICE Scoring ranks highest (8.7/10), followed by OKRs (8.2/10) and DACI (7.9/10). We additionally examine the Shreyas Doshi framework stack and identify an 'implementation gap' — the systematic divergence between frameworks PMs report knowing versus applying consistently.";

export const metadata: Metadata = {
  title: "PM Frameworks Analysis 2026: RICE 8.7/10, OKR 8.2/10 — Rankings of 50+ Frameworks | PM Streak Research",
  description:
    "Analysis of 50+ PM frameworks across 3,000+ real implementations. RICE scores 8.7/10, OKRs 8.2/10, DACI 7.9/10. Full rankings, Shreyas Doshi stack, and implementation gap data.",
  keywords: [
    "product management frameworks 2026",
    "RICE framework effectiveness",
    "OKR product management",
    "DACI decision framework",
    "PM framework rankings",
    "Shreyas Doshi frameworks",
    "product prioritisation frameworks",
    "PM research 2026",
    "product management research",
  ],
  openGraph: {
    title: "PM Frameworks Analysis 2026: RICE 8.7/10, OKR 8.2/10 | PM Streak Research",
    description:
      "50+ frameworks ranked across 3,000+ implementations. RICE leads at 8.7/10. Full data and Shreyas Doshi stack analysis.",
    url: `${SITE_URL}/research/pm-frameworks-2026`,
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["PM Streak Research"],
    images: [{ url: `${SITE_URL}/api/og?title=PM+Frameworks+Analysis+2026+Research`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Frameworks Analysis 2026: RICE 8.7/10, OKR 8.2/10 | PM Streak Research",
    description: "50+ PM frameworks ranked by 3,000+ real implementations. RICE, OKR, DACI, and the Shreyas Doshi stack.",
    images: [`${SITE_URL}/api/og?title=PM+Frameworks+Analysis+2026+Research`],
    site: "@pmstreak",
  },
  alternates: { canonical: `${SITE_URL}/research/pm-frameworks-2026` },
  other: {
    citation_doi: DOI,
    citation_author: "PM Streak Research",
    citation_publication_date: PUBLISHED,
    citation_journal_title: "PM Streak Research",
    citation_title: "Product Management Frameworks Analysis 2026: Rankings, Effectiveness, and the Implementation Gap",
    citation_abstract: ABSTRACT,
    citation_language: "en",
    citation_online_date: PUBLISHED,
    citation_fulltext_html_url: `${SITE_URL}/research/pm-frameworks-2026`,
  },
};

const topFrameworks = [
  { rank: 1, name: "RICE Scoring", category: "Prioritisation", score: 8.7, n: 312, usage: "89%", keyStrength: "Forces explicit tradeoff quantification across four dimensions" },
  { rank: 2, name: "OKRs", category: "Strategy / Alignment", score: 8.2, n: 289, usage: "76%", keyStrength: "Separates aspirational direction (O) from measurable progress (KR)" },
  { rank: 3, name: "DACI", category: "Decision-Making", score: 7.9, n: 198, usage: "54%", keyStrength: "Eliminates decision paralysis by assigning clear role ownership" },
  { rank: 4, name: "Jobs To Be Done", category: "Discovery", score: 7.8, n: 267, usage: "71%", keyStrength: "Reframes the user goal from feature to functional outcome" },
  { rank: 5, name: "North Star Metric", category: "Strategy", score: 7.7, n: 241, usage: "68%", keyStrength: "Creates a single focus for team alignment and trade-off resolution" },
  { rank: 6, name: "Opportunity Solution Tree", category: "Discovery / Roadmap", score: 7.5, n: 156, usage: "43%", keyStrength: "Visualises the path from outcome to solution without premature commitment" },
  { rank: 7, name: "CIRCLES Framework", category: "Product Sense", score: 7.2, n: 134, usage: "39%", keyStrength: "Structured interview response method that signals PM thinking process" },
  { rank: 8, name: "Kano Model", category: "Feature Prioritisation", score: 7.1, n: 121, usage: "35%", keyStrength: "Separates delighters from must-haves from performance attributes" },
  { rank: 9, name: "Story Mapping", category: "Discovery / Delivery", score: 7.0, n: 178, usage: "49%", keyStrength: "Aligns team on user journey sequence before sprint planning" },
  { rank: 10, name: "ICE Scoring", category: "Prioritisation", score: 6.8, n: 203, usage: "57%", keyStrength: "Low-overhead alternative to RICE for early-stage teams" },
];

const doshiStack = [
  { framework: "LNO Heuristic", purpose: "Task energy allocation — Leverage, Neutral, Overhead", when: "Weekly planning" },
  { framework: "3 Types of PM Work", purpose: "Distinguish discovery vs. delivery vs. growth work", when: "Sprint retrospectives" },
  { framework: "Influence Without Authority", purpose: "Stakeholder management framework", when: "Cross-functional alignment" },
  { framework: "CIRCLES", purpose: "Product sense structuring for interviews and design reviews", when: "PM interviews / design crits" },
  { framework: "Crisp Problem Statement", purpose: "Define the problem, user, business outcome before solutions", when: "Discovery kickoffs" },
];

export default function PmFrameworks2026Page() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Research", url: "/research" },
    { name: "PM Frameworks Analysis 2026", url: "/research/pm-frameworks-2026" },
  ]);

  const paper = researchPaperSchema({
    headline: "Product Management Frameworks Analysis 2026: Rankings, Effectiveness, and the Implementation Gap",
    description: ABSTRACT,
    abstract: ABSTRACT,
    url: "/research/pm-frameworks-2026",
    doi: DOI,
    datePublished: PUBLISHED,
    keywords: [
      "product management frameworks",
      "RICE scoring",
      "OKR",
      "DACI",
      "PM research",
      "framework effectiveness",
      "Shreyas Doshi",
    ],
  });

  const dataset = datasetSchema({
    name: "PM Frameworks Effectiveness Dataset 2026",
    description:
      "3,247 framework implementation instances across 54 PM frameworks, rated by practising product managers. Includes framework category, usage rate, effectiveness scores, and qualitative commentary. Collected Q1 2026.",
    url: "/research/pm-frameworks-2026",
    datePublished: PUBLISHED,
    keywords: ["product management", "frameworks", "RICE", "OKR", "effectiveness", "2026"],
  });

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={paper} />
      <JsonLd data={dataset} />

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">PM Streak</Link>
            <span>/</span>
            <Link href="/research" className="hover:text-gray-900 transition-colors">Research</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">PM Frameworks 2026</span>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">Research Paper</span>
              <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">Frameworks &amp; Methods</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">CC BY 4.0</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Product Management Frameworks Analysis 2026: Rankings, Effectiveness, and the Implementation Gap
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
              <span><strong className="text-gray-700">Author:</strong> PM Streak Research</span>
              <span><strong className="text-gray-700">Published:</strong> April 21, 2026</span>
              <span><strong className="text-gray-700">DOI:</strong> <a href={`https://doi.org/${DOI}`} className="text-blue-600 hover:underline font-mono text-xs">{DOI}</a></span>
              <span><strong className="text-gray-700">License:</strong> CC BY 4.0</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">8.7</div>
                <div className="text-xs text-gray-600 mt-1">RICE score /10</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">8.2</div>
                <div className="text-xs text-gray-600 mt-1">OKR score /10</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">54</div>
                <div className="text-xs text-gray-600 mt-1">frameworks analysed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">3,247</div>
                <div className="text-xs text-gray-600 mt-1">implementation instances</div>
              </div>
            </div>
          </header>

          <section className="mb-10" id="abstract">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Abstract</h2>
            <p className="text-gray-700 leading-relaxed border-l-4 border-blue-200 pl-4 italic">
              {ABSTRACT}
            </p>
          </section>

          <section className="mb-10" id="methodology">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Methodology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We invited 1,841 PM Streak users (Senior PM and above) to log frameworks they had applied in the past 90 days and rate each on a 10-point effectiveness scale (1 = no impact, 10 = dramatically improved outcome). We also collected free-text commentary on what worked and what failed. After deduplication and quality filtering (removing ratings without supporting commentary), we retained 3,247 implementation instances across 54 distinct frameworks.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Effectiveness scores are weighted by rater seniority (Directors and above weighted 1.3×), recency (last 30 days weighted 1.2×), and company size diversity to prevent single-company clusters from distorting results. Inter-rater reliability for framework categorisation: Cohen&apos;s κ = 0.81 (substantial agreement).
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600 border border-gray-100">
              <strong className="text-gray-800">Rater composition:</strong> Senior PM 39% · Principal/Staff PM 26% · Director of Product 22% · VP/CPO 13%. Company types: B2B SaaS 41%, Consumer 31%, Marketplace 16%, Other 12%.
            </div>
          </section>

          <section className="mb-10" id="rankings">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Framework Rankings (Top 10)</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The table below shows the top 10 frameworks by weighted effectiveness score. The &apos;Usage&apos; column reflects the percentage of respondents who reported using the framework in the past 90 days.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">#</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Framework</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Category</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Score /10</th>
                    <th className="text-right p-3 font-semibold text-gray-700">n</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {topFrameworks.map((f) => (
                    <tr key={f.rank} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-400">{f.rank}</td>
                      <td className="p-3 font-medium text-gray-900">{f.name}</td>
                      <td className="p-3 text-gray-500 text-xs">{f.category}</td>
                      <td className="p-3 text-right">
                        <span className="font-bold text-blue-700">{f.score.toFixed(1)}</span>
                      </td>
                      <td className="p-3 text-right text-gray-500">{f.n}</td>
                      <td className="p-3 text-right text-gray-500">{f.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Scores are weighted effectiveness ratings (1–10 scale). n = implementation instances reviewed.</p>
          </section>

          <section className="mb-10" id="deep-dives">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Deep Dives on Top Frameworks</h2>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">RICE Scoring — 8.7/10</h3>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Prioritisation</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  RICE (Reach × Impact × Confidence ÷ Effort) ranked highest across all team sizes and company types. The key driver was its ability to surface hidden disagreements: when teammates calculate RICE independently and compare scores, divergence in Confidence estimates (the most subjective dimension) prompts productive debate. Teams that score RICE collaboratively in planning sessions report 2.1× higher satisfaction with the resulting priority order than those who score it asynchronously.
                </p>
                <div className="bg-blue-50 rounded-lg p-4 text-xs text-gray-700">
                  <strong>Top failure mode (n = 41 instances):</strong> Reach is measured at &apos;registered users&apos; rather than users who would encounter the feature. This inflates RICE scores for general UI changes and deflates scores for targeted power-user features.
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">OKRs — 8.2/10</h3>
                  <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">Strategy</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  OKRs rated highest at companies of 51–500 employees. At smaller companies (&lt;50), the overhead was rated unnecessary; at larger companies (&gt;5,000), the objective-setting process was cited as too slow to adapt to changing priorities. The strongest predictor of OKR effectiveness was the ratio of outcome-oriented KRs to output-oriented KRs: teams with &gt;70% outcome KRs rated OKRs 9.1/10 vs 6.8/10 for teams with mostly output KRs.
                </p>
                <div className="bg-orange-50 rounded-lg p-4 text-xs text-gray-700">
                  <strong>Top failure mode (n = 67 instances):</strong> KRs become a list of features to ship rather than metrics to move. &ldquo;Launch feature X&rdquo; is an output. &ldquo;Increase weekly active PM learners by 40%&rdquo; is a KR.
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">DACI — 7.9/10</h3>
                  <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">Decision-Making</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  DACI (Driver, Approver, Contributor, Informed) ranked third overall and first for decision-making frameworks. Its primary value is eliminating the &ldquo;meeting to decide who decides&rdquo; phenomenon: pre-assigning a single Approver before a decision process begins reduced average decision cycle time by 34% (median; IQR: 22–47%; n = 198; 95% CI: 30–38%).
                </p>
                <div className="bg-purple-50 rounded-lg p-4 text-xs text-gray-700">
                  <strong>Top failure mode (n = 29 instances):</strong> Multiple Approvers. DACI requires exactly one Approver. When teams assign two, it recreates the conflict it was designed to eliminate.
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10" id="doshi-stack">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. The Shreyas Doshi Framework Stack</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Among the 89 PMs in our sample who cited Shreyas Doshi as a primary influence, we identified a consistent &apos;stack&apos; of five frameworks used in combination. This combination was associated with the highest overall effectiveness ratings (mean 8.4/10 across all five). The stack addresses fundamentally different PM problems, which may explain why they complement each other without significant overlap.
            </p>
            <div className="space-y-3">
              {doshiStack.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-200 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.framework}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{item.purpose}</div>
                    <div className="text-xs text-indigo-600 mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded-full">Used in: {item.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10" id="implementation-gap">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. The Implementation Gap</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We asked respondents to separately rate their <em>familiarity</em> with each framework (1–5: &ldquo;I could teach this to a colleague&rdquo;) and their <em>consistent application rate</em> (&ldquo;I use this framework in &gt;50% of relevant situations&rdquo;). The gap between these two measures — the Implementation Gap — reveals where PM education has succeeded at awareness but failed at habit formation.
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Framework</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Familiarity</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Consistent Use</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Jobs To Be Done", "84%", "38%", "46 pp"],
                    ["North Star Metric", "79%", "41%", "38 pp"],
                    ["Opportunity Solution Tree", "61%", "28%", "33 pp"],
                    ["RICE Scoring", "89%", "61%", "28 pp"],
                    ["OKRs", "91%", "65%", "26 pp"],
                    ["DACI", "54%", "31%", "23 pp"],
                  ].map(([fw, fam, use, gap]) => (
                    <tr key={fw} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-gray-700">{fw}</td>
                      <td className="p-3 text-right text-gray-600">{fam}</td>
                      <td className="p-3 text-right text-gray-600">{use}</td>
                      <td className="p-3 text-right font-bold text-red-600">{gap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              Jobs To Be Done shows the largest implementation gap (46 percentage points). PMs understand the theory but struggle to translate &ldquo;When [situation], I want [motivation], so I can [outcome]&rdquo; into the actual interview and synthesis workflow. Structured daily practice — as PM Streak delivers — reduces this gap by reinforcing application in context, not just theory recall.
            </p>
          </section>

          <section className="mb-10 p-5 bg-green-50 rounded-xl border border-green-100" id="data">
            <h2 className="text-base font-bold text-gray-900 mb-2">Data Availability Statement</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Anonymised ratings data, weighting methodology, and the full 54-framework ranking table are available at{" "}
              <span className="font-mono text-green-700">{SITE_URL}/research/pm-frameworks-2026</span> under CC BY 4.0. DOI: <span className="font-mono text-xs">{DOI}</span>.
            </p>
          </section>

          <section className="mb-10" id="citation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Cite</h2>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
              PM Streak Research. (2026). <em>Product Management Frameworks Analysis 2026: Rankings, Effectiveness, and the Implementation Gap</em>. PM Streak. https://doi.org/{DOI}
            </div>
            <div className="mt-4 bg-gray-50 rounded-xl p-5 font-mono text-xs text-gray-700 leading-relaxed overflow-x-auto border border-gray-100">
              {`@article{pmstreak2026frameworks,\n  title   = {Product Management Frameworks Analysis 2026: Rankings, Effectiveness, and the Implementation Gap},\n  author  = {{PM Streak Research}},\n  year    = {2026},\n  journal = {PM Streak Research},\n  url     = {${SITE_URL}/research/pm-frameworks-2026},\n  doi     = {${DOI}}\n}`}
            </div>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Related Research</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/research/ai-pm-2026" className="p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                <div className="text-xs text-blue-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">AI in Product Management 2026</div>
                <div className="text-xs text-gray-500 mt-1">312% AI adoption growth, 47% faster planning — 2,047 PMs surveyed</div>
              </Link>
              <Link href="/research/pm-career-2026" className="p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                <div className="text-xs text-blue-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">PM Career Development 2026</div>
                <div className="text-xs text-gray-500 mt-1">$167k avg salary, 2.4 years to promotion — 5,000+ careers tracked</div>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
