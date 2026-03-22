"use client";

import { ReactNode } from "react";

const APP_URL = "https://duolingo-for-pms.vercel.app";

function isWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /FBAN|FBAV|Instagram|Line\/|Twitter|MicroMessenger|LinkedInApp|Snapchat|TikTok|Pinterest|wv\)|\.WebView/i.test(ua) ||
    (/iPhone|iPad|iPod/i.test(ua) && /AppleWebKit/i.test(ua) && !/Safari/i.test(ua))
  );
}

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

export default function BrowserLink({ href, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        const ua = navigator.userAgent;
        // Android: fire Chrome intent to open in system browser
        if (isWebView() && /android/i.test(ua)) {
          e.preventDefault();
          const targetUrl = APP_URL + href;
          window.location.href = `intent://${targetUrl.replace("https://", "")}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(targetUrl)};end`;
        }
        // iOS: let the link navigate normally — SafariBar on /login handles the rest
      }}
    >
      {children}
    </a>
  );
}
