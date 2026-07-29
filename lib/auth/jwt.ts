import { SignJWT, jwtVerify } from "jose";
import { requireEnv } from "@/lib/env";
import { SESSION_DURATION } from "./constants";

export type SessionPayload = {
  sub: string;
  email: string;
};

function secretKey() {
  return new TextEncoder().encode(requireEnv("SESSION_SECRET"));
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { sub: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
