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
    <div className="min-h-screen bg-admin-bg text-admin-text">
      <header className="flex items-center justify-between gap-3 border-b border-admin-border px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="font-admin-mono font-bold text-[15px]">
            MH<span className="text-admin-accent">://</span>dev
          </p>
          <p className="truncate font-admin-mono text-[10px] uppercase tracking-wider text-admin-faint">
            {session.email}
          </p>
        </div>
        <form action={logoutAction} className="shrink-0">
          <button
            type="submit"
            className="cursor-pointer rounded-md border border-admin-border px-3 py-2 font-admin-mono text-[11px] uppercase tracking-wider text-admin-muted transition hover:border-admin-accent hover:text-admin-accent"
          >
            Log out
          </button>
        </form>
      </header>
      <nav className="flex flex-wrap gap-1 overflow-x-auto border-b border-admin-border px-3 py-2 sm:px-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-md px-3 py-2 font-admin-mono text-[11px] uppercase tracking-wider text-admin-muted transition hover:bg-admin-surface hover:text-admin-text"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <main className="p-4 sm:p-6">{children}</main>
    </div>
  );
}
