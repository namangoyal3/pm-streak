import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";
const FROM = "Naman @ PM Streak <onboarding@resend.dev>";
const REPLY_TO = "namangoyal21197@gmail.com";

// ── Shared layout wrapper ──────────────────────────────────────────────────
function wrap(preheader: string, body: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PM Streak</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <!-- Preheader (hidden preview text in inbox) -->
  <span style="display:none;max-height:0;overflow:hidden;mso-hide:all">${preheader}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#111111;padding:24px 32px;text-align:center">
            <span style="font-size:20px;font-weight:900;color:#58cc02;letter-spacing:-0.5px">PM</span>
            <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.5px"> Streak</span>
            <span style="font-size:18px;margin-left:4px">🔥</span>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:32px">${body}</td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center">
            <p style="margin:0;font-size:12px;color:#9ca3af">Daily PM micro-lessons from Lenny's Podcast</p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af">Questions? Just reply to this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(text: string, url: string, color = "#58cc02") {
  return `<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-top:8px">
    <a href="${url}" style="display:inline-block;background:${color};color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:12px;letter-spacing:-0.2px">${text}</a>
  </td></tr></table>`;
}

function statBox(value: string, label: string, color: string) {
  return `<td width="33%" style="text-align:center;padding:16px 8px;background:#f9fafb;border-radius:12px">
    <div style="font-size:26px;font-weight:900;color:${color};line-height:1">${value}</div>
    <div style="font-size:11px;color:#6b7280;margin-top:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">${label}</div>
  </td>`;
}

// ── Welcome ────────────────────────────────────────────────────────────────
export async function sendWelcomeEmail({ toEmail, toName }: { toEmail: string; toName: string }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const body = `
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:#111;letter-spacing:-0.5px">Welcome, ${first}! 👋</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6">You just joined the best 3-minute daily habit a PM can have. Here's the deal:</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
      ${[
        ["📖", "Read a micro-lesson", "Distilled insights from Lenny's 300+ podcast interviews"],
        ["✅", "Answer a quick quiz", "1-3 questions to lock in what you learned"],
        ["🔥", "Build your streak", "Miss a day? Streak resets. But you've got gems to freeze it."],
        ["🏆", "Climb the leaderboard", "Beat your friends — 7-day streak unlocks Social + Rankings"],
      ].map(([icon, title, desc]) => `
        <tr>
          <td width="40" valign="top" style="padding:0 12px 16px 0;font-size:22px">${icon}</td>
          <td style="padding-bottom:16px">
            <div style="font-size:14px;font-weight:700;color:#111;margin-bottom:2px">${title}</div>
            <div style="font-size:13px;color:#6b7280;line-height:1.5">${desc}</div>
          </td>
        </tr>
      `).join("")}
    </table>

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin-bottom:24px">
      <div style="font-size:13px;font-weight:700;color:#15803d;margin-bottom:6px">Your starter pack 🎁</div>
      <div style="font-size:13px;color:#166534">💎 50 gems &nbsp;·&nbsp; 🛡 2 streak freezes &nbsp;·&nbsp; Lesson 1 is waiting</div>
    </div>

    ${btn("Start my first lesson →", `${APP_URL}/dashboard`)}

    <p style="margin:20px 0 0;font-size:13px;color:#9ca3af;text-align:center">Takes 2-3 minutes. You'll learn something real.</p>
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `You're in, ${first}! Your first PM lesson is ready 🚀`,
    html: wrap(`Your PM Streak journey starts now — complete lesson 1 in 3 minutes`, body),
  });
}

// ── Day-2 nudge ────────────────────────────────────────────────────────────
export async function sendDay2NudgeEmail({ toEmail, toName }: { toEmail: string; toName: string }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const body = `
    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:48px">⏳</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#111;letter-spacing:-0.5px;text-align:center">${first}, your streak hasn't started</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;text-align:center">You signed up for PM Streak but haven't done your first lesson yet. No judgment — but here's the truth:</p>

    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center">
      <div style="font-size:32px;margin-bottom:8px">💡</div>
      <div style="font-size:14px;color:#92400e;line-height:1.6">PMs who complete their <strong>first lesson within 48 hours</strong> of signing up are <strong>4x more likely</strong> to build a 7-day streak.</div>
    </div>

    <p style="margin:0 0 24px;font-size:14px;color:#6b7280;text-align:center">Lesson 1 is <strong>3 minutes</strong>. One real insight from Lenny's Podcast. One quiz question.</p>

    ${btn("Complete lesson 1 right now →", `${APP_URL}/dashboard`, "#f59e0b")}
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `${first}, you still haven't started 👀 (takes 3 mins)`,
    html: wrap(`Your PM Streak account is set up. Just need you to show up once.`, body),
  });
}

