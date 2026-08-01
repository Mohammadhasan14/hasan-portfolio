import { z } from "zod";

export const projectSchema = z.object({
  code: z.string().trim().min(1, "Required"),
  name: z.string().trim().min(1, "Required"),
  status_label: z.string().trim().min(1, "Required"),
  shot_label: z.string().trim(),
  description: z.string().trim().min(1, "Required"),
  stack: z
    .string()
    .trim()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  sort_order: z.coerce.number().int(),
  status: z.enum(["draft", "published"]),
});
