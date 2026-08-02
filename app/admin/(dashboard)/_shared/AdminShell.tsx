"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavIcon from "./NavIcon";
import CommandSwitcher from "./CommandSwitcher";
import { NAV_ITEMS, BOTTOM_NAV_KEYS, MORE_SHEET_KEYS, navItem, getActiveNavKey } from "./nav-items";

export default function AdminShell({
  email,
  logoutAction,
  children,
}: {
  email: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = getActiveNavKey(pathname);
  const activeLabel = navItem(active).label;
  const [moreOpen, setMoreOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSwitcherOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-admin-border bg-[#0d0d0f] p-4 md:flex">
        <Link href="/admin" className="px-2 font-admin-mono text-[16px] font-bold text-admin-text">
          MH<span className="text-admin-accent">://</span>dev
        </Link>
        <p className="mt-1 mb-5 px-2 font-admin-mono text-[9.5px] uppercase tracking-wider text-admin-faint">
          Admin
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-2.5 rounded-md px-2 py-2.5 text-[13.5px] transition ${
                active === item.key
                  ? "bg-admin-accent/10 font-medium text-admin-accent"
                  : "text-admin-muted hover:text-admin-text"
              }`}
            >
              <NavIcon navKey={item.key} size={11} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1.5 px-2 font-admin-mono text-[10px] text-admin-faint">
          <p className="truncate">{email}</p>
          <p>
            site <span className="text-admin-success">● live</span>
          </p>
          <form action={logoutAction}>
            <button type="submit" className="cursor-pointer text-left hover:text-admin-text">
              log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-admin-border px-4 py-3 sm:px-6 md:py-4">
          <div>
            <Link href="/admin" className="font-admin-mono text-[15px] font-bold text-admin-text md:hidden">
              MH<span className="text-admin-accent">://</span>dev
            </Link>
            <p className="hidden font-admin-display text-[20px] font-semibold text-admin-text md:block">
              {activeLabel}
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <p className="font-admin-mono text-[11px] uppercase tracking-wider text-admin-muted md:hidden">
              {activeLabel}
            </p>
            <button
              type="button"
              onClick={() => setSwitcherOpen(true)}
              className="hidden h-10 w-full max-w-sm cursor-pointer items-center gap-2.5 rounded-md border border-admin-border bg-admin-field px-3 font-admin-mono text-[12.5px] text-admin-faint transition hover:border-admin-text/30 md:flex"
            >
              <span className="text-admin-accent">&gt;_</span>
              <span className="flex-1 text-left">Type a section, or &quot;new project&quot;…</span>
              <span className="rounded border border-admin-border px-1.5 py-0.5 text-[10px]">⌘K</span>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setSwitcherOpen(true)}
              aria-label="Open command switcher"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-admin-border font-admin-mono text-[14px] text-admin-accent md:hidden"
            >
              &gt;_
            </button>
            <form action={logoutAction} className="hidden md:block">
              <button
                type="submit"
                className="cursor-pointer rounded-md border border-admin-border px-3 py-2 font-admin-mono text-[11px] uppercase tracking-wider text-admin-muted transition hover:border-admin-accent hover:text-admin-accent"
              >
                Log out
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-4 pb-24 sm:px-6 md:pb-6">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-admin-border bg-[#111113] px-1.5 pt-2 pb-3 md:hidden">
          {BOTTOM_NAV_KEYS.map((key) => {
            const item = navItem(key);
            return (
              <Link
                key={key}
                href={item.href}
                className={`flex flex-col items-center gap-1.5 ${
                  active === key ? "text-admin-accent" : "text-admin-muted"
                }`}
              >
                <NavIcon navKey={key} size={13} />
                <span className="font-admin-mono text-[9px] uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={`flex cursor-pointer flex-col items-center gap-1.5 ${
              MORE_SHEET_KEYS.includes(active) ? "text-admin-accent" : "text-admin-muted"
            }`}
          >
            <span className="font-admin-mono text-[13px] leading-[13px] font-bold">•••</span>
            <span className="font-admin-mono text-[9px] uppercase tracking-wider">More</span>
          </button>
        </nav>
      </div>

      {/* More sheet (mobile) */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-admin-bg/70 backdrop-blur-sm" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-xl border-t border-admin-border bg-admin-surface p-4 pb-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-admin-border" />
            <div className="flex flex-col gap-1">
              {MORE_SHEET_KEYS.map((key) => {
                const item = navItem(key);
                return (
                  <Link
                    key={key}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-3 text-[14px] ${
                      active === key ? "text-admin-accent" : "text-admin-text"
                    }`}
                  >
                    <NavIcon navKey={key} size={13} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-admin-border px-3 pt-4">
              <p className="font-admin-mono text-[10px] text-admin-faint">
                site <span className="text-admin-success">● live</span>
              </p>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="cursor-pointer font-admin-mono text-[11px] uppercase tracking-wider text-admin-muted hover:text-admin-accent"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {switcherOpen && <CommandSwitcher onClose={() => setSwitcherOpen(false)} />}
    </div>
  );
}
