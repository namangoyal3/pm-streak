import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Streak - Duolingo for Product Managers",
  description: "Daily product wisdom with streaks, XP, and leaderboards. Learn PM skills in 2-3 minutes a day.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
