"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { uploadImage, validateImageFile } from "@/lib/storage";
import { projectSchema } from "@/lib/validation/project";

export type ProjectFormState = { error: string | null };

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    code: formData.get("code"),
    name: formData.get("name"),
    status_label: formData.get("status_label"),
    shot_label: formData.get("shot_label"),
    description: formData.get("description"),
    stack: formData.get("stack"),
    sort_order: formData.get("sort_order"),
    status: formData.get("status"),
  });
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { data: inserted, error } = await supabase
    .from("projects")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error || !inserted) {
    return { error: error?.message ?? "Could not create project." };
  }

  const file = formData.get("screenshot");
  if (file instanceof File && file.size > 0) {
    const validationError = validateImageFile(file);
    if (validationError) return { error: validationError };
    const url = await uploadImage("projects", inserted.id, file);
    await supabase.from("projects").update({ screenshot_url: url }).eq("id", inserted.id);
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?saved=${encodeURIComponent(parsed.data.name)}`);
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();

  let screenshotUrl: string | undefined;
  const file = formData.get("screenshot");
  if (file instanceof File && file.size > 0) {
    const validationError = validateImageFile(file);
    if (validationError) return { error: validationError };
    screenshotUrl = await uploadImage("projects", id, file);
  }

  const { error } = await supabase
    .from("projects")
    .update({
      ...parsed.data,
      ...(screenshotUrl ? { screenshot_url: screenshotUrl } : {}),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?saved=${encodeURIComponent(parsed.data.name)}`);
}

export async function deleteProject(id: string, name: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?saved=${encodeURIComponent(`${name} deleted`)}`);
}
