import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";

const SECTIONS = [
  { href: "/admin/settings", label: "Site Settings", desc: "Hero, about, contact, and social links" },
  { href: "/admin/projects", label: "Projects", desc: "Featured work with screenshots" },
  { href: "/admin/experience", label: "Experience", desc: "Career timeline entries" },
  { href: "/admin/skills", label: "Skills", desc: "Grouped tech stack modules" },
  { href: "/admin/stats", label: "Stats", desc: "About and contributions numbers" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Not yet shown publicly" },
];

export default async function AdminDashboardPage() {
  const supabase = createServiceClient();
  const { count: unreadCount } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("is_read", false);

  return (
    <div>
      <p className="font-admin-display text-[22px] font-semibold text-admin-text">Welcome back</p>
      <p className="mt-1 font-admin-mono text-[11px] text-admin-faint">
        site: <span className="text-admin-success">● live</span> · manage everything shown on the public
        site
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/inbox"
          className="flex items-center gap-3 rounded-lg border border-admin-border bg-admin-surface p-4 transition hover:border-admin-text/30"
        >
          <div className="min-w-0 flex-1">
            <p className="font-admin-display text-[16px] font-semibold text-admin-text">Inbox</p>
            <p className="mt-0.5 text-[12.5px] text-admin-muted">
              {unreadCount ? (
                <span className="text-admin-accent">{unreadCount} unread</span>
              ) : (
                "Contact form submissions"
              )}
            </p>
          </div>
          <span className="font-admin-mono text-[13px] text-admin-faint">→</span>
        </Link>
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="flex items-center gap-3 rounded-lg border border-admin-border bg-admin-surface p-4 transition hover:border-admin-text/30"
          >
            <div className="min-w-0 flex-1">
              <p className="font-admin-display text-[16px] font-semibold text-admin-text">
                {section.label}
              </p>
              <p className="mt-0.5 text-[12.5px] text-admin-muted">{section.desc}</p>
            </div>
            <span className="font-admin-mono text-[13px] text-admin-faint">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
