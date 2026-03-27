import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

interface ProWinbackEmailProps {
  firstName: string;
  daysInactive: number;
  creditsLeft: number;
  unsubscribeUrl: string;
}

export function ProWinbackEmail({
  firstName,
  daysInactive,
  creditsLeft,
  unsubscribeUrl,
}: ProWinbackEmailProps) {
  return (
    <EmailLayout
      preview={`${creditsLeft} Pro credits burning. Here's the fastest way to use them.`}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>{firstName}, your Pro subscription is paying for inactivity</Text>

      <Text style={body}>
        You haven&apos;t opened PM Streak in {daysInactive} days. Your subscription is still running.
        That&apos;s not a guilt trip — it&apos;s a reminder that you have{" "}
        <strong>{creditsLeft} credits sitting unused</strong>, and each one is worth a lesson you
        could use in your next product review, interview, or sprint.
      </Text>

      <CalloutBox bg="#faf5ff" border="#e9d5ff">
        <Text style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", margin: "0 0 8px" }}>
          Fastest ROI from your remaining credits:
        </Text>
        <Text style={{ fontSize: 13, color: "#374151", margin: "0 0 6px", lineHeight: "1.5" }}>
          <strong>2 credits</strong> → Generate an AI lesson on anything: &quot;How do I pitch a roadmap to a sceptical CTO?&quot;
        </Text>
        <Text style={{ fontSize: 13, color: "#374151", margin: "0 0 6px", lineHeight: "1.5" }}>
          <strong>5 credits</strong> → Interview prep: 5 tailored PM questions for your level
        </Text>
        <Text style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: "1.5" }}>
          <strong>0 credits</strong> → Browse the PM job board for roles that match your seniority
        </Text>
      </CalloutBox>

      <Text style={body}>
        You chose Pro because you wanted to level up. That option is still open. What&apos;s the one
        PM skill you want sharper this month?
      </Text>

      <PrimaryButton
        text="Generate a lesson for my role →"
        href={`${APP_URL}/explore`}
        color="#7c3aed"
      />

      <Text style={footnote}>
        If PM Streak isn&apos;t working for you, reply and tell me why. I&apos;d genuinely like
        to know.
      </Text>
    </EmailLayout>
  );
}

export const subject = (firstName: string, creditsLeft: number) =>
  `${firstName}, ${creditsLeft} Pro credits are expiring unused`;

const h1: React.CSSProperties = {
  fontSize: 23,
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
