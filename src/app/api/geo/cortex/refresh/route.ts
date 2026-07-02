import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { verifyKB } from "@/lib/geo/kb-seed";

export const runtime = "nodejs";

function verifySignature(body: string, signature: string | null): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
  return signature === expected;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-hub-signature-256");
  const event = req.headers.get("x-github-event");

  // Allow cron-triggered refreshes too. Vercel cron sends x-vercel-cron: 1.
  const isCron =
    req.headers.get("x-vercel-cron") === "1" ||
    req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;

  if (!isCron && !verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Only process push events
  if (event && event !== "push" && !isCron) {
    return NextResponse.json({ ok: true, skipped: true, reason: `event=${event}` });
  }

  if (!isCron) {
    const payload = JSON.parse(body);

    // Skip if only .claude/memory/* files changed
    const files = [
      ...(payload.commits ?? []).flatMap((c: { added: string[]; modified: string[]; removed: string[] }) => [
        ...c.added,
        ...c.modified,
        ...c.removed,
      ]),
    ];
    const nonMemory = files.filter((f: string) => !f.startsWith(".claude/memory/"));
    if (nonMemory.length === 0) {
      return NextResponse.json({ ok: true, skipped: true, reason: "only memory files changed" });
    }

    // Only process pushes to main
    if (payload.ref !== "refs/heads/main") {
      return NextResponse.json({ ok: true, skipped: true, reason: `ref=${payload.ref}` });
    }
  }

  try {
    const result = await verifyKB();
    return NextResponse.json({
      ok: true,
      responseLength: result.response.length,
      preview: result.response.slice(0, 200),
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message.slice(0, 500) },
      { status: 500 }
    );
  }
}

// Vercel cron invocations are GET — delegate to the real handler.
export async function GET(req: Request) {
  return POST(req);
}
