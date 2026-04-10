/**
 * Complete A/B experiment tracking system
 * Tracks experiments in database for analytics and user segmentation
 */

import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();
const COOKIE_NAME = "ab_uid";

export type ABVariant = "control" | "treatment";

export interface ExperimentConfig {
  name: string;
  description: string;
  variants: {
    control: { weight: number; description: string };
    treatment: { weight: number; description: string };
  };
  startDate: Date;
  endDate?: Date;
  active: boolean;
}

// Current experiments
export const EXPERIMENTS: Record<string, ExperimentConfig> = {
  pro_trial_cta_v1: {
    name: "pro_trial_cta_v1",
    description: "3-day paid content trial CTA on pricing page",
    variants: {
      control: { weight: 0.5, description: "No trial offer (original)" },
      treatment: { weight: 0.5, description: "3-day free trial offer" },
    },
    startDate: new Date("2026-04-10"),
    active: true,
  },
};

/**
 * Get or assign experiment variant for current user
 * Tracks in database if user is logged in
 */
export async function getExperimentVariant(
  experimentName: string
): Promise<{ variant: ABVariant; isNewAssignment: boolean }> {
  const jar = await cookies();
  const uid = jar.get(COOKIE_NAME)?.value;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Get experiment config
  const experiment = EXPERIMENTS[experimentName];
  if (!experiment || !experiment.active) {
    return { variant: "control", isNewAssignment: false };
  }

  // Generate deterministic variant based on uid
  let variant: ABVariant = "control";
  let isNewAssignment = false;

  if (uid) {
    const seed = `${uid}:${experimentName}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const randomValue = hash / 0xffffffff; // Normalize to 0-1
    variant = randomValue < experiment.variants.treatment.weight ? "treatment" : "control";
  }

  // Track in database if user is logged in
  if (userId) {
    try {
      // Check if user already in experiment
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { abExperiments: true },
      });

      if (user && !user.abExperiments.includes(experimentName)) {
        // Add to experiment tracking
        await prisma.user.update({
          where: { id: userId },
          data: {
            abExperiments: {
              push: experimentName,
            },
          },
        });
        isNewAssignment = true;

        // Log experiment exposure
        console.log(`📊 Experiment exposure: ${experimentName} - ${variant} for user ${userId}`);
        
        // Track in GA4 if available
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "ab_experiment_exposure", {
            experiment_name: experimentName,
            variant,
            user_id: userId,
          });
        }
      }
    } catch (error) {
      console.error("Error tracking experiment:", error);
    }
  }

  return { variant, isNewAssignment };
}

/**
 * Track experiment conversion event
 */
export async function trackExperimentConversion(
  experimentName: string,
  eventName: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return;

  try {
    // Log conversion in database
    await prisma.experimentEvent.create({
      data: {
        experimentName,
        eventName,
        userId,
        metadata,
      },
    });

    console.log(`🎯 Experiment conversion: ${experimentName} - ${eventName} for user ${userId}`);

    // Track in GA4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "ab_experiment_conversion", {
        experiment_name: experimentName,
        event_name: eventName,
        user_id: userId,
        ...metadata,
      });
    }
  } catch (error) {
    console.error("Error tracking experiment conversion:", error);
  }
}

/**
 * Get experiment statistics
 */
export async function getExperimentStats(experimentName: string) {
  try {
    // Get total users in experiment
    const experimentUsers = await prisma.user.count({
      where: {
        abExperiments: {
          has: experimentName,
        },
      },
    });

    // Get conversions
    const conversions = await prisma.experimentEvent.groupBy({
      by: ["eventName"],
      where: {
        experimentName,
      },
      _count: {
        _all: true,
      },
    });

    // Get variant distribution (simplified - would need more complex tracking)
    const totalUsers = await prisma.user.count({
      where: {
        abExperiments: {
          has: experimentName,
        },
      },
    });

    return {
      experimentName,
      totalUsers,
      conversions,
      active: EXPERIMENTS[experimentName]?.active || false,
    };
  } catch (error) {
    console.error("Error getting experiment stats:", error);
    return null;
  }
}