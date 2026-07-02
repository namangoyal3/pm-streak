# PM Streak — Residual UI/UX Design Plan (post-revamp)

Status: reviewed via /plan-design-review 2026-07-03. The full-site revamp shipped
(7b03b8f, f5a9b0a, 277ad50, 3ef8c81, f902744, 3bdaaaf — live on learnanything.pro).
This plan is the remaining design work, priority-ordered, with evidence.

Evidence base: live screenshots of every surface (desktop + 375px, seeded user +
true zero-state user + onboarding walk), plus a code-level a11y audit
(36 findings, WCAG contrast math) — see "A11y audit" below. Codex outside voice
unavailable (out of credits); findings are [single-model] Claude.

## P0 — Accessibility (Pass 6: was 3/10)

The revamp never had an a11y pass. Code audit: 3 critical, 10 high findings.

### P0.1 CTA contrast (CRITICAL)
White text on --green-primary #58cc02 = 2.09:1 (needs 4.5:1). This is EVERY
primary CTA: ds.btnPrimary token + ~18 inline instances (QuizView, dashboard,
onboarding, MarketingNav, leaderboard, Navbar, GoalSelectionModal, ShareCard).
The codebase already disagrees with itself: dashboard:554 and ProModal use
text-black on the same green (10.05:1 PASS). Duolingo itself uses dark-on-green.
DECISION D2 — PROVISIONAL (user was AFK at review time): black text on green
(brand-authentic — Duolingo's own treatment, 10.05:1, palette unchanged) over
darkened green ~#3f8c00 for white text. Reversal cost if user disagrees: one
token + ~18 inline class swaps. CONFIRM BEFORE IMPLEMENTING P0.1.
Also failing: white on purple 2.54 (ProBanner pill at 10px!, dashboard, social),
white on blue 2.44, white on orange 2.18 → same treatment decision applies.

### P0.2 Keyboard + screen-reader blockers (CRITICAL/HIGH)
- Shop purchase items are onClick divs — keyboard-dead, invisible to SRs (dashboard:848,856). → real <button>s.
- Quiz result feedback never announced (no aria-live anywhere in repo) + focus drops to <body> on confirm. → role="status" on feedback panel, focus to Continue.
- .ds-focus-ring is defined in globals.css but used NOWHERE. → apply via ds.btnPrimary + nav links + quiz options.
- 5 modal implementations, none with role="dialog"/aria-modal/focus trap/Escape. → one shared dialog primitive.
- Icon-only buttons unlabeled (back arrows, modal closes); header stats read as bare numbers; leaderboard top-3 ranks are icon-only. → aria-labels.

### P0.3 Motion (HIGH)
- Zero useReducedMotion/MotionConfig in repo; framer animations (quiz, onboarding, celebration confetti) ignore OS setting. → one-line <MotionConfig reducedMotion="user"> at app root.
- globals.css reduce block misses .streak-flame and .animate-shimmer (both infinite; WCAG 2.2.2). → extend block.

### P0.4 Type floor + touch targets (HIGH)
- 79 occurrences of 8–10px text in app screens; bottom-nav labels render at 8px — most-touched surface. → floor at 11px, captions 10px max.
- ProBanner Upgrade pill ≈23px tall (top conversion CTA!); modal closes 24–32px; follow button 28px. → 44px standard, 36px minimum.

### P0.5 Semantics (MEDIUM)
- Dashboard has no h1; lesson page renders two h1s; onboarding steps 2+ have none. → one h1 per screen.
- Bottom tab bar nav unlabeled, no aria-current; leaderboard rows are divs not <ol>. → landmarks + list semantics.
- Add an Accessibility section to DESIGN.md so these rules are owned (focus ring token, contrast floors, motion policy, type floor, target sizes).

## P1 — Loading states (Pass 2: was 6/10)
- /lesson/[id] and /dashboard load with pulsing text / unordered section pop-in.
- Idiom: skeleton blocks in --bg-secondary with shimmer, matching final card
  geometry (rounded-2xl, border-2 border-color), one per ds.panel shape.
  Respect reduced-motion (static blocks).
- role="status" on loading containers (silent for SRs today).

## P2 — Onboarding polish (Pass 3: was 7/10, verified on main)
- Flow is right: 3 steps, <30s, lands on green NEXT UP. Keep.
- Disabled Continue reads as "dim primary" (dark-green bg, greenish text) —
  ambiguous affordance. → flat --bg-secondary + text-secondary like quiz's
  disabled Check, switching to full green 3D when enabled.
- Selected option tiles: add the quiz idiom (accent border + tint + check) —
  selection state currently border-only.
- Steps 2+ get an h1 + <main> landmark (P0.5 overlap).

## P3 — Zero-states (Pass 2: verified, mostly good)
- Dashboard zero-state: GOOD (clear NEXT UP, "start your streak", today ring).
- Social zero-state: GOOD (icon, message, Find Friends CTA).
- Leaderboard for rank-less new user: unverified edge — verify the "(you)" row
  renders when user has 0 XP; if absent, add a pinned own-row.

## P4 — Design-system debt (Pass 5: was 7/10)
- DESIGN.md additions needed: Accessibility section (P0.5), motion policy
  (what animates, what respects reduced-motion), disabled-state tokens,
  skeleton idiom (P1), type floor.
- Purple accent bleed: social header icon is purple on a green-primary screen —
  purple is Pro-only per DESIGN.md. → swap to green or neutral.
- Emoji-as-icons (category icons, onboarding options) — accepted as deliberate
  Duolingo-playful choice; add aria-hidden + text alternatives (P0.2) rather
  than replacing.

## Litmus scorecard [single-model — Codex unavailable]
1. Brand unmistakable in first screen? YES (green/flame/heavy type everywhere)
2. One strong visual anchor? YES (hero app-preview panel; dashboard NEXT UP card)
3. Scannable by headlines only? YES
4. Each section one job? YES
5. Cards actually necessary? YES (tiles are the interactions)
6. Motion improves hierarchy? PARTIAL — purposeful but ignores reduced-motion (P0.3)
7. Premium without decorative shadows? YES (borders carry structure)
Hard rejections: none triggered.

## NOT in scope (deferred, rationale)
- Payment flow correctness — engineering; next in /plan-eng-review.
- /research light-theme pages — separate intentional identity.
- /admin — internal only.
- A/B copy variants — conversion-experiment owned.
- AAA contrast (7:1) — AA is the bar; secondary text passes AA already.

## What already exists (reuse)
- DESIGN.md tokens + ds.ts primitives; .ds-focus-ring (unused — activate it).
- Lesson-page sticky header pattern; quiz state colors; prefers-reduced-motion
  block in globals.css (extend).
- text-black-on-green precedent already in dashboard:554 + ProModal.

## A11y audit (36 findings, full detail)
3 critical / 10 high / 15 medium / 8 low. Cheapest highest-leverage fixes:
(1) green CTA text decision applied to ds.ts:28 + ~18 instances,
(2) <MotionConfig reducedMotion="user"> at root,
(3) apply existing .ds-focus-ring.
[Full finding list with file:line lives in the review transcript; carry into
the eng plan as a checklist.]

## Implementation status (2026-07-03, commit bfcb8b8)
DONE: P0.1 contrast (D2=black-on-green, 951 strings/465 files), P0.2 partial
(shop buttons, quiz aria-live+focus, focus ring global, icon labels, stat
labels, rank sr-text), P0.3 motion (MotionConfig + reduce block), P0.4 partial
(nav labels 10px, ProBanner 32px), P0.5 partial (h1s, main landmarks,
aria-current), P1 lesson skeleton + loading roles, P2 onboarding disabled
state + h1s, P4 DESIGN.md a11y/skeleton sections + social purple fix.
REMAINING (lower severity): dashboard section skeletons, modal focus
traps/Escape, aria-expanded on 8 toggles, full 10px-type census sweep beyond
nav, StreakCalendar cell labels, tab aria-pressed, ol/ul list semantics,
zero-XP leaderboard own-row verification.
