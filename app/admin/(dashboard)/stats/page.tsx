import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import StatusBadge from "../_shared/StatusBadge";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
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
        <h1 className="text-lg font-semibold text-neutral-100">Stats</h1>
        <Link
          href="/admin/stats/new"
          className="rounded-md bg-[#ff4d5a] px-3 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:opacity-90"
        >
          New Stat
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {(stats ?? []).map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-100">
                  {stat.value} — {stat.label}
                </span>
                <StatusBadge status={stat.status} />
              </div>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {stat.stat_group} · sort {stat.sort_order}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/stats/${stat.id}/edit`}
                className="flex-1 rounded-md border border-neutral-700 px-3 py-2 text-center text-xs uppercase tracking-wide text-neutral-300 transition hover:border-neutral-500 sm:flex-none"
              >
                Edit
              </Link>
              <ConfirmDeleteButton action={deleteStat.bind(null, stat.id)} itemName={`${stat.value} — ${stat.label}`} />
            </div>
          </div>
        ))}
        {(stats ?? []).length === 0 && <p className="text-sm text-neutral-500">No stats yet.</p>}
      </div>
    </div>
  );
}
