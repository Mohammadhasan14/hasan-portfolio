import { createAnonClient } from "@/lib/supabase/server";

export async function getExperiences() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
