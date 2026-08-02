import { z } from "zod";

export const statSchema = z.object({
  stat_group: z.enum(["about", "contributions"]),
  value: z.string().trim().min(1, "Required"),
  label: z.string().trim().min(1, "Required"),
  sort_order: z.coerce.number().int(),
  status: z.enum(["draft", "published"]),
});
