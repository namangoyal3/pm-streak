import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface StreakAtRiskEmailProps {
  firstName: string;
  streakCount: number;
  nextLessonTitle?: string;
  unsubscribeUrl: string;
}

export function StreakAtRiskEmail({
  firstName,
  streakCount,
  nextLessonTitle,
  unsubscribeUrl,
}: StreakAtRiskEmailProps) {
  const isLong = streakCount >= 14;
  const isMid = streakCount >= 7;

  const subjectLine = getSubject(firstName, streakCount);
  const headline = isLong
    ? `${streakCount} days of work. Midnight resets everything.`
    : isMid
    ? `Your ${streakCount}-day streak doesn't survive the night without you`
    : `Tonight's lesson is the easiest one to skip — and the most important`;

  const urgencyText = isLong
    ? `You've been at this for ${streakCount} days straight. That's not luck — that's a discipline most PMs never build. One lesson stands between today and day ${streakCount + 1}.`
    : isMid
    ? `A ${streakCount}-day streak puts you in the top 20% of PM learners on this platform. Don't hand that back for the cost of 3 minutes.`
    : `Every consistent learner you'll eventually beat had one thing in common: they showed up on the hard days too.`;

  return (
    <EmailLayout
      preview={`${streakCount} days → 0 at midnight. Takes 3 minutes to prevent it.`}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={streakBadge}>🔥 {streakCount}</Text>
      <Text style={streakLabel}>DAY STREAK AT RISK</Text>

      <Text style={h1}>{headline}</Text>

      <Text style={bodyText}>{urgencyText}</Text>

      {nextLessonTitle && (
        <CalloutBox bg="#f0f9ff" border="#bae6fd">
          <Text style={{ fontSize: 14, color: "#0369a1", margin: 0, lineHeight: "1.6" }}>
            <strong>Tonight&apos;s lesson:</strong> {nextLessonTitle}
          </Text>
        </CalloutBox>
      )}

      <PrimaryButton
        text={`Protect my ${streakCount}-day streak →`}
        href={`${APP_URL}/dashboard`}
        color="#ea580c"
      />

      <Text style={footnote}>
        Short on time? A streak freeze costs 50 💎 and saves the streak without the lesson.
        But the lesson is better.
      </Text>
    </EmailLayout>
  );
}

function getSubject(firstName: string, streak: number): string {
  if (streak >= 30) return `⚠️ ${streak} days → 0. Not on your watch, ${firstName}.`;
  if (streak >= 14) return `${streak}-day streak. 3 minutes to save it. ${firstName}, go.`;
  if (streak >= 7) return `Your ${streak}-day streak resets at midnight, ${firstName} 🔥`;
  if (streak >= 3) return `Don't let ${streak} days end tonight, ${firstName}`;
  return `Today's lesson is 3 minutes, ${firstName}. Your streak is waiting.`;
}

export const subject = getSubject;

const streakBadge: React.CSSProperties = {
  fontSize: 48,
  fontWeight: 900,
  color: "#ea580c",
  textAlign: "center",
  margin: "0 0 4px",
  lineHeight: "1",
};

const streakLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  color: "#9a3412",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "1.5px",
  margin: "0 0 24px",
};

const h1: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.4px",
  margin: "0 0 16px",
  lineHeight: "1.3",
};

const bodyText: React.CSSProperties = {
  fontSize: 15,
  color: "#374151",
  lineHeight: "1.7",
  margin: "0 0 20px",
};

const footnote: React.CSSProperties = {
  fontSize: 13,
  color: "#6b7280",
  lineHeight: "1.6",
  margin: "20px 0 0",
  textAlign: "center",
};
