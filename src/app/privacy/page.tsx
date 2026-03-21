import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-1.5 font-black text-xl tracking-tight">
            <span className="text-2xl">🔥</span>
            <span className="text-[var(--green-primary)]">PM</span>
            <span className="text-white">Streak</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="text-[var(--text-secondary)] text-sm mb-12">Last updated: March 21, 2026</p>

        <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Information We Collect</h2>
            <p>When you sign in with Google, we receive your name, email address, and profile picture from your Google account. We store this information to create and manage your PM Streak account.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To create and authenticate your account</li>
              <li>To track your learning streak, XP, and progress</li>
              <li>To display your profile on leaderboards and social features (only to other users)</li>
              <li>To send you product updates (if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Data Sharing</h2>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes. Your data may be shared with:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><strong className="text-white">Vercel</strong> — our hosting provider</li>
              <li><strong className="text-white">Neon</strong> — our database provider</li>
              <li><strong className="text-white">OpenAI</strong> — to generate AI-powered lessons (no personally identifiable information is sent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Cookies</h2>
            <p>We use a single httpOnly cookie to keep you signed in. This cookie does not track you across other websites.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Data Retention</h2>
            <p>We retain your account data for as long as your account is active. You can request deletion of your account and all associated data by emailing us.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Contact</h2>
            <p>If you have questions about this policy, please reach out at <span className="text-[var(--green-primary)]">support@pmstreak.app</span>.</p>
          </section>

        </div>
      </main>

      <footer className="border-t border-[var(--border-color)] py-6 mt-16">
        <div className="max-w-3xl mx-auto px-5 text-xs text-[var(--text-secondary)]">
          <p>© 2026 PM Streak. Powered by insights from Lenny&apos;s Podcast. Not affiliated with Lenny&apos;s Newsletter.</p>
        </div>
      </footer>
    </div>
  );
}
