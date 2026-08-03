"use client";

import { useTransition } from "react";
import type { ContactStatus } from "@/lib/supabase/types";
import { inputClass } from "../_shared/styles";

const OPTIONS: { value: ContactStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "quoted", label: "Quoted" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
];

export default function PipelineStatusSelect({
  id,
  status,
  action,
}: {
  id: string;
  status: ContactStatus;
  action: (id: string, status: ContactStatus) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      id="status"
      value={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => action(id, e.target.value as ContactStatus))}
      className={`${inputClass} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
