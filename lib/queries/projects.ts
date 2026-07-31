import { createAnonClient } from "@/lib/supabase/server";

export async function getProjects() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
