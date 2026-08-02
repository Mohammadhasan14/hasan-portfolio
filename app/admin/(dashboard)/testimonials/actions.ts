"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { uploadImage, validateImageFile } from "@/lib/storage";
import { testimonialSchema } from "@/lib/validation/testimonial";

export type TestimonialFormState = { error: string | null };

function parseForm(formData: FormData) {
  return testimonialSchema.safeParse({
    author_name: formData.get("author_name"),
    author_role: formData.get("author_role"),
    quote: formData.get("quote"),
    sort_order: formData.get("sort_order"),
    status: formData.get("status"),
  });
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();
  const { data: inserted, error } = await supabase
    .from("testimonials")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error || !inserted) {
    return { error: error?.message ?? "Could not create testimonial." };
  }

  const file = formData.get("avatar");
  if (file instanceof File && file.size > 0) {
    const validationError = validateImageFile(file);
    if (validationError) return { error: validationError };
    const url = await uploadImage("testimonials", inserted.id, file);
    await supabase.from("testimonials").update({ avatar_url: url }).eq("id", inserted.id);
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?saved=${encodeURIComponent(parsed.data.author_name)}`);
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const session = await getSession();
  if (!session) return { error: "Session expired. Please log in again." };

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = createServiceClient();

  let avatarUrl: string | undefined;
  const file = formData.get("avatar");
  if (file instanceof File && file.size > 0) {
    const validationError = validateImageFile(file);
    if (validationError) return { error: validationError };
    avatarUrl = await uploadImage("testimonials", id, file);
  }

  const { error } = await supabase
    .from("testimonials")
    .update({
      ...parsed.data,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?saved=${encodeURIComponent(parsed.data.author_name)}`);
}

export async function deleteTestimonial(id: string, authorName: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("testimonials").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect(`/admin/testimonials?saved=${encodeURIComponent(`${authorName} deleted`)}`);
}
