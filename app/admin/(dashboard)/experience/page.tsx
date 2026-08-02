import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import StatusBadge from "../_shared/StatusBadge";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { deleteExperience } from "./actions";

export default async function AdminExperiencePage() {
  const supabase = createServiceClient();
  const { data: experiences, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-neutral-100">Experience</h1>
        <Link
          href="/admin/experience/new"
          className="rounded-md bg-[#ff4d5a] px-3 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:opacity-90"
        >
          New Entry
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {(experiences ?? []).map((exp) => (
          <div
            key={exp.id}
            className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-100">{exp.role}</span>
                <StatusBadge status={exp.status} />
              </div>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {exp.company} · {exp.period} · sort {exp.sort_order}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/experience/${exp.id}/edit`}
                className="flex-1 rounded-md border border-neutral-700 px-3 py-2 text-center text-xs uppercase tracking-wide text-neutral-300 transition hover:border-neutral-500 sm:flex-none"
              >
                Edit
              </Link>
              <ConfirmDeleteButton action={deleteExperience.bind(null, exp.id)} itemName={exp.role} />
            </div>
          </div>
        ))}
        {(experiences ?? []).length === 0 && <p className="text-sm text-neutral-500">No entries yet.</p>}
      </div>
    </div>
  );
}
