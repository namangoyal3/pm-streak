import type { Metadata, Viewport } from "next";
import GoogleAnalyticsInit from "@/components/GoogleAnalyticsInit";
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
  verification: {
    google: "85fab4e21763c3a7",
  },
  openGraph: {
    title: "PM Streak - Duolingo for Product Managers",
    description: "Daily product wisdom with streaks, XP, and leaderboards. Learn PM skills in 2-3 minutes a day.",
    siteName: "PM Streak",
    images: [{ url: "/api/og?title=PM+Streak", width: 1200, height: 630, alt: "PM Streak" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Streak - Duolingo for Product Managers",
    description: "Daily product wisdom with streaks, XP, and leaderboards.",
    images: ["/api/og?title=PM+Streak"],
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
