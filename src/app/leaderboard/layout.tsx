import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM Learner Leaderboard — Top Streaks | PM Streak",
  description:
    "See the most consistent product managers learning daily. Ranked by streak length and total XP earned. Compete with PMs worldwide.",
  alternates: { canonical: "/leaderboard" },
  openGraph: {
    title: "PM Learner Leaderboard | PM Streak",
    description: "Top PM learners ranked by streak and XP. Compete with PMs worldwide.",
    url: "/leaderboard",
    images: [{ url: "/api/og?title=PM+Leaderboard&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Learner Leaderboard | PM Streak",
    description: "Top PM learners ranked by streak and total XP. See where you stand.",
    images: ["/api/og?title=PM+Leaderboard&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
