import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote PM Jobs — Product Manager Job Board | PM Streak",
  description:
    "Browse curated remote product manager, APM, Senior PM, and AI PM job openings from Wellfound, LinkedIn, and Himalayas. Updated weekly. Generate a personalized interview prep plan for any listing.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Remote PM Jobs — Product Manager Job Board | PM Streak",
    description: "Curated PM roles updated weekly. Browse, filter by remote, and generate interview prep plans.",
    url: "/jobs",
    images: [{ url: "/api/og?title=Remote+PM+Jobs&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote PM Jobs | PM Streak",
    description: "Curated PM roles with interview prep plan generation. Updated weekly.",
    images: ["/api/og?title=Remote+PM+Jobs&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
