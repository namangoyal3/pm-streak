import { describe, expect, it } from "vitest";
import { calculateMRP } from "../pricing-display";

describe("calculateMRP", () => {
  it("returns an MRP that makes the discounted price exactly 70% off (INR)", () => {
    expect(calculateMRP("₹249", true)).toBe("₹830");
    expect(calculateMRP("₹669", true)).toBe("₹2,230");
    expect(calculateMRP("₹1,249", true)).toBe("₹4,163");
  });

  it("returns an MRP that makes the discounted price exactly 70% off (USD)", () => {
    expect(calculateMRP("$6", false)).toBe("$20");
    expect(calculateMRP("$15", false)).toBe("$50");
  });

  it("returns input unchanged when there is no numeric part", () => {
    expect(calculateMRP("Free", true)).toBe("Free");
  });
});
