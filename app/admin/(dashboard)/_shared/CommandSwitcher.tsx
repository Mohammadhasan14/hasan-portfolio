"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS, type NavKey } from "./nav-items";
import NavIcon from "./NavIcon";

const CREATE_ACTIONS = [
  { label: "New project", href: "/admin/projects/new" },
  { label: "New experience entry", href: "/admin/experience/new" },
  { label: "New skill group", href: "/admin/skills/new" },
  { label: "New stat", href: "/admin/stats/new" },
  { label: "New testimonial", href: "/admin/testimonials/new" },
];

type Entry = { kind: "nav" | "create"; label: string; href: string; keyId: string; navKey?: NavKey };

const ALL_ENTRIES: Entry[] = [
  ...NAV_ITEMS.map((item): Entry => ({
    kind: "nav",
    label: item.label,
    href: item.href,
    keyId: `nav-${item.key}`,
    navKey: item.key,
  })),
  ...CREATE_ACTIONS.map((action): Entry => ({
    kind: "create",
    label: action.label,
    href: action.href,
    keyId: `create-${action.href}`,
  })),
];

export default function CommandSwitcher({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ENTRIES;
    return ALL_ENTRIES.filter((entry) => entry.label.toLowerCase().includes(q));
  }, [query]);

  // Mounted only while open (see AdminShell), so this runs once per open —
  // no need to reset query/highlighted separately, fresh state comes free.
  useEffect(() => {
    const timeout = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(timeout);
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    setHighlighted(0);
  }

  function go(href: string) {
    onClose();
    router.push(href);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, entries.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = entries[highlighted];
      if (entry) go(entry.href);
    }
  }

  const navResults = entries.filter((e) => e.kind === "nav");
  const createResults = entries.filter((e) => e.kind === "create");

  function renderEntry(entry: Entry) {
    const idx = entries.indexOf(entry);
    const isHighlighted = idx === highlighted;
    return (
      <button
        key={entry.keyId}
        type="button"
        onClick={() => go(entry.href)}
        onMouseEnter={() => setHighlighted(idx)}
        className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-2.5 py-2.5 text-left text-[14px] ${
          isHighlighted ? "bg-admin-accent/10 text-admin-text" : "text-admin-muted"
        }`}
      >
        {entry.kind === "nav" && entry.navKey ? (
          <NavIcon navKey={entry.navKey} size={13} />
        ) : (
          <span className="w-[13px] text-center font-admin-mono text-admin-accent">+</span>
        )}
        <span className="flex-1">{entry.label}</span>
        {isHighlighted && <span className="font-admin-mono text-[10px] text-admin-faint">↵</span>}
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-admin-bg/70 px-3.5 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-admin-border bg-admin-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="pointer-events-none absolute -top-px -left-px z-10 h-4 w-4 border-t-[1.5px] border-l-[1.5px] border-admin-accent" />
        <span className="pointer-events-none absolute -top-px -right-px z-10 h-4 w-4 border-t-[1.5px] border-r-[1.5px] border-admin-accent" />

        <div className="flex items-center gap-2.5 border-b border-admin-border bg-admin-field px-4 py-3.5">
          <span className="font-admin-mono text-[16px] text-admin-accent">&gt;_</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a section, or “new …” to create"
            className="flex-1 bg-transparent font-admin-mono text-[15px] text-admin-text outline-none placeholder:text-admin-faint"
          />
          <span className="rounded border border-admin-border px-1.5 py-0.5 font-admin-mono text-[10px] text-admin-faint">
            esc
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {navResults.length > 0 && (
            <>
              <p className="px-2.5 pt-1.5 pb-1.5 font-admin-mono text-[9.5px] uppercase tracking-wider text-admin-faint">
                Jump to
              </p>
              {navResults.map(renderEntry)}
            </>
          )}
          {createResults.length > 0 && (
            <>
              <p className="px-2.5 pt-2.5 pb-1.5 font-admin-mono text-[9.5px] uppercase tracking-wider text-admin-faint">
                Create
              </p>
              {createResults.map(renderEntry)}
            </>
          )}
          {entries.length === 0 && (
            <p className="px-2.5 py-4 text-center text-[13px] text-admin-muted">No matches.</p>
          )}
        </div>

        <div className="flex gap-4 border-t border-admin-border px-3.5 py-2.5 font-admin-mono text-[10px] text-admin-faint">
          <span>
            <span className="text-admin-muted">↑↓</span> move
          </span>
          <span>
            <span className="text-admin-muted">↵</span> select
          </span>
          <span>
            <span className="text-admin-muted">esc</span> close
          </span>
        </div>
      </div>
    </div>
  );
}
