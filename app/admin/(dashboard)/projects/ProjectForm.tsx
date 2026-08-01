"use client";

import { useActionState } from "react";
import type { ProjectRow } from "@/lib/supabase/types";
import type { ProjectFormState } from "./actions";

const inputClass =
  "w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#ff4d5a]";
const labelClass = "text-xs uppercase tracking-wide text-neutral-400";

type ProjectFormAction = (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;

export default function ProjectForm({
  project,
  action,
}: {
  project?: ProjectRow;
  action: ProjectFormAction;
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Code (e.g. PRJ.004)" name="code" defaultValue={project?.code} />
        <Field label="Name" name="name" defaultValue={project?.name} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Status label (e.g. LIVE)" name="status_label" defaultValue={project?.status_label} />
        <Field
          label="Screenshot placeholder text"
          name="shot_label"
          defaultValue={project?.shot_label}
        />
      </div>
      <Field label="Description" name="description" defaultValue={project?.description} textarea />
      <Field
        label="Tech stack (comma-separated)"
        name="stack"
        defaultValue={project?.stack?.join(", ")}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(project?.sort_order ?? 0)}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={project?.status ?? "published"}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="screenshot" className={labelClass}>
          Screenshot (PNG/JPEG/WebP, up to 5MB)
        </label>
        {project?.screenshot_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.screenshot_url}
            alt=""
            className="h-24 w-auto rounded-md border border-neutral-800 object-cover"
          />
        )}
        <input
          id="screenshot"
          name="screenshot"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="text-sm text-neutral-300 file:mr-3 file:rounded-md file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wide file:text-neutral-200"
        />
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-md bg-[#ff4d5a] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={3}
          required
          className={inputClass}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required
          className={inputClass}
        />
      )}
    </div>
  );
}
