import * as React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout } from "./layout";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

interface ChallengeReceivedEmailProps {
  firstName: string;
  fromName: string;
  message: string;
  unsubscribeUrl: string;
}

export function ChallengeReceivedEmail({ firstName, fromName, message, unsubscribeUrl }: ChallengeReceivedEmailProps) {
  return (
    <EmailLayout preview={`${fromName} thinks they can out-learn you. Can they?`} unsubscribeUrl={unsubscribeUrl}>
      <Text style={badge}>⚔️</Text>
      <Text style={h1}>{fromName} just challenged you, {firstName}</Text>
      <Text style={body}>They think they can out-learn you. One lesson decides it.</Text>
      <Text style={quote}>&quot;{message}&quot;</Text>
      <Text style={{ ...body, fontSize: 13, color: "#6b7280" }}>— {fromName}</Text>
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ margin: "20px 0 8px" }}>
        <tbody><tr>
          <td style={{ paddingRight: 6 }}>
            <Link href={`${APP_URL}/social`} style={{ ...btnBase, background: "#58cc02" }}>✅ Accept</Link>
          </td>
          <td style={{ paddingLeft: 6 }}>
            <Link href={`${APP_URL}/social`} style={{ ...btnBase, background: "#f3f4f6", color: "#6b7280" }}>✕ Decline</Link>
          </td>
        </tr></tbody>
      </table>
      <Text style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", margin: "12px 0 0" }}>Challenge expires in 48 hours.</Text>
    </EmailLayout>
  );
}

const badge: React.CSSProperties = { fontSize: 48, textAlign: "center", margin: "0 0 8px", lineHeight: "1" };
const h1: React.CSSProperties = { fontSize: 24, fontWeight: 900, color: "#111", textAlign: "center", margin: "0 0 12px", letterSpacing: "-0.5px" };
const body: React.CSSProperties = { fontSize: 15, color: "#374151", lineHeight: "1.7", textAlign: "center", margin: "0 0 12px" };
const quote: React.CSSProperties = { fontSize: 14, color: "#374151", fontStyle: "italic", background: "#f9fafb", borderLeft: "4px solid #6366f1", padding: "12px 16px", borderRadius: "0 10px 10px 0", margin: "0 0 4px", lineHeight: "1.6" };
const btnBase: React.CSSProperties = { display: "block", color: "#ffffff", fontWeight: 700, fontSize: 14, textDecoration: "none", padding: "13px", borderRadius: 10, textAlign: "center" };
