import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily PM Challenge — 3-Minute Product Practice | PM Streak",
  description:
    "One product management challenge per day. Build the habit of daily PM thinking with streaks, XP, and friendly competition.",
  openGraph: {
    title: "Daily PM Challenge | PM Streak",
    description: "Daily 3-minute PM practice with streaks and XP.",
    images: [{ url: "/api/og?title=Daily+PM+Challenge&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily PM Challenge | PM Streak",
    images: ["/api/og?title=Daily+PM+Challenge&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
