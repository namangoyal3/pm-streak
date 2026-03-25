import Groq from "groq-sdk";
import type { ChatCompletion } from "groq-sdk/resources/chat/completions";

// SECURITY: All Groq API keys must be supplied via environment variables.
// Keys previously hardcoded here were exposed in git history and should be
// rotated at console.groq.com immediately.
// Set GROQ_API_KEY (primary) and GROQ_API_KEY_2 through GROQ_API_KEY_5
// (fallback rotation keys) in .env.local and Vercel environment settings.

// Lazy — read at call time so scripts that load .env.local after module init work correctly.
function getGroqKeys(): string[] {
  return [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
    process.env.GROQ_API_KEY_4,
    process.env.GROQ_API_KEY_5,
  ].filter((k): k is string => Boolean(k));
}

let currentKeyIndex = 0;

function getClient() {
  const keys = getGroqKeys();
  if (keys.length === 0) {
    throw new Error("No Groq API keys configured. Set GROQ_API_KEY in environment variables.");
  }
  return new Groq({ apiKey: keys[currentKeyIndex % keys.length]! });
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

// Free models to try in order when OpenRouter primary is rate-limited.
// Note: response_format is NOT sent to OpenRouter — free models have inconsistent
// support for JSON mode. The prompt asks for JSON; extractJSON() handles fences.
// Ordered by reliability (verified 2025-03-25) — fast-failing models last.
const OPENROUTER_FREE_MODELS = [
  "google/gemma-3-12b-it:free",                // Google AI Studio — reliable & fast
  "arcee-ai/trinity-large-preview:free",       // reliable backup
  "google/gemma-3-27b-it:free",                // larger Gemma fallback
  "meta-llama/llama-3.3-70b-instruct:free",    // Venice provider; often rate-limited
  "nousresearch/hermes-3-llama-3.1-405b:free", // last resort
];

/**
 * Calls OpenRouter as a fallback when all Groq keys are exhausted.
 * Tries multiple free models with retry/backoff on 429.
 * Does NOT send response_format — most free models don't support JSON mode.
 * The prompt already explicitly requests JSON output.
 */
async function groqCreateViaOpenRouter(
  params: Parameters<Groq["chat"]["completions"]["create"]>[0]
): Promise<ChatCompletion> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not set — cannot fall back to OpenRouter");
  }

  const p = params as { temperature?: number; max_tokens?: number };

  for (const model of OPENROUTER_FREE_MODELS) {
    const body = {
      model,
      messages: params.messages,
      temperature: p.temperature,
      max_tokens: p.max_tokens,
      // response_format intentionally omitted — free models have inconsistent support
    };

    // Retry up to 2 times with backoff per model
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log(`[groq] OpenRouter success with model: ${model}`);
        return res.json() as Promise<ChatCompletion>;
      }

      if (res.status === 429) {
        const waitMs = (attempt + 1) * 15_000; // 15s, 30s, 45s
        console.warn(`[groq] OpenRouter 429 on ${model} (attempt ${attempt + 1}), waiting ${waitMs / 1000}s...`);
        await new Promise((r) => setTimeout(r, waitMs));
        continue;
      }

      // Non-429 error — skip to next model
      const text = await res.text();
      console.warn(`[groq] OpenRouter error ${res.status} on ${model}: ${text.slice(0, 200)}`);
      break;
    }
  }

  throw new Error("All OpenRouter free models exhausted");
}

/**
 * Wraps a Groq API call and rotates the key on 429 rate-limit errors.
 * Falls back to OpenRouter (free Llama 3.3 70B) when all Groq keys are exhausted.
 * Use this instead of calling groq.chat.completions.create directly.
 */
export async function groqCreate(
  params: Parameters<Groq["chat"]["completions"]["create"]>[0]
): Promise<ChatCompletion> {
  const keys = getGroqKeys();

  if (keys.length === 0) {
    console.warn("[groq] No Groq keys configured — falling back to OpenRouter");
    return groqCreateViaOpenRouter(params);
  }

  for (let attempt = 0; attempt < keys.length; attempt++) {
    try {
      const client = getClient();
      return await client.chat.completions.create({ ...params, stream: false }) as ChatCompletion;
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 429) {
        if (currentKeyIndex < keys.length - 1) {
          currentKeyIndex++;
          console.warn(`[groq] rate-limited on key ${attempt + 1}, rotating to key ${currentKeyIndex + 1}`);
          continue;
        }
        // All Groq keys exhausted — fall back to OpenRouter
        console.warn("[groq] all Groq keys rate-limited — falling back to OpenRouter");
        return groqCreateViaOpenRouter(params);
      }
      throw err;
    }
  }

  // Shouldn't reach here, but fall back just in case
  console.warn("[groq] all Groq key attempts exhausted — falling back to OpenRouter");
  return groqCreateViaOpenRouter(params);
}
