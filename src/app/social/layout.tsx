import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PM Community & Social Challenges | PM Streak",
  description:
    "Challenge friends to 7-day PM learning duels. Follow other product managers, compare streaks, and build accountability through head-to-head competitions.",
  alternates: { canonical: "/social" },
  openGraph: {
    title: "PM Community & Social Challenges | PM Streak",
    description: "Challenge friends to 7-day PM learning duels. Compare streaks and build accountability.",
    url: "/social",
    images: [{ url: "/api/og?title=PM+Community&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Social Challenges | PM Streak",
    description: "Head-to-head PM learning duels with friends. Bragging rights included.",
    images: ["/api/og?title=PM+Community&vertical=pm"],
  },
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
