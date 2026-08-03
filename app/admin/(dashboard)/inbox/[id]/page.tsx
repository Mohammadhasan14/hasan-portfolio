import { notFound } from "next/navigation";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/service";
import ConfirmDeleteButton from "../../_shared/ConfirmDeleteButton";
import { labelClass } from "../../_shared/styles";
import PipelineStatusSelect from "../PipelineStatusSelect";
import { deleteSubmission, updateSubmissionStatus } from "../actions";

export default async function InboxDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data: submission } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!submission) notFound();

  if (!submission.is_read) {
    await supabase.from("contact_submissions").update({ is_read: true }).eq("id", id);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/inbox"
        className="font-admin-mono text-[12px] text-admin-muted transition hover:text-admin-text"
      >
        ← Inbox
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-admin-display text-[22px] font-semibold text-admin-text">{submission.name}</p>
          <a
            href={`mailto:${submission.email}`}
            className="font-admin-mono text-[12.5px] text-admin-accent hover:underline"
          >
            {submission.email}
          </a>
        </div>
        <p className="whitespace-nowrap font-admin-mono text-[11px] text-admin-faint">
          {new Date(submission.created_at).toLocaleString()}
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-admin-border bg-admin-surface p-4">
        <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-admin-text">
          {submission.message}
        </p>
      </div>

      {submission.referrer && (
        <p className="mt-3 font-admin-mono text-[10.5px] text-admin-faint">Referrer: {submission.referrer}</p>
      )}

      <div className="mt-6 flex flex-col gap-1.5">
        <label htmlFor="status" className={labelClass}>
          Pipeline status
        </label>
        <PipelineStatusSelect id={submission.id} status={submission.status} action={updateSubmissionStatus} />
      </div>

      <div className="mt-6 border-t border-admin-border pt-4">
        <ConfirmDeleteButton
          action={deleteSubmission.bind(null, submission.id, submission.name)}
          itemName={submission.name}
        />
      </div>
    </div>
  );
}
