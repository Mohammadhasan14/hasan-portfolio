"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ExperienceRow } from "@/lib/supabase/types";
import type { ExperienceFormState } from "./actions";
import { deleteExperience } from "./actions";
import Field from "../_shared/Field";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { primaryButtonClass, secondaryButtonClass } from "../_shared/styles";

type ExperienceFormAction = (
  prevState: ExperienceFormState,
  formData: FormData,
) => Promise<ExperienceFormState>;

export default function ExperienceForm({
  experience,
  action,
}: {
  experience?: ExperienceRow;
  action: ExperienceFormAction;
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const [isDirty, setIsDirty] = useState(false);

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">
          {experience ? experience.role : "New experience entry"}
        </p>
        <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">
          {isDirty ? "unsaved changes · " : ""}
          {experience ? experience.status : "draft"}
        </p>
      </div>

      <Field label="Period (e.g. JUN 2023 — PRESENT)" name="period" defaultValue={experience?.period} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Role" name="role" defaultValue={experience?.role} />
        <Field label="Company" name="company" defaultValue={experience?.company} />
      </div>
      <Field label="Description" name="description" defaultValue={experience?.description} textarea />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(experience?.sort_order ?? 0)}
        />
        <Field
          label="Status"
          name="status"
          defaultValue={experience?.status ?? "published"}
          select={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
        />
      </div>

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      {experience && (
        <div className="border-t border-admin-border pt-4">
          <ConfirmDeleteButton
            action={deleteExperience.bind(null, experience.id, experience.role)}
            itemName={experience.role}
          />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/admin/experience" className={secondaryButtonClass}>
          Discard
        </Link>
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