// ── Streak at-risk ─────────────────────────────────────────────────────────
export async function sendStreakAtRiskEmail({
  toEmail, toName, streakCount,
}: { toEmail: string; toName: string; streakCount: number }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const isLong = streakCount >= 7;
  const body = `
    <div style="text-align:center;margin-bottom:20px">
      <div style="display:inline-block;background:#fff7ed;border:2px solid #fed7aa;border-radius:16px;padding:20px 32px">
        <div style="font-size:42px;line-height:1">🔥</div>
        <div style="font-size:36px;font-weight:900;color:#ea580c;margin-top:4px">${streakCount}</div>
        <div style="font-size:12px;font-weight:700;color:#9a3412;text-transform:uppercase;letter-spacing:1px">day streak</div>
      </div>
    </div>

    <h1 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#111;letter-spacing:-0.5px;text-align:center">
      ${isLong ? `Don't let ${streakCount} days go to waste` : `Your streak resets at midnight`}
    </h1>
    <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;text-align:center">
      ${isLong
        ? `You've been consistent for ${streakCount} days. One lesson stands between you and breaking that. It's 3 minutes.`
        : `You're building something. Missing today means starting over from zero tomorrow.`}
    </p>

    ${btn("Protect my streak →", `${APP_URL}/dashboard`, "#ea580c")}

    <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;text-align:center">
      Low on time? Use a streak freeze (50 💎 gems) to skip today and keep your streak.
    </p>
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: isLong
      ? `⚠️ Your ${streakCount}-day streak resets tonight, ${first}`
      : `Don't break your streak today, ${first} 🔥`,
    html: wrap(`You haven't done today's lesson yet. It takes 3 minutes.`, body),
  });
}

// ── Weekly digest ──────────────────────────────────────────────────────────
export async function sendWeeklyDigestEmail({
  toEmail, toName, streakCount, xp, lessonsCompleted, friendActivity,
}: {
  toEmail: string; toName: string; streakCount: number; xp: number;
  lessonsCompleted: number; friendActivity: { name: string; lessonsCompleted: number }[];
}) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const friendRows = friendActivity.slice(0, 3).map((f) => `
    <tr>
      <td style="padding:10px 0;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6">
        <span style="display:inline-block;width:28px;height:28px;background:#e5e7eb;border-radius:50%;text-align:center;line-height:28px;font-weight:700;font-size:12px;margin-right:10px;vertical-align:middle">${f.name.charAt(0)}</span>
        ${f.name}
      </td>
      <td style="padding:10px 0;font-size:14px;font-weight:700;color:#58cc02;text-align:right;border-bottom:1px solid #f3f4f6">${f.lessonsCompleted} lessons</td>
    </tr>
  `).join("");

  const body = `
    <h1 style="margin:0 0 4px;font-size:24px;font-weight:900;color:#111;letter-spacing:-0.5px">Hey ${first}! 👋</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#6b7280">Your weekly PM Streak update — week ending ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border-spacing:8px">
      <tr>
        ${statBox(streakCount.toString(), "Day Streak", "#ea580c")}
        <td width="4%"></td>
        ${statBox(xp.toString(), "Total XP", "#d97706")}
        <td width="4%"></td>
        ${statBox(lessonsCompleted.toString(), "This Week", "#58cc02")}
      </tr>
    </table>

    ${friendRows ? `
    <div style="margin-bottom:24px">
      <div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Friends this week</div>
      <table width="100%" cellpadding="0" cellspacing="0">${friendRows}</table>
    </div>` : ""}

    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin-bottom:24px">
      <div style="font-size:13px;color:#166534;line-height:1.6">
        ${streakCount >= 7 ? `🏆 You've unlocked Social & Leaderboard. Challenge your friends!` : `🎯 ${7 - streakCount} more days to unlock the Leaderboard and Social features.`}
      </div>
    </div>

    ${btn("Continue learning →", `${APP_URL}/dashboard`)}
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `Your PM week in review — ${streakCount} day streak 🔥`,
    html: wrap(`${lessonsCompleted} lessons done this week. Here's how you're doing.`, body),
  });
}

