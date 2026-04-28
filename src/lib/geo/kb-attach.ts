import { getAgent, putAgent } from "@/lib/lyzr";

// WARNING: The Lyzr API accepts {"type":"RAG"} in PUT but the inference
// endpoint rejects it with "Invalid feature type: RAG". KB attachment must
// be done via the Lyzr Studio UI (toggle KB on → click Update) to get the
// canonical shape the runtime accepts. This script is kept for reference
// but should NOT be used until the canonical shape is captured from the UI.
//
// To attach KB manually: Lyzr Studio → each agent → Knowledge Base tab →
// toggle ON → select pm_streak_shared_kb → Basic retrieval, 5 chunks → Update.
const KB_FEATURE = {
  // FILL IN: Capture from Studio UI DevTools Network tab when clicking Update.
  // The shape Lyzr's runtime actually accepts is NOT {"type":"RAG",...}.
  type: "PLACEHOLDER",
  config: {
    id: process.env.LYZR_KB_ID,
  },
  priority: 0,
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
