import { z } from "zod";

export const testimonialSchema = z.object({
  author_name: z.string().trim().min(1, "Required"),
  author_role: z.string().trim().min(1, "Required"),
  quote: z.string().trim().min(1, "Required"),
  sort_order: z.coerce.number().int(),
  status: z.enum(["draft", "published"]),
});
