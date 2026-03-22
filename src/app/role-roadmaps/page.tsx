import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";

export default function RoleRoadmapsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white flex flex-col items-center justify-center px-6 pb-24">
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
