export type SkillGroup = {
  tag: string;
  name: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    tag: "MOD.01",
    name: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Redux", "Remix", "Tailwind", "MUI"],
  },
  {
    tag: "MOD.02",
    name: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT", "RBAC"],
  },
  {
    tag: "MOD.03",
    name: "Databases",
    items: ["MongoDB", "MySQL", "Prisma ORM", "Firebase"],
  },
  {
    tag: "MOD.04",
    name: "Mobile",
    items: ["React Native", "Play Store Releases"],
  },
  {
    tag: "MOD.05",
    name: "DevOps & Cloud",
    items: ["Docker", "AWS", "Vercel", "DigitalOcean", "CI/CD"],
  },
  {
    tag: "MOD.06",
    name: "Real-Time & E-commerce",
    items: ["Socket.io", "WebSockets", "Google Pub/Sub", "Shopify Apps"],
  },
];

export type Job = {
  period: string;
  role: string;
  company: string;
  desc: string;
};

export const jobs: Job[] = [
  {
    period: "JUN 2023 — PRESENT",
    role: "Software Engineer (Full Stack)",
    company: "Vowelweb · Nagpur",
    desc: "Architected and delivered 8+ production-grade SaaS applications with multi-role access and real-time workflows. Optimized database indexing and API response cycles, built cross-platform React Native apps published on Google Play Store, and deployed with Docker & AWS.",
  },
  {
    period: "JUL 2022 — JUN 2023",
    role: "Software Engineer (Full Stack)",
    company: "Profuse TransTech Solution · Nagpur",
    desc: "Created RESTful APIs for core application functionality and built reusable React components that reduced development time by 20%. Integrated frontends with backend services using clean architecture in a Git-based, code-review-driven team.",
  },
  {
    period: "AUG 2018 — AUG 2022",
    role: "B.E. Computer Science",
    company: "Anjuman College of Engineering (RTMNU)",
    desc: "Graduated with 8.96 GPA — Nagpur, Maharashtra.",
  },
];

export type Project = {
  id: string;
  name: string;
  status: string;
  shot: string;
  desc: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "PRJ.001",
    name: "CartKeeper",
    status: "500+ STORES",
    shot: "shopify app screenshot",
    desc: "Shopify public app used by 500+ store owners to recover abandoned carts — admin dashboard for analytics and message performance, tiered subscription pricing, and Google Pub/Sub-powered automated recovery workflows.",
    stack: ["Remix", "Shopify Polaris", "Firebase", "MySQL", "Pub/Sub"],
  },
  {
    id: "PRJ.002",
    name: "Restaurant Ops Manager",
    status: "LIVE",
    shot: "dashboard screenshot",
    desc: "Restaurant management system covering order processing, inventory tracking, table reservations, and staff scheduling — with RBAC and real-time updates over WebSockets.",
    stack: ["React.js", "Redux", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "PRJ.003",
    name: "Employee Management App",
    status: "PLAY STORE",
    shot: "mobile app screenshot",
    desc: "React Native app on the Play Store — clock-in/out, leave management, role-based dashboards, and real-time 1:1 and group chat with file sharing, emojis, dark mode, and multi-language UI.",
    stack: ["React Native", "Node.js", "MySQL", "Socket.io"],
  },
];

export type GithubStat = {
  value: string;
  label: string;
};

export const ghStats: GithubStat[] = [
  { value: "14+", label: "PRODUCTION APPS" },
  { value: "8+", label: "SAAS PLATFORMS" },
  { value: "500+", label: "SHOPIFY MERCHANTS" },
  { value: "20%", label: "DEV TIME SAVED — REUSABLE UI" },
];
