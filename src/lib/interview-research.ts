/**
 * Enriches JD-based interview prep with frameworks, company expectations,
 * and archetype questions — Groq synthesis plus optional Firecrawl snippets.
 */
import { groqCreate } from "@/lib/groq";
import type { JDParseResult } from "@/lib/pm-foundations";

export type InterviewPrepContext = {
  frameworks: { name: string; summary: string; whenToUse: string }[];
  companySignals: { theme: string; whyItMatters: string }[];
  archetypeQuestions: { question: string; whatToDemo: string }[];
  readingLinks: { title: string; note: string }[];
  webSnippets?: string[];
};

const ENRICH_SYSTEM = `You are a senior PM hiring manager and coach. You combine widely-cited PM interview frameworks with how real companies evaluate candidates.

Return ONLY valid JSON with this exact shape:
{
  "frameworks": [{ "name": "string", "summary": "string", "whenToUse": "string" }],
  "companySignals": [{ "theme": "string", "whyItMatters": "string" }],
  "archetypeQuestions": [{ "question": "string", "whatToDemo": "string" }],
  "readingLinks": [{ "title": "string", "note": "string" }]
}

Rules:
- Include 5–7 frameworks drawn from established PM practice (e.g. CIRCLES, RICE, AARM, STAR, HEART, North Star, trade-off matrices, metric trees, discovery vs delivery) — name them accurately and explain when to use each for THIS role.
- companySignals: 5–7 themes recruiters and hiring managers often probe for this seniority + domain (e.g. stakeholder management, ambiguity, metrics rigor, AI product judgment). Tie to the JD where possible.
- archetypeQuestions: 6–10 realistic interview-style questions that map to the JD skills and level — not generic "tell me about yourself"; include scenario and trade-off prompts.
- readingLinks: optional study hooks (books, essays, canonical PM resources) as titles + short notes — no URLs required.
- No fake citations or company-specific confidential data; speak in patterns ("many teams look for…").`;

async function optionalFirecrawlSnippets(query: string): Promise<string[]> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return [];
  const snippets: string[] = [];
  const urls = [
    "https://www.tryexponent.com/blog/product-manager-interview-questions",
    "https://www.lennysnewsletter.com/p/how-to-prepare-for-a-product-management-interview",
  ];
  for (const url of urls) {
    try {
      const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ url, formats: ["markdown"], onlyMainContent: true }),
        signal: AbortSignal.timeout(12000),
      });
      if (!res.ok) continue;
      const data = (await res.json()) as { data?: { markdown?: string } };
      const md = data.data?.markdown?.slice(0, 4000);
      if (md) snippets.push(`Source excerpt (${url}):\n${md}`);
    } catch {
      /* ignore */
    }
  }
  if (snippets.length === 0) {
    try {
      const res = await fetch("https://api.firecrawl.dev/v1/search", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ query: `PM interview frameworks ${query}`.slice(0, 200), limit: 2 }),
        signal: AbortSignal.timeout(12000),
      });
      if (res.ok) {
        const data = (await res.json()) as { data?: Array<{ markdown?: string; title?: string }> };
        for (const item of data.data ?? []) {
          if (item.markdown) snippets.push(item.markdown.slice(0, 2500));
        }
      }
    } catch {
      /* ignore */
    }
  }
  return snippets;
}

export async function enrichInterviewPrepContext(params: {
  roleTitle: string;
  company: string;
  parsed: JDParseResult;
  jdExcerpt: string;
}): Promise<InterviewPrepContext> {
  const { roleTitle, company, parsed, jdExcerpt } = params;
  const webSnippets = await optionalFirecrawlSnippets(`${company} ${roleTitle}`);

  const userContent = [
    `Role title: ${roleTitle}`,
    `Company: ${company}`,
    `Level: ${parsed.level}`,
    `Domain: ${parsed.domain}`,
    `Skills from JD: ${parsed.skills.join(", ")}`,
    `Must-have signals: ${parsed.mustHave.join("; ")}`,
    `Nice-to-have: ${parsed.niceToHave.join("; ")}`,
    `Interview focus weights: ${JSON.stringify(parsed.estimatedInterviewFocus)}`,
    "",
    "Job description excerpt:",
    jdExcerpt.slice(0, 6000),
    "",
    webSnippets.length
      ? `Optional web research snippets (may be partial):\n${webSnippets.join("\n\n---\n\n").slice(0, 8000)}`
      : "",
  ].join("\n");

  const result = await groqCreate({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: ENRICH_SYSTEM },
      { role: "user", content: userContent },
    ],
    temperature: 0.45,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const raw = result.choices[0]?.message?.content ?? "";
  let parsedJson: InterviewPrepContext;
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    parsedJson = JSON.parse(match?.[0] ?? raw) as InterviewPrepContext;
  } catch {
    return {
      frameworks: [
        {
          name: "CIRCLES",
          summary: "Comprehend, Identify, Report, Cut, List, Evaluate, Summarize — structure for product sense.",
          whenToUse: "Design or improve a product for a user segment.",
        },
      ],
      companySignals: [
        { theme: "Structured communication", whyItMatters: "Interviewers score clarity and trade-offs explicitly." },
      ],
      archetypeQuestions: [
        {
          question: `How would you prioritize roadmap items for ${roleTitle} at ${company}?`,
          whatToDemo: "Framework + metrics + stakeholder alignment.",
        },
      ],
      readingLinks: [{ title: "Cracking the PM Interview", note: "Classic prep for loops and estimation." }],
      webSnippets: webSnippets.length ? webSnippets.map((s) => s.slice(0, 500)) : undefined,
    };
  }

  if (webSnippets.length) {
    parsedJson.webSnippets = webSnippets.map((s) => s.slice(0, 600));
  }

  return parsedJson;
}
