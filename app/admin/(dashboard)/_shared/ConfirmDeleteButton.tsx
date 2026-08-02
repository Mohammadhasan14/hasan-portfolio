"use client";

import { useTransition } from "react";

export default function ConfirmDeleteButton({
  action,
  label = "item",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(`Delete this ${label}? This can't be undone.`)) {
          startTransition(() => {
            action();
          });
        }
      }}
      className="w-full rounded-md border border-red-900 px-3 py-2 text-xs uppercase tracking-wide text-red-400 transition hover:border-red-500 disabled:opacity-50 sm:w-auto"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
