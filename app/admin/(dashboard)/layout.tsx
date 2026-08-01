import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession } from "@/lib/auth/session";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

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
      <header className="flex items-center justify-between gap-3 border-b border-neutral-800 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="mono text-xs uppercase tracking-widest text-neutral-500">Admin</p>
          <p className="truncate text-sm text-neutral-300">{session.email}</p>
        </div>
        <form action={logoutAction} className="shrink-0">
          <button
            type="submit"
            className="rounded-md border border-neutral-700 px-3 py-2 text-xs uppercase tracking-wide text-neutral-300 transition hover:border-[#ff4d5a] hover:text-[#ff4d5a]"
          >
            Log out
          </button>
        </form>
      </header>
      <nav className="flex flex-wrap gap-1 overflow-x-auto border-b border-neutral-800 px-3 py-2 sm:px-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-2 text-xs uppercase tracking-wide text-neutral-400 transition hover:bg-neutral-900 hover:text-neutral-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}