// ── Challenge received ─────────────────────────────────────────────────────
export async function sendChallengeReceivedEmail({
  toEmail, toName, fromName, message,
}: { toEmail: string; toName: string; fromName: string; message: string }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const body = `
    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:48px">⚔️</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#111;letter-spacing:-0.5px;text-align:center">${fromName} just challenged you</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;text-align:center">${first}, someone thinks they can out-learn you.</p>

    <div style="background:#f9fafb;border-left:4px solid #6366f1;border-radius:0 12px 12px 0;padding:16px;margin-bottom:24px">
      <div style="font-size:12px;font-weight:700;color:#6366f1;text-transform:uppercase;margin-bottom:6px">${fromName} says:</div>
      <div style="font-size:14px;color:#374151;font-style:italic;line-height:1.6">"${message}"</div>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px">
      <tr>
        <td style="padding-right:6px">
          <a href="${APP_URL}/social" style="display:block;background:#58cc02;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:13px;border-radius:10px;text-align:center">✅ Accept</a>
        </td>
        <td style="padding-left:6px">
          <a href="${APP_URL}/social" style="display:block;background:#f3f4f6;color:#6b7280;font-weight:700;font-size:14px;text-decoration:none;padding:13px;border-radius:10px;text-align:center">✕ Decline</a>
        </td>
      </tr>
    </table>

    <p style="margin:16px 0 0;font-size:12px;color:#9ca3af;text-align:center">Challenge expires in 48 hours</p>
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `${fromName} challenged you to a PM duel ⚔️`,
    html: wrap(`${fromName} thinks they can out-learn you. Will you accept?`, body),
  });
}

// ── Challenge accepted ─────────────────────────────────────────────────────
export async function sendChallengeAcceptedEmail({
  toEmail, toName, fromName,
}: { toEmail: string; toName: string; fromName: string }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const body = `
    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:48px">🔥</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#111;letter-spacing:-0.5px;text-align:center">Game on, ${first}!</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#6b7280;line-height:1.6;text-align:center">
      <strong style="color:#111">${fromName}</strong> accepted your challenge. You challenged them — now you have to actually go learn something.
    </p>

    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center">
      <div style="font-size:13px;color:#9a3412;line-height:1.6">
        Complete today's lesson before ${fromName} does.<br>
        <strong>First to finish wins the bragging rights.</strong>
      </div>
    </div>

    ${btn("Go learn now — don't let them win →", `${APP_URL}/dashboard`, "#ea580c")}
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `${fromName} accepted 🔥 Don't let them beat you`,
    html: wrap(`${fromName} is ready. Are you?`, body),
  });
}

export async function sendStreakMilestoneEmail({
  toEmail, toName, streakCount, gemsEarned,
}: { toEmail: string; toName: string; streakCount: number; gemsEarned: number }) {
  if (!process.env.RESEND_API_KEY) return;
  const first = toName.split(" ")[0];
  const milestoneEmoji: Record<number, string> = { 3: "🔥", 7: "⚡", 14: "💎", 30: "👑", 50: "🏆", 100: "🌟", 365: "🦉" };
  const emoji = milestoneEmoji[streakCount] ?? "🔥";
  const body = `
    <div style="text-align:center;margin-bottom:24px">
      <span style="font-size:48px">${emoji}</span>
    </div>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#111;letter-spacing:-0.5px;text-align:center">${streakCount}-Day Streak, ${first}!</h1>
    <p style="margin:0 0 20px;font-size:15px;color:#6b7280;line-height:1.6;text-align:center">
      ${streakCount} consecutive days of PM learning. You're in the top tier of learners on PM Streak.
    </p>

    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center">
      <div style="font-size:13px;color:#166534;line-height:1.6">
        🏅 Milestone bonus: <strong>+${gemsEarned} gems</strong> added to your account.<br>
        Use them to buy Streak Freezes, XP Boosts, or save your streak.
      </div>
    </div>

    ${btn(`Keep your streak alive →`, `${APP_URL}/dashboard`, "#58cc02")}
  `;
  await getResend().emails.send({
    from: FROM, replyTo: REPLY_TO, to: toEmail,
    subject: `${emoji} ${streakCount}-day streak! You're unstoppable`,
    html: wrap(`${streakCount} days in a row. ${emoji}`, body),
  });
}
