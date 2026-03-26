import * as React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface WelcomeEmailProps {
  firstName: string;
  unsubscribeUrl: string;
}

export function WelcomeEmail({ firstName, unsubscribeUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout
      preview={`The 3-minute habit that separates great PMs from average ones`}
      unsubscribeUrl={unsubscribeUrl}
    >
      <Text style={h1}>Hey {firstName} 👋</Text>

      <Text style={body}>
        You just joined a group of PMs who are quietly getting better at their jobs —
        3 minutes at a time.
      </Text>

      <Text style={body}>
        Here&apos;s the honest truth about PM learning: most courses take 40 hours to finish and
        you&apos;ll remember 10% of it. PM Streak is different. Every lesson is distilled from
        real interviews with PMs who built Figma, Notion, Stripe, and Spotify.{" "}
        <strong>One insight. One quiz. Done.</strong>
      </Text>

      <CalloutBox bg="#fffbeb" border="#fde68a">
        <Text style={{ fontSize: 14, color: "#92400e", margin: 0, lineHeight: "1.6" }}>
          <strong>🎯 What&apos;s waiting for you right now:</strong>
          <br />
          Lesson 1 — How the best PMs think about prioritisation when everything feels urgent.
          <br />
          <em style={{ fontSize: 13 }}>Based on Shreyas Doshi&apos;s framework used at Stripe and Twitter.</em>
        </Text>
      </CalloutBox>

      <Text style={body}>
        Takes 3 minutes. No fluff. You&apos;ll walk away with one thing you can use tomorrow.
      </Text>

      <PrimaryButton text="Start lesson 1 →" href={`${APP_URL}/dashboard`} />

      <Text style={footnote}>
        <strong>P.S.</strong> — Reply to this email if you want me to know your role and current
        level. I&apos;ll personally suggest which lessons to prioritise.
      </Text>
    </EmailLayout>
  );
}

export const subject = (firstName: string) =>
  `${firstName}, your first lesson is a 3-minute shortcut to thinking like a top-10% PM`;

export const preview = `The 3-minute habit that separates great PMs from average ones`;

const h1: React.CSSProperties = {
  fontSize: 26,
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
