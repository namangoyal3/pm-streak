import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface MilestoneEmailProps {
  firstName: string;
  streakCount: number;
  gemsEarned: number;
  percentile?: number;
  unsubscribeUrl: string;
}

const MILESTONE_DATA: Record<number, { emoji: string; headline: string; context: string; percentile: number }> = {
  7:   { emoji: "⚡", headline: "7 days. Top 15% of PM learners.", context: "85% of people who sign up for PM Streak quit before day 7. You didn't. That gap is already widening.", percentile: 15 },
  14:  { emoji: "💎", headline: "Two weeks. The habit is real now.", context: "Neuroscience says 14 days is when a behaviour starts to feel automatic. You're past the hard part.", percentile: 8 },
  30:  { emoji: "👑", headline: "30 days. You're in the top 3%.", context: "Less than 3% of signups reach a 30-day streak. You just crossed into a genuinely rare group.", percentile: 3 },
  50:  { emoji: "🏆", headline: "50-day streak. Seriously impressive.", context: "At this point, PM Streak isn't a habit — it's part of how you think. Every lesson stacks on the last one.", percentile: 1 },
  100: { emoji: "🌟", headline: "100 days. You've changed how you learn.", context: "100 consecutive days of deliberate PM practice. That is, without exaggeration, extraordinary.", percentile: 0.2 },
};

export function MilestoneEmail({
  firstName,
  streakCount,
  gemsEarned,
  unsubscribeUrl,
}: MilestoneEmailProps) {
  const data = MILESTONE_DATA[streakCount] ?? {
    emoji: "🔥",
    headline: `${streakCount}-day streak. Keep going.`,
    context: "Every day adds to a compound learning advantage most PMs will never build.",
    percentile: null,
  };

  return (
    <EmailLayout
      preview={`${streakCount} days. ${data.headline}`}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={badge}>{data.emoji}</Text>
      <Text style={h1}>{data.headline}</Text>
      <Text style={body}>
        {firstName}, {data.context}
      </Text>

      <CalloutBox bg="#f0fdf4" border="#86efac">
        <Text style={{ fontSize: 14, color: "#166534", margin: 0, lineHeight: "1.6" }}>
          🏅 <strong>Milestone reward:</strong> +{gemsEarned} gems added to your account.
          Use them for Streak Freezes or 2× XP Boosts.
        </Text>
      </CalloutBox>

      <Text style={body}>
        Day {streakCount + 1} is waiting. It gets easier from here.
      </Text>

      <PrimaryButton text={`Start day ${streakCount + 1} →`} href={`${APP_URL}/dashboard`} color="#58cc02" />
    </EmailLayout>
  );
}

export const subject = (firstName: string, streak: number) => {
  const data = MILESTONE_DATA[streak];
  if (!data) return `🔥 ${streak}-day streak, ${firstName}. You're unstoppable.`;
  return `${data.emoji} ${streak} days, ${firstName} — ${data.headline}`;
};

const badge: React.CSSProperties = {
  fontSize: 52,
  textAlign: "center",
  margin: "0 0 8px",
  lineHeight: "1",
};

const h1: React.CSSProperties = {
  fontSize: 26,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.5px",
  textAlign: "center",
  margin: "0 0 16px",
};

const body: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: "1.7",
  margin: "0 0 18px",
};
