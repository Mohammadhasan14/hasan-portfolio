export type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
};

type AdminUsersInsert = Omit<AdminUserRow, "id" | "created_at"> &
  Partial<Pick<AdminUserRow, "id" | "created_at">>;

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUserRow;
        Insert: AdminUsersInsert;
        Update: Partial<AdminUsersInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
