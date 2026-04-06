import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join PM Streak — Learn Product Management Daily",
  description:
    "Accept your invitation to PM Streak. Start building your PM skills with daily 2-minute lessons, streak tracking, XP, and leaderboards.",
  alternates: { canonical: "/invite" },
  openGraph: {
    title: "You're Invited to PM Streak",
    description: "Join PM Streak and start learning PM skills with daily 2-minute lessons.",
    url: "/invite",
    images: [{ url: "/api/og?title=Join+PM+Streak&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join PM Streak",
    description: "Daily PM lessons, streak tracking, and leaderboards. Accept your invitation.",
    images: ["/api/og?title=Join+PM+Streak&vertical=pm"],
  },
};

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
