import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import {
  createRazorpayCheckoutOrder,
  type RazorpayPlan,
} from "@/lib/billing/razorpay-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isRazorpayPlan(value: string | null): value is RazorpayPlan {
  return value === "monthly" || value === "quarterly" || value === "yearly";
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let body: { plan?: string };
  try {
    body = (await req.json()) as { plan?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const plan = body.plan ?? null;
  if (!isRazorpayPlan(plan)) {
    return NextResponse.json(
      { error: "plan must be monthly, quarterly, or yearly" },
      { status: 400 }
    );
  }

  try {
    const checkout = await createRazorpayCheckoutOrder({
      userId,
      plan,
    });
    return NextResponse.json({ checkout });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    const status = /user not found/i.test(message)
      ? 404
      : /not configured/i.test(message)
        ? 503
        : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
