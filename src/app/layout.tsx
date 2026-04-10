import type { Metadata, Viewport } from "next";
import GoogleAnalyticsInit from "@/components/GoogleAnalyticsInit";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker";
import CampaignTracker from "@/components/CampaignTracker";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://learnanything.pro"),
  title: {
    default: "PM Streak — Duolingo for Product Managers",
    template: "%s | PM Streak",
  },
  description:
    "PM Streak delivers daily 2-minute product management lessons from 300+ expert PM interviews. Build your PM intuition with streak tracking, XP, leaderboards, AI-powered lessons, interview prep, and a curated jobs board.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", rel: "shortcut icon", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: "85fab4e21763c3a7",
  },
  openGraph: {
    title: "PM Streak — Duolingo for Product Managers",
    description:
      "Daily 2-minute PM lessons from 300+ expert interviews with streaks, XP, and leaderboards.",
    siteName: "PM Streak",
    images: [{ url: "/api/og?title=PM+Streak", width: 1200, height: 630, alt: "PM Streak — Daily PM Lessons" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Streak — Duolingo for Product Managers",
    description:
      "Daily 2-min PM lessons from top PM leaders. Streaks, XP, leaderboards. The fastest way to get sharper as a PM.",
    images: ["/api/og?title=PM+Streak"],
    creator: "@pmstreak",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    "article:modified_time": new Date().toISOString(),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  const gaDebug = process.env.NEXT_PUBLIC_GA_DEBUG === "true";

  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <PostHogProvider>
          <CampaignTracker />
          {children}
        </PostHogProvider>
        {gaId && (
          <>
            <GoogleAnalyticsInit gaId={gaId} debugMode={gaDebug} />
            <Suspense fallback={null}>
              <GoogleAnalyticsTracker gaId={gaId} />
            </Suspense>
          </>
        )}
      </body>
    </html>
  );
}
// Deployment marker: 20260411-021110 - A/B Experiment System
