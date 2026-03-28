"use client";

import Link from "next/link";
import { Sparkles, ChevronRight, Zap } from "lucide-react";

interface ProBannerProps {
  plan?: string;
}

export default function ProBanner({ plan }: ProBannerProps) {
  if (plan === "pro") return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 relative z-[60]">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <Zap size={14} className="text-yellow-300 flex-shrink-0 animate-pulse" />
          <p className="text-[11px] sm:text-xs font-black truncate leading-tight">
            🎉 70% OFF for first 500 users — Limited time!
          </p>
        </div>
        <Link 
          href="/pricing" 
          className="bg-white text-purple-700 text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap hover:bg-purple-50 transition-colors flex items-center gap-0.5 shadow-sm active:scale-95"
        >
          Upgrade <ChevronRight size={10} strokeWidth={3} />
        </Link>
      </div>
    </div>
  );
}
