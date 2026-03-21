import { redirect } from "next/navigation";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  // Logged-in users skip the landing page entirely
  const userId = await getCurrentUserId();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboarded: true },
    });
    redirect(user?.onboarded ? "/dashboard" : "/onboarding");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <span className="text-2xl">🔥</span>
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </div>
          <a
            href="/login"
            className="px-4 py-2 rounded-xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-sm font-black transition-colors"
          >
            Start Free
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left: text */}
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-4">
              Built on Lenny&apos;s Podcast · 300+ episodes
            </p>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">
              The fastest way<br />to get sharper<br />
              <span className="text-[var(--green-primary)]">as a PM.</span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed max-w-md">
              One lesson a day. Streak tracking. XP and leaderboards. The best PM frameworks from Lenny&apos;s podcast — turned into 2-minute lessons that actually stick.
            </p>

            <a
              href="/login"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-base font-black transition-all shadow-lg shadow-[var(--green-primary)]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity="0.9"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity="0.9"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="white" fillOpacity="0.9"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity="0.9"/>
              </svg>
              Start free with Google
            </a>
            <p className="mt-3 text-xs text-[var(--text-secondary)]">No credit card · 30 seconds to set up</p>
          </div>

          {/* Right: live stat cards */}
          <div className="hidden lg:flex flex-col gap-3 flex-shrink-0 w-60">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <div className="text-3xl font-black text-[var(--orange-primary)] tabular-nums">14</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mt-1">day streak</div>
              <div className="mt-2 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[58%] bg-[var(--orange-primary)] rounded-full" />
              </div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <div className="text-3xl font-black text-[var(--gold-primary)] tabular-nums">840 XP</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold mt-1">Senior PM · Level 6</div>
              <div className="mt-2 h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[84%] bg-[var(--gold-primary)] rounded-full" />
              </div>
            </div>
            <div className="bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/25 rounded-2xl p-4">
              <div className="text-xs font-black text-[var(--green-primary)] uppercase tracking-wide mb-1">Today&apos;s lesson</div>
              <div className="text-sm font-black leading-snug">The Shreyas Doshi Prioritisation Stack</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">+20 XP · 2 min</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
        <div className="max-w-5xl mx-auto px-5 py-5 flex flex-wrap justify-center gap-x-10 gap-y-3">
          {[
            { value: "300+", label: "Podcast episodes" },
            { value: "2 min", label: "Per lesson" },
            { value: "10+", label: "PM frameworks" },
            { value: "Free", label: "Forever" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl font-black text-[var(--green-primary)]">{value}</div>
              <div className="text-xs text-[var(--text-secondary)] font-bold">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <div className="max-w-xs mb-12">
          <p className="text-xs font-black uppercase tracking-widest text-[var(--green-primary)] mb-2">How it works</p>
          <h2 className="text-4xl font-black leading-[1.1] tracking-tight">Three steps.<br />Two minutes.<br />Every day.</h2>
        </div>

        <div className="space-y-0 divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-3xl overflow-hidden">
          {[
            {
              n: "1",
              title: "Read a 2-minute lesson",
              desc: "Each lesson pulls one sharp insight from Lenny's 300+ podcast episodes — prioritisation, strategy, growth, hiring. No fluff.",
              tag: "2 min read",
              color: "var(--green-primary)",
            },
            {
              n: "2",
              title: "Answer 3 quiz questions",
              desc: "Active recall beats passive reading. Three targeted questions lock the concept in. Perfect score earns bonus gems.",
              tag: "+10 XP bonus",
              color: "var(--blue-primary)",
            },
            {
              n: "3",
              title: "Keep your streak alive",
              desc: "One lesson a day. That's it. Consistency is the whole game — the leaderboard and streak counter make it impossible to ignore.",
              tag: "Streak + XP",
              color: "var(--orange-primary)",
            },
          ].map(({ n, title, desc, tag, color }) => (
            <div key={n} className="flex gap-6 px-6 py-7 bg-[var(--bg-card)] hover:bg-[var(--bg-secondary)]/60 transition-colors group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
                {n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1.5">
                  <h3 className="text-base font-black leading-snug">{title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg flex-shrink-0" style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}>
                    {tag}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-y border-[var(--border-color)] bg-[var(--bg-secondary)]/30">
        <div className="max-w-5xl mx-auto px-5 py-20">

          {/* Hero features — 2 large cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-[var(--orange-primary)]/15 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--orange-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 className="text-xl font-black mb-2 leading-tight">Streaks that actually stick</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Daily streak tracking with freeze protection. Miss a day? Use a streak freeze. Built your longest streak yet? The leaderboard notices.</p>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--orange-primary)]">7</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">day habit</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--gold-primary)]">5×</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">freeze slots</div>
                </div>
                <div className="h-8 w-px bg-[var(--border-color)]" />
                <div className="text-center">
                  <div className="text-2xl font-black text-[var(--green-primary)]">∞</div>
                  <div className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wide">potential</div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-card)] rounded-3xl p-7 border border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-[var(--gold-primary)]/15 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 className="text-xl font-black mb-2 leading-tight">XP, levels &amp; a real leaderboard</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">Every lesson earns XP. Perfect scores earn bonus gems. Hit a 7-day streak to unlock the leaderboard and see where you rank among PMs worldwide.</p>
              <div className="h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--orange-primary)]" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-[var(--text-secondary)] font-bold">Senior PM · 620 XP</span>
                <span className="text-[10px] text-[var(--gold-primary)] font-black">Expert PM at 1000</span>
              </div>
            </div>
          </div>

          {/* Secondary features — 4 compact items in 2×2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Head-to-head challenges", desc: "Challenge any follower to a 7-day learning duel. Bragging rights included.", color: "var(--blue-primary)" },
              { title: "AI custom lessons", desc: "Type any PM topic — pricing, retention, roadmaps — and get a tailored lesson in under 10 seconds.", color: "var(--green-primary)" },
              { title: "Daily bonus challenge", desc: "A fresh lesson drops every day at midnight. Complete it for 2× XP on top of your regular lesson.", color: "var(--orange-primary)" },
              { title: "Gem economy", desc: "Earn gems for lessons and streaks. Spend them on XP Boosts, Streak Freezes, or repairing a broken streak.", color: "var(--gold-primary)" },
            ].map(({ title, desc, color }) => (
              <div key={title} className="flex gap-4 p-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: color, minHeight: "2.5rem" }} />
                <div>
                  <div className="font-black text-sm mb-1">{title}</div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAMPLE LESSON PREVIEW ── */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-3">A lesson looks like this</h2>
          <p className="text-[var(--text-secondary)]">Real insights. Real frameworks. Actually useful.</p>
        </div>

        <div className="max-w-lg mx-auto bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] overflow-hidden">
          {/* Lesson header */}
          <div className="bg-gradient-to-r from-[var(--green-primary)]/20 to-[var(--blue-primary)]/10 px-6 py-5 border-b border-[var(--border-color)]">
            <div className="text-xs text-[var(--green-primary)] font-black uppercase tracking-wide mb-1">📈 Product Strategy</div>
            <div className="font-black text-lg leading-snug">The Shreyas Doshi Prioritisation Stack</div>
            <div className="text-xs text-[var(--text-secondary)] mt-1">Stripe PM Leader · 3 min read · +20 XP</div>
          </div>

          {/* Content preview */}
          <div className="px-6 py-5">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Shreyas Doshi&apos;s &ldquo;Outcome vs. Output&rdquo; framework helps PMs stop building features for the sake of building. The key insight: most roadmaps are output-focused (we&apos;ll ship X, Y, Z) when they should be outcome-focused (we&apos;ll achieve metric M)...
            </p>
            <div className="h-px bg-[var(--border-color)] mb-4" />
            {/* Fake quiz question */}
            <div className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-wide mb-3">Quiz · Question 1 of 3</div>
            <div className="text-sm font-bold mb-3">What&apos;s the core difference between outcome and output thinking?</div>
            <div className="space-y-2">
              {[
                "Outcomes focus on metrics; outputs focus on features shipped",
                "Outputs are more important than outcomes",
                "They mean the same thing",
              ].map((opt, i) => (
                <div key={i} className={`px-4 py-3 rounded-xl border text-xs font-medium ${i === 0 ? "border-[var(--green-primary)] bg-[var(--green-primary)]/10 text-white" : "border-[var(--border-color)] text-[var(--text-secondary)]"}`}>
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {/* Blurred CTA overlay */}
          <div className="relative">
            <div className="px-6 pb-6">
              <div className="w-full py-3 rounded-2xl bg-[var(--green-primary)] text-white text-sm font-black text-center">
                Test My Knowledge →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-t border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-secondary)]/30 to-[var(--bg-primary)]">
        <div className="max-w-2xl mx-auto px-5 py-24 text-center">
          <div className="text-5xl mb-6">🔥</div>
          <h2 className="text-4xl font-black mb-4">Start your streak today.</h2>
          <p className="text-[var(--text-secondary)] mb-10 text-lg">
            Join product managers building the habit of continuous learning — 2 minutes at a time.
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] text-white text-base font-black transition-all shadow-xl shadow-[var(--green-primary)]/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg width="20" height="20" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="white" fillOpacity="0.9"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="white" fillOpacity="0.9"/>
              <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="white" fillOpacity="0.9"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="white" fillOpacity="0.9"/>
            </svg>
            Get started — it&apos;s free
          </a>
          <p className="mt-4 text-xs text-[var(--text-secondary)]">Sign in with Google · No password needed</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[var(--border-color)] py-6">
        <div className="max-w-5xl mx-auto px-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5 font-black text-sm">
            <span>🔥</span>
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </div>
          <p>Powered by insights from Lenny&apos;s Podcast. Not affiliated with Lenny&apos;s Newsletter.</p>
        </div>
      </footer>

    </div>
  );
}
