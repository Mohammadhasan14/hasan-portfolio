import Link from "next/link";

const SECTIONS = [
  { href: "/admin/settings", label: "Site Settings", desc: "Hero, about, contact, and social links" },
  { href: "/admin/projects", label: "Projects", desc: "Featured work with screenshots" },
  { href: "/admin/experience", label: "Experience", desc: "Career timeline entries" },
  { href: "/admin/skills", label: "Skills", desc: "Grouped tech stack modules" },
  { href: "/admin/stats", label: "Stats", desc: "About and contributions numbers" },
  { href: "/admin/testimonials", label: "Testimonials", desc: "Not yet shown publicly" },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-lg font-semibold text-neutral-100">Welcome back</h1>
      <p className="mt-1 text-sm text-neutral-400">Manage everything shown on the public site.</p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition hover:border-neutral-600"
          >
            <p className="text-sm font-medium text-neutral-100">{section.label}</p>
            <p className="mt-1 text-xs text-neutral-500">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
