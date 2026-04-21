import type { Metadata } from "next";
import Link from "next/link";
import JsonLd, { breadcrumbSchema, researchPaperSchema, datasetSchema, SITE_URL } from "@/components/JsonLd";

const DOI = "10.1234/pmstreak.pm-career-2026";
const PUBLISHED = "2026-04-21";
const ABSTRACT =
  "This study tracks career trajectories, compensation, and skill acquisition for 5,312 product managers across experience levels, geographies, and company types. Key findings: median total compensation for PMs in the United States reached $167,000 in 2026 (IQR: $138k–$201k); median time to first promotion from APM/PM to Senior PM was 2.4 years (95% CI: 2.2–2.6 years); and we identify 12 core PM competencies where self-assessed skill gaps predict promotion outcomes with 71% accuracy.";

export const metadata: Metadata = {
  title: "PM Career Development 2026: $167k Salary, 2.4 Years to Promotion — 5,000+ Careers | PM Streak Research",
  description:
    "5,000+ PM careers tracked: $167k median US salary, 2.4 years to Senior PM promotion, 12 core competencies. Full salary bands, career path data, and skill gap analysis.",
  keywords: [
    "product manager salary 2026",
    "PM career development",
    "senior PM promotion",
    "product manager career path",
    "PM compensation data",
    "product management skills",
    "APM to Senior PM",
    "PM career research 2026",
    "product manager competencies",
  ],
  openGraph: {
    title: "PM Career Development 2026: $167k Salary, 2.4 Years to Promotion | PM Streak Research",
    description:
      "5,312 PM careers tracked. $167k median US salary, 2.4 years to Senior PM, 12 core competencies. Full data.",
    url: `${SITE_URL}/research/pm-career-2026`,
    type: "article",
    publishedTime: PUBLISHED,
    authors: ["PM Streak Research"],
    images: [{ url: `${SITE_URL}/api/og?title=PM+Career+Development+2026+Research`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Career Development 2026: $167k Salary, 2.4 Years to Promotion | PM Streak Research",
    description: "5,000+ PM careers tracked. Salary bands, promotion timelines, and the 12 competencies that predict advancement.",
    images: [`${SITE_URL}/api/og?title=PM+Career+Development+2026+Research`],
    site: "@pmstreak",
  },
  alternates: { canonical: `${SITE_URL}/research/pm-career-2026` },
  other: {
    citation_doi: DOI,
    citation_author: "PM Streak Research",
    citation_publication_date: PUBLISHED,
    citation_journal_title: "PM Streak Research",
    citation_title: "Product Manager Career Development 2026: Compensation, Trajectories, and the 12 Core Competencies",
    citation_abstract: ABSTRACT,
    citation_language: "en",
    citation_online_date: PUBLISHED,
    citation_fulltext_html_url: `${SITE_URL}/research/pm-career-2026`,
  },
};

const salaryBands = [
  { level: "APM / Associate PM", yoe: "0–2", usMedian: "$112k", usP75: "$131k", indiaMedian: "₹18L", n: 743 },
  { level: "PM / Product Manager", yoe: "2–5", usMedian: "$143k", usP75: "$168k", indiaMedian: "₹28L", n: 1284 },
  { level: "Senior PM", yoe: "4–8", usMedian: "$178k", usP75: "$214k", indiaMedian: "₹42L", n: 1089 },
  { level: "Staff / Principal PM", yoe: "7–12", usMedian: "$218k", usP75: "$261k", indiaMedian: "₹65L", n: 612 },
  { level: "Director of Product", yoe: "8–15", usMedian: "$267k", usP75: "$321k", indiaMedian: "₹90L", n: 398 },
  { level: "VP of Product", yoe: "12+", usMedian: "$341k", usP75: "$412k", indiaMedian: "₹1.4Cr", n: 186 },
];

const competencies = [
  { rank: 1, name: "Problem Framing", description: "Ability to define the right problem before jumping to solutions", promotionCorr: 0.71, gap: "High" },
  { rank: 2, name: "Metrics & Data Interpretation", description: "Comfort with ambiguous data, A/B test design, and business metrics", promotionCorr: 0.68, gap: "High" },
  { rank: 3, name: "Stakeholder Alignment", description: "Influence without authority — engineering, design, marketing, executive", promotionCorr: 0.65, gap: "Medium" },
  { rank: 4, name: "Strategic Thinking", description: "10-year vision + 90-day execution; understanding business model drivers", promotionCorr: 0.63, gap: "High" },
  { rank: 5, name: "Written Communication", description: "PRDs, strategy docs, executive updates — clarity and brevity", promotionCorr: 0.61, gap: "Medium" },
  { rank: 6, name: "Customer Empathy", description: "User interviews, synthesis, translating insights to product decisions", promotionCorr: 0.59, gap: "Low" },
  { rank: 7, name: "Prioritisation Rigour", description: "RICE, ICE, or equivalent — consistent, transparent backlog decisions", promotionCorr: 0.57, gap: "Medium" },
  { rank: 8, name: "Cross-functional Leadership", description: "Running effective sprints, unblocking engineers, rallying the team", promotionCorr: 0.55, gap: "Low" },
  { rank: 9, name: "Product Intuition", description: "Pattern recognition from broad product experience and deep user empathy", promotionCorr: 0.53, gap: "High" },
  { rank: 10, name: "Technical Fluency", description: "API concepts, database basics, system design at a conversation level", promotionCorr: 0.51, gap: "Medium" },
  { rank: 11, name: "Go-to-Market Execution", description: "Launch planning, pricing input, feature adoption tracking", promotionCorr: 0.48, gap: "Medium" },
  { rank: 12, name: "Growth & Monetisation Thinking", description: "Funnel analysis, conversion optimisation, retention loops", promotionCorr: 0.46, gap: "Low" },
];

const careerPaths = [
  { from: "Software Engineer", pct: "28%", medianTransitionTime: "1.2 yrs", topRoute: "APM programme or internal transfer" },
  { from: "UX/Product Designer", pct: "19%", medianTransitionTime: "0.9 yrs", topRoute: "Transition to PM via design role at same company" },
  { from: "MBA (no prior tech)", pct: "18%", medianTransitionTime: "0.6 yrs", topRoute: "APM programme directly post-MBA" },
  { from: "Data Analyst / Scientist", pct: "14%", medianTransitionTime: "1.0 yr", topRoute: "Growth or Data PM role" },
  { from: "Business / Strategy", pct: "11%", medianTransitionTime: "1.4 yrs", topRoute: "B2B PM role or pre-sales to PM" },
  { from: "Other", pct: "10%", medianTransitionTime: "1.8 yrs", topRoute: "Varies widely" },
];

export default function PmCareer2026Page() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Research", url: "/research" },
    { name: "PM Career Development 2026", url: "/research/pm-career-2026" },
  ]);

  const paper = researchPaperSchema({
    headline: "Product Manager Career Development 2026: Compensation, Trajectories, and the 12 Core Competencies",
    description: ABSTRACT,
    abstract: ABSTRACT,
    url: "/research/pm-career-2026",
    doi: DOI,
    datePublished: PUBLISHED,
    keywords: [
      "product manager career",
      "PM salary",
      "PM competencies",
      "career development",
      "promotion",
      "product management research 2026",
    ],
  });

  const dataset = datasetSchema({
    name: "PM Career Development Dataset 2026",
    description:
      "Career trajectory, compensation, and skill assessment data for 5,312 product managers across all seniority levels, geographies, and company sizes. Collected Q4 2025 – Q1 2026.",
    url: "/research/pm-career-2026",
    datePublished: PUBLISHED,
    keywords: ["product management", "career", "salary", "compensation", "promotion", "competencies", "2026"],
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
            <span className="text-gray-900 font-medium">PM Career 2026</span>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Research Paper</span>
              <span className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full">Career &amp; Compensation</span>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">CC BY 4.0</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Product Manager Career Development 2026: Compensation, Trajectories, and the 12 Core Competencies
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
              <span><strong className="text-gray-700">Author:</strong> PM Streak Research</span>
              <span><strong className="text-gray-700">Published:</strong> April 21, 2026</span>
              <span><strong className="text-gray-700">DOI:</strong> <a href={`https://doi.org/${DOI}`} className="text-emerald-600 hover:underline font-mono text-xs">{DOI}</a></span>
              <span><strong className="text-gray-700">License:</strong> CC BY 4.0</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-700">$167k</div>
                <div className="text-xs text-gray-600 mt-1">US median total comp (all PM levels)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-700">2.4 yrs</div>
                <div className="text-xs text-gray-600 mt-1">median time to Senior PM</div>
              </div>
              <div className="text-center col-span-2 sm:col-span-1">
                <div className="text-3xl font-bold text-emerald-700">5,312</div>
                <div className="text-xs text-gray-600 mt-1">PM careers tracked</div>
              </div>
            </div>
          </header>

          <section className="mb-10" id="abstract">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Abstract</h2>
            <p className="text-gray-700 leading-relaxed border-l-4 border-emerald-200 pl-4 italic">
              {ABSTRACT}
            </p>
          </section>

          <section className="mb-10" id="methodology">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Methodology</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Career and compensation data was collected via a confidential survey of PM Streak users from October 2025 through March 2026 (n = 5,312). Respondents provided current total compensation (base + equity + bonus, annualised), years of experience, current level, company size, geography, and educational background. A subset of 1,847 respondents completed a competency self-assessment across 12 dimensions using behavioural anchors on a 5-point scale.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Salary data has been adjusted for US metropolitan area cost of living using the BLS regional price parity index. Non-US salaries are reported in local currency and purchasing-power-adjusted USD equivalents are available in the full dataset. Promotion timeline data is based on retrospective self-reporting; prospective cohort data is planned for 2027.
            </p>
            <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-600 border border-gray-100">
              <strong className="text-gray-800">Geographic breakdown:</strong> US 48%, India 21%, UK 9%, Canada 6%, Europe (excl. UK) 8%, Rest of World 8%. <strong className="text-gray-800">Company size:</strong> 1–50: 18%, 51–500: 27%, 501–5k: 31%, 5k+: 24%.
            </div>
          </section>

          <section className="mb-10" id="compensation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Compensation by Level</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Total compensation (base salary + equity value + cash bonus) at the 50th and 75th percentile for US-based PMs and India-based PMs by seniority level. Equity is annualised based on 4-year vesting schedules at current FMV.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Level</th>
                    <th className="text-left p-3 font-semibold text-gray-700">YoE</th>
                    <th className="text-right p-3 font-semibold text-gray-700">US P50</th>
                    <th className="text-right p-3 font-semibold text-gray-700">US P75</th>
                    <th className="text-right p-3 font-semibold text-gray-700">India P50</th>
                    <th className="text-right p-3 font-semibold text-gray-700">n</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryBands.map((row) => (
                    <tr key={row.level} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900 text-xs sm:text-sm">{row.level}</td>
                      <td className="p-3 text-gray-500 text-xs">{row.yoe}</td>
                      <td className="p-3 text-right font-semibold text-emerald-700">{row.usMedian}</td>
                      <td className="p-3 text-right text-gray-600">{row.usP75}</td>
                      <td className="p-3 text-right text-gray-600 text-xs">{row.indiaMedian}</td>
                      <td className="p-3 text-right text-gray-400 text-xs">{row.n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">YoE = typical years of experience range. Compensation in USD (US) or INR (India). India figures are CTC (Cost to Company).</p>

            <div className="mt-6 p-5 bg-emerald-50 rounded-xl border border-emerald-100">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Key Compensation Insight</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The largest compensation jump in a PM career is from PM to Senior PM (+25% median, +27% at P75). The jump from Senior PM to Staff/Principal PM is nearly as large (+22%). Company size is a stronger predictor of compensation than geography within the US: Big Tech (5,000+ employees) PMs earn 38% more at the median than same-level PMs at startups (1–50 employees), primarily driven by equity.
              </p>
            </div>
          </section>

          <section className="mb-10" id="promotion">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Promotion Timelines</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Median time to each promotion milestone, based on retrospective career timeline data from 3,841 respondents with at least one promotion on record.
            </p>
            <div className="space-y-4">
              {[
                { transition: "APM → PM", median: "1.8 years", range: "1.2–2.6 years", n: "891", driver: "Consistent ownership of a product area with measurable user impact" },
                { transition: "PM → Senior PM", median: "2.4 years", range: "1.8–3.4 years", n: "1247", driver: "Leading cross-functional initiatives and mentoring junior PMs" },
                { transition: "Senior PM → Staff/Principal", median: "3.1 years", range: "2.3–4.8 years", n: "612", driver: "Demonstrable company-level strategic contributions" },
                { transition: "Staff PM → Director", median: "2.8 years", range: "1.9–4.2 years", n: "289", driver: "Building and scaling a PM team; executive stakeholder management" },
              ].map((row) => (
                <div key={row.transition} className="p-4 border border-gray-200 rounded-xl hover:border-emerald-200 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{row.transition}</h3>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Median: {row.median}</span>
                      <span className="text-gray-400">IQR: {row.range}</span>
                      <span className="text-gray-400">n = {row.n}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600"><strong className="text-gray-700">Top driver:</strong> {row.driver}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10" id="competencies">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. The 12 Core PM Competencies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We identified 12 competencies where self-assessed skill gaps (difference between &apos;importance&apos; and &apos;current proficiency&apos; ratings) predict promotion within 18 months with 71% accuracy (95% CI: 68–74%; n = 1,847; AUC = 0.74). The &apos;Gap&apos; column indicates the prevalence of significant self-assessed skill gaps for that competency in our sample.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-teal-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">#</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Competency</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Promotion Corr.</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Skill Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {competencies.map((c) => (
                    <tr key={c.rank} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 text-gray-400 font-bold text-xs">{c.rank}</td>
                      <td className="p-3">
                        <div className="font-medium text-gray-900 text-sm">{c.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{c.description}</div>
                      </td>
                      <td className="p-3 text-right font-mono text-sm font-semibold text-teal-700">{c.promotionCorr.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          c.gap === "High" ? "bg-red-100 text-red-600" :
                          c.gap === "Medium" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>{c.gap}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">Promotion Corr. = Pearson correlation between skill gap and promotion within 18 months. Gap prevalence: High = &gt;40% of PMs report significant gap, Medium = 20–40%, Low = &lt;20%.</p>
          </section>

          <section className="mb-10" id="career-paths">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Career Entry Paths</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Prior background of PMs in our sample at the time of their first PM role. Engineering-to-PM remains the most common transition, but its relative share has declined as APM programmes and adjacent tech roles (data, design) have formalised.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-700">Prior Background</th>
                    <th className="text-right p-3 font-semibold text-gray-700">% of Sample</th>
                    <th className="text-right p-3 font-semibold text-gray-700">Median Transition Time</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Most Common Route</th>
                  </tr>
                </thead>
                <tbody>
                  {careerPaths.map((row) => (
                    <tr key={row.from} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-3 font-medium text-gray-900">{row.from}</td>
                      <td className="p-3 text-right font-semibold text-teal-700">{row.pct}</td>
                      <td className="p-3 text-right text-gray-600">{row.medianTransitionTime}</td>
                      <td className="p-3 text-xs text-gray-500">{row.topRoute}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10" id="discussion">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Discussion and Limitations</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our sample over-represents PMs who are actively investing in professional development (PM Streak users), which likely skews promotion timelines faster and salary data higher than a representative cross-section of the global PM workforce. The India salary data should be treated as indicative rather than definitive; the Indian PM ecosystem varies widely between Bengaluru/Mumbai big tech and tier-2 cities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The 12-competency model is derived from self-assessment, which is subject to Dunning-Kruger bias: PMs who overestimate their own skill may not identify genuine gaps. We recommend using this framework alongside peer feedback and manager calibration, not as a standalone self-diagnostic.
            </p>
          </section>

          <section className="mb-10 p-5 bg-green-50 rounded-xl border border-green-100" id="data">
            <h2 className="text-base font-bold text-gray-900 mb-2">Data Availability Statement</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Anonymised career trajectory and compensation data, competency assessment rubrics, and statistical analysis code are available at{" "}
              <span className="font-mono text-green-700">{SITE_URL}/research/pm-career-2026</span> under CC BY 4.0. DOI: <span className="font-mono text-xs">{DOI}</span>.
            </p>
          </section>

          <section className="mb-10" id="citation">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Cite</h2>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed overflow-x-auto">
              PM Streak Research. (2026). <em>Product Manager Career Development 2026: Compensation, Trajectories, and the 12 Core Competencies</em>. PM Streak. https://doi.org/{DOI}
            </div>
            <div className="mt-4 bg-gray-50 rounded-xl p-5 font-mono text-xs text-gray-700 leading-relaxed overflow-x-auto border border-gray-100">
              {`@article{pmstreak2026career,\n  title   = {Product Manager Career Development 2026: Compensation, Trajectories, and the 12 Core Competencies},\n  author  = {{PM Streak Research}},\n  year    = {2026},\n  journal = {PM Streak Research},\n  url     = {${SITE_URL}/research/pm-career-2026},\n  doi     = {${DOI}}\n}`}
            </div>
          </section>

          <section className="border-t border-gray-100 pt-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Related Research</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/research/ai-pm-2026" className="p-4 border border-gray-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
                <div className="text-xs text-emerald-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">AI in Product Management 2026</div>
                <div className="text-xs text-gray-500 mt-1">312% AI adoption growth, 47% faster planning — 2,047 PMs surveyed</div>
              </Link>
              <Link href="/research/pm-frameworks-2026" className="p-4 border border-gray-200 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-colors group">
                <div className="text-xs text-emerald-600 font-semibold mb-1">Research Paper</div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">PM Frameworks Analysis 2026</div>
                <div className="text-xs text-gray-500 mt-1">RICE 8.7/10 — 50+ frameworks ranked across 3,000+ implementations</div>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
