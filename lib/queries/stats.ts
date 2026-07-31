import { createAnonClient } from "@/lib/supabase/server";
import type { StatRow } from "@/lib/supabase/types";

export async function getStats(group: StatRow["stat_group"]) {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .eq("status", "published")
    .eq("stat_group", group)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
