import { z } from "zod";

export const skillGroupSchema = z.object({
  tag: z.string().trim().min(1, "Required"),
  name: z.string().trim().min(1, "Required"),
  items: z
    .string()
    .trim()
    .min(1, "Required")
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  sort_order: z.coerce.number().int(),
  status: z.enum(["draft", "published"]),
});
