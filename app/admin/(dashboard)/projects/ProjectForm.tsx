"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ProjectRow } from "@/lib/supabase/types";
import type { ProjectFormState } from "./actions";
import { deleteProject } from "./actions";
import Field from "../_shared/Field";
import TagInput from "../_shared/TagInput";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { labelClass, fileInputClass, primaryButtonClass, secondaryButtonClass } from "../_shared/styles";

type ProjectFormAction = (prevState: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;

export default function ProjectForm({
  project,
  action,
}: {
  project?: ProjectRow;
  action: ProjectFormAction;
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const [isDirty, setIsDirty] = useState(false);

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">
          {project ? project.name : "New project"}
        </p>
        <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">
          {isDirty ? "unsaved changes · " : ""}
          {project ? project.status : "draft"}
        </p>
      </div>

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
      <TagInput label="Tech stack" name="stack" defaultValue={project?.stack?.join(", ")} />
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
            className="h-24 w-auto max-w-full rounded-md border border-admin-border object-cover"
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

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      {project && (
        <div className="border-t border-admin-border pt-4">
          <ConfirmDeleteButton
            action={deleteProject.bind(null, project.id, project.name)}
            itemName={project.name}
          />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/admin/projects" className={secondaryButtonClass}>
          Discard
        </Link>
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
