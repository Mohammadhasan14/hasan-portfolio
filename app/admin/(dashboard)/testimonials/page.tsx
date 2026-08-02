import { Suspense } from "react";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import StatusBadge from "../_shared/StatusBadge";
import ConfirmDeleteButton from "../_shared/ConfirmDeleteButton";
import SavedToast from "../_shared/SavedToast";
import CornerFrame from "../_shared/CornerFrame";
import { cardClass, primaryButtonClass } from "../_shared/styles";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const supabase = createServiceClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  const items = testimonials ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-admin-display text-[22px] font-semibold text-admin-text">Testimonials</p>
          <p className="font-admin-mono text-[11px] text-admin-faint">
            {items.length} · not shown publicly
          </p>
        </div>
        {items.length > 0 && (
          <Link href="/admin/testimonials/new" className={`${primaryButtonClass} w-auto`}>
            + Add testimonial
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <CornerFrame className={`${cardClass} mt-6 flex flex-col items-center px-6 py-9 text-center`}>
          <p className="font-admin-mono text-2xl text-admin-faint">&quot; &quot;</p>
          <p className="mt-2 font-admin-mono text-[10px] uppercase tracking-wider text-admin-faint">
            0 testimonials · not shown publicly
          </p>
          <p className="mt-3 font-admin-display text-[19px] font-semibold text-admin-text">
            No testimonials yet.
          </p>
          <p className="mt-2 max-w-xs text-[13.5px] leading-relaxed text-admin-muted">
            Add your first — it&apos;ll appear here, and go live once you build the public testimonials
            section.
          </p>
          <Link href="/admin/testimonials/new" className={`${primaryButtonClass} mt-5 w-full sm:w-auto`}>
            + Add your first testimonial
          </Link>
        </CornerFrame>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {items.map((t) => (
            <div key={t.id} className={`${cardClass} flex gap-3 p-4`}>
              <div className="w-1 shrink-0 self-stretch rounded-full bg-admin-accent" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-admin-display text-[16px] font-semibold text-admin-text">
                    {t.author_name}
                  </span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="mt-1.5 font-admin-mono text-[11px] tracking-wide text-admin-faint">
                  {t.author_role} · sort {t.sort_order}
                </p>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="flex-1 rounded-md border border-admin-border py-2.5 text-center font-admin-mono text-[11px] uppercase tracking-wider text-admin-text transition hover:border-admin-text/40 sm:flex-none sm:px-4"
                  >
                    Edit
                  </Link>
                  <ConfirmDeleteButton
                    action={deleteTestimonial.bind(null, t.id, t.author_name)}
                    itemName={t.author_name}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Suspense fallback={null}>
        <SavedToast />
      </Suspense>
    </div>
  );
}
