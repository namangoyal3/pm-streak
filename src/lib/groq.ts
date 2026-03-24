import Groq from "groq-sdk";
import type { ChatCompletion } from "groq-sdk/resources/chat/completions";

// SECURITY: All Groq API keys must be supplied via environment variables.
// Keys previously hardcoded here were exposed in git history and should be
// rotated at console.groq.com immediately.
// Set GROQ_API_KEY (primary) and GROQ_API_KEY_2 through GROQ_API_KEY_5
// (fallback rotation keys) in .env.local and Vercel environment settings.
const GROQ_KEYS = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4,
  process.env.GROQ_API_KEY_5,
].filter((k): k is string => Boolean(k));

if (GROQ_KEYS.length === 0) {
  console.error("[groq] CRITICAL: No Groq API keys configured. Set GROQ_API_KEY in environment variables.");
}

let currentKeyIndex = 0;

function getClient() {
  if (GROQ_KEYS.length === 0) {
    throw new Error("No Groq API keys configured. Set GROQ_API_KEY in environment variables.");
  }
  return new Groq({ apiKey: GROQ_KEYS[currentKeyIndex]! });
}

/**
 * Groq client that automatically rotates to the next API key on rate-limit (429) errors.
 * Usage: same as the regular groq client — call groq.chat.completions.create(...)
 */
export const groq = new Proxy({} as Groq, {
  get(_target, prop) {
    const client = getClient();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value !== "function") return value;
    // Wrap top-level methods (e.g. groq.chat is an object, not a function)
    return value.bind(client);
  },
});

/**
 * Wraps a Groq API call and rotates the key on 429 rate-limit errors.
 * Use this instead of calling groq.chat.completions.create directly.
 */
export async function groqCreate(
  params: Parameters<Groq["chat"]["completions"]["create"]>[0]
): Promise<ChatCompletion> {
  for (let attempt = 0; attempt < GROQ_KEYS.length; attempt++) {
    try {
      const client = getClient();
      return await client.chat.completions.create({ ...params, stream: false }) as ChatCompletion;
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 429 && currentKeyIndex < GROQ_KEYS.length - 1) {
        currentKeyIndex++;
        console.warn(`[groq] rate-limited on key ${attempt + 1}, rotating to key ${currentKeyIndex + 1}`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("All Groq API keys exhausted");
}
