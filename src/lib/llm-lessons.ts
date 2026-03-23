import { groq } from "./groq";

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
   - They MUST be situational or conceptual (e.g., "In a scenario where X happens, which approach from the lesson would you apply and why?").
   - Provide a clear, insightful explanation for the correct answer.

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
  });

  const rawResult = completion.choices[0]?.message?.content;
  if (!rawResult) throw new Error("No response from Groq");

  return JSON.parse(rawResult) as GeneratedLessonContent;
}
