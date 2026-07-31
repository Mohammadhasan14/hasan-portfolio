import { createAnonClient } from "@/lib/supabase/server";

export async function getSkillGroups() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("skill_groups")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
