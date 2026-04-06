import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | PM Streak",
  description:
    "Sign up for PM Streak — the fastest way to sharpen your product management skills with daily 2-minute lessons, streak tracking, and leaderboards.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Create Account | PM Streak",
    description: "Start your PM learning journey. Sign up in 30 seconds.",
    url: "/signup",
  },
  twitter: {
    card: "summary",
    title: "Create Account | PM Streak",
    description: "Daily PM lessons, streaks, and XP. Sign up free.",
  },
  robots: { index: false, follow: true },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
