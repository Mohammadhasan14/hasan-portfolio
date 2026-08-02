"use client";

import { useActionState } from "react";
import type { TestimonialRow } from "@/lib/supabase/types";
import type { TestimonialFormState } from "./actions";
import Field from "../_shared/Field";
import { labelClass, fileInputClass, primaryButtonClass } from "../_shared/styles";

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

  return (
    <form action={formAction} className="flex flex-col gap-5">
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
            className="h-16 w-16 rounded-full border border-neutral-800 object-cover"
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

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button type="submit" disabled={isPending} className={primaryButtonClass}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
