"use server";

import { headers } from "next/headers";
import { createServiceClient } from "@/lib/supabase/service";
import { contactFormSchema } from "@/lib/validation/contact";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { hashIp, isContactRateLimited } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/resend";

export type ContactFormState = { status: "idle" | "success" | "error"; message: string | null };

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    company_website: formData.get("company_website"),
    turnstileToken: formData.get("cf-turnstile-response"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Couldn't send that — check the form and try again." };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);

  if (await isContactRateLimited(ipHash)) {
    return { status: "error", message: "Too many messages from your network — try again later." };
  }

  const verified = await verifyTurnstileToken(
    parsed.data.turnstileToken,
    ip === "unknown" ? undefined : ip,
  );
  if (!verified) {
    return { status: "error", message: "Verification failed — please try again." };
  }

  const referrer = headerList.get("referer");
  const supabase = createServiceClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    referrer,
    ip_hash: ipHash,
  });

  if (error) {
    return { status: "error", message: "Couldn't save your message — check your connection and try again." };
  }

  await sendContactNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
  });

  return { status: "success", message: "Message sent — I'll get back to you soon." };
}
