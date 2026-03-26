import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore PM Topics — Learn Any Product Skill | PM Streak",
  description:
    "Generate AI-powered lessons on any product management topic. Strategy, metrics, execution, leadership — learn in 3 minutes.",
  openGraph: {
    title: "Explore PM Topics — Learn Any Product Skill | PM Streak",
    description: "Generate AI-powered PM lessons on any topic.",
    images: [{ url: "/api/og?title=Explore+PM+Topics&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore PM Topics | PM Streak",
    images: ["/api/og?title=Explore+PM+Topics&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
