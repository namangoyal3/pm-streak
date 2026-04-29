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

async function fetchJson(path: string, init: RequestInit, timeoutMs = 60_000) {
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
    if (!res.ok) throw new LyzrError(path, res.status, await res.text());
    return res.json();
  } finally {
    clearTimeout(t);
  }
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
    if (!res.ok) throw new LyzrError(agentId, res.status, await res.text());
    return res.json();
  } finally {
    clearTimeout(t);
  }
}

export async function putAgent(agentId: string, body: object) {
  return fetchJson(`/agents/template/single-task/${agentId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
