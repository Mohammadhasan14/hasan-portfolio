"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { SkillGroupRow } from "@/lib/supabase/types";
import type { SkillGroupFormState } from "./actions";
import { deleteSkillGroup } from "./actions";
import Field from "../_shared/Field";
import TagInput from "../_shared/TagInput";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { primaryButtonClass, secondaryButtonClass } from "../_shared/styles";

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
  const [isDirty, setIsDirty] = useState(false);

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">
          {group ? group.name : "New skill group"}
        </p>
        <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">
          {isDirty ? "unsaved changes · " : ""}
          {group ? group.status : "draft"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Tag (e.g. MOD.01)" name="tag" defaultValue={group?.tag} />
        <Field label="Name" name="name" defaultValue={group?.name} />
      </div>
      <TagInput label="Items" name="items" defaultValue={group?.items?.join(", ")} />
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

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      {group && (
        <div className="border-t border-admin-border pt-4">
          <ConfirmDeleteButton
            action={deleteSkillGroup.bind(null, group.id, group.name)}
            itemName={group.name}
          />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/admin/skills" className={secondaryButtonClass}>
          Discard
        </Link>
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
