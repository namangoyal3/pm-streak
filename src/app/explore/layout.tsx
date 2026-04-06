import type { Metadata } from "next";
import JsonLd, { faqSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI PM Lesson Generator — Explore Custom Topics | PM Streak",
  description:
    "Generate personalized product management lessons on any topic using AI. Powered by 300+ Lenny's Podcast transcripts. Earn XP and maintain your streak with custom deep-dive content.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "AI PM Lesson Generator | PM Streak",
    description:
      "Generate custom PM lessons on any topic — pricing, retention, roadmaps — in under 10 seconds.",
    url: "/explore",
    type: "website",
    images: [{ url: "/api/og?title=AI+PM+Lessons&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI PM Lesson Generator | PM Streak",
    description:
      "Custom PM lessons powered by Lenny's Podcast transcripts. Deep-dive into any product topic.",
    images: ["/api/og?title=AI+PM+Lessons&vertical=pm"],
  },
};

const exploreFaq = faqSchema([
  {
    question: "How does PM Streak's AI lesson generator work?",
    answer:
      "Choose any PM topic (e.g. user retention, pricing strategy), PM Streak searches 300+ Lenny's Podcast transcripts for the most relevant expert insights, then generates a custom lesson with quiz questions saved permanently to your library.",
  },
  {
    question: "Do AI-generated lessons count toward my streak?",
    answer:
      "Yes. Custom AI lessons earn XP and keep your streak alive, but the main podcast curriculum still unlocks gradually in batches as you finish what's open.",
  },
  {
    question: "How much does an AI Explore lesson cost?",
    answer:
      "Each AI Explore lesson costs 2 credits. Free users get 10 credits/month. Pro users get unlimited access at no credit cost.",
  },
]);

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={exploreFaq} />
      {children}
    </>
  );
}

