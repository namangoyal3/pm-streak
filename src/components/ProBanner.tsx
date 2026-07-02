"use client";

import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import { conversionFunnel } from "@/lib/ga4-events";

interface ProBannerProps {
  plan?: string;
}

export default function ProBanner({ plan }: ProBannerProps) {
  if (plan === "pro") return null;

  return (
    <div className="bg-[var(--bg-secondary)] border-b-2 border-[var(--purple-primary)]/30 text-white py-2 px-4 relative z-[60]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Zap size={14} className="text-[var(--purple-primary)] flex-shrink-0" />
          <p className="text-[11px] sm:text-xs font-black truncate leading-tight">
            <span className="text-[var(--purple-primary)]">70% off</span> launch pricing for the first 500 users
          </p>
        </div>
        <Link
          href="/pricing"
          onClick={() => conversionFunnel.dashboardUpgradeCtaClicked("pro_banner")}
          className="bg-[var(--purple-primary)] text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity flex items-center gap-0.5 active:scale-95"
        >
          Upgrade <ChevronRight size={10} strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
}
