import { cache } from "react";
import { createAnonClient } from "@/lib/supabase/server";

export const getSiteSettings = cache(async () => {
  const supabase = createAnonClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();

  if (error) throw error;
  return data;
});
