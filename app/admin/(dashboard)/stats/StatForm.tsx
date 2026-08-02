"use client";

import { useActionState } from "react";
import type { StatRow } from "@/lib/supabase/types";
import type { StatFormState } from "./actions";
import Field from "../_shared/Field";
import { primaryButtonClass } from "../_shared/styles";

type StatFormAction = (prevState: StatFormState, formData: FormData) => Promise<StatFormState>;

export default function StatForm({ stat, action }: { stat?: StatRow; action: StatFormAction }) {
  const [state, formAction, isPending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <Field
        label="Group"
        name="stat_group"
        defaultValue={stat?.stat_group ?? "about"}
        select={[
          { value: "about", label: "About section" },
          { value: "contributions", label: "Contributions section" },
        ]}
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Value (e.g. 14+)" name="value" defaultValue={stat?.value} />
        <Field label="Label" name="label" defaultValue={stat?.label} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(stat?.sort_order ?? 0)}
        />
        <Field
          label="Status"
          name="status"
          defaultValue={stat?.status ?? "published"}
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
