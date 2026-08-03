import "server-only";

// Optional — controlled entirely by whether RESEND_API_KEY is set, so
// there's no separate flag to remember to flip. The DB row is already the
// source of truth by the time this runs; a notification failure here must
// never surface as a form error.
export async function sendContactNotification(input: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.RESEND_NOTIFY_EMAIL;
  if (!apiKey || !notifyTo) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: notifyTo,
      subject: `New inquiry from ${input.name}`,
      text: `${input.name} <${input.email}>\n\n${input.message}`,
    });
  } catch {
    // swallow — see comment above
  }
}
