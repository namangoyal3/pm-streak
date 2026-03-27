/**
 * Resend webhook — receives email events (delivered, opened, clicked, bounced, complained).
 * Updates EmailLog for open/click tracking.
 * On hard bounce or spam complaint → sets emailOptOut = true.
 *
 * Configure in Resend dashboard: Webhooks → add endpoint → select events:
 *   email.delivered, email.opened, email.clicked, email.bounced, email.complained
 */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { markEmailOpened, markEmailClicked } from "@/lib/email";
import crypto from "node:crypto";

export async function POST(req: NextRequest) {
  // Verify Resend webhook signature
  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  if (webhookSecret && svixId && svixTimestamp && svixSignature) {
    const body = await req.text();
    const sigPayload = `${svixId}.${svixTimestamp}.${body}`;
    const expectedSig = crypto
      .createHmac("sha256", webhookSecret.replace(/^whsec_/, ""))
      .update(sigPayload)
      .digest("base64");
    const receivedSigs = svixSignature.split(" ").map((s) => s.split(",")[1]);
    if (!receivedSigs.some((s) => s === expectedSig)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    // Parse already-read body
    const payload = JSON.parse(body);
    await handleEvent(payload);
  } else {
    const payload = await req.json();
    await handleEvent(payload);
  }

  return NextResponse.json({ ok: true });
}

async function handleEvent(payload: any) {
  const type: string = payload.type;
  const emailId: string = payload.data?.email_id;

  if (!emailId) return;

  switch (type) {
    case "email.opened":
      await markEmailOpened(emailId).catch(console.error);
      break;

    case "email.clicked":
      await markEmailClicked(emailId).catch(console.error);
      break;

    case "email.bounced": {
      // Hard bounce — suppress this address permanently
      const log = await prisma.emailLog.findFirst({ where: { resendId: emailId }, select: { userId: true } });
      if (log) {
        await prisma.user.update({
          where: { id: log.userId },
          data: { emailOptOut: true, emailOptOutAt: new Date() },
        }).catch(console.error);
        console.log(`[resend-webhook] Hard bounce — opted out user ${log.userId}`);
      }
      break;
    }

    case "email.complained": {
      // Spam complaint — suppress immediately
      const log = await prisma.emailLog.findFirst({ where: { resendId: emailId }, select: { userId: true } });
      if (log) {
        await prisma.user.update({
          where: { id: log.userId },
          data: { emailOptOut: true, emailOptOutAt: new Date() },
        }).catch(console.error);
        console.log(`[resend-webhook] Spam complaint — opted out user ${log.userId}`);
      }
      break;
    }
  }
}
