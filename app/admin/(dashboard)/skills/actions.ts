"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { skillGroupSchema } from "@/lib/validation/skill-group";

export type SkillGroupFormState = { error: string | null };

function parseForm(formData: FormData) {
  return skillGroupSchema.safeParse({
    tag: formData.get("tag"),
    name: formData.get("name"),
    items: formData.get("items"),
    sort_order: formData.get("sort_order"),
    status: formData.get("status"),
  });
}

export async function createSkillGroup(
  _prevState: SkillGroupFormState,
  formData: FormData,
): Promise<SkillGroupFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("skill_groups").insert(parsed.data);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect(`/admin/skills?saved=${encodeURIComponent(parsed.data.name)}`);
}

export async function updateSkillGroup(
  id: string,
  _prevState: SkillGroupFormState,
  formData: FormData,
): Promise<SkillGroupFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("skill_groups").update(parsed.data).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect(`/admin/skills?saved=${encodeURIComponent(parsed.data.name)}`);
}

export async function deleteSkillGroup(id: string, name: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("skill_groups").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/skills");
  redirect(`/admin/skills?saved=${encodeURIComponent(`${name} deleted`)}`);
}
