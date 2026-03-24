type QuestionLike = {
  questionText: string;
  explanation?: string;
  options?: string[];
};

const LOW_SIGNAL_PATTERNS = [
  "which expert is featured",
  "who is featured",
  "who said",
  "guest",
  "what is the best next step after finishing",
  "after finishing a lesson on",
];

const GENERIC_QUESTION_PATTERNS = [
  "what should a pm do first",
  "what is the most important thing",
  "what is the best way to improve",
  "talk to users",
  "focus on the customer",
  "increase engagement",
  "improve the product",
];

const PM_RIGOR_HINTS = [
  "tradeoff",
  "constraint",
  "metric",
  "retention",
  "activation",
  "funnel",
  "north star",
  "counter-metric",
  "latency",
  "sample size",
  "confidence",
  "risk",
  "timeline",
  "stakeholder",
];

const SCENARIO_HINTS = [
  "you are",
  "your team",
  "launch",
  "deadline",
  "in 2 weeks",
  "in 30 days",
  "experiment",
  "rollout",
  "stakeholder",
  "engineering capacity",
  "limited data",
  "small sample",
  "high risk",
  "compliance",
];

const TRADEOFF_HINTS = [
  "tradeoff",
  "vs",
  "versus",
  "opportunity cost",
  "sacrifice",
  "balance",
  "prioritize",
  "constraint",
  "risk",
];

const GENERIC_CONTENT_PATTERNS = [
  "it depends",
  "talk to users",
  "align stakeholders",
  "be data-driven",
  "ship fast",
  "iterate quickly",
  "focus on impact",
];

export function isLowSignalQuestion(questionText: string): boolean {
  const q = questionText.toLowerCase();
  return LOW_SIGNAL_PATTERNS.some((pattern) => q.includes(pattern));
}

function isGenericQuestion(questionText: string): boolean {
  const q = questionText.toLowerCase();
  return GENERIC_QUESTION_PATTERNS.some((pattern) => q.includes(pattern));
}

function hasPmRigor(text: string): boolean {
  const t = text.toLowerCase();
  return PM_RIGOR_HINTS.some((hint) => t.includes(hint));
}

function hasScenarioSignal(text: string): boolean {
  const t = text.toLowerCase();
  return SCENARIO_HINTS.some((hint) => t.includes(hint)) || /\d+%|\d+\s?(days|weeks|months|users)/i.test(t);
}

function hasTradeoffSignal(text: string): boolean {
  const t = text.toLowerCase();
  return TRADEOFF_HINTS.some((hint) => t.includes(hint));
}

export function isGenericLessonContent(content: unknown): boolean {
  const text = (typeof content === "string" ? content : JSON.stringify(content ?? "")).toLowerCase();
  if (text.length < 500) return true;
  if (!text.includes("tactical application")) return true;
  const genericHits = GENERIC_CONTENT_PATTERNS.filter((p) => text.includes(p)).length;
  return genericHits >= 3;
}

export function isWeakQuestionSet(questions: QuestionLike[]): boolean {
  if (!Array.isArray(questions) || questions.length < 3) return true;

  const seen = new Set<string>();
  let rigorousCount = 0;
  let scenarioCount = 0;
  let tradeoffCount = 0;
  for (const q of questions) {
    if (!q?.questionText) return true;
    const norm = q.questionText.toLowerCase().trim();
    if (seen.has(norm)) return true;
    seen.add(norm);
    if (isLowSignalQuestion(norm)) return true;
    if (isGenericQuestion(norm)) return true;
    if (q.options && q.options.length !== 4) return true;
    if (hasScenarioSignal(norm)) scenarioCount += 1;
    if (hasTradeoffSignal(norm) || hasTradeoffSignal(q.explanation ?? "")) tradeoffCount += 1;
    if (hasPmRigor(norm) || hasPmRigor(q.explanation ?? "")) rigorousCount += 1;
  }
  return rigorousCount < 3 || scenarioCount < 2 || tradeoffCount < 2;
}
