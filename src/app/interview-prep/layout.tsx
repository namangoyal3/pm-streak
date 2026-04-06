import type { Metadata } from "next";
import JsonLd, { faqSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PM Interview Prep — AI-Powered Practice Questions | PM Streak",
  description:
    "Prepare for product management interviews with AI-generated practice questions. Get 5 PM interview questions per session with frameworks, key answer points, and common mistakes — covering Product Sense, Metrics, Execution, Strategy, Behavioral, and Estimation from APM to Director level.",
  alternates: { canonical: "/interview-prep" },
  openGraph: {
    title: "PM Interview Prep | AI Practice Questions",
    description:
      "5 AI-generated PM interview questions per session with frameworks. Product Sense, Metrics, Strategy, Execution & Behavioral — APM to Director level.",
    url: "/interview-prep",
    images: [{ url: "/api/og?title=PM+Interview+Prep&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Interview Prep | PM Streak",
    description:
      "AI-powered PM interview practice — Product Sense, Metrics, Strategy, Execution, Behavioral. APM to Director level.",
    images: ["/api/og?title=PM+Interview+Prep&vertical=pm"],
  },
};

const interviewFaq = faqSchema([
  {
    question: "What types of PM interview questions does PM Streak cover?",
    answer:
      "PM Streak covers six categories: Product Sense, Metrics & Analytics, Execution, Strategy, Behavioral, and Estimation — from APM to Group PM / Director level.",
  },
  {
    question: "How many interview questions do I get per session?",
    answer:
      "Each session generates 5 PM interview questions with detailed answer frameworks, key points great answers cover, and common mistakes to avoid.",
  },
  {
    question: "Is PM interview prep free?",
    answer:
      "Free users spend 5 credits per session (10 credits/month included). Pro users get unlimited sessions at no credit cost.",
  },
]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={interviewFaq} />
      {children}
    </>
  );
}
