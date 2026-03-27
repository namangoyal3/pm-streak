import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM Interview Prep — AI Practice Questions | PM Streak",
  description:
    "Practice product sense, metrics, strategy, and behavioral PM interview questions with AI-powered feedback. Free for PM Streak users.",
  openGraph: {
    title: "PM Interview Prep — AI Practice Questions | PM Streak",
    description: "AI-powered PM interview practice for every level — APM to Senior PM.",
    images: [{ url: "/api/og?title=PM+Interview+Prep&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Prep | PM Streak",
    images: ["/api/og?title=PM+Interview+Prep&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
