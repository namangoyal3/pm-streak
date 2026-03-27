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

// Models to try in order when Groq keys are exhausted.
// Paid Gemini Flash models are primary — reliable, cheap (~$0.001/lesson), support JSON mode.
// Free models are last-resort fallbacks.
const OPENROUTER_MODELS: Array<{ id: string; supportsJsonMode: boolean; maxAttempts: number }> = [
  { id: "google/gemini-flash-1.5-8b",               supportsJsonMode: true,  maxAttempts: 2 },
  { id: "google/gemini-flash-1.5",                   supportsJsonMode: true,  maxAttempts: 2 },
  { id: "meta-llama/llama-3.1-8b-instruct:free",     supportsJsonMode: false, maxAttempts: 1 },
  { id: "google/gemma-3-12b-it:free",                supportsJsonMode: false, maxAttempts: 1 },
  { id: "meta-llama/llama-3.3-70b-instruct:free",    supportsJsonMode: false, maxAttempts: 1 },
];

/**
 * Calls OpenRouter as a fallback when all Groq keys are exhausted.
 * Tries paid Gemini Flash models first (reliable, cheap, support JSON mode),
 * then falls back to free models as last resort.
 */
async function groqCreateViaOpenRouter(
  params: Parameters<Groq["chat"]["completions"]["create"]>[0]
): Promise<ChatCompletion> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY not set — cannot fall back to OpenRouter");
  }

  const p = params as { temperature?: number; max_tokens?: number; response_format?: { type: string } };
  // Cap max_tokens — lesson output is ~2-3k tokens; 3500 covers quality rewrites too.
  const maxTokens = Math.min(p.max_tokens ?? 3500, 3500);
  const wantsJson = p.response_format?.type === "json_object";

  for (const model of OPENROUTER_MODELS) {
    const body: Record<string, unknown> = {
      model: model.id,
      messages: params.messages,
      temperature: p.temperature,
      max_tokens: maxTokens,
    };
    // Pass JSON mode only to models that reliably support it (Gemini Flash).
    // Free models skip it — the prompt explicitly requests JSON output instead.
    if (wantsJson && model.supportsJsonMode) {
      body.response_format = { type: "json_object" };
    }

    for (let attempt = 0; attempt < model.maxAttempts; attempt++) {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json() as ChatCompletion & { error?: { code?: number; message?: string } };
        // OpenRouter wraps provider errors as 200 with an error field
        if (data.error) {
          const isLastAttempt = attempt >= model.maxAttempts - 1;
          console.warn(`[groq] OpenRouter ${model.id} error (${data.error.code}): ${data.error.message}${isLastAttempt ? " — trying next model" : " — retrying"}`);
          if (!isLastAttempt) continue;
          break;
        }
        if (!Array.isArray(data.choices) || data.choices.length === 0) {
          console.warn(`[groq] OpenRouter ${model.id} returned no choices: ${JSON.stringify(data).slice(0, 200)}`);
          break;
        }
        console.log(`[groq] OpenRouter success with model: ${model.id}`);
        return data;
      }

      if (res.status === 429) {
        console.warn(`[groq] OpenRouter 429 on ${model.id} — trying next model`);
        break;
      }

      const text = await res.text();
      console.warn(`[groq] OpenRouter error ${res.status} on ${model.id}: ${text.slice(0, 200)}`);
      break;
    }
  }

  // All models exhausted — throw immediately. A long wait is not viable in
  // serverless environments (Vercel max ~60s) and would always cause a timeout.
  console.warn("[groq] All OpenRouter models exhausted");
  throw new Error("All AI models are currently rate-limited. Please try again in a few minutes.");
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

  // Try each key once, starting from the current index and wrapping around.
  // Use a local offset so we don't skip recovered keys on future requests.
  const startIndex = currentKeyIndex;
  for (let i = 0; i < keys.length; i++) {
    const keyIndex = (startIndex + i) % keys.length;
    try {
      const client = new Groq({ apiKey: keys[keyIndex]! });
      return await client.chat.completions.create({ ...params, stream: false }) as ChatCompletion;
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 429) {
        // Advance the global index so the next request also skips this exhausted key,
        // but only move forward — don't wrap back past already-tried keys.
        currentKeyIndex = (keyIndex + 1) % keys.length;
        console.warn(`[groq] rate-limited on key ${keyIndex + 1}, rotating to key ${currentKeyIndex + 1}`);
        continue;
      }
      throw err;
    }
  }

  // All Groq keys exhausted — fall back to OpenRouter
  console.warn("[groq] all Groq keys rate-limited — falling back to OpenRouter");
  return groqCreateViaOpenRouter(params);
}
