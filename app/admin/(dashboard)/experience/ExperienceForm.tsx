"use client";

import { useActionState } from "react";
import type { ExperienceRow } from "@/lib/supabase/types";
import type { ExperienceFormState } from "./actions";
import Field from "../_shared/Field";
import { primaryButtonClass } from "../_shared/styles";

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

  return (
    <form action={formAction} className="flex flex-col gap-5">
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

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button type="submit" disabled={isPending} className={primaryButtonClass}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
