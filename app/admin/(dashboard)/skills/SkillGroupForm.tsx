"use client";

import { useActionState } from "react";
import type { SkillGroupRow } from "@/lib/supabase/types";
import type { SkillGroupFormState } from "./actions";
import Field from "../_shared/Field";
import { primaryButtonClass } from "../_shared/styles";

type SkillGroupFormAction = (
  prevState: SkillGroupFormState,
  formData: FormData,
) => Promise<SkillGroupFormState>;

export default function SkillGroupForm({
  group,
  action,
}: {
  group?: SkillGroupRow;
  action: SkillGroupFormAction;
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Tag (e.g. MOD.01)" name="tag" defaultValue={group?.tag} />
        <Field label="Name" name="name" defaultValue={group?.name} />
      </div>
      <Field label="Items (comma-separated)" name="items" defaultValue={group?.items?.join(", ")} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(group?.sort_order ?? 0)}
        />
        <Field
          label="Status"
          name="status"
          defaultValue={group?.status ?? "published"}
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
