import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily PM Interview Sprint — 5-Minute Mock Drills",
  description:
    "A new PM interview drill every day. Answer, get scored on user focus, structure, data thinking, and tradeoffs, then see tomorrow's focus area. Free daily practice.",
  alternates: { canonical: "/interview-sprint" },
  openGraph: {
    title: "Daily PM Interview Sprint | PM Streak",
    description: "A new PM interview drill every day, scored on the criteria real interviewers use.",
    url: "/interview-sprint",
    images: [{ url: "/api/og?title=Daily+PM+Interview+Sprint&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily PM Interview Sprint | PM Streak",
    description: "A new PM interview drill every day, scored on the criteria real interviewers use.",
    images: ["/api/og?title=Daily+PM+Interview+Sprint&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
