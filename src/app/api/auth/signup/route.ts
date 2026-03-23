import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Direct account creation is currently disabled. Use Google sign-in or request access from support.",
    },
    { status: 403 }
  );
}
