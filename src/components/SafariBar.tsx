"use client";

import { useEffect, useState } from "react";

const APP_URL = "https://learnanything.pro";

function isIOSWebView() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isWebView = /AppleWebKit/i.test(ua) && !/Safari/i.test(ua);
  const isInApp = /FBAN|FBAV|Instagram|Line\/|Twitter|MicroMessenger|LinkedInApp|Snapchat|TikTok|Pinterest/i.test(ua);
  return isIOS && (isWebView || isInApp);
}

export default function SafariBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isIOSWebView());
  }, []);

  if (!show) return null;

  const url = APP_URL + "/login";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-8">
      <button
        onClick={() => window.open(url, "_blank")}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-[var(--green-primary)] text-white font-black text-sm shadow-2xl"
      >
        <span>Google sign-in requires Browser</span>
        <span>Open in Browser →</span>
      </button>
    </div>
  );
}
