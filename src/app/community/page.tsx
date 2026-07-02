import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isProEffective } from "@/lib/entitlements";
import Link from "next/link";
import { Users, MessageSquare, Lock, Check, ArrowLeft } from "lucide-react";

export default async function CommunityPage() {
  const userId = await getCurrentUserId();
  let isPro = false;
  let userEmail = "";

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, plan: true, trialEndsAt: true },
    });
    userEmail = user?.email || "";
    isPro = user ? isProEffective(user) : false;
  }

  const whatsappLink = "https://chat.whatsapp.com/Jp8Jyy8Jgap0wR4vw9ScET?mode=gi_t";

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white">
      <header className="sticky top-0 z-50 border-b-2 border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-white p-2 -ml-2 rounded-xl">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-sm font-black">PM Community</span>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">PM Community</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            Connect with fellow product managers, share insights, and grow together.
          </p>
        </div>

        {/* Pro Gate */}
        {!isPro ? (
          <div className="bg-[var(--bg-card)] border-2 border-[var(--purple-primary)]/30 rounded-2xl p-8 text-center mb-10">
            <Lock className="w-12 h-12 mx-auto mb-4 text-[var(--purple-primary)]" />
            <h2 className="text-2xl font-black tracking-tight mb-3">Exclusive Pro Community</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
              The WhatsApp community is exclusively for PM Streak Pro members.
              Upgrade to connect with 200+ PMs, get job referrals, and join weekly discussions.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--purple-primary)] hover:opacity-90 text-white font-black text-sm uppercase tracking-wide transition-all"
            >
              Upgrade to Pro
            </Link>
          </div>
        ) : (
          <div className="bg-[var(--bg-card)] border-2 border-[var(--green-primary)]/30 rounded-2xl p-8 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-8 h-8 text-[var(--green-primary)]" />
              <h2 className="text-2xl font-black tracking-tight">Welcome, Pro Member!</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border-2 border-[var(--border-color)]">
                <Users className="w-10 h-10 text-[var(--blue-primary)] mb-4" />
                <h3 className="text-xl font-black tracking-tight tabular-nums mb-2">200+ PMs</h3>
                <p className="text-sm text-[var(--text-secondary)]">Active product managers from top tech companies</p>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border-2 border-[var(--border-color)]">
                <MessageSquare className="w-10 h-10 text-[var(--orange-primary)] mb-4" />
                <h3 className="text-xl font-black tracking-tight mb-2">Daily Discussions</h3>
                <p className="text-sm text-[var(--text-secondary)]">PM frameworks, interview tips, job opportunities</p>
              </div>
            </div>

            <div className="text-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[var(--green-primary)] hover:bg-[var(--green-dark)] border-b-4 border-[var(--green-dark)] active:border-b-2 active:translate-y-[2px] text-white text-sm font-black uppercase tracking-wide transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                </svg>
                Join WhatsApp Community
              </a>
              <p className="mt-3 text-xs text-[var(--text-secondary)]">
                You&apos;ll be redirected to WhatsApp to join the group
              </p>
            </div>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 border-2 border-[var(--border-color)]">
          <h2 className="text-2xl font-black tracking-tight mb-6">Community Guidelines</h2>
          <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--green-primary)] text-xs font-black">1</span>
              </div>
              <span><strong>Be respectful:</strong> No personal attacks, harassment, or discrimination</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--green-primary)] text-xs font-black">2</span>
              </div>
              <span><strong>Stay on topic:</strong> Focus on product management, tech, and career growth</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--green-primary)] text-xs font-black">3</span>
              </div>
              <span><strong>No spam:</strong> No promotional content without admin approval</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--green-primary)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[var(--green-primary)] text-xs font-black">4</span>
              </div>
              <span><strong>Help each other:</strong> Share knowledge, job referrals, and feedback</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
