"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { StatRow } from "@/lib/supabase/types";
import type { StatFormState } from "./actions";
import { deleteStat } from "./actions";
import Field from "../_shared/Field";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { primaryButtonClass, secondaryButtonClass } from "../_shared/styles";

type StatFormAction = (prevState: StatFormState, formData: FormData) => Promise<StatFormState>;

export default function StatForm({ stat, action }: { stat?: StatRow; action: StatFormAction }) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const [isDirty, setIsDirty] = useState(false);
  const itemName = stat ? `${stat.value} — ${stat.label}` : "New stat";

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">{itemName}</p>
        <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">
          {isDirty ? "unsaved changes · " : ""}
          {stat ? stat.status : "draft"}
        </p>
      </div>

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

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      {stat && (
        <div className="border-t border-admin-border pt-4">
          <ConfirmDeleteButton
            action={deleteStat.bind(null, stat.id, `${stat.value} — ${stat.label}`)}
            itemName={itemName}
          />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/admin/stats" className={secondaryButtonClass}>
          Discard
        </Link>
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
