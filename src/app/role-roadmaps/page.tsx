import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import type { Metadata } from "next";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "PM Career Roadmaps — APM to CPO Guide | PM Streak",
  description:
    "Step-by-step career paths for Associate PM, Product Manager, Senior PM, Staff PM, and CPO. Skills, timelines, and what to learn at every level. Included in PM Streak Pro.",
  alternates: { canonical: "/role-roadmaps" },
  openGraph: {
    title: "PM Career Roadmaps — APM to CPO Guide | PM Streak",
    description: "Step-by-step career paths for every PM level — APM to CPO.",
    url: "/role-roadmaps",
    images: [{ url: "/api/og?title=PM+Career+Roadmaps&vertical=pm", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PM Career Roadmaps | PM Streak",
    description: "APM to CPO career paths with skills, timelines, and weekly milestones.",
    images: ["/api/og?title=PM+Career+Roadmaps&vertical=pm"],
  },
};

export default function RoleRoadmapsPage() {
  const roadmapBreadcrumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Role Roadmaps", url: "/role-roadmaps" },
  ]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col items-center justify-center px-6 pb-24">
      <JsonLd data={roadmapBreadcrumbs} />
      <Map size={48} className="text-[var(--blue-primary)] mb-4" />
      <h1 className="text-2xl font-black text-center mb-2">Role Roadmaps</h1>
      <p className="text-sm text-[var(--text-secondary)] text-center max-w-md mb-6">
        APM, Growth PM, B2B PM, Pricing PM, and PM-to-Senior paths with weekly
        milestones — included in PM Streak Pro.
      </p>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--green-primary)] text-white font-black text-sm"
      >
        View Pro pricing <ArrowRight size={16} />
      </Link>
      <Link
        href="/dashboard"
        className="mt-6 text-xs text-[var(--text-secondary)] font-bold hover:text-white"
      >
        ← Back to app
      </Link>
    </div>
  );
}
