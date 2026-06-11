import { z } from "zod";

const BASE = process.env.LYZR_API_BASE ?? "https://agent-prod.studio.lyzr.ai/v3";

const ChatResponse = z.object({
  response: z.string(),
  module_outputs: z.record(z.string(), z.unknown()).optional(),
  session_id: z.string().optional(),
});

export class LyzrError extends Error {
  constructor(public agentId: string, public status: number, body: string) {
    super(`Lyzr ${agentId} ${status}: ${body.slice(0, 500)}`);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(path: string, init: RequestInit, timeoutMs = 60_000) {
  const MAX_ATTEMPTS = 3;
  let lastError: LyzrError | undefined;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await sleep(500 * 2 ** (attempt - 1));
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(`${BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.LYZR_API_KEY!,
          ...init.headers,
        },
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (!res.ok) {
        const body = await res.text();
        lastError = new LyzrError(path, res.status, body);
        // Do not retry 4xx errors
        if (res.status >= 400 && res.status < 500) throw lastError;
        // Retry on 5xx
        continue;
      }
      return res.json();
    } catch (err) {
      clearTimeout(t);
      if (err instanceof LyzrError) throw err;
      // Abort = timeout
      if (err instanceof Error && (err.name === "AbortError" || err.name === "DOMException")) {
        lastError = new LyzrError(path, 0, "timeout");
      } else {
        lastError = new LyzrError(path, 0, String(err));
      }
      // Retry on network/timeout errors
    }
  }

  throw lastError ?? new LyzrError(path, 0, "unknown error");
}

export async function callAgent(
  agentId: string,
  message: string,
  sessionId: string,
  opts: { userId?: string; timeoutMs?: number } = {}
) {
  const json = await fetchJson(
    `/inference/chat/`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id: opts.userId ?? "pm-streak-system",
        agent_id: agentId,
        session_id: sessionId,
        message,
      }),
    },
    opts.timeoutMs
  );
  return ChatResponse.parse(json);
}

export const Agents = {
  cortex: () => process.env.LYZR_AGENT_CORTEX!,
  blueprint: () => process.env.LYZR_AGENT_BLUEPRINT!,
  scout: () => process.env.LYZR_AGENT_SCOUT!,
  forge: () => process.env.LYZR_AGENT_FORGE!,
  rival: () => process.env.LYZR_AGENT_RIVAL!,
  signal: () => process.env.LYZR_AGENT_SIGNAL!,
  anchor: () => process.env.LYZR_AGENT_ANCHOR!,
  pulse: () => process.env.LYZR_AGENT_PULSE!,
  retrofit: () => process.env.LYZR_AGENT_RETROFIT!,
};

export const callConductor = (message: string, sessionId: string) =>
  callAgent(process.env.LYZR_CONDUCTOR_ID!, message, sessionId, {
    userId: "pm-streak-conductor",
    timeoutMs: 120_000,
  });

export async function getAgent(agentId: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const res = await fetch(`${BASE}/agents/${agentId}`, {
      headers: { "x-api-key": process.env.LYZR_API_KEY! },
      signal: ctrl.signal,
    });
    clearTimeout(t);
    if (!res.ok) throw new LyzrError(agentId, res.status, await res.text());
    return res.json();
  } catch (err) {
    clearTimeout(t);
    if (err instanceof LyzrError) throw err;
    if (err instanceof Error && (err.name === "AbortError" || err.name === "DOMException")) {
      throw new LyzrError(agentId, 0, "timeout");
    }
    throw new LyzrError(agentId, 0, String(err));
  }
}

export async function putAgent(agentId: string, body: object) {
  return fetchJson(`/agents/template/single-task/${agentId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
