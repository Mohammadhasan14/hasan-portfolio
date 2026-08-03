import "server-only";
import { requireEnv } from "@/lib/env";

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secret = requireEnv("TURNSTILE_SECRET_KEY");

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });

  if (!res.ok) return false;

  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
