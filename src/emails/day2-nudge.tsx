import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface Day2NudgeEmailProps {
  firstName: string;
  unsubscribeUrl: string;
}

export function Day2NudgeEmail({ firstName, unsubscribeUrl }: Day2NudgeEmailProps) {
  return (
    <EmailLayout
      preview="Most PMs who don't start in 48h never do. You're still in the window."
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>{firstName}, your lesson is getting cold 🧊</Text>

      <Text style={body}>
        You signed up yesterday. Haven&apos;t started yet. That&apos;s fine — but here&apos;s
        something worth knowing:
      </Text>

      <CalloutBox bg="#fef2f2" border="#fecaca">
        <Text style={{ fontSize: 14, color: "#991b1b", margin: 0, lineHeight: "1.6" }}>
          <strong>The 48-hour rule:</strong> 80% of people who don&apos;t start a new learning
          habit within 48 hours of signing up never do. You&apos;re still inside the window —
          barely.
        </Text>
      </CalloutBox>

      <Text style={body}>
        Today&apos;s lesson: <strong>How Lenny Rachitsky became a top PM at Airbnb</strong> — and
        the one prioritisation question he asks before every decision. It&apos;s the kind of
        framework you&apos;ll use in your next sprint planning.
      </Text>

      <Text style={body}>
        3 minutes. One real insight. No signup wall — you&apos;re already in.
      </Text>

      <PrimaryButton text="Read the lesson (3 min) →" href={`${APP_URL}/dashboard`} color="#f59e0b" />

      <Text style={footnote}>
        Not interested anymore? No hard feelings — hit unsubscribe below.
        If you are, I&apos;ll see you on the other side of lesson 1.
      </Text>
    </EmailLayout>
  );
}

export const subject = (firstName: string) =>
  `${firstName}, you still haven't started (your 48h window is closing)`;

const h1: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.5px",
  margin: "0 0 16px",
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
