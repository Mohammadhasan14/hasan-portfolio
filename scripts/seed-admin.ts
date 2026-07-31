import { config } from "dotenv";
config({ path: ".env.local" });

import { hashPassword } from "../lib/auth/password";
import { createScriptServiceClient } from "./_supabase-client";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local before seeding.");
  }

  const passwordHash = await hashPassword(password);
  const supabase = createScriptServiceClient();

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
