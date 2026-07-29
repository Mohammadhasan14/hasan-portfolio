import { redirect } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth/session";

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
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-neutral-500">Admin</p>
          <p className="text-sm text-neutral-300">{session.email}</p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-md border border-neutral-700 px-3 py-1.5 text-xs uppercase tracking-wide text-neutral-300 transition hover:border-[#ff4d5a] hover:text-[#ff4d5a]"
          >
            Log out
          </button>
        </form>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
