import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(120),
  email: z.string().trim().pipe(z.email()),
  message: z.string().trim().min(10, "Say a bit more — at least 10 characters").max(4000),
  // Honeypot: hidden from real visitors via CSS; only bots that fill every
  // field trip this. Rejected with the same generic error as bad input, so
  // a bot can't tell which check it failed.
  company_website: z.string().max(0),
  turnstileToken: z.string().min(1),
});
