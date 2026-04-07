import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
  Hr,
  Button,
} from "@react-email/components";
import * as React from "react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro";

interface Marketing70OffEmailProps {
  firstName?: string;
  unsubscribeUrl?: string;
}

export const Marketing70OffEmail = ({
  firstName = "there",
  unsubscribeUrl = "#",
}: Marketing70OffEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Become a 10X AI-First Product Manager (70% OFF inside)</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <div style={{ textAlign: "center" as const, marginBottom: "8px" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.5px" }}>
                <span style={{ color: "#58cc02" }}>PM</span>
                <span style={{ color: "#111827" }}> Streak</span>
              </span>
            </div>
            <Text style={{ textAlign: "center" as const, margin: 0, fontSize: "10px", color: "#9ca3af", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
              by learnanything.pro
            </Text>
          </Section>
          
          <Section style={content}>
            <Text style={greeting}>Hey {firstName},</Text>
            
            <Text style={paragraph}>
              The world of Product Management has changed. In this new AI-driven era, you are either an <strong style={{ color: "#111827" }}>AI-First PM</strong> or you&apos;re falling behind. It&apos;s no longer about just &quot;shipping features&quot;—it&apos;s about leveraging intelligence to build at 10X the speed.
            </Text>

            <Text style={paragraph}>
              We’ve built <strong style={{ color: "#111827" }}>PM Streak</strong> to be your secret weapon to mastering this shift. 
              To help you get there faster, we’re running a limited-time <strong style={{ color: "#111827" }}>70% OFF site-wide discount.</strong>
            </Text>

            <div style={discountBox}>
              <Heading style={discountHeading}>🚀 70% OFF SITE-WIDE</Heading>
              <Text style={discountSub}>Limited time launch offer is currently ongoing.</Text>
            </div>

            <Heading style={sectionTitle}>🔓 Unlock <span style={{ color: "#58cc02" }}>PM</span> Streak Pro</Heading>
            <Text style={listParagraph}>
              <strong style={{ color: "#111827" }}>• 292+ Archive Lessons</strong>: Full distilled wisdom from Lenny’s Podcast.<br />
              <strong style={{ color: "#111827" }}>• Unlimited AI Lessons</strong>: Instantly deep-dive on any PM topic.<br />
              <strong style={{ color: "#111827" }}>• AI Interview Prep</strong>: Unlimited 1:1 sessions to master strategy.<br />
              <strong style={{ color: "#111827" }}>• The Job Board</strong>: High-signal PM roles updated weekly.<br />
              <strong style={{ color: "#111827" }}>• WhatsApp Community</strong>: Access to a private network for referrals.
            </Text>

            <Text style={paragraph}>
              Whether you are aiming for a promotion at a top-tier tech firm or breaking into the field, <strong style={{ color: "#111827" }}>PM Streak</strong> exists to make you a more strategic, data-driven, and AI-literate Product Manager.
            </Text>

            <Section style={btnContainer}>
              <Button style={button} href={`${APP_URL}/pricing`}>
                CLAIM MY 70% DISCOUNT →
              </Button>
            </Section>

            <Text style={footerNote}>
              *Discount is applied automatically at checkout. Valid for a limited time only.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              Sent with 🔥 from the <strong style={{ color: "#111827" }}>PM Streak</strong> Team<br />
              <Link href={unsubscribeUrl} style={link}>Unsubscribe from these emails</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default Marketing70OffEmail;

// ── Styles ─────────────────────────────────────────────────────────────────

const main = {
  backgroundColor: "#f9fafb",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "580px",
};

const header = {
  paddingBottom: "32px",
};

const logo = {
  margin: "0 auto",
};

const content = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const greeting = {
  color: "#111827",
  fontSize: "20px",
  fontWeight: "800",
  marginBottom: "16px",
};

const paragraph = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const listParagraph = {
  color: "#4b5563",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "20px",
  paddingLeft: "10px",
};

const sectionTitle = {
  color: "#111827",
  fontSize: "18px",
  fontWeight: "800",
  marginBottom: "12px",
  marginTop: "24px",
};

const discountBox = {
  backgroundColor: "#f5f3ff",
  border: "1px solid #ddd6fe",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  marginBottom: "32px",
  marginTop: "12px",
};

const discountHeading = {
  color: "#7c3aed",
  fontSize: "24px",
  fontWeight: "900",
  margin: "0 0 8px 0",
};

const discountSub = {
  color: "#6d28d9",
  fontSize: "14px",
  margin: "0",
  fontWeight: "700",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#58cc02",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "800",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
};

const footerNote = {
  color: "#9ca3af",
  fontSize: "12px",
  fontStyle: "italic",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "40px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "20px",
};

const link = {
  color: "#6b7280",
  textDecoration: "underline",
};
