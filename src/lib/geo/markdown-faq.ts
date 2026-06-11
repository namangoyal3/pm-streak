/**
 * markdown-faq.ts — Extract structured FAQ and HowTo data from markdown article bodies.
 *
 * These functions parse the `## FAQ` section written by the Forge/Retrofit agents
 * and convert them into schema.org-ready structures for JSON-LD injection.
 */

/**
 * Extract FAQ pairs from a markdown body.
 *
 * Expects an `## FAQ` section with H3 headings as questions and the
 * following paragraph(s) as answers. Also supports "**Q:** ..." / "**A:** ..."
 * patterns as a fallback.
 */
export function extractFaqPairs(body: string): { question: string; answer: string }[] {
  // Extract the ## FAQ section by finding it and collecting lines until the next ## heading.
  const lines = body.split("\n");
  let inSection = false;
  const sectionLines: string[] = [];
  for (const line of lines) {
    if (/^## (FAQ|Frequently Asked Questions)\b/i.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection && /^## /.test(line)) break;
    if (inSection) sectionLines.push(line);
  }
  if (!inSection) return [];

  const section = sectionLines.join("\n").trim();
  const pairs: { question: string; answer: string }[] = [];

  // Strategy 1: ### Question headings followed by answer paragraphs.
  // Parse by splitting the section on ### headings to avoid broken lookahead regexes.
  if (/^### /m.test(section)) {
    const chunks = section.split(/(?=^### )/m);
    for (const chunk of chunks) {
      const lineBreak = chunk.indexOf("\n");
      if (lineBreak === -1 || !chunk.startsWith("### ")) continue;
      const question = chunk.slice(4, lineBreak).trim().replace(/\*\*/g, "");
      const answer = chunk.slice(lineBreak + 1).trim().replace(/\n+/g, " ").replace(/\*\*/g, "").slice(0, 600);
      if (question && answer) pairs.push({ question, answer });
    }
    if (pairs.length > 0) return pairs;
  }

  // Strategy 2: **Bold question?**\nAnswer paragraph (each bold line is a question).
  const boldQPattern = /^\*\*([^*]+\??)\*\*\s*\n([\s\S]*?)(?=\n\*\*|$)/gm;
  let match: RegExpExecArray | null;
  while ((match = boldQPattern.exec(section)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/\n+/g, " ").slice(0, 600);
    if (question && answer) pairs.push({ question, answer });
  }
  if (pairs.length > 0) return pairs;

  // Strategy 3: **Q:** question / **A:** answer
  const qaPattern = /\*\*Q[:\.]?\*\*\s*(.+?)\n\*\*A[:\.]?\*\*\s*([\s\S]*?)(?=\n\*\*Q|$)/gi;
  while ((match = qaPattern.exec(section)) !== null) {
    const question = match[1].trim();
    const answer = match[2].trim().replace(/\n+/g, " ").slice(0, 600);
    if (question && answer) pairs.push({ question, answer });
  }

  return pairs;
}

/**
 * Extract HowTo steps from a markdown body.
 *
 * Only extracts steps that appear under a `## How to...` (case-insensitive) section.
 * Within that section, supports two formats:
 *   1. `### Step name` headings followed by a description paragraph.
 *   2. `1. **Step name**: description` numbered list items.
 *
 * Step names are normalised with a trailing `?` when using the `### Step` format
 * so they read as instructional questions in the schema.
 *
 * Returns [] if no `## How to` section is found, or fewer than 2 steps are extracted.
 */
export function extractHowToSteps(body: string): { name: string; text: string }[] {
  // Extract the ## How to... section using line-based parsing (avoids broken lookahead regexes).
  const lines = body.split("\n");
  let inSection = false;
  const sectionLines: string[] = [];
  for (const line of lines) {
    if (/^## How to\b/i.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection && /^## /.test(line)) break;
    if (inSection) sectionLines.push(line);
  }
  if (!inSection) return [];

  const section = sectionLines.join("\n").trim();
  const steps: { name: string; text: string }[] = [];

  // Strategy 1: ### Step heading / description paragraph
  if (/^### /m.test(section)) {
    const chunks = section.split(/(?=^### )/m);
    for (const chunk of chunks) {
      const lineBreak = chunk.indexOf("\n");
      if (lineBreak === -1 || !chunk.startsWith("### ")) continue;
      const rawName = chunk.slice(4, lineBreak).trim().replace(/\*\*/g, "");
      // Append ? to normalise step names as instructional questions.
      const name = rawName.endsWith("?") ? rawName : `${rawName}?`;
      const text = chunk.slice(lineBreak + 1).trim().replace(/\n+/g, " ").replace(/\*\*/g, "").slice(0, 500);
      if (name) steps.push({ name, text: text || name });
    }
    if (steps.length >= 2) return steps;
    steps.length = 0;
  }

  // Strategy 2: numbered bold list items within the section.
  const stepPattern = /^\d+\.\s+\*\*([^*]+)\*\*[:\s]*(.*)/gm;
  let match: RegExpExecArray | null;
  while ((match = stepPattern.exec(section)) !== null) {
    const name = match[1].trim();
    const text = match[2].trim().slice(0, 500);
    if (name) steps.push({ name, text: text || name });
  }

  return steps.length >= 2 ? steps : [];
}
