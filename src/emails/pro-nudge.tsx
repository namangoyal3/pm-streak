import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox, Divider } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

interface ProNudgeEmailProps {
  firstName: string;
  streakCount: number;
  creditsLeft: number;
  variant: "7day" | "14day";
  unsubscribeUrl: string;
}

export function ProNudgeEmail({
  firstName,
  streakCount,
  creditsLeft,
  variant,
  unsubscribeUrl,
}: ProNudgeEmailProps) {
  const is14 = variant === "14day";

  return (
    <EmailLayout
      preview={
        is14
          ? `14 days of consistency. Here's what you're leaving on the table.`
          : `Your 7-day streak just unlocked something. Most people miss it.`
      }
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>
        {is14
          ? `${firstName}, 14 days in — here's the honest pitch`
          : `${firstName}, your 7-day streak just unlocked something real`}
      </Text>

      <Text style={body}>
        {is14
          ? `You've been consistent for two weeks. You don't need motivation — you've proven that. What you need now is depth.`
          : `A 7-day streak means you're in the top 15% of learners on PM Streak. Most people quit by day 3. You didn't.`}
      </Text>

      <CalloutBox bg="#faf5ff" border="#e9d5ff">
        <Text style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          What Pro unlocks that free doesn&apos;t:
        </Text>
        {[
          ["⚡ 50 credits/month", "Generate AI lessons on any PM topic you care about — pricing, GTM, stakeholder management, your exact role"],
          ["🎯 Interview prep (unlimited)", "5 tailored PM interview questions with frameworks, grounded in real Lenny interviews"],
          ["🧠 Deep dives on-demand", "Ask for a lesson on anything: &quot;How do I run a pricing experiment at a B2B SaaS?&quot;"],
          ["📊 PM jobs board", "Curated PM, AI PM, and founding PM roles — updated daily"],
        ].map(([title, desc], i) => (
          <Text key={i} style={{ fontSize: 13, color: "#374151", margin: "0 0 8px", lineHeight: "1.5" }}>
            <strong>{title}</strong> — {desc}
          </Text>
        ))}
      </CalloutBox>

      <Text style={body}>
        {is14
          ? `You have ${creditsLeft} free credits left this month. Pro gives you 50. That's 25 AI-generated lessons on exactly what you need — instead of whatever the algorithm serves you next.`
          : `₹249/month. That's less than a Starbucks order. Less than one Udemy course. And it compounds — every lesson you generate stays in your account.`}
      </Text>

      <PrimaryButton
        text={is14 ? "Go Pro for ₹249/mo →" : "Unlock Pro features →"}
        href={`${APP_URL}/pricing`}
        color="#7c3aed"
      />

      <Divider />

      <Text style={footnote}>
        Not ready yet? Your free credits reset next month. But the lessons you generate as Pro
        stay forever.
      </Text>
    </EmailLayout>
  );
}

export const subject = (firstName: string, variant: "7day" | "14day", streak: number) =>
  variant === "14day"
    ? `${firstName}, ${streak} days of consistency deserves deeper learning`
    : `Your ${streak}-day streak unlocked something — most free users never see it`;

const h1: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 900,
  color: "#111",
  letterSpacing: "-0.5px",
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
  margin: "0",
};
