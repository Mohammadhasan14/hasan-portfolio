"use client";

import { useState, useTransition } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { dangerGhostButtonClass } from "./styles";

export default function ConfirmDeleteButton({
  action,
  itemName,
}: {
  action: () => Promise<void>;
  itemName: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${dangerGhostButtonClass} flex-1 text-center sm:flex-none sm:px-4`}
      >
        Delete
      </button>
      <ConfirmDialog
        open={open}
        title={`Delete ${itemName}?`}
        description="This removes it from the public site. You can't undo this."
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          startTransition(async () => {
            await action();
            setOpen(false);
          });
        }}
        pending={isPending}
      />
    </>
  );
}
