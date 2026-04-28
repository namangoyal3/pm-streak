// Deploys src/agents/<name>/spec.ts to its corresponding Lyzr agent.
// Preserves features (KB attachment) and llm_credential_id from the live agent.
//
// Usage:
//   node --env-file=.env.local --import=tsx scripts/lyzr/deploy-spec.ts <agent>
//   node --env-file=.env.local --import=tsx scripts/lyzr/deploy-spec.ts forge signal

import { getAgent, putAgent, callAgent, callConductor, Agents } from "../../src/lib/lyzr";

const AGENT_ENV: Record<string, string> = {
  cortex: "LYZR_AGENT_CORTEX",
  blueprint: "LYZR_AGENT_BLUEPRINT",
  scout: "LYZR_AGENT_SCOUT",
  forge: "LYZR_AGENT_FORGE",
  rival: "LYZR_AGENT_RIVAL",
  signal: "LYZR_AGENT_SIGNAL",
  anchor: "LYZR_AGENT_ANCHOR",
  pulse: "LYZR_AGENT_PULSE",
  conductor: "LYZR_CONDUCTOR_ID",
};

const PUT_FIELDS = [
  "name", "description", "agent_role", "agent_instructions", "agent_goal",
  "agent_context", "agent_output", "examples", "tool", "tool_usage_description",
  "response_format", "provider_id", "model", "top_p", "temperature",
  "managed_agents", "tool_configs", "store_messages", "llm_credential_id",
  "features",
];

async function deploy(name: string) {
  const envKey = AGENT_ENV[name];
  if (!envKey) throw new Error(`Unknown agent: ${name}`);
  const id = process.env[envKey];
  if (!id) throw new Error(`${envKey} not set in .env.local`);

  // Load the spec dynamically.
  const mod = (await import(`../../src/agents/${name}/spec`)) as { spec: Record<string, unknown> };
  const spec = mod.spec;

  // Preserve features (KB) + llm_credential_id from the live agent.
  const live = await getAgent(id);

  const body: Record<string, unknown> = {};
  for (const k of PUT_FIELDS) {
    if (k in spec) body[k] = spec[k];
    else if (live[k] !== undefined) body[k] = live[k];
  }
  // Always carry KB features and credential from the live agent.
  body.features = live.features;
  body.llm_credential_id = live.llm_credential_id;

  await putAgent(id, body);

  // Verify
  const after = await getAgent(id);
  const ok =
    after.name === spec.name &&
    after.agent_instructions === spec.agent_instructions &&
    after.features?.[0]?.config?.id === live.features?.[0]?.config?.id;
  console.log(`[${name}] PUT ${id}  | ok=${ok ? "yes" : "no"}`);

  // Smoke
  const smokePrompt = `In one sentence, what's your role for pm-streak?`;
  const sid = `deploy-smoke-${name}-${Date.now()}`;
  const out =
    name === "conductor"
      ? await callConductor(smokePrompt, sid)
      : await callAgent((Agents as Record<string, () => string>)[name](), smokePrompt, sid);
  console.log(`[${name}] smoke: ${out.response.replace(/\s+/g, " ").slice(0, 200)}`);
}

(async () => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: deploy-spec.ts <agent...>  e.g. forge signal");
    process.exit(2);
  }
  for (const a of args) {
    try {
      await deploy(a);
    } catch (e) {
      console.error(`[${a}] DEPLOY FAILED: ${(e as Error).message.slice(0, 400)}`);
      process.exitCode = 1;
    }
  }
})();
