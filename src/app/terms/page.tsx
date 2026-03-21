import Link from "next/link";

export default function TermsPage() {
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
        <h1 className="text-4xl font-black mb-2">Terms of Service</h1>
        <p className="text-[var(--text-secondary)] text-sm mb-12">Last updated: March 21, 2026</p>

        <div className="space-y-10 text-[var(--text-secondary)] leading-relaxed">

          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using PM Streak, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Description of Service</h2>
            <p>PM Streak is a learning platform that delivers daily product management micro-lessons, quizzes, and gamified progress tracking. The service is provided free of charge.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. User Accounts</h2>
            <p>You must sign in with a valid Google account to use PM Streak. You are responsible for maintaining the security of your account. We reserve the right to suspend accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to reverse-engineer, scrape, or exploit the platform</li>
              <li>Interfere with other users&apos; experience</li>
              <li>Create multiple accounts to manipulate leaderboards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. Intellectual Property</h2>
            <p>All content on PM Streak, including lessons, quizzes, and UI, is the property of PM Streak. Lesson content is inspired by publicly available podcast discussions and is not affiliated with or endorsed by Lenny&apos;s Newsletter or Lenny Rachitsky.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>PM Streak is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee uninterrupted access or that the content will be error-free.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, PM Streak shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Contact</h2>
            <p>Questions? Email us at <span className="text-[var(--green-primary)]">support@pmstreak.app</span>.</p>
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
