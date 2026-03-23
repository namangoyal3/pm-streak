import { groq } from "./groq";
import { isGenericLessonContent, isWeakQuestionSet } from "./lesson-quality";

export interface SearchResult {
  guest: string;
  episodeTitle: string | null;
  snippet: string;
}

export interface GeneratedLessonContent {
  content: string;
  questions: {
    questionText: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export async function generateActionablePMLesson(
  topic: string,
  results: SearchResult[]
): Promise<GeneratedLessonContent> {
  const context = results
    .map((r, i) => `[Excerpt ${i + 1}] Guest: ${r.guest}\nEpisode: ${r.episodeTitle ?? "N/A"}\nContent: ${r.snippet}`)
    .join("\n\n");

  const prompt = `Act as an elite Product Management coach and former Head of Product at a top-tier tech company (like Stripe, Airbnb, or Uber).
Your task is to create a high-value personal lesson for a Product Manager based on the provided search results from Lenny's Podcast.

TOPIC: ${topic}

TRANSCRIPT HIGHLIGHTS:
${context}

REQUIREMENTS:
1. CONTENT: Extract and synthesize the core, actionable, non-obvious insights. Don't summarize who said what; instead, frame the insights as mental models or execution frameworks the PM can use IMMEDIATELY. Avoid generic advice (e.g., "talk to users"). Focus on "How" and "Why" based on the specific transcript content.
2. FORMAT: Use clean Markdown. Use bolding for emphasis. Include a "Tactical Application" section at the end with 3 specific actions.
3. QUESTIONS: Generate 3 challenging multiple-choice questions. 
   - These MUST NOT be trivial recall (e.g., "What is the guest's name?").
   - NEVER ask identity questions (guest name, who said this, which expert featured).
   - NEVER use template phrasing like "What is the best next step after finishing a lesson on...".
   - Questions MUST be decision-quality and force tradeoff thinking in realistic PM scenarios.
   - At least 2 questions must include a concrete scenario with constraints (time, data quality, team, risk, etc.).
   - At least 2 questions must explicitly force a tradeoff decision (speed vs quality, growth vs retention, short-term vs long-term, etc.).
   - Every question must include either a metric, a tradeoff, or an execution constraint.
   - Wrong options must be plausible, not obviously bad.
   - Provide a clear, insightful explanation for the correct answer referencing transcript insights and why two common PM alternatives are weaker.

CRITICAL QUALITY GUARDRAILS:
- Do not write praise/fanboy statements (e.g. "X is the best", "no one shares more wisdom").
- Do not create identity-recall questions (guest name, show title, "who said this", "featured most prominently").
- Every claim must be traceable to the transcript excerpts above.

OUTPUT FORMAT: Return a valid JSON object only.
{
  "content": "Markdown content string here...",
  "questions": [
    {
      "questionText": "...",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "..."
    }
  ]
}
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama3-70b-8192", // High quality for PM reasoning
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const rawResult = completion.choices[0]?.message?.content;
  if (!rawResult) throw new Error("No response from Groq");
  const parsed = JSON.parse(rawResult) as GeneratedLessonContent;
  if (!isGenericLessonContent(parsed.content) && !isWeakQuestionSet(parsed.questions)) return parsed;

  // One strict rewrite pass when content/questions are generic.
  const rewritePrompt = `Rewrite the lesson content and questions to make them advanced and PM-rigorous.

TOPIC: ${topic}
CURRENT CONTENT:
${parsed.content}

CURRENT QUESTIONS (too weak):
${JSON.stringify(parsed.questions, null, 2)}

Rules:
- Keep exactly 3 questions with 4 options each.
- No identity recall (guest names / who said / featured expert).
- No generic template phrasing.
- Use concrete PM scenarios, tradeoffs, and constraints.
- Each question must include a metric, tradeoff, or execution risk.
- At least 2 questions must contain explicit tradeoff language.
- Explanations must mention why the top option outperforms at least two plausible alternatives.
- Keep "Tactical Application" with exactly 3 concrete actions.
- Keep output as JSON object with keys: content, questions.
`;

  const retry = await groq.chat.completions.create({
    messages: [{ role: "user", content: rewritePrompt }],
    model: "llama3-70b-8192",
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const retryRaw = retry.choices[0]?.message?.content;
  if (!retryRaw) {
    throw new Error("Could not generate high-quality PM lesson content.");
  }
  const retryParsed = JSON.parse(retryRaw) as GeneratedLessonContent;
  if (isGenericLessonContent(retryParsed.content) || isWeakQuestionSet(retryParsed.questions)) {
    throw new Error("Could not generate high-quality PM lesson content.");
  }
  return retryParsed;
}
