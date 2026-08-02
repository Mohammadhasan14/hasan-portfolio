export type NavKey =
  | "overview"
  | "settings"
  | "projects"
  | "experience"
  | "skills"
  | "stats"
  | "testimonials";

export const NAV_ITEMS: { key: NavKey; href: string; label: string }[] = [
  { key: "overview", href: "/admin", label: "Overview" },
  { key: "settings", href: "/admin/settings", label: "Site Settings" },
  { key: "projects", href: "/admin/projects", label: "Projects" },
  { key: "experience", href: "/admin/experience", label: "Experience" },
  { key: "skills", href: "/admin/skills", label: "Skills" },
  { key: "stats", href: "/admin/stats", label: "Stats" },
  { key: "testimonials", href: "/admin/testimonials", label: "Testimonials" },
];

// Bottom tab bar (mobile) shows only these; the rest live behind "More".
export const BOTTOM_NAV_KEYS: NavKey[] = ["overview", "projects", "experience", "skills"];
export const MORE_SHEET_KEYS: NavKey[] = ["settings", "stats", "testimonials"];

export function navItem(key: NavKey) {
  const item = NAV_ITEMS.find((i) => i.key === key);
  if (!item) throw new Error(`Unknown nav key: ${key}`);
  return item;
}

export function getActiveNavKey(pathname: string): NavKey {
  if (pathname === "/admin") return "overview";
  const match = NAV_ITEMS.find((item) => item.key !== "overview" && pathname.startsWith(item.href));
  return match?.key ?? "overview";
}
