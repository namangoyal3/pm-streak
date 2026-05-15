import { describe, it, expect } from "vitest";

import { spec as anchor } from "./anchor/spec";
import { spec as blueprint } from "./blueprint/spec";
import { spec as conductor } from "./conductor/spec";
import { spec as cortex } from "./cortex/spec";
import { spec as forge } from "./forge/spec";
import { spec as pulse } from "./pulse/spec";
import { spec as retrofit } from "./retrofit/spec";
import { spec as rival } from "./rival/spec";
import { spec as scout } from "./scout/spec";
import { spec as signal } from "./signal/spec";

const SPECS = {
  anchor,
  blueprint,
  conductor,
  cortex,
  forge,
  pulse,
  retrofit,
  rival,
  scout,
  signal,
} as const;

// LEA-27: the entire swarm was migrated off pm-streak onto learnanything.pro.
// This regex is the smoke guard — any spec (in any field) that still mentions
// the old brand fails CI, so a stray "pmstreak"/"pm-streak" can never ship.
const PMSTREAK = /pm-?streak/i;

describe("agent specs are migrated to learnanything.pro", () => {
  for (const [name, spec] of Object.entries(SPECS)) {
    const serialized = JSON.stringify(spec);

    it(`${name}: contains no pm-?streak reference`, () => {
      const matches = serialized.match(new RegExp(PMSTREAK, "gi"));
      expect(matches, `"${name}" still references ${matches?.join(", ")}`).toBeNull();
    });

    it(`${name}: identifies with learnanything.pro`, () => {
      expect(serialized.toLowerCase()).toContain("learnanything.pro");
    });
  }

  it("all 10 swarm agents are present", () => {
    expect(Object.keys(SPECS)).toHaveLength(10);
  });

  it("Forge no longer routes CTAs to the dropped /interview-prep path", () => {
    expect(JSON.stringify(forge)).not.toContain("/interview-prep");
  });

  it("Conductor still manages the full worker roster", () => {
    expect(conductor.managed_agents).toEqual([
      "cortex",
      "blueprint",
      "scout",
      "forge",
      "rival",
      "signal",
      "anchor",
      "pulse",
      "retrofit",
    ]);
  });

  it("Cortex keeps the stable 7-key business_profile contract", () => {
    const i = cortex.agent_instructions;
    for (const key of [
      "icp:",
      "taxonomy:",
      "brand_voice:",
      "pricing:",
      "north_star:",
      "podcast_guests:",
      "lesson_catalog:",
    ]) {
      expect(i).toContain(key);
    }
  });
});
