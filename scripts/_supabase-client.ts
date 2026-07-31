import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "../lib/env";
import type { Database } from "../lib/supabase/types";

// Standalone client, not `lib/supabase/service.ts`: that file imports the
// `server-only` package, which throws unconditionally outside Next.js's
// bundler and would crash these plain Node scripts.
export function createScriptServiceClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false } },
  );
}
