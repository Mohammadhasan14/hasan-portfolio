"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { createServiceClient } from "@/lib/supabase/service";
import type { ContactStatus } from "@/lib/supabase/types";

export async function updateSubmissionStatus(id: string, status: ContactStatus) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("contact_submissions").update({ status }).eq("id", id);

  revalidatePath("/admin/inbox");
  revalidatePath(`/admin/inbox/${id}`);
}

export async function deleteSubmission(id: string, name: string) {
  const session = await getSession();
  if (!session) return;

  const supabase = createServiceClient();
  await supabase.from("contact_submissions").delete().eq("id", id);

  revalidatePath("/admin/inbox");
  redirect(`/admin/inbox?saved=${encodeURIComponent(`${name} deleted`)}`);
}
