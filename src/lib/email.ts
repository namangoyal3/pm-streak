import { Resend } from "resend";

// Lazy init — only instantiated at runtime when API key is present
function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "placeholder");
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://duolingo-for-pms.vercel.app";
const FROM = "PM Streak <noreply@pmstreak.app>";

export async function sendChallengeReceivedEmail({
  toEmail,
  toName,
  fromName,
  message,
}: {
  toEmail: string;
  toName: string;
  fromName: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: toEmail,
    subject: `${fromName} challenged you on PM Streak! ⚔️`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#111;color:#fff;border-radius:16px;padding:32px">
        <h1 style="font-size:24px;margin:0 0 8px">⚔️ You've been challenged!</h1>
        <p style="color:#aaa;margin:0 0 24px">From <strong style="color:#fff">${fromName}</strong></p>
        <div style="background:#1a1a1a;border-radius:12px;padding:16px;margin-bottom:24px;font-size:14px;color:#ccc">
          "${message}"
        </div>
        <a href="${APP_URL}/social" style="display:inline-block;background:#58cc02;color:#fff;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:12px;font-size:14px">
          Accept Challenge →
        </a>
        <p style="color:#555;font-size:12px;margin-top:24px">PM Streak — Daily PM micro-lessons from Lenny's Podcast</p>
      </div>
    `,
  });
}

export async function sendChallengeAcceptedEmail({
  toEmail,
  toName,
  fromName,
}: {
  toEmail: string;
  toName: string;
  fromName: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: toEmail,
    subject: `${fromName} accepted your challenge! 🔥`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#111;color:#fff;border-radius:16px;padding:32px">
        <h1 style="font-size:24px;margin:0 0 8px">🔥 Challenge accepted!</h1>
        <p style="color:#aaa;margin:0 0 24px"><strong style="color:#fff">${fromName}</strong> accepted your challenge. Time to complete today's lesson first!</p>
        <a href="${APP_URL}/dashboard" style="display:inline-block;background:#58cc02;color:#fff;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:12px;font-size:14px">
          Go learn now →
        </a>
        <p style="color:#555;font-size:12px;margin-top:24px">PM Streak — Daily PM micro-lessons from Lenny's Podcast</p>
      </div>
    `,
  });
}

export async function sendWeeklyDigestEmail({
  toEmail,
  toName,
  streakCount,
  xp,
  lessonsCompleted,
  friendActivity,
}: {
  toEmail: string;
  toName: string;
  streakCount: number;
  xp: number;
  lessonsCompleted: number;
  friendActivity: { name: string; lessonsCompleted: number }[];
}) {
  if (!process.env.RESEND_API_KEY) return;
  const firstName = toName.split(" ")[0];
  const friendRows = friendActivity
    .slice(0, 3)
    .map(
      (f) =>
        `<tr><td style="padding:6px 0;color:#ccc">${f.name}</td><td style="padding:6px 0;color:#58cc02;font-weight:bold;text-align:right">${f.lessonsCompleted} lessons</td></tr>`
    )
    .join("");

  await getResend().emails.send({
    from: FROM,
    to: toEmail,
    subject: `Your weekly PM Streak update 🔥`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#111;color:#fff;border-radius:16px;padding:32px">
        <h1 style="font-size:22px;margin:0 0 4px">Hey ${firstName}! 👋</h1>
        <p style="color:#aaa;margin:0 0 24px">Here's your PM Streak update for this week.</p>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px">
          <div style="background:#1a1a1a;border-radius:12px;padding:12px;text-align:center">
            <div style="font-size:22px;font-weight:bold;color:#ff9600">${streakCount}</div>
            <div style="font-size:11px;color:#777">Day Streak</div>
          </div>
          <div style="background:#1a1a1a;border-radius:12px;padding:12px;text-align:center">
            <div style="font-size:22px;font-weight:bold;color:#ffd700">${xp}</div>
            <div style="font-size:11px;color:#777">Total XP</div>
          </div>
          <div style="background:#1a1a1a;border-radius:12px;padding:12px;text-align:center">
            <div style="font-size:22px;font-weight:bold;color:#58cc02">${lessonsCompleted}</div>
            <div style="font-size:11px;color:#777">Lessons Done</div>
          </div>
        </div>

        ${
          friendRows
            ? `<div style="background:#1a1a1a;border-radius:12px;padding:16px;margin-bottom:24px">
          <div style="font-size:12px;font-weight:bold;color:#777;text-transform:uppercase;margin-bottom:8px">Friend Activity</div>
          <table style="width:100%;border-collapse:collapse">${friendRows}</table>
        </div>`
            : ""
        }

        <a href="${APP_URL}/dashboard" style="display:inline-block;background:#58cc02;color:#fff;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:12px;font-size:14px">
          Keep your streak alive →
        </a>
        <p style="color:#555;font-size:12px;margin-top:24px">PM Streak — Unsubscribe anytime at ${APP_URL}/settings</p>
      </div>
    `,
  });
}
