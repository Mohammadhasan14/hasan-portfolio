"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { TestimonialRow } from "@/lib/supabase/types";
import type { TestimonialFormState } from "./actions";
import { deleteTestimonial } from "./actions";
import Field from "../_shared/Field";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import { labelClass, fileInputClass, primaryButtonClass, secondaryButtonClass } from "../_shared/styles";

type TestimonialFormAction = (
  prevState: TestimonialFormState,
  formData: FormData,
) => Promise<TestimonialFormState>;

export default function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: TestimonialRow;
  action: TestimonialFormAction;
}) {
  const [state, formAction, isPending] = useActionState(action, { error: null });
  const [isDirty, setIsDirty] = useState(false);

  return (
    <form action={formAction} onChange={() => setIsDirty(true)} className="flex flex-col gap-5">
      <div>
        <p className="font-admin-display text-[22px] font-semibold text-admin-text">
          {testimonial ? testimonial.author_name : "New testimonial"}
        </p>
        <p className="mt-0.5 font-admin-mono text-[11px] text-admin-faint">
          {isDirty ? "unsaved changes · " : ""}
          {testimonial ? testimonial.status : "draft"} · not shown publicly yet
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Author name" name="author_name" defaultValue={testimonial?.author_name} />
        <Field label="Author role" name="author_role" defaultValue={testimonial?.author_role} />
      </div>
      <Field label="Quote" name="quote" defaultValue={testimonial?.quote} textarea />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(testimonial?.sort_order ?? 0)}
        />
        <Field
          label="Status"
          name="status"
          defaultValue={testimonial?.status ?? "draft"}
          select={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="avatar" className={labelClass}>
          Avatar (PNG/JPEG/WebP, up to 5MB)
        </label>
        {testimonial?.avatar_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={testimonial.avatar_url}
            alt=""
            className="h-16 w-16 rounded-full border border-admin-border object-cover"
          />
        )}
        <input
          id="avatar"
          name="avatar"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className={fileInputClass}
        />
      </div>

      {state.error && <p className="text-sm text-admin-accent">{state.error}</p>}

      {testimonial && (
        <div className="border-t border-admin-border pt-4">
          <ConfirmDeleteButton
            action={deleteTestimonial.bind(null, testimonial.id, testimonial.author_name)}
            itemName={testimonial.author_name}
          />
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 mt-2 flex gap-2 border-t border-admin-border bg-admin-bg/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Link href="/admin/testimonials" className={secondaryButtonClass}>
          Discard
        </Link>
        <button type="submit" disabled={isPending} className={`${primaryButtonClass} flex-1`}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
