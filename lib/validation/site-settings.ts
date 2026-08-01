import { z } from "zod";

export const siteSettingsSchema = z.object({
  hero_lead: z.string().trim().min(1, "Required"),
  about_bio: z.string().trim().min(1, "Required"),
  about_education: z.string().trim().min(1, "Required"),
  available_for: z.string().trim(),
  phone: z.string().trim().min(1, "Required"),
  location: z.string().trim().min(1, "Required"),
  contact_email: z.string().trim().pipe(z.email()),
  github_url: z.string().trim().pipe(z.url()),
  linkedin_url: z.string().trim().pipe(z.url()),
  resume_url: z.string().trim().min(1, "Required"),
});
