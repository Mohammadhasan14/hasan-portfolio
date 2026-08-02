import { z } from "zod";

export const experienceSchema = z.object({
  period: z.string().trim().min(1, "Required"),
  role: z.string().trim().min(1, "Required"),
  company: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  sort_order: z.coerce.number().int(),
  status: z.enum(["draft", "published"]),
});
