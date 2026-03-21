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
      <section className="max-w-5xl mx-auto px-5 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--green-primary)]/10 border border-[var(--green-primary)]/25 text-[var(--green-primary)] text-xs font-black mb-6 uppercase tracking-wide">
          <span>✦</span> Powered by Lenny&apos;s Podcast — 300+ episodes
        </div>

        <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">
          Master product management<br />
          <span className="text-[var(--green-primary)]">2 minutes a day.</span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-10 leading-relaxed">
          PM Streak turns Lenny&apos;s best frameworks into daily micro-lessons with streaks, XP, and leaderboards — so you actually stick with it.
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
          Continue with Google — it&apos;s free
        </a>

        <p className="mt-4 text-xs text-[var(--text-secondary)]">No credit card · Takes 30 seconds · Cancel anytime</p>
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
        <h2 className="text-3xl font-black text-center mb-3">How it works</h2>
        <p className="text-[var(--text-secondary)] text-center mb-12 max-w-md mx-auto">
          Like Duolingo, but for product managers. 3 simple steps to PM mastery.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              step: "01",
              emoji: "📖",
              title: "Read a 2-minute lesson",
              desc: "Each lesson distills one key insight from Lenny's best podcast episodes — prioritisation, strategy, hiring, growth.",
              color: "var(--green-primary)",
            },
            {
              step: "02",
              emoji: "🧠",
              title: "Answer 3 quiz questions",
              desc: "Bite-sized questions reinforce the concept. Get a perfect score to earn bonus XP and gems.",
              color: "var(--blue-primary)",
            },
            {
              step: "03",
              emoji: "🔥",
              title: "Build your streak",
              desc: "Come back every day to keep your streak alive. Climb the leaderboard and challenge friends.",
              color: "var(--orange-primary)",
            },
          ].map(({ step, emoji, title, desc, color }) => (
            <div key={step} className="bg-[var(--bg-card)] rounded-3xl p-6 border border-[var(--border-color)]">
              <div className="text-3xl mb-4">{emoji}</div>
              <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color }}>
                Step {step}
              </div>
              <h3 className="text-base font-black mb-2 leading-snug">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-[var(--bg-secondary)]/40 border-y border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-5 py-20">
          <h2 className="text-3xl font-black text-center mb-12">Everything you need to level up</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "🔥", title: "Daily Streaks", desc: "Streak freezes let you skip a day without losing progress." },
              { emoji: "⚡", title: "XP & Levels", desc: "Earn XP for every lesson. Level up through Beginner to Expert PM." },
              { emoji: "🏆", title: "Leaderboard", desc: "Compete with others. Unlock rankings after a 7-day streak." },
              { emoji: "👥", title: "Social Challenges", desc: "Challenge friends to see who learns more this week." },
              { emoji: "✨", title: "AI Lesson Generator", desc: "Ask about any PM topic and get a custom lesson in seconds." },
              { emoji: "📅", title: "Daily Challenge", desc: "A fresh bonus challenge every day. Earn 2× XP on top of your lesson." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <div className="text-2xl flex-shrink-0">{emoji}</div>
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
