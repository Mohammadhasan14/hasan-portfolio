export type ContentStatus = "draft" | "published";

export type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

type AdminUsersInsert = Omit<AdminUserRow, "id" | "created_at"> &
  Partial<Pick<AdminUserRow, "id" | "created_at">>;

export type SiteSettingsRow = {
  id: number;
  hero_lead: string;
  about_bio: string;
  about_education: string;
  available_for: string[];
  phone: string;
  location: string;
  contact_email: string;
  github_url: string;
  linkedin_url: string;
  resume_url: string;
  updated_at: string;
};

type SiteSettingsInsert = Omit<SiteSettingsRow, "id" | "updated_at"> &
  Partial<Pick<SiteSettingsRow, "id" | "updated_at">>;

export type StatRow = {
  id: string;
  stat_group: "about" | "contributions";
  value: string;
  label: string;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
};

type StatsInsert = Omit<StatRow, "id" | "sort_order" | "status" | "created_at"> &
  Partial<Pick<StatRow, "id" | "sort_order" | "status" | "created_at">>;

export type ExperienceRow = {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
};

type ExperiencesInsert = Omit<ExperienceRow, "id" | "sort_order" | "status" | "created_at"> &
  Partial<Pick<ExperienceRow, "id" | "sort_order" | "status" | "created_at">>;

export type SkillGroupRow = {
  id: string;
  tag: string;
  name: string;
  items: string[];
  sort_order: number;
  status: ContentStatus;
  created_at: string;
};

type SkillGroupsInsert = Omit<SkillGroupRow, "id" | "sort_order" | "status" | "created_at"> &
  Partial<Pick<SkillGroupRow, "id" | "sort_order" | "status" | "created_at">>;

export type ProjectRow = {
  id: string;
  code: string;
  name: string;
  status_label: string;
  description: string;
  stack: string[];
  shot_label: string;
  screenshot_url: string | null;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
};

type ProjectsInsert = Omit<
  ProjectRow,
  "id" | "sort_order" | "status" | "created_at" | "screenshot_url"
> &
  Partial<Pick<ProjectRow, "id" | "sort_order" | "status" | "created_at" | "screenshot_url">>;

export type TestimonialRow = {
  id: string;
  author_name: string;
  author_role: string;
  quote: string;
  avatar_url: string | null;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
};

type TestimonialsInsert = Omit<
  TestimonialRow,
  "id" | "sort_order" | "status" | "created_at" | "avatar_url"
> &
  Partial<Pick<TestimonialRow, "id" | "sort_order" | "status" | "created_at" | "avatar_url">>;

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUserRow;
        Insert: AdminUsersInsert;
        Update: Partial<AdminUsersInsert>;
        Relationships: [];
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: SiteSettingsInsert;
        Update: Partial<SiteSettingsInsert>;
        Relationships: [];
      };
      stats: {
        Row: StatRow;
        Insert: StatsInsert;
        Update: Partial<StatsInsert>;
        Relationships: [];
      };
      experiences: {
        Row: ExperienceRow;
        Insert: ExperiencesInsert;
        Update: Partial<ExperiencesInsert>;
        Relationships: [];
      };
      skill_groups: {
        Row: SkillGroupRow;
        Insert: SkillGroupsInsert;
        Update: Partial<SkillGroupsInsert>;
        Relationships: [];
      };
      projects: {
        Row: ProjectRow;
        Insert: ProjectsInsert;
        Update: Partial<ProjectsInsert>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialRow;
        Insert: TestimonialsInsert;
        Update: Partial<TestimonialsInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
