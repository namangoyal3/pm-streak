import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUnsubscribeToken } from "@/lib/email";

/**
 * GET /api/unsubscribe?token=<hmac>&userId=<id>
 * One-click unsubscribe (CAN-SPAM / GDPR compliant).
 * Token is HMAC-signed — cannot be forged without UNSUBSCRIBE_SECRET.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  if (!token || !userId) {
    return new NextResponse(unsubscribePage("Invalid unsubscribe link."), {
      status: 400, headers: { "Content-Type": "text/html" },
    });
  }

  if (!verifyUnsubscribeToken(userId, token)) {
    return new NextResponse(unsubscribePage("Invalid or expired unsubscribe link."), {
      status: 400, headers: { "Content-Type": "text/html" },
    });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { emailOptOut: true, emailOptOutAt: new Date() },
  });

  return new NextResponse(unsubscribePage("You've been unsubscribed.", true), {
    status: 200, headers: { "Content-Type": "text/html" },
  });
}

/** POST for list-unsubscribe header (RFC 8058 one-click) */
export async function POST(req: NextRequest) {
  return GET(req);
}

function unsubscribePage(message: string, success = false) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribe — PM Streak</title></head>
<body style="font-family:-apple-system,sans-serif;background:#f4f4f5;min-height:100vh;display:flex;align-items:center;justify-content:center;margin:0">
  <div style="background:#fff;border-radius:16px;padding:40px 32px;max-width:400px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
    <div style="font-size:40px;margin-bottom:16px">${success ? "✅" : "❌"}</div>
    <h1 style="font-size:20px;font-weight:900;color:#111;margin:0 0 12px">${success ? "Unsubscribed" : "Error"}</h1>
    <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0 0 20px">${message}${success ? " You won't receive any more emails from PM Streak." : ""}</p>
    <a href="https://duolingo-for-pms.vercel.app/dashboard" style="display:inline-block;background:#58cc02;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 24px;border-radius:10px">Back to PM Streak</a>
  </div>
</body></html>`;
}
