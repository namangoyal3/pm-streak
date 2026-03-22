/**
 * PM Streak design system — Duolingo-inspired structural class fragments.
 * Tokens live in globals.css (`:root`).
 */
export const ds = {
  /** Raised surface: lesson tiles, settings panels */
  panel:
    "rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] bg-[var(--surface-2)] p-4 shadow-[var(--shadow-ds-card)]",
  /** Flat panel (no drop shadow) */
  panelFlat:
    "rounded-[var(--ds-radius-lg)] border-2 border-[var(--border-color)] bg-[var(--surface-2)] p-4",
  sectionTitle: "text-base font-black tracking-tight text-[var(--text-primary)]",
  sectionSubtitle: "text-[11px] font-bold text-[var(--text-secondary)]",
  headerShell:
    "sticky top-0 z-50 bg-[var(--bg-primary)] border-b-2 border-[var(--border-color)]",
  bottomNav:
    "fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface-1)] border-t-2 border-[var(--border-color)] safe-area-pb",
  /** Primary CTA — Duolingo green, 3D bottom edge */
  btnPrimary:
    "rounded-[var(--ds-radius-md)] bg-[var(--green-primary)] border-b-4 border-[var(--green-dark)] font-black text-white active:border-b-2 active:translate-y-[2px] transition-all",
  /** Icon squircle in cards */
  iconBox:
    "rounded-[var(--ds-radius-md)] flex items-center justify-center flex-shrink-0 border-2 border-[var(--border-color)] bg-[var(--surface-1)]",
} as const;
