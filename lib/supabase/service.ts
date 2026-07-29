import "server-only";
import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/env";
import type { Database } from "./types";

/**
 * Bypasses RLS. Only call from Server Actions/Route Handlers that have
 * already verified the caller's admin session — never expose this client
 * or its result to the browser.
 */
export function createServiceClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } },
  );
}
