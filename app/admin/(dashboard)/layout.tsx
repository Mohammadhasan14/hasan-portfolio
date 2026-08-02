import { redirect } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth/session";
import AdminShell from "./_shared/AdminShell";

async function logoutAction() {
  "use server";
  await clearSession();
  redirect("/admin/login");
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell email={session.email} logoutAction={logoutAction}>
      {children}
    </AdminShell>
  );
}
