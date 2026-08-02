"use client";

import { useActionState } from "react";
import type { ProjectRow } from "@/lib/supabase/types";
import type { ProjectFormState } from "./actions";
import Field from "../_shared/Field";
import { labelClass, fileInputClass, primaryButtonClass } from "../_shared/styles";

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
        <Field
          label="Status"
          name="status"
          defaultValue={project?.status ?? "published"}
          select={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
        />
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
            className="h-24 w-auto max-w-full rounded-md border border-neutral-800 object-cover"
          />
        )}
        <input
          id="screenshot"
          name="screenshot"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className={fileInputClass}
        />
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button type="submit" disabled={isPending} className={primaryButtonClass}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
