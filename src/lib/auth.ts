import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const rawSecret = process.env.JWT_SECRET;
if (!rawSecret) {
  throw new Error("JWT_SECRET env var is required");
}
const JWT_SECRET = new TextEncoder().encode(rawSecret);

export async function signToken(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

type ResetTokenPayload = {
  userId: string;
  type: "password_reset";
};

export async function signPasswordResetToken(
  userId: string
): Promise<string> {
  return new SignJWT({ userId, type: "password_reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30m")
    .sign(JWT_SECRET);
}

export async function verifyPasswordResetToken(
  token: string
): Promise<ResetTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (
      payload.type !== "password_reset" ||
      typeof payload.userId !== "string"
    ) {
      return null;
    }
    return payload as unknown as ResetTokenPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId ?? null;
}
