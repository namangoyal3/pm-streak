import * as React from "react";
import {
  Html, Head, Preview, Body, Container, Section,
  Text, Hr, Link, Img,
} from "@react-email/components";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";

export function EmailLayout({
  preview,
  children,
  unsubscribeToken,
  unsubscribeUrl,
}: {
  preview: string;
  children: React.ReactNode;
  unsubscribeToken?: string;
  unsubscribeUrl?: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logo}>
              <span style={{ color: "#58cc02" }}>PM</span>
              <span style={{ color: "#ffffff" }}> Streak</span>
              <span style={{ marginLeft: 6 }}>🔥</span>
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Daily PM micro-lessons from the world&apos;s top product leaders.
            </Text>
            <Text style={footerText}>
              Questions? Just reply to this email — we read every one.
            </Text>
            {(unsubscribeUrl ?? unsubscribeToken) && (
              <Text style={footerSmall}>
                <Link
                  href={unsubscribeUrl ?? `${APP_URL}/api/unsubscribe?token=${unsubscribeToken}`}
                  style={{ color: "#9ca3af" }}
                >
                  Unsubscribe
                </Link>
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── shared sub-components ──────────────────────────────────────────────────

export function PrimaryButton({ text, href, color = "#58cc02" }: { text: string; href: string; color?: string }) {
  return (
    <Section style={{ textAlign: "center", margin: "24px 0 8px" }}>
      <Link
        href={href}
        style={{
          display: "inline-block",
          background: color,
          color: "#ffffff",
          fontWeight: 800,
          fontSize: 15,
          textDecoration: "none",
          padding: "14px 36px",
          borderRadius: 12,
          letterSpacing: "-0.2px",
        }}
      >
        {text}
      </Link>
    </Section>
  );
}

export function StatRow({ items }: { items: { value: string; label: string; color: string }[] }) {
  return (
    <Section style={{ margin: "0 0 24px" }}>
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            {items.map((item, i) => (
              <td
                key={i}
                style={{
                  width: `${100 / items.length}%`,
                  textAlign: "center",
                  padding: "16px 8px",
                  background: "#f9fafb",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 900, color: item.color, lineHeight: "1" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.label}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

export function CalloutBox({
  children,
  bg = "#f0fdf4",
  border = "#bbf7d0",
}: {
  children: React.ReactNode;
  bg?: string;
  border?: string;
}) {
  return (
    <Section
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: "16px 20px",
        margin: "0 0 24px",
      }}
    >
      {children}
    </Section>
  );
}

export function Divider() {
  return <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />;
}

// ── styles ─────────────────────────────────────────────────────────────────

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: "#f4f4f5",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: 480,
  margin: "32px auto",
  backgroundColor: "#ffffff",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#111111",
  padding: "20px 32px",
  textAlign: "center",
};

const logo: React.CSSProperties = {
  fontSize: 20,
  fontWeight: 900,
  margin: 0,
  letterSpacing: "-0.5px",
};

const content: React.CSSProperties = {
  padding: "32px 32px 24px",
};

const footer: React.CSSProperties = {
  padding: "20px 32px",
  backgroundColor: "#f9fafb",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: 12,
  color: "#9ca3af",
  margin: "0 0 2px",
};

const footerSmall: React.CSSProperties = {
  fontSize: 11,
  color: "#9ca3af",
  margin: "8px 0 0",
};
