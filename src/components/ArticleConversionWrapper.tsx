"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/ga4-events";

interface Props {
  slug: string;
  vertical: string;
  wordCount: number;
  pageType: string | null;
}

export default function ArticleConversionWrapper({
  slug,
  vertical,
  wordCount,
  pageType,
}: Props) {
  const [scrollMilestone, setScrollMilestone] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const milestonesFired = useRef(new Set<number>());

  // ── Scroll depth tracking via IntersectionObserver ──────────────────────
  useEffect(() => {
    const articleEl = document.querySelector("[data-article-body]") as HTMLElement | null;
    if (!articleEl) return;

    const milestones = [25, 50, 75, 100];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const pct = Number(entry.target.getAttribute("data-scroll-pct"));
          if (milestonesFired.current.has(pct)) continue;
          milestonesFired.current.add(pct);

          if (pct === 0) {
            trackEvent("article_view", {
              article_slug: slug,
              vertical,
              word_count: wordCount,
              page_type: pageType ?? "blog",
            });
          } else {
            trackEvent(`article_scroll_${pct}`, {
              article_slug: slug,
              vertical,
            });
            setScrollMilestone((prev) => Math.max(prev, pct));
          }
        }
      },
      { threshold: 0.1 }
    );

    // Create sentinel elements at 25%, 50%, 75%, 100% of article height
    const sentinels: HTMLElement[] = [];
    const articleHeight = articleEl.scrollHeight;

    // 0% sentinel (for article_view) — top of article
    const sentinel0 = document.createElement("div");
    sentinel0.setAttribute("data-scroll-pct", "0");
    sentinel0.style.cssText =
      "position:absolute;top:0;height:1px;width:1px;pointer-events:none";
    articleEl.insertBefore(sentinel0, articleEl.firstChild);
    observer.observe(sentinel0);
    sentinels.push(sentinel0);

    for (const pct of milestones) {
      const sentinel = document.createElement("div");
      sentinel.setAttribute("data-scroll-pct", String(pct));
      sentinel.style.cssText =
        "position:absolute;top:" +
        (articleHeight * pct) / 100 +
        "px;height:1px;width:1px;pointer-events:none";
      articleEl.style.position = articleEl.style.position || "relative";
      articleEl.appendChild(sentinel);
      observer.observe(sentinel);
      sentinels.push(sentinel);
    }

    return () => {
      observer.disconnect();
      sentinels.forEach((s) => s.remove());
    };
  }, [slug, vertical, wordCount, pageType]);

  // ── Email lead capture ─────────────────────────────────────────────────
  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setEmailError("");
      if (!email.trim() || !email.includes("@")) {
        setEmailError("Please enter a valid email");
        return;
      }
      setEmailLoading(true);
      trackEvent("article_lead_capture", {
        article_slug: slug,
        vertical,
      });
      try {
        const res = await fetch("/api/leads/article-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            articleSlug: slug,
            vertical,
          }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setEmailError(data.error || "Something went wrong");
          setEmailLoading(false);
          return;
        }
        setEmailSubmitted(true);
        trackEvent("article_lead_captured", {
          article_slug: slug,
          vertical,
        });
      } catch {
        setEmailError("Network error — try again");
      }
      setEmailLoading(false);
    },
    [email, slug, vertical]
  );

  // ── CTA click tracking ─────────────────────────────────────────────────
  const handleCtaClick = useCallback(
    (ctaVariant: string) => {
      trackEvent("article_cta_clicked", {
        article_slug: slug,
        vertical,
        cta_variant: ctaVariant,
      });
    },
    [slug, vertical]
  );

  return (
    <>
      {/* ── Lead capture (appears at 50% scroll) ────────────────────────── */}
      {scrollMilestone >= 50 && !emailSubmitted && (
        <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 my-10 border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-2 w-2 rounded-full bg-[var(--green-primary)] animate-pulse" />
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">
              Weekly PM insights
            </span>
          </div>
          <h3 className="text-lg font-black text-white mb-1">
            Get the best PM frameworks weekly &rarr;
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            One email every Friday — curated frameworks, interview tips, and
            career moves from top PMs.
          </p>
          <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="you@company.com"
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[var(--green-primary)] transition-colors"
            />
            <button
              type="submit"
              disabled={emailLoading}
              className="bg-[var(--green-primary)] text-white font-black px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {emailLoading ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
          {emailError && (
            <p className="text-xs text-red-400 mt-2">{emailError}</p>
          )}
          <p className="text-xs text-white/20 mt-3">
            No spam. Unsubscribe anytime. 12,400+ PMs already reading.
          </p>
        </div>
      )}

      {/* ── Lead capture — success state ────────────────────────────────── */}
      {emailSubmitted && (
        <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 my-10 border border-[var(--green-primary)]/30 text-center">
          <p className="font-black text-lg text-[var(--green-primary)] mb-1">
            You&apos;re in!
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            Check your inbox Friday for the best PM frameworks.
          </p>
        </div>
      )}

      {/* ── Conversion CTA (always at bottom) ────────────────────────────── */}
      <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 my-10 text-center border border-[var(--border-color)]">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Limited trial offer
          </span>
        </div>
        <h3 className="text-lg font-black text-white mb-1">
          Start Your 3-Day Pro Trial — Free
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-1">
          Full access to all 292+ lessons, PM tools &amp; job listings
        </p>
        <div className="flex items-center justify-center gap-3 mb-4 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Cancel anytime
          </span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            href={`/pricing?utm_source=article&utm_medium=seo&utm_campaign=article_cta&utm_content=${slug}`}
            onClick={() => handleCtaClick("trial")}
            className="inline-block bg-[var(--green-primary)] text-white font-black px-6 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
          >
            Start 3-day free trial &rarr;
          </Link>
          <Link
            href={`/signup?utm_source=article&utm_medium=seo&utm_campaign=article_cta&utm_content=${slug}`}
            onClick={() => handleCtaClick("signup")}
            className="inline-block bg-[var(--bg-primary)] text-[var(--text-secondary)] font-bold px-6 py-3 rounded-2xl text-sm hover:text-white hover:bg-[var(--border-color)] transition-colors border border-[var(--border-color)]"
          >
            Get free daily lessons
          </Link>
        </div>
        <p className="mt-2 text-xs text-white/25">
          1,847 PMs started a trial this month
        </p>
      </div>
    </>
  );
}
