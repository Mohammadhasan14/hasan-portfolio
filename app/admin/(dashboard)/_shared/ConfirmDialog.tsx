"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Keep",
  onConfirm,
  onCancel,
  pending = false,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  pending?: boolean;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-admin-bg/70 backdrop-blur-sm sm:items-center"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-t-xl border border-admin-border bg-admin-surface p-4 shadow-2xl sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-admin-display text-[15px] font-semibold text-admin-text">{title}</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-admin-muted">{description}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 cursor-pointer rounded-md border border-admin-border py-2.5 text-[13px] text-admin-muted transition hover:border-admin-text/40 hover:text-admin-text"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="flex-1 cursor-pointer rounded-md border border-admin-accent py-2.5 font-admin-mono text-[11px] uppercase tracking-wider text-admin-accent transition hover:bg-admin-accent/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
