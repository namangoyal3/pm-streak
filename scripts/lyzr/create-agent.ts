// Idempotent Lyzr agent creator.
//
// Usage:
//   tsx scripts/lyzr/create-agent.ts <agent-name>
//
// Loads src/agents/<agent-name>/spec.ts. If LYZR_AGENT_<UPPERCASED> is already
// set in the environment, this script is a no-op (use deploy-spec.ts to update).
// Otherwise it POSTs the spec to /agents/template/single-task and prints the new
// agent's _id so the caller can persist it.

import { spec as criticSpec } from "../../src/agents/critic/spec";

type AgentSpec = Record<string, unknown> & { name: string };

const SPECS: Record<string, AgentSpec> = {
  critic: criticSpec as unknown as AgentSpec,
};

const BASE = process.env.LYZR_API_BASE ?? "https://agent-prod.studio.lyzr.ai/v3";

async function createAgent(name: string) {
  const spec = SPECS[name];
  if (!spec) throw new Error(`unknown agent ${name}`);

  const envKey = `LYZR_AGENT_${name.toUpperCase()}`;
  const existing = process.env[envKey];
  if (existing) {
    console.log(`[${name}] already exists in env: ${envKey}=${existing}. Use deploy-spec.ts to update.`);
    return existing;
  }

  const credId = process.env.LYZR_LLM_CREDENTIAL_ID;
  if (!credId) throw new Error("LYZR_LLM_CREDENTIAL_ID not set");

  const body = {
    ...spec,
    llm_credential_id: credId,
    features: [],
    managed_agents: [],
    tool_configs: [],
    store_messages: true,
    response_format: { type: "text" },
  };

  const res = await fetch(`${BASE}/agents/template/single-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.LYZR_API_KEY!,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST /agents/template/single-task ${res.status}: ${text.slice(0, 600)}`);
  }
  const json = (await res.json()) as { _id?: string; agent_id?: string; id?: string };
  const id = json._id ?? json.agent_id ?? json.id;
  if (!id) throw new Error(`unexpected create response: ${JSON.stringify(json).slice(0, 400)}`);

  console.log(`[${name}] CREATED ${id}`);
  console.log(`Set: ${envKey}=${id}`);
  return id;
}

(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: create-agent.ts <agent...>  e.g. critic");
    process.exit(2);
  }
  for (const a of args) {
    try {
      await createAgent(a);
    } catch (e) {
      console.error(`[${a}] CREATE FAILED: ${(e as Error).message.slice(0, 600)}`);
      process.exitCode = 1;
    }
  }
})();
