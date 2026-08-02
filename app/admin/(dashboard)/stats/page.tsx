import { Suspense } from "react";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import StatusBadge from "../_shared/StatusBadge";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import SavedToast from "../_shared/SavedToast";
import { cardClass, primaryButtonClass } from "../_shared/styles";
import { deleteStat } from "./actions";

export default async function AdminStatsPage() {
  const supabase = createServiceClient();
  const { data: stats, error } = await supabase
    .from("stats")
    .select("*")
    .order("stat_group", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-admin-display text-[22px] font-semibold text-admin-text">Stats</p>
          <p className="font-admin-mono text-[11px] text-admin-faint">{(stats ?? []).length} total</p>
        </div>
        <Link href="/admin/stats/new" className={`${primaryButtonClass} w-auto`}>
          + Add stat
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {(stats ?? []).map((stat) => (
          <div key={stat.id} className={`${cardClass} flex gap-3 p-4`}>
            <div className="w-1 shrink-0 self-stretch rounded-full bg-admin-accent" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-admin-display text-[16px] font-semibold text-admin-text">
                  {stat.value} — {stat.label}
                </span>
                <StatusBadge status={stat.status} />
              </div>
              <p className="mt-1.5 font-admin-mono text-[11px] tracking-wide text-admin-faint">
                {stat.stat_group} · sort {stat.sort_order}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/admin/stats/${stat.id}/edit`}
                  className="flex-1 rounded-md border border-admin-border py-2.5 text-center font-admin-mono text-[11px] uppercase tracking-wider text-admin-text transition hover:border-admin-text/40 sm:flex-none sm:px-4"
                >
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteStat.bind(null, stat.id, `${stat.value} — ${stat.label}`)}
                  itemName={`${stat.value} — ${stat.label}`}
                />
              </div>
            </div>
          </div>
        ))}
        {(stats ?? []).length === 0 && <p className="text-sm text-admin-muted">No stats yet.</p>}
      </div>
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
    </div>
  );
}
