import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { hashPassword } from "../lib/auth/password";
import { requireEnv } from "../lib/env";
import type { Database } from "../lib/supabase/types";

// Standalone client, not `lib/supabase/service.ts`: that file imports the
// `server-only` package, which throws unconditionally outside Next.js's
// bundler and would crash this plain Node script.
function createServiceClient() {
  return createClient<Database>(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false } },
  );
}

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before seeding.");
  }

  const passwordHash = await hashPassword(password);
  const supabase = createServiceClient();

  const { error } = await supabase
    .from("admin_users")
    .upsert({ email, password_hash: passwordHash }, { onConflict: "email" });

  if (error) {
    throw error;
  }

  console.log(`Admin user seeded: ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
