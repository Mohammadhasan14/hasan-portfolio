"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { statSchema } from "@/lib/validation/stat";

export type StatFormState = { error: string | null };

function parseForm(formData: FormData) {
  return statSchema.safeParse({
    stat_group: formData.get("stat_group"),
    value: formData.get("value"),
    label: formData.get("label"),
    sort_order: formData.get("sort_order"),
    status: formData.get("status"),
  });
}

export async function createStat(_prevState: StatFormState, formData: FormData): Promise<StatFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("stats").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/stats");
  redirect(`/admin/stats?saved=${encodeURIComponent(`${parsed.data.value} — ${parsed.data.label}`)}`);
}

export async function updateStat(
  id: string,
  _prevState: StatFormState,
  formData: FormData,
): Promise<StatFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("stats").update(parsed.data).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/stats");
  redirect(`/admin/stats?saved=${encodeURIComponent(`${parsed.data.value} — ${parsed.data.label}`)}`);
}

export async function deleteStat(id: string, label: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("stats").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/stats");
  redirect(`/admin/stats?saved=${encodeURIComponent(`${label} deleted`)}`);
}
