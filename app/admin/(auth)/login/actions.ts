"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth";
import { verifyAdminCredentials } from "@/lib/auth/admin";
import { createSession } from "@/lib/auth/session";

export type LoginState = { error: string | null };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    return { error: "Invalid email or password." };
  }

  await createSession({ sub: admin.id, email: admin.email });
  redirect("/admin");
}
