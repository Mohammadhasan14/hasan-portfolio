import { Suspense } from "react";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import StatusBadge from "../_shared/StatusBadge";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import SavedToast from "../_shared/SavedToast";
import { cardClass, primaryButtonClass } from "../_shared/styles";
import { deleteSkillGroup } from "./actions";

export default async function AdminSkillsPage() {
  const supabase = createServiceClient();
  const { data: groups, error } = await supabase
    .from("skill_groups")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-admin-display text-[22px] font-semibold text-admin-text">Skills</p>
          <p className="font-admin-mono text-[11px] text-admin-faint">{(groups ?? []).length} groups</p>
        </div>
        <Link href="/admin/skills/new" className={`${primaryButtonClass} w-auto`}>
          + Add group
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {(groups ?? []).map((grp) => (
          <div key={grp.id} className={`${cardClass} flex gap-3 p-4`}>
            <div className="w-1 shrink-0 self-stretch rounded-full bg-admin-accent" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-admin-display text-[16px] font-semibold text-admin-text">
                  {grp.name}
                </span>
                <StatusBadge status={grp.status} />
              </div>
              <p className="mt-1.5 font-admin-mono text-[11px] tracking-wide text-admin-faint">
                {grp.tag} · {grp.items.join(", ")}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href={`/admin/skills/${grp.id}/edit`}
                  className="flex-1 rounded-md border border-admin-border py-2.5 text-center font-admin-mono text-[11px] uppercase tracking-wider text-admin-text transition hover:border-admin-text/40 sm:flex-none sm:px-4"
                >
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteSkillGroup.bind(null, grp.id, grp.name)}
                  itemName={grp.name}
                />
              </div>
            </div>
          </div>
        ))}
        {(groups ?? []).length === 0 && <p className="text-sm text-admin-muted">No skill groups yet.</p>}
      </div>
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
    </div>
  );
}
