"use client";

import type { ReactNode } from "react";
import { conversionFunnel } from "@/lib/ga4-events";

interface Props {
  href: string;
  className?: string;
  variant?: string;
  children: ReactNode;
}

/**
 * Homepage hero CTA — fires `hero_cta_clicked` (LEA-6 funnel event) and
 * navigates to `href`. Kept tiny on purpose; for in-app webview-aware
 * navigation use `BrowserLink` instead.
 */
export default function HeroCtaLink({ href, className, variant, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        try {
          conversionFunnel.heroCtaClicked(variant);
        } catch {
          // Tracking must never block navigation.
        }
      }}
    >
      {children}
    </a>
  );
}
