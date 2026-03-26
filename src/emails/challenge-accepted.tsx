import * as React from "react";
import { Text } from "@react-email/components";
import { EmailLayout, PrimaryButton, CalloutBox } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface ChallengeAcceptedEmailProps {
  firstName: string;
  fromName: string;
  unsubscribeUrl: string;
}

export function ChallengeAcceptedEmail({ firstName, fromName, unsubscribeUrl }: ChallengeAcceptedEmailProps) {
  return (
    <EmailLayout preview={`${fromName} accepted. First to finish wins.`} unsubscribeUrl={unsubscribeUrl}>
      <Text style={badge}>🔥</Text>
      <Text style={h1}>Game on, {firstName}.</Text>
      <Text style={body}><strong>{fromName}</strong> accepted your challenge. You threw down the gauntlet — now you have to go learn something.</Text>
      <CalloutBox bg="#fff7ed" border="#fed7aa">
        <Text style={{ fontSize: 13, color: "#9a3412", margin: 0, textAlign: "center", lineHeight: "1.6" }}>
          Complete today&apos;s lesson before {fromName} does.<br />
          <strong>First to finish wins the bragging rights.</strong>
        </Text>
      </CalloutBox>
      <PrimaryButton text={`Go — don't let ${fromName} win →`} href={`${APP_URL}/dashboard`} color="#ea580c" />
    </EmailLayout>
  );
}

const badge: React.CSSProperties = { fontSize: 48, textAlign: "center", margin: "0 0 8px", lineHeight: "1" };
const h1: React.CSSProperties = { fontSize: 26, fontWeight: 900, color: "#111", textAlign: "center", margin: "0 0 12px", letterSpacing: "-0.5px" };
const body: React.CSSProperties = { fontSize: 15, color: "#374151", lineHeight: "1.7", margin: "0 0 16px" };
