"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { experienceSchema } from "@/lib/validation/experience";

export type ExperienceFormState = { error: string | null };

function parseForm(formData: FormData) {
  return experienceSchema.safeParse({
    period: formData.get("period"),
    role: formData.get("role"),
    company: formData.get("company"),
    description: formData.get("description"),
    sort_order: formData.get("sort_order"),
    status: formData.get("status"),
  });
}

export async function createExperience(
  _prevState: ExperienceFormState,
  formData: FormData,
): Promise<ExperienceFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("experiences").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prevState: ExperienceFormState,
  formData: FormData,
): Promise<ExperienceFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("experiences").update(parsed.data).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("experiences").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/experience");
}
