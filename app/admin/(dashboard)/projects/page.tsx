import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const supabase = createServiceClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-neutral-100">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-[#ff4d5a] px-3 py-2 text-xs font-medium uppercase tracking-wide text-white transition hover:opacity-90"
        >
          New Project
        </Link>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        {(projects ?? []).map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-100">{proj.name}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${
                    proj.status === "published"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-neutral-700/50 text-neutral-400"
                  }`}
                >
                  {proj.status}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {proj.code} · sort {proj.sort_order}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Link
                href={`/admin/projects/${proj.id}/edit`}
                className="flex-1 rounded-md border border-neutral-700 px-3 py-2 text-center text-xs uppercase tracking-wide text-neutral-300 transition hover:border-neutral-500 sm:flex-none"
              >
                Edit
              </Link>
              <form action={deleteProject.bind(null, proj.id)} className="flex-1 sm:flex-none">
                <button
                  type="submit"
                  className="w-full rounded-md border border-red-900 px-3 py-2 text-xs uppercase tracking-wide text-red-400 transition hover:border-red-500"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {(projects ?? []).length === 0 && <p className="text-sm text-neutral-500">No projects yet.</p>}
      </div>
    </div>
  );
}
