/**
 * Build Lenny-style quiz options from transcript text so questions test real episode
 * insights, not generic PM trivia.
 */

export function normalizeSpace(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

/** Split prose into candidate sentences for MCQ options (min length drops fragments). */
export function extractSentences(
  text: string,
  minLength = 42,
  maxSentences = 16
): string[] {
  const normalized = normalizeSpace(text);
  if (!normalized) return [];
  const parts = normalized
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= minLength);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts) {
    const key = p.slice(0, 80).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
    if (out.length >= maxSentences) break;
  }
  return out;
}

export function truncateOption(s: string, max = 190): string {
  const t = normalizeSpace(s);
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function sharedPrefixLen(a: string, b: string): number {
  let n = 0;
  const lim = Math.min(a.length, b.length);
  while (n < lim && a[n]!.toLowerCase() === b[n]!.toLowerCase()) n++;
  return n;
}

/** True if two options would feel duplicate to a learner. */
export function isTooSimilar(a: string, b: string): boolean {
  if (a === b) return true;
  const al = normalizeSpace(a).toLowerCase();
  const bl = normalizeSpace(b).toLowerCase();
  if (al.length < 20 || bl.length < 20) return false;
  if (sharedPrefixLen(al, bl) >= 55) return true;
  if (al.includes(bl.slice(0, 45)) || bl.includes(al.slice(0, 45))) return true;
  return false;
}

/**
 * Pick up to `count` sentences from `pool` that differ from `anchor` and each other.
 */
export function pickDistinctSentences(
  pool: string[],
  anchor: string,
  count: number
): string[] {
  const out: string[] = [];
  for (const s of pool) {
    if (isTooSimilar(s, anchor)) continue;
    if (out.some((o) => isTooSimilar(o, s))) continue;
    out.push(s);
    if (out.length === count) break;
  }
  return out;
}

/** Shuffles correct answer among wrongs; returns options + correctIndex (deterministic via seed string). */
export function insertCorrectAnswer<T>(options: T[], correctValue: T, seed: string) {
  const insertIndex =
    seed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    (options.length + 1);
  const result = [...options];
  result.splice(insertIndex, 0, correctValue);
  return { options: result, correctIndex: insertIndex };
}

/**
 * Build 3 quiz questions for archive lessons: all distractors prefer transcript sentences.
 */
export function buildArchiveInsightQuestions(input: {
  title: string;
  topic: string;
  guest: string;
  highlights: string[];
  summary: string;
}) {
  const { title, topic, guest, highlights, summary } = input;
  const h0 = highlights[0] ?? "";
  const h1 = highlights[1] ?? h0;
  const h2 = highlights[2] ?? h1;

  const pool = highlights.flatMap((h) => extractSentences(h, 40, 12));
  const primary =
    summary.length >= 45 ? summary : extractSentences(h0, 40)[0] ?? truncateOption(h0, 160);

  const wrong1 = pickDistinctSentences(pool, primary, 3);
  while (wrong1.length < 3) {
    wrong1.push(
      `A PM should treat ${topic} as unrelated to user value until after launch.`
    );
    if (wrong1.length >= 3) break;
    wrong1.push(
      `The discussion frames ${topic} as purely a marketing narrative, not a product skill.`
    );
    if (wrong1.length >= 3) break;
    wrong1.push(
      `The episode recommends deferring any ${topic} tradeoff decisions to finance only.`
    );
  }

  const q1 = insertCorrectAnswer(
    wrong1.slice(0, 3).map(truncateOption),
    truncateOption(primary),
    `${guest}-main-${topic}`
  );

  const secondPool = [...extractSentences(h1, 40), ...extractSentences(h2, 40)].filter(
    (s) => !isTooSimilar(s, primary)
  );
  let secondary =
    secondPool[0] ??
    extractSentences(h1, 35)[1] ??
    extractSentences(h0, 35)[1] ??
    primary;

  if (isTooSimilar(secondary, primary)) {
    const alt = pool.find((s) => !isTooSimilar(s, primary));
    if (alt) secondary = alt;
  }
  if (isTooSimilar(secondary, primary)) {
    secondary = `The episode also ties ${topic} to how teams turn qualitative insight into experiments and measurable follow-up.`;
  }

  const wrong2 = pickDistinctSentences(
    [...pool, ...extractSentences(h0, 35)].filter((s) => !isTooSimilar(s, secondary)),
    secondary,
    3
  );
  const wrong2Pad = [...wrong2];
  while (wrong2Pad.length < 3) {
    wrong2Pad.push(
      `According to this episode, ${topic} matters only for enterprise sales cycles.`
    );
    if (wrong2Pad.length >= 3) break;
    wrong2Pad.push(
      `The transcript treats ${topic} as a hiring filter, not a product decision lens.`
    );
    if (wrong2Pad.length >= 3) break;
    wrong2Pad.push(
      `The guest argues ${topic} should be owned entirely by design, not product.`
    );
  }

  const q2 = insertCorrectAnswer(
    wrong2Pad.slice(0, 3).map(truncateOption),
    truncateOption(secondary),
    `${guest}-detail-${topic}`
  );

  const actionCorrect = `Use one concrete idea from this episode about ${topic} in a roadmap, review, or metric you already own this week.`;
  const q3 = {
    questionText: `As a PM, what does applying this episode on ${topic} look like in practice?`,
    options: [
      actionCorrect,
      `Memorize the episode title and guest name for status meetings, without changing product decisions.`,
      `Wait for a perfect data set before running any small experiment tied to ${topic}.`,
      `Document ${topic} in slides only, with no tie-in to team priorities or users.`,
    ],
    correctIndex: 0,
    explanation: `Insights from "${title}" stick when they change a decision, metric, or stakeholder conversation — not when they stay in notes.`,
  };

  return [
    {
      questionText: `What is the main PM-relevant through-line the guest argues in this Lenny's Podcast episode?`,
      options: q1.options,
      correctIndex: q1.correctIndex,
      explanation: `This matches the foundational idea pulled from the transcript highlights for "${title}".`,
    },
    {
      questionText: `Which statement is also supported by the transcript highlights in this lesson (beyond the main idea)?`,
      options: q2.options,
      correctIndex: q2.correctIndex,
      explanation: `This comes from the same episode excerpts bundled into this lesson — test recall of a second key point.`,
    },
    q3,
  ];
}

export type ExploreSnippet = {
  guest: string;
  episodeTitle: string | null;
  snippet: string;
};

/**
 * Explore / AI-generated lessons: quiz options come from transcript snippets, not generic distractors.
 */
export function buildExploreInsightQuestions(topic: string, results: ExploreSnippet[]) {
  const lead = results[0];
  const second = results[1] ?? lead;

  const leadSnip = normalizeSpace(cleanSnippetForExplore(lead.snippet));
  const secondSnip = normalizeSpace(cleanSnippetForExplore(second.snippet));

  const poolLead = extractSentences(leadSnip, 40, 14);
  const poolSecond = extractSentences(secondSnip, 40, 14);
  const pool = [...poolLead, ...poolSecond];

  const primary = poolLead[0] ?? `${topic} shows up in how teams prioritize evidence, ship learning loops, and define success.`;
  const wrong1 = pickDistinctSentences(pool.filter((s) => !isTooSimilar(s, primary)), primary, 3);
  while (wrong1.length < 3) {
    wrong1.push(
      `Treat ${topic} as a branding exercise with no user or metric implications.`
    );
    if (wrong1.length >= 3) break;
    wrong1.push(
      `The excerpts suggest ${topic} is irrelevant until after a Series B round.`
    );
    if (wrong1.length >= 3) break;
    wrong1.push(
      `The lesson implies ${topic} should be delegated entirely to sales leadership.`
    );
  }

  const q1 = insertCorrectAnswer(
    wrong1.slice(0, 3).map(truncateOption),
    truncateOption(primary),
    `explore-main-${topic}`
  );

  let secondary =
    poolSecond.find((s) => !isTooSimilar(s, primary)) ??
    poolSecond[1] ??
    poolLead[1] ??
    primary;

  if (isTooSimilar(secondary, primary)) {
    const alt = pool.find((s) => !isTooSimilar(s, primary));
    if (alt) secondary = alt;
  }
  if (isTooSimilar(secondary, primary)) {
    secondary = `The excerpts also emphasize ${topic} in the context of evidence, tradeoffs, and what to ship next.`;
  }

  const wrong2 = pickDistinctSentences(
    pool.filter((s) => !isTooSimilar(s, secondary)),
    secondary,
    3
  );
  const wrong2Pad = [...wrong2];
  while (wrong2Pad.length < 3) {
    wrong2Pad.push(
      `The supporting excerpts claim ${topic} is only about hiring PMs, not product outcomes.`
    );
    if (wrong2Pad.length >= 3) break;
    wrong2Pad.push(
      `The lesson argues you should ignore ${topic} until analytics owns the dashboard.`
    );
    if (wrong2Pad.length >= 3) break;
    wrong2Pad.push(
      `The transcript treats ${topic} as a one-time launch checklist item.`
    );
  }

  const q2 = insertCorrectAnswer(
    wrong2Pad.slice(0, 3).map(truncateOption),
    truncateOption(secondary),
    `explore-sec-${topic}`
  );

  const leadCredit = lead.episodeTitle ? `“${lead.episodeTitle}”` : lead.guest;

  return [
    {
      questionText: `Which takeaway is most directly supported by the Lenny transcript excerpts in this lesson on ${topic}?`,
      options: q1.options,
      correctIndex: q1.correctIndex,
      explanation: `This matches the clearest claim in the leading excerpt (${leadCredit}).`,
    },
    {
      questionText:
        results.length > 1
          ? `Which additional point do the Lenny podcast excerpts make about ${topic}?`
          : `Which supporting pattern do the excerpts emphasize for PMs working on ${topic}?`,
      options: q2.options,
      correctIndex: q2.correctIndex,
      explanation:
        results.length > 1
          ? `This reflects a second supporting excerpt in the lesson bundle.`
          : `This is drawn from the same transcript bundle as the main excerpt.`,
    },
    {
      questionText: `How should a PM apply this lesson on ${topic} within the next week?`,
      options: [
        `Ship one small experiment tied to ${topic} using a metric and owner you already have.`,
        `Add ${topic} to a slide deck without changing any roadmap or stakeholder conversation.`,
        `Wait for perfect instrumentation before testing anything related to ${topic}.`,
        `Keep ${topic} as inspiration only — no tie to team priorities or users.`,
      ],
      correctIndex: 0,
      explanation:
        "The fastest way to retain an episode insight is to turn it into a concrete product or leadership action the same week.",
    },
  ];
}

function cleanSnippetForExplore(snippet: string, maxLength = 620) {
  const cleaned = snippet
    .replace(/\b[A-Za-z .'()-]+ \(\d{2}:\d{2}:\d{2}\):\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength).trim()}...` : cleaned;
}
