import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

interface ReengagementEmailProps {
  firstName: string;
  streakCount: number;
  daysInactive: number;
  variant: "3day" | "7day";
  unsubscribeUrl: string;
}

export function ReengagementEmail({
  firstName,
  streakCount,
  daysInactive,
  variant,
  unsubscribeUrl,
}: ReengagementEmailProps) {
  const is7day = variant === "7day";
  const hadStreak = streakCount > 0;

  return (
    <EmailLayout
      preview={
        is7day
          ? `${daysInactive} days away. Your account is still here. So is your progress.`
          : `3 days since your last lesson. This is the dangerous gap.`
      }
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>
        {is7day
          ? `${firstName}, it's been a week. Here's what's waiting.`
          : hadStreak
          ? `${firstName}, your streak broke. The comeback is easier than you think.`
          : `${firstName}, 3 days is long enough to lose a habit.`}
      </Text>

      <Text style={body}>
        {is7day
          ? `A week away doesn't erase the work you put in. Your lessons, your XP, your progress — all still here. What's gone is the streak. That's fixable in 3 minutes.`
          : hadStreak
          ? `Your ${streakCount}-day streak is gone. I know that stings. But here's the thing: the PMs who build long-term habits aren't the ones who never slip — they're the ones who come back fastest.`
          : `Life happens. ${daysInactive} days passed. But your brain is still sharper than it was before PM Streak, and one lesson brings the habit back faster than starting from zero.`}
      </Text>

      {is7day && (
        <CalloutBox bg="#f0fdf4" border="#86efac">
          <Text style={{ fontSize: 14, color: "#166534", margin: 0, lineHeight: "1.6" }}>
            <strong>New since you left:</strong> AI lessons on any PM topic, an interview prep
            tool, and 50+ new PM jobs in the board. Your account is more valuable than when you
            left it.
          </Text>
        </CalloutBox>
      )}

      <Text style={body}>
        One lesson. 3 minutes. No streak required to start again.
      </Text>

      <PrimaryButton
        text={is7day ? "Come back → (3 min lesson)" : "Pick up where I left off →"}
        href={`${APP_URL}/dashboard`}
        color={is7day ? "#58cc02" : "#6366f1"}
      />

      <Text style={footnote}>
        If this isn&apos;t the right time, no problem. We send one re-engagement email, not
        twenty. Unsubscribe below if you&apos;re done.
      </Text>
    </EmailLayout>
  );
}

export const subject = (firstName: string, variant: "3day" | "7day", streakCount: number) =>
  variant === "7day"
    ? `${firstName}, we built new things while you were gone`
    : streakCount > 0
    ? `Your ${streakCount}-day streak is gone. Here's how to start a better one.`
    : `${firstName}, it's been 3 days. One lesson brings the habit back.`;

const h1: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.4px",
  margin: "0 0 16px",
  lineHeight: "1.3",
};

const body: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: "1.7",
  margin: "0 0 18px",
};

const footnote: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
  lineHeight: "1.6",
  margin: "20px 0 0",
};
