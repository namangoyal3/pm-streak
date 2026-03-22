import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(email: string): boolean {
  return email === (process.env.ADMIN_EMAIL || "namangoyal21197@gmail.com");
}

export async function GET(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const currentUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (!currentUser || !isAdmin(currentUser.email)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Use a full-access key for reading email logs (separate from the send-only key)
  const apiKey = process.env.RESEND_FULL_API_KEY || process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "RESEND_FULL_API_KEY not set" }, { status: 500 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 50;
  const offset = (page - 1) * limit;

  try {
    const res = await fetch(`https://api.resend.com/emails?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: `Resend API error: ${err}` }, { status: res.status });
    }

    const data = await res.json();
    const emails: any[] = data.data || [];

    // Summarise event counts from the returned list
    const stats = {
      total: emails.length,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      complained: 0,
    };

    for (const e of emails) {
      const ev = e.last_event as string | undefined;
      if (ev === "sent" || ev === "delivered" || ev === "opened" || ev === "clicked") stats.sent++;
      if (ev === "delivered" || ev === "opened" || ev === "clicked") stats.delivered++;
      if (ev === "opened" || ev === "clicked") stats.opened++;
      if (ev === "clicked") stats.clicked++;
      if (ev === "bounced") stats.bounced++;
      if (ev === "complained") stats.complained++;
    }

    return NextResponse.json({
      stats,
      emails: emails.map((e: any) => ({
        id: e.id,
        from: e.from,
        to: Array.isArray(e.to) ? e.to : [e.to],
        subject: e.subject,
        lastEvent: e.last_event ?? "unknown",
        createdAt: e.created_at,
      })),
      hasMore: emails.length === limit,
      page,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
