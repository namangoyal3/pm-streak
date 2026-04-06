import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In to PM Streak — Daily PM Learning",
  description:
    "Log in with Google to continue your PM learning streak. Access 300+ product management lessons, AI-generated content, and your leaderboard ranking.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Sign In | PM Streak",
    description: "Continue your PM learning streak. Sign in with Google.",
    url: "/login",
  },
  twitter: {
    card: "summary",
    title: "Sign In | PM Streak",
    description: "Continue your PM learning streak.",
  },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
