// Tolerant JSON parser for LLM output that may contain literal newlines
// or unescaped control characters inside string values. Tries strict
// JSON.parse first, then falls back to a character-level repair pass.
//
// Used by Signal's publishing route to defend against the model occasionally
// breaking the strict JSON contract.

export type RepairResult<T = unknown> = {
  ok: boolean;
  parsed?: T;
  repaired?: boolean;
  reason?: string;
};

/** Strip a fenced ```json block if present; otherwise return the input. */
export function unwrapJsonFence(text: string): string {
  const fence = text.match(/```(?:json|JSON)?\s*\n([\s\S]*?)\n```/);
  return fence ? fence[1] : text;
}

/**
 * Walk the candidate string char-by-char. When inside a string value
 * (between unescaped double quotes), escape any raw control characters
 * (\n, \r, \t, etc.) so the resulting blob is valid JSON.
 */
export function escapeStringControlChars(input: string): string {
  let inString = false;
  let escaped = false;
  let out = "";
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (!inString) {
      out += c;
      if (c === '"') inString = true;
      continue;
    }
    // inside a string
    if (escaped) {
      out += c;
      escaped = false;
      continue;
    }
    if (c === "\\") {
      // Look ahead: if the next char is a raw control char, the model meant
      // a line-continuation; convert backslash+newline to a proper \n.
      const next = input[i + 1];
      if (next === "\n") { out += "\\n"; i++; continue; }
      if (next === "\r") { out += "\\r"; i++; continue; }
      if (next === "\t") { out += "\\t"; i++; continue; }
      out += c;
      escaped = true;
      continue;
    }
    if (c === '"') {
      out += c;
      inString = false;
      continue;
    }
    // raw control characters that JSON forbids inside strings
    if (c === "\n") { out += "\\n"; continue; }
    if (c === "\r") { out += "\\r"; continue; }
    if (c === "\t") { out += "\\t"; continue; }
    out += c;
  }
  return out;
}

export function tolerantJsonParse<T = unknown>(text: string): RepairResult<T> {
  const unwrapped = unwrapJsonFence(text);
  // Find the outermost JSON value (object or array)
  const firstObj = unwrapped.indexOf("{");
  const firstArr = unwrapped.indexOf("[");
  let start = -1;
  let endChar = "}";
  if (firstObj === -1 && firstArr === -1) return { ok: false, reason: "no JSON value found" };
  if (firstObj !== -1 && (firstArr === -1 || firstObj < firstArr)) {
    start = firstObj;
    endChar = "}";
  } else {
    start = firstArr;
    endChar = "]";
  }
  const end = unwrapped.lastIndexOf(endChar);
  if (end <= start) return { ok: false, reason: "no closing delimiter" };
  const slice = unwrapped.slice(start, end + 1);

  // Strict pass
  try {
    return { ok: true, parsed: JSON.parse(slice) as T, repaired: false };
  } catch {
    // fall through
  }
  // Repair pass
  try {
    const repaired = escapeStringControlChars(slice);
    return { ok: true, parsed: JSON.parse(repaired) as T, repaired: true };
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
}
