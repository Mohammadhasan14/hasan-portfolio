"use client";

import { useState, type KeyboardEvent } from "react";
import { labelClass } from "./styles";

// Renders as chips but still submits a single comma-separated value under
// `name`, so the existing Zod schemas/Server Actions (which split on ",")
// don't need to change — only the input UI does.
export default function TagInput({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  const [tags, setTags] = useState<string[]>(() =>
    (defaultValue ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  );
  const [draft, setDraft] = useState("");

  function commitDraft() {
    const value = draft.trim();
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setDraft("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>{label}</label>
      <input type="hidden" name={name} value={tags.join(", ")} />
      <div className="flex min-h-[46px] flex-wrap items-center gap-1.5 rounded-md border border-admin-border bg-admin-field px-2.5 py-2 focus-within:border-admin-accent focus-within:ring-4 focus-within:ring-admin-accent/15">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded border border-admin-border px-2 py-1 font-admin-mono text-[11px] text-admin-text"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
              className="cursor-pointer text-admin-faint hover:text-admin-accent"
              aria-label={`Remove ${tag}`}
            >
              ✕
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={tags.length === 0 ? "Type and press Enter" : "+ add"}
          className="min-w-[90px] flex-1 bg-transparent text-base text-admin-text outline-none placeholder:text-admin-faint sm:text-[13px]"
        />
      </div>
    </div>
  );
}
