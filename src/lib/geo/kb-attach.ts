import { getAgent, putAgent } from "@/lib/lyzr";

// Canonical KB feature shape — fill in after capturing from Studio UI per tech spec §2.4.
// Until captured, this placeholder follows the most likely shape.
const KB_FEATURE = {
  type: "KNOWLEDGE_BASE",
  config: {
    id: process.env.LYZR_KB_ID,
    top_k: 5,
    retrieval_type: "basic",
    score_threshold: 0,
  },
  priority: 0,
  enabled: true,
};

const ALL = [
  process.env.LYZR_AGENT_CORTEX,
  process.env.LYZR_AGENT_BLUEPRINT,
  process.env.LYZR_AGENT_SCOUT,
  process.env.LYZR_AGENT_FORGE,
  process.env.LYZR_AGENT_RIVAL,
  process.env.LYZR_AGENT_SIGNAL,
  process.env.LYZR_AGENT_ANCHOR,
  process.env.LYZR_AGENT_PULSE,
  process.env.LYZR_CONDUCTOR_ID,
].filter(Boolean) as string[];

const PUT_FIELDS = [
  "name", "description", "agent_role", "agent_instructions", "agent_goal",
  "agent_context", "agent_output", "examples", "tool", "tool_usage_description",
  "response_format", "provider_id", "model", "top_p", "temperature",
  "managed_agents", "tool_configs", "store_messages", "llm_credential_id",
];

export async function attachKBToAll(kbId: string) {
  const feature = { ...KB_FEATURE, config: { ...KB_FEATURE.config, id: kbId } };
  const results: Record<string, "ok" | string> = {};
  for (const id of ALL) {
    try {
      const cur = await getAgent(id);
      const body: Record<string, unknown> = {};
      for (const k of PUT_FIELDS) body[k] = cur[k];
      body.features = [feature];
      await putAgent(id, body);
      const after = await getAgent(id);
      results[id] = after.features?.[0]?.config?.id === kbId ? "ok" : `mismatch: ${JSON.stringify(after.features?.[0])}`;
    } catch (e) {
      results[id] = (e as Error).message;
    }
  }
  return results;
}
