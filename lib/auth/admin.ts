import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyPassword } from "./password";

export async function verifyAdminCredentials(email: string, password: string) {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, email, password_hash")
    .eq("email", email)
    .maybeSingle();

  if (error || !data) return null;

  const valid = await verifyPassword(password, data.password_hash);
  if (!valid) return null;

  return { id: data.id, email: data.email };
}
