import { config } from "dotenv";
config({ path: ".env.local" });

import { createScriptServiceClient } from "./_supabase-client";
import type { Database } from "../lib/supabase/types";

type Tables = Database["public"]["Tables"];

const siteSettings: Tables["site_settings"]["Insert"] = {
  hero_lead:
    "I design and build scalable SaaS, eCommerce, and real-time systems on the MERN stack — 14+ production apps shipped over 4+ years, including Shopify public apps and Play Store releases. Available for custom builds. Based in Nagpur, India.",
  about_bio:
    "Full Stack Developer with 4+ years of experience designing and building scalable SaaS, eCommerce, and real-time systems on the MERN stack. I've delivered 14+ production applications — including Shopify public apps, learning platforms, and Play Store mobile solutions — with a focus on clean backend architecture, API design, database optimization, security, and performance.",
  about_education:
    "B.E. in Computer Science (GPA 8.96), Anjuman College of Engineering and Technology, RTMNU — Nagpur, Maharashtra.",
  available_for: [
    "Custom web applications",
    "Admin dashboards & SaaS",
    "Shopify apps",
    "API integration & bug fixes",
    "Deployment support",
  ],
  phone: "+91 72180 74913",
  location: "NAGPUR, INDIA",
  contact_email: "mhasanabbas.me@gmail.com",
  github_url: "https://github.com/Mohammadhasan14",
  linkedin_url: "https://linkedin.com/in/mohammad-hasan-abbas",
  resume_url: "/resume.pdf",
};

const stats: Tables["stats"]["Insert"][] = [
  { stat_group: "about", value: "4+", label: "YEARS EXPERIENCE", sort_order: 0 },
  { stat_group: "about", value: "14+", label: "PRODUCTION APPS", sort_order: 1 },
  { stat_group: "about", value: "8.96", label: "GPA — B.E. CS", sort_order: 2 },
  { stat_group: "contributions", value: "14+", label: "PRODUCTION APPS", sort_order: 0 },
  { stat_group: "contributions", value: "8+", label: "SAAS PLATFORMS", sort_order: 1 },
  { stat_group: "contributions", value: "500+", label: "SHOPIFY MERCHANTS", sort_order: 2 },
  {
    stat_group: "contributions",
    value: "20%",
    label: "DEV TIME SAVED — REUSABLE UI",
    sort_order: 3,
  },
];

const experiences: Tables["experiences"]["Insert"][] = [
  {
    period: "JUN 2023 — PRESENT",
    role: "Software Engineer (Full Stack)",
    company: "Vowelweb · Nagpur",
    description:
      "Architected and delivered 8+ production-grade SaaS applications with multi-role access and real-time workflows. Optimized database indexing and API response cycles, built cross-platform React Native apps published on Google Play Store, and deployed with Docker & AWS.",
    sort_order: 0,
  },
  {
    period: "JUL 2022 — JUN 2023",
    role: "Software Engineer (Full Stack)",
    company: "Profuse TransTech Solution · Nagpur",
    description:
      "Created RESTful APIs for core application functionality and built reusable React components that reduced development time by 20%. Integrated frontends with backend services using clean architecture in a Git-based, code-review-driven team.",
    sort_order: 1,
  },
  {
    period: "AUG 2018 — AUG 2022",
    role: "B.E. Computer Science",
    company: "Anjuman College of Engineering (RTMNU)",
    description: "Graduated with 8.96 GPA — Nagpur, Maharashtra.",
    sort_order: 2,
  },
];

const skillGroups: Tables["skill_groups"]["Insert"][] = [
  {
    tag: "MOD.01",
    name: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Redux", "Remix", "Tailwind", "MUI"],
    sort_order: 0,
  },
  {
    tag: "MOD.02",
    name: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT", "RBAC"],
    sort_order: 1,
  },
  {
    tag: "MOD.03",
    name: "Databases",
    items: ["MongoDB", "MySQL", "Prisma ORM", "Firebase"],
    sort_order: 2,
  },
  {
    tag: "MOD.04",
    name: "Mobile",
    items: ["React Native", "Play Store Releases"],
    sort_order: 3,
  },
  {
    tag: "MOD.05",
    name: "DevOps & Cloud",
    items: ["Docker", "AWS", "Vercel", "DigitalOcean", "CI/CD"],
    sort_order: 4,
  },
  {
    tag: "MOD.06",
    name: "Real-Time & E-commerce",
    items: ["Socket.io", "WebSockets", "Google Pub/Sub", "Shopify Apps"],
    sort_order: 5,
  },
];

const projects: Tables["projects"]["Insert"][] = [
  {
    code: "PRJ.001",
    name: "CartKeeper",
    status_label: "500+ STORES",
    shot_label: "shopify app screenshot",
    description:
      "Shopify public app used by 500+ store owners to recover abandoned carts — admin dashboard for analytics and message performance, tiered subscription pricing, and Google Pub/Sub-powered automated recovery workflows.",
    stack: ["Remix", "Shopify Polaris", "Firebase", "MySQL", "Pub/Sub"],
    sort_order: 0,
  },
  {
    code: "PRJ.002",
    name: "Restaurant Ops Manager",
    status_label: "LIVE",
    shot_label: "dashboard screenshot",
    description:
      "Restaurant management system covering order processing, inventory tracking, table reservations, and staff scheduling — with RBAC and real-time updates over WebSockets.",
    stack: ["React.js", "Redux", "Node.js", "Express", "MongoDB"],
    sort_order: 1,
  },
  {
    code: "PRJ.003",
    name: "Employee Management App",
    status_label: "PLAY STORE",
    shot_label: "mobile app screenshot",
    description:
      "React Native app on the Play Store — clock-in/out, leave management, role-based dashboards, and real-time 1:1 and group chat with file sharing, emojis, dark mode, and multi-language UI.",
    stack: ["React Native", "Node.js", "MySQL", "Socket.io"],
    sort_order: 2,
  },
];

async function main() {
  const supabase = createScriptServiceClient();

  const { error: settingsError } = await supabase
    .from("site_settings")
    .upsert({ id: 1, ...siteSettings }, { onConflict: "id" });
  if (settingsError) throw settingsError;
  console.log("Seeded site_settings");

  const { error: statsDeleteError } = await supabase.from("stats").delete().not("id", "is", null);
  if (statsDeleteError) throw statsDeleteError;
  const { error: statsInsertError } = await supabase.from("stats").insert(stats);
  if (statsInsertError) throw statsInsertError;
  console.log(`Seeded ${stats.length} row(s) into stats`);

  const { error: expDeleteError } = await supabase.from("experiences").delete().not("id", "is", null);
  if (expDeleteError) throw expDeleteError;
  const { error: expInsertError } = await supabase.from("experiences").insert(experiences);
  if (expInsertError) throw expInsertError;
  console.log(`Seeded ${experiences.length} row(s) into experiences`);

  const { error: skillsDeleteError } = await supabase
    .from("skill_groups")
    .delete()
    .not("id", "is", null);
  if (skillsDeleteError) throw skillsDeleteError;
  const { error: skillsInsertError } = await supabase.from("skill_groups").insert(skillGroups);
  if (skillsInsertError) throw skillsInsertError;
  console.log(`Seeded ${skillGroups.length} row(s) into skill_groups`);

  const { error: projectsDeleteError } = await supabase
    .from("projects")
    .delete()
    .not("id", "is", null);
  if (projectsDeleteError) throw projectsDeleteError;
  const { error: projectsInsertError } = await supabase.from("projects").insert(projects);
  if (projectsInsertError) throw projectsInsertError;
  console.log(`Seeded ${projects.length} row(s) into projects`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
