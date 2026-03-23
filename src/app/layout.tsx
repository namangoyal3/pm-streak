import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Streak - Duolingo for Product Managers",
  description: "Daily product wisdom with streaks, XP, and leaderboards. Learn PM skills in 2-3 minutes a day.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", rel: "shortcut icon", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        {gaId && (
          <>
            <GoogleAnalytics gaId={gaId} />
            <Suspense fallback={null}>
              <GoogleAnalyticsTracker gaId={gaId} />
            </Suspense>
          </>
        )}
      </body>
    </html>
  );
}
