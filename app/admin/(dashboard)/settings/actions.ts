"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import { uploadImage, validateImageFile } from "@/lib/storage";
import { siteSettingsSchema } from "@/lib/validation/site-settings";

export type SettingsState = { error: string | null; success: boolean };

export async function updateSiteSettings(
  _prevState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const session = await getSession();
  if (!session) {
    return { error: "Session expired. Please log in again.", success: false };
  }

  const parsed = siteSettingsSchema.safeParse({
    hero_lead: formData.get("hero_lead"),
    about_bio: formData.get("about_bio"),
    about_education: formData.get("about_education"),
    available_for: formData.get("available_for"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    contact_email: formData.get("contact_email"),
    github_url: formData.get("github_url"),
    linkedin_url: formData.get("linkedin_url"),
    resume_url: formData.get("resume_url"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input.", success: false };
  }

  const availableFor = parsed.data.available_for
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const supabase = createServiceClient();

  let profileImageUrl: string | undefined;
  const file = formData.get("profile_image");
  if (file instanceof File && file.size > 0) {
    const validationError = validateImageFile(file);
    if (validationError) return { error: validationError, success: false };
    profileImageUrl = await uploadImage("profile", "hasan", file);
  }

  const { error } = await supabase
    .from("site_settings")
    .update({
      hero_lead: parsed.data.hero_lead,
      about_bio: parsed.data.about_bio,
      about_education: parsed.data.about_education,
      available_for: availableFor,
      phone: parsed.data.phone,
      location: parsed.data.location,
      contact_email: parsed.data.contact_email,
      github_url: parsed.data.github_url,
      linkedin_url: parsed.data.linkedin_url,
      resume_url: parsed.data.resume_url,
      ...(profileImageUrl ? { profile_image_url: profileImageUrl } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { error: null, success: true };
}
