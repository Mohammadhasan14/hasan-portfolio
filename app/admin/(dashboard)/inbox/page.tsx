import { Suspense } from "react";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import SavedToast from "../_shared/SavedToast";
import { cardClass } from "../_shared/styles";

const STATUS_COLORS: Record<string, string> = {
  new: "text-admin-accent border-admin-accent/30 bg-admin-accent/10",
  contacted: "text-admin-muted border-admin-border bg-admin-border/20",
  quoted: "text-admin-muted border-admin-border bg-admin-border/20",
  won: "text-admin-success border-admin-success/30 bg-admin-success/10",
  lost: "text-admin-faint border-admin-border bg-admin-border/20",
};

export default async function AdminInboxPage() {
  const supabase = createServiceClient();
  const { data: submissions, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  const items = submissions ?? [];
  const unreadCount = items.filter((s) => !s.is_read).length;

  return (
    <div>
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">Inbox</p>
        <p className="font-admin-mono text-[11px] text-admin-faint">
          {items.length} total · {unreadCount} unread
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/inbox/${item.id}`}
            className={`${cardClass} flex gap-3 p-4 transition hover:border-admin-text/30`}
          >
            <div
              className={`w-1 shrink-0 self-stretch rounded-full ${
                item.is_read ? "bg-admin-border" : "bg-admin-accent"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`font-admin-display text-[16px] ${
                    item.is_read ? "font-medium text-admin-muted" : "font-semibold text-admin-text"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`rounded border px-1.5 py-0.5 font-admin-mono text-[9.5px] uppercase tracking-wider ${STATUS_COLORS[item.status]}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-1 truncate text-[13px] text-admin-muted">{item.message}</p>
              <p className="mt-1.5 font-admin-mono text-[11px] tracking-wide text-admin-faint">
                {item.email} · {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
        {items.length === 0 && <p className="text-sm text-admin-muted">No messages yet.</p>}
      </div>
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
    </div>
  );
}
