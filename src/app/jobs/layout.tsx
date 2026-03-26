import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remote PM Jobs — Product Manager Job Board | PM Streak",
  description:
    "Browse 500+ remote product manager, APM, Senior PM, and AI PM jobs updated daily. Find your next PM role.",
  openGraph: {
    title: "Remote PM Jobs — Product Manager Job Board | PM Streak",
    description: "Remote PM, APM, and AI PM jobs updated daily.",
    images: [{ url: "/api/og?title=Remote+PM+Jobs&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Remote PM Jobs | PM Streak",
    images: ["/api/og?title=Remote+PM+Jobs&vertical=pm"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
