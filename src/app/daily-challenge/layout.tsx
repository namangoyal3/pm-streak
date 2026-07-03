import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily PM Challenge — 3-Minute Product Practice",
  description:
    "One product management challenge per day. A fresh PM lesson drops at midnight — complete it for 2× XP. Build the habit of daily PM thinking with streaks, XP, and friendly competition.",
  alternates: { canonical: "/daily-challenge" },
  openGraph: {
    title: "Daily PM Challenge | PM Streak",
    description: "Fresh PM challenge every day at midnight. Complete it for 2× XP on top of your regular lesson.",
    url: "/daily-challenge",
    images: [{ url: "/api/og?title=Daily+PM+Challenge&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily PM Challenge | PM Streak",
    description: "Daily 3-minute PM practice with 2× XP bonus. Build consistency, not just consume content.",
    images: ["/api/og?title=Daily+PM+Challenge&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
